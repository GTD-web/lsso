# 데이터베이스 동기화 문제 해결 가이드

## 🔴 연결 오류

### 1. SASL: SCRAM-SERVER-FINAL-MESSAGE 오류

**오류 메시지:**
```
Error: SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing
```

**원인:**
- Supabase 또는 다른 클라우드 DB는 SSL 연결이 필수
- SSL 설정 없이 연결 시도

**해결 방법:** ✅ **자동 적용됨!**

코드가 Supabase를 자동으로 감지하여 SSL을 활성화합니다.

**확인 단계:**
1. 애플리케이션 재시작
   ```bash
   npm run start:dev
   ```

2. 로그 확인
   ```
   [Nest] LOG [TypeOrmModule] TypeOrmModule dependencies initialized
   [Nest] LOG [TypeOrmModule] TypeOrmModule dependencies initialized (production)
   ```
   
3. 오류가 계속되면 환경변수 확인
   ```bash
   # .env 파일에 추가
   PROD_POSTGRES_SSL=true
   ```

### 2. Connection refused

**오류 메시지:**
```
Error: connect ECONNREFUSED 123.456.789.0:5432
```

**원인:**
- 호스트 주소 또는 포트 번호가 잘못됨
- 방화벽이 연결을 차단
- 실서버 DB가 다운됨

**해결 방법:**

**단계 1: 환경변수 확인**
```bash
# .env 파일 확인
PROD_POSTGRES_HOST=aws-0-ap-northeast-2.pooler.supabase.com
PROD_POSTGRES_PORT=6543
```

**단계 2: 직접 연결 테스트**
```bash
# PostgreSQL 클라이언트로 연결
psql -h aws-0-ap-northeast-2.pooler.supabase.com \
     -p 6543 \
     -U postgres.qmcbhhqdnlxmprfciwbg \
     -d postgres
```

**단계 3: 네트워크 확인**
```bash
# 호스트 핑 테스트
ping aws-0-ap-northeast-2.pooler.supabase.com

# 포트 확인
telnet aws-0-ap-northeast-2.pooler.supabase.com 6543
# 또는
nc -zv aws-0-ap-northeast-2.pooler.supabase.com 6543
```

### 3. Authentication failed

**오류 메시지:**
```
Error: password authentication failed for user "postgres"
```

**원인:**
- 사용자명 또는 비밀번호가 잘못됨
- 비밀번호에 특수문자가 있어 인코딩 문제 발생

**해결 방법:**

**단계 1: 자격증명 확인**
```bash
# .env 파일에서 확인
PROD_POSTGRES_USER=postgres.qmcbhhqdnlxmprfciwbg
PROD_POSTGRES_PASSWORD=yuMvp6qrmP8ZcJ4H?
```

**단계 2: 특수문자 처리**

비밀번호에 특수문자(`?`, `@`, `#`, `&` 등)가 있는 경우:

```bash
# 방법 1: 환경변수에 그대로 입력 (권장)
PROD_POSTGRES_PASSWORD=yuMvp6qrmP8ZcJ4H?

# 방법 2: URL 인코딩 (필요시)
# ? → %3F
PROD_POSTGRES_PASSWORD=yuMvp6qrmP8ZcJ4H%3F
```

**단계 3: Supabase 콘솔에서 비밀번호 재확인**
1. Supabase 대시보드 접속
2. Settings → Database
3. Connection string 확인

### 4. Database does not exist

**오류 메시지:**
```
Error: database "production_database" does not exist
```

**원인:**
- 데이터베이스 이름이 잘못됨

**해결 방법:**

```bash
# Supabase는 기본적으로 "postgres" 사용
PROD_POSTGRES_DATABASE=postgres

# 다른 DB 사용 시 정확한 이름 확인
psql -h YOUR_HOST -p YOUR_PORT -U YOUR_USER -l
```

## 🟡 동기화 실행 오류

### 5. Foreign key constraint violation

**오류 메시지:**
```
Error: insert or update on table "employees" violates foreign key constraint
```

**원인:**
- 의존성 있는 테이블을 함께 선택하지 않음
- 예: employees를 동기화하려면 departments, ranks가 필요

**해결 방법:**

```json
// ❌ 잘못된 예시
{
  "tables": ["employees"]
}

// ✅ 올바른 예시
{
  "tables": [
    "ranks",           // 직급 먼저
    "positions",       // 직책
    "departments",     // 부서
    "employees",       // 그 다음 직원
    "employee_department_positions"  // 관계 테이블
  ]
}
```

**의존성 체크리스트:**
- `employees` → `departments`, `ranks` 필요
- `employee_department_positions` → `employees`, `departments`, `positions` 필요
- `employee_rank_histories` → `employees`, `ranks` 필요
- `employee_tokens` → `employees` 필요
- `employee_fcm_tokens` → `employees`, `fcm_tokens` 필요
- `employee_system_roles` → `employees`, `system_roles` 필요

### 6. 부서 순서가 이상함

**증상:**
- 부서 계층구조가 깨짐
- 하위 부서가 상위 부서보다 먼저 표시됨

**원인:**
- 부서는 자기 자신을 참조하는 계층구조
- 상위 부서보다 하위 부서가 먼저 입력되면 오류

**해결 방법:** ✅ **자동 처리됨!**

코드가 자동으로 상위 부서부터 재귀적으로 입력합니다:

```typescript
// migration.service.ts
private async insertDepartmentsHierarchically(manager: any, departments: Department[]): Promise<void> {
    // 재귀적으로 부서 삽입 (상위 부서부터)
    const insertDepartment = async (dept: Department): Promise<void> => {
        // 상위 부서가 있으면 먼저 삽입
        if (dept.parentDepartmentId && deptMap.has(dept.parentDepartmentId)) {
            const parent = deptMap.get(dept.parentDepartmentId)!;
            await insertDepartment(parent);
        }
        // 현재 부서 삽입
        await manager.getRepository(Department).save(dept);
    };
}
```

## 🟢 성능 문제

### 7. 동기화가 너무 느림

**증상:**
- 수천 개의 데이터 동기화 시 오래 걸림

**원인:**
- 네트워크 지연
- 청크 크기가 작음

**해결 방법:**

**방법 1: 청크 크기 조정**

```typescript
// migration.service.ts
private async bulkInsertData(manager: any, table: string, data: any[]): Promise<void> {
    // 청크 크기를 100에서 500으로 증가
    const chunkSize = 500; // 기본: 100
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        await manager.getRepository(entity).save(chunk);
    }
}
```

**방법 2: 테이블 선택적 동기화**

```bash
# 전체 동기화 대신 필요한 테이블만
curl -X POST http://localhost:3000/migration/sync-from-production \
  -H "Content-Type: application/json" \
  -d '{
    "tables": ["departments"]  # 부서만 먼저
  }'
```

### 8. 메모리 부족

**오류 메시지:**
```
JavaScript heap out of memory
```

**원인:**
- 대용량 데이터를 한 번에 조회

**해결 방법:**

Node.js 메모리 증가:

```bash
# package.json scripts 수정
"start:dev": "NODE_OPTIONS='--max-old-space-size=4096' nest start --watch"
```

## 🔵 기타 문제

### 9. 트랜잭션 타임아웃

**오류 메시지:**
```
Error: Timeout exceeded
```

**원인:**
- 대용량 데이터 동기화 시 트랜잭션 시간 초과

**해결 방법:**

```typescript
// app.module.ts
TypeOrmModule.forRootAsync({
    name: 'production',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        ...typeOrmProductionConfig(configService),
        extra: {
            ...typeOrmProductionConfig(configService).extra,
            statement_timeout: 300000, // 5분
        },
    }),
}),
```

### 10. 롤백 후 데이터 복구

**상황:**
- 동기화 실패 후 데이터 손실

**예방:**

동기화 전 백업 필수!

```bash
# 백업
pg_dump -h localhost -U postgres -d dev_database > backup_$(date +%Y%m%d_%H%M%S).sql

# 복구 (필요시)
psql -h localhost -U postgres -d dev_database < backup_20250101_153000.sql
```

## 📞 추가 지원

### 로그 확인

```bash
# 전체 로그 보기
npm run start:dev

# 특정 로거만 보기
DEBUG=TypeOrmModule npm run start:dev
```

### 연결 정보 확인

```typescript
// migration.controller.ts에 임시 추가
@Get('debug-connection')
async debugConnection() {
    return {
        dev: {
            host: this.configService.get('database.host'),
            port: this.configService.get('database.port'),
            database: this.configService.get('database.database'),
        },
        production: {
            host: this.configService.get('productionDatabase.host'),
            port: this.configService.get('productionDatabase.port'),
            database: this.configService.get('productionDatabase.database'),
        },
    };
}
```

### 테스트 쿼리

```typescript
@Get('test-query')
async testQuery() {
    try {
        const result = await this.productionDataSource.query('SELECT version()');
        return { success: true, version: result[0] };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

모든 방법을 시도했지만 문제가 해결되지 않으면:
1. 실서버 관리자에게 연락
2. Supabase Support 문의
3. GitHub Issue 생성


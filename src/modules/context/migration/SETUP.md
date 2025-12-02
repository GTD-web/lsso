# 데이터베이스 동기화 설정 가이드

## 📝 환경변수 설정

### 1. .env 파일 생성

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# ========================================
# 개발 서버 DB 설정 (1-7 라인)
# ========================================
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_dev_password
POSTGRES_DATABASE=dev_database
POSTGRES_SCHEMA=public

# ========================================
# 실서버 DB 연결 활성화 여부 ⭐ 중요!
# ========================================
# true: 실서버 DB 연결 활성화 (데이터 동기화 가능)
# false 또는 미설정: 실서버 DB 연결 비활성화 (로컬 개발 시)
ENABLE_PRODUCTION_DB=true

# ========================================
# 실서버 DB 설정 (ENABLE_PRODUCTION_DB=true인 경우에만 필요)
# ========================================
PROD_POSTGRES_HOST=production-host.example.com
PROD_POSTGRES_PORT=5432
PROD_POSTGRES_USER=postgres
PROD_POSTGRES_PASSWORD=production_password
PROD_POSTGRES_DATABASE=production_database
PROD_POSTGRES_SCHEMA=public
```

### 2. 실서버 DB 정보 확인

실서버 DB 접속 정보를 확인하세요:

```bash
# 실서버 관리자에게 문의하거나
# 실서버 환경변수 확인
echo $POSTGRES_HOST
echo $POSTGRES_PORT
# ...
```

### 3. 연결 테스트

실서버 DB에 접속이 가능한지 확인:

```bash
# PostgreSQL 클라이언트로 연결 테스트
psql -h production-host.example.com \
     -p 5432 \
     -U postgres \
     -d production_database

# 또는 환경변수 사용
psql -h $PROD_POSTGRES_HOST \
     -p $PROD_POSTGRES_PORT \
     -U $PROD_POSTGRES_USER \
     -d $PROD_POSTGRES_DATABASE
```

성공적으로 연결되면:

```
psql (14.5)
Type "help" for help.

production_database=#
```

## 🔒 보안 주의사항

### 1. .env 파일 보호

```bash
# .gitignore에 추가 (이미 되어 있어야 함)
echo ".env" >> .gitignore

# .env 파일 권한 설정 (Linux/Mac)
chmod 600 .env
```

### 2. 실서버 비밀번호 관리

⚠️ **절대 하지 말아야 할 것:**

-   `.env` 파일을 Git에 커밋
-   Slack, 이메일 등으로 평문 비밀번호 공유
-   코드에 하드코딩

✅ **권장 사항:**

-   비밀번호 관리 도구 사용 (1Password, LastPass 등)
-   팀원끼리 안전한 채널로 공유
-   정기적으로 비밀번호 변경

### 3. 네트워크 보안

```bash
# 실서버 DB가 방화벽으로 보호되어 있는지 확인
# 개발 서버 IP가 허용 목록에 있는지 확인

# PostgreSQL 연결 허용 확인
# pg_hba.conf 파일 확인 (실서버 관리자)
```

## 🧪 설정 검증

### 1. 애플리케이션 시작

```bash
npm run start:dev
```

### 2. 로그 확인

정상적으로 두 개의 DB 연결이 생성되어야 합니다:

```
[Nest] 12345  - LOG [TypeOrmModule] TypeOrmModule dependencies initialized
[Nest] 12345  - LOG [TypeOrmModule] TypeOrmModule dependencies initialized (production)
```

### 3. 연결 테스트 (선택사항)

간단한 테스트 API를 만들어 연결 확인:

```typescript
// migration.controller.ts에 추가
@Get('test-production-connection')
async testProductionConnection() {
    try {
        const result = await this.productionDataSource.query('SELECT NOW()');
        return {
            success: true,
            message: '실서버 DB 연결 성공',
            serverTime: result[0].now,
        };
    } catch (error) {
        return {
            success: false,
            message: '실서버 DB 연결 실패',
            error: error.message,
        };
    }
}
```

테스트:

```bash
curl http://localhost:3000/migration/test-production-connection
```

## 🚨 문제 해결

### Q1: "Connection refused" 오류

```
Error: connect ECONNREFUSED 123.456.789.0:5432
```

**해결 방법:**

1. PROD_POSTGRES_HOST가 올바른지 확인
2. 네트워크 방화벽 확인
3. 실서버 DB가 실행 중인지 확인

### Q2: "Authentication failed" 오류

```
Error: password authentication failed for user "postgres"
```

**해결 방법:**

1. PROD_POSTGRES_USER와 PROD_POSTGRES_PASSWORD 확인
2. 실서버 관리자에게 계정 권한 확인

### Q3: "Database does not exist" 오류

```
Error: database "production_database" does not exist
```

**해결 방법:**

1. PROD_POSTGRES_DATABASE 이름 확인
2. 실서버에 해당 DB가 존재하는지 확인

### Q4: "SASL: SCRAM-SERVER-FINAL-MESSAGE" 오류 (Supabase)

```
Error: SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing
```

**원인:** Supabase는 SSL 연결이 필수입니다.

**해결 방법:** ✅ 이미 자동으로 적용됨!

설정이 Supabase를 자동으로 감지하여 SSL을 활성화합니다:

```typescript
// libs/configs/typeorm-production.config.ts
const isSupabase = configService.get('productionDatabase.host')?.includes('supabase.com');

return {
    // ...
    ssl: isSupabase || configService.get('productionDatabase.ssl') === 'true',
    extra: isSupabase
        ? {
              ssl: { rejectUnauthorized: false },
          }
        : {},
};
```

**다시 시도:**

1. 애플리케이션 재시작: `npm run start:dev`
2. 로그에서 연결 성공 확인
3. API 다시 호출

### Q5: "SSL connection required" 오류

```
Error: no pg_hba.conf entry for host
```

**해결 방법:**

환경변수에 SSL 설정 추가:

```bash
# .env
PROD_POSTGRES_SSL=true
```

## 📋 체크리스트

동기화 실행 전 다음 사항을 확인하세요:

-   [ ] .env 파일에 실서버 DB 정보 입력 (9-15 라인)
-   [ ] 실서버 DB 연결 테스트 성공
-   [ ] 개발 DB 백업 완료
-   [ ] 동기화할 테이블 목록 결정
-   [ ] 의존성 순서 확인
-   [ ] 팀원들에게 작업 공지 (개발 DB 사용 중단)
-   [ ] 실서버 DB 읽기 전용 모드 확인 (선택사항)

모든 체크리스트를 완료했다면 이제 동기화를 실행할 수 있습니다! 🚀

```bash
curl -X POST http://localhost:3000/migration/sync-from-production \
  -H "Content-Type: application/json" \
  -d '{
    "tables": ["departments", "employees"]
  }'
```

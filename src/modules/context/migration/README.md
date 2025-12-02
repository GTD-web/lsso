# Database Migration & Sync

실서버에서 개발서버로 데이터를 동기화하는 마이그레이션 서비스입니다.

## 🎯 목적

동일한 프로젝트(코드)를 공유하는 개발서버와 실서버에 각각 연결되어 있는 DB들을 동기화합니다.

## 📋 동기화 순서

### 1. 데이터 삭제 순서 (역순 - 의존성 있는 것부터)

```
employee_system_roles         (11) ← 직원-시스템역할 관계
    ↓
employee_fcm_tokens           (10) ← 직원-FCM토큰 관계
    ↓
employee_tokens               (9)  ← 직원 토큰
    ↓
employee_rank_histories       (8)  ← 직원 직급 이력
    ↓
employee_department_positions (7)  ← 직원-부서-직책 관계
    ↓
employees                     (6)  ← 직원
    ↓
departments                   (5)  ← 부서 (계층구조 주의)
    ↓
positions                     (4)  ← 직책
    ↓
ranks                         (3)  ← 직급
    ↓
fcm_tokens                    (2)  ← FCM 토큰
    ↓
system_roles                  (1)  ← 시스템 역할
```

### 2. 데이터 입력 순서 (정순 - 의존성 없는 것부터)

```
system_roles                  (1)  ← 시스템 역할
    ↓
ranks                         (2)  ← 직급
    ↓
positions                     (3)  ← 직책
    ↓
fcm_tokens                    (4)  ← FCM 토큰
    ↓
departments                   (5)  ← 부서 (상위 부서부터 재귀적으로)
    ↓
employees                     (6)  ← 직원
    ↓
employee_department_positions (7)  ← 직원-부서-직책 관계
    ↓
employee_rank_histories       (8)  ← 직원 직급 이력
    ↓
employee_tokens               (9)  ← 직원 토큰
    ↓
employee_fcm_tokens           (10) ← 직원-FCM토큰 관계
    ↓
employee_system_roles         (11) ← 직원-시스템역할 관계
```

## 🚀 사용 방법

### API 엔드포인트

```http
POST /migration/sync-from-production
Content-Type: application/json

{
  "tables": [
    "departments",
    "employees",
    "positions",
    "ranks"
  ]
}
```

### 사용 가능한 테이블 목록

| 테이블명                        | 설명                 | 의존성                            |
| ------------------------------- | -------------------- | --------------------------------- |
| `system_roles`                  | 시스템 역할          | 없음                              |
| `ranks`                         | 직급                 | 없음                              |
| `positions`                     | 직책                 | 없음                              |
| `fcm_tokens`                    | FCM 토큰             | 없음                              |
| `departments`                   | 부서                 | 자기참조 (계층구조)               |
| `employees`                     | 직원                 | departments, ranks                |
| `employee_department_positions` | 직원-부서-직책 관계  | employees, departments, positions |
| `employee_rank_histories`       | 직원 직급 이력       | employees, ranks                  |
| `employee_tokens`               | 직원 토큰            | employees                         |
| `employee_fcm_tokens`           | 직원-FCM토큰 관계    | employees, fcm_tokens             |
| `employee_system_roles`         | 직원-시스템역할 관계 | employees, system_roles           |

### 예시 요청

#### 1. 부서만 동기화

```bash
curl -X POST http://localhost:3000/migration/sync-from-production \
  -H "Content-Type: application/json" \
  -d '{
    "tables": ["departments"]
  }'
```

#### 2. 직원 관련 데이터 전체 동기화

```bash
curl -X POST http://localhost:3000/migration/sync-from-production \
  -H "Content-Type: application/json" \
  -d '{
    "tables": [
      "ranks",
      "positions",
      "departments",
      "employees",
      "employee_department_positions",
      "employee_rank_histories"
    ]
  }'
```

#### 3. 전체 데이터 동기화

```bash
curl -X POST http://localhost:3000/migration/sync-from-production \
  -H "Content-Type: application/json" \
  -d '{
    "tables": [
      "system_roles",
      "ranks",
      "positions",
      "fcm_tokens",
      "departments",
      "employees",
      "employee_department_positions",
      "employee_rank_histories",
      "employee_tokens",
      "employee_fcm_tokens",
      "employee_system_roles"
    ]
  }'
```

## 🔧 환경 설정

### 필수 환경변수

`.env` 파일에 다음 환경변수를 설정해야 합니다:

```bash
# 개발 서버 DB 설정
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_dev_password
POSTGRES_DATABASE=dev_database
POSTGRES_SCHEMA=public

# 실서버 DB 연결 활성화 여부
ENABLE_PRODUCTION_DB=true  # true: 활성화, false: 비활성화

# 실서버 DB 설정 (ENABLE_PRODUCTION_DB=true인 경우에만 필요)
PROD_POSTGRES_HOST=production-host.com
PROD_POSTGRES_PORT=5432
PROD_POSTGRES_USER=postgres
PROD_POSTGRES_PASSWORD=production_password
PROD_POSTGRES_DATABASE=production_database
PROD_POSTGRES_SCHEMA=public
```

### 환경별 설정 가이드

**로컬 개발 환경:**

```bash
ENABLE_PRODUCTION_DB=false  # 또는 설정하지 않음
```

**데이터 동기화 필요 시:**

```bash
ENABLE_PRODUCTION_DB=true
# + 실서버 DB 정보 필수
```

### DB 연결 확인

실서버 DB 연결이 정상적으로 설정되었는지 확인:

```bash
# PostgreSQL 연결 테스트
psql -h $PROD_POSTGRES_HOST -p $PROD_POSTGRES_PORT -U $PROD_POSTGRES_USER -d $PROD_POSTGRES_DATABASE
```

## ⚙️ 동작 원리

### 1. 트랜잭션 시작

전체 작업을 하나의 트랜잭션으로 처리하여 원자성 보장

### 2. 외래키 제약조건 비활성화

```sql
SET session_replication_role = replica;
```

### 3. 실서버 데이터 조회

선택된 테이블의 모든 데이터를 조회

### 4. 개발서버 데이터 삭제

의존성 역순으로 데이터 삭제

```sql
DELETE FROM "employee_system_roles";
DELETE FROM "employee_fcm_tokens";
-- ... 역순으로 계속
```

### 5. 개발서버에 데이터 입력

의존성 정순으로 데이터 입력 (청크 단위로 100개씩)

**특별 처리:**

-   `departments`: 계층구조를 고려하여 상위 부서부터 재귀적으로 입력

### 6. 외래키 제약조건 복원

```sql
SET session_replication_role = DEFAULT;
```

### 7. 트랜잭션 커밋 or 롤백

-   성공 시: 커밋
-   실패 시: 자동 롤백 (데이터 무결성 보장)

## ⚠️ 주의사항

### 1. 백업 필수

동기화 전 반드시 개발 DB 백업을 수행하세요!

```bash
# PostgreSQL 백업 예시
pg_dump -h localhost -U postgres -d dev_database > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. 의존성 확인

테이블을 선택할 때 의존성을 고려해야 합니다.

❌ 잘못된 예시:

```json
{
    "tables": ["employees"] // departments, ranks가 없으면 실패!
}
```

✅ 올바른 예시:

```json
{
    "tables": ["departments", "ranks", "employees"]
}
```

### 3. 부서 계층구조

`departments` 테이블은 자기 자신을 참조하는 계층구조입니다.
서비스에서 자동으로 상위 부서부터 순서대로 입력합니다.

### 4. 실서버 연결 설정 ✅ 완료

실서버 DB 연결이 자동으로 설정되어 있습니다:

**설정된 파일들:**

-   `libs/configs/env.config.ts`: 실서버 DB 환경변수 로드
-   `libs/configs/typeorm-production.config.ts`: 실서버 DB 연결 설정
-   `src/app.module.ts`: 실서버 DB 연결 추가 (`name: 'production'`)
-   `src/modules/context/migration/migration.service.ts`: 실서버 DataSource 주입

**코드 구조:**

```typescript
// migration.service.ts
constructor(
  @InjectDataSource() private readonly dataSource: DataSource,
  @InjectDataSource('production') private readonly productionDataSource: DataSource,
) {}

// 실서버에서 데이터 조회
const productionDataSource = this.productionDataSource;
```

**환경변수만 설정하면 바로 사용 가능합니다!**

## 📊 응답 형식

### 성공 응답

```json
{
    "success": true,
    "message": "데이터베이스 동기화가 성공적으로 완료되었습니다.",
    "syncedTables": ["departments", "employees", "positions", "ranks"],
    "errors": []
}
```

### 실패 응답

```json
{
    "success": false,
    "message": "데이터베이스 동기화 중 오류가 발생했습니다.",
    "syncedTables": [],
    "errors": ["employees 입력 실패: Foreign key constraint violation"]
}
```

## 🔍 로그 예시

```
🚀 데이터베이스 동기화 시작...
동기화 대상 테이블: departments, employees, positions, ranks
⏳ 외래키 제약조건 비활성화 중...
📥 실서버 데이터 조회 중...
  ✓ departments: 45개 데이터 조회
  ✓ employees: 230개 데이터 조회
  ✓ positions: 12개 데이터 조회
  ✓ ranks: 8개 데이터 조회
🗑️  개발서버 데이터 삭제 중...
  ✓ employees 삭제 완료 (230개)
  ✓ departments 삭제 완료 (45개)
  ✓ positions 삭제 완료 (12개)
  ✓ ranks 삭제 완료 (8개)
💾 개발서버에 데이터 입력 중...
  ✓ ranks 입력 완료 (8개)
  ✓ positions 입력 완료 (12개)
  ✓ departments 입력 완료 (45개)
  ✓ employees 입력 완료 (230개)
✅ 외래키 제약조건 복원 중...
✅ 데이터베이스 동기화 완료!
```

## 🛠️ 문제 해결

### Q: "Foreign key constraint violation" 오류가 발생합니다.

**A:** 의존성 있는 테이블을 함께 선택하지 않아서 발생합니다.

```json
{
    "tables": ["departments", "ranks", "employees"] // 의존성 있는 테이블 모두 포함
}
```

### Q: 부서 순서가 이상합니다.

**A:** 부서는 계층구조를 고려하여 자동으로 상위 부서부터 입력됩니다.
`order` 필드도 함께 복사되므로 순서가 유지됩니다.

### Q: 롤백은 어떻게 하나요?

**A:** 트랜잭션으로 처리되므로 오류 발생 시 자동으로 롤백됩니다.
수동 롤백이 필요하면 백업 파일을 사용하세요.

```bash
psql -h localhost -U postgres -d dev_database < backup_20250101_120000.sql
```

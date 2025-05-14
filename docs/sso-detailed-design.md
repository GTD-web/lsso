# SSO 시스템 상세 설계 문서

## 1. 시스템 구성요소 상세

### 1.1 SSO 서버 (NestJS)

```
src/
├── auth/                           # 인증 모듈
│   ├── controllers/
│   │   ├── auth.controller.ts      # 인증 관련 엔드포인트
│   │   └── system.controller.ts    # 시스템 등록/관리 엔드포인트
│   ├── services/
│   │   ├── auth.service.ts         # 인증 로직
│   │   ├── token.service.ts        # 토큰 발급/검증
│   │   └── system.service.ts       # 시스템 관리
│   ├── guards/
│   │   └── jwt.guard.ts            # JWT 검증 가드
│   └── strategies/
│       └── jwt.strategy.ts         # JWT 전략
├── logs/                           # 로그 모듈
│   ├── controllers/
│   │   └── logs.controller.ts      # 로그 조회 엔드포인트
│   ├── services/
│   │   └── logs.service.ts         # 로그 처리 로직
│   └── entities/
│       └── log.entity.ts           # 로그 엔티티
├── systems/                        # 시스템 관리 모듈
│   ├── controllers/
│   │   └── systems.controller.ts   # 시스템 관리 엔드포인트
│   ├── services/
│   │   └── systems.service.ts      # 시스템 관리 로직
│   └── entities/
│       └── system.entity.ts        # 시스템 엔티티
├── tokens/                         # 토큰 관리 모듈
│   ├── controllers/
│   │   └── tokens.controller.ts    # 토큰 관리 엔드포인트
│   ├── services/
│   │   └── tokens.service.ts       # 토큰 관리 로직
│   └── entities/
│       └── token.entity.ts         # 토큰 엔티티
├── users/                          # 사용자 관리 모듈
│   ├── controllers/
│   │   └── users.controller.ts     # 사용자 관리 엔드포인트
│   ├── services/
│   │   └── users.service.ts        # 사용자 관리 로직
│   └── entities/
│       └── user.entity.ts          # 사용자 엔티티
├── common/                         # 공통 모듈
│   ├── decorators/                 # 커스텀 데코레이터
│   ├── filters/                    # 예외 필터
│   └── interfaces/                 # 공통 인터페이스
└── redis/
    └── redis.service.ts            # Redis 연동 서비스
```

### 1.2 프론트엔드 관리자 (Next.js)

```
front-lsso/
├── src/
│   ├── app/
│   │   ├── dashboard/              # 대시보드 페이지
│   │   ├── systems/                # 시스템 관리 페이지
│   │   ├── users/                  # 사용자 관리 페이지
│   │   ├── tokens/                 # 토큰 관리 페이지
│   │   ├── logs/                   # 로그 조회 페이지
│   │   └── settings/               # 설정 페이지
│   ├── components/                 # 공통 컴포넌트
│   └── hooks/                      # 커스텀 훅
```

## 2. 데이터베이스 스키마

### 2.1 시스템 테이블

```sql
CREATE TABLE systems (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    domain VARCHAR(255) NOT NULL,
    system_secret VARCHAR(255) NOT NULL,
    webhook_url VARCHAR(255),
    allowed_origin JSONB DEFAULT '[]',
    health_check_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);
```

### 2.2 사용자 테이블

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    employee_number VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(50),
    hire_date DATE,
    status VARCHAR(50),
    department VARCHAR(255),
    position VARCHAR(255),
    rank VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.3 토큰 테이블

```sql
CREATE TABLE tokens (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    key_id VARCHAR(255) NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    access_token_expires_at TIMESTAMP NOT NULL,
    refresh_token_expires_at TIMESTAMP,
    last_access TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 2.4 로그 테이블

```sql
CREATE TABLE logs (
    id UUID PRIMARY KEY,
    host VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    url TEXT NOT NULL,
    params JSONB,
    query JSONB,
    body JSONB,
    ip VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    request_timestamp TIMESTAMP NOT NULL,
    response_timestamp TIMESTAMP,
    response_time INTEGER,
    status_code INTEGER,
    response JSONB,
    error JSONB,
    is_error BOOLEAN DEFAULT false
);
```

## 3. API 엔드포인트 상세

### 3.1 인증 API (auth)

```
POST /api/auth/login
- 헤더: {
    X-System-Id: string,
    X-System-Secret: string
}
- 요청: { email, password }
- 응답: {
    access_token: JWT,
    refresh_token: string,
    key_id: string,
    access_token_expires_at: timestamp,
    refresh_token_expires_at: timestamp
}

POST /api/auth/refresh
- 헤더: {
    X-System-Id: string,
    X-System-Secret: string
}
- 요청: { refresh_token }
- 응답: {
    access_token: JWT,
    refresh_token: string,
    key_id: string,
    access_token_expires_at: timestamp,
    refresh_token_expires_at: timestamp
}

POST /api/auth/logout
- 헤더: {
    X-System-Id: string,
    X-System-Secret: string
}
- 요청: { access_token }
- 응답: { success: boolean }
```

### 3.2 시스템 관리 API (systems)

```
POST /api/systems/register
- 요청: {
    name: string,
    domain: string,
    description?: string,
    webhook_url?: string,
    allowed_origin?: string[],
    health_check_url?: string
}
- 응답: {
    system_id: string,
    system_secret: string
}

GET /api/systems
- 응답: System[]

PUT /api/systems/:id
- 요청: {
    name?: string,
    domain?: string,
    description?: string,
    webhook_url?: string,
    allowed_origin?: string[],
    health_check_url?: string,
    is_active?: boolean
}
```

### 3.3 사용자 관리 API (users)

```
GET /api/users
- 응답: User[]

POST /api/users
- 요청: {
    employee_number: string,
    name: string,
    email: string,
    password: string,
    phone_number?: string,
    date_of_birth?: Date,
    gender?: string,
    hire_date?: Date,
    status?: string,
    department?: string,
    position?: string,
    rank?: string
}

PUT /api/users/:id
- 요청: {
    employee_number?: string,
    name?: string,
    email?: string,
    password?: string,
    phone_number?: string,
    date_of_birth?: Date,
    gender?: string,
    hire_date?: Date,
    status?: string,
    department?: string,
    position?: string,
    rank?: string
}
```

### 3.4 토큰 관리 API (tokens)

```
GET /api/tokens
- 응답: Token[]

POST /api/tokens/revoke
- 요청: { access_token: string }
- 응답: { success: boolean }
```

### 3.5 로그 관리 API (logs)

```
GET /api/logs
- 쿼리: {
    startDate?: string,
    endDate?: string,
    userId?: string,
    host?: string,
    method?: string,
    statusCode?: number,
    isError?: boolean
}
- 응답: Log[]
```

## 4. 보안 상세

### 4.1 HTTPS 강제 설정

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // HTTPS 강제 리다이렉트
    app.use((req, res, next) => {
        if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
            const httpsUrl = `https://${req.get('host')}${req.url}`;
            return res.redirect(301, httpsUrl);
        }
        next();
    });

    // HSTS 설정
    app.use((req, res, next) => {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        next();
    });

    await app.listen(configService.get('PORT'));
}
bootstrap();
```

### 4.2 JWT 구조

```typescript
interface JWTHeader {
    alg: 'RS256';
    kid: string; // key_id
}

interface JWTPayload {
    sub: string; // user_id
    iss: string; // SSO 서버 도메인
    aud: string; // system_id
    exp: number; // 만료 시간
    iat: number; // 발급 시간
    role: string; // 사용자 역할
}
```

### 4.3 키 관리 정책

-   키 생성: RSA 2048비트
-   키 회전: 24시간마다
-   키 만료: 48시간
-   키 보관: 암호화된 상태로 데이터베이스 저장

### 4.4 Redis 블랙리스트 구조

```typescript
interface BlacklistEntry {
    token: string;
    expires_at: number;
    system_id: string;
}
```

## 5. 에러 처리

### 5.1 주요 에러 코드

```typescript
enum ErrorCode {
    INVALID_CREDENTIALS = 'AUTH_001',
    TOKEN_EXPIRED = 'AUTH_002',
    INVALID_TOKEN = 'AUTH_003',
    SYSTEM_NOT_FOUND = 'SYS_001',
    INVALID_SYSTEM_SECRET = 'SYS_002',
    KEY_EXPIRED = 'KEY_001',
    USER_NOT_FOUND = 'USR_001',
    LOG_NOT_FOUND = 'LOG_001',
    TOKEN_NOT_FOUND = 'TOK_001',
}
```

### 5.2 에러 응답 형식

```typescript
interface ErrorResponse {
    code: string;
    message: string;
    timestamp: string;
}
```

## 6. 모니터링 및 로깅

### 6.1 로그 레벨

-   ERROR: 인증 실패, 시스템 오류
-   WARN: 토큰 만료, 키 만료 임박
-   INFO: 로그인/로그아웃, 시스템 등록
-   DEBUG: 토큰 검증, 키 회전

### 6.2 모니터링 지표

-   인증 요청 수
-   토큰 발급/갱신 수
-   시스템별 요청 수
-   에러 발생률
-   Redis 블랙리스트 크기

## 7. 배포 및 운영

### 7.1 환경 구성

```yaml
# docker-compose.yml
services:
    sso-server:
        image: sso-server:latest
        environment:
            - NODE_ENV=production
            - REDIS_URL=redis://redis:6379
            - DATABASE_URL=postgres://...
        ports:
            - '3000:3000'
        depends_on:
            - redis
            - postgres

    redis:
        image: redis:alpine
        ports:
            - '6379:6379'

    postgres:
        image: postgres:13
        environment:
            - POSTGRES_PASSWORD=...
        volumes:
            - postgres_data:/var/lib/postgresql/data
```

### 7.2 백업 전략

-   데이터베이스: 매일 전체 백업
-   Redis: AOF(Append Only File) 활성화
-   키 저장소: 별도 암호화 백업

## 8. 확장 계획

### 8.1 단기

-   OIDC 지원
-   다중 인증 방식 지원 (SMS, 이메일)
-   관리자 대시보드 기능 확장

### 8.2 중기

-   Key Management System 연동
-   분산 캐시 시스템 도입
-   마이크로서비스 아키텍처 전환

### 8.3 장기

-   AI 기반 이상 접근 감지
-   글로벌 분산 시스템 구축
-   Zero Trust 아키텍처 적용

# Application Layer

Application 레이어는 Context 모듈들을 조합하여 실제 비즈니스 로직을 구현하는 계층입니다.

## 구조

```
application/
├── auth/                              # 인증 관련 Application 모듈
│   ├── dto/                          # Application 레벨 DTO
│   │   ├── login-request.dto.ts      # 로그인 요청 DTO
│   │   ├── login-response.dto.ts     # 로그인 응답 DTO
│   │   ├── token-verify-response.dto.ts
│   │   ├── change-password.dto.ts
│   │   ├── check-password.dto.ts
│   │   └── index.ts
│   ├── controllers/
│   │   └── auth-application.controller.ts  # 기존 API 호환 컨트롤러
│   ├── auth-application.service.ts   # Application 서비스
│   └── auth-application.module.ts    # Application 모듈
└── index.ts                          # Export 파일
```

## 역할

1. **API 호환성**: 기존 라이브 서비스의 API 스펙을 그대로 유지
2. **Context 조합**: 여러 Context 모듈을 조합하여 복합 비즈니스 로직 구현
3. **DTO 변환**: API 레벨 DTO ↔ Context 레벨 DTO 변환
4. **오류 처리**: Application 레벨에서 발생하는 오류 처리
5. **트랜잭션 관리**: 복합 작업에 대한 트랜잭션 관리

## AuthApplication 모듈

### 주요 기능

-   **시스템 인증**: Basic Auth를 통한 외부 시스템 인증
-   **로그인 처리**: 이메일/비밀번호 또는 리프레시 토큰을 통한 로그인
-   **토큰 검증**: Bearer 토큰 검증 및 사용자 정보 반환
-   **비밀번호 관리**: 비밀번호 변경 및 확인

### Context 의존성

-   **SsoContextService**: 로그인, 토큰 검증, 로그아웃 처리
-   **SystemManagementContextService**: 시스템 인증, 토큰 관리
-   **OrganizationContextService**: 직원 조직 정보 조회

### API 엔드포인트

-   `POST /auth/login`: 로그인 및 토큰 발급
-   `POST /auth/verify`: 토큰 검증
-   `POST /auth/change-password`: 비밀번호 변경
-   `POST /auth/check-password`: 비밀번호 확인

## 사용 방법

```typescript
// 기존 컨트롤러 대신 Application 컨트롤러 사용
import { AuthApplicationController } from './application/auth/controllers/auth-application.controller';

// 또는 Application 서비스 직접 사용
import { AuthApplicationService } from './application/auth/auth-application.service';
```

## 확장 가능성

-   추가 Application 모듈 (조직 관리, 시스템 관리, 웹훅 관리 등)
-   배치 작업 Application 모듈
-   보고서/통계 Application 모듈
-   알림 Application 모듈

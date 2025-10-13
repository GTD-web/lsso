# SSO Application API 문서

## 개요

외부 시스템 인증을 위한 Single Sign-On (SSO) API입니다. 이 API는 외부 시스템들이 사용자 인증, 토큰 검증, 비밀번호 관리 등의 기능을 수행할 수 있도록 제공합니다.

**Base URL**: `/auth`

## 목차

-   [인증 방식](#인증-방식)
-   [SDK 통합 가이드](#sdk-통합-가이드)
-   [API 엔드포인트](#api-엔드포인트)
    -   [1. 시스템 인증](#1-시스템-인증)
    -   [2. 로그인 및 토큰 발급](#2-로그인-및-토큰-발급)
    -   [3. 토큰 검증](#3-토큰-검증)
    -   [4. 비밀번호 변경](#4-비밀번호-변경)
    -   [5. 비밀번호 확인](#5-비밀번호-확인)
    -   [6. 만료된 토큰 정리](#6-만료된-토큰-정리-배치작업)
-   [에러 처리](#에러-처리)
-   [보안 고려사항](#보안-고려사항)
-   [사용 예시](#사용-예시)
-   [변경 이력](#변경-이력)

## 인증 방식

-   **Bearer Token**: 대부분의 API에서 `Authorization: Bearer {access_token}` 헤더를 사용
-   **Basic Auth**: 시스템 인증 시 `Authorization: Basic {base64(clientId:clientSecret)}` 사용

## SDK 통합 가이드

SDK를 사용하는 외부 시스템은 다음 순서로 인증을 진행합니다:

### 1단계: 시스템 인증

-   `/auth/system` 엔드포인트로 Basic Auth를 통해 시스템 인증
-   `clientId`와 `clientSecret`을 Base64로 인코딩하여 `Authorization: Basic {encoded}` 헤더에 포함

### 2단계: 시스템 정보 저장

-   응답받은 `systemId`와 `systemName`을 저장
-   이 정보는 이후 모든 API 요청에서 사용됨

### 3단계: API 요청 시 시스템 식별

-   모든 후속 API 요청 시 `X-System-Name: {systemName}` 헤더를 포함
-   이 헤더는 로깅 및 추적 목적으로 사용됨 (선택사항이지만 권장)
-   서버는 이 헤더를 통해 어떤 시스템에서 요청이 왔는지 기록함

### 보안 참고사항

-   `clientId`와 `clientSecret`은 안전하게 보관해야 함
-   시스템 인증은 SDK 초기화 시 한 번만 수행
-   `systemName`은 민감한 정보가 아니므로 헤더에 포함해도 안전함

---

## API 엔드포인트

### 1. 시스템 인증

**POST** `/auth/system`

SDK가 시스템을 인증하여 시스템 정보를 받습니다. 이후 모든 API 요청 시 `X-System-Name` 헤더에 시스템 이름을 포함해야 합니다.

#### 요청

**Headers:**

-   `Authorization: Basic {base64(clientId:clientSecret)}` (필수)

**Body:** 없음

#### 응답

**성공 (200 OK):**

```json
{
    "systemId": "550e8400-e29b-41d4-a716-446655440000",
    "systemName": "LRIM System"
}
```

**에러 응답:**

-   `401 Unauthorized`: 인증 실패 (잘못된 clientId 또는 clientSecret)

#### 사용 예시

```bash
# clientId: my-app, clientSecret: secret123
# base64("my-app:secret123") = bXktYXBwOnNlY3JldDEyMw==

curl -X POST http://localhost:3000/auth/system \
  -H "Authorization: Basic bXktYXBwOnNlY3JldDEyMw=="
```

---

### 2. 로그인 및 토큰 발급

**POST** `/auth/login`

OAuth2 방식의 로그인을 지원합니다. 이메일/비밀번호 로그인(password grant)과 리프레시 토큰 재발급(refresh_token grant) 두 가지 방식을 제공합니다.

#### 요청

**Headers:**

-   `Content-Type: application/json`
-   `X-System-Name: {systemName}` (선택사항, 로깅 목적)

**Body:**

**1) 이메일/비밀번호 로그인 (password grant):**

```json
{
    "grant_type": "password",
    "email": "user@example.com",
    "password": "userPassword123"
}
```

**2) 리프레시 토큰으로 재발급 (refresh_token grant):**

```json
{
    "grant_type": "refresh_token",
    "refresh_token": "your_refresh_token_here"
}
```

#### 응답

**성공 (200 OK):**

```json
{
    "tokenType": "Bearer",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2023-12-31T23:59:59.000Z",
    "refreshToken": "refresh_token_string",
    "refreshTokenExpiresAt": "2024-01-30T23:59:59.000Z",
    "id": "user-uuid",
    "name": "사용자 이름",
    "email": "user@example.com",
    "employeeNumber": "EMP001",
    "phoneNumber": "010-1234-5678",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "gender": "M",
    "hireDate": "2020-01-01T00:00:00.000Z",
    "status": "ACTIVE",
    "department": "개발팀",
    "position": "시니어 개발자",
    "rank": "과장",
    "systemRoles": {
        "rms": ["resourceManager"],
        "lrim": ["interviewee"]
    }
}
```

**에러 응답:**

-   `400 Bad Request`: 잘못된 요청 형식
-   `401 Unauthorized`: 시스템 인증 실패 또는 사용자 로그인 실패
-   `404 Not Found`: 사용자 또는 시스템을 찾을 수 없음

---

### 3. 토큰 검증

**POST** `/auth/verify`

제공된 Bearer 토큰의 유효성을 검증합니다.

#### 요청

**Headers:**

-   `Content-Type: application/json`
-   `Authorization: Bearer {access_token}` (필수)
-   `X-System-Name: {systemName}` (선택사항, 로깅 목적)

**Body:** 없음

#### 응답

**성공 (200 OK):**

```json
{
    "valid": true,
    "user_info": {
        "id": "user-uuid",
        "name": "사용자 이름",
        "email": "user@example.com",
        "employee_number": "EMP001"
    },
    "expires_in": 3600
}
```

**에러 응답:**

-   `401 Unauthorized`: 유효하지 않은 토큰

---

### 4. 비밀번호 변경

**POST** `/auth/change-password`

인증된 사용자의 비밀번호를 변경합니다.

#### 요청

**Headers:**

-   `Content-Type: application/json`
-   `Authorization: Bearer {access_token}` (필수)
-   `X-System-Name: {systemName}` (선택사항, 로깅 목적)

**Body:**

```json
{
    "newPassword": "newPassword456"
}
```

**참고:** 현재 비밀번호는 Authorization 헤더의 토큰으로 검증되므로 별도로 전송하지 않습니다.

#### 응답

**성공 (200 OK):**

```json
{
    "message": "비밀번호가 성공적으로 변경되었습니다."
}
```

**에러 응답:**

-   `400 Bad Request`: 잘못된 요청 형식
-   `401 Unauthorized`: 인증 실패

---

### 5. 비밀번호 확인

**POST** `/auth/check-password`

현재 비밀번호가 일치하는지 확인합니다.

#### 요청

**Headers:**

-   `Content-Type: application/json`
-   `Authorization: Bearer {access_token}` (필수)
-   `X-System-Name: {systemName}` (선택사항, 로깅 목적)

**Body:**

```json
{
    "currentPassword": "currentPassword123",
    "email": "user@example.com"
}
```

**참고:** email 필드는 선택사항입니다.

#### 응답

**성공 (200 OK):**

```json
{
    "isValid": true
}
```

**에러 응답:**

-   `400 Bad Request`: 잘못된 요청 형식
-   `401 Unauthorized`: 인증 실패

---

### 6. 만료된 토큰 정리 (배치작업)

**GET** `/auth/cron/clean-up/token`

만료된 토큰들을 데이터베이스에서 삭제하는 배치작업을 실행합니다.

#### 요청

**Headers:** 없음

**Body:** 없음

#### 응답

**성공 (200 OK):**

```json
{
    "deletedCount": 150,
    "message": "만료된 토큰 150개가 성공적으로 삭제되었습니다."
}
```

**에러 응답:**

-   `500 Internal Server Error`: 서버 내부 오류

---

## 에러 처리

모든 API는 표준 HTTP 상태 코드를 사용하며, 에러 발생 시 다음과 같은 형식으로 응답합니다:

```json
{
    "statusCode": 400,
    "message": "에러 메시지",
    "error": "Bad Request"
}
```

## 보안 고려사항

1. **HTTPS 사용**: 모든 API 호출은 HTTPS를 통해 수행되어야 합니다.
2. **토큰 만료**: 액세스 토큰은 제한된 수명을 가지며, 만료 후 재발급이 필요합니다.
3. **비밀번호 정책**: 새 비밀번호는 시스템의 비밀번호 정책을 준수해야 합니다.
4. **Rate Limiting**: API 호출에 대한 속도 제한이 적용될 수 있습니다.

## 사용 예시

### JavaScript (fetch) - SDK 통합 예시

```javascript
// 1. 시스템 인증
const systemAuthResponse = await fetch('/auth/system', {
    method: 'POST',
    headers: {
        Authorization: 'Basic bXktYXBwOnNlY3JldDEyMw==', // base64(clientId:clientSecret)
    },
});

const systemData = await systemAuthResponse.json();
const { systemId, systemName } = systemData;

// 시스템 정보를 저장 (이후 모든 요청에 사용)
localStorage.setItem('systemName', systemName);

// 2. 로그인
const loginResponse = await fetch('/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-System-Name': systemName, // 시스템 식별 헤더
    },
    body: JSON.stringify({
        grant_type: 'password',
        email: 'user@example.com',
        password: 'password123',
    }),
});

const loginData = await loginResponse.json();
const accessToken = loginData.accessToken;

// 3. 토큰 검증
const verifyResponse = await fetch('/auth/verify', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-System-Name': systemName, // 시스템 식별 헤더
    },
});

const verifyData = await verifyResponse.json();
```

### cURL

```bash
# 1. 시스템 인증
curl -X POST http://localhost:3000/auth/system \
  -H "Authorization: Basic bXktYXBwOnNlY3JldDEyMw=="

# Response: { "systemId": "...", "systemName": "LRIM System" }

# 2. 로그인 - 이메일/비밀번호
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -H "X-System-Name: LRIM System" \
  -d '{
    "grant_type": "password",
    "email": "user@example.com",
    "password": "password123"
  }'

# 3. 로그인 - 리프레시 토큰으로 재발급
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -H "X-System-Name: LRIM System" \
  -d '{
    "grant_type": "refresh_token",
    "refresh_token": "your_refresh_token"
  }'

# 4. 토큰 검증
curl -X POST http://localhost:3000/auth/verify \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-System-Name: LRIM System"
```

---

## 변경 이력

### v1.1 (2024)

-   시스템 인증 API 추가 (`POST /auth/system`)
-   SDK 통합 가이드 추가
-   `X-System-Name` 헤더를 통한 시스템 식별 기능 추가
-   모든 API 엔드포인트 번호 재정렬

### v1.0 (2024)

-   초기 버전
-   로그인, 토큰 검증, 비밀번호 관리 API

---

**문서 버전**: 1.1  
**최종 업데이트**: 2024년  
**담당자**: SSO 개발팀

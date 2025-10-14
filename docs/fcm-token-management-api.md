# FCM Token Management API 문서

## 개요

Firebase Cloud Messaging (FCM) 토큰 관리를 위한 API입니다. 이 API는 직원의 FCM 토큰 등록, 조회, 삭제 등의 기능을 제공하며, 푸시 알림 전송을 위한 토큰 관리를 담당합니다.

**Base URL**: `/fcm`

## 목차

-   [인증 방식](#인증-방식)
-   [API 엔드포인트](#api-엔드포인트)
    -   [1. FCM 토큰 구독](#1-fcm-토큰-구독)
    -   [2. FCM 토큰 조회](#2-fcm-토큰-조회)
    -   [3. FCM 토큰 구독 해지](#3-fcm-토큰-구독-해지)
    -   [4. 여러 직원의 FCM 토큰 조회](#4-여러-직원의-fcm-토큰-조회)
-   [에러 처리](#에러-처리)
-   [사용 예시](#사용-예시)
-   [비즈니스 규칙](#비즈니스-규칙)

## 인증 방식

-   **X-System-Name**: 시스템 식별을 위한 헤더 (선택사항, 로깅 목적)
-   일부 API는 인증이 필요할 수 있습니다 (Bearer Token 또는 시스템별 인증 방식)

---

## API 엔드포인트

### 1. FCM 토큰 구독

**POST** `/fcm/subscribe`

사용자의 FCM 토큰을 등록하거나 업데이트합니다. employeeId와 employeeNumber가 둘 다 제공된 경우 정합성을 체크합니다.

#### 요청

**Headers:**

-   `Content-Type: application/json`
-   `X-System-Name: {systemName}` (선택사항)

**Body:**

```json
{
    "employeeId": "123e4567-e89b-12d3-a456-426614174000",
    "employeeNumber": "25001",
    "fcmToken": "fXyZ1234abcd..."
}
```

**Body Parameters:**

| 필드             | 타입   | 필수   | 설명                          | 예시                                   |
| ---------------- | ------ | ------ | ----------------------------- | -------------------------------------- |
| `employeeId`     | string | 선택\* | 직원 ID (UUID)                | `123e4567-e89b-12d3-a456-426614174000` |
| `employeeNumber` | string | 선택\* | 직원 번호                     | `25001`                                |
| `fcmToken`       | string | 필수   | Firebase Cloud Messaging 토큰 | `fXyZ1234abcd...`                      |

_\* `employeeId` 또는 `employeeNumber` 중 하나는 필수. 둘 다 제공된 경우 정합성 체크_

#### 응답

**성공 (200 OK):**

```json
{
    "success": true,
    "message": "FCM 토큰이 성공적으로 등록되었습니다.",
    "employeeId": "123e4567-e89b-12d3-a456-426614174000",
    "fcmToken": "fXyZ1234abcd..."
}
```

**에러 응답:**

-   `400 Bad Request`: 잘못된 요청 형식 또는 employeeId와 employeeNumber 정합성 오류

```json
{
    "statusCode": 400,
    "message": "employeeId와 employeeNumber가 서로 다른 직원을 가리킵니다.",
    "error": "Bad Request"
}
```

-   `404 Not Found`: 직원 정보를 찾을 수 없음

```json
{
    "statusCode": 404,
    "message": "직원 정보를 찾을 수 없습니다.",
    "error": "Not Found"
}
```

---

### 2. FCM 토큰 조회

**GET** `/fcm/token`

employeeId 또는 employeeNumber로 직원의 모든 FCM 토큰을 조회합니다. 둘 다 제공된 경우 같은 직원을 가리키는지 정합성을 체크합니다.

#### 요청

**Headers:**

-   `X-System-Name: {systemName}` (선택사항)

**Query Parameters:**

| 파라미터         | 타입   | 필수   | 설명           | 예시                                   |
| ---------------- | ------ | ------ | -------------- | -------------------------------------- |
| `employeeId`     | string | 선택\* | 직원 ID (UUID) | `123e4567-e89b-12d3-a456-426614174000` |
| `employeeNumber` | string | 선택\* | 직원 번호      | `25001`                                |

_\* `employeeId` 또는 `employeeNumber` 중 하나는 필수_

#### 응답

**성공 (200 OK):**

```json
{
    "employeeId": "123e4567-e89b-12d3-a456-426614174000",
    "employeeNumber": "25001",
    "fcmTokens": [
        {
            "id": "token-uuid-1",
            "fcmToken": "fXyZ1234abcd...",
            "createdAt": "2024-01-01T10:00:00.000Z",
            "updatedAt": "2024-01-01T10:00:00.000Z"
        },
        {
            "id": "token-uuid-2",
            "fcmToken": "aBcD5678efgh...",
            "createdAt": "2024-01-02T15:30:00.000Z",
            "updatedAt": "2024-01-02T15:30:00.000Z"
        }
    ],
    "totalCount": 2
}
```

**에러 응답:**

-   `400 Bad Request`: 잘못된 요청 형식 또는 employeeId와 employeeNumber 정합성 오류
-   `404 Not Found`: 직원 정보를 찾을 수 없음

---

### 3. FCM 토큰 구독 해지

**POST** `/fcm/unsubscribe`

employeeId 또는 employeeNumber로 FCM 토큰 구독을 해지합니다. 둘 다 제공된 경우 정합성을 체크합니다.

#### 요청

**Headers:**

-   `Content-Type: application/json`
-   `X-System-Name: {systemName}` (선택사항)

**Body:**

```json
{
    "employeeId": "123e4567-e89b-12d3-a456-426614174000",
    "employeeNumber": "25001",
    "fcmToken": "fXyZ1234abcd..."
}
```

**Body Parameters:**

| 필드             | 타입   | 필수   | 설명                                       | 예시                                   |
| ---------------- | ------ | ------ | ------------------------------------------ | -------------------------------------- |
| `employeeId`     | string | 선택\* | 직원 ID (UUID)                             | `123e4567-e89b-12d3-a456-426614174000` |
| `employeeNumber` | string | 선택\* | 직원 번호                                  | `25001`                                |
| `fcmToken`       | string | 필수   | 해지할 FCM 토큰 (선택 시 특정 토큰만 해지) | `fXyZ1234abcd...`                      |

_\* `employeeId` 또는 `employeeNumber` 중 하나는 필수_

#### 응답

**성공 (200 OK):**

```json
true
```

**에러 응답:**

-   `400 Bad Request`: 잘못된 요청 형식 또는 employeeId와 employeeNumber 정합성 오류
-   `404 Not Found`: 직원 정보를 찾을 수 없음

---

### 4. 여러 직원의 FCM 토큰 조회

**GET** `/fcm/tokens`

알림서버에서 사용할 여러 직원의 FCM 토큰을 조회합니다. employeeIds 또는 employeeNumbers 중 하나를 제공해야 합니다.

#### 요청

**Headers:**

-   `X-System-Name: {systemName}` (선택사항)

**Query Parameters:**

| 파라미터          | 타입   | 필수   | 설명                         | 예시                                                                        |
| ----------------- | ------ | ------ | ---------------------------- | --------------------------------------------------------------------------- |
| `employeeIds`     | string | 선택\* | 직원 ID 배열 (쉼표로 구분)   | `123e4567-e89b-12d3-a456-426614174000,123e4567-e89b-12d3-a456-426614174001` |
| `employeeNumbers` | string | 선택\* | 직원 번호 배열 (쉼표로 구분) | `25001,25002,25003`                                                         |

_\* `employeeIds` 또는 `employeeNumbers` 중 하나는 필수. `employeeIds`가 제공된 경우 우선 사용_

#### 응답

**성공 (200 OK):**

```json
{
    "employees": [
        {
            "employeeId": "123e4567-e89b-12d3-a456-426614174000",
            "employeeNumber": "25001",
            "fcmTokens": [
                {
                    "id": "token-uuid-1",
                    "fcmToken": "fXyZ1234abcd...",
                    "createdAt": "2024-01-01T10:00:00.000Z"
                }
            ]
        },
        {
            "employeeId": "123e4567-e89b-12d3-a456-426614174001",
            "employeeNumber": "25002",
            "fcmTokens": [
                {
                    "id": "token-uuid-2",
                    "fcmToken": "aBcD5678efgh...",
                    "createdAt": "2024-01-02T15:30:00.000Z"
                }
            ]
        }
    ],
    "totalCount": 2
}
```

**에러 응답:**

-   `400 Bad Request`: employeeIds 또는 employeeNumbers 중 하나는 반드시 제공되어야 함

```json
{
    "statusCode": 400,
    "message": "employeeIds 또는 employeeNumbers 중 하나는 반드시 제공되어야 합니다.",
    "error": "Bad Request"
}
```

-   `404 Not Found`: 직원 정보를 조회할 수 없음

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

### 일반적인 상태 코드

| 코드 | 설명                              |
| ---- | --------------------------------- |
| 200  | OK - 요청 성공                    |
| 400  | Bad Request - 잘못된 요청         |
| 404  | Not Found - 리소스를 찾을 수 없음 |
| 500  | Internal Server Error - 서버 오류 |

---

## 사용 예시

### JavaScript (fetch)

```javascript
// 1. FCM 토큰 구독
const subscribeFcm = async (employeeNumber, fcmToken, systemName) => {
    const response = await fetch('/fcm/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-System-Name': systemName,
        },
        body: JSON.stringify({
            employeeNumber,
            fcmToken,
        }),
    });
    return await response.json();
};

// 2. FCM 토큰 조회
const getFcmToken = async (employeeNumber, systemName) => {
    const response = await fetch(`/fcm/token?employeeNumber=${employeeNumber}`, {
        method: 'GET',
        headers: {
            'X-System-Name': systemName,
        },
    });
    return await response.json();
};

// 3. FCM 토큰 구독 해지
const unsubscribeFcm = async (employeeNumber, fcmToken, systemName) => {
    const response = await fetch('/fcm/unsubscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-System-Name': systemName,
        },
        body: JSON.stringify({
            employeeNumber,
            fcmToken,
        }),
    });
    return await response.json();
};

// 4. 여러 직원의 FCM 토큰 조회 (알림서버용)
const getMultipleFcmTokens = async (employeeNumbers, systemName) => {
    const response = await fetch(`/fcm/tokens?employeeNumbers=${employeeNumbers.join(',')}`, {
        method: 'GET',
        headers: {
            'X-System-Name': systemName,
        },
    });
    return await response.json();
};
```

### cURL

```bash
# 1. FCM 토큰 구독
curl -X POST http://localhost:3000/fcm/subscribe \
  -H "Content-Type: application/json" \
  -H "X-System-Name: LRIM System" \
  -d '{
    "employeeNumber": "25001",
    "fcmToken": "fXyZ1234abcd..."
  }'

# 2. FCM 토큰 조회
curl -X GET "http://localhost:3000/fcm/token?employeeNumber=25001" \
  -H "X-System-Name: LRIM System"

# 3. FCM 토큰 구독 해지
curl -X POST http://localhost:3000/fcm/unsubscribe \
  -H "Content-Type: application/json" \
  -H "X-System-Name: LRIM System" \
  -d '{
    "employeeNumber": "25001",
    "fcmToken": "fXyZ1234abcd..."
  }'

# 4. 여러 직원의 FCM 토큰 조회 (employeeIds 사용)
curl -X GET "http://localhost:3000/fcm/tokens?employeeIds=123e4567-e89b-12d3-a456-426614174000,123e4567-e89b-12d3-a456-426614174001" \
  -H "X-System-Name: LRIM System"

# 4. 여러 직원의 FCM 토큰 조회 (employeeNumbers 사용)
curl -X GET "http://localhost:3000/fcm/tokens?employeeNumbers=25001,25002,25003" \
  -H "X-System-Name: LRIM System"
```

### React Native / Mobile App 예시

```javascript
// Firebase 초기화 및 FCM 토큰 가져오기
import messaging from '@react-native-firebase/messaging';

// FCM 토큰 가져오기 및 구독
const setupFCM = async (employeeNumber) => {
    try {
        // FCM 권한 요청
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            // FCM 토큰 가져오기
            const fcmToken = await messaging().getToken();

            // 서버에 FCM 토큰 등록
            await subscribeFcm(employeeNumber, fcmToken, 'LRIM Mobile App');

            console.log('FCM 토큰 등록 완료:', fcmToken);
        }
    } catch (error) {
        console.error('FCM 설정 오류:', error);
    }
};

// 앱 로그아웃 시 FCM 토큰 해지
const handleLogout = async (employeeNumber) => {
    try {
        const fcmToken = await messaging().getToken();
        await unsubscribeFcm(employeeNumber, fcmToken, 'LRIM Mobile App');
        console.log('FCM 토큰 해지 완료');
    } catch (error) {
        console.error('FCM 토큰 해지 오류:', error);
    }
};
```

---

## 비즈니스 규칙

### FCM 토큰 관리 규칙

1. **직원 식별자 정합성**: `employeeId`와 `employeeNumber`가 모두 제공된 경우, 동일한 직원을 가리켜야 합니다.
2. **토큰 중복 등록**: 동일한 FCM 토큰이 이미 등록되어 있으면 업데이트됩니다.
3. **다중 디바이스 지원**: 한 직원이 여러 디바이스에서 로그인할 수 있으므로, 여러 FCM 토큰을 가질 수 있습니다.
4. **토큰 만료**: FCM 토큰은 만료되거나 갱신될 수 있으므로, 주기적으로 업데이트해야 합니다.
5. **구독 해지**: 로그아웃 시 또는 앱 삭제 시 FCM 토큰을 해지해야 합니다.

### 알림 서버 통합

-   **여러 직원 조회**: 알림 서버는 `/fcm/tokens` 엔드포인트를 사용하여 여러 직원의 FCM 토큰을 일괄 조회할 수 있습니다.
-   **우선순위**: `employeeIds`가 제공되면 `employeeNumbers`보다 우선 사용됩니다.
-   **대량 조회**: 성능을 위해 한 번에 최대 100명까지 조회하는 것을 권장합니다.

---

## 통합 시나리오

### 모바일 앱 로그인 플로우

```
1. 사용자 로그인 성공
   ↓
2. Firebase에서 FCM 토큰 가져오기
   ↓
3. POST /fcm/subscribe로 토큰 등록
   ↓
4. 푸시 알림 수신 준비 완료
```

### 모바일 앱 로그아웃 플로우

```
1. 사용자 로그아웃 요청
   ↓
2. POST /fcm/unsubscribe로 토큰 해지
   ↓
3. 로컬 저장소 정리
   ↓
4. 로그아웃 완료
```

### 알림 서버 푸시 발송 플로우

```
1. 알림 대상 직원 목록 생성
   ↓
2. GET /fcm/tokens로 FCM 토큰 조회
   ↓
3. Firebase Admin SDK로 푸시 알림 발송
   ↓
4. 발송 결과 로깅
```

---

## 보안 고려사항

1. **토큰 보안**: FCM 토큰은 민감한 정보이므로 HTTPS를 통해서만 전송해야 합니다.
2. **직원 정보 검증**: FCM 토큰 등록 시 해당 직원의 존재 여부를 확인합니다.
3. **정합성 체크**: `employeeId`와 `employeeNumber`가 모두 제공된 경우 동일한 직원인지 검증합니다.
4. **알림 서버 인증**: 여러 직원의 토큰을 조회하는 `/fcm/tokens` 엔드포인트는 알림 서버만 접근할 수 있도록 제한해야 합니다.

---

## 변경 이력

### v1.0 (2024)

-   초기 버전
-   FCM 토큰 구독/조회/해지 API
-   여러 직원의 FCM 토큰 일괄 조회 API (알림서버용)
-   직원 식별자 정합성 체크 기능

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024년  
**담당자**: 알림 시스템 개발팀

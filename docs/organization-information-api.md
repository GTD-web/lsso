# Organization Information API 문서

## 개요

조직 정보 조회 및 관리를 위한 API입니다. 이 API는 직원 정보 조회, 부서 계층구조 조회, 직원 채용 및 퇴사 처리 등의 기능을 제공합니다.

**Base URL**: `/organization`

## 목차

-   [인증 방식](#인증-방식)
-   [API 엔드포인트](#api-엔드포인트)
    -   [1. 직원 정보 조회](#1-직원-정보-조회)
    -   [2. 여러 직원 정보 조회](#2-여러-직원-정보-조회)
    -   [3. 부서 계층구조별 직원 정보 조회](#3-부서-계층구조별-직원-정보-조회)
    -   [4. 직원 생성 (채용)](#4-직원-생성-채용)
    -   [5. 직원 퇴사처리](#5-직원-퇴사처리)
    -   [6. 조직 정보 마이그레이션 (Cron)](#6-조직-정보-마이그레이션-cron)
-   [에러 처리](#에러-처리)
-   [사용 예시](#사용-예시)

## 인증 방식

-   **Bearer Token**: 대부분의 API에서 `Authorization: Bearer {access_token}` 헤더를 사용
-   **X-System-Name**: 시스템 식별을 위한 헤더 (선택사항, 로깅 목적)

---

## API 엔드포인트

### 1. 직원 정보 조회

**GET** `/organization/employee`

직원 ID 또는 사번으로 직원의 기본 정보와 조직 정보를 조회합니다.

#### 요청

**Headers:**

-   `Authorization: Bearer {access_token}` (필수)
-   `X-System-Name: {systemName}` (선택사항)

**Query Parameters:**

| 파라미터         | 타입    | 필수   | 설명                                   | 예시       |
| ---------------- | ------- | ------ | -------------------------------------- | ---------- |
| `employeeId`     | string  | 선택\* | 직원 ID                                | `emp123`   |
| `employeeNumber` | string  | 선택\* | 사번                                   | `E2023001` |
| `withDetail`     | boolean | 선택   | 상세 정보 포함 여부 (부서, 직책, 직급) | `true`     |

_\* `employeeId` 또는 `employeeNumber` 중 하나는 필수_

#### 응답

**성공 (200 OK):**

```json
{
    "id": "emp123",
    "name": "홍길동",
    "email": "hong@example.com",
    "employeeNumber": "E2023001",
    "phoneNumber": "010-1234-5678",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "gender": "M",
    "hireDate": "2023-01-01T00:00:00.000Z",
    "status": "ACTIVE",
    "department": {
        "id": "dept-uuid",
        "departmentName": "개발팀",
        "departmentCode": "DEV"
    },
    "position": {
        "id": "pos-uuid",
        "positionTitle": "시니어 개발자"
    },
    "rank": {
        "id": "rank-uuid",
        "rankName": "과장"
    }
}
```

**에러 응답:**

-   `400 Bad Request`: 잘못된 요청 형식 (직원 ID 또는 사번 중 하나는 필수)
-   `401 Unauthorized`: 인증이 필요합니다
-   `404 Not Found`: 해당 직원을 찾을 수 없음

---

### 2. 여러 직원 정보 조회

**GET** `/organization/employees`

직원 ID 배열 또는 사번 배열로 여러 직원의 정보를 조회합니다. 배열이 비어있으면 전체 직원을 조회합니다.

#### 요청

**Headers:**

-   `Authorization: Bearer {access_token}` (필수)
-   `X-System-Name: {systemName}` (선택사항)

**Query Parameters:**

| 파라미터            | 타입    | 필수 | 설명                           | 예시                     |
| ------------------- | ------- | ---- | ------------------------------ | ------------------------ |
| `identifiers`       | string  | 선택 | 직원 식별자 배열 (쉼표로 구분) | `emp123,E2023001,emp456` |
| `withDetail`        | boolean | 선택 | 상세 정보 포함 여부            | `false`                  |
| `includeTerminated` | boolean | 선택 | 퇴사한 직원 포함 여부          | `false`                  |

#### 응답

**성공 (200 OK):**

```json
{
    "employees": [
        {
            "id": "emp123",
            "name": "홍길동",
            "email": "hong@example.com",
            "employeeNumber": "E2023001",
            "phoneNumber": "010-1234-5678",
            "dateOfBirth": "1990-01-01T00:00:00.000Z",
            "gender": "M",
            "hireDate": "2023-01-01T00:00:00.000Z",
            "status": "ACTIVE"
        },
        {
            "id": "emp456",
            "name": "김철수",
            "email": "kim@example.com",
            "employeeNumber": "E2023002",
            "phoneNumber": "010-5678-1234",
            "dateOfBirth": "1992-05-15T00:00:00.000Z",
            "gender": "M",
            "hireDate": "2023-03-01T00:00:00.000Z",
            "status": "ACTIVE"
        }
    ],
    "totalCount": 2
}
```

**에러 응답:**

-   `401 Unauthorized`: 인증이 필요합니다
-   `404 Not Found`: 직원 정보를 조회할 수 없음

---

### 3. 부서 계층구조별 직원 정보 조회

**GET** `/organization/departments/hierarchy`

부서의 계층구조를 따라 각 부서에 속한 직원들의 목록을 깊이와 함께 조회합니다.

#### 요청

**Headers:**

-   `Authorization: Bearer {access_token}` (필수)
-   `X-System-Name: {systemName}` (선택사항)

**Query Parameters:**

| 파라미터                  | 타입    | 필수 | 설명                                   | 예시            |
| ------------------------- | ------- | ---- | -------------------------------------- | --------------- |
| `rootDepartmentId`        | string  | 선택 | 조회할 최상위 부서 ID (미지정 시 전체) | `dept-uuid-123` |
| `maxDepth`                | number  | 선택 | 최대 조회 깊이 (기본값: 무제한)        | `3`             |
| `withEmployeeDetail`      | boolean | 선택 | 직원 상세 정보 포함 여부               | `true`          |
| `includeTerminated`       | boolean | 선택 | 퇴사한 직원 포함 여부                  | `false`         |
| `includeEmptyDepartments` | boolean | 선택 | 빈 부서 포함 여부                      | `true`          |

#### 응답

**성공 (200 OK):**

```json
{
    "departments": [
        {
            "id": "dept-1",
            "departmentName": "기술본부",
            "departmentCode": "TECH",
            "type": "DIVISION",
            "parentDepartmentId": null,
            "order": 0,
            "depth": 0,
            "employees": [
                {
                    "id": "emp-cto",
                    "name": "최기술",
                    "email": "cto@example.com",
                    "employeeNumber": "E2023001",
                    "phoneNumber": "010-1111-2222",
                    "dateOfBirth": "1980-01-01T00:00:00.000Z",
                    "gender": "M",
                    "hireDate": "2020-01-01T00:00:00.000Z",
                    "status": "ACTIVE",
                    "department": {
                        "id": "dept-1",
                        "departmentName": "기술본부",
                        "departmentCode": "TECH"
                    },
                    "position": {
                        "id": "pos-cto",
                        "positionTitle": "CTO"
                    },
                    "rank": {
                        "id": "rank-exec",
                        "rankName": "임원"
                    }
                }
            ],
            "employeeCount": 1,
            "childDepartments": [
                {
                    "id": "dept-2",
                    "departmentName": "개발팀",
                    "departmentCode": "DEV",
                    "type": "TEAM",
                    "parentDepartmentId": "dept-1",
                    "parentDepartmentName": "기술본부",
                    "order": 0,
                    "depth": 1,
                    "employees": [
                        {
                            "id": "emp-dev1",
                            "name": "홍길동",
                            "email": "hong@example.com",
                            "employeeNumber": "E2023002",
                            "status": "ACTIVE"
                        }
                    ],
                    "employeeCount": 1,
                    "childDepartments": [],
                    "childDepartmentCount": 0
                }
            ],
            "childDepartmentCount": 1
        }
    ],
    "totalDepartments": 2,
    "totalEmployees": 2,
    "maxDepth": 1
}
```

**에러 응답:**

-   `401 Unauthorized`: 인증이 필요합니다
-   `404 Not Found`: 부서 계층구조 정보를 조회할 수 없음

---

### 4. 직원 생성 (채용)

**POST** `/organization/employee`

채용 프로세스 완료 후 새로운 직원을 생성합니다. 검증 규칙 4단계에 따라 완전한 검증을 수행합니다.

#### 요청

**Headers:**

-   `Authorization: Bearer {access_token}` (필수)
-   `Content-Type: application/json`
-   `X-System-Name: {systemName}` (선택사항)

**Body:**

```json
{
    "name": "홍길동",
    "employeeNumber": "E2025001",
    "email": "hong@example.com",
    "phoneNumber": "010-1234-5678",
    "dateOfBirth": "1990-01-01",
    "gender": "M",
    "hireDate": "2025-01-01",
    "currentRankId": "rank-uuid",
    "assignments": [
        {
            "departmentId": "dept-uuid",
            "positionId": "pos-uuid",
            "isManager": false
        }
    ]
}
```

**Body Parameters:**

| 필드             | 타입   | 필수 | 설명                  | 예시               |
| ---------------- | ------ | ---- | --------------------- | ------------------ |
| `name`           | string | 필수 | 직원 이름             | `홍길동`           |
| `employeeNumber` | string | 필수 | 사번 (고유값)         | `E2025001`         |
| `email`          | string | 선택 | 이메일                | `hong@example.com` |
| `phoneNumber`    | string | 선택 | 전화번호              | `010-1234-5678`    |
| `dateOfBirth`    | string | 필수 | 생년월일 (YYYY-MM-DD) | `1990-01-01`       |
| `gender`         | string | 필수 | 성별 (M/F)            | `M`                |
| `hireDate`       | string | 필수 | 입사일 (YYYY-MM-DD)   | `2025-01-01`       |
| `currentRankId`  | string | 필수 | 직급 ID               | `rank-uuid`        |
| `assignments`    | array  | 필수 | 부서/직책 배정 정보   | 아래 참조          |

**Assignments 객체:**

| 필드           | 타입    | 필수 | 설명                        |
| -------------- | ------- | ---- | --------------------------- |
| `departmentId` | string  | 필수 | 부서 ID                     |
| `positionId`   | string  | 필수 | 직책 ID                     |
| `isManager`    | boolean | 선택 | 매니저 여부 (기본값: false) |

#### 응답

**성공 (201 Created):**

```json
{
    "id": "emp-new-uuid",
    "name": "홍길동",
    "employeeNumber": "E2025001",
    "email": "hong@example.com",
    "phoneNumber": "010-1234-5678",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "gender": "M",
    "hireDate": "2025-01-01T00:00:00.000Z",
    "status": "ACTIVE",
    "currentRankId": "rank-uuid",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "message": "직원이 성공적으로 생성되었습니다."
}
```

**에러 응답:**

-   `400 Bad Request`: 입력 데이터가 유효하지 않거나 비즈니스 규칙을 위반

```json
{
    "statusCode": 400,
    "message": "이미 존재하는 사번입니다: E2025001",
    "error": "Bad Request"
}
```

-   `404 Not Found`: 참조하는 직급, 부서, 직책이 존재하지 않음

```json
{
    "statusCode": 404,
    "message": "존재하지 않는 직급입니다: rank-uuid",
    "error": "Not Found"
}
```

---

### 5. 직원 퇴사처리

**POST** `/organization/employee/terminate`

수습기간 평가 후 불합격 시 직원을 퇴사처리합니다. 3개월 수습기간이 지난 후에만 가능합니다.

#### 요청

**Headers:**

-   `Authorization: Bearer {access_token}` (필수)
-   `Content-Type: application/json`
-   `X-System-Name: {systemName}` (선택사항)

**Body:**

```json
{
    "employeeNumber": "E2025001",
    "terminationDate": "2025-06-30",
    "terminationReason": "수습기간 평가 불합격"
}
```

**Body Parameters:**

| 필드                | 타입   | 필수 | 설명                   | 예시                   |
| ------------------- | ------ | ---- | ---------------------- | ---------------------- |
| `employeeNumber`    | string | 필수 | 퇴사처리할 직원의 사번 | `E2025001`             |
| `terminationDate`   | string | 필수 | 퇴사일 (YYYY-MM-DD)    | `2025-06-30`           |
| `terminationReason` | string | 선택 | 퇴사 사유              | `수습기간 평가 불합격` |

#### 응답

**성공 (200 OK):**

```json
{
    "id": "emp-uuid",
    "name": "홍길동",
    "employeeNumber": "E2025001",
    "status": "TERMINATED",
    "terminationDate": "2025-06-30T00:00:00.000Z",
    "terminationReason": "수습기간 평가 불합격",
    "message": "직원이 성공적으로 퇴사처리되었습니다."
}
```

**에러 응답:**

-   `400 Bad Request`: 수습기간이 지나지 않음

```json
{
    "statusCode": 400,
    "message": "수습기간(3개월)이 지나지 않았습니다. 최소 퇴사일: 2025-04-01",
    "error": "Bad Request"
}
```

-   `404 Not Found`: 해당 직원을 찾을 수 없음

```json
{
    "statusCode": 404,
    "message": "직원을 찾을 수 없습니다: E2025001",
    "error": "Not Found"
}
```

-   `409 Conflict`: 이미 퇴사처리된 직원

```json
{
    "statusCode": 409,
    "message": "이미 퇴사처리된 직원입니다: 홍길동(E2025001)",
    "error": "Conflict"
}
```

---

### 6. 조직 정보 마이그레이션 (Cron)

**GET** `/organization/cron/sync`

Vercel cron에서 호출되는 마이그레이션 API입니다. 매일 자정에 자동 실행됩니다.

#### 요청

**Headers:** 없음 (Public 엔드포인트)

**Body:** 없음

#### 응답

**성공 (200 OK):**

```json
{
    "success": true,
    "message": "마이그레이션이 성공적으로 완료되었습니다. (실행시간: 2.5초)",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "executionTime": "2.5초"
}
```

**에러 응답 (500 Internal Server Error):**

```json
{
    "success": false,
    "message": "마이그레이션 중 오류가 발생했습니다. (실행시간: 1.2초)",
    "error": "Database connection failed",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

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

| 코드 | 설명                                   |
| ---- | -------------------------------------- |
| 200  | OK - 요청 성공                         |
| 201  | Created - 리소스 생성 성공             |
| 400  | Bad Request - 잘못된 요청              |
| 401  | Unauthorized - 인증 필요               |
| 404  | Not Found - 리소스를 찾을 수 없음      |
| 409  | Conflict - 리소스 충돌 (중복 등)       |
| 500  | Internal Server Error - 서버 내부 오류 |

---

## 사용 예시

### JavaScript (fetch)

```javascript
// 1. 직원 정보 조회
const getEmployee = async (employeeNumber, token, systemName) => {
    const response = await fetch(`/organization/employee?employeeNumber=${employeeNumber}&withDetail=true`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'X-System-Name': systemName,
        },
    });
    return await response.json();
};

// 2. 부서 계층구조 조회
const getDepartmentHierarchy = async (token, systemName) => {
    const response = await fetch(
        '/organization/departments/hierarchy?withEmployeeDetail=true&includeEmptyDepartments=true',
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'X-System-Name': systemName,
            },
        },
    );
    return await response.json();
};

// 3. 직원 생성 (채용)
const createEmployee = async (employeeData, token, systemName) => {
    const response = await fetch('/organization/employee', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-System-Name': systemName,
        },
        body: JSON.stringify(employeeData),
    });
    return await response.json();
};

// 4. 직원 퇴사처리
const terminateEmployee = async (terminationData, token, systemName) => {
    const response = await fetch('/organization/employee/terminate', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-System-Name': systemName,
        },
        body: JSON.stringify(terminationData),
    });
    return await response.json();
};
```

### cURL

```bash
# 1. 직원 정보 조회
curl -X GET "http://localhost:3000/organization/employee?employeeNumber=E2023001&withDetail=true" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "X-System-Name: LRIM System"

# 2. 여러 직원 정보 조회
curl -X GET "http://localhost:3000/organization/employees?identifiers=E2023001,E2023002&withDetail=false" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "X-System-Name: LRIM System"

# 3. 부서 계층구조 조회
curl -X GET "http://localhost:3000/organization/departments/hierarchy?withEmployeeDetail=true" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "X-System-Name: LRIM System"

# 4. 직원 생성 (채용)
curl -X POST http://localhost:3000/organization/employee \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-System-Name: LRIM System" \
  -d '{
    "name": "홍길동",
    "employeeNumber": "E2025001",
    "email": "hong@example.com",
    "phoneNumber": "010-1234-5678",
    "dateOfBirth": "1990-01-01",
    "gender": "M",
    "hireDate": "2025-01-01",
    "currentRankId": "rank-uuid",
    "assignments": [
      {
        "departmentId": "dept-uuid",
        "positionId": "pos-uuid",
        "isManager": false
      }
    ]
  }'

# 5. 직원 퇴사처리
curl -X POST http://localhost:3000/organization/employee/terminate \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-System-Name: LRIM System" \
  -d '{
    "employeeNumber": "E2025001",
    "terminationDate": "2025-06-30",
    "terminationReason": "수습기간 평가 불합격"
  }'

# 6. 마이그레이션 실행 (Cron)
curl -X GET http://localhost:3000/organization/cron/sync
```

---

## 비즈니스 규칙

### 직원 생성 규칙

1. **사번 고유성**: 사번은 시스템 내에서 고유해야 합니다.
2. **이메일 고유성**: 이메일이 제공된 경우 고유해야 합니다.
3. **필수 정보**: 이름, 사번, 생년월일, 성별, 입사일, 직급은 필수입니다.
4. **부서/직책 배정**: 최소 1개 이상의 부서/직책 배정이 필요합니다.
5. **참조 무결성**: 직급, 부서, 직책이 실제로 존재해야 합니다.

### 퇴사처리 규칙

1. **수습기간**: 입사일로부터 3개월이 지나야 퇴사처리 가능합니다.
2. **중복 퇴사 방지**: 이미 퇴사한 직원은 다시 퇴사처리할 수 없습니다.
3. **퇴사일 검증**: 퇴사일은 입사일보다 이후여야 하며, 수습기간(3개월) 이후여야 합니다.

---

## 변경 이력

### v1.0 (2024)

-   초기 버전
-   직원 정보 조회 API
-   부서 계층구조 조회 API
-   직원 채용 및 퇴사처리 API
-   조직 정보 마이그레이션 Cron API

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024년  
**담당자**: 조직 관리 개발팀

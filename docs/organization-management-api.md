# 조직 관리 API 문서

## 개요

조직의 부서, 직원, 직책, 직급 및 직원 배치를 관리하는 API입니다.

-   **Base URL**: `/admin/organizations`
-   **인증**: JWT Bearer Token 필요
-   **권한**: 관리자 권한 필요

---

## 1. 부서 관리 API

### 1.1 부서 목록 조회

전체 부서 목록을 계층구조로 조회합니다.

```
GET /admin/organizations/departments
```

**응답**

```json
{
  "departments": [
    {
      "id": "dept-uuid",
      "departmentName": "개발팀",
      "departmentCode": "DEV_TEAM",
      "type": "DEPARTMENT",
      "parentDepartmentId": "parent-uuid",
      "order": 1,
      "childDepartments": [...],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 1.2 부서 상세 조회

특정 부서의 상세 정보를 조회합니다.

```
GET /admin/organizations/departments/{id}
```

**매개변수**

-   `id` (string, required): 부서 ID

**응답**

```json
{
  "id": "dept-uuid",
  "departmentName": "개발팀",
  "departmentCode": "DEV_TEAM",
  "type": "DEPARTMENT",
  "parentDepartmentId": "parent-uuid",
  "order": 1,
  "childDepartments": [...],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 1.3 부서 생성

새로운 부서를 생성합니다.

```
POST /admin/organizations/departments
```

**요청 본문**

```json
{
    "departmentName": "개발팀",
    "departmentCode": "DEV_TEAM",
    "type": "DEPARTMENT",
    "parentDepartmentId": "parent-uuid",
    "order": 1
}
```

**필수 필드**

-   `departmentName`: 부서명
-   `departmentCode`: 부서 코드 (고유값)
-   `type`: 부서 유형 (COMPANY, DIVISION, DEPARTMENT, TEAM)

**선택 필드**

-   `parentDepartmentId`: 상위 부서 ID
-   `order`: 정렬 순서

### 1.4 부서 수정

기존 부서 정보를 수정합니다.

```
PUT /admin/organizations/departments/{id}
```

**매개변수**

-   `id` (string, required): 부서 ID

**요청 본문**

```json
{
    "departmentName": "수정된 개발팀",
    "departmentCode": "MODIFIED_DEV_TEAM",
    "type": "DEPARTMENT",
    "parentDepartmentId": "new-parent-uuid",
    "order": 2
}
```

### 1.5 부서 삭제

부서를 삭제합니다. (하위 부서나 배치된 직원이 있으면 삭제 불가)

```
DELETE /admin/organizations/departments/{id}
```

**매개변수**

-   `id` (string, required): 부서 ID

---

## 2. 직원 관리 API

### 2.1 직원 목록 조회

전체 직원 목록을 조회합니다.

```
GET /admin/organizations/employees
```

**응답**

```json
{
    "employees": [
        {
            "id": "emp-uuid",
            "employeeNumber": "EMP001",
            "name": "홍길동",
            "email": "hong@company.com",
            "phoneNumber": "010-1234-5678",
            "dateOfBirth": "1990-01-01",
            "gender": "MALE",
            "hireDate": "2023-01-01",
            "status": "재직중",
            "currentRankId": "rank-uuid",
            "terminationDate": null,
            "isInitialPasswordSet": false,
            "createdAt": "2024-01-01T00:00:00Z",
            "updatedAt": "2024-01-01T00:00:00Z"
        }
    ]
}
```

### 2.2 직원 상세 조회

특정 직원의 상세 정보를 조회합니다.

```
GET /admin/organizations/employees/{id}
```

**매개변수**

-   `id` (string, required): 직원 ID

### 2.3 직원 생성

새로운 직원을 생성합니다.

```
POST /admin/organizations/employees
```

**요청 본문**

```json
{
    "employeeNumber": "EMP001",
    "name": "홍길동",
    "email": "hong@company.com",
    "phoneNumber": "010-1234-5678",
    "dateOfBirth": "1990-01-01",
    "gender": "MALE",
    "hireDate": "2023-01-01",
    "currentRankId": "rank-uuid"
}
```

**필수 필드**

-   `employeeNumber`: 사번 (고유값)
-   `name`: 이름
-   `email`: 이메일 (고유값)
-   `hireDate`: 입사일

**선택 필드**

-   `phoneNumber`: 전화번호
-   `dateOfBirth`: 생년월일
-   `gender`: 성별 (MALE, FEMALE, OTHER)
-   `currentRankId`: 현재 직급 ID

### 2.4 직원 수정

기존 직원 정보를 수정합니다.

```
PUT /admin/organizations/employees/{id}
```

**매개변수**

-   `id` (string, required): 직원 ID

**요청 본문**

```json
{
    "name": "수정된 이름",
    "email": "new-email@company.com",
    "phoneNumber": "010-9876-5432",
    "status": "재직중",
    "terminationDate": "2024-12-31"
}
```

---

## 3. 직책 관리 API

### 3.1 직책 목록 조회

전체 직책 목록을 조회합니다.

```
GET /admin/organizations/positions
```

**응답**

```json
[
    {
        "id": "pos-uuid",
        "positionTitle": "부서장",
        "positionCode": "DEPT_HEAD",
        "level": 1,
        "hasManagementAuthority": true
    }
]
```

### 3.2 직책 생성

새로운 직책을 생성합니다.

```
POST /admin/organizations/positions
```

**요청 본문**

```json
{
    "positionTitle": "부서장",
    "positionCode": "DEPT_HEAD",
    "level": 1,
    "hasManagementAuthority": true
}
```

**필수 필드**

-   `positionTitle`: 직책명
-   `positionCode`: 직책 코드 (고유값)
-   `level`: 직책 레벨 (낮을수록 상위 직책)

**선택 필드**

-   `hasManagementAuthority`: 관리 권한 여부 (기본값: false)

### 3.3 직책 수정

기존 직책 정보를 수정합니다.

```
PUT /admin/organizations/positions/{id}
```

### 3.4 직책 삭제

직책을 삭제합니다. (해당 직책에 배치된 직원이 있으면 삭제 불가)

```
DELETE /admin/organizations/positions/{id}
```

---

## 4. 직급 관리 API

### 4.1 직급 목록 조회

전체 직급 목록을 조회합니다.

```
GET /admin/organizations/ranks
```

**응답**

```json
[
    {
        "id": "rank-uuid",
        "rankName": "과장",
        "rankCode": "MANAGER",
        "level": 3
    }
]
```

### 4.2 직급 생성

새로운 직급을 생성합니다.

```
POST /admin/organizations/ranks
```

**요청 본문**

```json
{
    "rankName": "과장",
    "rankCode": "MANAGER",
    "level": 3
}
```

**필수 필드**

-   `rankName`: 직급명
-   `rankCode`: 직급 코드 (고유값)
-   `level`: 직급 레벨 (낮을수록 상위 직급)

### 4.3 직급 수정

기존 직급 정보를 수정합니다.

```
PUT /admin/organizations/ranks/{id}
```

### 4.4 직급 삭제

직급을 삭제합니다. (해당 직급을 가진 직원이나 이력이 있으면 삭제 불가)

```
DELETE /admin/organizations/ranks/{id}
```

---

## 5. 직원 배치 관리 API

### 5.1 직원 부서/직책 배치

직원을 특정 부서의 특정 직책에 배치합니다.

```
POST /admin/organizations/employee-assignments
```

**요청 본문**

```json
{
    "employeeId": "emp-uuid",
    "departmentId": "dept-uuid",
    "positionId": "pos-uuid",
    "isManager": false
}
```

**필수 필드**

-   `employeeId`: 직원 ID
-   `departmentId`: 부서 ID
-   `positionId`: 직책 ID

**선택 필드**

-   `isManager`: 관리자 권한 여부 (기본값: false)

**응답**

```json
{
    "id": "assignment-uuid",
    "employeeId": "emp-uuid",
    "departmentId": "dept-uuid",
    "positionId": "pos-uuid",
    "isManager": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 5.2 직원 부서/직책 변경

기존 배치 정보를 변경합니다.

```
PUT /admin/organizations/employee-assignments/{id}
```

**매개변수**

-   `id` (string, required): 배치 ID

**요청 본문**

```json
{
    "departmentId": "new-dept-uuid",
    "positionId": "new-pos-uuid",
    "isManager": true
}
```

### 5.3 직원 부서/직책 해제

직원의 배치를 해제합니다.

```
DELETE /admin/organizations/employee-assignments/{id}
```

**매개변수**

-   `id` (string, required): 배치 ID

### 5.4 직원 배치 현황 조회

특정 직원의 모든 배치 현황을 조회합니다.

```
GET /admin/organizations/employees/{id}/assignments
```

**매개변수**

-   `id` (string, required): 직원 ID

**응답**

```json
[
    {
        "id": "assignment-uuid",
        "employeeId": "emp-uuid",
        "departmentId": "dept-uuid",
        "positionId": "pos-uuid",
        "isManager": false,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
    }
]
```

---

## 6. 직급 이력 관리 API

### 6.1 직원 직급 변경

직원의 직급을 변경하고 이력을 생성합니다.

```
POST /admin/organizations/employees/{id}/rank-promotion
```

**매개변수**

-   `id` (string, required): 직원 ID

**요청 본문**

```json
{
    "rankId": "new-rank-uuid"
}
```

**필수 필드**

-   `rankId`: 새로운 직급 ID

**응답**

```json
{
    "id": "history-uuid",
    "employeeId": "emp-uuid",
    "rankId": "rank-uuid",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 6.2 직원 직급 이력 조회

특정 직원의 직급 변경 이력을 조회합니다.

```
GET /admin/organizations/employees/{id}/rank-history
```

**매개변수**

-   `id` (string, required): 직원 ID

**응답**

```json
[
    {
        "id": "history-uuid",
        "employeeId": "emp-uuid",
        "rankId": "rank-uuid",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
    }
]
```

---

## 오류 응답

### 공통 오류 코드

-   `400 Bad Request`: 잘못된 요청 데이터
-   `401 Unauthorized`: 인증 토큰 누락 또는 만료
-   `403 Forbidden`: 권한 부족
-   `404 Not Found`: 리소스를 찾을 수 없음
-   `409 Conflict`: 중복된 데이터 (코드, 사번, 이메일 등)
-   `500 Internal Server Error`: 서버 내부 오류

### 오류 응답 예시

```json
{
    "statusCode": 400,
    "message": "이미 존재하는 부서 코드입니다.",
    "error": "Bad Request"
}
```

---

## 비즈니스 규칙

### 삭제 제한 사항

1. **부서 삭제**: 하위 부서가 있거나 배치된 직원이 있으면 삭제 불가
2. **직책 삭제**: 해당 직책에 배치된 직원이 있으면 삭제 불가
3. **직급 삭제**: 해당 직급을 가진 직원이나 이력이 있으면 삭제 불가

### 중복 검증

1. **부서 코드**: 전체 부서에서 고유해야 함
2. **직원 사번**: 전체 직원에서 고유해야 함
3. **직원 이메일**: 전체 직원에서 고유해야 함
4. **직책 코드**: 전체 직책에서 고유해야 함
5. **직급 코드**: 전체 직급에서 고유해야 함

### 배치 규칙

1. 한 직원은 같은 부서에서 하나의 직책만 가질 수 있음
2. 직원 배치 시 해당 직원, 부서, 직책이 모두 존재해야 함

### 직급 변경 규칙

1. 직급 변경 시 직원의 현재 직급이 업데이트됨
2. 모든 직급 변경은 이력으로 기록됨

---

## 사용 예시

### 새로운 직원 채용 및 배치 프로세스

1. 직원 생성: `POST /admin/organizations/employees`
2. 부서/직책 배치: `POST /admin/organizations/employee-assignments`
3. 직급 이력 생성: `POST /admin/organizations/employees/{id}/rank-promotion`

### 조직 구조 조회

1. 부서 계층구조: `GET /admin/organizations/departments`
2. 직원 목록: `GET /admin/organizations/employees`
3. 직책/직급 목록: `GET /admin/organizations/positions`, `GET /admin/organizations/ranks`

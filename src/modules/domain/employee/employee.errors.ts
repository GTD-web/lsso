/**
 * 도메인 에러 클래스들
 * 검증 규칙 2단계: 도메인 불변식(Invariant) 검증 실패
 * 검증 규칙 3단계: 도메인 규칙/정책(Policy) 검증 실패
 */

export abstract class EmployeeDomainError extends Error {
    errorCode: string;
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * 도메인 불변식 검증 실패 에러들 (2단계)
 * 목적: 항상 참이어야 하는 규칙(엔티티 일관성)
 * 실패 시: 422 Unprocessable Entity
 */
export class EmployeeInvariantError extends EmployeeDomainError {
    errorCode = 'EMPLOYEE_INVARIANT_VIOLATION';
    statusCode = 422;
}

export class InvalidEmployeeNumberFormatError extends EmployeeInvariantError {
    constructor(employeeNumber: string) {
        super(`잘못된 사번 형식입니다: ${employeeNumber}. 5자리 숫자여야 합니다.`);
        this.errorCode = 'INVALID_EMPLOYEE_NUMBER_FORMAT';
    }
}

export class InvalidEmailFormatError extends EmployeeInvariantError {
    constructor(email: string) {
        super(`잘못된 이메일 형식입니다: ${email}`);
        this.errorCode = 'INVALID_EMAIL_FORMAT';
    }
}

export class InvalidDateRangeError extends EmployeeInvariantError {
    constructor(fieldName: string, date: string) {
        super(`잘못된 날짜입니다: ${fieldName} - ${date}`);
        this.errorCode = 'INVALID_DATE_RANGE';
    }
}

export class InvalidHireDateError extends EmployeeInvariantError {
    constructor(hireDate: Date) {
        super(`입사일이 미래일 수 없습니다: ${hireDate.toISOString().split('T')[0]}`);
        this.errorCode = 'INVALID_HIRE_DATE';
    }
}

export class InvalidBirthDateError extends EmployeeInvariantError {
    constructor(birthDate: Date, hireDate: Date) {
        super(
            `생년월일이 입사일보다 늦을 수 없습니다: 생년월일=${birthDate.toISOString().split('T')[0]}, 입사일=${
                hireDate.toISOString().split('T')[0]
            }`,
        );
        this.errorCode = 'INVALID_BIRTH_DATE';
    }
}

/**
 * 도메인 정책 검증 실패 에러들 (3단계)
 * 목적: 여러 엔티티/VO에 걸친 규칙
 * 실패 시: 422 Unprocessable Entity 또는 409 Conflict
 */
export class EmployeePolicyError extends EmployeeDomainError {
    errorCode = 'EMPLOYEE_POLICY_VIOLATION';
    statusCode = 409;
}

export class InvalidEmployeeNumberYearPolicyError extends EmployeePolicyError {
    constructor(employeeNumber: string, expectedYear: number) {
        super(`사번의 연도가 올바르지 않습니다: ${employeeNumber}. ${expectedYear}년도 패턴이어야 합니다.`);
        this.errorCode = 'INVALID_EMPLOYEE_NUMBER_YEAR_POLICY';
    }
}

export class EmployeeNumberSequenceExceedsLimitError extends EmployeePolicyError {
    constructor(sequence: number, maxLimit: number) {
        super(`사번 순번이 최대 한계를 초과했습니다: ${sequence} > ${maxLimit}`);
        this.errorCode = 'EMPLOYEE_NUMBER_SEQUENCE_EXCEEDS_LIMIT';
    }
}

export class MinimumAgePolicyError extends EmployeePolicyError {
    constructor(age: number, minimumAge: number) {
        super(`최소 연령 요구사항을 만족하지 않습니다: ${age}세 < ${minimumAge}세`);
        this.errorCode = 'MINIMUM_AGE_POLICY_VIOLATION';
    }
}

/**
 * 컨텍스트/인프라 검증 실패 에러들 (4단계)
 * 목적: 경계 밖 의존성과 얽힌 제약
 */
export abstract class EmployeeContextError extends Error {
    errorCode: string;
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class DuplicateEmployeeNumberError extends EmployeeContextError {
    errorCode = 'DUPLICATE_EMPLOYEE_NUMBER';
    statusCode = 409;

    constructor(employeeNumber: string) {
        super(`이미 존재하는 사번입니다: ${employeeNumber}`);
    }
}

export class DuplicateEmailError extends EmployeeContextError {
    errorCode = 'DUPLICATE_EMAIL';
    statusCode = 409;

    constructor(email: string) {
        super(`이미 존재하는 이메일입니다: ${email}`);
    }
}

export class RankNotFoundError extends EmployeeContextError {
    errorCode = 'RANK_NOT_FOUND';
    statusCode = 404;

    constructor(rankId: string) {
        super(`존재하지 않는 직급입니다: ${rankId}`);
    }
}

export class DepartmentNotFoundError extends EmployeeContextError {
    errorCode = 'DEPARTMENT_NOT_FOUND';
    statusCode = 404;

    constructor(departmentId: string) {
        super(`존재하지 않는 부서입니다: ${departmentId}`);
    }
}

export class PositionNotFoundError extends EmployeeContextError {
    errorCode = 'POSITION_NOT_FOUND';
    statusCode = 404;

    constructor(positionId: string) {
        super(`존재하지 않는 직책입니다: ${positionId}`);
    }
}

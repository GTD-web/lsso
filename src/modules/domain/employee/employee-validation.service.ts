import { Injectable } from '@nestjs/common';
import { DomainEmployeeRepository } from './employee.repository';
import {
    InvalidEmployeeNumberFormatError,
    InvalidEmailFormatError,
    InvalidHireDateError,
    InvalidBirthDateError,
    InvalidEmployeeNumberYearPolicyError,
    EmployeeNumberSequenceExceedsLimitError,
    MinimumAgePolicyError,
} from './employee.errors';
import { Gender } from '../../../../libs/common/enums';

/**
 * 도메인 직원 검증 서비스
 * 검증 규칙 2단계: 도메인 불변식(Invariant) 검증
 * 검증 규칙 3단계: 도메인 규칙/정책(Policy) 검증
 */
@Injectable()
export class DomainEmployeeValidationService {
    constructor(private readonly employeeRepository: DomainEmployeeRepository) {}

    // ==================== 도메인 불변식 검증 (2단계) ====================

    /**
     * 사번 형식 검증 (불변식)
     * 규칙: 5자리 숫자여야 함
     */
    validateEmployeeNumberFormat(employeeNumber: string): void {
        if (!employeeNumber || employeeNumber.length !== 5) {
            throw new InvalidEmployeeNumberFormatError(employeeNumber);
        }

        if (!/^\d{5}$/.test(employeeNumber)) {
            throw new InvalidEmployeeNumberFormatError(employeeNumber);
        }
    }

    /**
     * 이메일 형식 검증 (불변식)
     */
    validateEmailFormat(email?: string): void {
        if (!email) return; // nullable이므로 선택사항

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new InvalidEmailFormatError(email);
        }
    }

    /**
     * 생년월일과 입사일 관계 검증 (불변식)
     * 규칙: 생년월일이 입사일보다 늦을 수 없음
     */
    validateBirthDateWithHireDate(birthDate?: Date, hireDate?: Date): void {
        if (!birthDate || !hireDate) return;

        if (birthDate >= hireDate) {
            throw new InvalidBirthDateError(birthDate, hireDate);
        }
    }

    // ==================== 도메인 정책 검증 (3단계) ====================

    /**
     * 사번 연도 정책 검증
     * 규칙: 사번의 앞 2자리는 현재 연도의 뒤 2자리여야 함
     */
    // validateEmployeeNumberYearPolicy(employeeNumber: string, expectedYear?: number): void {
    //     const currentYear = expectedYear || new Date().getFullYear();
    //     const yearSuffix = currentYear.toString().slice(-2);
    //     const employeeYearPrefix = employeeNumber.slice(0, 2);

    //     if (employeeYearPrefix !== yearSuffix) {
    //         throw new InvalidEmployeeNumberYearPolicyError(employeeNumber, currentYear);
    //     }
    // }

    /**
     * 사번 순번 한계 정책 검증
     * 규칙: 연도별 최대 999명까지만 등록 가능
     */
    validateEmployeeNumberSequenceLimit(employeeNumber: string, maxLimit: number = 999): void {
        const sequence = parseInt(employeeNumber.slice(2));
        if (sequence > maxLimit) {
            throw new EmployeeNumberSequenceExceedsLimitError(sequence, maxLimit);
        }
    }

    /**
     * 직원 생성 종합 검증
     * 모든 불변식과 정책을 한 번에 검증
     */
    validateEmployeeCreation(data: {
        employeeNumber: string;
        email?: string;
        // birthDate?: Date;
        // hireDate: Date;
        expectedYear?: number;
    }): void {
        // 불변식 검증
        this.validateEmployeeNumberFormat(data.employeeNumber);
        this.validateEmailFormat(data.email);
        // this.validateBirthDateWithHireDate(data.birthDate, data.hireDate);

        // 정책 검증
        // this.validateEmployeeNumberYearPolicy(data.employeeNumber, data.expectedYear);
        this.validateEmployeeNumberSequenceLimit(data.employeeNumber);
    }

    // ==================== 헬퍼 함수들 ====================
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeRepository } from './employee.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Employee } from './employee.entity';
import { EmployeeStatus } from '../../../../libs/common/enums';
import { In, Not, Like } from 'typeorm';
import * as bcrypt from '@node-rs/bcrypt';

@Injectable()
export class DomainEmployeeService extends BaseService<Employee> {
    constructor(private readonly employeeRepository: DomainEmployeeRepository) {
        super(employeeRepository);
    }

    // 예시: 직원 ID로 찾기
    async findByEmployeeId(employeeId: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
        return employee;
    }
    // 필요에 따라 Employee 관련 메서드를 추가하세요.

    async findByEmail(email: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({
            where: { email },
        });
        return employee;
    }

    async findByEmployeeNumber(employeeNumber: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where: { employeeNumber } });
        return employee;
    }

    /**
     * 직원의 비밀번호를 업데이트합니다
     */
    async updatePassword(employeeId: string, hashedPassword: string): Promise<Employee> {
        return this.update(employeeId, { password: hashedPassword });
    }

    hashPassword(password: string = '1234'): string {
        return bcrypt.hashSync(password, 10);
    }

    async verifyPassword(password: string, employee: Employee): Promise<boolean> {
        return bcrypt.compare(password, employee.password);
    }

    /**
     * 다중 직원 데이터를 일괄 저장합니다
     */
    async bulkSave(employees: Employee[]): Promise<Employee[]> {
        const savedEmployees: Employee[] = [];
        for (const employee of employees) {
            const saved = await this.save(employee);
            savedEmployees.push(saved);
        }
        return savedEmployees;
    }

    /**
     * 여러 직원 ID로 직원들을 조회합니다
     */
    async findByEmployeeIds(employeeIds: string[], includeTerminated = false): Promise<Employee[]> {
        const where: any = { id: In(employeeIds) };

        if (!includeTerminated) {
            where.status = Not(EmployeeStatus.Terminated);
        }

        return this.employeeRepository.findAll({ where });
    }

    /**
     * 여러 사번으로 직원들을 조회합니다
     */
    async findByEmployeeNumbers(employeeNumbers: string[], includeTerminated = false): Promise<Employee[]> {
        const where: any = { employeeNumber: In(employeeNumbers) };

        if (!includeTerminated) {
            where.status = Not(EmployeeStatus.Terminated);
        }

        return this.employeeRepository.findAll({ where });
    }

    /**
     * 전체 직원을 조회합니다
     */
    async findAllEmployees(includeTerminated = false): Promise<Employee[]> {
        const where: any = {};

        if (!includeTerminated) {
            where.status = Not(EmployeeStatus.Terminated);
        }

        return this.employeeRepository.findAll({
            where,
            order: { employeeNumber: 'ASC' },
        });
    }

    /**
     * 직원번호 패턴으로 직원을 조회합니다
     * @param pattern 직원번호 패턴 (예: "25" - 2025년도 직원들)
     */
    async findByEmployeeNumberPattern(pattern: string): Promise<Employee[]> {
        return await this.employeeRepository.findAll({
            where: {
                employeeNumber: Like(`${pattern}%`),
            },
            order: { employeeNumber: 'ASC' },
        });
    }

    /**
     * 직급 ID로 직원들 조회
     */
    async findByRankId(rankId: string): Promise<Employee[]> {
        return this.employeeRepository.findAll({
            where: { currentRankId: rankId },
            order: { employeeNumber: 'ASC' },
        });
    }

    /**
     * 직원 생성
     */
    async createEmployee(data: {
        employeeNumber: string;
        name: string;
        email: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        gender?: any;
        hireDate: Date;
        status: EmployeeStatus;
        currentRankId?: string;
        isInitialPasswordSet: boolean;
    }): Promise<Employee> {
        return this.save({
            ...data,
            password: this.hashPassword(data.employeeNumber),
            isInitialPasswordSet: true,
        });
    }

    /**
     * 직원 정보 수정
     */
    async updateEmployee(employeeId: string, data: Partial<Employee>): Promise<Employee> {
        return this.update(employeeId, data);
    }

    /**
     * 직원 삭제
     */
    async deleteEmployee(employeeId: string): Promise<void> {
        return this.delete(employeeId);
    }
}

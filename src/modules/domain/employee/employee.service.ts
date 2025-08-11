import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeRepository } from './employee.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Employee } from '../../../../libs/database/entities';
import * as bcrypt from '@node-rs/bcrypt';

@Injectable()
export class DomainEmployeeService extends BaseService<Employee> {
    constructor(private readonly employeeRepository: DomainEmployeeRepository) {
        super(employeeRepository);
    }

    // 예시: 직원 ID로 찾기
    async findByEmployeeId(employeeId: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
        if (!employee) {
            throw new NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }
    // 필요에 따라 Employee 관련 메서드를 추가하세요.

    async findByEmail(email: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({
            where: { email },
        });
        if (!employee) {
            throw new NotFoundException('직원을 찾을 수 없습니다.');
        }
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
}

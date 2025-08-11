import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from '../../../../../../libs/database/entities/employee.entity';
import { IRepositoryOptions } from '../../../../../../libs/common/interfaces/repository.interface';
import { DomainEmployeeService } from '../../../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../../../domain/department/department.service';
import { DomainPositionService } from '../../../../domain/position/position.service';
import { DomainRankService } from '../../../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../../../domain/employee-department-position/employee-department-position.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly employeeService: DomainEmployeeService,
        private readonly departmentService: DomainDepartmentService,
        private readonly positionService: DomainPositionService,
        private readonly rankService: DomainRankService,
        private readonly employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService,
    ) {}

    async findAll(options?: IRepositoryOptions<Employee>): Promise<Employee[]> {
        // 부서와 직위 정보를 포함하여 조회
        const enhancedOptions: IRepositoryOptions<Employee> = {
            ...options,
            relations: [
                'currentRank',
                'departmentPositions',
                'departmentPositions.department',
                'departmentPositions.position',
                ...(options?.relations || []),
            ],
        };
        return this.employeeService.findAll(enhancedOptions);
    }

    async findOne(id: string): Promise<Employee> {
        const options: IRepositoryOptions<Employee> = {
            where: { id },
            relations: [
                'currentRank',
                'departmentPositions',
                'departmentPositions.department',
                'departmentPositions.position',
            ],
        };
        return this.employeeService.findOne(options);
    }

    async findByEmployeeNumber(employeeNumber: string): Promise<Employee> {
        return this.employeeService.findByEmployeeNumber(employeeNumber);
    }

    async findByEmail(email: string): Promise<Employee> {
        return this.employeeService.findByEmail(email);
    }

    hashPassword(password: string = '1234'): string {
        return this.employeeService.hashPassword(password);
    }

    /**
     * Employee 엔티티를 직접 생성 (EmployeeResponseDto는 더 이상 사용하지 않음)
     */
    async createEmployee(employeeData: Partial<Employee>): Promise<Employee> {
        // 기본 비밀번호 설정
        if (!employeeData.password) {
            employeeData.password = this.hashPassword();
        }

        return this.employeeService.create(employeeData);
    }

    async save(employee: Employee): Promise<Employee> {
        return this.employeeService.save(employee);
    }

    async bulkSave(employees: Employee[]): Promise<Employee[]> {
        return this.employeeService.bulkSave(employees);
    }

    async update(id: string, employeeData: Partial<Employee>): Promise<Employee> {
        if (employeeData.password) {
            employeeData.password = this.hashPassword(employeeData.password);
        }
        return this.employeeService.update(id, employeeData);
    }

    async remove(id: string): Promise<void> {
        await this.employeeService.delete(id);
    }

    /**
     * 직원의 부서-직책 정보를 조회합니다
     */
    async getEmployeeWithDepartmentPosition(employeeId: string) {
        const employee = await this.findOne(employeeId);
        const departmentPositions = await this.employeeDepartmentPositionService.findByEmployeeId(employeeId);

        return {
            employee,
            departmentPositions,
        };
    }

    /**
     * 비밀번호 검증
     */
    async verifyPassword(password: string, employee: Employee): Promise<boolean> {
        return this.employeeService.verifyPassword(password, employee);
    }
}

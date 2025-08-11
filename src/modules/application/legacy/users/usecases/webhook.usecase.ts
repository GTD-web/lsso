import { Injectable } from '@nestjs/common';
import { Employee } from '../../../../../../libs/database/entities/employee.entity';
import { EmployeeResponseDto } from '../../../../context/migration/dto/employee-response.dto';
import { Gender, EmployeeStatus } from '../../../../../../libs/common/enums';
import axios from 'axios';
import { UsersService } from '../services/users.service';
import { AdminUsecase } from './admin.usecase';

@Injectable()
export class WebhookUsecase {
    constructor(private readonly usersService: UsersService, private readonly adminUsecase: AdminUsecase) {}

    async onModuleInit() {
        const users = await this.usersService.findAll();
        if (users.length === 0) {
            await this.syncEmployees();
        }
    }

    async getEmployees(): Promise<EmployeeResponseDto[]> {
        const employees = await axios.get(`${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`);
        const result: EmployeeResponseDto[] = [];
        employees.data.forEach((employee) => {
            result.push(new EmployeeResponseDto(employee));
        });
        return result;
    }

    async syncEmployees() {
        const employees = await this.getEmployees();
        for (const employee of employees) {
            const existingEmployee = await this.usersService.findByEmployeeNumber(employee.employee_number);
            if (existingEmployee) {
                // 기존 직원 정보 업데이트
                const updateData: Partial<Employee> = {
                    name: employee.name,
                    email: employee.email,
                    employeeNumber: employee.employee_number,
                    phoneNumber: employee.phone_number,
                    dateOfBirth: employee.date_of_birth ? new Date(employee.date_of_birth) : undefined,
                    gender: employee.gender as Gender,
                    hireDate: new Date(employee.hire_date),
                    status: employee.status as EmployeeStatus,
                };

                await this.usersService.update(existingEmployee.id, updateData);
            } else {
                // 새 직원 생성
                const newEmployeeData: Partial<Employee> = {
                    name: employee.name,
                    email: employee.email,
                    employeeNumber: employee.employee_number,
                    phoneNumber: employee.phone_number,
                    dateOfBirth: employee.date_of_birth ? new Date(employee.date_of_birth) : undefined,
                    gender: employee.gender as Gender,
                    hireDate: new Date(employee.hire_date),
                    status: employee.status as EmployeeStatus,
                    isInitialPasswordSet: false,
                };

                await this.usersService.createEmployee(newEmployeeData);
                await this.adminUsecase.sendInitPassSetMail(employee.email);
            }
        }
    }
}

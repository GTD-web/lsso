import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { EmployeeResponseDto } from '../dto/employee-response.dto';
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
            const user = await this.usersService.findByEmployeeNumber(employee.employee_number);
            if (user) {
                user.name = employee.name;
                user.email = employee.email;
                user.employeeNumber = employee.employee_number;
                user.phoneNumber = employee.phone_number;
                user.dateOfBirth = employee.date_of_birth;
                user.gender = employee.gender;
                user.hireDate = employee.hire_date;
                user.status = employee.status;
                user.department = employee.department;
                user.position = employee.position;
                user.rank = employee.rank;
                await this.usersService.save(user);
            } else {
                await this.usersService.save(this.usersService.create(employee));
                await this.adminUsecase.sendInitPassSetMail(employee.email);
            }
        }
    }
}

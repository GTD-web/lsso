import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { EmployeeResponseDto } from './dto/employee-response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async onModuleInit() {
        // await this.syncEmployees();
        const users = await this.findAll();
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
            const user = await this.findByEmployeeNumber(employee.employee_number);
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
                await this.save(user);
            } else {
                await this.save(this.create(employee));
            }
        }
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        return user;
    }

    async findByEmployeeNumber(employeeNumber: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { employeeNumber } });
        return user;
    }

    async findByEmail(email: string, relations?: string[]): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { email }, relations });
        return user;
    }

    hashPassword(password: string = '1234'): string {
        return bcrypt.hashSync(password, 10);
    }

    create(employee: EmployeeResponseDto): User {
        const userData = {
            name: employee.name,
            email: employee.email,
            employeeNumber: employee.employee_number,
            password: this.hashPassword(),
            phoneNumber: employee.phone_number,
            dateOfBirth: employee.date_of_birth,
            gender: employee.gender,
            hireDate: employee.hire_date,
            status: employee.status,
            department: employee.department,
            position: employee.position,
            rank: employee.rank,
        };
        const user = this.usersRepository.create(userData);
        return user;
    }

    async save(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    async bulkSave(users: User[]): Promise<User[]> {
        return this.usersRepository.save(users);
    }

    async update(id: string, userData: Partial<User>): Promise<User> {
        const user = await this.findOne(id);
        if (userData.password) {
            user.password = await this.hashPassword(userData.password);
        }
        Object.assign(user, userData);
        return this.usersRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    /**
     * 검색 조건에 맞는 사용자를 조회합니다.
     * @param query 검색어 (이름, 이메일, 직원번호, 부서, 직책 등)
     * @returns 검색 조건에 맞는 사용자 목록
     */
    async searchUsers(query: string): Promise<User[]> {
        if (!query) {
            return this.findAll();
        }

        // 검색 조건 설정
        const searchConditions: FindOptionsWhere<User>[] = [
            { name: Like(`%${query}%`) },
            { email: Like(`%${query}%`) },
            { employeeNumber: Like(`%${query}%`) },
            { department: Like(`%${query}%`) },
            { position: Like(`%${query}%`) },
            { rank: Like(`%${query}%`) },
        ];

        return this.usersRepository.find({
            where: searchConditions,
        });
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { EmployeeResponseDto } from '../dto/employee-response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll(options?: FindManyOptions<User>): Promise<User[]> {
        return this.usersRepository.find(options);
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
}

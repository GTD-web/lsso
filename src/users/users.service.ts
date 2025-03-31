import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        const users = await this.findAll();
        if (users.length === 0) {
            await this.syncEmployees();
        }
    }

    async getEmployees(): Promise<EmployeeResponseDto[]> {
        const employees = await axios.get(`${process.env.METADATA_MANAGER_URL}/api/employees`);
        return employees.data;
    }

    async syncEmployees() {
        const employees = await this.getEmployees();
        await this.bulkSave(employees.map((employee) => this.create(employee)));
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmployeeNumber(employeeNumber: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { employeeNumber } });
        if (!user) {
            throw new NotFoundException(`User with employeeNumber ${employeeNumber} not found`);
        }
        return user;
    }

    async findByEmail(email: string, relations?: string[]): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { email }, relations });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
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

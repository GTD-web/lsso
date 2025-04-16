"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const axios_1 = require("axios");
const employee_response_dto_1 = require("./dto/employee-response.dto");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async onModuleInit() {
        const users = await this.findAll();
        if (users.length === 0) {
            await this.syncEmployees();
        }
    }
    async getEmployees() {
        const employees = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`);
        const result = [];
        employees.data.forEach((employee) => {
            result.push(new employee_response_dto_1.EmployeeResponseDto(employee));
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
            }
            else {
                await this.save(this.create(employee));
            }
        }
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        return user;
    }
    async findByEmployeeNumber(employeeNumber) {
        const user = await this.usersRepository.findOne({ where: { employeeNumber } });
        return user;
    }
    async findByEmail(email, relations) {
        const user = await this.usersRepository.findOne({ where: { email }, relations });
        return user;
    }
    hashPassword(password = '1234') {
        return bcrypt.hashSync(password, 10);
    }
    create(employee) {
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
    async save(user) {
        return this.usersRepository.save(user);
    }
    async bulkSave(users) {
        return this.usersRepository.save(users);
    }
    async update(id, userData) {
        const user = await this.findOne(id);
        if (userData.password) {
            user.password = await this.hashPassword(userData.password);
        }
        Object.assign(user, userData);
        return this.usersRepository.save(user);
    }
    async remove(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
    }
    async searchUsers(query) {
        if (!query) {
            return this.findAll();
        }
        const searchConditions = [
            { name: (0, typeorm_2.Like)(`%${query}%`) },
            { email: (0, typeorm_2.Like)(`%${query}%`) },
            { employeeNumber: (0, typeorm_2.Like)(`%${query}%`) },
            { department: (0, typeorm_2.Like)(`%${query}%`) },
            { position: (0, typeorm_2.Like)(`%${query}%`) },
            { rank: (0, typeorm_2.Like)(`%${query}%`) },
        ];
        return this.usersRepository.find({
            where: searchConditions,
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map
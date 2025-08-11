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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEmployeeService = void 0;
const common_1 = require("@nestjs/common");
const employee_repository_1 = require("./employee.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
const bcrypt = require("bcrypt");
let DomainEmployeeService = class DomainEmployeeService extends base_service_1.BaseService {
    constructor(employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
    }
    async findByEmployeeId(employeeId) {
        const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
        if (!employee) {
            throw new common_1.NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }
    async findByEmail(email) {
        const employee = await this.employeeRepository.findOne({
            where: { email },
        });
        if (!employee) {
            throw new common_1.NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }
    async findByEmployeeNumber(employeeNumber) {
        const employee = await this.employeeRepository.findOne({ where: { employeeNumber } });
        return employee;
    }
    async updatePassword(employeeId, hashedPassword) {
        return this.update(employeeId, { password: hashedPassword });
    }
    hashPassword(password = '1234') {
        return bcrypt.hashSync(password, 10);
    }
    async verifyPassword(password, employee) {
        return bcrypt.compare(password, employee.password);
    }
    async bulkSave(employees) {
        const savedEmployees = [];
        for (const employee of employees) {
            const saved = await this.save(employee);
            savedEmployees.push(saved);
        }
        return savedEmployees;
    }
};
exports.DomainEmployeeService = DomainEmployeeService;
exports.DomainEmployeeService = DomainEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_repository_1.DomainEmployeeRepository])
], DomainEmployeeService);
//# sourceMappingURL=employee.service.js.map
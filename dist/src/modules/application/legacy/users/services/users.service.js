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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../../../../domain/employee/employee.service");
const department_service_1 = require("../../../../domain/department/department.service");
const position_service_1 = require("../../../../domain/position/position.service");
const rank_service_1 = require("../../../../domain/rank/rank.service");
const employee_department_position_service_1 = require("../../../../domain/employee-department-position/employee-department-position.service");
let UsersService = class UsersService {
    constructor(employeeService, departmentService, positionService, rankService, employeeDepartmentPositionService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.rankService = rankService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
    }
    async findAll(options) {
        const enhancedOptions = {
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
    async findOne(id) {
        const options = {
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
    async findByEmployeeNumber(employeeNumber) {
        return this.employeeService.findByEmployeeNumber(employeeNumber);
    }
    async findByEmail(email) {
        return this.employeeService.findByEmail(email);
    }
    hashPassword(password = '1234') {
        return this.employeeService.hashPassword(password);
    }
    async createEmployee(employeeData) {
        if (!employeeData.password) {
            employeeData.password = this.hashPassword();
        }
        return this.employeeService.create(employeeData);
    }
    async save(employee) {
        return this.employeeService.save(employee);
    }
    async bulkSave(employees) {
        return this.employeeService.bulkSave(employees);
    }
    async update(id, employeeData) {
        if (employeeData.password) {
            employeeData.password = this.hashPassword(employeeData.password);
        }
        return this.employeeService.update(id, employeeData);
    }
    async remove(id) {
        await this.employeeService.delete(id);
    }
    async getEmployeeWithDepartmentPosition(employeeId) {
        const employee = await this.findOne(employeeId);
        const departmentPositions = await this.employeeDepartmentPositionService.findByEmployeeId(employeeId);
        return {
            employee,
            departmentPositions,
        };
    }
    async verifyPassword(password, employee) {
        return this.employeeService.verifyPassword(password, employee);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService,
        position_service_1.DomainPositionService,
        rank_service_1.DomainRankService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService])
], UsersService);
//# sourceMappingURL=users.service.js.map
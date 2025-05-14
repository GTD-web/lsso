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
exports.WebhookUsecase = void 0;
const common_1 = require("@nestjs/common");
const employee_response_dto_1 = require("../dto/employee-response.dto");
const axios_1 = require("axios");
const users_service_1 = require("../services/users.service");
let WebhookUsecase = class WebhookUsecase {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async onModuleInit() {
        const users = await this.usersService.findAll();
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
            }
            else {
                await this.usersService.save(this.usersService.create(employee));
            }
        }
    }
};
exports.WebhookUsecase = WebhookUsecase;
exports.WebhookUsecase = WebhookUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], WebhookUsecase);
//# sourceMappingURL=webhook.usecase.js.map
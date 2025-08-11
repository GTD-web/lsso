"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./services/users.service");
const admin_controller_1 = require("./controllers/admin.controller");
const admin_usecase_1 = require("./usecases/admin.usecase");
const jwt_1 = require("@nestjs/jwt");
const mail_module_1 = require("../mail/mail.module");
const employee_module_1 = require("../../../domain/employee/employee.module");
const department_module_1 = require("../../../domain/department/department.module");
const position_module_1 = require("../../../domain/position/position.module");
const rank_module_1 = require("../../../domain/rank/rank.module");
const employee_department_position_module_1 = require("../../../domain/employee-department-position/employee-department-position.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mail_module_1.MailModule,
            jwt_1.JwtModule.register({}),
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            rank_module_1.DomainRankModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
            mail_module_1.MailModule,
        ],
        providers: [users_service_1.UsersService, admin_usecase_1.AdminUsecase],
        controllers: [admin_controller_1.AdminUsersController],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map
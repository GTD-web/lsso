"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationManagementContextModule = void 0;
const common_1 = require("@nestjs/common");
const organization_management_context_service_1 = require("./organization-management-context.service");
const employee_module_1 = require("../../domain/employee/employee.module");
const department_module_1 = require("../../domain/department/department.module");
const position_module_1 = require("../../domain/position/position.module");
const rank_module_1 = require("../../domain/rank/rank.module");
const employee_department_position_module_1 = require("../../domain/employee-department-position/employee-department-position.module");
const employee_rank_history_module_1 = require("../../domain/employee-rank-history/employee-rank-history.module");
let OrganizationManagementContextModule = class OrganizationManagementContextModule {
};
exports.OrganizationManagementContextModule = OrganizationManagementContextModule;
exports.OrganizationManagementContextModule = OrganizationManagementContextModule = __decorate([
    (0, common_1.Module)({
        imports: [
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            rank_module_1.DomainRankModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
            employee_rank_history_module_1.DomainEmployeeRankHistoryModule,
        ],
        providers: [organization_management_context_service_1.OrganizationContextService],
        exports: [organization_management_context_service_1.OrganizationContextService],
    })
], OrganizationManagementContextModule);
//# sourceMappingURL=organization-management-context.module.js.map
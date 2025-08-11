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
exports.OrganizationContextService = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../../domain/employee/employee.service");
const department_service_1 = require("../../domain/department/department.service");
const position_service_1 = require("../../domain/position/position.service");
const rank_service_1 = require("../../domain/rank/rank.service");
const employee_department_position_service_1 = require("../../domain/employee-department-position/employee-department-position.service");
const employee_rank_history_service_1 = require("../../domain/employee-rank-history/employee-rank-history.service");
let OrganizationContextService = class OrganizationContextService {
    constructor(직원서비스, 부서서비스, 직책서비스, 직급서비스, 직원부서직책서비스, 직원직급이력서비스) {
        this.직원서비스 = 직원서비스;
        this.부서서비스 = 부서서비스;
        this.직책서비스 = 직책서비스;
        this.직급서비스 = 직급서비스;
        this.직원부서직책서비스 = 직원부서직책서비스;
        this.직원직급이력서비스 = 직원직급이력서비스;
    }
    async 직원의_부서_직책_직급을_조회한다(employee) {
        const 부서직책정보 = await this.직원부서직책서비스.findByEmployeeId(employee.id);
        const department = await this.부서서비스.findById(부서직책정보.departmentId);
        const position = await this.직책서비스.findById(부서직책정보.positionId);
        const rank = await this.직급서비스.findById(employee.currentRankId);
        return { department, position, rank };
    }
};
exports.OrganizationContextService = OrganizationContextService;
exports.OrganizationContextService = OrganizationContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService,
        position_service_1.DomainPositionService,
        rank_service_1.DomainRankService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService,
        employee_rank_history_service_1.DomainEmployeeRankHistoryService])
], OrganizationContextService);
//# sourceMappingURL=organization-management-context.service.js.map
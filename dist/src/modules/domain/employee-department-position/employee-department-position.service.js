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
exports.DomainEmployeeDepartmentPositionService = void 0;
const common_1 = require("@nestjs/common");
const employee_department_position_repository_1 = require("./employee-department-position.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
const typeorm_1 = require("typeorm");
let DomainEmployeeDepartmentPositionService = class DomainEmployeeDepartmentPositionService extends base_service_1.BaseService {
    constructor(employeeDepartmentPositionRepository) {
        super(employeeDepartmentPositionRepository);
        this.employeeDepartmentPositionRepository = employeeDepartmentPositionRepository;
    }
    async findByEmployeeId(employeeId) {
        return this.employeeDepartmentPositionRepository.findOne({
            where: { employeeId },
        });
    }
    async findAllByEmployeeIds(employeeIds) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { employeeId: (0, typeorm_1.In)(employeeIds) },
            order: { createdAt: 'DESC' },
        });
    }
    async findByDepartmentId(departmentId) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByPositionId(positionId) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { positionId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByEmployeeAndDepartment(employeeId, departmentId) {
        const position = await this.employeeDepartmentPositionRepository.findOne({
            where: { employeeId, departmentId },
        });
        if (!position) {
            throw new common_1.NotFoundException('해당 부서에서 직원의 직책을 찾을 수 없습니다.');
        }
        return position;
    }
    async createEmployeeDepartmentPosition(employeeId, departmentId, positionId) {
        return this.employeeDepartmentPositionRepository.save({
            employeeId,
            departmentId,
            positionId,
        });
    }
    async deleteEmployeeDepartmentPosition(id) {
        await this.employeeDepartmentPositionRepository.delete(id);
    }
    async transferEmployee(employeeId, newDepartmentId, newPositionId) {
        return this.createEmployeeDepartmentPosition(employeeId, newDepartmentId, newPositionId);
    }
    async getDepartmentPositionStats(departmentId) {
        const positions = await this.findByDepartmentId(departmentId);
        const stats = positions.reduce((acc, position) => {
            acc[position.positionId] = (acc[position.positionId] || 0) + 1;
            return acc;
        }, {});
        return stats;
    }
    async findCurrentPositionByEmployeeId(employeeId) {
        const positions = await this.employeeDepartmentPositionRepository.findAll({
            where: { employeeId },
            order: { createdAt: 'DESC' },
            take: 1,
        });
        if (!positions.length) {
            throw new common_1.NotFoundException('직원의 부서-직책 정보를 찾을 수 없습니다.');
        }
        return positions[0];
    }
    async findManagersByDepartment(departmentId) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId },
            order: { createdAt: 'DESC' },
        });
    }
    async findRecentOrganizationChanges(limit = 20) {
        return this.employeeDepartmentPositionRepository.findAll({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
};
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService;
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository])
], DomainEmployeeDepartmentPositionService);
//# sourceMappingURL=employee-department-position.service.js.map
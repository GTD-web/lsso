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
var DomainDepartmentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainDepartmentService = void 0;
const common_1 = require("@nestjs/common");
const department_repository_1 = require("./department.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
let DomainDepartmentService = DomainDepartmentService_1 = class DomainDepartmentService extends base_service_1.BaseService {
    constructor(departmentRepository) {
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
        this.logger = new common_1.Logger(DomainDepartmentService_1.name);
    }
    async findById(departmentId) {
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
        });
        return department;
    }
    async findByName(departmentName) {
        const department = await this.departmentRepository.findOne({
            where: { departmentName },
        });
        if (!department) {
            throw new common_1.NotFoundException('부서를 찾을 수 없습니다.');
        }
        return department;
    }
    async findByCode(departmentCode) {
        const department = await this.departmentRepository.findOne({
            where: { departmentCode },
        });
        return department;
    }
    async findAllDepartments() {
        return this.departmentRepository.findAll({
            order: { departmentName: 'ASC' },
        });
    }
    async findRootDepartments() {
        return this.departmentRepository.findAll({
            where: { parentDepartmentId: null },
            order: { order: 'ASC' },
        });
    }
    async findAllDepartmentsWithChildren() {
        return this.departmentRepository.findAll({
            relations: ['childDepartments'],
            order: { order: 'ASC' },
        });
    }
};
exports.DomainDepartmentService = DomainDepartmentService;
exports.DomainDepartmentService = DomainDepartmentService = DomainDepartmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [department_repository_1.DomainDepartmentRepository])
], DomainDepartmentService);
//# sourceMappingURL=department.service.js.map
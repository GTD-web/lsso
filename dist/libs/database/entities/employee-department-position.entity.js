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
exports.EmployeeDepartmentPosition = exports.ManagerType = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const department_entity_1 = require("./department.entity");
const position_entity_1 = require("./position.entity");
var ManagerType;
(function (ManagerType) {
    ManagerType["DIRECT"] = "direct";
    ManagerType["FUNCTIONAL"] = "functional";
    ManagerType["PROJECT"] = "project";
    ManagerType["TEMPORARY"] = "temporary";
    ManagerType["DEPUTY"] = "deputy";
})(ManagerType || (exports.ManagerType = ManagerType = {}));
let EmployeeDepartmentPosition = class EmployeeDepartmentPosition {
};
exports.EmployeeDepartmentPosition = EmployeeDepartmentPosition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직원 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '부서 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직책 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "positionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '시작일', type: 'date' }),
    __metadata("design:type", Date)
], EmployeeDepartmentPosition.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '종료일', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], EmployeeDepartmentPosition.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '활성 여부', default: true }),
    __metadata("design:type", Boolean)
], EmployeeDepartmentPosition.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '주 소속 여부 (메인 부서)', default: true }),
    __metadata("design:type", Boolean)
], EmployeeDepartmentPosition.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '임시 발령 여부', default: false }),
    __metadata("design:type", Boolean)
], EmployeeDepartmentPosition.prototype, "isTemporary", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '발령 이유', nullable: true }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '권한 레벨', nullable: true }),
    __metadata("design:type", Number)
], EmployeeDepartmentPosition.prototype, "authorityLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '비고', nullable: true }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '생성자 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '수정자 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], EmployeeDepartmentPosition.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    __metadata("design:type", department_entity_1.Department)
], EmployeeDepartmentPosition.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => position_entity_1.Position, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'positionId' }),
    __metadata("design:type", position_entity_1.Position)
], EmployeeDepartmentPosition.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], EmployeeDepartmentPosition.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], EmployeeDepartmentPosition.prototype, "updatedAt", void 0);
exports.EmployeeDepartmentPosition = EmployeeDepartmentPosition = __decorate([
    (0, typeorm_1.Entity)('employee_department_positions'),
    (0, typeorm_1.Unique)(['employeeId', 'departmentId']),
    (0, typeorm_1.Index)(['employeeId']),
    (0, typeorm_1.Index)(['departmentId']),
    (0, typeorm_1.Index)(['positionId']),
    (0, typeorm_1.Index)(['employeeId', 'isActive']),
    (0, typeorm_1.Index)(['departmentId', 'isActive'])
], EmployeeDepartmentPosition);
//# sourceMappingURL=employee-department-position.entity.js.map
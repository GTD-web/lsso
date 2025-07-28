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
exports.EmployeeProjectAssignment = exports.CommitmentLevel = exports.AssignmentStatus = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const project_entity_1 = require("./project.entity");
const project_role_entity_1 = require("./project-role.entity");
var AssignmentStatus;
(function (AssignmentStatus) {
    AssignmentStatus["ASSIGNED"] = "assigned";
    AssignmentStatus["ACTIVE"] = "active";
    AssignmentStatus["COMPLETED"] = "completed";
    AssignmentStatus["WITHDRAWN"] = "withdrawn";
})(AssignmentStatus || (exports.AssignmentStatus = AssignmentStatus = {}));
var CommitmentLevel;
(function (CommitmentLevel) {
    CommitmentLevel["FULL_TIME"] = "full_time";
    CommitmentLevel["PART_TIME"] = "part_time";
    CommitmentLevel["CONSULTING"] = "consulting";
    CommitmentLevel["SUPPORTING"] = "supporting";
})(CommitmentLevel || (exports.CommitmentLevel = CommitmentLevel = {}));
let EmployeeProjectAssignment = class EmployeeProjectAssignment {
    get isProjectLeader() {
        return this.projectRole?.hasProjectAuthority && this.projectRole?.level >= 90;
    }
    get isFullTimeAssignment() {
        return this.commitmentLevel === CommitmentLevel.FULL_TIME || this.allocationPercentage >= 80;
    }
    get isActiveAssignment() {
        return (this.status === AssignmentStatus.ACTIVE &&
            new Date() >= this.assignmentStartDate &&
            (!this.assignmentEndDate || new Date() <= this.assignmentEndDate));
    }
};
exports.EmployeeProjectAssignment = EmployeeProjectAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직원 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '프로젝트 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '프로젝트 역할 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "projectRoleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '배정 시작일', type: 'date' }),
    __metadata("design:type", Date)
], EmployeeProjectAssignment.prototype, "assignmentStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '배정 종료일', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], EmployeeProjectAssignment.prototype, "assignmentEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '배정 상태',
        type: 'enum',
        enum: AssignmentStatus,
        default: AssignmentStatus.ASSIGNED,
    }),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '참여 수준',
        type: 'enum',
        enum: CommitmentLevel,
        default: CommitmentLevel.PART_TIME,
    }),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "commitmentLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '투입률 (%)', type: 'decimal', precision: 5, scale: 2, default: 50 }),
    __metadata("design:type", Number)
], EmployeeProjectAssignment.prototype, "allocationPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '시간당 단가', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EmployeeProjectAssignment.prototype, "hourlyRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '예상 투입 시간', type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], EmployeeProjectAssignment.prototype, "estimatedHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '실제 투입 시간', type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], EmployeeProjectAssignment.prototype, "actualHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '배정 이유', nullable: true }),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '특별 권한', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], EmployeeProjectAssignment.prototype, "specialPermissions", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '성과 목표', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], EmployeeProjectAssignment.prototype, "performanceTargets", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '비고', nullable: true }),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '생성자 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '수정자 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeProjectAssignment.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], EmployeeProjectAssignment.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_1.Project)
], EmployeeProjectAssignment.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_role_entity_1.ProjectRole, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectRoleId' }),
    __metadata("design:type", project_role_entity_1.ProjectRole)
], EmployeeProjectAssignment.prototype, "projectRole", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], EmployeeProjectAssignment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], EmployeeProjectAssignment.prototype, "updatedAt", void 0);
exports.EmployeeProjectAssignment = EmployeeProjectAssignment = __decorate([
    (0, typeorm_1.Entity)('employee_project_assignments'),
    (0, typeorm_1.Unique)(['employeeId', 'projectId']),
    (0, typeorm_1.Index)(['employeeId']),
    (0, typeorm_1.Index)(['projectId']),
    (0, typeorm_1.Index)(['projectRoleId']),
    (0, typeorm_1.Index)(['employeeId', 'status']),
    (0, typeorm_1.Index)(['projectId', 'status']),
    (0, typeorm_1.Index)(['assignmentStartDate'])
], EmployeeProjectAssignment);
//# sourceMappingURL=employee-project-assignment.entity.js.map
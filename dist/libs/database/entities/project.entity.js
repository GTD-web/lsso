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
exports.Project = exports.ProjectPriority = exports.ProjectStatus = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const department_entity_1 = require("./department.entity");
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PLANNING"] = "planning";
    ProjectStatus["ACTIVE"] = "active";
    ProjectStatus["ON_HOLD"] = "on_hold";
    ProjectStatus["COMPLETED"] = "completed";
    ProjectStatus["CANCELLED"] = "cancelled";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
var ProjectPriority;
(function (ProjectPriority) {
    ProjectPriority["LOW"] = "low";
    ProjectPriority["MEDIUM"] = "medium";
    ProjectPriority["HIGH"] = "high";
    ProjectPriority["CRITICAL"] = "critical";
})(ProjectPriority || (exports.ProjectPriority = ProjectPriority = {}));
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '프로젝트명' }),
    __metadata("design:type", String)
], Project.prototype, "projectName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '프로젝트 코드' }),
    __metadata("design:type", String)
], Project.prototype, "projectCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '프로젝트 설명', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '프로젝트 상태',
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.PLANNING,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '우선순위',
        type: 'enum',
        enum: ProjectPriority,
        default: ProjectPriority.MEDIUM,
    }),
    __metadata("design:type", String)
], Project.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '시작일', type: 'date' }),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '종료일', type: 'date' }),
    __metadata("design:type", Date)
], Project.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '실제 시작일', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "actualStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '실제 종료일', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "actualEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '예산', type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Project.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '주관 부서 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "ownerDepartmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '프로젝트 매니저 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "projectManagerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '진행률 (%)', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "progressPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '목표 및 산출물', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "objectives", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '리스크 정보', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "risks", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '활성 여부', default: true }),
    __metadata("design:type", Boolean)
], Project.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '생성자 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '수정자 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'ownerDepartmentId' }),
    __metadata("design:type", department_entity_1.Department)
], Project.prototype, "ownerDepartment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectManagerId' }),
    __metadata("design:type", employee_entity_1.Employee)
], Project.prototype, "projectManager", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)('projects')
], Project);
//# sourceMappingURL=project.entity.js.map
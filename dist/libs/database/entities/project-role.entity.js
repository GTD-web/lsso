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
exports.ProjectRole = exports.ProjectRoleType = void 0;
const typeorm_1 = require("typeorm");
var ProjectRoleType;
(function (ProjectRoleType) {
    ProjectRoleType["LEADERSHIP"] = "leadership";
    ProjectRoleType["ADVISORY"] = "advisory";
    ProjectRoleType["TECHNICAL"] = "technical";
    ProjectRoleType["BUSINESS"] = "business";
    ProjectRoleType["SUPPORT"] = "support";
    ProjectRoleType["QUALITY"] = "quality";
})(ProjectRoleType || (exports.ProjectRoleType = ProjectRoleType = {}));
let ProjectRole = class ProjectRole {
};
exports.ProjectRole = ProjectRole;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProjectRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '역할명' }),
    __metadata("design:type", String)
], ProjectRole.prototype, "roleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '역할 코드' }),
    __metadata("design:type", String)
], ProjectRole.prototype, "roleCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '역할 타입',
        type: 'enum',
        enum: ProjectRoleType,
    }),
    __metadata("design:type", String)
], ProjectRole.prototype, "roleType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '역할 레벨 (높을수록 상위)', default: 1 }),
    __metadata("design:type", Number)
], ProjectRole.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '프로젝트 권한 여부', default: false }),
    __metadata("design:type", Boolean)
], ProjectRole.prototype, "hasProjectAuthority", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '승인 권한 레벨', default: 0 }),
    __metadata("design:type", Number)
], ProjectRole.prototype, "approvalLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '역할 설명', nullable: true }),
    __metadata("design:type", String)
], ProjectRole.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '필요 스킬', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], ProjectRole.prototype, "requiredSkills", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '책임 범위', type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], ProjectRole.prototype, "responsibilities", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '활성 여부', default: true }),
    __metadata("design:type", Boolean)
], ProjectRole.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], ProjectRole.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], ProjectRole.prototype, "updatedAt", void 0);
exports.ProjectRole = ProjectRole = __decorate([
    (0, typeorm_1.Entity)('project_roles')
], ProjectRole);
//# sourceMappingURL=project-role.entity.js.map
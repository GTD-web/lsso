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
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../common/enums");
const rank_entity_1 = require("./rank.entity");
const employee_department_position_entity_1 = require("./employee-department-position.entity");
let Employee = class Employee {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '사번' }),
    __metadata("design:type", String)
], Employee.prototype, "employeeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이름' }),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '이메일' }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '비밀번호', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '전화번호', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '생년월일', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '성별',
        type: 'enum',
        enum: enums_1.Gender,
        nullable: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '입사일', type: 'date' }),
    __metadata("design:type", Date)
], Employee.prototype, "hireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '재직 상태',
        type: 'enum',
        enum: enums_1.EmployeeStatus,
        default: enums_1.EmployeeStatus.Active,
    }),
    __metadata("design:type", String)
], Employee.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '현재 직급 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "currentRankId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rank_entity_1.Rank, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'currentRankId' }),
    __metadata("design:type", rank_entity_1.Rank)
], Employee.prototype, "currentRank", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '퇴사일', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "terminationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '초기 비밀번호 설정 여부', default: false }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isInitialPasswordSet", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_department_position_entity_1.EmployeeDepartmentPosition, (edp) => edp.employee),
    __metadata("design:type", Array)
], Employee.prototype, "departmentPositions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], Employee.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], Employee.prototype, "updatedAt", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employees')
], Employee);
//# sourceMappingURL=employee.entity.js.map
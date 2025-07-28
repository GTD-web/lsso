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
exports.EmployeeRankHistory = exports.PromotionType = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const rank_entity_1 = require("./rank.entity");
var PromotionType;
(function (PromotionType) {
    PromotionType["INITIAL"] = "initial";
    PromotionType["PROMOTION"] = "promotion";
    PromotionType["DEMOTION"] = "demotion";
    PromotionType["ADJUSTMENT"] = "adjustment";
})(PromotionType || (exports.PromotionType = PromotionType = {}));
let EmployeeRankHistory = class EmployeeRankHistory {
};
exports.EmployeeRankHistory = EmployeeRankHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직원 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직급 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "rankId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '시작일', type: 'date' }),
    __metadata("design:type", Date)
], EmployeeRankHistory.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '종료일', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], EmployeeRankHistory.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '활성 여부', default: true }),
    __metadata("design:type", Boolean)
], EmployeeRankHistory.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '승진 유형',
        type: 'enum',
        enum: PromotionType,
        default: PromotionType.INITIAL,
    }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "promotionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '승진일 (발령일)', type: 'date' }),
    __metadata("design:type", Date)
], EmployeeRankHistory.prototype, "promotionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '평가 점수', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EmployeeRankHistory.prototype, "evaluationScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '승진 사유', nullable: true }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이전 직급 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "previousRankId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '다음 예상 승진일', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], EmployeeRankHistory.prototype, "expectedNextPromotionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '승인자 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '발령 번호', nullable: true }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "appointmentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '비고', nullable: true }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '생성자 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '수정자 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", Promise)
], EmployeeRankHistory.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rank_entity_1.Rank, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'rankId' }),
    __metadata("design:type", Promise)
], EmployeeRankHistory.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rank_entity_1.Rank, { lazy: true }),
    (0, typeorm_1.JoinColumn)({ name: 'previousRankId' }),
    __metadata("design:type", Promise)
], EmployeeRankHistory.prototype, "previousRank", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], EmployeeRankHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], EmployeeRankHistory.prototype, "updatedAt", void 0);
exports.EmployeeRankHistory = EmployeeRankHistory = __decorate([
    (0, typeorm_1.Entity)('employee_rank_histories'),
    (0, typeorm_1.Index)(['employeeId', 'rankId']),
    (0, typeorm_1.Index)(['employeeId', 'startDate']),
    (0, typeorm_1.Index)(['employeeId', 'isActive']),
    (0, typeorm_1.Index)(['promotionDate'])
], EmployeeRankHistory);
//# sourceMappingURL=employee-rank-history.entity.js.map
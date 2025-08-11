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
exports.System = void 0;
const typeorm_1 = require("typeorm");
let System = class System {
};
exports.System = System;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], System.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '클라이언트 ID' }),
    __metadata("design:type", String)
], System.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '클라이언트 시크릿' }),
    __metadata("design:type", String)
], System.prototype, "clientSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '시스템 이름' }),
    __metadata("design:type", String)
], System.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '시스템 설명' }),
    __metadata("design:type", String)
], System.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '도메인' }),
    __metadata("design:type", String)
], System.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        default: [],
        comment: '허용된 오리진 목록',
    }),
    __metadata("design:type", Array)
], System.prototype, "allowedOrigin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '헬스체크 URL' }),
    __metadata("design:type", String)
], System.prototype, "healthCheckUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
        comment: '활성화 상태',
    }),
    __metadata("design:type", Boolean)
], System.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일시' }),
    __metadata("design:type", Date)
], System.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일시' }),
    __metadata("design:type", Date)
], System.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ comment: '삭제일시' }),
    __metadata("design:type", Date)
], System.prototype, "deletedAt", void 0);
exports.System = System = __decorate([
    (0, typeorm_1.Entity)('systems')
], System);
//# sourceMappingURL=system.entity.js.map
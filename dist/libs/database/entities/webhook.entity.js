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
exports.Webhook = void 0;
const typeorm_1 = require("typeorm");
let Webhook = class Webhook {
};
exports.Webhook = Webhook;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Webhook.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '웹훅 이름' }),
    __metadata("design:type", String)
], Webhook.prototype, "webhookName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '설명', nullable: true }),
    __metadata("design:type", String)
], Webhook.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '대상 URL' }),
    __metadata("design:type", String)
], Webhook.prototype, "targetUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이벤트 유형' }),
    __metadata("design:type", String)
], Webhook.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '엔티티 유형' }),
    __metadata("design:type", String)
], Webhook.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '시크릿 키', nullable: true }),
    __metadata("design:type", String)
], Webhook.prototype, "secretKey", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '헤더 정보 (JSON 형식)',
        type: 'jsonb',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Webhook.prototype, "headers", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '활성화 상태',
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Webhook.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '재시도 횟수',
        type: 'int',
        default: 3,
    }),
    __metadata("design:type", Number)
], Webhook.prototype, "retryCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '타임아웃 시간(초)',
        type: 'int',
        default: 30,
    }),
    __metadata("design:type", Number)
], Webhook.prototype, "timeoutSeconds", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일시' }),
    __metadata("design:type", Date)
], Webhook.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일시' }),
    __metadata("design:type", Date)
], Webhook.prototype, "updatedAt", void 0);
exports.Webhook = Webhook = __decorate([
    (0, typeorm_1.Entity)('webhooks')
], Webhook);
//# sourceMappingURL=webhook.entity.js.map
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
exports.SystemWebhook = void 0;
const typeorm_1 = require("typeorm");
let SystemWebhook = class SystemWebhook {
};
exports.SystemWebhook = SystemWebhook;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SystemWebhook.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '시스템 ID' }),
    __metadata("design:type", String)
], SystemWebhook.prototype, "systemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '웹훅 ID' }),
    __metadata("design:type", String)
], SystemWebhook.prototype, "webhookId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '마지막 실행일시',
    }),
    __metadata("design:type", Date)
], SystemWebhook.prototype, "lastExecutedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
        comment: '총 실행 횟수',
    }),
    __metadata("design:type", Number)
], SystemWebhook.prototype, "executionCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
        comment: '성공 횟수',
    }),
    __metadata("design:type", Number)
], SystemWebhook.prototype, "successCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
        comment: '실패 횟수',
    }),
    __metadata("design:type", Number)
], SystemWebhook.prototype, "failureCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일시' }),
    __metadata("design:type", Date)
], SystemWebhook.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('System', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'systemId' }),
    __metadata("design:type", Object)
], SystemWebhook.prototype, "system", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Webhook', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'webhookId' }),
    __metadata("design:type", Object)
], SystemWebhook.prototype, "webhook", void 0);
exports.SystemWebhook = SystemWebhook = __decorate([
    (0, typeorm_1.Entity)('system_webhooks'),
    (0, typeorm_1.Index)(['systemId', 'webhookId'], { unique: true }),
    (0, typeorm_1.Index)(['systemId']),
    (0, typeorm_1.Index)(['webhookId'])
], SystemWebhook);
//# sourceMappingURL=system-webhook.entity.js.map
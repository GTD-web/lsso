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
exports.WebhookEventLog = void 0;
const typeorm_1 = require("typeorm");
let WebhookEventLog = class WebhookEventLog {
};
exports.WebhookEventLog = WebhookEventLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '웹훅 ID' }),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "webhookId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이벤트 유형' }),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '엔티티 ID' }),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '페이로드 데이터 (JSON 형식)',
        type: 'jsonb',
    }),
    __metadata("design:type", Object)
], WebhookEventLog.prototype, "payload", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '응답 상태 코드',
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], WebhookEventLog.prototype, "responseCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '응답 본문',
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "responseBody", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '시도 횟수',
        type: 'int',
        default: 1,
    }),
    __metadata("design:type", Number)
], WebhookEventLog.prototype, "attemptCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '성공 여부',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], WebhookEventLog.prototype, "isSuccess", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '마지막 시도 시간',
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], WebhookEventLog.prototype, "lastAttemptAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일시' }),
    __metadata("design:type", Date)
], WebhookEventLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Webhook', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'webhookId' }),
    __metadata("design:type", Object)
], WebhookEventLog.prototype, "webhook", void 0);
exports.WebhookEventLog = WebhookEventLog = __decorate([
    (0, typeorm_1.Entity)('webhook_event_logs'),
    (0, typeorm_1.Index)(['webhookId']),
    (0, typeorm_1.Index)(['eventType']),
    (0, typeorm_1.Index)(['entityId']),
    (0, typeorm_1.Index)(['isSuccess']),
    (0, typeorm_1.Index)(['createdAt'])
], WebhookEventLog);
//# sourceMappingURL=webhook-event-log.entity.js.map
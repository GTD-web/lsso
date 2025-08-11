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
exports.DomainWebhookEventLogService = void 0;
const common_1 = require("@nestjs/common");
const webhook_event_log_repository_1 = require("./webhook-event-log.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
let DomainWebhookEventLogService = class DomainWebhookEventLogService extends base_service_1.BaseService {
    constructor(webhookEventLogRepository) {
        super(webhookEventLogRepository);
        this.webhookEventLogRepository = webhookEventLogRepository;
    }
    async findByWebhookId(webhookId) {
        return this.webhookEventLogRepository.findAll({
            where: { webhookId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByEventType(eventType) {
        return this.webhookEventLogRepository.findAll({
            where: { eventType },
            order: { createdAt: 'DESC' },
        });
    }
    async findByEntityId(entityId) {
        return this.webhookEventLogRepository.findAll({
            where: { entityId },
            order: { createdAt: 'DESC' },
        });
    }
    async findSuccessfulEvents() {
        return this.webhookEventLogRepository.findAll({
            where: { isSuccess: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findFailedEvents() {
        return this.webhookEventLogRepository.findAll({
            where: { isSuccess: false },
            order: { createdAt: 'DESC' },
        });
    }
    async findByResponseCode(responseCode) {
        return this.webhookEventLogRepository.findAll({
            order: { createdAt: 'DESC' },
        });
    }
    async findRetryableEvents(maxAttempts = 3) {
        return this.webhookEventLogRepository.findAll({
            where: { isSuccess: false },
            order: { lastAttemptAt: 'ASC' },
        });
    }
    async createEventLog(webhookId, eventType, entityId, payload) {
        return this.webhookEventLogRepository.save({
            webhookId,
            eventType,
            entityId,
            payload,
            attemptCount: 1,
            isSuccess: false,
            lastAttemptAt: new Date(),
        });
    }
    async updateEventResult(id, responseCode, responseBody, isSuccess) {
        return this.webhookEventLogRepository.update(id, {
            responseCode,
            responseBody,
            isSuccess,
            lastAttemptAt: new Date(),
        });
    }
    async incrementAttemptCount(id) {
        const eventLog = await this.webhookEventLogRepository.findOne({ where: { id } });
        if (!eventLog) {
            throw new common_1.NotFoundException('이벤트 로그를 찾을 수 없습니다.');
        }
        return this.webhookEventLogRepository.update(id, {
            attemptCount: eventLog.attemptCount + 1,
            lastAttemptAt: new Date(),
        });
    }
    async findRecentEvents(limit = 50) {
        return this.webhookEventLogRepository.findAll({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getSuccessRateByWebhook(webhookId) {
        const events = await this.findByWebhookId(webhookId);
        const total = events.length;
        const success = events.filter((event) => event.isSuccess).length;
        const successRate = total > 0 ? (success / total) * 100 : 0;
        return { total, success, successRate };
    }
};
exports.DomainWebhookEventLogService = DomainWebhookEventLogService;
exports.DomainWebhookEventLogService = DomainWebhookEventLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [webhook_event_log_repository_1.DomainWebhookEventLogRepository])
], DomainWebhookEventLogService);
//# sourceMappingURL=webhook-event-log.service.js.map
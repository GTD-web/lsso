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
exports.DomainSystemWebhookService = void 0;
const common_1 = require("@nestjs/common");
const system_webhook_repository_1 = require("./system-webhook.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
let DomainSystemWebhookService = class DomainSystemWebhookService extends base_service_1.BaseService {
    constructor(systemWebhookRepository) {
        super(systemWebhookRepository);
        this.systemWebhookRepository = systemWebhookRepository;
    }
    async findBySystemId(systemId) {
        return this.systemWebhookRepository.findAll({
            where: { systemId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByWebhookId(webhookId) {
        return this.systemWebhookRepository.findAll({
            where: { webhookId },
            order: { createdAt: 'DESC' },
        });
    }
    async findBySystemAndWebhook(systemId, webhookId) {
        const relation = await this.systemWebhookRepository.findOne({
            where: { systemId, webhookId },
        });
        if (!relation) {
            throw new common_1.NotFoundException('시스템-웹훅 관계를 찾을 수 없습니다.');
        }
        return relation;
    }
    async updateExecutionStats(systemId, webhookId, isSuccess) {
        const relation = await this.findBySystemAndWebhook(systemId, webhookId);
        const updateData = {
            lastExecutedAt: new Date(),
            executionCount: relation.executionCount + 1,
        };
        if (isSuccess) {
            updateData.successCount = relation.successCount + 1;
        }
        else {
            updateData.failureCount = relation.failureCount + 1;
        }
        return this.systemWebhookRepository.update(relation.id, updateData);
    }
    async findMostExecuted(limit = 10) {
        return this.systemWebhookRepository.findAll({
            order: { executionCount: 'DESC' },
            take: limit,
        });
    }
    async findHighFailureRate(minExecutions = 10) {
        return this.systemWebhookRepository.findAll({
            order: { failureCount: 'DESC' },
        });
    }
    async createRelation(systemId, webhookId) {
        return this.systemWebhookRepository.save({
            systemId,
            webhookId,
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
        });
    }
};
exports.DomainSystemWebhookService = DomainSystemWebhookService;
exports.DomainSystemWebhookService = DomainSystemWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [system_webhook_repository_1.DomainSystemWebhookRepository])
], DomainSystemWebhookService);
//# sourceMappingURL=system-webhook.service.js.map
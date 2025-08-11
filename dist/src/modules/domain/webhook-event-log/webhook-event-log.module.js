"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainWebhookEventLogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const webhook_event_log_service_1 = require("./webhook-event-log.service");
const webhook_event_log_repository_1 = require("./webhook-event-log.repository");
const entities_1 = require("../../../../libs/database/entities");
let DomainWebhookEventLogModule = class DomainWebhookEventLogModule {
};
exports.DomainWebhookEventLogModule = DomainWebhookEventLogModule;
exports.DomainWebhookEventLogModule = DomainWebhookEventLogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.WebhookEventLog])],
        providers: [webhook_event_log_service_1.DomainWebhookEventLogService, webhook_event_log_repository_1.DomainWebhookEventLogRepository],
        exports: [webhook_event_log_service_1.DomainWebhookEventLogService],
    })
], DomainWebhookEventLogModule);
//# sourceMappingURL=webhook-event-log.module.js.map
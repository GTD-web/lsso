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
exports.SystemManagementContextService = void 0;
const common_1 = require("@nestjs/common");
const system_service_1 = require("../../domain/system/system.service");
const webhook_service_1 = require("../../domain/webhook/webhook.service");
const webhook_event_log_service_1 = require("../../domain/webhook-event-log/webhook-event-log.service");
const system_webhook_service_1 = require("../../domain/system-webhook/system-webhook.service");
let SystemManagementContextService = class SystemManagementContextService {
    constructor(시스템서비스, 웹훅서비스, 웹훅이벤트로그서비스, 시스템웹훅서비스) {
        this.시스템서비스 = 시스템서비스;
        this.웹훅서비스 = 웹훅서비스;
        this.웹훅이벤트로그서비스 = 웹훅이벤트로그서비스;
        this.시스템웹훅서비스 = 시스템웹훅서비스;
    }
};
exports.SystemManagementContextService = SystemManagementContextService;
exports.SystemManagementContextService = SystemManagementContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [system_service_1.DomainSystemService,
        webhook_service_1.DomainWebhookService,
        webhook_event_log_service_1.DomainWebhookEventLogService,
        system_webhook_service_1.DomainSystemWebhookService])
], SystemManagementContextService);
//# sourceMappingURL=system-management-context.service.js.map
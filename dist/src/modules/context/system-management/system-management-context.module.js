"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemManagementContextModule = void 0;
const common_1 = require("@nestjs/common");
const system_management_context_service_1 = require("./system-management-context.service");
const system_module_1 = require("../../domain/system/system.module");
const webhook_module_1 = require("../../domain/webhook/webhook.module");
const webhook_event_log_module_1 = require("../../domain/webhook-event-log/webhook-event-log.module");
const system_webhook_module_1 = require("../../domain/system-webhook/system-webhook.module");
let SystemManagementContextModule = class SystemManagementContextModule {
};
exports.SystemManagementContextModule = SystemManagementContextModule;
exports.SystemManagementContextModule = SystemManagementContextModule = __decorate([
    (0, common_1.Module)({
        imports: [system_module_1.DomainSystemModule, webhook_module_1.DomainWebhookModule, webhook_event_log_module_1.DomainWebhookEventLogModule, system_webhook_module_1.DomainSystemWebhookModule],
        providers: [system_management_context_service_1.SystemManagementContextService],
        exports: [system_management_context_service_1.SystemManagementContextService],
    })
], SystemManagementContextModule);
//# sourceMappingURL=system-management-context.module.js.map
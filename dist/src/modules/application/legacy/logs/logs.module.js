"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsModule = void 0;
const common_1 = require("@nestjs/common");
const logs_service_1 = require("./services/logs.service");
const admin_controller_1 = require("./controllers/admin.controller");
const admin_usecase_1 = require("./usecases/admin.usecase");
const log_module_1 = require("../../../domain/log/log.module");
let LogsModule = class LogsModule {
};
exports.LogsModule = LogsModule;
exports.LogsModule = LogsModule = __decorate([
    (0, common_1.Module)({
        imports: [log_module_1.DomainLogModule],
        providers: [logs_service_1.LogsService, admin_usecase_1.LogsAdminUseCase],
        controllers: [admin_controller_1.AdminLogsController],
        exports: [logs_service_1.LogsService, admin_usecase_1.LogsAdminUseCase],
    })
], LogsModule);
//# sourceMappingURL=logs.module.js.map
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
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const logs_service_1 = require("../../logs/logs.service");
const systems_service_1 = require("../../systems/systems.service");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logsService, systemService) {
        this.logsService = logsService;
        this.systemService = systemService;
    }
    async intercept(context, next) {
        const startTime = Date.now();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        let ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        if (ip.includes(',')) {
            ip = ip.split(',')[0];
        }
        if (ip === '::ffff:127.0.0.1' || ip === '::1') {
            ip = '127.0.0.1';
        }
        const logData = {
            origin: request.headers.origin,
            host: request.headers.host,
            method: request.method,
            url: request.url,
            params: request.params,
            query: request.query,
            body: request.body,
            ip: ip,
            userAgent: request.get('user-agent'),
            requestTimestamp: new Date(),
            responseTimestamp: null,
            responseTime: null,
            statusCode: null,
            response: null,
            error: null,
            isError: false,
        };
        return next.handle().pipe((0, operators_1.tap)(async (response) => {
            logData.responseTimestamp = new Date();
            logData.responseTime = Date.now() - startTime;
            logData.statusCode = context.switchToHttp().getResponse().statusCode;
            logData.response = response;
            await this.logsService.createLog(logData);
        }), (0, operators_1.catchError)(async (error) => {
            logData.responseTimestamp = new Date();
            logData.responseTime = Date.now() - startTime;
            logData.statusCode = error.status || 500;
            logData.error = {
                message: error.message,
                stack: error.stack,
            };
            logData.isError = true;
            await this.logsService.createLog(logData);
            throw error;
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logs_service_1.LogsService, systems_service_1.SystemsService])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map
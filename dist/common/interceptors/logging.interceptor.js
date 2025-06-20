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
const logs_service_1 = require("../../logs/services/logs.service");
const systems_service_1 = require("../../systems/services/systems.service");
const date_util_1 = require("../utils/date.util");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logsService, systemService) {
        this.logsService = logsService;
        this.systemService = systemService;
    }
    async intercept(context, next) {
        const startTime = Date.now();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const passUrl = ['/api/admin', '/api/domain', '/api/webhook', '/api/auth/verify'];
        if (passUrl.some((url) => request.url.startsWith(url))) {
            return next.handle();
        }
        let ip = Array.isArray(request.headers['x-forwarded-for'])
            ? request.headers['x-forwarded-for'][0]
            : request.headers['x-forwarded-for'] || request.socket.remoteAddress || '';
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
            requestTimestamp: date_util_1.DateUtil.now().toDate(),
            responseTimestamp: null,
            responseTime: null,
            statusCode: null,
            response: null,
            system: null,
            error: null,
            isError: false,
        };
        return next.handle().pipe((0, operators_1.tap)(async (response) => {
            logData.responseTimestamp = date_util_1.DateUtil.now().toDate();
            logData.responseTime = logData.responseTimestamp - startTime;
            logData.statusCode = context.switchToHttp().getResponse().statusCode;
            logData.response = request.method !== 'GET' ? response : null;
            logData.system = response?.system || null;
        }), (0, operators_1.catchError)(async (error) => {
            logData.responseTimestamp = date_util_1.DateUtil.now().toDate();
            logData.responseTime = logData.responseTimestamp - startTime;
            logData.statusCode = error.status || 500;
            logData.system = error?.response?.system || null;
            logData.error = {
                message: error.message,
            };
            logData.isError = true;
            throw error;
        }), (0, operators_1.finalize)(() => {
            this.logsService.create(logData);
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logs_service_1.LogsService, systems_service_1.SystemsService])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map
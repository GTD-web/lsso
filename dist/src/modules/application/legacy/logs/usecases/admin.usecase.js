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
var LogsAdminUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsAdminUseCase = void 0;
const common_1 = require("@nestjs/common");
const logs_service_1 = require("../services/logs.service");
const log_response_dto_1 = require("../dto/log-response.dto");
let LogsAdminUseCase = LogsAdminUseCase_1 = class LogsAdminUseCase {
    constructor(logsService) {
        this.logsService = logsService;
        this.logger = new common_1.Logger(LogsAdminUseCase_1.name);
    }
    async findAll(page = 1, limit = 10) {
        console.log('findAll', page, limit);
        try {
            return await this.logsService.findAll(page, limit);
        }
        catch (error) {
            this.logger.error(`로그 목록 조회 중 오류 발생: ${error.message}`);
            return {
                logs: [],
                total: 0,
                page,
                totalPages: 0,
            };
        }
    }
    async findOne(id) {
        try {
            return await this.logsService.findOne(id);
        }
        catch (error) {
            this.logger.error(`로그 상세 조회 중 오류 발생: ${error.message}`);
            throw error;
        }
    }
    async filterLogs(filterDto) {
        try {
            return await this.logsService.filterLogs(filterDto);
        }
        catch (error) {
            this.logger.error(`로그 필터링 중 오류 발생: ${error.message}`);
            return {
                logs: [],
                total: 0,
                page: filterDto.page || 1,
                totalPages: 0,
            };
        }
    }
    async findLoginLogs(days = 7) {
        try {
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - days);
            const { logs } = await this.logsService.filterLogs({
                startDate: fromDate,
                url: '/auth/login',
                limit: 1000,
            });
            return logs;
        }
        catch (error) {
            this.logger.error(`로그인 로그를 가져오는 중 오류 발생: ${error.message}`);
            return [];
        }
    }
    mapLogToDto(log) {
        const responseDto = new log_response_dto_1.LogResponseDto();
        responseDto.id = log.id;
        responseDto.requestTimestamp = log.requestTimestamp;
        responseDto.method = log.method;
        responseDto.url = log.url;
        responseDto.query = log.query;
        responseDto.body = log.body;
        responseDto.statusCode = log.statusCode;
        responseDto.responseTime = log.responseTime;
        responseDto.response = log.response;
        responseDto.error = log.error;
        responseDto.ip = log.ip;
        responseDto.host = log.host;
        responseDto.userAgent = log.userAgent;
        responseDto.system = log.system;
        return responseDto;
    }
};
exports.LogsAdminUseCase = LogsAdminUseCase;
exports.LogsAdminUseCase = LogsAdminUseCase = LogsAdminUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logs_service_1.LogsService])
], LogsAdminUseCase);
//# sourceMappingURL=admin.usecase.js.map
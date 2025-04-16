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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const logs_service_1 = require("./logs.service");
const search_logs_dto_1 = require("./dto/search-logs.dto");
const log_response_dto_1 = require("./dto/log-response.dto");
let LogsController = class LogsController {
    constructor(logsService) {
        this.logsService = logsService;
    }
    async search(searchDto) {
        try {
            const { logs, total, page, totalPages } = await this.logsService.filterLogs(searchDto);
            return {
                data: logs.map((log) => ({
                    id: log.id,
                    timestamp: log.requestTimestamp,
                    method: log.method,
                    url: log.url,
                    query: log.query,
                    body: log.body,
                    statusCode: log.statusCode,
                    responseTime: log.responseTime,
                    response: log.response,
                    error: log.error,
                    ip: log.ip,
                    host: log.host,
                    userAgent: log.userAgent,
                })),
                meta: {
                    total,
                    page,
                    limit: searchDto.limit || 10,
                    totalPages,
                },
            };
        }
        catch (error) {
            return {
                error: {
                    code: 'LOGS_SEARCH_ERROR',
                    message: '로그 검색 중 오류가 발생했습니다.',
                },
            };
        }
    }
    async findOne(id) {
        try {
            const log = await this.logsService.findOne(id);
            return {
                data: {
                    id: log.id,
                    timestamp: log.requestTimestamp,
                    method: log.method,
                    url: log.url,
                    query: log.query,
                    body: log.body,
                    statusCode: log.statusCode,
                    responseTime: log.responseTime,
                    response: log.response,
                    error: log.error,
                    ip: log.ip,
                    host: log.host,
                    userAgent: log.userAgent,
                },
            };
        }
        catch (error) {
            return {
                error: {
                    code: 'LOG_NOT_FOUND',
                    message: `ID가 ${id}인 로그를 찾을 수 없습니다.`,
                },
            };
        }
    }
};
exports.LogsController = LogsController;
__decorate([
    (0, common_1.Post)('search'),
    (0, swagger_1.ApiOperation)({ summary: '로그 검색' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '로그 검색 성공',
        type: [log_response_dto_1.LogResponseDto],
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_logs_dto_1.SearchLogsDto]),
    __metadata("design:returntype", Promise)
], LogsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '로그 상세 조회' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '로그 상세 조회 성공',
        type: log_response_dto_1.LogResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '로그 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LogsController.prototype, "findOne", null);
exports.LogsController = LogsController = __decorate([
    (0, swagger_1.ApiTags)('로그 API'),
    (0, common_1.Controller)('logs'),
    __metadata("design:paramtypes", [logs_service_1.LogsService])
], LogsController);
//# sourceMappingURL=logs.controller.js.map
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
exports.AdminLogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const logs_service_1 = require("./logs.service");
const log_filter_dto_1 = require("./dto/log-filter.dto");
const api_response_dto_1 = require("../common/dto/api-response.dto");
const log_response_dto_1 = require("./dto/log-response.dto");
let AdminLogsController = class AdminLogsController {
    constructor(logsService) {
        this.logsService = logsService;
    }
    async findAll(page = 1, limit = 10) {
        try {
            const { logs, total, page: pageNum, totalPages } = await this.logsService.findAll(+page, +limit);
            const responseData = {
                logs: logs.map((log) => this.mapLogToDto(log)),
                total,
                page: pageNum,
                limit: +limit,
            };
            return api_response_dto_1.ApiResponseDto.success(responseData);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('LOGS_FETCH_ERROR', '로그 목록을 가져오는 중 오류가 발생했습니다.');
        }
    }
    async findOne(id) {
        try {
            const log = await this.logsService.findOne(id);
            return api_response_dto_1.ApiResponseDto.success(this.mapLogToDto(log));
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('LOG_NOT_FOUND', `ID가 ${id}인 로그를 찾을 수 없습니다.`);
        }
    }
    async filter(filterDto) {
        try {
            const { logs, total, page, totalPages } = await this.logsService.filterLogs(filterDto);
            const responseData = {
                logs: logs.map((log) => this.mapLogToDto(log)),
                total,
                page,
                limit: filterDto.limit || 10,
            };
            return api_response_dto_1.ApiResponseDto.success(responseData);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('LOGS_FILTER_ERROR', '로그 필터링 중 오류가 발생했습니다.');
        }
    }
    mapLogToDto(log) {
        const responseDto = new log_response_dto_1.LogResponseDto();
        responseDto.id = log.id;
        responseDto.timestamp = log.requestTimestamp;
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
exports.AdminLogsController = AdminLogsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '로그 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '로그 목록 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: '페이지 번호', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: '페이지당 항목 수', type: Number }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '로그 상세 조회' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '로그 상세 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '로그 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminLogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('filter'),
    (0, swagger_1.ApiOperation)({ summary: '로그 필터링' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '로그 필터링 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_filter_dto_1.LogFilterDto]),
    __metadata("design:returntype", Promise)
], AdminLogsController.prototype, "filter", null);
exports.AdminLogsController = AdminLogsController = __decorate([
    (0, swagger_1.ApiTags)('관리자 로그 API'),
    (0, common_1.Controller)('admin/logs'),
    __metadata("design:paramtypes", [logs_service_1.LogsService])
], AdminLogsController);
//# sourceMappingURL=admin-logs.controller.js.map
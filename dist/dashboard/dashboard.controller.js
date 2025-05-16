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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_dto_1 = require("./dto/dashboard.dto");
const log_entity_1 = require("../logs/entities/log.entity");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDashboardSummary() {
        return this.dashboardService.getDashboardSummary(3);
    }
    async getSystemsStatus() {
        return this.dashboardService.getSystemsStatus();
    }
    async getRecentLogs(limit = 5) {
        return this.dashboardService.getRecentLogs(limit);
    }
    async getLoginStats(days = 7) {
        return this.dashboardService.getLoginStats(days);
    }
    async getSecurityAlerts(limit = 3) {
        return this.dashboardService.getSecurityAlerts(limit);
    }
    async getTokenStats() {
        return this.dashboardService.getTokenStats();
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: '대시보드 요약 데이터 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '대시보드 요약 데이터',
        type: dashboard_dto_1.DashboardSummaryDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardSummary", null);
__decorate([
    (0, common_1.Get)('systems-status'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 상태 정보 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 상태 정보 목록',
        type: [dashboard_dto_1.SystemStatusDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getSystemsStatus", null);
__decorate([
    (0, common_1.Get)('recent-logs'),
    (0, swagger_1.ApiOperation)({ summary: '최근 로그 활동 조회' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '최근 로그 목록',
        type: [log_entity_1.Log],
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRecentLogs", null);
__decorate([
    (0, common_1.Get)('login-stats'),
    (0, swagger_1.ApiOperation)({ summary: '로그인 통계 정보 조회' }),
    (0, swagger_1.ApiQuery)({ name: 'days', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 통계 정보',
        type: dashboard_dto_1.LoginStatsDto,
    }),
    __param(0, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getLoginStats", null);
__decorate([
    (0, common_1.Get)('security-alerts'),
    (0, swagger_1.ApiOperation)({ summary: '보안 알림 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '보안 알림 목록',
        type: [dashboard_dto_1.SecurityAlertDto],
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getSecurityAlerts", null);
__decorate([
    (0, common_1.Get)('token-stats'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 통계 정보 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 통계 정보',
        type: dashboard_dto_1.TokenStatsDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getTokenStats", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('관리자 대시보드 API'),
    (0, common_1.Controller)('admin/dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map
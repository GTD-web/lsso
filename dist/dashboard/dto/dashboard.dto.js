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
exports.DashboardSummaryDto = exports.SecurityAlertDto = exports.TokenStatsDto = exports.LoginStatsDto = exports.SystemStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const log_entity_1 = require("../../logs/entities/log.entity");
class SystemStatusDto {
}
exports.SystemStatusDto = SystemStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 ID' }),
    __metadata("design:type", String)
], SystemStatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 이름' }),
    __metadata("design:type", String)
], SystemStatusDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 상태', enum: ['online', 'offline', 'warning'] }),
    __metadata("design:type", String)
], SystemStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '마지막 확인 시간' }),
    __metadata("design:type", String)
], SystemStatusDto.prototype, "lastCheck", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '응답 시간 (ms)' }),
    __metadata("design:type", Number)
], SystemStatusDto.prototype, "responseTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '업타임 (초)', required: false }),
    __metadata("design:type", Number)
], SystemStatusDto.prototype, "uptime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '헬스 체크 URL', required: false }),
    __metadata("design:type", String)
], SystemStatusDto.prototype, "healthCheckUrl", void 0);
class LoginStatsDto {
}
exports.LoginStatsDto = LoginStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전체 로그인 시도 수' }),
    __metadata("design:type", Number)
], LoginStatsDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성공한 로그인 수' }),
    __metadata("design:type", Number)
], LoginStatsDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '실패한 로그인 수' }),
    __metadata("design:type", Number)
], LoginStatsDto.prototype, "failed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '로그인 성공률 (%)' }),
    __metadata("design:type", Number)
], LoginStatsDto.prototype, "successRate", void 0);
class TokenStatsDto {
}
exports.TokenStatsDto = TokenStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전체 토큰 수' }),
    __metadata("design:type", Number)
], TokenStatsDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '활성 토큰 수' }),
    __metadata("design:type", Number)
], TokenStatsDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '비활성 토큰 수' }),
    __metadata("design:type", Number)
], TokenStatsDto.prototype, "inactive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '7일 이내 만료 예정인 토큰 수' }),
    __metadata("design:type", Number)
], TokenStatsDto.prototype, "expiringSoon", void 0);
class SecurityAlertDto {
}
exports.SecurityAlertDto = SecurityAlertDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '알림 ID' }),
    __metadata("design:type", String)
], SecurityAlertDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '알림 유형', enum: ['warning', 'error', 'info'] }),
    __metadata("design:type", String)
], SecurityAlertDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '알림 메시지' }),
    __metadata("design:type", String)
], SecurityAlertDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '알림 발생 시간' }),
    __metadata("design:type", String)
], SecurityAlertDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '해결 여부' }),
    __metadata("design:type", Boolean)
], SecurityAlertDto.prototype, "resolved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관련 로그 ID', required: false }),
    __metadata("design:type", String)
], SecurityAlertDto.prototype, "relatedLogId", void 0);
class DashboardSummaryDto {
}
exports.DashboardSummaryDto = DashboardSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '활성 사용자 수' }),
    __metadata("design:type", Number)
], DashboardSummaryDto.prototype, "activeUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전체 사용자 수' }),
    __metadata("design:type", Number)
], DashboardSummaryDto.prototype, "totalUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '토큰 통계 정보', type: TokenStatsDto }),
    __metadata("design:type", TokenStatsDto)
], DashboardSummaryDto.prototype, "tokenStats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '활성 시스템 수' }),
    __metadata("design:type", Number)
], DashboardSummaryDto.prototype, "activeSystems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전체 시스템 수' }),
    __metadata("design:type", Number)
], DashboardSummaryDto.prototype, "totalSystems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '로그인 통계 정보', type: LoginStatsDto }),
    __metadata("design:type", LoginStatsDto)
], DashboardSummaryDto.prototype, "loginStats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '평균 응답 시간 (ms)' }),
    __metadata("design:type", Number)
], DashboardSummaryDto.prototype, "avgResponseTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '보안 알림 목록', type: [SecurityAlertDto] }),
    __metadata("design:type", Array)
], DashboardSummaryDto.prototype, "securityAlerts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '최근 로그 목록', type: [log_entity_1.Log] }),
    __metadata("design:type", Array)
], DashboardSummaryDto.prototype, "recentLogs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 상태 목록', type: [SystemStatusDto] }),
    __metadata("design:type", Array)
], DashboardSummaryDto.prototype, "systemStatus", void 0);
//# sourceMappingURL=dashboard.dto.js.map
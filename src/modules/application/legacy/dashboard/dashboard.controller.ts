import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import {
    DashboardSummaryDto,
    SystemStatusDto,
    LoginStatsDto,
    SecurityAlertDto,
    TokenStatsDto,
} from './dto/dashboard.dto';
import { Log } from '../../../../../libs/database/entities/log.entity';

@ApiTags('관리자 대시보드 API')
@Controller('admin/dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('summary')
    @ApiOperation({ summary: '대시보드 요약 데이터 조회' })
    @ApiResponse({
        status: 200,
        description: '대시보드 요약 데이터',
        type: DashboardSummaryDto,
    })
    async getDashboardSummary(): Promise<DashboardSummaryDto> {
        return this.dashboardService.getDashboardSummary(3);
    }

    @Get('systems-status')
    @ApiOperation({ summary: '시스템 상태 정보 조회' })
    @ApiResponse({
        status: 200,
        description: '시스템 상태 정보 목록',
        type: [SystemStatusDto],
    })
    async getSystemsStatus(): Promise<SystemStatusDto[]> {
        return this.dashboardService.getSystemsStatus();
    }

    @Get('recent-logs')
    @ApiOperation({ summary: '최근 로그 활동 조회' })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({
        status: 200,
        description: '최근 로그 목록',
        type: [Log],
    })
    async getRecentLogs(@Query('limit') limit: number = 5): Promise<Log[]> {
        return this.dashboardService.getRecentLogs(limit);
    }

    @Get('login-stats')
    @ApiOperation({ summary: '로그인 통계 정보 조회' })
    @ApiQuery({ name: 'days', required: false, type: Number })
    @ApiResponse({
        status: 200,
        description: '로그인 통계 정보',
        type: LoginStatsDto,
    })
    async getLoginStats(@Query('days') days: number = 7): Promise<LoginStatsDto> {
        return this.dashboardService.getLoginStats(days);
    }

    @Get('security-alerts')
    @ApiOperation({ summary: '보안 알림 조회' })
    @ApiResponse({
        status: 200,
        description: '보안 알림 목록',
        type: [SecurityAlertDto],
    })
    async getSecurityAlerts(@Query('limit') limit: number = 3): Promise<SecurityAlertDto[]> {
        return this.dashboardService.getSecurityAlerts(limit);
    }

    @Get('token-stats')
    @ApiOperation({ summary: '토큰 통계 정보 조회' })
    @ApiResponse({
        status: 200,
        description: '토큰 통계 정보',
        type: TokenStatsDto,
    })
    async getTokenStats(): Promise<TokenStatsDto> {
        return this.dashboardService.getTokenStats();
    }
}

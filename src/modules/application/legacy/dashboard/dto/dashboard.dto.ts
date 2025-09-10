import { ApiProperty } from '@nestjs/swagger';
import { Log } from '../../../../../../libs/database/entities';

// 시스템 상태 정보 DTO
export class SystemStatusDto {
    @ApiProperty({ description: '시스템 ID' })
    id: string;

    @ApiProperty({ description: '시스템 이름' })
    name: string;

    @ApiProperty({ description: '시스템 상태', enum: ['online', 'offline', 'warning'] })
    status: 'online' | 'offline' | 'warning';

    @ApiProperty({ description: '마지막 확인 시간' })
    lastCheck: string;

    @ApiProperty({ description: '응답 시간 (ms)' })
    responseTime: number;

    @ApiProperty({ description: '업타임 (초)', required: false })
    uptime?: number;

    @ApiProperty({ description: '헬스 체크 URL', required: false })
    healthCheckUrl?: string;
}

// 로그인 통계 정보 DTO
export class LoginStatsDto {
    @ApiProperty({ description: '전체 로그인 시도 수' })
    total: number;

    @ApiProperty({ description: '성공한 로그인 수' })
    success: number;

    @ApiProperty({ description: '실패한 로그인 수' })
    failed: number;

    @ApiProperty({ description: '로그인 성공률 (%)' })
    successRate: number;
}

// 토큰 통계 정보 DTO
export class TokenStatsDto {
    @ApiProperty({ description: '전체 토큰 수' })
    total: number;

    @ApiProperty({ description: '활성 토큰 수' })
    active: number;

    @ApiProperty({ description: '비활성 토큰 수' })
    inactive: number;

    @ApiProperty({ description: '7일 이내 만료 예정인 토큰 수' })
    expiringSoon: number;
}

// 보안 알림 DTO
export class SecurityAlertDto {
    @ApiProperty({ description: '알림 ID' })
    id: string;

    @ApiProperty({ description: '알림 유형', enum: ['warning', 'error', 'info'] })
    type: 'warning' | 'error' | 'info';

    @ApiProperty({ description: '알림 메시지' })
    message: string;

    @ApiProperty({ description: '알림 발생 시간' })
    timestamp: string;

    @ApiProperty({ description: '해결 여부' })
    resolved: boolean;

    @ApiProperty({ description: '관련 로그 ID', required: false })
    relatedLogId?: string;
}

// 대시보드 요약 데이터 DTO
export class DashboardSummaryDto {
    @ApiProperty({ description: '활성 사용자 수' })
    activeUsers: number;

    @ApiProperty({ description: '전체 사용자 수' })
    totalUsers: number;

    @ApiProperty({ description: '토큰 통계 정보', type: TokenStatsDto })
    tokenStats: TokenStatsDto;

    @ApiProperty({ description: '활성 시스템 수' })
    activeSystems: number;

    @ApiProperty({ description: '전체 시스템 수' })
    totalSystems: number;

    @ApiProperty({ description: '로그인 통계 정보', type: LoginStatsDto })
    loginStats: LoginStatsDto;

    @ApiProperty({ description: '평균 응답 시간 (ms)' })
    avgResponseTime: number;

    @ApiProperty({ description: '보안 알림 목록', type: [SecurityAlertDto] })
    securityAlerts: SecurityAlertDto[];

    @ApiProperty({ description: '최근 로그 목록', type: [Log] })
    recentLogs: Log[];

    @ApiProperty({ description: '시스템 상태 목록', type: [SystemStatusDto] })
    systemStatus: SystemStatusDto[];
}

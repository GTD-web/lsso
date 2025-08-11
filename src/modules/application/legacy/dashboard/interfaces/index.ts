import { Log } from '../../logs/entities/log.entity';

// 시스템 상태 정보 타입
export interface SystemStatus {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'warning';
    lastCheck: string;
    responseTime: number;
    uptime?: number; // 업타임 (초 단위)
    healthCheckUrl?: string;
}

// 로그인 통계 정보 타입
export interface LoginStats {
    total: number;
    success: number;
    failed: number;
    successRate: number;
}

// 토큰 통계 정보 타입
export interface TokenStats {
    total: number;
    active: number;
    inactive: number;
    expiringSoon: number; // 7일 이내 만료 예정인 토큰 수
}

// 보안 알림 타입
export interface SecurityAlert {
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: string;
    resolved: boolean;
    relatedLogId?: string;
}

// 대시보드 요약 데이터 타입
export interface DashboardSummary {
    activeUsers: number;
    totalUsers: number;
    tokenStats: TokenStats;
    activeSystems: number;
    totalSystems: number;
    loginStats: LoginStats;
    avgResponseTime: number;
    securityAlerts: SecurityAlert[];
    recentLogs: Log[];
    systemStatus: SystemStatus[];
}

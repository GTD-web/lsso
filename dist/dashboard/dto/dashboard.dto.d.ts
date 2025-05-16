import { Log } from '../../logs/entities/log.entity';
export declare class SystemStatusDto {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'warning';
    lastCheck: string;
    responseTime: number;
    uptime?: number;
    healthCheckUrl?: string;
}
export declare class LoginStatsDto {
    total: number;
    success: number;
    failed: number;
    successRate: number;
}
export declare class TokenStatsDto {
    total: number;
    active: number;
    inactive: number;
    expiringSoon: number;
}
export declare class SecurityAlertDto {
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: string;
    resolved: boolean;
    relatedLogId?: string;
}
export declare class DashboardSummaryDto {
    activeUsers: number;
    totalUsers: number;
    tokenStats: TokenStatsDto;
    activeSystems: number;
    totalSystems: number;
    loginStats: LoginStatsDto;
    avgResponseTime: number;
    securityAlerts: SecurityAlertDto[];
    recentLogs: Log[];
    systemStatus: SystemStatusDto[];
}

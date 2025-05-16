import { Log } from '../../logs/entities/log.entity';
export interface SystemStatus {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'warning';
    lastCheck: string;
    responseTime: number;
    uptime?: number;
    healthCheckUrl?: string;
}
export interface LoginStats {
    total: number;
    success: number;
    failed: number;
    successRate: number;
}
export interface TokenStats {
    total: number;
    active: number;
    inactive: number;
    expiringSoon: number;
}
export interface SecurityAlert {
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: string;
    resolved: boolean;
    relatedLogId?: string;
}
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

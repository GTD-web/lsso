import { DashboardService } from './dashboard.service';
import { DashboardSummaryDto, SystemStatusDto, LoginStatsDto, SecurityAlertDto, TokenStatsDto } from './dto/dashboard.dto';
import { Log } from '../logs/entities/log.entity';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardSummary(): Promise<DashboardSummaryDto>;
    getSystemsStatus(): Promise<SystemStatusDto[]>;
    getRecentLogs(limit?: number): Promise<Log[]>;
    getLoginStats(days?: number): Promise<LoginStatsDto>;
    getSecurityAlerts(limit?: number): Promise<SecurityAlertDto[]>;
    getTokenStats(): Promise<TokenStatsDto>;
}

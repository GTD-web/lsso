import { UsersService } from '../users/services/users.service';
import { TokensService } from '../tokens/services/tokens.service';
import { LogsService } from '../logs/services/logs.service';
import { LogsAdminUseCase } from '../logs/usecases/admin.usecase';
import { SystemsService } from '../systems/services/systems.service';
import { DashboardSummaryDto, SystemStatusDto, LoginStatsDto, SecurityAlertDto, TokenStatsDto } from './dto/dashboard.dto';
import { Log } from '../logs/entities/log.entity';
export declare class DashboardService {
    private readonly usersService;
    private readonly tokensService;
    private readonly logsService;
    private readonly logsAdminUseCase;
    private readonly systemsService;
    constructor(usersService: UsersService, tokensService: TokensService, logsService: LogsService, logsAdminUseCase: LogsAdminUseCase, systemsService: SystemsService);
    getDashboardSummary(limit?: number): Promise<DashboardSummaryDto>;
    getSystemsStatus(): Promise<SystemStatusDto[]>;
    getRecentLogs(limit?: number): Promise<Log[]>;
    getLoginStats(days?: number): Promise<LoginStatsDto>;
    getSecurityAlerts(limit?: number): Promise<SecurityAlertDto[]>;
    getTokenStats(): Promise<TokenStatsDto>;
    private calculateAvgResponseTime;
}

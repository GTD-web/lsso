import { LogsService } from '../services/logs.service';
import { LogFilterDto } from '../dto/log-filter.dto';
import { Log } from '../../../../../../libs/database/entities';
import { LogResponseDto } from '../dto/log-response.dto';
export declare class LogsAdminUseCase {
    private readonly logsService;
    private readonly logger;
    constructor(logsService: LogsService);
    findAll(page?: number, limit?: number): Promise<{
        logs: Log[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Log>;
    filterLogs(filterDto: LogFilterDto): Promise<{
        logs: Log[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findLoginLogs(days?: number): Promise<Log[]>;
    mapLogToDto(log: Log): LogResponseDto;
}

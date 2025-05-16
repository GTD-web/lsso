import { LogsService } from '../services/logs.service';
import { LogFilterDto } from '../dto/log-filter.dto';
import { Log } from '../entities/log.entity';
export declare class LogsUsecase {
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
}

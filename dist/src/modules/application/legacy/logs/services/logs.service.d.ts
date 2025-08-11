import { Log } from '../../../../../../libs/database/entities';
import { CreateLogDto } from '../dto/create-log.dto';
import { LogFilterDto } from '../dto/log-filter.dto';
import { DomainLogService } from '../../../../domain/log/log.service';
export declare class LogsService {
    private readonly domainLogService;
    private readonly logger;
    constructor(domainLogService: DomainLogService);
    create(createLogDto: CreateLogDto): Promise<void>;
    createMany(createLogDto: CreateLogDto[]): Promise<void>;
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

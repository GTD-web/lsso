import { Repository } from 'typeorm';
import { Log } from '../entities/log.entity';
import { CreateLogDto } from '../dto/create-log.dto';
import { LogFilterDto } from '../dto/log-filter.dto';
export declare class LogsService {
    private logRepository;
    private readonly logger;
    constructor(logRepository: Repository<Log>);
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

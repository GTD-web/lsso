import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogsService {
    private logRepository;
    constructor(logRepository: Repository<Log>);
    createLog(data: CreateLogDto): Promise<void>;
}

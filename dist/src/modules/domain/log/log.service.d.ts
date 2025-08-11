import { DomainLogRepository } from './log.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Log } from '../../../../libs/database/entities';
export declare class DomainLogService extends BaseService<Log> {
    private readonly logRepository;
    constructor(logRepository: DomainLogRepository);
    findByMethodAndUrl(method: string, url: string): Promise<Log[]>;
    findErrorLogs(): Promise<Log[]>;
    findBySystem(system: string): Promise<Log[]>;
    findByStatusCode(statusCode: number): Promise<Log[]>;
    findByIpAddress(ip: string): Promise<Log[]>;
    findSlowRequests(minResponseTime?: number): Promise<Log[]>;
}

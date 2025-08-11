import { Repository } from 'typeorm';
import { Log } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainLogRepository extends BaseRepository<Log> {
    constructor(repository: Repository<Log>);
}

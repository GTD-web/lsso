import { Repository } from 'typeorm';
import { EmployeeRankHistory } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainEmployeeRankHistoryRepository extends BaseRepository<EmployeeRankHistory> {
    constructor(repository: Repository<EmployeeRankHistory>);
}

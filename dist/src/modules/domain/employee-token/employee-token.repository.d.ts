import { Repository } from 'typeorm';
import { EmployeeToken } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainEmployeeTokenRepository extends BaseRepository<EmployeeToken> {
    constructor(repository: Repository<EmployeeToken>);
}

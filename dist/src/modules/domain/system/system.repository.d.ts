import { Repository } from 'typeorm';
import { System } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainSystemRepository extends BaseRepository<System> {
    constructor(repository: Repository<System>);
}

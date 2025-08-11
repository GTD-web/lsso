import { Repository } from 'typeorm';
import { Rank } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainRankRepository extends BaseRepository<Rank> {
    constructor(repository: Repository<Rank>);
}

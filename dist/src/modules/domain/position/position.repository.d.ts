import { Repository } from 'typeorm';
import { Position } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainPositionRepository extends BaseRepository<Position> {
    constructor(repository: Repository<Position>);
}

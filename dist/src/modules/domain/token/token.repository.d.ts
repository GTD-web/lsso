import { Repository } from 'typeorm';
import { Token } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainTokenRepository extends BaseRepository<Token> {
    constructor(repository: Repository<Token>);
}

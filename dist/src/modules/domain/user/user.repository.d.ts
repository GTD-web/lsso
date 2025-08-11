import { Repository } from 'typeorm';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
import { User } from 'libs/database/entities/user.entity';
export declare class DomainUserRepository extends BaseRepository<User> {
    constructor(repository: Repository<User>);
}

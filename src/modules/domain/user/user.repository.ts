import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
import { User } from '../../../../libs/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DomainUserRepository extends BaseRepository<User> {
    constructor(
        @InjectRepository(User)
        repository: Repository<User>,
    ) {
        super(repository);
    }
}

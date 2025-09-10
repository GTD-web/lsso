import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemRole } from './system-role.entity';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainSystemRoleRepository extends BaseRepository<SystemRole> {
    constructor(
        @InjectRepository(SystemRole)
        repository: Repository<SystemRole>,
    ) {
        super(repository);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainSystemRepository extends BaseRepository<System> {
    constructor(
        @InjectRepository(System)
        repository: Repository<System>,
    ) {
        super(repository);
    }
}

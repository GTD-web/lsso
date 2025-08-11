import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainLogRepository extends BaseRepository<Log> {
    constructor(
        @InjectRepository(Log)
        repository: Repository<Log>,
    ) {
        super(repository);
    }
}

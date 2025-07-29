import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeRankHistory } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainEmployeeRankHistoryRepository extends BaseRepository<EmployeeRankHistory> {
    constructor(
        @InjectRepository(EmployeeRankHistory)
        repository: Repository<EmployeeRankHistory>,
    ) {
        super(repository);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeToken } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainEmployeeTokenRepository extends BaseRepository<EmployeeToken> {
    constructor(
        @InjectRepository(EmployeeToken)
        repository: Repository<EmployeeToken>,
    ) {
        super(repository);
    }
}

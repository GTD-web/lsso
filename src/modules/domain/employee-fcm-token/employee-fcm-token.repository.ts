import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeFcmToken } from './employee-fcm-token.entity';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainEmployeeFcmTokenRepository extends BaseRepository<EmployeeFcmToken> {
    constructor(
        @InjectRepository(EmployeeFcmToken)
        repository: Repository<EmployeeFcmToken>,
    ) {
        super(repository);
    }
}

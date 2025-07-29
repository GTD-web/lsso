import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemWebhook } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainSystemWebhookRepository extends BaseRepository<SystemWebhook> {
    constructor(
        @InjectRepository(SystemWebhook)
        repository: Repository<SystemWebhook>,
    ) {
        super(repository);
    }
}

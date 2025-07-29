import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookEventLog } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainWebhookEventLogRepository extends BaseRepository<WebhookEventLog> {
    constructor(
        @InjectRepository(WebhookEventLog)
        repository: Repository<WebhookEventLog>,
    ) {
        super(repository);
    }
}

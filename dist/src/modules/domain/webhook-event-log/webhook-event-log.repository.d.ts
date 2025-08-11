import { Repository } from 'typeorm';
import { WebhookEventLog } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainWebhookEventLogRepository extends BaseRepository<WebhookEventLog> {
    constructor(repository: Repository<WebhookEventLog>);
}

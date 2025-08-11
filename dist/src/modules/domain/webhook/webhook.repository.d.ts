import { Repository } from 'typeorm';
import { Webhook } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainWebhookRepository extends BaseRepository<Webhook> {
    constructor(repository: Repository<Webhook>);
}

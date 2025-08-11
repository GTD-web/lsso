import { Repository } from 'typeorm';
import { SystemWebhook } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainSystemWebhookRepository extends BaseRepository<SystemWebhook> {
    constructor(repository: Repository<SystemWebhook>);
}

import { DomainWebhookRepository } from './webhook.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Webhook } from '../../../../libs/database/entities';
export declare class DomainWebhookService extends BaseService<Webhook> {
    private readonly webhookRepository;
    constructor(webhookRepository: DomainWebhookRepository);
    findByName(webhookName: string): Promise<Webhook>;
    findByEventType(eventType: string): Promise<Webhook[]>;
    findByEntityType(entityType: string): Promise<Webhook[]>;
    findActiveWebhooks(): Promise<Webhook[]>;
    findByTargetUrl(targetUrl: string): Promise<Webhook[]>;
}

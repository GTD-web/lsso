import { DomainSystemWebhookRepository } from './system-webhook.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { SystemWebhook } from '../../../../libs/database/entities';
export declare class DomainSystemWebhookService extends BaseService<SystemWebhook> {
    private readonly systemWebhookRepository;
    constructor(systemWebhookRepository: DomainSystemWebhookRepository);
    findBySystemId(systemId: string): Promise<SystemWebhook[]>;
    findByWebhookId(webhookId: string): Promise<SystemWebhook[]>;
    findBySystemAndWebhook(systemId: string, webhookId: string): Promise<SystemWebhook>;
    updateExecutionStats(systemId: string, webhookId: string, isSuccess: boolean): Promise<SystemWebhook>;
    findMostExecuted(limit?: number): Promise<SystemWebhook[]>;
    findHighFailureRate(minExecutions?: number): Promise<SystemWebhook[]>;
    createRelation(systemId: string, webhookId: string): Promise<SystemWebhook>;
}

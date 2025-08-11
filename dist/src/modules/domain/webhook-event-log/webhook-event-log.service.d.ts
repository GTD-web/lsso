import { DomainWebhookEventLogRepository } from './webhook-event-log.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { WebhookEventLog } from '../../../../libs/database/entities';
export declare class DomainWebhookEventLogService extends BaseService<WebhookEventLog> {
    private readonly webhookEventLogRepository;
    constructor(webhookEventLogRepository: DomainWebhookEventLogRepository);
    findByWebhookId(webhookId: string): Promise<WebhookEventLog[]>;
    findByEventType(eventType: string): Promise<WebhookEventLog[]>;
    findByEntityId(entityId: string): Promise<WebhookEventLog[]>;
    findSuccessfulEvents(): Promise<WebhookEventLog[]>;
    findFailedEvents(): Promise<WebhookEventLog[]>;
    findByResponseCode(responseCode: number): Promise<WebhookEventLog[]>;
    findRetryableEvents(maxAttempts?: number): Promise<WebhookEventLog[]>;
    createEventLog(webhookId: string, eventType: string, entityId: string, payload: Record<string, any>): Promise<WebhookEventLog>;
    updateEventResult(id: string, responseCode: number, responseBody: string, isSuccess: boolean): Promise<WebhookEventLog>;
    incrementAttemptCount(id: string): Promise<WebhookEventLog>;
    findRecentEvents(limit?: number): Promise<WebhookEventLog[]>;
    getSuccessRateByWebhook(webhookId: string): Promise<{
        total: number;
        success: number;
        successRate: number;
    }>;
}

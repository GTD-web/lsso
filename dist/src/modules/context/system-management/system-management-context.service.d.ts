import { DomainSystemService } from '../../domain/system/system.service';
import { DomainWebhookService } from 'src/modules/domain/webhook/webhook.service';
import { DomainWebhookEventLogService } from 'src/modules/domain/webhook-event-log/webhook-event-log.service';
import { DomainSystemWebhookService } from 'src/modules/domain/system-webhook/system-webhook.service';
export declare class SystemManagementContextService {
    private readonly 시스템서비스;
    private readonly 웹훅서비스;
    private readonly 웹훅이벤트로그서비스;
    private readonly 시스템웹훅서비스;
    constructor(시스템서비스: DomainSystemService, 웹훅서비스: DomainWebhookService, 웹훅이벤트로그서비스: DomainWebhookEventLogService, 시스템웹훅서비스: DomainSystemWebhookService);
}

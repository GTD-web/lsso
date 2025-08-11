import { Injectable } from '@nestjs/common';
import { DomainSystemService } from '../../domain/system/system.service';
import { DomainWebhookService } from '../../domain/webhook/webhook.service';
import { DomainWebhookEventLogService } from '../../domain/webhook-event-log/webhook-event-log.service';
import { DomainSystemWebhookService } from '../../domain/system-webhook/system-webhook.service';

@Injectable()
export class SystemManagementContextService {
    constructor(
        private readonly 시스템서비스: DomainSystemService,
        private readonly 웹훅서비스: DomainWebhookService,
        private readonly 웹훅이벤트로그서비스: DomainWebhookEventLogService,
        private readonly 시스템웹훅서비스: DomainSystemWebhookService,
    ) {}
}

import { Module } from '@nestjs/common';
import { WebhookContextService } from './webhook-context.service';

// 웹훅 관련 도메인 모듈들 import
import { DomainWebhookModule } from '../../domain/webhook/webhook.module';
import { DomainWebhookEventLogModule } from '../../domain/webhook-event-log/webhook-event-log.module';
import { DomainSystemWebhookModule } from '../../domain/system-webhook/system-webhook.module';
import { DomainSystemModule } from '../../domain/system/system.module';

@Module({
    imports: [DomainWebhookModule, DomainWebhookEventLogModule, DomainSystemWebhookModule, DomainSystemModule],
    providers: [WebhookContextService],
    exports: [WebhookContextService],
})
export class WebhookContextModule {}

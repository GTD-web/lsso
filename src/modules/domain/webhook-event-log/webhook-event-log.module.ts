import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainWebhookEventLogService } from './webhook-event-log.service';
import { DomainWebhookEventLogRepository } from './webhook-event-log.repository';
import { WebhookEventLog } from '../../../../libs/database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([WebhookEventLog])],
    providers: [DomainWebhookEventLogService, DomainWebhookEventLogRepository],
    exports: [DomainWebhookEventLogService],
})
export class DomainWebhookEventLogModule {}

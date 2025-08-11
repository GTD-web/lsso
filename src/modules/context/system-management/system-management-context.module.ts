import { Module } from '@nestjs/common';
import { SystemManagementContextService } from './system-management-context.service';

// 시스템 관리 관련 도메인 모듈들 import
import { DomainSystemModule } from '../../domain/system/system.module';
import { DomainWebhookModule } from 'src/modules/domain/webhook/webhook.module';
import { DomainWebhookEventLogModule } from 'src/modules/domain/webhook-event-log/webhook-event-log.module';
import { DomainSystemWebhookModule } from 'src/modules/domain/system-webhook/system-webhook.module';

@Module({
    imports: [DomainSystemModule, DomainWebhookModule, DomainWebhookEventLogModule, DomainSystemWebhookModule],
    providers: [SystemManagementContextService],
    exports: [SystemManagementContextService],
})
export class SystemManagementContextModule {}

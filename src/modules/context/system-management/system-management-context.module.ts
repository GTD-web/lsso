import { Module } from '@nestjs/common';
import { SystemManagementContextService } from './system-management-context.service';

// 시스템 관리 관련 도메인 모듈들 import
import { DomainSystemModule } from '../../domain/system/system.module';
import { DomainWebhookModule } from '../../domain/webhook/webhook.module';
import { DomainWebhookEventLogModule } from '../../domain/webhook-event-log/webhook-event-log.module';
import { DomainSystemWebhookModule } from '../../domain/system-webhook/system-webhook.module';
import { DomainSystemRoleModule } from '../../domain/system-role/system-role.module';
import { DomainEmployeeSystemRoleModule } from '../../domain/employee-system-role/employee-system-role.module';

@Module({
    imports: [
        DomainSystemModule,
        DomainWebhookModule,
        DomainWebhookEventLogModule,
        DomainSystemWebhookModule,
        DomainSystemRoleModule,
        DomainEmployeeSystemRoleModule,
    ],
    providers: [SystemManagementContextService],
    exports: [SystemManagementContextService],
})
export class SystemManagementContextModule {}

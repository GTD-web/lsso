import { Module } from '@nestjs/common';
import { FcmTokenManagementApplicationService } from './fcm-token-management-application.service';
import { FcmTokenManagementApplicationController } from './controllers/fcm-token-management-application.controller';

// Context 모듈들 import
import { OrganizationManagementContextModule } from '../../context/organization-management/organization-management-context.module';
import { FcmTokenManagementContextModule } from '../../context/fcm-token-management/fcm-token-management-context.module';

@Module({
    imports: [OrganizationManagementContextModule, FcmTokenManagementContextModule],
    controllers: [FcmTokenManagementApplicationController],
    providers: [FcmTokenManagementApplicationService],
    exports: [FcmTokenManagementApplicationService],
})
export class FcmTokenManagementApplicationModule {}

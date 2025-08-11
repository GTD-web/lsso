import { Module } from '@nestjs/common';
import { SsoApplicationService } from './sso-application.service';
import { SsoApplicationController } from './controllers/sso-application.controller';

// Context 모듈들 import
import { AuthorizationContextModule } from '../../context/authorization/authorization-context.module';
import { SystemManagementContextModule } from '../../context/system-management/system-management-context.module';
import { OrganizationManagementContextModule } from '../../context/organization-management/organization-management-context.module';

@Module({
    imports: [AuthorizationContextModule, SystemManagementContextModule, OrganizationManagementContextModule],
    controllers: [SsoApplicationController],
    providers: [SsoApplicationService],
    exports: [SsoApplicationService],
})
export class SsoApplicationModule {}

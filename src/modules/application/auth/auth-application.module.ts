import { Module } from '@nestjs/common';
import { AuthApplicationService } from './auth-application.service';

// Context 모듈들 import
import { SsoContextModule } from '../../context/sso/sso-context.module';
import { SystemManagementContextModule } from '../../context/system-management/system-management-context.module';
import { OrganizationContextModule } from '../../context/organization/organization-context.module';

@Module({
    imports: [SsoContextModule, SystemManagementContextModule, OrganizationContextModule],
    providers: [AuthApplicationService],
    exports: [AuthApplicationService],
})
export class AuthApplicationModule {}

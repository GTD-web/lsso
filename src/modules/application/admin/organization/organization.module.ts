import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationApplicationService } from './organization-application.service';
import { OrganizationManagementContextModule } from '../../../context/organization-management/organization-management-context.module';
import { SystemManagementContextModule } from '../../../context/system-management/system-management-context.module';

@Module({
    imports: [
        // 조직관리 컨텍스트 모듈
        OrganizationManagementContextModule,
        // 시스템관리 컨텍스트 모듈 (기본 역할 할당을 위해)
        SystemManagementContextModule,
    ],
    controllers: [OrganizationController],
    providers: [OrganizationApplicationService],
    exports: [OrganizationApplicationService],
})
export class OrganizationModule {}

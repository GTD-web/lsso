import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationApplicationService } from './organization-application.service';
import { OrganizationManagementContextModule } from '../../../context/organization-management/organization-management-context.module';

@Module({
    imports: [
        // 조직관리 컨텍스트 모듈
        OrganizationManagementContextModule,
    ],
    controllers: [OrganizationController],
    providers: [OrganizationApplicationService],
    exports: [OrganizationApplicationService],
})
export class OrganizationModule {}

import { Module } from '@nestjs/common';
import { OrganizationContextService } from './organization-management-context.service';
import { OrganizationManagementQueryContextService } from './organization-management-query-context.service';
import { OrganizationManagementMutationContextService } from './organization-management-mutation-context.service';

// 조직 관리 관련 도메인 모듈들 import
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainDepartmentModule } from '../../domain/department/department.module';
import { DomainPositionModule } from '../../domain/position/position.module';
import { DomainRankModule } from '../../domain/rank/rank.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';
import { DomainEmployeeRankHistoryModule } from '../../domain/employee-rank-history/employee-rank-history.module';

@Module({
    imports: [
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainRankModule,
        DomainEmployeeDepartmentPositionModule,
        DomainEmployeeRankHistoryModule,
    ],
    providers: [
        OrganizationContextService,
        OrganizationManagementQueryContextService,
        OrganizationManagementMutationContextService,
    ],
    exports: [
        OrganizationContextService,
        OrganizationManagementQueryContextService,
        OrganizationManagementMutationContextService,
    ],
})
export class OrganizationManagementContextModule {}

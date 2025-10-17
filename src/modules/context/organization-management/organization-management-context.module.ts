import { Module } from '@nestjs/common';
import { OrganizationManagementContextService } from './organization-management-context.service';

// 조직 관리 관련 도메인 모듈들 import
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainDepartmentModule } from '../../domain/department/department.module';
import { DomainPositionModule } from '../../domain/position/position.module';
import { DomainRankModule } from '../../domain/rank/rank.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';
import { DomainEmployeeRankHistoryModule } from '../../domain/employee-rank-history/employee-rank-history.module';
import { DomainEmployeeTokenModule } from '../../domain/employee-token/employee-token.module';
import { DomainEmployeeFcmTokenModule } from '../../domain/employee-fcm-token/employee-fcm-token.module';
import { DomainEmployeeSystemRoleModule } from '../../domain/employee-system-role/employee-system-role.module';

@Module({
    imports: [
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainRankModule,
        DomainEmployeeDepartmentPositionModule,
        DomainEmployeeRankHistoryModule,
        DomainEmployeeTokenModule,
        DomainEmployeeFcmTokenModule,
        DomainEmployeeSystemRoleModule,
    ],
    providers: [OrganizationManagementContextService],
    exports: [OrganizationManagementContextService],
})
export class OrganizationManagementContextModule {}

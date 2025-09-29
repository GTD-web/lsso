import { Module } from '@nestjs/common';
import { EmployeeSystemRoleManagementContextService } from './employee-system-role-management-context.service';
import { EmployeeTokenManagementContextService } from './employee-token-management-context.service';
import { EmployeeFcmTokenManagementContextService } from './employee-fcm-token-management-context.service';
import { DomainEmployeeSystemRoleModule } from '../../domain/employee-system-role/employee-system-role.module';
import { DomainEmployeeTokenModule } from '../../domain/employee-token/employee-token.module';
import { DomainEmployeeFcmTokenModule } from '../../domain/employee-fcm-token/employee-fcm-token.module';

@Module({
    imports: [
        // Domain 모듈들
        DomainEmployeeSystemRoleModule,
        DomainEmployeeTokenModule,
        DomainEmployeeFcmTokenModule,
    ],
    providers: [
        EmployeeSystemRoleManagementContextService,
        EmployeeTokenManagementContextService,
        EmployeeFcmTokenManagementContextService,
    ],
    exports: [
        EmployeeSystemRoleManagementContextService,
        EmployeeTokenManagementContextService,
        EmployeeFcmTokenManagementContextService,
    ],
})
export class EmployeeManagementContextModule {}

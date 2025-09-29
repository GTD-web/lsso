import { Module } from '@nestjs/common';
import { EmployeeSystemRoleController } from './controllers/employee-system-role.controller';
import { EmployeeTokenController } from './controllers/employee-token.controller';
import { EmployeeFcmTokenController } from './controllers/employee-fcm-token.controller';
import { EmployeeSystemRoleApplicationService } from './services/employee-system-role-application.service';
import { EmployeeTokenApplicationService } from './services/employee-token-application.service';
import { EmployeeFcmTokenApplicationService } from './services/employee-fcm-token-application.service';
import { EmployeeManagementContextModule } from '../../../context/employee-management/employee-management-context.module';

@Module({
    imports: [
        // Context 레벨 모듈 임포트
        EmployeeManagementContextModule,
    ],
    controllers: [EmployeeSystemRoleController, EmployeeTokenController, EmployeeFcmTokenController],
    providers: [
        EmployeeSystemRoleApplicationService,
        EmployeeTokenApplicationService,
        EmployeeFcmTokenApplicationService,
    ],
    exports: [
        EmployeeSystemRoleApplicationService,
        EmployeeTokenApplicationService,
        EmployeeFcmTokenApplicationService,
    ],
})
export class EmployeeModule {}

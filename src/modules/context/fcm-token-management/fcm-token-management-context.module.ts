import { Module } from '@nestjs/common';
import { FcmTokenManagementContextService } from './fcm-token-management-context.service';

// FCM 토큰 관리 관련 도메인 모듈들 import
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainFcmTokenModule } from '../../domain/fcm-token/fcm-token.module';
import { DomainEmployeeFcmTokenModule } from '../../domain/employee-fcm-token/employee-fcm-token.module';

@Module({
    imports: [DomainEmployeeModule, DomainFcmTokenModule, DomainEmployeeFcmTokenModule],
    providers: [FcmTokenManagementContextService],
    exports: [FcmTokenManagementContextService],
})
export class FcmTokenManagementContextModule {}

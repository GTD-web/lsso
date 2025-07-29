import { Module } from '@nestjs/common';
import { SystemManagementContextService } from './system-management-context.service';

// 시스템 관리 관련 도메인 모듈들 import
import { DomainSystemModule } from '../../domain/system/system.module';
import { DomainTokenModule } from '../../domain/token/token.module';
import { DomainEmployeeTokenModule } from '../../domain/employee-token/employee-token.module';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';

@Module({
    imports: [DomainSystemModule, DomainTokenModule, DomainEmployeeTokenModule, DomainEmployeeModule],
    providers: [SystemManagementContextService],
    exports: [SystemManagementContextService],
})
export class SystemManagementContextModule {}

import { Module } from '@nestjs/common';
import { SsoContextService } from './sso-context.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

// SSO 관련 도메인 모듈들 import
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainTokenModule } from '../../domain/token/token.module';
import { DomainSystemModule } from '../../domain/system/system.module';
import { DomainLogModule } from '../../domain/log/log.module';
import { DomainEmployeeTokenModule } from '../../domain/employee-token/employee-token.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';

// 유틸리티
import { JwtUtil } from './utils/jwt.util';
import { PasswordUtil } from './utils/password.util';

@Module({
    imports: [
        JwtModule.register({}), // 동적 설정 사용
        ConfigModule,
        DomainEmployeeModule,
        DomainTokenModule,
        DomainSystemModule,
        DomainLogModule,
        DomainEmployeeTokenModule,
        DomainEmployeeDepartmentPositionModule,
    ],
    providers: [SsoContextService, JwtUtil, PasswordUtil],
    exports: [SsoContextService],
})
export class SsoContextModule {}

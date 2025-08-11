import { Module } from '@nestjs/common';
import { AuthorizationContextService } from './authorization-context.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

// SSO 관련 도메인 모듈들 import
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainTokenModule } from '../../domain/token/token.module';
import { DomainSystemModule } from '../../domain/system/system.module';
import { DomainEmployeeTokenModule } from '../../domain/employee-token/employee-token.module';

@Module({
    imports: [
        JwtModule.register({}), // 동적 설정 사용
        ConfigModule,
        DomainEmployeeModule,
        DomainTokenModule,
        DomainSystemModule,
        DomainEmployeeTokenModule,
    ],
    providers: [AuthorizationContextService],
    exports: [AuthorizationContextService],
})
export class AuthorizationContextModule {}

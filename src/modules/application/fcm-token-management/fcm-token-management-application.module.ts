import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FcmTokenManagementApplicationService } from './fcm-token-management-application.service';
import { FcmTokenManagementApplicationController } from './controllers/fcm-token-management-application.controller';

// Context 모듈들 import
import { OrganizationManagementContextModule } from '../../context/organization-management/organization-management-context.module';
import { AuthorizationContextModule } from '../../context/authorization/authorization-context.module';

// JWT 관련 import
import { JwtStrategy } from '../../../../libs/common/strategies/jwt.strategy';
import { JwtAuthGuard } from '../../../../libs/common/guards/jwt-auth.guard';
import { jwtConfig } from '../../../../libs/configs/jwt.config';

@Module({
    imports: [
        OrganizationManagementContextModule,
        AuthorizationContextModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: jwtConfig,
            inject: [ConfigService],
        }),
    ],
    controllers: [FcmTokenManagementApplicationController],
    providers: [FcmTokenManagementApplicationService, JwtStrategy, JwtAuthGuard],
    exports: [FcmTokenManagementApplicationService],
})
export class FcmTokenManagementApplicationModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

// 조직관리 관련 imports
import { OrganizationModule } from './organization/organization.module';

// 시스템관리 관련 imports
import { SystemModule } from './system/system.module';

// 로그관리 관련 imports
import { LogModule } from './log/log.module';

@Module({
    imports: [
        // JWT 모듈 설정
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('GLOBAL_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
        }),
        // PassportModule.register({ defaultStrategy: 'jwt' }),

        // 조직관리 모듈
        OrganizationModule,

        // 시스템관리 모듈
        SystemModule,

        // 로그관리 모듈
        LogModule,
    ],
    controllers: [],
    providers: [],
    exports: [OrganizationModule, SystemModule, LogModule],
})
export class AdminModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminAuthController } from './controllers/admin.controller';
import { AdminUseCase } from './usecases/admin.usecase';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AdminAuthController],
    providers: [AuthService, AdminUseCase, JwtAuthGuard],
    exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { UsersModule } from 'src/users/users.module';
import { SystemsModule } from 'src/systems/systems.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
    imports: [
        SystemsModule,
        UsersModule,
        TokensModule,
        // JwtModule.register({
        //     global: true,
        //     secretOrPrivateKey: process.env.JWT_SECRET || 'admin-secret-key',
        //     signOptions: { expiresIn: '1h' },
        // }),
        TypeOrmModule.forFeature([Admin, RefreshToken]),

        // JWT 모듈 설정
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get<string>('JWT_SECRET') || 'admin-secret-key',
                signOptions: { expiresIn: '1h' },
            }),
        }),

        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController, AdminAuthController],
    providers: [AuthService, AdminAuthService],
    exports: [AuthService, AdminAuthService],
})
export class AuthModule {}

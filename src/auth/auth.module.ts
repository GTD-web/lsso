import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ClientAuthController } from './controllers/client.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { UsersModule } from 'src/users/users.module';
import { SystemsModule } from 'src/systems/systems.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { DomainAuthController } from './controllers/domain.controller';
import { AdminAuthController } from './controllers/admin.controller';
import { AdminUseCase } from './usecases/admin.usecase';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ClientUseCase } from './usecases/client.usecase';

@Module({
    imports: [
        SystemsModule,
        UsersModule,
        TokensModule,
        TypeOrmModule.forFeature([Admin]),

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
    controllers: [ClientAuthController, DomainAuthController, AdminAuthController],
    providers: [AuthService, AdminUseCase, JwtAuthGuard, ClientUseCase],
    exports: [AuthService],
})
export class AuthModule {}

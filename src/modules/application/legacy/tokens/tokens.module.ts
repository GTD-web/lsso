import { Module } from '@nestjs/common';
import { TokensService } from './services/tokens.service';
import { UsersModule } from '../users/users.module';
import { SystemsModule } from '../systems/systems.module';
import { AdminTokensController } from './controllers/admin-tokens.controller';
import { AdminTokensUsecase } from './usecases/admin.usecase';
import { ClientTokensUsecase } from './usecases/client.usecase';
import { DomainTokenModule } from '../../../domain/token/token.module';
import { DomainEmployeeTokenModule } from '../../../domain/employee-token/employee-token.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        DomainTokenModule,
        DomainEmployeeTokenModule,
        UsersModule,
        SystemsModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('GLOBAL_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
        }),
    ],
    providers: [TokensService, AdminTokensUsecase, ClientTokensUsecase],
    controllers: [AdminTokensController],
    exports: [TokensService, AdminTokensUsecase, ClientTokensUsecase],
})
export class TokensModule {}

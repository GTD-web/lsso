import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokensService } from './services/tokens.service';
import { UsersModule } from '../users/users.module';
import { SystemsModule } from '../systems/systems.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminTokensController } from './controllers/admin-tokens.controller';
import { DomainTokensController } from './controllers/domain.controller';
import { AdminTokensUsecase } from './usecases/admin.usecase';
import { ClientTokensUsecase } from './usecases/client.usecase';
@Module({
    imports: [TypeOrmModule.forFeature([Token]), UsersModule, SystemsModule, JwtModule.register({})],
    providers: [TokensService, AdminTokensUsecase, ClientTokensUsecase],
    controllers: [AdminTokensController, DomainTokensController],
    exports: [TokensService, UsersModule, SystemsModule, AdminTokensUsecase, ClientTokensUsecase],
})
export class TokensModule {}

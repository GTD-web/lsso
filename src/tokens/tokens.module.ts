import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { UsersModule } from '../users/users.module';
import { SystemsModule } from '../systems/systems.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminTokensController } from './admin-tokens.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Token]), UsersModule, SystemsModule, JwtModule.register({})],
    providers: [TokensService],
    controllers: [TokensController, AdminTokensController],
    exports: [TokensService, UsersModule, SystemsModule],
})
export class TokensModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { System } from '../systems/entities/system.entity';
import { Token } from '../tokens/entities/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, System, Token]), JwtModule.register({}), TokensModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainTokenService } from './token.service';
import { DomainTokenRepository } from './token.repository';
import { Token } from '../../../../libs/database/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Token]), JwtModule.register({})],
    providers: [DomainTokenService, DomainTokenRepository],
    exports: [DomainTokenService, DomainTokenRepository],
})
export class DomainTokenModule {}

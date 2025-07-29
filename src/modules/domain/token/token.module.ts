import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainTokenService } from './token.service';
import { DomainTokenRepository } from './token.repository';
import { Token } from '../../../../libs/database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Token])],
    providers: [DomainTokenService, DomainTokenRepository],
    exports: [DomainTokenService],
})
export class DomainTokenModule {}

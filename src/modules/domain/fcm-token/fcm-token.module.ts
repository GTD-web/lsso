import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainFcmTokenService } from './fcm-token.service';
import { DomainFcmTokenRepository } from './fcm-token.repository';
import { FcmToken } from './fcm-token.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FcmToken])],
    providers: [DomainFcmTokenService, DomainFcmTokenRepository],
    exports: [DomainFcmTokenService],
})
export class DomainFcmTokenModule {}

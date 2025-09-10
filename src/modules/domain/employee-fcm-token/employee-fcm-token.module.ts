import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainEmployeeFcmTokenService } from './employee-fcm-token.service';
import { DomainEmployeeFcmTokenRepository } from './employee-fcm-token.repository';
import { EmployeeFcmToken } from './employee-fcm-token.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeFcmToken])],
    providers: [DomainEmployeeFcmTokenService, DomainEmployeeFcmTokenRepository],
    exports: [DomainEmployeeFcmTokenService],
})
export class DomainEmployeeFcmTokenModule {}

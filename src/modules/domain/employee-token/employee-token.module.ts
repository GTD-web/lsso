import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainEmployeeTokenService } from './employee-token.service';
import { DomainEmployeeTokenRepository } from './employee-token.repository';
import { EmployeeToken } from '../../../../libs/database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeToken])],
    providers: [DomainEmployeeTokenService, DomainEmployeeTokenRepository],
    exports: [DomainEmployeeTokenService],
})
export class DomainEmployeeTokenModule {}

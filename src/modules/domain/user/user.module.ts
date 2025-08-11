import { Module } from '@nestjs/common';
import { DomainUserService } from './user.service';
import { DomainUserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../libs/database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [DomainUserService, DomainUserRepository],
    exports: [DomainUserService, DomainUserRepository],
})
export class DomainUserModule {}

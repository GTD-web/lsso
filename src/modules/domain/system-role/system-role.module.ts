import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemRole } from './system-role.entity';
import { DomainSystemRoleRepository } from './system-role.repository';
import { DomainSystemRoleService } from './system-role.service';

@Module({
    imports: [TypeOrmModule.forFeature([SystemRole])],
    providers: [DomainSystemRoleRepository, DomainSystemRoleService],
    exports: [DomainSystemRoleService],
})
export class DomainSystemRoleModule {}

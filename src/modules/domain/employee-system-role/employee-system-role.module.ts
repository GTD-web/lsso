import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSystemRole } from './employee-system-role.entity';
import { DomainEmployeeSystemRoleRepository } from './employee-system-role.repository';
import { DomainEmployeeSystemRoleService } from './employee-system-role.service';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeSystemRole])],
    providers: [DomainEmployeeSystemRoleRepository, DomainEmployeeSystemRoleService],
    exports: [DomainEmployeeSystemRoleService],
})
export class DomainEmployeeSystemRoleModule {}

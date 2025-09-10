import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeSystemRole } from './employee-system-role.entity';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainEmployeeSystemRoleRepository extends BaseRepository<EmployeeSystemRole> {
    constructor(
        @InjectRepository(EmployeeSystemRole)
        repository: Repository<EmployeeSystemRole>,
    ) {
        super(repository);
    }
}

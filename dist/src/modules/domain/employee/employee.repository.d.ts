import { Repository } from 'typeorm';
import { Employee } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainEmployeeRepository extends BaseRepository<Employee> {
    constructor(repository: Repository<Employee>);
}

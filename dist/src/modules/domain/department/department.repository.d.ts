import { Repository } from 'typeorm';
import { Department } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainDepartmentRepository extends BaseRepository<Department> {
    constructor(repository: Repository<Department>);
}

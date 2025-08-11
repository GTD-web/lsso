import { Repository } from 'typeorm';
import { EmployeeDepartmentPosition } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
export declare class DomainEmployeeDepartmentPositionRepository extends BaseRepository<EmployeeDepartmentPosition> {
    constructor(repository: Repository<EmployeeDepartmentPosition>);
}

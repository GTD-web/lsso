import { DomainDepartmentRepository } from './department.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Department } from '../../../../libs/database/entities';
export declare class DomainDepartmentService extends BaseService<Department> {
    private readonly departmentRepository;
    private readonly logger;
    constructor(departmentRepository: DomainDepartmentRepository);
    findById(departmentId: string): Promise<Department>;
    findByName(departmentName: string): Promise<Department>;
    findByCode(departmentCode: string): Promise<Department>;
    findAllDepartments(): Promise<Department[]>;
    findRootDepartments(): Promise<Department[]>;
    findAllDepartmentsWithChildren(): Promise<Department[]>;
}

import { DomainEmployeeDepartmentPositionRepository } from './employee-department-position.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { EmployeeDepartmentPosition } from '../../../../libs/database/entities';
export declare class DomainEmployeeDepartmentPositionService extends BaseService<EmployeeDepartmentPosition> {
    private readonly employeeDepartmentPositionRepository;
    constructor(employeeDepartmentPositionRepository: DomainEmployeeDepartmentPositionRepository);
    findByEmployeeId(employeeId: string): Promise<EmployeeDepartmentPosition>;
    findAllByEmployeeIds(employeeIds: string[]): Promise<EmployeeDepartmentPosition[]>;
    findByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]>;
    findByPositionId(positionId: string): Promise<EmployeeDepartmentPosition[]>;
    findByEmployeeAndDepartment(employeeId: string, departmentId: string): Promise<EmployeeDepartmentPosition>;
    createEmployeeDepartmentPosition(employeeId: string, departmentId: string, positionId: string): Promise<EmployeeDepartmentPosition>;
    deleteEmployeeDepartmentPosition(id: string): Promise<void>;
    transferEmployee(employeeId: string, newDepartmentId: string, newPositionId: string): Promise<EmployeeDepartmentPosition>;
    getDepartmentPositionStats(departmentId: string): Promise<any>;
    findCurrentPositionByEmployeeId(employeeId: string): Promise<EmployeeDepartmentPosition>;
    findManagersByDepartment(departmentId: string): Promise<EmployeeDepartmentPosition[]>;
    findRecentOrganizationChanges(limit?: number): Promise<EmployeeDepartmentPosition[]>;
}

import { Employee } from './employee.entity';
import { Department } from './department.entity';
import { Position } from './position.entity';
export declare enum ManagerType {
    DIRECT = "direct",
    FUNCTIONAL = "functional",
    PROJECT = "project",
    TEMPORARY = "temporary",
    DEPUTY = "deputy"
}
export declare class EmployeeDepartmentPosition {
    id: string;
    employeeId: string;
    departmentId: string;
    positionId: string;
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
    isPrimary: boolean;
    isTemporary: boolean;
    reason?: string;
    authorityLevel?: number;
    notes?: string;
    createdBy?: string;
    updatedBy?: string;
    employee: Employee;
    department: Department;
    position: Position;
    createdAt: Date;
    updatedAt: Date;
}

import { Employee } from './employee.entity';
import { Department } from './department.entity';
export declare enum ProjectStatus {
    PLANNING = "planning",
    ACTIVE = "active",
    ON_HOLD = "on_hold",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare enum ProjectPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare class Project {
    id: string;
    projectName: string;
    projectCode: string;
    description?: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    startDate: Date;
    endDate: Date;
    actualStartDate?: Date;
    actualEndDate?: Date;
    budget?: number;
    ownerDepartmentId?: string;
    projectManagerId?: string;
    progressPercentage: number;
    objectives?: any;
    risks?: any;
    isActive: boolean;
    createdBy?: string;
    updatedBy?: string;
    ownerDepartment?: Department;
    projectManager?: Employee;
    createdAt: Date;
    updatedAt: Date;
}

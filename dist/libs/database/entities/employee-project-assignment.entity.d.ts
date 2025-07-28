import { Employee } from './employee.entity';
import { Project } from './project.entity';
import { ProjectRole } from './project-role.entity';
export declare enum AssignmentStatus {
    ASSIGNED = "assigned",
    ACTIVE = "active",
    COMPLETED = "completed",
    WITHDRAWN = "withdrawn"
}
export declare enum CommitmentLevel {
    FULL_TIME = "full_time",
    PART_TIME = "part_time",
    CONSULTING = "consulting",
    SUPPORTING = "supporting"
}
export declare class EmployeeProjectAssignment {
    id: string;
    employeeId: string;
    projectId: string;
    projectRoleId: string;
    assignmentStartDate: Date;
    assignmentEndDate?: Date;
    status: AssignmentStatus;
    commitmentLevel: CommitmentLevel;
    allocationPercentage: number;
    hourlyRate?: number;
    estimatedHours?: number;
    actualHours: number;
    reason?: string;
    specialPermissions?: string[];
    performanceTargets?: any;
    notes?: string;
    createdBy?: string;
    updatedBy?: string;
    employee: Employee;
    project: Project;
    projectRole: ProjectRole;
    createdAt: Date;
    updatedAt: Date;
    get isProjectLeader(): boolean;
    get isFullTimeAssignment(): boolean;
    get isActiveAssignment(): boolean;
}

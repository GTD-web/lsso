import { Employee } from './employee.entity';
import { Department } from './department.entity';
import { Position } from './position.entity';
import { Rank } from './rank.entity';
import { EmployeeDepartmentPosition } from './employee-department-position.entity';
import { EmployeeRankHistory } from './employee-rank-history.entity';
import { Project } from './project.entity';
import { ProjectRole } from './project-role.entity';
import { EmployeeProjectAssignment } from './employee-project-assignment.entity';

export {
    Employee,
    Department,
    Position,
    Rank,
    EmployeeDepartmentPosition,
    EmployeeRankHistory,
    Project,
    ProjectRole,
    EmployeeProjectAssignment,
};

export const Entities = [
    Employee,
    Department,
    Position,
    Rank,
    EmployeeDepartmentPosition,
    EmployeeRankHistory,
    Project,
    ProjectRole,
    EmployeeProjectAssignment,
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entities = exports.EmployeeProjectAssignment = exports.ProjectRole = exports.Project = exports.EmployeeRankHistory = exports.EmployeeDepartmentPosition = exports.Rank = exports.Position = exports.Department = exports.Employee = void 0;
const employee_entity_1 = require("./employee.entity");
Object.defineProperty(exports, "Employee", { enumerable: true, get: function () { return employee_entity_1.Employee; } });
const department_entity_1 = require("./department.entity");
Object.defineProperty(exports, "Department", { enumerable: true, get: function () { return department_entity_1.Department; } });
const position_entity_1 = require("./position.entity");
Object.defineProperty(exports, "Position", { enumerable: true, get: function () { return position_entity_1.Position; } });
const rank_entity_1 = require("./rank.entity");
Object.defineProperty(exports, "Rank", { enumerable: true, get: function () { return rank_entity_1.Rank; } });
const employee_department_position_entity_1 = require("./employee-department-position.entity");
Object.defineProperty(exports, "EmployeeDepartmentPosition", { enumerable: true, get: function () { return employee_department_position_entity_1.EmployeeDepartmentPosition; } });
const employee_rank_history_entity_1 = require("./employee-rank-history.entity");
Object.defineProperty(exports, "EmployeeRankHistory", { enumerable: true, get: function () { return employee_rank_history_entity_1.EmployeeRankHistory; } });
const project_entity_1 = require("./project.entity");
Object.defineProperty(exports, "Project", { enumerable: true, get: function () { return project_entity_1.Project; } });
const project_role_entity_1 = require("./project-role.entity");
Object.defineProperty(exports, "ProjectRole", { enumerable: true, get: function () { return project_role_entity_1.ProjectRole; } });
const employee_project_assignment_entity_1 = require("./employee-project-assignment.entity");
Object.defineProperty(exports, "EmployeeProjectAssignment", { enumerable: true, get: function () { return employee_project_assignment_entity_1.EmployeeProjectAssignment; } });
exports.Entities = [
    employee_entity_1.Employee,
    department_entity_1.Department,
    position_entity_1.Position,
    rank_entity_1.Rank,
    employee_department_position_entity_1.EmployeeDepartmentPosition,
    employee_rank_history_entity_1.EmployeeRankHistory,
    project_entity_1.Project,
    project_role_entity_1.ProjectRole,
    employee_project_assignment_entity_1.EmployeeProjectAssignment,
];
//# sourceMappingURL=index.js.map
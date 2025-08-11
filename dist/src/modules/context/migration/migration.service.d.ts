import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainEmployeeRankHistoryService } from '../../domain/employee-rank-history/employee-rank-history.service';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { DepartmentResponseDto } from './dto/department-response.dto';
import { PositionResponseDto } from './dto/position-response.dto';
import { RankResponseDto } from './dto/rank-response.dto';
import { DomainUserService } from 'src/modules/domain/user/user.service';
export declare class MigrationService {
    private readonly employeeService;
    private readonly departmentService;
    private readonly positionService;
    private readonly rankService;
    private readonly employeeDepartmentPositionService;
    private readonly employeeRankHistoryService;
    private readonly userService;
    constructor(employeeService: DomainEmployeeService, departmentService: DomainDepartmentService, positionService: DomainPositionService, rankService: DomainRankService, employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService, employeeRankHistoryService: DomainEmployeeRankHistoryService, userService: DomainUserService);
    onApplicationBootstrap(): Promise<void>;
    getEmployees(): Promise<EmployeeResponseDto[]>;
    getDepartments(): Promise<DepartmentResponseDto[]>;
    getPositions(): Promise<PositionResponseDto[]>;
    getRanks(): Promise<RankResponseDto[]>;
    migrate(): Promise<void>;
}

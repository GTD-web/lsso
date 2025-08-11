import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainEmployeeRankHistoryService } from '../../domain/employee-rank-history/employee-rank-history.service';
import { Department } from 'libs/database/entities/department.entity';
import { Employee } from 'libs/database/entities/employee.entity';
import { Position } from 'libs/database/entities/position.entity';
import { Rank } from 'libs/database/entities/rank.entity';
export declare class OrganizationContextService {
    private readonly 직원서비스;
    private readonly 부서서비스;
    private readonly 직책서비스;
    private readonly 직급서비스;
    private readonly 직원부서직책서비스;
    private readonly 직원직급이력서비스;
    constructor(직원서비스: DomainEmployeeService, 부서서비스: DomainDepartmentService, 직책서비스: DomainPositionService, 직급서비스: DomainRankService, 직원부서직책서비스: DomainEmployeeDepartmentPositionService, 직원직급이력서비스: DomainEmployeeRankHistoryService);
    직원의_부서_직책_직급을_조회한다(employee: Employee): Promise<{
        department: Department;
        position: Position;
        rank: Rank;
    }>;
}

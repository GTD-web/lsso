import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainEmployeeRankHistoryService } from '../../domain/employee-rank-history/employee-rank-history.service';
import { Department } from '../../../../libs/database/entities/department.entity';
import { Employee } from '../../../../libs/database/entities/employee.entity';
import { Position } from '../../../../libs/database/entities/position.entity';
import { Rank } from '../../../../libs/database/entities/rank.entity';

@Injectable()
export class OrganizationContextService {
    constructor(
        private readonly 직원서비스: DomainEmployeeService,
        private readonly 부서서비스: DomainDepartmentService,
        private readonly 직책서비스: DomainPositionService,
        private readonly 직급서비스: DomainRankService,
        private readonly 직원부서직책서비스: DomainEmployeeDepartmentPositionService,
        private readonly 직원직급이력서비스: DomainEmployeeRankHistoryService,
    ) {}

    async 직원_ID값으로_직원정보를_조회한다(employeeId: string): Promise<Employee> {
        return this.직원서비스.findByEmployeeId(employeeId);
    }

    async 직원_사번으로_직원정보를_조회한다(employeeNumber: string): Promise<Employee> {
        return this.직원서비스.findByEmployeeNumber(employeeNumber);
    }

    async 직원의_부서_직책_직급을_조회한다(
        employee: Employee,
    ): Promise<{ department: Department; position: Position; rank: Rank }> {
        const 부서직책정보 = await this.직원부서직책서비스.findByEmployeeId(employee.id);
        const department = await this.부서서비스.findById(부서직책정보.departmentId);
        const position = await this.직책서비스.findById(부서직책정보.positionId);
        const rank = await this.직급서비스.findById(employee.currentRankId);
        return { department, position, rank };
    }

    async 여러_직원_ID값으로_직원정보를_조회한다(
        employeeIds: string[],
        includeTerminated = false,
    ): Promise<Employee[]> {
        return this.직원서비스.findByEmployeeIds(employeeIds, includeTerminated);
    }

    async 여러_직원_사번으로_직원정보를_조회한다(
        employeeNumbers: string[],
        includeTerminated = false,
    ): Promise<Employee[]> {
        return this.직원서비스.findByEmployeeNumbers(employeeNumbers, includeTerminated);
    }

    async 전체_직원정보를_조회한다(includeTerminated = false): Promise<Employee[]> {
        return this.직원서비스.findAllEmployees(includeTerminated);
    }

    async 여러_직원의_부서_직책_직급을_일괄조회한다(
        employees: Employee[],
    ): Promise<Map<string, { department: Department; position: Position; rank: Rank }>> {
        const employeeIds = employees.map((emp) => emp.id);
        const resultMap = new Map<string, { department: Department; position: Position; rank: Rank }>();

        // 1. 모든 직원의 부서-직책 정보를 한 번에 조회
        const 부서직책정보들 = await this.직원부서직책서비스.findAllByEmployeeIds(employeeIds);

        // 2. 필요한 부서, 직책, 직급 ID들을 수집
        const departmentIds = [...new Set(부서직책정보들.map((info) => info.departmentId))];
        const positionIds = [...new Set(부서직책정보들.map((info) => info.positionId))];
        const rankIds = [...new Set(employees.map((emp) => emp.currentRankId).filter((id) => id))];

        // 3. 부서, 직책, 직급 정보를 배치로 조회
        const [departments, positions, ranks] = await Promise.all([
            this.부서서비스.findByIdsWithParent(departmentIds),
            this.직책서비스.findByIds(positionIds),
            this.직급서비스.findByIds(rankIds),
        ]);

        // 4. 조회된 데이터를 Map으로 변환 (빠른 조회를 위해)
        const departmentMap = new Map(departments.map((dept) => [dept.id, dept]));
        const positionMap = new Map(positions.map((pos) => [pos.id, pos]));
        const rankMap = new Map(ranks.map((rank) => [rank.id, rank]));
        const 부서직책Map = new Map(부서직책정보들.map((info) => [info.employeeId, info]));

        // 5. 각 직원에 대해 정보를 매핑
        for (const employee of employees) {
            const 부서직책정보 = 부서직책Map.get(employee.id);
            if (부서직책정보) {
                const department = departmentMap.get(부서직책정보.departmentId);
                const position = positionMap.get(부서직책정보.positionId);
                const rank = rankMap.get(employee.currentRankId);

                resultMap.set(employee.id, {
                    department,
                    position,
                    rank,
                });
            }
        }

        return resultMap;
    }

    async 직원의_FCM토큰을_업데이트한다(employeeId: string, fcmToken: string): Promise<Employee> {
        return this.직원서비스.update(employeeId, {
            fcmToken: fcmToken,
        });
    }

    async 직원의_FCM토큰을_제거한다(employeeId: string): Promise<Employee> {
        return this.직원서비스.update(employeeId, {
            fcmToken: null,
        });
    }
}

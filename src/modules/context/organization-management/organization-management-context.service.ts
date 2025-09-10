import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainEmployeeRankHistoryService } from '../../domain/employee-rank-history/employee-rank-history.service';
import { Department, Employee, Position, Rank } from '../../../../libs/database/entities';

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

    async 부서_계층구조를_조회한다(
        rootDepartmentId?: string,
        maxDepth?: number,
        includeEmptyDepartments = true,
    ): Promise<Department[]> {
        // 최상위 부서부터 시작하거나 지정된 부서부터 시작
        let rootDepartments: Department[];

        if (rootDepartmentId) {
            const rootDept = await this.부서서비스.findByIdWithParent(rootDepartmentId);
            rootDepartments = [rootDept];
        } else {
            rootDepartments = await this.부서서비스.findRootDepartments();
        }

        // 🚀 성능 최적화: 전체 부서 목록을 미리 조회 (배치 처리)
        const allDepartments = await this.부서서비스.findAllDepartmentsWithChildren();
        const departmentMap = new Map(allDepartments.map((dept) => [dept.id, dept]));

        // 계층구조 구축
        const result: Department[] = [];
        for (const rootDept of rootDepartments) {
            const hierarchyDept = this.부서_계층구조를_구축한다(
                rootDept,
                departmentMap,
                0,
                maxDepth,
                includeEmptyDepartments,
            );
            if (hierarchyDept) {
                result.push(hierarchyDept);
            }
        }

        return result;
    }

    private 부서_계층구조를_구축한다(
        department: Department,
        departmentMap: Map<string, Department>,
        currentDepth: number,
        maxDepth?: number,
        includeEmptyDepartments = true,
    ): Department | null {
        // 최대 깊이 체크
        if (maxDepth !== undefined && currentDepth >= maxDepth) {
            return department;
        }

        // 하위 부서들 조회
        const childDepartments: Department[] = [];
        const allChildren = Array.from(departmentMap.values()).filter(
            (dept) => dept.parentDepartmentId === department.id,
        );

        for (const childDept of allChildren) {
            const childHierarchy = this.부서_계층구조를_구축한다(
                childDept,
                departmentMap,
                currentDepth + 1,
                maxDepth,
                includeEmptyDepartments,
            );
            if (childHierarchy) {
                childDepartments.push(childHierarchy);
            }
        }

        // 부서에 하위 부서들 설정
        department.childDepartments = childDepartments.sort((a, b) => a.order - b.order);

        return department;
    }

    async 부서별_직원_목록을_조회한다(
        departmentIds: string[],
        includeTerminated = false,
        withDetail = false,
    ): Promise<Map<string, { employees: Employee[]; departmentPositions: Map<string, any> }>> {
        if (departmentIds.length === 0) {
            return new Map();
        }

        // 🚀 성능 최적화: 배치로 모든 데이터를 한 번에 조회
        const [allEmployeeDeptPositions, allEmployees] = await Promise.all([
            // 1. 모든 부서의 직원-부서-직책 관계를 한 번에 조회
            this.직원부서직책서비스.findByDepartmentIds(departmentIds),
            // 2. 모든 직원 정보를 한 번에 조회 (부서별 필터링은 나중에)
            this.전체_활성_직원정보를_조회한다(includeTerminated),
        ]);

        // 직원 ID 맵 생성 (빠른 조회를 위해)
        const employeeMap = new Map(allEmployees.map((emp) => [emp.id, emp]));

        // 부서별로 그룹화
        const departmentEmployeesMap = new Map<
            string,
            { employees: Employee[]; departmentPositions: Map<string, any> }
        >();

        // 초기화: 모든 부서에 대해 빈 배열로 시작
        for (const departmentId of departmentIds) {
            departmentEmployeesMap.set(departmentId, {
                employees: [],
                departmentPositions: new Map(),
            });
        }

        // 직원-부서-직책 관계를 부서별로 그룹화
        for (const edp of allEmployeeDeptPositions) {
            const employee = employeeMap.get(edp.employeeId);

            // 직원이 존재하고, 요청된 부서에 속한 경우만 처리
            if (employee && departmentIds.includes(edp.departmentId)) {
                const deptInfo = departmentEmployeesMap.get(edp.departmentId)!;

                deptInfo.employees.push(employee);
                deptInfo.departmentPositions.set(edp.employeeId, {
                    positionId: edp.positionId,
                    isManager: edp.isManager,
                    createdAt: edp.createdAt,
                });
            }
        }

        return departmentEmployeesMap;
    }

    // 🚀 성능 최적화: 전체 활성 직원 조회 (필터링은 메모리에서)
    private async 전체_활성_직원정보를_조회한다(includeTerminated = false): Promise<Employee[]> {
        return this.직원서비스.findAllEmployees(includeTerminated);
    }

    async 부서_계층구조별_직원정보를_조회한다(
        rootDepartmentId?: string,
        maxDepth?: number,
        withEmployeeDetail = false,
        includeTerminated = false,
        includeEmptyDepartments = true,
    ): Promise<{
        departments: Department[];
        employeesByDepartment: Map<string, { employees: Employee[]; departmentPositions: Map<string, any> }>;
        departmentDetails?: Map<string, { department: Department; position: Position; rank: Rank }[]>;
    }> {
        // 🚀 성능 최적화: 모든 데이터를 병렬로 조회
        const [departments] = await Promise.all([
            // 1. 부서 계층구조 조회
            this.부서_계층구조를_조회한다(rootDepartmentId, maxDepth, includeEmptyDepartments),
        ]);

        // 2. 모든 부서 ID 수집 (재귀적으로)
        const allDepartmentIds = this.모든_부서_ID를_수집한다(departments);

        if (allDepartmentIds.length === 0) {
            return {
                departments,
                employeesByDepartment: new Map(),
                departmentDetails: undefined,
            };
        }

        // 🚀 성능 최적화: 직원 정보와 상세 정보를 병렬로 조회
        const [employeesByDepartment, departmentDetails] = await Promise.all([
            // 3. 부서별 직원 목록 조회
            this.부서별_직원_목록을_조회한다(allDepartmentIds, includeTerminated, withEmployeeDetail),
            // 4. 직원 상세 정보 병렬 조회
            withEmployeeDetail
                ? this.직원_상세정보를_병렬조회한다(allDepartmentIds, includeTerminated)
                : Promise.resolve(undefined),
        ]);

        return {
            departments,
            employeesByDepartment,
            departmentDetails,
        };
    }

    // 🚀 성능 최적화: 직원 상세 정보 병렬 조회
    private async 직원_상세정보를_병렬조회한다(
        departmentIds: string[],
        includeTerminated = false,
    ): Promise<Map<string, { department: Department; position: Position; rank: Rank }[]> | undefined> {
        try {
            // 🚀 성능 최적화: 모든 필요한 데이터를 병렬로 조회
            const [employeeDeptPositions, departments, positions, ranks, employees] = await Promise.all([
                this.직원부서직책서비스.findByDepartmentIds(departmentIds),
                this.부서서비스.findByIds(departmentIds),
                this.직책서비스.findAllPositions(),
                this.직급서비스.findAllRanks(),
                this.직원서비스.findAllEmployees(includeTerminated),
            ]);

            // 빠른 조회를 위한 Map 생성
            const departmentMap = new Map(departments.map((dept) => [dept.id, dept]));
            const positionMap = new Map(positions.map((pos) => [pos.id, pos]));
            const rankMap = new Map(ranks.map((rank) => [rank.id, rank]));
            const employeeMap = new Map(employees.map((emp) => [emp.id, emp]));

            // 부서별 직원 상세 정보 매핑
            const departmentDetails = new Map<string, { department: Department; position: Position; rank: Rank }[]>();

            for (const edp of employeeDeptPositions) {
                const employee = employeeMap.get(edp.employeeId);
                const department = departmentMap.get(edp.departmentId);
                const position = positionMap.get(edp.positionId);

                if (employee && department && position) {
                    const rank = rankMap.get(employee.currentRankId);

                    if (rank) {
                        if (!departmentDetails.has(edp.departmentId)) {
                            departmentDetails.set(edp.departmentId, []);
                        }

                        departmentDetails.get(edp.departmentId)!.push({
                            department,
                            position,
                            rank,
                        });
                    }
                }
            }

            return departmentDetails;
        } catch (error) {
            console.error('직원 상세정보 조회 중 오류:', error);
            return undefined;
        }
    }

    private 모든_부서_ID를_수집한다(departments: Department[]): string[] {
        const departmentIds: string[] = [];

        const collectIds = (depts: Department[]) => {
            for (const dept of depts) {
                departmentIds.push(dept.id);
                if (dept.childDepartments && dept.childDepartments.length > 0) {
                    collectIds(dept.childDepartments);
                }
            }
        };

        collectIds(departments);
        return departmentIds;
    }
}

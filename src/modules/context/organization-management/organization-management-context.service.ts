import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainEmployeeRankHistoryService } from '../../domain/employee-rank-history/employee-rank-history.service';
import { DomainEmployeeValidationService } from '../../domain/employee/employee-validation.service';
import {
    Department,
    Employee,
    Position,
    Rank,
    EmployeeDepartmentPosition,
    EmployeeRankHistory,
} from '../../../../libs/database/entities';
import {
    DuplicateEmployeeNumberError,
    DuplicateEmailError,
    RankNotFoundError,
    DepartmentNotFoundError,
    PositionNotFoundError,
} from '../../domain/employee/employee.errors';
import { EmployeeStatus, Gender } from '../../../../libs/common/enums';

/**
 * 조직 관리 통합 컨텍스트 서비스
 * 모든 조직 관리 관련 비즈니스 로직을 통합하여 제공
 */
@Injectable()
export class OrganizationManagementContextService {
    constructor(
        private readonly 직원서비스: DomainEmployeeService,
        private readonly 부서서비스: DomainDepartmentService,
        private readonly 직책서비스: DomainPositionService,
        private readonly 직급서비스: DomainRankService,
        private readonly 직원부서직책서비스: DomainEmployeeDepartmentPositionService,
        private readonly 직원직급이력서비스: DomainEmployeeRankHistoryService,
        private readonly 직원검증서비스: DomainEmployeeValidationService,
    ) {}

    // ==================== 직원 조회 관련 ====================

    /**
     * 직원을 조회한다 (통합 함수)
     * ID 또는 사번으로 직원을 조회하고, 존재하지 않으면 에러를 발생시킨다.
     *
     * @param identifier 직원 ID (UUID) 또는 사번 (5자리)
     * @param throwOnNotFound 존재하지 않을 때 에러 발생 여부 (기본값: true)
     * @returns 직원 엔티티
     * @throws NotFoundException 직원을 찾을 수 없을 때
     */
    async 직원을_조회한다(identifier: string, throwOnNotFound = true): Promise<Employee | null> {
        try {
            // UUID 형식인지 확인 (직원 ID)
            const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

            if (isUUID) {
                return await this.직원서비스.findByEmployeeId(identifier);
            } else {
                return await this.직원서비스.findByEmployeeNumber(identifier);
            }
        } catch (error) {
            if (throwOnNotFound) {
                throw new Error(`직원을 찾을 수 없습니다: ${identifier}`);
            }
            return null;
        }
    }

    /**
     * 여러 직원을 조회한다 (통합 함수)
     * ID 배열 또는 사번 배열로 여러 직원을 조회한다.
     *
     * @param identifiers 직원 ID 배열 또는 사번 배열
     * @param includeTerminated 퇴사자 포함 여부 (기본값: false)
     * @returns 직원 엔티티 배열
     */
    async 여러_직원을_조회한다(identifiers: string[], includeTerminated = false): Promise<Employee[]> {
        if (identifiers.length === 0) {
            return [];
        }

        // 첫 번째 식별자로 ID인지 사번인지 판단
        const isFirstIdUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifiers[0]);

        if (isFirstIdUUID) {
            return await this.직원서비스.findByEmployeeIds(identifiers, includeTerminated);
        } else {
            return await this.직원서비스.findByEmployeeNumbers(identifiers, includeTerminated);
        }
    }

    // ==================== 기존 함수들 (하위 호환성 유지) ====================

    // ==================== 부서 조회 관련 ====================

    async 부서_ID로_부서를_조회한다(departmentId: string): Promise<Department> {
        return this.부서서비스.findById(departmentId);
    }

    // ==================== 직책 조회 관련 ====================

    async 모든_직책을_조회한다(): Promise<Position[]> {
        return this.직책서비스.findAllPositions();
    }

    async 직책_ID로_직책을_조회한다(positionId: string): Promise<Position> {
        return this.직책서비스.findById(positionId);
    }

    // ==================== 직급 조회 관련 ====================

    async 모든_직급을_조회한다(): Promise<Rank[]> {
        return this.직급서비스.findAllRanks();
    }

    async 직급_ID로_직급을_조회한다(rankId: string): Promise<Rank> {
        return this.직급서비스.findById(rankId);
    }

    // ==================== 직원 배치 조회 관련 ====================

    async 배치_ID로_배치정보를_조회한다(assignmentId: string): Promise<EmployeeDepartmentPosition> {
        return this.직원부서직책서비스.findById(assignmentId);
    }

    async 직원의_모든_배치정보를_조회한다(employeeId: string): Promise<EmployeeDepartmentPosition[]> {
        return this.직원부서직책서비스.findAllByEmployeeId(employeeId);
    }

    // ==================== 직급 이력 조회 관련 ====================

    async 직원의_직급이력을_조회한다(employeeId: string): Promise<EmployeeRankHistory[]> {
        return this.직원직급이력서비스.findByEmployeeId(employeeId);
    }

    // ==================== 직원 수정/삭제 관련 ====================

    async 직원정보를_수정한다(employeeId: string, 수정정보: any): Promise<Employee> {
        return this.직원서비스.updateEmployee(employeeId, 수정정보);
    }

    // ==================== 직원 번호 생성 관련 ====================

    async 연도별_다음직원번호를_조회한다(year: number): Promise<{
        nextEmployeeNumber: string;
        year: number;
        currentCount: number;
    }> {
        const yearSuffix = year.toString().slice(-2); // 연도의 마지막 두 자리

        // 해당 연도의 직원들을 조회
        const employees = await this.직원서비스.findByEmployeeNumberPattern(yearSuffix);

        // prefix로 시작하는 5자리 사번들 중에서 가장 큰 sequence 찾기
        const sequences = employees
            .map((employee) => employee.employeeNumber)
            .filter((employeeNumber) => employeeNumber.length === 5 && employeeNumber.startsWith(yearSuffix))
            .map((employeeNumber) => parseInt(employeeNumber.slice(2)))
            .filter((sequence) => !isNaN(sequence));

        const maxSequence = sequences.length > 0 ? Math.max(...sequences) : 0;
        const nextSequence = maxSequence + 1;
        const nextEmployeeNumber = `${yearSuffix}${nextSequence.toString().padStart(3, '0')}`;

        return {
            nextEmployeeNumber,
            year,
            currentCount: sequences.length,
        };
    }

    async 직원을_삭제한다(employeeId: string): Promise<void> {
        // 직원의 모든 배치 정보 삭제
        const assignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
        for (const assignment of assignments) {
            await this.직원부서직책서비스.deleteAssignment(assignment.id);
        }

        // 직원의 모든 직급 이력 삭제
        const rankHistories = await this.직원직급이력서비스.findByEmployeeId(employeeId);
        for (const history of rankHistories) {
            await this.직원직급이력서비스.deleteHistory(history.id);
        }

        // 직원 정보 삭제
        await this.직원서비스.deleteEmployee(employeeId);
    }

    async 직원의_부서_직책_직급을_조회한다(
        employee: Employee,
    ): Promise<{ department: Department; position: Position; rank: Rank }> {
        const 부서직책정보 = await this.직원부서직책서비스.findByEmployeeId(employee.id);
        const department = 부서직책정보?.departmentId
            ? await this.부서서비스.findById(부서직책정보.departmentId)
            : null;
        const position = 부서직책정보?.positionId ? await this.직책서비스.findById(부서직책정보.positionId) : null;
        const rank = employee.currentRankId ? await this.직급서비스.findById(employee.currentRankId) : null;
        return { department, position, rank };
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

    // ==================== 부서 조회 관련 ====================

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

    // ==================== 직원 생성/수정/삭제 관련 ====================

    /**
     * 직원 생성을 위한 전처리 (사번/이름 자동 생성)
     */
    async 직원생성_전처리를_수행한다(data: { employeeNumber?: string; name: string }): Promise<{
        employeeNumber: string;
        name: string;
    }> {
        const employeeNumber = data.employeeNumber || (await this.직원서비스.generateNextEmployeeNumber());
        const name = await this.직원서비스.generateUniqueEmployeeName(data.name);
        return {
            employeeNumber,
            name,
        };
    }

    /**
     * 직원 생성을 위한 컨텍스트 검증
     */
    async 직원생성_컨텍스트_검증을_수행한다(data: {
        employeeNumber: string;
        email?: string;
        currentRankId?: string;
        departmentId?: string;
        positionId?: string;
    }): Promise<void> {
        // 1단계: 도메인 불변식 및 정책 검증 (2-3단계)
        this.직원검증서비스.validateEmployeeCreation({
            employeeNumber: data.employeeNumber,
            email: data.email,
        });

        // 병렬로 모든 검증을 수행 (성능 최적화)
        const [isDuplicateEmployeeNumber, isDuplicateEmail, rankExists, departmentExists, positionExists] =
            await Promise.all([
                this.직원서비스.isEmployeeNumberDuplicate(data.employeeNumber),
                data.email ? this.직원서비스.isEmailDuplicate(data.email) : Promise.resolve(false),
                data.currentRankId ? this.직급서비스.exists(data.currentRankId) : Promise.resolve(true),
                data.departmentId ? this.부서서비스.exists(data.departmentId) : Promise.resolve(true),
                data.positionId ? this.직책서비스.exists(data.positionId) : Promise.resolve(true),
            ]);

        // 검증 결과에 따른 에러 처리
        if (isDuplicateEmployeeNumber) {
            throw new DuplicateEmployeeNumberError(data.employeeNumber);
        }

        if (isDuplicateEmail) {
            throw new DuplicateEmailError(data.email!);
        }

        if (data.currentRankId && !rankExists) {
            throw new RankNotFoundError(data.currentRankId!);
        }

        if (data.departmentId && !departmentExists) {
            throw new DepartmentNotFoundError(data.departmentId!);
        }

        if (data.positionId && !positionExists) {
            throw new PositionNotFoundError(data.positionId!);
        }
    }

    /**
     * 직원을 생성한다 (종합적인 컨텍스트 처리)
     * 검증 규칙 4단계에 따른 완전한 직원 생성 프로세스
     */
    async 직원을_생성한다(data: {
        employeeNumber?: string;
        name: string;
        email?: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        gender?: Gender;
        hireDate: Date;
        status?: EmployeeStatus;
        currentRankId?: string;
        departmentId?: string;
        positionId?: string;
        isManager?: boolean;
    }): Promise<{
        employee: Employee;
        assignment?: EmployeeDepartmentPosition;
        rankHistory?: EmployeeRankHistory;
    }> {
        // 1. 전처리 (사번/이름 자동 생성)
        const { employeeNumber, name } = await this.직원생성_전처리를_수행한다(data);

        // 2. 컨텍스트 검증 (중복, 존재 확인)
        await this.직원생성_컨텍스트_검증을_수행한다({
            employeeNumber,
            email: data.email,
            currentRankId: data.currentRankId,
            departmentId: data.departmentId,
            positionId: data.positionId,
        });

        // 3. 직원 생성
        const employee = await this.직원서비스.createEmployee({
            employeeNumber: employeeNumber,
            name: name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            hireDate: data.hireDate,
            status: data.status || EmployeeStatus.Active,
            currentRankId: data.currentRankId,
        });

        // 4. 배치 정보 완성도 확인 및 처리
        let assignment: EmployeeDepartmentPosition | undefined;
        const shouldCreateAssignment = data.departmentId && data.positionId;

        if (shouldCreateAssignment) {
            // 부서에 배치
            assignment = await this.직원을_부서에_배치한다({
                employeeId: employee.id,
                departmentId: data.departmentId!,
                positionId: data.positionId!,
                isManager: data.isManager,
            });
        }

        // 5. 직급 이력 생성 (직급 ID가 있는 경우)
        let rankHistory: EmployeeRankHistory | undefined;
        if (data.currentRankId) {
            rankHistory = await this.직원직급이력서비스.createHistory({
                employeeId: employee.id,
                rankId: data.currentRankId,
            });
        }

        return { employee, assignment, rankHistory };
    }

    /**
     * 직원 퇴사처리
     * 목적: 직원 상태를 퇴사로 변경한다.
     */
    async 직원을_퇴사처리한다(data: {
        employeeIdentifier: string; // 직원 ID 또는 사번
        terminationDate: Date;
        terminationReason?: string;
        processedBy?: string;
    }): Promise<{
        employee: Employee;
        message: string;
    }> {
        // 1. 직원 조회 (ID 또는 사번으로)
        const employee = await this.직원을_조회한다(data.employeeIdentifier);

        // 2. 퇴사처리 검증
        this.퇴사처리_검증을_수행한다(employee, data.terminationDate);

        // 3. 직원 상태를 퇴사로 변경
        const updatedEmployee = await this.직원서비스.updateEmployee(employee.id, {
            status: EmployeeStatus.Terminated,
            terminationDate: data.terminationDate,
            terminationReason: data.terminationReason,
            updatedAt: new Date(),
        });

        return {
            employee: updatedEmployee,
            message: `${employee.name}(${employee.employeeNumber}) 직원이 성공적으로 퇴사처리되었습니다.`,
        };
    }

    /**
     * 퇴사처리 검증
     */
    private 퇴사처리_검증을_수행한다(employee: Employee, terminationDate: Date): void {
        // 1. 이미 퇴사한 직원인지 확인
        if (employee.status === EmployeeStatus.Terminated) {
            throw new Error(`이미 퇴사처리된 직원입니다: ${employee.name}(${employee.employeeNumber})`);
        }

        // 2. 퇴사일이 입사일보다 늦은지 확인
        if (terminationDate <= employee.hireDate) {
            throw new Error(
                `퇴사일은 입사일보다 늦어야 합니다. 입사일: ${employee.hireDate.toISOString().split('T')[0]}`,
            );
        }
    }

    // ==================== 부서 생성/수정/삭제 관련 ====================

    /**
     * 부서 생성 (완전한 비즈니스 로직 사이클)
     * 검증 → 생성 → 반환
     */
    async 부서를_생성한다(부서정보: {
        departmentName: string;
        departmentCode: string;
        type: any;
        parentDepartmentId?: string;
        order?: number;
    }): Promise<Department> {
        // 1. 부서 코드 중복 확인
        const isDuplicate = await this.부서서비스.isCodeDuplicate(부서정보.departmentCode);
        if (isDuplicate) {
            throw new Error('이미 존재하는 부서 코드입니다.');
        }

        // 2. 상위 부서 존재 확인 (선택사항)
        if (부서정보.parentDepartmentId) {
            const parentExists = await this.부서서비스.exists(부서정보.parentDepartmentId);
            console.log('부서정보.parentDepartmentId', 부서정보.parentDepartmentId);
            console.log('parentExists', parentExists);
            if (!parentExists) {
                throw new Error('상위 부서를 찾을 수 없습니다.');
            }
        }

        // 3. 순서가 지정되지 않은 경우 자동으로 다음 순서 조회
        let order = 부서정보.order;
        if (order === undefined) {
            order = await this.부서서비스.getNextOrderForParent(부서정보.parentDepartmentId || null);
        }

        // 4. 부서 생성
        return await this.부서서비스.createDepartment({
            departmentName: 부서정보.departmentName,
            departmentCode: 부서정보.departmentCode,
            type: 부서정보.type,
            parentDepartmentId: 부서정보.parentDepartmentId,
            order,
        });
    }

    /**
     * 부서 수정 (완전한 비즈니스 로직 사이클)
     * 존재 확인 → 검증 → 수정 → 반환
     */
    async 부서를_수정한다(
        departmentId: string,
        수정정보: {
            departmentName?: string;
            departmentCode?: string;
            type?: any;
            parentDepartmentId?: string;
            order?: number;
        },
    ): Promise<Department> {
        // 1. 부서 존재 확인
        await this.부서서비스.findById(departmentId);

        // 2. 부서 코드 중복 확인 (자신 제외)
        if (수정정보.departmentCode) {
            const isDuplicate = await this.부서서비스.isCodeDuplicate(수정정보.departmentCode, departmentId);
            if (isDuplicate) {
                throw new Error('이미 존재하는 부서 코드입니다.');
            }
        }

        // 3. 상위 부서 존재 확인 (선택사항)
        if (수정정보.parentDepartmentId) {
            const parentExists = await this.부서서비스.exists(수정정보.parentDepartmentId);
            if (!parentExists) {
                throw new Error('상위 부서를 찾을 수 없습니다.');
            }
        }

        // 4. 부서 수정
        return await this.부서서비스.updateDepartment(departmentId, 수정정보);
    }

    /**
     * 부서 삭제 (완전한 비즈니스 로직 사이클)
     * 존재 확인 → 제약 조건 확인 → 삭제
     */
    async 부서를_삭제한다(departmentId: string): Promise<void> {
        // 1. 부서 존재 확인
        await this.부서서비스.findById(departmentId);

        // 2. 하위 부서가 있는지 확인
        const childDepartments = await this.부서서비스.findChildDepartments(departmentId);
        if (childDepartments.length > 0) {
            throw new Error('하위 부서가 존재하여 삭제할 수 없습니다.');
        }

        // 3. 해당 부서에 배치된 직원이 있는지 확인
        const assignedEmployees = await this.직원부서직책서비스.findByDepartmentId(departmentId);
        if (assignedEmployees.length > 0) {
            throw new Error('해당 부서에 배치된 직원이 있어 삭제할 수 없습니다.');
        }

        // 4. 부서 삭제
        await this.부서서비스.deleteDepartment(departmentId);
    }

    /**
     * 부서 순서 변경 (완전한 비즈니스 로직 사이클)
     * 존재 확인 → 순서 재배치 → 변경
     */
    async 부서순서를_변경한다(departmentId: string, newOrder: number): Promise<Department> {
        // 1. 부서 존재 확인 및 현재 순서 조회
        const department = await this.부서서비스.findById(departmentId);
        if (!department) {
            throw new Error('부서를 찾을 수 없습니다.');
        }

        const currentOrder = department.order;

        // 2. 순서가 같으면 변경할 필요 없음
        if (currentOrder === newOrder) {
            return department;
        }

        // 3. 같은 부모를 가진 부서들의 순서 재배치
        const parentDepartmentId = department.parentDepartmentId || null;

        // 현재 순서와 새로운 순서 사이에 있는 부서들을 조회
        const minOrder = Math.min(currentOrder, newOrder);
        const maxOrder = Math.max(currentOrder, newOrder);

        const affectedDepartments = await this.부서서비스.findDepartmentsInOrderRange(
            parentDepartmentId,
            minOrder,
            maxOrder,
        );

        // 4. 순서 업데이트 목록 생성
        const updates: { id: string; order: number }[] = [];

        if (currentOrder < newOrder) {
            // 아래로 이동: 현재 순서보다 크고 새로운 순서 이하인 부서들을 -1
            for (const dept of affectedDepartments) {
                if (dept.id === departmentId) {
                    // 현재 부서는 새로운 순서로
                    updates.push({ id: dept.id, order: newOrder });
                } else if (dept.order > currentOrder && dept.order <= newOrder) {
                    // 사이에 있는 부서들은 -1
                    updates.push({ id: dept.id, order: dept.order - 1 });
                }
            }
        } else {
            // 위로 이동: 새로운 순서 이상이고 현재 순서보다 작은 부서들을 +1
            for (const dept of affectedDepartments) {
                if (dept.id === departmentId) {
                    // 현재 부서는 새로운 순서로
                    updates.push({ id: dept.id, order: newOrder });
                } else if (dept.order >= newOrder && dept.order < currentOrder) {
                    // 사이에 있는 부서들은 +1
                    updates.push({ id: dept.id, order: dept.order + 1 });
                }
            }
        }

        // 5. 일괄 업데이트 실행
        await this.부서서비스.bulkUpdateOrders(updates);

        // 6. 업데이트된 부서 반환
        return await this.부서서비스.findById(departmentId);
    }

    // ==================== 직책 생성/수정/삭제 관련 ====================

    /**
     * 직책 생성 (완전한 비즈니스 로직 사이클)
     * 검증 → 생성 → 반환
     */
    async 직책을_생성한다(직책정보: {
        positionTitle: string;
        positionCode: string;
        level: number;
        hasManagementAuthority?: boolean;
    }): Promise<Position> {
        // 1. 직책 코드 중복 확인
        const isDuplicate = await this.직책서비스.isCodeDuplicate(직책정보.positionCode);
        if (isDuplicate) {
            throw new Error('이미 존재하는 직책 코드입니다.');
        }

        // 2. 직책 생성
        return await this.직책서비스.createPosition({
            positionTitle: 직책정보.positionTitle,
            positionCode: 직책정보.positionCode,
            level: 직책정보.level,
            hasManagementAuthority: 직책정보.hasManagementAuthority || false,
        });
    }

    /**
     * 직책 수정 (완전한 비즈니스 로직 사이클)
     * 존재 확인 → 검증 → 수정 → 반환
     */
    async 직책을_수정한다(
        positionId: string,
        수정정보: {
            positionTitle?: string;
            positionCode?: string;
            level?: number;
            hasManagementAuthority?: boolean;
        },
    ): Promise<Position> {
        // 1. 직책 존재 확인
        await this.직책서비스.findById(positionId);

        // 2. 직책 코드 중복 확인 (자신 제외)
        if (수정정보.positionCode) {
            const isDuplicate = await this.직책서비스.isCodeDuplicate(수정정보.positionCode, positionId);
            if (isDuplicate) {
                throw new Error('이미 존재하는 직책 코드입니다.');
            }
        }

        // 3. 직책 수정
        return await this.직책서비스.updatePosition(positionId, 수정정보);
    }

    /**
     * 직책 삭제 (완전한 비즈니스 로직 사이클)
     * 존재 확인 → 제약 조건 확인 → 삭제
     */
    async 직책을_삭제한다(positionId: string): Promise<void> {
        // 1. 직책 존재 확인
        await this.직책서비스.findById(positionId);

        // 2. 해당 직책에 배치된 직원이 있는지 확인
        const assignedEmployees = await this.직원부서직책서비스.findByPositionId(positionId);
        if (assignedEmployees.length > 0) {
            throw new Error('해당 직책에 배치된 직원이 있어 삭제할 수 없습니다.');
        }

        // 3. 직책 삭제
        await this.직책서비스.deletePosition(positionId);
    }

    // ==================== 직급 생성/수정/삭제 관련 ====================

    /**
     * 직급 생성 (완전한 비즈니스 로직 사이클)
     * 검증 → 생성 → 반환
     */
    async 직급을_생성한다(직급정보: { rankName: string; rankCode: string; level: number }): Promise<Rank> {
        // 1. 직급 코드 중복 확인
        const isDuplicate = await this.직급서비스.isCodeDuplicate(직급정보.rankCode);
        if (isDuplicate) {
            throw new Error('이미 존재하는 직급 코드입니다.');
        }

        // 2. 직급 생성
        return await this.직급서비스.createRank({
            rankName: 직급정보.rankName,
            rankCode: 직급정보.rankCode,
            level: 직급정보.level,
        });
    }

    /**
     * 직급 수정 (완전한 비즈니스 로직 사이클)
     * 존재 확인 → 검증 → 수정 → 반환
     */
    async 직급을_수정한다(
        rankId: string,
        수정정보: {
            rankName?: string;
            rankCode?: string;
            level?: number;
        },
    ): Promise<Rank> {
        // 1. 직급 존재 확인
        await this.직급서비스.findById(rankId);

        // 2. 직급 코드 중복 확인 (자신 제외)
        if (수정정보.rankCode) {
            const isDuplicate = await this.직급서비스.isCodeDuplicate(수정정보.rankCode, rankId);
            if (isDuplicate) {
                throw new Error('이미 존재하는 직급 코드입니다.');
            }
        }

        // 3. 직급 수정
        return await this.직급서비스.updateRank(rankId, 수정정보);
    }

    /**
     * 직급 삭제 (완전한 비즈니스 로직 사이클)
     * 존재 확인 → 제약 조건 확인 → 삭제
     */
    async 직급을_삭제한다(rankId: string): Promise<void> {
        // 1. 직급 존재 확인
        await this.직급서비스.findById(rankId);

        // 2. 해당 직급을 가진 직원이 있는지 확인
        const employeesWithRank = await this.직원서비스.findByRankId(rankId);
        if (employeesWithRank.length > 0) {
            throw new Error('해당 직급을 가진 직원이 있어 삭제할 수 없습니다.');
        }

        // 3. 해당 직급의 이력이 있는지 확인
        const rankHistories = await this.직원직급이력서비스.findByRankId(rankId);
        if (rankHistories.length > 0) {
            throw new Error('해당 직급의 이력이 있어 삭제할 수 없습니다.');
        }

        // 4. 직급 삭제
        await this.직급서비스.deleteRank(rankId);
    }

    // ==================== 직원 배치 관련 ====================

    async 직원을_부서에_배치한다(배치정보: {
        employeeId: string;
        departmentId: string;
        positionId: string;
        isManager?: boolean;
    }): Promise<EmployeeDepartmentPosition> {
        // 이미 해당 부서에 배치되어 있는지 확인
        try {
            const existingAssignment = await this.직원부서직책서비스.findByEmployeeAndDepartment(
                배치정보.employeeId,
                배치정보.departmentId,
            );
            // 배치가 존재하면 중복 에러 발생
            throw new Error('이미 해당 부서에 배치되어 있습니다.');
        } catch (error) {
            // NotFoundException인 경우 - 배치가 없으므로 정상적으로 진행
            if (error instanceof NotFoundException) {
                // 배치가 없으므로 새로 생성 가능
            } else {
                // 다른 시스템 에러는 그대로 전파
                throw error;
            }
        }

        return await this.직원부서직책서비스.createAssignment({
            employeeId: 배치정보.employeeId,
            departmentId: 배치정보.departmentId,
            positionId: 배치정보.positionId,
            isManager: 배치정보.isManager || false,
        });
    }

    async 직원배치정보를_수정한다(
        assignmentId: string,
        수정정보: {
            departmentId?: string;
            positionId?: string;
            isManager?: boolean;
        },
    ): Promise<EmployeeDepartmentPosition> {
        return await this.직원부서직책서비스.updateAssignment(assignmentId, 수정정보);
    }

    async 직원배치를_해제한다(assignmentId: string): Promise<void> {
        await this.직원부서직책서비스.deleteAssignment(assignmentId);
    }

    // ==================== 직급 이력 관련 ====================

    async 직원의_직급을_변경한다(
        employeeId: string,
        newRankId: string,
    ): Promise<{
        employee: Employee;
        rankHistory: EmployeeRankHistory;
    }> {
        // 직원의 현재 직급을 새로운 직급으로 업데이트
        const updatedEmployee = await this.직원서비스.updateEmployee(employeeId, {
            currentRankId: newRankId,
        });

        // 직급 변경 이력 생성
        const rankHistory = await this.직원직급이력서비스.createHistory({
            employeeId,
            rankId: newRankId,
        });

        return {
            employee: updatedEmployee,
            rankHistory,
        };
    }

    async 직급이력을_삭제한다(historyId: string): Promise<void> {
        await this.직원직급이력서비스.deleteHistory(historyId);
    }

    // ==================== 통계 및 분석 관련 ====================

    async 조직도_통계를_조회한다(): Promise<{
        총_부서수: number;
        총_직원수: number;
        활성_직원수: number;
        휴직_직원수: number;
        퇴사_직원수: number;
        직책별_통계: Array<{ 직책명: string; 인원수: number }>;
        직급별_통계: Array<{ 직급명: string; 인원수: number }>;
    }> {
        // 모든 데이터를 병렬로 조회
        const [departments, allEmployees, positions, ranks, assignments] = await Promise.all([
            this.부서서비스.findAllDepartmentsWithChildren(),
            this.직원서비스.findAllEmployees(true), // 퇴사자 포함
            this.직책서비스.findAllPositions(),
            this.직급서비스.findAllRanks(),
            this.직원부서직책서비스.findAllAssignments(),
        ]);

        // 직원 상태별 통계
        const 활성_직원수 = allEmployees.filter((emp) => emp.status === '재직중').length;
        const 휴직_직원수 = allEmployees.filter((emp) => emp.status === '휴직').length;
        const 퇴사_직원수 = allEmployees.filter((emp) => emp.status === '퇴사').length;

        // 직책별 통계
        const positionMap = new Map(positions.map((pos) => [pos.id, pos.positionTitle]));
        const positionStats = new Map<string, number>();

        for (const assignment of assignments) {
            const positionTitle = positionMap.get(assignment.positionId) || '알 수 없음';
            positionStats.set(positionTitle, (positionStats.get(positionTitle) || 0) + 1);
        }

        // 직급별 통계
        const rankMap = new Map(ranks.map((rank) => [rank.id, rank.rankName]));
        const rankStats = new Map<string, number>();

        for (const employee of allEmployees) {
            if (employee.currentRankId) {
                const rankName = rankMap.get(employee.currentRankId) || '알 수 없음';
                rankStats.set(rankName, (rankStats.get(rankName) || 0) + 1);
            }
        }

        return {
            총_부서수: this.모든_부서_개수를_계산한다(departments),
            총_직원수: allEmployees.length,
            활성_직원수,
            휴직_직원수,
            퇴사_직원수,
            직책별_통계: Array.from(positionStats.entries()).map(([직책명, 인원수]) => ({ 직책명, 인원수 })),
            직급별_통계: Array.from(rankStats.entries()).map(([직급명, 인원수]) => ({ 직급명, 인원수 })),
        };
    }

    private 모든_부서_개수를_계산한다(departments: Department[]): number {
        let count = departments.length;

        for (const dept of departments) {
            if (dept.childDepartments) {
                count += this.모든_부서_개수를_계산한다(dept.childDepartments);
            }
        }

        return count;
    }
}

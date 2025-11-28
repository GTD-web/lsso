import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainEmployeeRepository } from '../../domain/employee/employee.repository';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainDepartmentRepository } from '../../domain/department/department.repository';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainEmployeeRankHistoryService } from '../../domain/employee-rank-history/employee-rank-history.service';
import { DomainEmployeeValidationService } from '../../domain/employee/employee-validation.service';
import { DomainEmployeeTokenService } from '../../domain/employee-token/employee-token.service';
import { DomainEmployeeFcmTokenService } from '../../domain/employee-fcm-token/employee-fcm-token.service';
import { DomainEmployeeSystemRoleService } from '../../domain/employee-system-role/employee-system-role.service';
import {
    Department,
    Employee,
    Position,
    Rank,
    EmployeeDepartmentPosition,
    EmployeeRankHistory,
    EmployeeToken,
    EmployeeFcmToken,
    EmployeeSystemRole,
} from '../../../../libs/database/entities';
import {
    DuplicateEmployeeNumberError,
    DuplicateEmailError,
    RankNotFoundError,
    DepartmentNotFoundError,
    PositionNotFoundError,
} from '../../domain/employee/employee.errors';
import { EmployeeStatus, Gender } from '../../../../libs/common/enums';
import { DepartmentType } from '../../domain/department/department.entity';

/**
 * 조직 관리 통합 컨텍스트 서비스
 * 모든 조직 관리 관련 비즈니스 로직을 통합하여 제공
 */
@Injectable()
export class OrganizationManagementContextService {
    constructor(
        private readonly 직원서비스: DomainEmployeeService,
        private readonly 직원레포지토리: DomainEmployeeRepository,
        private readonly 부서서비스: DomainDepartmentService,
        private readonly 부서레포지토리: DomainDepartmentRepository,
        private readonly 직책서비스: DomainPositionService,
        private readonly 직급서비스: DomainRankService,
        private readonly 직원부서직책서비스: DomainEmployeeDepartmentPositionService,
        private readonly 직원직급이력서비스: DomainEmployeeRankHistoryService,
        private readonly 직원검증서비스: DomainEmployeeValidationService,
        private readonly 직원토큰서비스: DomainEmployeeTokenService,
        private readonly 직원FCM토큰서비스: DomainEmployeeFcmTokenService,
        private readonly 직원시스템역할서비스: DomainEmployeeSystemRoleService,
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

    async 부서_코드로_부서를_조회한다(departmentCode: string): Promise<Department> {
        return this.부서서비스.findByCode(departmentCode);
    }

    // ==================== 전체 데이터 조회 (마이그레이션용) ====================

    async 모든_부서를_조회한다(): Promise<Department[]> {
        const departments = await this.부서서비스.findAll();
        const terminatedDepartment = await this.부서서비스.findByCode('퇴사자');
        return [...departments, terminatedDepartment];
    }

    async 모든_직원을_조회한다(): Promise<Employee[]> {
        return this.직원서비스.findAll();
    }

    async 모든_직원부서직책매핑을_조회한다(): Promise<EmployeeDepartmentPosition[]> {
        return this.직원부서직책서비스.findAll();
    }

    /**
     * 전체 직원 정보를 상세하게 조회한다 (관리자용) - 최적화 버전
     * 부서, 직책, 직급, 토큰, FCM토큰, 시스템 역할 정보를 포함하여 조회
     * N+1 쿼리를 방지하기 위해 배치 조회 사용
     *
     * @param status 재직상태 (옵셔널)
     * @returns 직원 상세 정보 배열
     */
    async 전체_직원상세정보를_조회한다(status?: EmployeeStatus): Promise<any[]> {
        // 1. 직원 목록 조회 (재직상태 필터링)
        let employees: Employee[];
        if (status) {
            employees = await this.직원서비스.findByStatus(status);
        } else {
            employees = await this.직원서비스.findAll();
        }

        if (employees.length === 0) {
            return [];
        }

        const employeeIds = employees.map((emp) => emp.id);

        // 2. 모든 관련 데이터를 배치로 조회 (병렬 처리)
        const [allAssignments, allEmployeeTokens, allEmployeeFcmTokens, allEmployeeSystemRoles] = await Promise.all([
            this.직원부서직책서비스.findAllByEmployeeIds(employeeIds),
            this.직원토큰서비스.findByEmployeeIds(employeeIds),
            this.직원FCM토큰서비스.findByEmployeeIds(employeeIds),
            this.직원시스템역할서비스.findByEmployeeIds(employeeIds),
        ]);

        // 3. 필요한 부서, 직책, 직급 ID 수집
        const departmentIds = [...new Set(allAssignments.map((a) => a.departmentId))];
        const positionIds = [...new Set(allAssignments.map((a) => a.positionId))];
        const rankIds = [...new Set(employees.map((e) => e.currentRankId).filter((id) => id))];

        // 4. 부서, 직책, 직급 정보를 배치로 조회 (병렬 처리)
        const [departments, positions, ranks] = await Promise.all([
            departmentIds.length > 0 ? this.부서서비스.findByIds(departmentIds) : Promise.resolve([]),
            positionIds.length > 0 ? this.직책서비스.findByIds(positionIds) : Promise.resolve([]),
            rankIds.length > 0 ? this.직급서비스.findByIds(rankIds) : Promise.resolve([]),
        ]);

        // 5. Map으로 빠른 조회를 위한 인덱싱
        const departmentMap = new Map(departments.map((d) => [d.id, d]));
        const positionMap = new Map(positions.map((p) => [p.id, p]));
        const rankMap = new Map(ranks.map((r) => [r.id, r]));

        // 직원별 데이터를 그룹화
        const assignmentsByEmployee = new Map<string, typeof allAssignments>();
        const tokensByEmployee = new Map<string, typeof allEmployeeTokens>();
        const fcmTokensByEmployee = new Map<string, typeof allEmployeeFcmTokens>();
        const systemRolesByEmployee = new Map<string, typeof allEmployeeSystemRoles>();

        allAssignments.forEach((assignment) => {
            if (!assignmentsByEmployee.has(assignment.employeeId)) {
                assignmentsByEmployee.set(assignment.employeeId, []);
            }
            assignmentsByEmployee.get(assignment.employeeId)!.push(assignment);
        });

        allEmployeeTokens.forEach((token) => {
            if (!tokensByEmployee.has(token.employeeId)) {
                tokensByEmployee.set(token.employeeId, []);
            }
            tokensByEmployee.get(token.employeeId)!.push(token);
        });

        allEmployeeFcmTokens.forEach((fcmToken) => {
            if (!fcmTokensByEmployee.has(fcmToken.employeeId)) {
                fcmTokensByEmployee.set(fcmToken.employeeId, []);
            }
            fcmTokensByEmployee.get(fcmToken.employeeId)!.push(fcmToken);
        });

        allEmployeeSystemRoles.forEach((systemRole) => {
            if (!systemRolesByEmployee.has(systemRole.employeeId)) {
                systemRolesByEmployee.set(systemRole.employeeId, []);
            }
            systemRolesByEmployee.get(systemRole.employeeId)!.push(systemRole);
        });

        // 6. 직원별 상세 정보 조합 (메모리에서 처리)
        const employeesWithDetails = employees.map((employee) => {
            // 부서/직책 배치 정보
            const assignments = assignmentsByEmployee.get(employee.id) || [];
            const departmentsInfo = assignments.map((assignment) => {
                const department = departmentMap.get(assignment.departmentId);
                const position = positionMap.get(assignment.positionId);
                return {
                    assignmentId: assignment.id,
                    departmentId: department?.id || '',
                    departmentName: department?.departmentName || '',
                    departmentType: department?.type || '',
                    positionId: position?.id || '',
                    positionTitle: position?.positionTitle || '',
                    isManager: assignment.isManager,
                };
            });

            // 직급 정보
            let rankInfo = null;
            if (employee.currentRankId) {
                const rankEntity = rankMap.get(employee.currentRankId);
                if (rankEntity) {
                    rankInfo = {
                        rankId: rankEntity.id,
                        rankName: rankEntity.rankName,
                        rankCode: rankEntity.rankCode,
                        level: rankEntity.level,
                    };
                }
            }

            // 인증 토큰 정보
            const employeeTokensList = tokensByEmployee.get(employee.id) || [];
            const tokensInfo = employeeTokensList.map((et) => ({
                tokenId: et.tokenId,
                accessToken: et.token?.accessToken || '',
                tokenExpiresAt: et.token?.tokenExpiresAt || new Date(),
            }));

            // FCM 토큰 정보
            const employeeFcmTokensList = fcmTokensByEmployee.get(employee.id) || [];
            const fcmTokensInfo = employeeFcmTokensList.map((eft) => ({
                fcmTokenId: eft.fcmTokenId,
                fcmToken: eft.fcmToken?.fcmToken || '',
                deviceType: eft.fcmToken?.deviceType || '',
            }));

            // 시스템 역할 정보
            const employeeSystemRolesList = systemRolesByEmployee.get(employee.id) || [];
            const systemRolesInfo = employeeSystemRolesList.map((esr) => ({
                systemRoleId: esr.systemRoleId,
                systemId: esr.systemRole?.systemId || '',
                systemName: esr.systemRole?.system?.name || '',
                roleName: esr.systemRole?.roleName || '',
                roleCode: esr.systemRole?.roleCode || '',
            }));

            return {
                ...employee,
                departments: departmentsInfo,
                rank: rankInfo,
                tokens: tokensInfo,
                fcmTokens: fcmTokensInfo,
                systemRoles: systemRolesInfo,
            };
        });

        return employeesWithDetails;
    }

    // ==================== 직책 조회 관련 ====================

    async 모든_직책을_조회한다(): Promise<Position[]> {
        return this.직책서비스.findAllPositions();
    }

    async 직책_ID로_직책을_조회한다(positionId: string): Promise<Position> {
        return this.직책서비스.findById(positionId);
    }

    async 가장_낮은_직책을_조회한다(): Promise<Position> {
        const position = await this.직책서비스.findLowestPosition();
        if (!position) {
            throw new NotFoundException('직책을 찾을 수 없습니다.');
        }
        return position;
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

    async 전체_배치정보를_조회한다(): Promise<EmployeeDepartmentPosition[]> {
        return this.직원부서직책서비스.findAllAssignments();
    }

    async 전체_배치상세정보를_조회한다(): Promise<
        Array<{
            assignment: EmployeeDepartmentPosition;
            employee: Employee;
            department: Department;
            position: Position;
            rank?: Rank;
        }>
    > {
        // 1. 모든 배치 정보 조회
        const assignments = await this.직원부서직책서비스.findAllAssignments();

        // 2. 필요한 ID들 수집
        const employeeIds = [...new Set(assignments.map((a) => a.employeeId))];
        const departmentIds = [...new Set(assignments.map((a) => a.departmentId))];
        const positionIds = [...new Set(assignments.map((a) => a.positionId))];

        // 3. 병렬로 관련 정보들 조회
        const [employees, departments, positions] = await Promise.all([
            this.직원서비스.findByEmployeeIds(employeeIds, true), // 퇴사자 포함
            this.부서서비스.findByIds(departmentIds),
            this.직책서비스.findByIds(positionIds),
        ]);

        // 4. 직급 ID 수집 및 조회
        const rankIds = [...new Set(employees.filter((e) => e.currentRankId).map((e) => e.currentRankId))];
        const ranks = rankIds.length > 0 ? await this.직급서비스.findByIds(rankIds) : [];

        // 5. Map으로 변환하여 빠른 조회 가능하도록 최적화
        const employeeMap = new Map(employees.map((e) => [e.id, e]));
        const departmentMap = new Map(departments.map((d) => [d.id, d]));
        const positionMap = new Map(positions.map((p) => [p.id, p]));
        const rankMap = new Map(ranks.map((r) => [r.id, r]));

        // 6. 조인된 결과 생성
        return assignments.map((assignment) => {
            const employee = employeeMap.get(assignment.employeeId);
            const department = departmentMap.get(assignment.departmentId);
            const position = positionMap.get(assignment.positionId);
            const rank = employee?.currentRankId ? rankMap.get(employee.currentRankId) : undefined;

            return {
                assignment,
                employee,
                department,
                position,
                rank,
            };
        });
    }

    // ==================== 직급 이력 조회 관련 ====================

    async 직원의_직급이력을_조회한다(employeeId: string): Promise<EmployeeRankHistory[]> {
        return this.직원직급이력서비스.findByEmployeeId(employeeId);
    }

    // ==================== 직원 수정/삭제 관련 ====================

    async 직원정보를_수정한다(
        employeeId: string,
        수정정보: {
            employeeNumber?: string;
            name?: string;
            email?: string;
            phoneNumber?: string;
            dateOfBirth?: Date;
            gender?: Gender;
            hireDate?: Date;
            status?: EmployeeStatus;
            currentRankId?: string;
            terminationDate?: Date;
            departmentId?: string;
            positionId?: string;
            isManager?: boolean;
        },
    ): Promise<Employee> {
        // 1. Employee 엔티티의 기본 정보만 추출
        const employeeBasicInfo: Partial<Employee> = {
            employeeNumber: 수정정보.employeeNumber,
            name: 수정정보.name,
            email: 수정정보.email,
            phoneNumber: 수정정보.phoneNumber,
            dateOfBirth: 수정정보.dateOfBirth,
            gender: 수정정보.gender,
            hireDate: 수정정보.hireDate,
            status: 수정정보.status,
            currentRankId: 수정정보.currentRankId,
            terminationDate: 수정정보.terminationDate,
        };

        // undefined 값 제거
        Object.keys(employeeBasicInfo).forEach((key) => {
            if (employeeBasicInfo[key] === undefined) {
                delete employeeBasicInfo[key];
            }
        });

        // 2. 직원 기본 정보 수정
        const updatedEmployee = await this.직원서비스.updateEmployee(employeeId, employeeBasicInfo);

        // 3. 배치 정보 업데이트 (부서 또는 직책 정보가 제공된 경우)
        const hasDepartmentId = 수정정보.departmentId !== undefined;
        const hasPositionId = 수정정보.positionId !== undefined;

        if (hasDepartmentId || hasPositionId) {
            // 기존 배치 정보 조회
            const existingAssignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
            if (existingAssignments.length > 0) {
                // 각 배치의 부서 정보 조회하여 DEPARTMENT 타입 찾기
                const departmentAssignments = [];
                for (const assignment of existingAssignments) {
                    const department = await this.부서서비스.findById(assignment.departmentId);

                    if (department.type === DepartmentType.DEPARTMENT) {
                        departmentAssignments.push({ assignment, department });
                    }
                }

                if (departmentAssignments.length > 0) {
                    // DEPARTMENT 타입의 배치가 있는 경우 - 첫 번째를 업데이트
                    const { assignment: currentAssignment } = departmentAssignments[0];

                    const newDepartmentId = hasDepartmentId ? 수정정보.departmentId : currentAssignment.departmentId;
                    const newPositionId = hasPositionId ? 수정정보.positionId : currentAssignment.positionId;
                    const newIsManager =
                        수정정보.isManager !== undefined ? 수정정보.isManager : currentAssignment.isManager;

                    // 부서/직책 존재 검증
                    await this.부서서비스.findById(newDepartmentId);
                    await this.직책서비스.findById(newPositionId);

                    // 기존 배치 업데이트
                    await this.직원배치정보를_수정한다(currentAssignment.id, {
                        departmentId: newDepartmentId,
                        positionId: newPositionId,
                        isManager: newIsManager,
                    });
                } else if (hasDepartmentId && hasPositionId) {
                    // DEPARTMENT 타입의 배치가 없고 부서와 직책이 모두 제공된 경우 - 새로운 배치 생성
                    await this.부서서비스.findById(수정정보.departmentId);
                    await this.직책서비스.findById(수정정보.positionId);

                    await this.직원을_부서에_배치한다({
                        employeeId,
                        departmentId: 수정정보.departmentId,
                        positionId: 수정정보.positionId,
                        isManager: 수정정보.isManager,
                    });
                }
            } else if (hasDepartmentId && hasPositionId) {
                // 기존 배치가 없고 부서와 직책이 모두 제공된 경우 - 새로운 배치 생성
                await this.부서서비스.findById(수정정보.departmentId);
                await this.직책서비스.findById(수정정보.positionId);

                await this.직원을_부서에_배치한다({
                    employeeId,
                    departmentId: 수정정보.departmentId,
                    positionId: 수정정보.positionId,
                    isManager: 수정정보.isManager,
                });
            }
            // 기존 배치가 없는데 부서나 직책 중 하나만 제공된 경우는 무시
        }

        return updatedEmployee;
    }

    /**
     * 직원 재직상태를 변경한다 (트랜잭션 관리)
     * 퇴사상태로 변경하는 경우 퇴사자 부서로 배치하고 관련 정보를 정리한다
     */
    async 직원재직상태를_변경한다(
        employeeId: string,
        status: EmployeeStatus,
        terminationDate?: Date,
        terminationReason?: string,
    ): Promise<Employee> {
        // 퇴사상태로 변경하는 경우 퇴사처리 함수 호출
        if (status === EmployeeStatus.Terminated) {
            const result = await this.직원을_퇴사처리한다({
                employeeIdentifier: employeeId,
                terminationDate: terminationDate || new Date(),
                terminationReason,
            });
            return result.employee;
        }

        // 퇴사가 아닌 다른 상태로 변경하는 경우
        return await this.직원레포지토리.manager.transaction(async (transactionalEntityManager) => {
            // 1. 직원 존재 확인
            const employee = await transactionalEntityManager.findOne(Employee, {
                where: { id: employeeId },
            });

            if (!employee) {
                throw new NotFoundException('직원을 찾을 수 없습니다.');
            }

            // 2. 메타데이터에서 이전 부서, 직책, 관리자 여부 정보 확인 및 원복
            const metadata = employee.metadata || {};
            const previousDepartment = metadata?.termination?.previousDepartment;
            const previousPosition = metadata?.termination?.previousPosition;
            const previousIsManager = metadata?.termination?.previousIsManager ?? false;

            if (previousDepartment && previousDepartment.id) {
                // 이전 부서로 배치 원복
                const currentAssignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
                let departmentAssignment: EmployeeDepartmentPosition | null = null;

                // 현재 DEPARTMENT 타입 배치 찾기
                for (const assignment of currentAssignments) {
                    const department = await this.부서서비스.findById(assignment.departmentId);
                    if (department.type === DepartmentType.DEPARTMENT) {
                        departmentAssignment = assignment;
                        break;
                    }
                }

                // 이전 부서 존재 확인
                const previousDept = await this.부서서비스.findById(previousDepartment.id);
                if (!previousDept) {
                    throw new NotFoundException('이전 부서를 찾을 수 없습니다.');
                }

                // 이전 직책 확인 (없으면 기본 직책 사용)
                let positionToUse: Position | null = null;
                if (previousPosition && previousPosition.id) {
                    positionToUse = await this.직책서비스.findById(previousPosition.id);
                }

                if (!positionToUse) {
                    // 이전 직책이 없거나 찾을 수 없는 경우 기본 직책 조회
                    const defaultPosition = await this.직책서비스.findAll();
                    const firstPosition = defaultPosition.length > 0 ? defaultPosition[0] : null;

                    if (!firstPosition) {
                        throw new NotFoundException('기본 직책을 찾을 수 없습니다.');
                    }
                    positionToUse = firstPosition;
                }

                if (departmentAssignment) {
                    // 기존 DEPARTMENT 타입 배치 업데이트 (부서, 직책, 관리자 여부 모두 원복)
                    await transactionalEntityManager.update(
                        EmployeeDepartmentPosition,
                        { id: departmentAssignment.id },
                        {
                            departmentId: previousDepartment.id,
                            positionId: positionToUse.id,
                            isManager: previousIsManager,
                        },
                    );
                } else {
                    // 새로운 배치 생성 (부서, 직책, 관리자 여부 모두 원복)
                    await transactionalEntityManager.save(EmployeeDepartmentPosition, {
                        employeeId,
                        departmentId: previousDepartment.id,
                        positionId: positionToUse.id,
                        isManager: previousIsManager,
                    });
                }

                // 메타데이터에서 termination 정보 제거
                const updatedMetadata = { ...metadata };
                delete updatedMetadata.termination;

                // 상태 변경 및 퇴사 관련 필드 초기화, 메타데이터 업데이트
                const updateData: Partial<Employee> = {
                    status,
                    terminationDate: null,
                    terminationReason: null,
                    metadata: Object.keys(updatedMetadata).length > 0 ? updatedMetadata : null,
                };

                await transactionalEntityManager.update(Employee, { id: employeeId }, updateData);
            } else {
                // 메타데이터에 이전 부서 정보가 없는 경우
                const updateData: Partial<Employee> = {
                    status,
                    terminationDate: null,
                    terminationReason: null,
                };

                await transactionalEntityManager.update(Employee, { id: employeeId }, updateData);
            }

            // 3. 업데이트된 직원 정보 반환
            const updatedEmployee = await transactionalEntityManager.findOne(Employee, {
                where: { id: employeeId },
            });

            if (!updatedEmployee) {
                throw new NotFoundException('업데이트된 직원 정보를 찾을 수 없습니다.');
            }

            return updatedEmployee;
        });
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

    // ==================== 직원 일괄 수정 관련 ====================

    /**
     * 직원 부서 일괄 수정
     * DEPARTMENT 타입의 부서를 일괄 변경
     */
    async 직원_부서_일괄수정(
        employeeIds: string[],
        departmentId: string,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors: { employeeId: string; name?: string; message: string }[];
    }> {
        // 부서 존재 검증
        const department = await this.부서서비스.findById(departmentId);

        // DEPARTMENT 타입 검증
        if (department.type !== DepartmentType.DEPARTMENT) {
            throw new BadRequestException(`부서 타입이 DEPARTMENT가 아닙니다. 현재 타입: ${department.type}`);
        }

        const successIds: string[] = [];
        const failIds: string[] = [];
        const errors: { employeeId: string; name?: string; message: string }[] = [];

        for (const employeeId of employeeIds) {
            let employee: Employee | null = null;
            try {
                // 직원 존재 확인
                employee = await this.직원을_조회한다(employeeId);

                // 기존 DEPARTMENT 타입 배치 조회
                const existingAssignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
                let departmentAssignment = null;

                for (const assignment of existingAssignments) {
                    const department = await this.부서서비스.findById(assignment.departmentId);
                    if (department.type === DepartmentType.DEPARTMENT) {
                        departmentAssignment = assignment;
                        break;
                    }
                }

                if (departmentAssignment) {
                    // DEPARTMENT 타입 배치가 있으면 부서만 변경
                    await this.직원배치정보를_수정한다(departmentAssignment.id, {
                        departmentId: departmentId,
                        positionId: departmentAssignment.positionId,
                        isManager: departmentAssignment.isManager,
                    });
                } else {
                    // DEPARTMENT 타입 배치가 없으면 스킵
                    throw new Error('DEPARTMENT 타입의 기존 배치가 없습니다.');
                }

                successIds.push(employeeId);
            } catch (error) {
                failIds.push(employeeId);
                errors.push({
                    employeeId,
                    name: employee?.name,
                    message: error.message || '알 수 없는 오류',
                });
            }
        }

        return {
            successCount: successIds.length,
            failCount: failIds.length,
            successIds,
            failIds,
            errors,
        };
    }

    /**
     * 직원 팀 일괄 배치
     * TEAM 타입의 부서에 직원을 일괄 배치
     */
    async 직원_팀_일괄배치(
        employeeIds: string[],
        teamId: string,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors: { employeeId: string; name?: string; message: string }[];
    }> {
        // 팀 존재 및 타입 검증
        const team = await this.부서서비스.findById(teamId);

        // TEAM 타입 검증
        if (team.type !== DepartmentType.TEAM) {
            throw new BadRequestException(`부서 타입이 TEAM이 아닙니다. 현재 타입: ${team.type}`);
        }

        // 성능 최적화: 기본 직책을 한 번만 조회
        const allPositions = await this.직책서비스.findAllPositions();
        if (allPositions.length === 0) {
            throw new NotFoundException('시스템에 직책이 없습니다.');
        }
        const sortedPositions = [...allPositions].sort((a, b) => b.level - a.level);
        const defaultPositionId = sortedPositions[0].id;

        const successIds: string[] = [];
        const failIds: string[] = [];
        const errors: { employeeId: string; name?: string; message: string }[] = [];

        for (const employeeId of employeeIds) {
            let employee: Employee | null = null;
            try {
                // 직원 존재 확인
                employee = await this.직원을_조회한다(employeeId);

                // 기존 TEAM 타입 배치 조회
                const existingAssignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
                let teamAssignment = null;

                for (const assignment of existingAssignments) {
                    const department = await this.부서서비스.findById(assignment.departmentId);
                    if (department.type === DepartmentType.TEAM && department.id === teamId) {
                        teamAssignment = assignment;
                        break;
                    }
                }

                if (teamAssignment) {
                    // 동일한 TEAM에 이미 배치되어 있으면 스킵 (또는 업데이트)
                    // 기존 배치 유지하거나 필요시 업데이트 가능
                    successIds.push(employeeId);
                } else {
                    // 기본 직책을 사용하여 TEAM 배치 생성
                    await this.직원부서직책서비스.createAssignment({
                        employeeId: employee.id,
                        departmentId: teamId,
                        positionId: defaultPositionId,
                        isManager: false, // TEAM 배치는 기본적으로 관리자가 아님
                    });
                    successIds.push(employeeId);
                }
            } catch (error) {
                failIds.push(employeeId);
                errors.push({
                    employeeId,
                    name: employee?.name,
                    message: error.message || '알 수 없는 오류',
                });
            }
        }

        return {
            successCount: successIds.length,
            failCount: failIds.length,
            successIds,
            failIds,
            errors,
        };
    }

    /**
     * 직원 직책 일괄 수정
     * DEPARTMENT 타입의 직책을 일괄 변경
     */
    async 직원_직책_일괄수정(
        employeeIds: string[],
        positionId: string,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors: { employeeId: string; name?: string; message: string }[];
    }> {
        // 직책 존재 검증
        await this.직책서비스.findById(positionId);

        const successIds: string[] = [];
        const failIds: string[] = [];
        const errors: { employeeId: string; name?: string; message: string }[] = [];

        for (const employeeId of employeeIds) {
            let employee: Employee | null = null;
            try {
                // 직원 존재 확인
                employee = await this.직원을_조회한다(employeeId);

                // 기존 DEPARTMENT 타입 배치 조회
                const existingAssignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
                let departmentAssignment = null;

                for (const assignment of existingAssignments) {
                    const department = await this.부서서비스.findById(assignment.departmentId);
                    if (department.type === DepartmentType.DEPARTMENT) {
                        departmentAssignment = assignment;
                        break;
                    }
                }

                if (departmentAssignment) {
                    // DEPARTMENT 타입 배치가 있으면 직책만 변경
                    await this.직원배치정보를_수정한다(departmentAssignment.id, {
                        departmentId: departmentAssignment.departmentId,
                        positionId: positionId,
                        isManager: departmentAssignment.isManager,
                    });
                } else {
                    // DEPARTMENT 타입 배치가 없으면 스킵
                    throw new Error('DEPARTMENT 타입의 기존 배치가 없습니다.');
                }

                successIds.push(employeeId);
            } catch (error) {
                failIds.push(employeeId);
                errors.push({
                    employeeId,
                    name: employee?.name,
                    message: error.message || '알 수 없는 오류',
                });
            }
        }

        return {
            successCount: successIds.length,
            failCount: failIds.length,
            successIds,
            failIds,
            errors,
        };
    }

    /**
     * 직원 직급 일괄 수정
     */
    async 직원_직급_일괄수정(
        employeeIds: string[],
        rankId: string,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors: { employeeId: string; name?: string; message: string }[];
    }> {
        // 직급 존재 검증
        await this.직급서비스.findById(rankId);

        const successIds: string[] = [];
        const failIds: string[] = [];
        const errors: { employeeId: string; name?: string; message: string }[] = [];

        for (const employeeId of employeeIds) {
            let employee: Employee | null = null;
            try {
                // 직원 존재 확인
                employee = await this.직원을_조회한다(employeeId);

                // 직급 변경
                await this.직원의_직급을_변경한다(employeeId, rankId);

                successIds.push(employeeId);
            } catch (error) {
                failIds.push(employeeId);
                errors.push({
                    employeeId,
                    name: employee?.name,
                    message: error.message || '알 수 없는 오류',
                });
            }
        }

        return {
            successCount: successIds.length,
            failCount: failIds.length,
            successIds,
            failIds,
            errors,
        };
    }

    /**
     * 직원 재직상태 일괄 수정
     */
    async 직원_재직상태_일괄수정(
        employeeIds: string[],
        status: EmployeeStatus,
        terminationDate?: Date,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors: { employeeId: string; name?: string; message: string }[];
    }> {
        const successIds: string[] = [];
        const failIds: string[] = [];
        const errors: { employeeId: string; name?: string; message: string }[] = [];

        for (const employeeId of employeeIds) {
            let employee: Employee | null = null;
            try {
                // 직원 존재 확인
                employee = await this.직원을_조회한다(employeeId);

                // 재직상태 변경 (직원재직상태를_변경한다 함수 사용)
                await this.직원재직상태를_변경한다(employeeId, status, terminationDate);

                successIds.push(employeeId);
            } catch (error) {
                failIds.push(employeeId);
                errors.push({
                    employeeId,
                    name: employee?.name,
                    message: error.message || '알 수 없는 오류',
                });
            }
        }

        return {
            successCount: successIds.length,
            failCount: failIds.length,
            successIds,
            failIds,
            errors,
        };
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
        const departmentMap = new Map(
            departments.filter((dept) => dept.type === DepartmentType.DEPARTMENT).map((dept) => [dept.id, dept]),
        );
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
        console.log('departments', departments);
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
     * 직원 생성을 위한 전처리 (사번/이름/이메일 자동 생성)
     */
    async 직원생성_전처리를_수행한다(
        name: string,
        englishLastName?: string,
        englishFirstName?: string,
    ): Promise<{
        employeeNumber: string;
        name: string;
        email?: string;
    }> {
        const employeeNumber = await this.직원서비스.generateNextEmployeeNumber();
        const uniqueName = await this.직원서비스.generateUniqueEmployeeName(name);

        let email: string | undefined;
        if (englishLastName && englishFirstName) {
            email = await this.고유한_이메일을_생성한다(englishLastName, englishFirstName);
        }

        return {
            employeeNumber,
            name: uniqueName,
            email,
        };
    }

    /**
     * 고유한 이메일 주소 생성 (중복 검사 포함)
     */
    async 고유한_이메일을_생성한다(englishLastName: string, englishFirstName: string): Promise<string> {
        const baseEmail = `${englishLastName}.${englishFirstName}@lumir.space`;

        // 기본 이메일이 중복되지 않으면 반환
        const isDuplicate = await this.직원서비스.isEmailDuplicate(baseEmail);
        if (!isDuplicate) {
            return baseEmail;
        }

        // 중복이면 숫자를 붙여서 시도
        let counter = 1;
        let email = `${englishLastName}.${englishFirstName}${counter}@lumir.space`;

        while (await this.직원서비스.isEmailDuplicate(email)) {
            counter++;
            email = `${englishLastName}.${englishFirstName}${counter}@lumir.space`;
        }

        return email;
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
        englishLastName?: string;
        englishFirstName?: string;
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
        department?: Department;
        rank?: Rank;
    }> {
        // 1. 전처리 (사번/이름/이메일 자동 생성)
        // employeeNumber 자동생성은 우선 비사용으로 두고, 사용자가 입력한 사번을 우선 사용
        // 코드는 일단 유지하고, 나중에 사용할 수 있도록
        const {
            employeeNumber,
            name,
            email: generatedEmail,
        } = await this.직원생성_전처리를_수행한다(data.name, data.englishLastName, data.englishFirstName);

        // 전처리에서 생성된 이메일이 있으면 사용, 없으면 data.email 사용
        const email = generatedEmail || data.email;

        // 2. 컨텍스트 검증 (중복, 존재 확인)
        await this.직원생성_컨텍스트_검증을_수행한다({
            employeeNumber: data.employeeNumber,
            email: email,
            currentRankId: data.currentRankId,
            departmentId: data.departmentId,
            positionId: data.positionId,
        });

        // 3. 직원 생성
        const employee = await this.직원서비스.createEmployee({
            employeeNumber: data.employeeNumber,
            name: name,
            email: email,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            hireDate: data.hireDate,
            status: data.status || EmployeeStatus.Active,
            currentRankId: data.currentRankId,
        });

        // 4. 배치 정보 완성도 확인 및 처리
        const shouldCreateAssignment = data.departmentId && data.positionId;

        if (shouldCreateAssignment) {
            // 부서에 배치
            await this.직원을_부서에_배치한다({
                employeeId: employee.id,
                departmentId: data.departmentId!,
                positionId: data.positionId!,
                isManager: data.isManager,
            });
        }

        // 5. 직급 이력 생성 (직급 ID가 있는 경우)
        if (data.currentRankId) {
            await this.직원직급이력서비스.createHistory({
                employeeId: employee.id,
                rankId: data.currentRankId,
            });
        }

        // 6. 부서 및 직급 정보 조회
        let department: Department | undefined;
        let rank: Rank | undefined;

        if (data.departmentId) {
            department = await this.부서_ID로_부서를_조회한다(data.departmentId);
        }

        if (data.currentRankId) {
            rank = await this.직급_ID로_직급을_조회한다(data.currentRankId);
        }

        return { employee, department, rank };
    }

    /**
     * 직원 퇴사처리 (트랜잭션 관리)
     * 목적: 직원 상태를 퇴사로 변경하고 퇴사자 부서로 배치하며 관련 정보를 정리한다.
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
        // 트랜잭션으로 묶어서 실행
        return await this.직원레포지토리.manager.transaction(async (transactionalEntityManager) => {
            // 1. 직원 조회 (ID 또는 사번으로)
            const employee = await this.직원을_조회한다(data.employeeIdentifier);

            // 2. 퇴사처리 검증
            this.퇴사처리_검증을_수행한다(employee, data.terminationDate);

            const employeeId = employee.id;

            // 3-1. 퇴사자 부서 검색
            const terminatedDepartment = await this.부서서비스.findByCode('퇴사자');
            if (!terminatedDepartment) {
                throw new NotFoundException('퇴사자 부서를 찾을 수 없습니다.');
            }

            // 3-2. 현재 부서 정보 조회 (DEPARTMENT 타입만)
            const currentAssignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
            let currentDepartment: Department | null = null;
            let currentPosition: Position | null = null;
            let currentIsManager: boolean = false;
            let departmentAssignment: EmployeeDepartmentPosition | null = null;

            for (const assignment of currentAssignments) {
                const department = await this.부서서비스.findById(assignment.departmentId);
                if (department.type === DepartmentType.DEPARTMENT) {
                    currentDepartment = department;
                    departmentAssignment = assignment;
                    // 현재 직책 정보 조회
                    currentPosition = await this.직책서비스.findById(assignment.positionId);
                    currentIsManager = assignment.isManager;
                    break;
                }
            }

            // 3-3. 메타데이터에 부서, 직책, 관리자 여부 정보 저장 (JSON 형식)
            const metadata: Record<string, any> = {
                termination: {
                    previousDepartment: currentDepartment
                        ? {
                              id: currentDepartment.id,
                              name: currentDepartment.departmentName,
                              code: currentDepartment.departmentCode,
                          }
                        : null,
                    previousPosition: currentPosition
                        ? {
                              id: currentPosition.id,
                              title: currentPosition.positionTitle,
                              code: currentPosition.positionCode,
                          }
                        : null,
                    previousIsManager: currentIsManager,
                },
            };

            // 3-4. 직원 정보 업데이트 (status, terminationDate, terminationReason, metadata)
            await transactionalEntityManager.update(
                Employee,
                { id: employeeId },
                {
                    status: EmployeeStatus.Terminated,
                    terminationDate: data.terminationDate,
                    terminationReason: data.terminationReason,
                    metadata,
                },
            );

            // 3-5. 퇴사자 부서로 배치 (기존 직책 유지, 관리자 여부는 false로 설정)
            if (!currentPosition) {
                // 현재 직책이 없는 경우 기본 직책 조회
                const defaultPosition = await this.직책서비스.findAll();
                const firstPosition = defaultPosition.length > 0 ? defaultPosition[0] : null;

                if (!firstPosition) {
                    throw new NotFoundException('기본 직책을 찾을 수 없습니다.');
                }
                currentPosition = firstPosition;
            }

            if (departmentAssignment) {
                // 기존 DEPARTMENT 타입 배치 업데이트 (직책은 유지, 관리자 여부는 false)
                await transactionalEntityManager.update(
                    EmployeeDepartmentPosition,
                    { id: departmentAssignment.id },
                    {
                        departmentId: terminatedDepartment.id,
                        positionId: currentPosition.id,
                        isManager: false,
                    },
                );
            } else {
                // 새로운 배치 생성 (현재 직책 유지, 관리자 여부는 false)
                await transactionalEntityManager.save(EmployeeDepartmentPosition, {
                    employeeId,
                    departmentId: terminatedDepartment.id,
                    positionId: currentPosition.id,
                    isManager: false,
                });
            }

            // 3-6. token, fcmToken, systemRole 삭제 (트랜잭션 내에서 직접 삭제)
            await transactionalEntityManager.delete(EmployeeToken, { employeeId });
            await transactionalEntityManager.delete(EmployeeFcmToken, { employeeId });
            await transactionalEntityManager.delete(EmployeeSystemRole, { employeeId });

            // 4. 업데이트된 직원 정보 반환
            const updatedEmployee = await transactionalEntityManager.findOne(Employee, {
                where: { id: employeeId },
            });

            if (!updatedEmployee) {
                throw new NotFoundException('업데이트된 직원 정보를 찾을 수 없습니다.');
            }

            return {
                employee: updatedEmployee,
                message: `${employee.name}(${employee.employeeNumber}) 직원이 성공적으로 퇴사처리되었습니다.`,
            };
        });
    }

    /**
     * 퇴사처리 검증
     */
    private 퇴사처리_검증을_수행한다(employee: Employee, terminationDate: Date): void {
        // 1. 이미 퇴사한 직원인지 확인
        // if (employee.status === EmployeeStatus.Terminated) {
        //     throw new Error(`이미 퇴사처리된 직원입니다: ${employee.name}(${employee.employeeNumber})`);
        // }

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
            isActive?: boolean;
            // isException?: boolean;
            // order?: number;
        },
    ): Promise<Department> {
        // 1. 부서 존재 확인
        const department = await this.부서서비스.findById(departmentId);
        if (!department) {
            throw new NotFoundException('부서를 찾을 수 없습니다.');
        }

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

        // 4. 상위 부서가 변경되는 경우 순서 재배치 처리
        const oldParentDepartmentId = department.parentDepartmentId || null;
        const newParentDepartmentId =
            수정정보.parentDepartmentId !== undefined ? 수정정보.parentDepartmentId || null : oldParentDepartmentId;

        let newOrder: number | undefined = undefined;

        if (oldParentDepartmentId !== newParentDepartmentId) {
            const currentOrder = department.order;

            // 4-1. 먼저 이동하려는 부서를 새로운 상위 부서의 맨 뒤로 이동
            const nextOrder = await this.부서서비스.getNextOrderForParent(newParentDepartmentId);

            // 이동하려는 부서를 임시로 음수로 설정 (unique constraint 충돌 방지)
            await this.부서서비스.updateDepartment(departmentId, {
                parentDepartmentId: newParentDepartmentId,
                order: -999,
            });

            // 4-2. 원래 상위 부서의 하위 부서들 순서 재배치 (빈 자리 메꾸기)
            const oldSiblingDepartments =
                oldParentDepartmentId === null
                    ? await this.부서서비스.findRootDepartments()
                    : await this.부서서비스.findChildDepartments(oldParentDepartmentId);

            // 이동된 부서의 다음 순번부터 순서를 1씩 감소
            const orderUpdates: { id: string; order: number }[] = [];
            for (const sibling of oldSiblingDepartments) {
                if (sibling.id !== departmentId && sibling.order > currentOrder) {
                    orderUpdates.push({ id: sibling.id, order: sibling.order - 1 });
                }
            }

            if (orderUpdates.length > 0) {
                await this.부서서비스.bulkUpdateOrders(orderUpdates);
            }

            // 4-3. 이동한 부서를 최종 순번으로 설정
            newOrder = nextOrder;
        }

        // 5. 부서 수정
        const updateData = {
            ...수정정보,
            ...(newOrder !== undefined && { order: newOrder }),
        };
        return await this.부서서비스.updateDepartment(departmentId, updateData);
    }

    /**
     * 부서 삭제 (완전한 비즈니스 로직 사이클)
     * 존재 확인 → 제약 조건 확인 → 순서 조정 → 삭제
     */
    async 부서를_삭제한다(departmentId: string): Promise<void> {
        // 1. 부서 존재 확인 및 정보 조회
        const department = await this.부서서비스.findById(departmentId);
        if (!department) {
            throw new NotFoundException('부서를 찾을 수 없습니다.');
        }

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

        // 4. 순서 조정 및 부서 삭제 (트랜잭션으로 묶음)
        const parentDepartmentId = department.parentDepartmentId || null;
        const deletedOrder = department.order;

        await this.부서레포지토리.manager.transaction(async (transactionalEntityManager) => {
            // 4-1. 삭제할 부서의 순서를 먼저 임시 음수 값으로 변경 (unique constraint 충돌 회피)
            await transactionalEntityManager.update(Department, { id: departmentId }, { order: -999 });

            // 4-2. 삭제할 부서보다 큰 순서를 가진 같은 부모의 부서들 조회
            const queryBuilder = transactionalEntityManager
                .createQueryBuilder(Department, 'department')
                .where('department.id != :departmentId', { departmentId });

            if (parentDepartmentId === null) {
                queryBuilder.andWhere('department.parentDepartmentId IS NULL');
            } else {
                queryBuilder.andWhere('department.parentDepartmentId = :parentDepartmentId', {
                    parentDepartmentId,
                });
            }

            queryBuilder
                .andWhere('department.order > :deletedOrder', { deletedOrder })
                .orderBy('department.order', 'ASC');

            const departmentsToUpdate = await queryBuilder.getMany();

            // 4-3. 순서를 1씩 감소시켜 업데이트
            if (departmentsToUpdate.length > 0) {
                // unique constraint 충돌을 피하기 위해 임시 음수 값으로 먼저 변경
                const tempOffset = -1000000;
                for (let i = 0; i < departmentsToUpdate.length; i++) {
                    await transactionalEntityManager.update(
                        Department,
                        { id: departmentsToUpdate[i].id },
                        { order: tempOffset - i },
                    );
                }

                // 최종 순서로 업데이트
                for (const dept of departmentsToUpdate) {
                    await transactionalEntityManager.update(Department, { id: dept.id }, { order: dept.order - 1 });
                }
            }

            // 4-4. 부서 삭제
            await transactionalEntityManager.delete(Department, { id: departmentId });
        });
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

        // 2. 같은 부모를 가진 부서들의 개수 확인 및 순서 범위 검증
        const parentDepartmentId = department.parentDepartmentId || null;
        const departmentCount = await this.부서서비스.countByParentDepartmentId(parentDepartmentId);

        // 순서 범위 검증: 최소값은 0, 최대값은 개수
        // 예: 5개밖에 없는데 25번째로 설정하려고 하면 자동으로 5로 변경
        const minOrderValue = 0;
        const maxOrderValue = departmentCount - 1 > 0 ? departmentCount - 1 : 0;

        // 순서 범위 조정
        if (newOrder < minOrderValue) {
            newOrder = minOrderValue;
        } else if (newOrder > maxOrderValue) {
            newOrder = maxOrderValue;
        }

        // 3. 순서가 같으면 변경할 필요 없음
        if (currentOrder === newOrder) {
            return department;
        }

        // 4. 같은 부모를 가진 부서들의 순서 재배치
        // 현재 순서와 새로운 순서 사이에 있는 부서들을 조회
        const minOrderRange = Math.min(currentOrder, newOrder);
        const maxOrderRange = Math.max(currentOrder, newOrder);

        const affectedDepartments = await this.부서서비스.findDepartmentsInOrderRange(
            parentDepartmentId,
            minOrderRange,
            maxOrderRange,
        );

        // 5. 순서 업데이트 실행 (unique 제약 충돌 회피) - 트랜잭션으로 묶음
        await this.부서레포지토리.manager.transaction(async (transactionalEntityManager) => {
            // Step 1: 이동할 부서를 임시 음수 값으로 변경 (unique 제약 회피)
            await transactionalEntityManager.update(Department, { id: departmentId }, { order: -999 });

            // Step 2: 나머지 부서들의 순서 업데이트
            const updates: { id: string; order: number }[] = [];
            if (currentOrder < newOrder) {
                // 아래로 이동: 현재 순서보다 크고 새로운 순서 이하인 부서들을 -1
                console.log('affectedDepartments', affectedDepartments);
                for (const dept of affectedDepartments) {
                    if (dept.id !== departmentId && dept.order > currentOrder && dept.order <= newOrder) {
                        updates.push({ id: dept.id, order: dept.order - 1 });
                    }
                }
            } else {
                // 위로 이동: 새로운 순서 이상이고 현재 순서보다 작은 부서들을 +1
                for (const dept of affectedDepartments) {
                    if (dept.id !== departmentId && dept.order >= newOrder && dept.order < currentOrder) {
                        updates.push({ id: dept.id, order: dept.order + 1 });
                    }
                }
            }

            // Step 3: 나머지 부서들 일괄 업데이트
            if (updates.length > 0) {
                // bulkUpdateOrders 내부에서도 트랜잭션을 사용하므로, 여기서는 직접 업데이트
                const tempOffset = -1000000;
                for (let i = 0; i < updates.length; i++) {
                    await transactionalEntityManager.update(
                        Department,
                        { id: updates[i].id },
                        { order: tempOffset - i },
                    );
                }
                for (const update of updates) {
                    await transactionalEntityManager.update(Department, { id: update.id }, { order: update.order });
                }
            }

            // Step 4: 이동할 부서를 최종 순서로 변경
            await transactionalEntityManager.update(Department, { id: departmentId }, { order: newOrder });
        });

        // 7. 업데이트된 부서 반환
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

        // 2. level 검증
        // 2-1. 동일한 level이 있는지 확인
        const existingPosition = await this.직책서비스.findOneByLevel(직책정보.level);
        if (existingPosition) {
            throw new BadRequestException(`이미 존재하는 level입니다: ${직책정보.level}`);
        }

        // 2-2. 최대 level 값 조회
        const allPositions = await this.직책서비스.findAllPositions();
        const maxLevel = allPositions.length > 0 ? Math.max(...allPositions.map((p) => p.level)) : 0;

        // 2-3. 새로운 level이 maxLevel + 1인지 확인
        const expectedLevel = maxLevel + 1;
        if (직책정보.level !== expectedLevel) {
            throw new BadRequestException(`level은 ${expectedLevel}이어야 합니다. (현재 최대 level: ${maxLevel})`);
        }

        // 3. 직책 생성
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

        // 3. level 변경이 있는 경우 순서 재조정 로직 실행
        if (수정정보.level !== undefined) {
            await this.직책서비스.changeLevel(positionId, 수정정보.level);
            // level은 이미 변경되었으므로 제외
            const { level, ...restData } = 수정정보;
            if (Object.keys(restData).length > 0) {
                return await this.직책서비스.updatePosition(positionId, restData);
            } else {
                return await this.직책서비스.findById(positionId);
            }
        }

        // 4. level 변경이 없는 경우 일반 수정
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
            throw new BadRequestException('해당 직책에 배치된 직원이 있어 삭제할 수 없습니다.');
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
            throw new BadRequestException('해당 직급을 가진 직원이 있어 삭제할 수 없습니다.');
        }

        // 3. 해당 직급의 이력이 있는지 확인
        const rankHistories = await this.직원직급이력서비스.findByRankId(rankId);
        if (rankHistories.length > 0) {
            throw new BadRequestException('해당 직급의 이력이 있어 삭제할 수 없습니다.');
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

    async 직원배치_관리자상태를_변경한다(
        assignmentId: string,
        isManager: boolean,
    ): Promise<EmployeeDepartmentPosition> {
        // 배치 정보 존재 확인
        const assignment = await this.배치_ID로_배치정보를_조회한다(assignmentId);
        if (!assignment) {
            throw new Error('배치 정보를 찾을 수 없습니다.');
        }

        // 관리자 상태만 변경
        return await this.직원부서직책서비스.updateAssignment(assignmentId, { isManager });
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

    // ==================== 직원 관리자 라인 조회 ====================

    /**
     * 전체 직원의 부서 직속 라인 관리자 정보를 조회한다
     * 각 직원의 소속 부서부터 최상위 부서까지 올라가면서 isManager=true인 직원들을 찾는다
     *
     * @param includeTerminated 퇴사한 직원 포함 여부 (기본값: false)
     * @returns 직원별 관리자 라인 정보
     */
    async 전체_직원의_관리자_라인을_조회한다(includeTerminated = false): Promise<
        {
            employeeId: string;
            name: string;
            employeeNumber: string;
            departments: Array<{
                departmentId: string;
                departmentName: string;
                managerLine: Array<{
                    departmentId: string;
                    departmentName: string;
                    departmentCode: string;
                    type: any;
                    parentDepartmentId?: string;
                    depth: number;
                    managers: Array<{
                        employeeId: string;
                        name: string;
                        employeeNumber: string;
                        email?: string;
                        positionId: string;
                        positionTitle: string;
                    }>;
                }>;
            }>;
        }[]
    > {
        // 1. 전체 직원 조회
        const employees = await this.전체_직원정보를_조회한다(includeTerminated);

        if (employees.length === 0) {
            return [];
        }

        // 2. 성능 최적화: 필요한 모든 데이터를 배치로 조회
        const employeeIds = employees.map((emp) => emp.id);

        const [allAssignments, allDepartments, allPositions] = await Promise.all([
            // 직원-부서-직책 매핑 정보 (가장 최근 배치 정보 찾기 위해)
            this.직원부서직책서비스.findAllByEmployeeIds(employeeIds),
            // 모든 부서 정보
            this.부서서비스.findAllDepartments(),
            // 모든 직책 정보
            this.직책서비스.findAllPositions(),
        ]);

        // 3. 빠른 조회를 위한 Map 생성
        const departmentMap = new Map(allDepartments.map((dept) => [dept.id, dept]));
        const positionMap = new Map(allPositions.map((pos) => [pos.id, pos]));

        // 직원별 모든 배치 정보 그룹화
        const employeeAssignmentsMap = new Map<string, EmployeeDepartmentPosition[]>();
        for (const assignment of allAssignments) {
            const assignments = employeeAssignmentsMap.get(assignment.employeeId) || [];
            assignments.push(assignment);
            employeeAssignmentsMap.set(assignment.employeeId, assignments);
        }

        // 4. 부서별 관리자 조회 (isManager = true인 배치 정보)
        const managersByDepartmentMap = new Map<string, EmployeeDepartmentPosition[]>();
        for (const assignment of allAssignments) {
            if (assignment.isManager) {
                const managers = managersByDepartmentMap.get(assignment.departmentId) || [];
                managers.push(assignment);
                managersByDepartmentMap.set(assignment.departmentId, managers);
            }
        }

        // 5. 각 직원에 대해 모든 부서의 관리자 라인 구성
        const result: Array<{
            employeeId: string;
            name: string;
            employeeNumber: string;
            departments: Array<{
                departmentId: string;
                departmentName: string;
                managerLine: Array<{
                    departmentId: string;
                    departmentName: string;
                    departmentCode: string;
                    type: any;
                    parentDepartmentId?: string;
                    depth: number;
                    managers: Array<{
                        employeeId: string;
                        name: string;
                        employeeNumber: string;
                        email?: string;
                        positionId: string;
                        positionTitle: string;
                    }>;
                }>;
            }>;
        }> = [];

        for (const employee of employees) {
            const employeeAssignments = employeeAssignmentsMap.get(employee.id);

            // 직원이 배치되어 있지 않은 경우 스킵
            if (!employeeAssignments || employeeAssignments.length === 0) {
                continue;
            }

            // 직원의 모든 부서에 대해 관리자 라인 구성
            const departments: Array<{
                departmentId: string;
                departmentName: string;
                managerLine: Array<{
                    departmentId: string;
                    departmentName: string;
                    departmentCode: string;
                    type: any;
                    parentDepartmentId?: string;
                    depth: number;
                    managers: Array<{
                        employeeId: string;
                        name: string;
                        employeeNumber: string;
                        email?: string;
                        positionId: string;
                        positionTitle: string;
                    }>;
                }>;
            }> = [];

            // 각 배치된 부서에 대해 관리자 라인 구성
            for (const assignment of employeeAssignments) {
                const currentDepartmentId = assignment.departmentId;
                const currentDepartment = departmentMap.get(currentDepartmentId);

                // 부서 정보가 없는 경우 스킵
                if (!currentDepartment) {
                    continue;
                }

                // 부서 계층을 올라가면서 관리자 찾기
                const managerLine: Array<{
                    departmentId: string;
                    departmentName: string;
                    departmentCode: string;
                    type: any;
                    parentDepartmentId?: string;
                    depth: number;
                    managers: Array<{
                        employeeId: string;
                        name: string;
                        employeeNumber: string;
                        email?: string;
                        positionId: string;
                        positionTitle: string;
                    }>;
                }> = [];

                let currentDeptId: string | undefined = currentDepartmentId;
                let depth = 0;

                // 최상위 부서까지 반복
                while (currentDeptId) {
                    const dept = departmentMap.get(currentDeptId);
                    if (!dept) {
                        break;
                    }

                    // 해당 부서의 관리자들 조회
                    const managerAssignments = managersByDepartmentMap.get(currentDeptId) || [];
                    const managers = managerAssignments
                        .map((managerAssignment) => {
                            const managerEmployee = employees.find((emp) => emp.id === managerAssignment.employeeId);
                            if (!managerEmployee) {
                                return null;
                            }

                            const position = positionMap.get(managerAssignment.positionId);
                            if (!position) {
                                return null;
                            }

                            return {
                                employeeId: managerEmployee.id,
                                name: managerEmployee.name,
                                employeeNumber: managerEmployee.employeeNumber,
                                email: managerEmployee.email,
                                positionId: position.id,
                                positionTitle: position.positionTitle,
                            };
                        })
                        .filter((m): m is NonNullable<typeof m> => m !== null);

                    // 관리자 라인에 추가
                    managerLine.push({
                        departmentId: dept.id,
                        departmentName: dept.departmentName,
                        departmentCode: dept.departmentCode,
                        type: dept.type,
                        parentDepartmentId: dept.parentDepartmentId,
                        depth,
                        managers,
                    });

                    // 상위 부서로 이동
                    currentDeptId = dept.parentDepartmentId;
                    depth++;
                }

                departments.push({
                    departmentId: currentDepartment.id,
                    departmentName: currentDepartment.departmentName,
                    managerLine,
                });
            }

            result.push({
                employeeId: employee.id,
                name: employee.name,
                employeeNumber: employee.employeeNumber,
                departments,
            });
        }

        return result;
    }
}

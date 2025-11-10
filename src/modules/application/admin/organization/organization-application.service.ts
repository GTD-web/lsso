import { Injectable } from '@nestjs/common';
import {
    CreateDepartmentRequestDto,
    UpdateDepartmentRequestDto,
    DepartmentResponseDto,
    DepartmentListResponseDto,
    UpdateDepartmentOrderRequestDto,
    UpdateDepartmentParentRequestDto,
    DepartmentHierarchyResponseDto,
    DepartmentWithEmployeesDto,
    DepartmentEmployeeInfoDto,
    CreateEmployeeRequestDto,
    UpdateEmployeeRequestDto,
    AdminEmployeeResponseDto,
    EmployeeListResponseDto,
    NextEmployeeNumberResponseDto,
    EmployeeDetailInfoDto,
    EmployeeDetailListResponseDto,
    CreatePositionRequestDto,
    UpdatePositionRequestDto,
    PositionResponseDto,
    CreateRankRequestDto,
    UpdateRankRequestDto,
    RankResponseDto,
    AssignEmployeeRequestDto,
    UpdateEmployeeAssignmentRequestDto,
    UpdateManagerStatusRequestDto,
    EmployeeAssignmentResponseDto,
    EmployeeAssignmentListResponseDto,
    EmployeeAssignmentDetailResponseDto,
    PromoteEmployeeRequestDto,
    EmployeeRankHistoryResponseDto,
    EmployeeAssignmentDetailDto,
} from './dto';
import { OrganizationManagementContextService } from 'src/modules/context/organization-management/organization-management-context.service';
import { Department, DepartmentType } from 'src/modules/domain/department/department.entity';
import { Employee } from 'src/modules/domain/employee/employee.entity';
import { Position } from 'src/modules/domain/position/position.entity';
import { Rank } from 'src/modules/domain/rank/rank.entity';
import { EmployeeStatus } from 'libs/common/enums';

@Injectable()
export class OrganizationApplicationService {
    constructor(private readonly organizationContextService: OrganizationManagementContextService) {}

    // 부서 계층구조별 직원 정보 조회
    async 부서_계층구조별_직원정보를_조회한다(): Promise<DepartmentHierarchyResponseDto> {
        const result = await this.organizationContextService.부서_계층구조별_직원정보를_조회한다(
            undefined, // rootDepartmentId
            undefined, // maxDepth
            true, // withEmployeeDetail
            true, // includeTerminated
            true, // includeEmptyDepartments
        );
        console.log(result);
        const departments = this.부서_계층구조를_직원정보와_함께_변환한다(
            result.departments,
            result.employeesByDepartment,
            result.departmentDetails,
        );

        return { departments: departments.filter((department) => department.parentDepartmentId === null) };
    }

    // 퇴사자 부서와 퇴사자 목록 조회
    async 퇴사자부서_직원목록을_조회한다(): Promise<DepartmentHierarchyResponseDto> {
        // 퇴사자 부서 찾기
        const terminatedDepartment = await this.organizationContextService.부서_코드로_부서를_조회한다('퇴사자');
        if (!terminatedDepartment) {
            return { departments: [] };
        }

        // 퇴사자 부서를 기준으로 계층구조 조회 (퇴사자만 포함)
        const result = await this.organizationContextService.부서_계층구조별_직원정보를_조회한다(
            terminatedDepartment.id, // rootDepartmentId
            undefined, // maxDepth
            true, // withEmployeeDetail
            true, // includeTerminated (퇴사자만 조회)
            true, // includeEmptyDepartments
        );

        const departments = this.부서_계층구조를_직원정보와_함께_변환한다(
            result.departments,
            result.employeesByDepartment,
            result.departmentDetails,
        );

        return { departments };
    }

    // 부서 관리 함수들
    async 부서목록조회(): Promise<DepartmentListResponseDto> {
        const departments = await this.organizationContextService.부서_계층구조를_조회한다();
        return {
            departments: departments.map(this.부서를_응답DTO로_변환한다),
        };
    }

    async 부서상세조회(id: string): Promise<DepartmentResponseDto> {
        const department = await this.organizationContextService.부서_ID로_부서를_조회한다(id);
        return this.부서를_응답DTO로_변환한다(department);
    }

    async 부서생성(createDepartmentDto: CreateDepartmentRequestDto): Promise<DepartmentResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (검증 → 생성 → 반환)
        const newDepartment = await this.organizationContextService.부서를_생성한다({
            departmentName: createDepartmentDto.departmentName,
            departmentCode: createDepartmentDto.departmentCode,
            type: createDepartmentDto.type,
            parentDepartmentId: createDepartmentDto.parentDepartmentId,
            order: createDepartmentDto.order,
        });

        return this.부서를_응답DTO로_변환한다(newDepartment);
    }

    async 부서수정(id: string, updateDepartmentDto: UpdateDepartmentRequestDto): Promise<DepartmentResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 검증 → 수정 → 반환)
        const updatedDepartment = await this.organizationContextService.부서를_수정한다(id, updateDepartmentDto);
        return this.부서를_응답DTO로_변환한다(updatedDepartment);
    }

    async 부서삭제(id: string): Promise<void> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 제약 조건 확인 → 삭제)
        await this.organizationContextService.부서를_삭제한다(id);
    }

    async 부서순서변경(id: string, updateOrderDto: UpdateDepartmentOrderRequestDto): Promise<DepartmentResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 순서 재배치 → 변경)
        const updatedDepartment = await this.organizationContextService.부서순서를_변경한다(
            id,
            updateOrderDto.newOrder,
        );
        return this.부서를_응답DTO로_변환한다(updatedDepartment);
    }

    async 부서상위부서변경(
        id: string,
        updateParentDto: UpdateDepartmentParentRequestDto,
    ): Promise<DepartmentResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 상위 부서 확인 → 변경)
        const updatedDepartment = await this.organizationContextService.부서를_수정한다(id, {
            parentDepartmentId: updateParentDto.newParentDepartmentId,
        });
        return this.부서를_응답DTO로_변환한다(updatedDepartment);
    }

    // 직원 관리 함수들
    async 직원목록조회(): Promise<EmployeeListResponseDto> {
        const employees = await this.organizationContextService.전체_직원정보를_조회한다();
        return {
            employees: employees.map(this.직원을_응답DTO로_변환한다),
        };
    }

    async 직원상세목록조회(status?: EmployeeStatus): Promise<EmployeeDetailListResponseDto> {
        const employeesWithDetails = await this.organizationContextService.전체_직원상세정보를_조회한다(status);
        return {
            employees: employeesWithDetails.map(this.직원상세정보를_응답DTO로_변환한다),
        };
    }

    async 다음직원번호조회(year: number): Promise<NextEmployeeNumberResponseDto> {
        return await this.organizationContextService.연도별_다음직원번호를_조회한다(year);
    }

    async 직원상세조회(id: string): Promise<AdminEmployeeResponseDto> {
        const employee = await this.organizationContextService.직원을_조회한다(id);
        const baseDto = this.직원을_응답DTO로_변환한다(employee);

        // 배치 정보 조회 및 매핑
        const assignments = await this.organizationContextService.직원의_모든_배치정보를_조회한다(id);

        if (assignments.length > 0) {
            // 성능 최적화: 부서와 직책 정보를 배치로 조회
            const departmentIds = [...new Set(assignments.map((a) => a.departmentId))];
            const positionIds = [...new Set(assignments.map((a) => a.positionId))];

            const [departments, positions] = await Promise.all([
                Promise.all(
                    departmentIds.map((deptId) => this.organizationContextService.부서_ID로_부서를_조회한다(deptId)),
                ),
                Promise.all(
                    positionIds.map((posId) => this.organizationContextService.직책_ID로_직책을_조회한다(posId)),
                ),
            ]);

            const departmentMap = new Map(departments.map((dept) => [dept.id, dept]));
            const positionMap = new Map(positions.map((pos) => [pos.id, pos]));

            // 배치 정보를 DEPARTMENT와 TEAM으로 분류
            const departmentAssignment = assignments.find((assignment) => {
                const dept = departmentMap.get(assignment.departmentId);
                return dept?.type === DepartmentType.DEPARTMENT;
            });

            const teamAssignments = assignments.filter((assignment) => {
                const dept = departmentMap.get(assignment.departmentId);
                return dept?.type === DepartmentType.TEAM;
            });

            // DEPARTMENT 배치 정보 매핑
            if (departmentAssignment) {
                const dept = departmentMap.get(departmentAssignment.departmentId);
                const pos = positionMap.get(departmentAssignment.positionId);
                if (dept && pos) {
                    baseDto.department = {
                        id: departmentAssignment.id,
                        departmentId: dept.id,
                        departmentName: dept.departmentName,
                        departmentCode: dept.departmentCode,
                        departmentType: dept.type,
                        positionId: pos.id,
                        positionTitle: pos.positionTitle,
                        positionCode: pos.positionCode,
                        isManager: departmentAssignment.isManager,
                        createdAt: departmentAssignment.createdAt,
                        updatedAt: departmentAssignment.updatedAt,
                    };
                }
            }

            // TEAM 배치 정보 매핑
            if (teamAssignments.length > 0) {
                baseDto.teams = teamAssignments
                    .map((assignment) => {
                        const dept = departmentMap.get(assignment.departmentId);
                        const pos = positionMap.get(assignment.positionId);
                        if (dept && pos) {
                            return {
                                id: assignment.id,
                                departmentId: dept.id,
                                departmentName: dept.departmentName,
                                departmentCode: dept.departmentCode,
                                departmentType: dept.type,
                                positionId: pos.id,
                                positionTitle: pos.positionTitle,
                                positionCode: pos.positionCode,
                                isManager: assignment.isManager,
                                createdAt: assignment.createdAt,
                                updatedAt: assignment.updatedAt,
                            };
                        }
                        return null;
                    })
                    .filter((team) => team !== null) as EmployeeAssignmentDetailDto[];
            }
        }

        return baseDto;
    }

    async 직원생성(createEmployeeDto: CreateEmployeeRequestDto): Promise<AdminEmployeeResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (전처리 → 검증 → 생성 → 반환)
        const result = await this.organizationContextService.직원을_생성한다({
            // employeeNumber: createEmployeeDto.employeeNumber,
            name: createEmployeeDto.name,
            email: createEmployeeDto.email,
            phoneNumber: createEmployeeDto.phoneNumber,
            dateOfBirth: createEmployeeDto.dateOfBirth ? new Date(createEmployeeDto.dateOfBirth) : undefined,
            gender: createEmployeeDto.gender,
            hireDate: new Date(createEmployeeDto.hireDate),
            currentRankId: createEmployeeDto.currentRankId,
            departmentId: createEmployeeDto.departmentId,
            positionId: createEmployeeDto.positionId,
            isManager: createEmployeeDto.isManager,
        });

        return this.직원을_응답DTO로_변환한다(result.employee);
    }

    async 직원수정(id: string, updateEmployeeDto: UpdateEmployeeRequestDto): Promise<AdminEmployeeResponseDto> {
        let employee: Employee;
        // status 외 다른 정보가 있는지 확인
        const hasOtherUpdates =
            updateEmployeeDto.name !== undefined ||
            updateEmployeeDto.email !== undefined ||
            updateEmployeeDto.phoneNumber !== undefined ||
            updateEmployeeDto.dateOfBirth !== undefined ||
            updateEmployeeDto.gender !== undefined ||
            updateEmployeeDto.hireDate !== undefined ||
            updateEmployeeDto.currentRankId !== undefined ||
            updateEmployeeDto.departmentId !== undefined ||
            updateEmployeeDto.positionId !== undefined ||
            updateEmployeeDto.isManager !== undefined;

        // 1. 먼저 다른 정보(부서 등)를 수정 (부서 정보 변경이 재직상태 변경보다 먼저 와야 함)
        if (hasOtherUpdates) {
            employee = await this.organizationContextService.직원정보를_수정한다(id, {
                name: updateEmployeeDto.name,
                email: updateEmployeeDto.email,
                phoneNumber: updateEmployeeDto.phoneNumber,
                dateOfBirth: updateEmployeeDto.dateOfBirth ? new Date(updateEmployeeDto.dateOfBirth) : undefined,
                gender: updateEmployeeDto.gender,
                hireDate: updateEmployeeDto.hireDate ? new Date(updateEmployeeDto.hireDate) : undefined,
                currentRankId: updateEmployeeDto.currentRankId,
                departmentId: updateEmployeeDto.departmentId,
                positionId: updateEmployeeDto.positionId,
                isManager: updateEmployeeDto.isManager,
            });
        }

        // 2. 재직상태 변경 (부서 정보 변경 후 실행하여 퇴사자 부서로 이동이 정상 작동)
        if (updateEmployeeDto.status !== undefined) {
            employee = await this.organizationContextService.직원재직상태를_변경한다(
                id,
                updateEmployeeDto.status,
                updateEmployeeDto.terminationDate ? new Date(updateEmployeeDto.terminationDate) : undefined,
            );
        }

        if (!employee) {
            employee = await this.organizationContextService.직원을_조회한다(id);
        }
        return this.직원을_응답DTO로_변환한다(employee);
    }

    async 직원삭제(id: string): Promise<void> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 제약 조건 확인 → 삭제)
        await this.organizationContextService.직원을_삭제한다(id);
    }

    // 직책 관리 함수들
    async 직책목록조회(): Promise<PositionResponseDto[]> {
        const positions = await this.organizationContextService.모든_직책을_조회한다();
        return positions.map(this.직책을_응답DTO로_변환한다);
    }

    async 직책생성(createPositionDto: CreatePositionRequestDto): Promise<PositionResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (검증 → 생성 → 반환)
        const newPosition = await this.organizationContextService.직책을_생성한다(createPositionDto);
        return this.직책을_응답DTO로_변환한다(newPosition);
    }

    async 직책수정(id: string, updatePositionDto: UpdatePositionRequestDto): Promise<PositionResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 검증 → 수정 → 반환)
        const updatedPosition = await this.organizationContextService.직책을_수정한다(id, updatePositionDto);
        return this.직책을_응답DTO로_변환한다(updatedPosition);
    }

    async 직책삭제(id: string): Promise<void> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 제약 조건 확인 → 삭제)
        await this.organizationContextService.직책을_삭제한다(id);
    }

    // 직급 관리 함수들
    async 직급목록조회(): Promise<RankResponseDto[]> {
        const ranks = await this.organizationContextService.모든_직급을_조회한다();
        return ranks.map(this.직급을_응답DTO로_변환한다);
    }

    async 직급생성(createRankDto: CreateRankRequestDto): Promise<RankResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (검증 → 생성 → 반환)
        const newRank = await this.organizationContextService.직급을_생성한다(createRankDto);
        return this.직급을_응답DTO로_변환한다(newRank);
    }

    async 직급수정(id: string, updateRankDto: UpdateRankRequestDto): Promise<RankResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 검증 → 수정 → 반환)
        const updatedRank = await this.organizationContextService.직급을_수정한다(id, updateRankDto);
        return this.직급을_응답DTO로_변환한다(updatedRank);
    }

    async 직급삭제(id: string): Promise<void> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 제약 조건 확인 → 삭제)
        await this.organizationContextService.직급을_삭제한다(id);
    }

    // 직원 배치 관리 함수들
    async 직원배치(assignEmployeeDto: AssignEmployeeRequestDto): Promise<EmployeeAssignmentResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 검증 → 배치 → 반환)
        const assignment = await this.organizationContextService.직원을_부서에_배치한다(assignEmployeeDto);
        return this.직원배치를_응답DTO로_변환한다(assignment);
    }

    async 직원배치변경(
        id: string,
        updateAssignmentDto: UpdateEmployeeAssignmentRequestDto,
    ): Promise<EmployeeAssignmentResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 검증 → 수정 → 반환)
        const updatedAssignment = await this.organizationContextService.직원배치정보를_수정한다(
            id,
            updateAssignmentDto,
        );
        return this.직원배치를_응답DTO로_변환한다(updatedAssignment);
    }

    async 직원배치해제(id: string): Promise<void> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 해제)
        await this.organizationContextService.직원배치를_해제한다(id);
    }

    async 직원배치_관리자상태변경(
        id: string,
        updateManagerStatusDto: UpdateManagerStatusRequestDto,
    ): Promise<EmployeeAssignmentResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 수정 → 반환)
        const updatedAssignment = await this.organizationContextService.직원배치_관리자상태를_변경한다(
            id,
            updateManagerStatusDto.isManager,
        );
        return this.직원배치를_응답DTO로_변환한다(updatedAssignment);
    }

    async 직원배치현황조회(employeeId: string): Promise<EmployeeAssignmentResponseDto[]> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 조회 → 반환)
        const assignments = await this.organizationContextService.직원의_모든_배치정보를_조회한다(employeeId);
        return assignments.map(this.직원배치를_응답DTO로_변환한다);
    }

    async 전체배치목록조회(): Promise<EmployeeAssignmentDetailResponseDto[]> {
        // 완전한 비즈니스 로직 사이클 실행 (조회 → 조인 → 반환)
        const assignmentsWithDetails = await this.organizationContextService.전체_배치상세정보를_조회한다();
        return assignmentsWithDetails.map(this.직원배치상세를_응답DTO로_변환한다);
    }

    // 직급 이력 관리 함수들
    async 직원직급변경(
        employeeId: string,
        promoteDto: PromoteEmployeeRequestDto,
    ): Promise<EmployeeRankHistoryResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 검증 → 변경 → 반환)
        const { rankHistory } = await this.organizationContextService.직원의_직급을_변경한다(
            employeeId,
            promoteDto.rankId,
        );
        return this.직급이력을_응답DTO로_변환한다(rankHistory);
    }

    async 직원직급이력조회(employeeId: string): Promise<EmployeeRankHistoryResponseDto[]> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 조회 → 반환)
        const histories = await this.organizationContextService.직원의_직급이력을_조회한다(employeeId);
        return histories.map(this.직급이력을_응답DTO로_변환한다);
    }

    // ==================== DTO 변환 헬퍼 함수들 ====================

    private 부서를_응답DTO로_변환한다 = (department: any): DepartmentResponseDto => ({
        id: department.id,
        departmentName: department.departmentName,
        departmentCode: department.departmentCode,
        type: department.type,
        parentDepartmentId: department.parentDepartmentId,
        order: department.order,
        childDepartments: department.childDepartments?.map(this.부서를_응답DTO로_변환한다),
        createdAt: department.createdAt,
        updatedAt: department.updatedAt,
    });

    private 직원을_응답DTO로_변환한다 = (employee: any): AdminEmployeeResponseDto => ({
        id: employee.id,
        employeeNumber: employee.employeeNumber,
        name: employee.name,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        dateOfBirth: employee.dateOfBirth,
        gender: employee.gender,
        hireDate: employee.hireDate,
        status: employee.status,
        currentRankId: employee.currentRankId,
        terminationDate: employee.terminationDate,
        metadata: employee.metadata,
        isInitialPasswordSet: employee.isInitialPasswordSet,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
    });

    private 직책을_응답DTO로_변환한다 = (position: any): PositionResponseDto => ({
        id: position.id,
        positionTitle: position.positionTitle,
        positionCode: position.positionCode,
        level: position.level,
        hasManagementAuthority: position.hasManagementAuthority,
    });

    private 직급을_응답DTO로_변환한다 = (rank: any): RankResponseDto => ({
        id: rank.id,
        rankName: rank.rankName,
        rankCode: rank.rankCode,
        level: rank.level,
    });

    private 직원배치를_응답DTO로_변환한다 = (assignment: any): EmployeeAssignmentResponseDto => ({
        id: assignment.id,
        employeeId: assignment.employeeId,
        departmentId: assignment.departmentId,
        positionId: assignment.positionId,
        isManager: assignment.isManager,
        createdAt: assignment.createdAt,
        updatedAt: assignment.updatedAt,
    });

    private 직급이력을_응답DTO로_변환한다 = (history: any): EmployeeRankHistoryResponseDto => ({
        id: history.id,
        employeeId: history.employeeId,
        rankId: history.rankId,
        createdAt: history.createdAt,
        updatedAt: history.updatedAt,
    });

    private 직원배치상세를_응답DTO로_변환한다 = (data: {
        assignment: any;
        employee: any;
        department: any;
        position: any;
        rank?: any;
    }): EmployeeAssignmentDetailResponseDto => ({
        id: data.assignment.id,
        employeeId: data.assignment.employeeId,
        employeeNumber: data.employee?.employeeNumber || '',
        employeeName: data.employee?.name || '',
        departmentId: data.assignment.departmentId,
        departmentName: data.department?.departmentName || '',
        departmentCode: data.department?.departmentCode || '',
        positionId: data.assignment.positionId,
        positionTitle: data.position?.positionTitle || '',
        positionCode: data.position?.positionCode || '',
        rankId: data.rank?.id,
        rankName: data.rank?.rankName,
        rankCode: data.rank?.rankCode,
        isManager: data.assignment.isManager,
        createdAt: data.assignment.createdAt,
        updatedAt: data.assignment.updatedAt,
    });

    private 직원상세정보를_응답DTO로_변환한다 = (employeeWithDetails: any): EmployeeDetailInfoDto => ({
        id: employeeWithDetails.id,
        employeeNumber: employeeWithDetails.employeeNumber,
        name: employeeWithDetails.name,
        email: employeeWithDetails.email,
        phoneNumber: employeeWithDetails.phoneNumber,
        dateOfBirth: employeeWithDetails.dateOfBirth,
        gender: employeeWithDetails.gender,
        hireDate: employeeWithDetails.hireDate,
        status: employeeWithDetails.status,
        currentRankId: employeeWithDetails.currentRankId,
        terminationDate: employeeWithDetails.terminationDate,
        metadata: employeeWithDetails.metadata,
        isInitialPasswordSet: employeeWithDetails.isInitialPasswordSet,
        createdAt: employeeWithDetails.createdAt,
        updatedAt: employeeWithDetails.updatedAt,
        departments: employeeWithDetails.departments,
        rank: employeeWithDetails.rank,
        tokens: employeeWithDetails.tokens,
        fcmTokens: employeeWithDetails.fcmTokens,
        systemRoles: employeeWithDetails.systemRoles,
    });

    private 부서_계층구조를_직원정보와_함께_변환한다(
        departments: Department[],
        employeesByDepartment: Map<string, { employees: Employee[]; departmentPositions: Map<string, any> }>,
        departmentDetails?: Map<string, { department: Department; position: Position; rank: Rank }[]>,
    ): DepartmentWithEmployeesDto[] {
        const result: DepartmentWithEmployeesDto[] = [];

        for (const department of departments) {
            // 해당 부서의 직원 정보 조회
            const departmentEmployeeInfo = employeesByDepartment.get(department.id) || {
                employees: [],
                departmentPositions: new Map(),
            };

            // 직원 정보를 DepartmentEmployeeInfoDto로 변환
            const employees: DepartmentEmployeeInfoDto[] = [];
            for (const employee of departmentEmployeeInfo.employees) {
                const departmentPosition = departmentEmployeeInfo.departmentPositions.get(employee.id);
                const deptDetails = departmentDetails?.get(department.id);
                const employeeDetail = deptDetails?.find(
                    (d) =>
                        departmentEmployeeInfo.departmentPositions.has(employee.id) &&
                        d.department.id === department.id,
                );

                employees.push({
                    id: employee.id,
                    employeeNumber: employee.employeeNumber,
                    name: employee.name,
                    email: employee.email,
                    phoneNumber: employee.phoneNumber,
                    positionId: departmentPosition?.positionId,
                    positionTitle: employeeDetail?.position?.positionTitle,
                    rankId: employee.currentRankId,
                    rankName: employeeDetail?.rank?.rankName,
                    isManager: departmentPosition?.isManager || false,
                    metadata: employee.metadata,
                });
            }

            // 하위 부서 재귀 처리
            const childDepartments = this.부서_계층구조를_직원정보와_함께_변환한다(
                department.childDepartments || [],
                employeesByDepartment,
                departmentDetails,
            );

            const departmentDto: DepartmentWithEmployeesDto = {
                id: department.id,
                departmentName: department.departmentName,
                departmentCode: department.departmentCode,
                type: department.type,
                parentDepartmentId: department.parentDepartmentId,
                order: department.order,
                employees: employees.sort((a, b) => a.name.localeCompare(b.name)),
                childDepartments:
                    childDepartments.length > 0 ? childDepartments.sort((a, b) => a.order - b.order) : undefined,
            };

            result.push(departmentDto);
        }

        return result.sort((a, b) => a.order - b.order);
    }

    // ==================== 직원 일괄 수정 관련 ====================

    /**
     * 직원 부서 일괄 수정
     */
    async 직원부서일괄수정(
        employeeIds: string[],
        departmentId: string,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors?: { employeeId: string; message: string }[];
    }> {
        const result = await this.organizationContextService.직원_부서_일괄수정(employeeIds, departmentId);
        return result;
    }

    /**
     * 직원 팀 일괄 배치
     */
    async 직원팀일괄배치(
        employeeIds: string[],
        teamId: string,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors?: { employeeId: string; message: string }[];
    }> {
        const result = await this.organizationContextService.직원_팀_일괄배치(employeeIds, teamId);
        return result;
    }

    /**
     * 직원 직책 일괄 수정
     */
    async 직원직책일괄수정(
        employeeIds: string[],
        positionId: string,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors?: { employeeId: string; message: string }[];
    }> {
        const result = await this.organizationContextService.직원_직책_일괄수정(employeeIds, positionId);
        return result;
    }

    /**
     * 직원 직급 일괄 수정
     */
    async 직원직급일괄수정(
        employeeIds: string[],
        rankId: string,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors?: { employeeId: string; message: string }[];
    }> {
        const result = await this.organizationContextService.직원_직급_일괄수정(employeeIds, rankId);
        return result;
    }

    /**
     * 직원 재직상태 일괄 수정
     */
    async 직원재직상태일괄수정(
        employeeIds: string[],
        status: EmployeeStatus,
        terminationDate?: Date,
    ): Promise<{
        successCount: number;
        failCount: number;
        successIds: string[];
        failIds: string[];
        errors?: { employeeId: string; message: string }[];
    }> {
        const result = await this.organizationContextService.직원_재직상태_일괄수정(
            employeeIds,
            status,
            terminationDate,
        );
        return result;
    }
}

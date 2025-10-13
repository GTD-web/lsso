import { Injectable } from '@nestjs/common';
import {
    CreateDepartmentRequestDto,
    UpdateDepartmentRequestDto,
    DepartmentResponseDto,
    DepartmentListResponseDto,
    UpdateDepartmentOrderRequestDto,
    UpdateDepartmentParentRequestDto,
    CreateEmployeeRequestDto,
    UpdateEmployeeRequestDto,
    EmployeeResponseDto,
    EmployeeListResponseDto,
    NextEmployeeNumberResponseDto,
    CreatePositionRequestDto,
    UpdatePositionRequestDto,
    PositionResponseDto,
    CreateRankRequestDto,
    UpdateRankRequestDto,
    RankResponseDto,
    AssignEmployeeRequestDto,
    UpdateEmployeeAssignmentRequestDto,
    EmployeeAssignmentResponseDto,
    PromoteEmployeeRequestDto,
    EmployeeRankHistoryResponseDto,
} from './dto';
import { OrganizationManagementContextService } from 'src/modules/context/organization-management/organization-management-context.service';

@Injectable()
export class OrganizationApplicationService {
    constructor(private readonly organizationContextService: OrganizationManagementContextService) {}

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

    async 다음직원번호조회(year: number): Promise<NextEmployeeNumberResponseDto> {
        return await this.organizationContextService.연도별_다음직원번호를_조회한다(year);
    }

    async 직원상세조회(id: string): Promise<EmployeeResponseDto> {
        const employee = await this.organizationContextService.직원을_조회한다(id);
        return this.직원을_응답DTO로_변환한다(employee);
    }

    async 직원생성(createEmployeeDto: CreateEmployeeRequestDto): Promise<EmployeeResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (전처리 → 검증 → 생성 → 반환)
        const result = await this.organizationContextService.직원을_생성한다({
            employeeNumber: createEmployeeDto.employeeNumber,
            name: createEmployeeDto.name,
            email: createEmployeeDto.email,
            phoneNumber: createEmployeeDto.phoneNumber,
            dateOfBirth: createEmployeeDto.dateOfBirth ? new Date(createEmployeeDto.dateOfBirth) : undefined,
            gender: createEmployeeDto.gender,
            hireDate: new Date(createEmployeeDto.hireDate),
            currentRankId: createEmployeeDto.currentRankId,
        });

        return this.직원을_응답DTO로_변환한다(result.employee);
    }

    async 직원수정(id: string, updateEmployeeDto: UpdateEmployeeRequestDto): Promise<EmployeeResponseDto> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 검증 → 수정 → 반환)
        const updatedEmployee = await this.organizationContextService.직원정보를_수정한다(id, {
            ...updateEmployeeDto,
            dateOfBirth: updateEmployeeDto.dateOfBirth ? new Date(updateEmployeeDto.dateOfBirth) : undefined,
            hireDate: updateEmployeeDto.hireDate ? new Date(updateEmployeeDto.hireDate) : undefined,
            terminationDate: updateEmployeeDto.terminationDate
                ? new Date(updateEmployeeDto.terminationDate)
                : undefined,
        });

        return this.직원을_응답DTO로_변환한다(updatedEmployee);
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

    async 직원배치현황조회(employeeId: string): Promise<EmployeeAssignmentResponseDto[]> {
        // 완전한 비즈니스 로직 사이클 실행 (존재 확인 → 조회 → 반환)
        const assignments = await this.organizationContextService.직원의_모든_배치정보를_조회한다(employeeId);
        return assignments.map(this.직원배치를_응답DTO로_변환한다);
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

    private 직원을_응답DTO로_변환한다 = (employee: any): EmployeeResponseDto => ({
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
}

import { Injectable } from '@nestjs/common';
import { OrganizationManagementQueryContextService } from '../../../context/organization-management/organization-management-query-context.service';
import { OrganizationManagementMutationContextService } from '../../../context/organization-management/organization-management-mutation-context.service';
import {
    CreateDepartmentRequestDto,
    UpdateDepartmentRequestDto,
    DepartmentResponseDto,
    DepartmentListResponseDto,
    CreateEmployeeRequestDto,
    UpdateEmployeeRequestDto,
    EmployeeResponseDto,
    EmployeeListResponseDto,
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

@Injectable()
export class OrganizationApplicationService {
    constructor(
        private readonly queryContextService: OrganizationManagementQueryContextService,
        private readonly mutationContextService: OrganizationManagementMutationContextService,
    ) {}

    // 부서 관리 함수들
    async 부서목록조회(): Promise<DepartmentListResponseDto> {
        const departments = await this.queryContextService.모든_부서를_계층구조로_조회한다();
        return {
            departments: departments.map(this.부서를_응답DTO로_변환한다),
        };
    }

    async 부서상세조회(id: string): Promise<DepartmentResponseDto> {
        const department = await this.queryContextService.부서_ID로_부서를_조회한다(id);
        return this.부서를_응답DTO로_변환한다(department);
    }

    async 부서생성(createDepartmentDto: CreateDepartmentRequestDto): Promise<DepartmentResponseDto> {
        // 부서 코드 중복 확인
        const isDuplicate = await this.queryContextService.부서_코드가_중복되는지_확인한다(
            createDepartmentDto.departmentCode,
        );
        console.log('isDuplicate', isDuplicate);
        if (isDuplicate) {
            throw new Error('이미 존재하는 부서 코드입니다.');
        }

        const newDepartment = await this.mutationContextService.새로운_부서를_생성한다({
            departmentName: createDepartmentDto.departmentName,
            departmentCode: createDepartmentDto.departmentCode,
            type: createDepartmentDto.type,
            parentDepartmentId: createDepartmentDto.parentDepartmentId,
            order: createDepartmentDto.order,
        });

        return this.부서를_응답DTO로_변환한다(newDepartment);
    }

    async 부서수정(id: string, updateDepartmentDto: UpdateDepartmentRequestDto): Promise<DepartmentResponseDto> {
        // 부서 존재 확인
        await this.queryContextService.부서_ID로_부서를_조회한다(id);

        // 부서 코드 중복 확인 (자신 제외)
        if (updateDepartmentDto.departmentCode) {
            const isDuplicate = await this.queryContextService.부서_코드가_중복되는지_확인한다(
                updateDepartmentDto.departmentCode,
                id,
            );
            if (isDuplicate) {
                throw new Error('이미 존재하는 부서 코드입니다.');
            }
        }

        const updatedDepartment = await this.mutationContextService.부서정보를_수정한다(id, updateDepartmentDto);
        return this.부서를_응답DTO로_변환한다(updatedDepartment);
    }

    async 부서삭제(id: string): Promise<void> {
        // 부서 존재 확인
        await this.queryContextService.부서_ID로_부서를_조회한다(id);

        // 삭제 실행 (하위 부서 및 배치된 직원 확인은 mutationContextService에서 처리)
        await this.mutationContextService.부서를_삭제한다(id);
    }

    // 직원 관리 함수들
    async 직원목록조회(): Promise<EmployeeListResponseDto> {
        const employees = await this.queryContextService.모든_직원을_조회한다();
        return {
            employees: employees.map(this.직원을_응답DTO로_변환한다),
        };
    }

    async 직원상세조회(id: string): Promise<EmployeeResponseDto> {
        const employee = await this.queryContextService.직원_ID로_직원을_조회한다(id);
        return this.직원을_응답DTO로_변환한다(employee);
    }

    async 직원생성(createEmployeeDto: CreateEmployeeRequestDto): Promise<EmployeeResponseDto> {
        // 사번 중복 확인
        const isEmployeeNumberDuplicate = await this.queryContextService.직원_사번이_중복되는지_확인한다(
            createEmployeeDto.employeeNumber,
        );
        if (isEmployeeNumberDuplicate) {
            throw new Error('이미 존재하는 사번입니다.');
        }

        // 이메일 중복 확인
        const isEmailDuplicate = await this.queryContextService.직원_이메일이_중복되는지_확인한다(
            createEmployeeDto.email,
        );
        if (isEmailDuplicate) {
            throw new Error('이미 존재하는 이메일입니다.');
        }

        const newEmployee = await this.mutationContextService.새로운_직원을_생성한다({
            employeeNumber: createEmployeeDto.employeeNumber,
            name: createEmployeeDto.name,
            email: createEmployeeDto.email,
            phoneNumber: createEmployeeDto.phoneNumber,
            dateOfBirth: createEmployeeDto.dateOfBirth ? new Date(createEmployeeDto.dateOfBirth) : undefined,
            gender: createEmployeeDto.gender,
            hireDate: new Date(createEmployeeDto.hireDate),
            currentRankId: createEmployeeDto.currentRankId,
        });

        return this.직원을_응답DTO로_변환한다(newEmployee);
    }

    async 직원수정(id: string, updateEmployeeDto: UpdateEmployeeRequestDto): Promise<EmployeeResponseDto> {
        // 직원 존재 확인
        await this.queryContextService.직원_ID로_직원을_조회한다(id);

        // 이메일 중복 확인 (자신 제외)
        if (updateEmployeeDto.email) {
            const isEmailDuplicate = await this.queryContextService.직원_이메일이_중복되는지_확인한다(
                updateEmployeeDto.email,
                id,
            );
            if (isEmailDuplicate) {
                throw new Error('이미 존재하는 이메일입니다.');
            }
        }

        const updatedEmployee = await this.mutationContextService.직원정보를_수정한다(id, {
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
        // 직원 존재 확인
        await this.queryContextService.직원_ID로_직원을_조회한다(id);

        // 삭제 실행 (관련 데이터 정리는 mutationContextService에서 처리)
        await this.mutationContextService.직원을_삭제한다(id);
    }

    // 직책 관리 함수들
    async 직책목록조회(): Promise<PositionResponseDto[]> {
        const positions = await this.queryContextService.모든_직책을_조회한다();
        return positions.map(this.직책을_응답DTO로_변환한다);
    }

    async 직책생성(createPositionDto: CreatePositionRequestDto): Promise<PositionResponseDto> {
        // 직책 코드 중복 확인
        const isDuplicate = await this.queryContextService.직책_코드가_중복되는지_확인한다(
            createPositionDto.positionCode,
        );
        if (isDuplicate) {
            throw new Error('이미 존재하는 직책 코드입니다.');
        }

        const newPosition = await this.mutationContextService.새로운_직책을_생성한다(createPositionDto);
        return this.직책을_응답DTO로_변환한다(newPosition);
    }

    async 직책수정(id: string, updatePositionDto: UpdatePositionRequestDto): Promise<PositionResponseDto> {
        // 직책 존재 확인
        await this.queryContextService.직책_ID로_직책을_조회한다(id);

        // 직책 코드 중복 확인 (자신 제외)
        if (updatePositionDto.positionCode) {
            const isDuplicate = await this.queryContextService.직책_코드가_중복되는지_확인한다(
                updatePositionDto.positionCode,
                id,
            );
            if (isDuplicate) {
                throw new Error('이미 존재하는 직책 코드입니다.');
            }
        }

        const updatedPosition = await this.mutationContextService.직책정보를_수정한다(id, updatePositionDto);
        return this.직책을_응답DTO로_변환한다(updatedPosition);
    }

    async 직책삭제(id: string): Promise<void> {
        // 직책 존재 확인
        await this.queryContextService.직책_ID로_직책을_조회한다(id);

        // 삭제 실행 (배치된 직원 확인은 mutationContextService에서 처리)
        await this.mutationContextService.직책을_삭제한다(id);
    }

    // 직급 관리 함수들
    async 직급목록조회(): Promise<RankResponseDto[]> {
        const ranks = await this.queryContextService.모든_직급을_조회한다();
        return ranks.map(this.직급을_응답DTO로_변환한다);
    }

    async 직급생성(createRankDto: CreateRankRequestDto): Promise<RankResponseDto> {
        // 직급 코드 중복 확인
        const isDuplicate = await this.queryContextService.직급_코드가_중복되는지_확인한다(createRankDto.rankCode);
        if (isDuplicate) {
            throw new Error('이미 존재하는 직급 코드입니다.');
        }

        const newRank = await this.mutationContextService.새로운_직급을_생성한다(createRankDto);
        return this.직급을_응답DTO로_변환한다(newRank);
    }

    async 직급수정(id: string, updateRankDto: UpdateRankRequestDto): Promise<RankResponseDto> {
        // 직급 존재 확인
        await this.queryContextService.직급_ID로_직급을_조회한다(id);

        // 직급 코드 중복 확인 (자신 제외)
        if (updateRankDto.rankCode) {
            const isDuplicate = await this.queryContextService.직급_코드가_중복되는지_확인한다(
                updateRankDto.rankCode,
                id,
            );
            if (isDuplicate) {
                throw new Error('이미 존재하는 직급 코드입니다.');
            }
        }

        const updatedRank = await this.mutationContextService.직급정보를_수정한다(id, updateRankDto);
        return this.직급을_응답DTO로_변환한다(updatedRank);
    }

    async 직급삭제(id: string): Promise<void> {
        // 직급 존재 확인
        await this.queryContextService.직급_ID로_직급을_조회한다(id);

        // 삭제 실행 (직급을 가진 직원 및 이력 확인은 mutationContextService에서 처리)
        await this.mutationContextService.직급을_삭제한다(id);
    }

    // 직원 배치 관리 함수들
    async 직원배치(assignEmployeeDto: AssignEmployeeRequestDto): Promise<EmployeeAssignmentResponseDto> {
        // 직원, 부서, 직책 존재 확인
        await this.queryContextService.직원_ID로_직원을_조회한다(assignEmployeeDto.employeeId);
        await this.queryContextService.부서_ID로_부서를_조회한다(assignEmployeeDto.departmentId);
        await this.queryContextService.직책_ID로_직책을_조회한다(assignEmployeeDto.positionId);

        const assignment = await this.mutationContextService.직원을_부서에_배치한다(assignEmployeeDto);
        return this.직원배치를_응답DTO로_변환한다(assignment);
    }

    async 직원배치변경(
        id: string,
        updateAssignmentDto: UpdateEmployeeAssignmentRequestDto,
    ): Promise<EmployeeAssignmentResponseDto> {
        // 배치 정보 존재 확인
        await this.queryContextService.배치_ID로_배치정보를_조회한다(id);

        // 변경할 부서나 직책이 있는 경우 존재 확인
        if (updateAssignmentDto.departmentId) {
            await this.queryContextService.부서_ID로_부서를_조회한다(updateAssignmentDto.departmentId);
        }
        if (updateAssignmentDto.positionId) {
            await this.queryContextService.직책_ID로_직책을_조회한다(updateAssignmentDto.positionId);
        }

        const updatedAssignment = await this.mutationContextService.직원배치정보를_수정한다(id, updateAssignmentDto);
        return this.직원배치를_응답DTO로_변환한다(updatedAssignment);
    }

    async 직원배치해제(id: string): Promise<void> {
        // 배치 정보 존재 확인
        await this.queryContextService.배치_ID로_배치정보를_조회한다(id);

        await this.mutationContextService.직원배치를_해제한다(id);
    }

    async 직원배치현황조회(employeeId: string): Promise<EmployeeAssignmentResponseDto[]> {
        // 직원 존재 확인
        await this.queryContextService.직원_ID로_직원을_조회한다(employeeId);

        const assignments = await this.queryContextService.직원의_모든_배치정보를_조회한다(employeeId);
        return assignments.map(this.직원배치를_응답DTO로_변환한다);
    }

    // 직급 이력 관리 함수들
    async 직원직급변경(
        employeeId: string,
        promoteDto: PromoteEmployeeRequestDto,
    ): Promise<EmployeeRankHistoryResponseDto> {
        // 직원과 직급 존재 확인
        await this.queryContextService.직원_ID로_직원을_조회한다(employeeId);
        await this.queryContextService.직급_ID로_직급을_조회한다(promoteDto.rankId);

        const { rankHistory } = await this.mutationContextService.직원의_직급을_변경한다(employeeId, promoteDto.rankId);
        return this.직급이력을_응답DTO로_변환한다(rankHistory);
    }

    async 직원직급이력조회(employeeId: string): Promise<EmployeeRankHistoryResponseDto[]> {
        // 직원 존재 확인
        await this.queryContextService.직원_ID로_직원을_조회한다(employeeId);

        const histories = await this.queryContextService.직원의_직급이력을_조회한다(employeeId);
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

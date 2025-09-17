import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainEmployeeRankHistoryService } from '../../domain/employee-rank-history/employee-rank-history.service';
import {
    Department,
    Employee,
    Position,
    Rank,
    EmployeeDepartmentPosition,
    EmployeeRankHistory,
} from '../../../../libs/database/entities';
import { EmployeeStatus } from '../../../../libs/common/enums';

@Injectable()
export class OrganizationManagementMutationContextService {
    constructor(
        private readonly 직원서비스: DomainEmployeeService,
        private readonly 부서서비스: DomainDepartmentService,
        private readonly 직책서비스: DomainPositionService,
        private readonly 직급서비스: DomainRankService,
        private readonly 직원부서직책서비스: DomainEmployeeDepartmentPositionService,
        private readonly 직원직급이력서비스: DomainEmployeeRankHistoryService,
    ) {}

    // ==================== 부서 생성/수정/삭제 ====================

    async 새로운_부서를_생성한다(부서정보: {
        departmentName: string;
        departmentCode: string;
        type: any;
        parentDepartmentId?: string;
        order?: number;
    }): Promise<Department> {
        return await this.부서서비스.createDepartment({
            departmentName: 부서정보.departmentName,
            departmentCode: 부서정보.departmentCode,
            type: 부서정보.type,
            parentDepartmentId: 부서정보.parentDepartmentId,
            order: 부서정보.order || 0,
        });
    }

    async 부서정보를_수정한다(
        departmentId: string,
        수정정보: {
            departmentName?: string;
            departmentCode?: string;
            type?: any;
            parentDepartmentId?: string;
            order?: number;
        },
    ): Promise<Department> {
        return await this.부서서비스.updateDepartment(departmentId, 수정정보);
    }

    async 부서를_삭제한다(departmentId: string): Promise<void> {
        // 하위 부서가 있는지 확인
        const childDepartments = await this.부서서비스.findChildDepartments(departmentId);
        if (childDepartments.length > 0) {
            throw new Error('하위 부서가 존재하여 삭제할 수 없습니다.');
        }

        // 해당 부서에 배치된 직원이 있는지 확인
        const assignedEmployees = await this.직원부서직책서비스.findByDepartmentId(departmentId);
        if (assignedEmployees.length > 0) {
            throw new Error('해당 부서에 배치된 직원이 있어 삭제할 수 없습니다.');
        }

        await this.부서서비스.deleteDepartment(departmentId);
    }

    // ==================== 직원 생성/수정/삭제 ====================

    async 새로운_직원을_생성한다(직원정보: {
        employeeNumber: string;
        name: string;
        email: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        gender?: any;
        hireDate: Date;
        currentRankId?: string;
    }): Promise<Employee> {
        return await this.직원서비스.createEmployee({
            employeeNumber: 직원정보.employeeNumber,
            name: 직원정보.name,
            email: 직원정보.email,
            phoneNumber: 직원정보.phoneNumber,
            dateOfBirth: 직원정보.dateOfBirth,
            gender: 직원정보.gender,
            hireDate: 직원정보.hireDate,
            status: EmployeeStatus.Active,
            currentRankId: 직원정보.currentRankId,
            isInitialPasswordSet: false,
        });
    }

    async 직원정보를_수정한다(
        employeeId: string,
        수정정보: {
            name?: string;
            email?: string;
            phoneNumber?: string;
            dateOfBirth?: Date;
            gender?: any;
            hireDate?: Date;
            status?: EmployeeStatus;
            currentRankId?: string;
            terminationDate?: Date;
        },
    ): Promise<Employee> {
        return await this.직원서비스.updateEmployee(employeeId, 수정정보);
    }

    async 직원을_퇴사처리한다(employeeId: string, terminationDate: Date): Promise<Employee> {
        // 직원의 모든 배치 정보 해제
        const assignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
        for (const assignment of assignments) {
            await this.직원부서직책서비스.deleteAssignment(assignment.id);
        }

        // 직원 상태를 퇴사로 변경
        return await this.직원서비스.updateEmployee(employeeId, {
            status: EmployeeStatus.Terminated,
            terminationDate,
        });
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

    // ==================== 직책 생성/수정/삭제 ====================

    async 새로운_직책을_생성한다(직책정보: {
        positionTitle: string;
        positionCode: string;
        level: number;
        hasManagementAuthority?: boolean;
    }): Promise<Position> {
        return await this.직책서비스.createPosition({
            positionTitle: 직책정보.positionTitle,
            positionCode: 직책정보.positionCode,
            level: 직책정보.level,
            hasManagementAuthority: 직책정보.hasManagementAuthority || false,
        });
    }

    async 직책정보를_수정한다(
        positionId: string,
        수정정보: {
            positionTitle?: string;
            positionCode?: string;
            level?: number;
            hasManagementAuthority?: boolean;
        },
    ): Promise<Position> {
        return await this.직책서비스.updatePosition(positionId, 수정정보);
    }

    async 직책을_삭제한다(positionId: string): Promise<void> {
        // 해당 직책에 배치된 직원이 있는지 확인
        const assignedEmployees = await this.직원부서직책서비스.findByPositionId(positionId);
        if (assignedEmployees.length > 0) {
            throw new Error('해당 직책에 배치된 직원이 있어 삭제할 수 없습니다.');
        }

        await this.직책서비스.deletePosition(positionId);
    }

    // ==================== 직급 생성/수정/삭제 ====================

    async 새로운_직급을_생성한다(직급정보: { rankName: string; rankCode: string; level: number }): Promise<Rank> {
        return await this.직급서비스.createRank({
            rankName: 직급정보.rankName,
            rankCode: 직급정보.rankCode,
            level: 직급정보.level,
        });
    }

    async 직급정보를_수정한다(
        rankId: string,
        수정정보: {
            rankName?: string;
            rankCode?: string;
            level?: number;
        },
    ): Promise<Rank> {
        return await this.직급서비스.updateRank(rankId, 수정정보);
    }

    async 직급을_삭제한다(rankId: string): Promise<void> {
        // 해당 직급을 가진 직원이 있는지 확인
        const employeesWithRank = await this.직원서비스.findByRankId(rankId);
        if (employeesWithRank.length > 0) {
            throw new Error('해당 직급을 가진 직원이 있어 삭제할 수 없습니다.');
        }

        // 해당 직급의 이력이 있는지 확인
        const rankHistories = await this.직원직급이력서비스.findByRankId(rankId);
        if (rankHistories.length > 0) {
            throw new Error('해당 직급의 이력이 있어 삭제할 수 없습니다.');
        }

        await this.직급서비스.deleteRank(rankId);
    }

    // ==================== 직원 배치 생성/수정/삭제 ====================

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

    // ==================== 직급 이력 생성/관리 ====================

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

    // ==================== 복합 비즈니스 로직 ====================

    async 직원을_새로_채용하고_배치한다(채용정보: {
        // 직원 기본 정보
        employeeNumber: string;
        name: string;
        email: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        gender?: any;
        hireDate: Date;

        // 배치 정보
        departmentId: string;
        positionId: string;
        rankId: string;
        isManager?: boolean;
    }): Promise<{
        employee: Employee;
        assignment: EmployeeDepartmentPosition;
        rankHistory: EmployeeRankHistory;
    }> {
        // 1. 직원 생성
        const employee = await this.새로운_직원을_생성한다({
            employeeNumber: 채용정보.employeeNumber,
            name: 채용정보.name,
            email: 채용정보.email,
            phoneNumber: 채용정보.phoneNumber,
            dateOfBirth: 채용정보.dateOfBirth,
            gender: 채용정보.gender,
            hireDate: 채용정보.hireDate,
            currentRankId: 채용정보.rankId,
        });

        // 2. 부서에 배치
        const assignment = await this.직원을_부서에_배치한다({
            employeeId: employee.id,
            departmentId: 채용정보.departmentId,
            positionId: 채용정보.positionId,
            isManager: 채용정보.isManager,
        });

        // 3. 초기 직급 이력 생성
        const rankHistory = await this.직원직급이력서비스.createHistory({
            employeeId: employee.id,
            rankId: 채용정보.rankId,
        });

        return { employee, assignment, rankHistory };
    }

    async 직원의_부서를_이동시킨다(이동정보: {
        employeeId: string;
        현재_배치_ID: string;
        새로운_부서_ID: string;
        새로운_직책_ID: string;
        isManager?: boolean;
    }): Promise<{
        oldAssignment: EmployeeDepartmentPosition;
        newAssignment: EmployeeDepartmentPosition;
    }> {
        // 1. 현재 배치 정보 조회
        const oldAssignment = await this.직원부서직책서비스.findById(이동정보.현재_배치_ID);

        // 2. 현재 배치 해제
        await this.직원배치를_해제한다(이동정보.현재_배치_ID);

        // 3. 새로운 부서에 배치
        const newAssignment = await this.직원을_부서에_배치한다({
            employeeId: 이동정보.employeeId,
            departmentId: 이동정보.새로운_부서_ID,
            positionId: 이동정보.새로운_직책_ID,
            isManager: 이동정보.isManager,
        });

        return { oldAssignment, newAssignment };
    }
}

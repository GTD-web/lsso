import { Injectable } from '@nestjs/common';
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

@Injectable()
export class OrganizationManagementQueryContextService {
    constructor(
        private readonly 직원서비스: DomainEmployeeService,
        private readonly 부서서비스: DomainDepartmentService,
        private readonly 직책서비스: DomainPositionService,
        private readonly 직급서비스: DomainRankService,
        private readonly 직원부서직책서비스: DomainEmployeeDepartmentPositionService,
        private readonly 직원직급이력서비스: DomainEmployeeRankHistoryService,
    ) {}

    // ==================== 부서 조회 관련 ====================

    async 모든_부서를_계층구조로_조회한다(): Promise<Department[]> {
        // 모든 부서를 조회하고 계층구조로 정리
        const allDepartments = await this.부서서비스.findAllDepartmentsWithChildren();
        return this.부서_계층구조를_구축한다(allDepartments);
    }

    async 부서_ID로_부서를_조회한다(departmentId: string): Promise<Department> {
        return await this.부서서비스.findByIdWithParent(departmentId);
    }

    async 부서_코드가_중복되는지_확인한다(departmentCode: string, excludeId?: string): Promise<boolean> {
        try {
            const department = await this.부서서비스.findByDepartmentCode(departmentCode);
            if (!department) {
                return false; // 부서가 없으면 중복 아님
            }
            // excludeId가 있고 찾은 부서가 제외할 부서면 중복 아님
            return excludeId ? department.id !== excludeId : true;
        } catch {
            return false; // 에러 발생시 중복 아님으로 처리
        }
    }

    // ==================== 직원 조회 관련 ====================

    async 모든_직원을_조회한다(includeTerminated = false): Promise<Employee[]> {
        return await this.직원서비스.findAllEmployees(includeTerminated);
    }

    async 직원_ID로_직원을_조회한다(employeeId: string): Promise<Employee> {
        return await this.직원서비스.findByEmployeeId(employeeId);
    }

    async 직원_사번이_중복되는지_확인한다(employeeNumber: string, excludeId?: string): Promise<boolean> {
        try {
            const employee = await this.직원서비스.findByEmployeeNumber(employeeNumber);
            if (!employee) {
                return false; // 직원이 없으면 중복 아님
            }
            // excludeId가 있고 찾은 직원이 제외할 직원이면 중복 아님
            return excludeId ? employee.id !== excludeId : true;
        } catch {
            return false; // 에러 발생시 중복 아님으로 처리
        }
    }

    async 직원_이메일이_중복되는지_확인한다(email: string, excludeId?: string): Promise<boolean> {
        try {
            const employee = await this.직원서비스.findByEmail(email);
            if (!employee) {
                return false; // 직원이 없으면 중복 아님
            }
            // excludeId가 있고 찾은 직원이 제외할 직원이면 중복 아님
            return excludeId ? employee.id !== excludeId : true;
        } catch {
            return false; // 에러 발생시 중복 아님으로 처리
        }
    }

    async 직원의_상세정보를_조회한다(employeeId: string): Promise<{
        employee: Employee;
        department?: Department;
        position?: Position;
        rank?: Rank;
    }> {
        const employee = await this.직원_ID로_직원을_조회한다(employeeId);

        // 직원의 현재 부서-직책 정보 조회
        let department: Department | undefined;
        let position: Position | undefined;

        try {
            const departmentPosition = await this.직원부서직책서비스.findByEmployeeId(employeeId);
            department = await this.부서서비스.findById(departmentPosition.departmentId);
            position = await this.직책서비스.findById(departmentPosition.positionId);
        } catch {
            // 배치 정보가 없는 경우
        }

        // 직원의 현재 직급 정보 조회
        let rank: Rank | undefined;
        if (employee.currentRankId) {
            try {
                rank = await this.직급서비스.findById(employee.currentRankId);
            } catch {
                // 직급 정보가 없는 경우
            }
        }

        return { employee, department, position, rank };
    }

    // ==================== 직책 조회 관련 ====================

    async 모든_직책을_조회한다(): Promise<Position[]> {
        return await this.직책서비스.findAllPositions();
    }

    async 직책_ID로_직책을_조회한다(positionId: string): Promise<Position> {
        return await this.직책서비스.findById(positionId);
    }

    async 직책_코드가_중복되는지_확인한다(positionCode: string, excludeId?: string): Promise<boolean> {
        try {
            const position = await this.직책서비스.findByPositionCode(positionCode);
            if (!position) {
                return false; // 직책이 없으면 중복 아님
            }
            // excludeId가 있고 찾은 직책이 제외할 직책이면 중복 아님
            return excludeId ? position.id !== excludeId : true;
        } catch {
            return false; // 에러 발생시 중복 아님으로 처리
        }
    }

    // ==================== 직급 조회 관련 ====================

    async 모든_직급을_조회한다(): Promise<Rank[]> {
        return await this.직급서비스.findAllRanks();
    }

    async 직급_ID로_직급을_조회한다(rankId: string): Promise<Rank> {
        return await this.직급서비스.findById(rankId);
    }

    async 직급_코드가_중복되는지_확인한다(rankCode: string, excludeId?: string): Promise<boolean> {
        try {
            const rank = await this.직급서비스.findByRankCode(rankCode);
            if (!rank) {
                return false; // 직급이 없으면 중복 아님
            }
            // excludeId가 있고 찾은 직급이 제외할 직급이면 중복 아님
            return excludeId ? rank.id !== excludeId : true;
        } catch {
            return false; // 에러 발생시 중복 아님으로 처리
        }
    }

    // ==================== 직원 배치 조회 관련 ====================

    async 직원의_현재_배치정보를_조회한다(employeeId: string): Promise<EmployeeDepartmentPosition> {
        return await this.직원부서직책서비스.findByEmployeeId(employeeId);
    }

    async 직원의_모든_배치정보를_조회한다(employeeId: string): Promise<EmployeeDepartmentPosition[]> {
        return await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
    }

    async 배치_ID로_배치정보를_조회한다(assignmentId: string): Promise<EmployeeDepartmentPosition> {
        return await this.직원부서직책서비스.findById(assignmentId);
    }

    async 부서에_배치된_직원들을_조회한다(departmentId: string): Promise<EmployeeDepartmentPosition[]> {
        return await this.직원부서직책서비스.findByDepartmentId(departmentId);
    }

    async 직원이_이미_해당_부서에_배치되어있는지_확인한다(employeeId: string, departmentId: string): Promise<boolean> {
        try {
            const assignment = await this.직원부서직책서비스.findByEmployeeAndDepartment(employeeId, departmentId);
            return !!assignment;
        } catch {
            return false;
        }
    }

    // ==================== 직급 이력 조회 관련 ====================

    async 직원의_직급이력을_조회한다(employeeId: string): Promise<EmployeeRankHistory[]> {
        return await this.직원직급이력서비스.findByEmployeeId(employeeId);
    }

    async 직급이력_ID로_이력을_조회한다(historyId: string): Promise<EmployeeRankHistory> {
        return await this.직원직급이력서비스.findById(historyId);
    }

    async 직원의_최근_직급이력을_조회한다(employeeId: string): Promise<EmployeeRankHistory | null> {
        const histories = await this.직원의_직급이력을_조회한다(employeeId);
        return histories.length > 0 ? histories[0] : null; // 최신순으로 정렬되어 있다고 가정
    }

    // ==================== 헬퍼 함수들 ====================

    private 부서_계층구조를_구축한다(departments: Department[]): Department[] {
        // 부서들을 Map으로 변환 (빠른 조회를 위해)
        const departmentMap = new Map(departments.map((dept) => [dept.id, dept]));

        // 최상위 부서들을 찾기
        const rootDepartments = departments.filter((dept) => !dept.parentDepartmentId);

        // 각 부서에 자식 부서들을 설정
        for (const dept of departments) {
            dept.childDepartments = departments
                .filter((child) => child.parentDepartmentId === dept.id)
                .sort((a, b) => a.order - b.order);
        }

        return rootDepartments.sort((a, b) => a.order - b.order);
    }

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
            this.모든_부서를_계층구조로_조회한다(),
            this.모든_직원을_조회한다(true), // 퇴사자 포함
            this.모든_직책을_조회한다(),
            this.모든_직급을_조회한다(),
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

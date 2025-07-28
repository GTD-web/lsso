import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Employee } from '../employee.entity';
import { Department } from '../department.entity';
import { Position } from '../position.entity';
import { EnhancedEmployeeDepartmentPosition, ManagerType } from './enhanced-employee-department-position.entity';

@Injectable()
export class EnhancedOrganizationService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepo: Repository<Employee>,

        @InjectRepository(EnhancedEmployeeDepartmentPosition)
        private readonly empDeptPosRepo: Repository<EnhancedEmployeeDepartmentPosition>,
    ) {}

    // =====================================
    // 매니저 관계 조회 (통합 관리)
    // =====================================

    /**
     * 직원의 직접 상사 조회
     */
    async getDirectManager(employeeId: string): Promise<Employee | null> {
        const assignment = await this.empDeptPosRepo.findOne({
            where: {
                employeeId,
                isActive: true,
                isPrimary: true, // 주 소속 부서에서의 상사
            },
        });

        return assignment?.directManager || null;
    }

    /**
     * 직원의 모든 상사 조회 (다중 관계)
     */
    async getAllManagers(employeeId: string) {
        const assignments = await this.empDeptPosRepo.find({
            where: {
                employeeId,
                isActive: true,
            },
            order: { isPrimary: 'DESC' },
        });

        return assignments.map((assignment) => ({
            manager: assignment.directManager,
            department: assignment.department,
            position: assignment.position,
            managerType: assignment.managerType,
            isPrimary: assignment.isPrimary,
        }));
    }

    /**
     * 부하직원 조회
     */
    async getSubordinates(managerId: string, departmentId?: string) {
        const query = this.empDeptPosRepo
            .createQueryBuilder('edp')
            .leftJoinAndSelect('edp.employee', 'employee')
            .leftJoinAndSelect('edp.department', 'department')
            .leftJoinAndSelect('edp.position', 'position')
            .where('edp.directManagerId = :managerId', { managerId })
            .andWhere('edp.isActive = :isActive', { isActive: true });

        if (departmentId) {
            query.andWhere('edp.departmentId = :departmentId', { departmentId });
        }

        return await query.orderBy('position.level', 'DESC').addOrderBy('employee.name', 'ASC').getMany();
    }

    /**
     * 부서의 조직도 조회 (계층적)
     */
    async getDepartmentOrganizationChart(departmentId: string) {
        const allMembers = await this.empDeptPosRepo
            .createQueryBuilder('edp')
            .leftJoinAndSelect('edp.employee', 'employee')
            .leftJoinAndSelect('edp.position', 'position')
            .leftJoinAndSelect('edp.department', 'department')
            .where('edp.departmentId = :departmentId', { departmentId })
            .andWhere('edp.isActive = :isActive', { isActive: true })
            .andWhere('edp.endDate IS NULL')
            .orderBy('position.level', 'DESC')
            .addOrderBy('employee.name', 'ASC')
            .getMany();

        // 계층 구조로 변환
        const orgChart = this.buildHierarchy(allMembers);
        return orgChart;
    }

    // =====================================
    // 매니저 관계 설정
    // =====================================

    /**
     * 매니저 관계 설정
     */
    async assignManager(
        employeeId: string,
        managerId: string,
        departmentId: string,
        managerType: ManagerType = ManagerType.DIRECT,
        options: {
            delegatedAuthorityLevel?: number;
            reason?: string;
            createdBy?: string;
        } = {},
    ) {
        // 해당 부서에서의 직원 배정 정보 조회
        const assignment = await this.empDeptPosRepo.findOne({
            where: {
                employeeId,
                departmentId,
                isActive: true,
            },
        });

        if (!assignment) {
            throw new Error('해당 부서에 배정된 직원이 아닙니다.');
        }

        // 매니저 관계 업데이트
        await this.empDeptPosRepo.update(assignment.id, {
            directManagerId: managerId,
            managerType,
            delegatedAuthorityLevel: options.delegatedAuthorityLevel,
            reason: options.reason || assignment.reason,
            updatedBy: options.createdBy,
        });

        return await this.empDeptPosRepo.findOne({
            where: { id: assignment.id },
        });
    }

    /**
     * 자동 매니저 할당 (직책 기반)
     */
    async autoAssignManager(employeeId: string, departmentId: string) {
        const employee = await this.empDeptPosRepo.findOne({
            where: { employeeId, departmentId, isActive: true },
        });

        if (!employee) return null;

        // 같은 부서의 상위 직책자 찾기
        const manager = await this.empDeptPosRepo
            .createQueryBuilder('edp')
            .leftJoin('edp.position', 'pos')
            .where('edp.departmentId = :departmentId', { departmentId })
            .andWhere('edp.isActive = :isActive', { isActive: true })
            .andWhere('pos.level > :currentLevel', {
                currentLevel: employee.position.level,
            })
            .andWhere('pos.hasManagementAuthority = :hasAuthority', {
                hasAuthority: true,
            })
            .orderBy('pos.level', 'ASC') // 가장 가까운 상위 직책
            .getOne();

        if (manager) {
            await this.assignManager(employeeId, manager.employeeId, departmentId, ManagerType.DIRECT, {
                reason: '직책 기반 자동 할당',
            });
        }

        return manager;
    }

    // =====================================
    // 조직 분석
    // =====================================

    /**
     * 관리 스팬 분석 (한 매니저가 관리하는 부하 수)
     */
    async getManagementSpanAnalysis() {
        return await this.empDeptPosRepo
            .createQueryBuilder('edp')
            .leftJoin('edp.directManager', 'manager')
            .leftJoin('edp.department', 'dept')
            .select([
                'manager.id as managerId',
                'manager.name as managerName',
                'dept.departmentName as departmentName',
                'COUNT(*) as subordinateCount',
            ])
            .where('edp.directManagerId IS NOT NULL')
            .andWhere('edp.isActive = :isActive', { isActive: true })
            .groupBy('manager.id, manager.name, dept.departmentName')
            .orderBy('subordinateCount', 'DESC')
            .getRawMany();
    }

    /**
     * 매니저 없는 직원 조회
     */
    async getEmployeesWithoutManager() {
        return await this.empDeptPosRepo.find({
            where: {
                directManagerId: IsNull(),
                isActive: true,
                position: {
                    hasManagementAuthority: false, // 관리자가 아닌 일반 직원만
                },
            },
        });
    }

    // =====================================
    // 헬퍼 메서드
    // =====================================

    private buildHierarchy(members: EnhancedEmployeeDepartmentPosition[]) {
        const memberMap = new Map();
        const roots: any[] = [];

        // 맵 생성
        members.forEach((member) => {
            memberMap.set(member.employeeId, {
                ...member,
                subordinates: [],
            });
        });

        // 계층 구조 구성
        members.forEach((member) => {
            const node = memberMap.get(member.employeeId);

            if (member.directManagerId && memberMap.has(member.directManagerId)) {
                const parent = memberMap.get(member.directManagerId);
                parent.subordinates.push(node);
            } else {
                roots.push(node);
            }
        });

        return roots;
    }
}

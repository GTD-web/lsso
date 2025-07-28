import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { Employee } from '../employee.entity';
import { Department } from '../department.entity';
import { Position } from '../position.entity';
import { EmployeeDepartmentPosition } from '../employee-department-position.entity';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepo: Repository<Employee>,

        @InjectRepository(Department)
        private readonly departmentRepo: Repository<Department>,

        @InjectRepository(Position)
        private readonly positionRepo: Repository<Position>,

        @InjectRepository(EmployeeDepartmentPosition)
        private readonly empDeptPosRepo: Repository<EmployeeDepartmentPosition>,
    ) {}

    // =====================================
    // 현재 상태 조회 (중간테이블 활용)
    // =====================================

    /**
     * 직원의 현재 소속 부서 및 직책 조회
     */
    async getEmployeeCurrentAssignments(employeeId: string) {
        return await this.empDeptPosRepo.find({
            where: {
                employeeId,
                isActive: true,
                endDate: IsNull(),
            },
            // eager loading으로 관련 데이터 자동 로드
            order: { isPrimary: 'DESC' }, // 주 소속 부서가 먼저 나오도록
        });
    }

    /**
     * 부서의 현재 구성원 및 직책 조회
     */
    async getDepartmentCurrentMembers(departmentId: string) {
        return await this.empDeptPosRepo
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
    }

    /**
     * 부서장 조회
     */
    async getDepartmentManagers(departmentId: string) {
        return await this.empDeptPosRepo
            .createQueryBuilder('edp')
            .leftJoinAndSelect('edp.employee', 'employee')
            .leftJoinAndSelect('edp.position', 'position')
            .leftJoinAndSelect('edp.department', 'department')
            .where('edp.departmentId = :departmentId', { departmentId })
            .andWhere('edp.isActive = :isActive', { isActive: true })
            .andWhere('edp.endDate IS NULL')
            .andWhere('position.hasManagementAuthority = :hasAuthority', { hasAuthority: true })
            .orderBy('position.level', 'DESC')
            .getMany();
    }

    // =====================================
    // 조직 변경 처리
    // =====================================

    /**
     * 직원 부서 및 직책 배정
     */
    async assignEmployeeToDepartment(
        employeeId: string,
        departmentId: string,
        positionId: string,
        options: {
            startDate?: Date;
            isPrimary?: boolean;
            isTemporary?: boolean;
            reason?: string;
            createdBy?: string;
        } = {},
    ) {
        const { startDate = new Date(), isPrimary = true, isTemporary = false, reason, createdBy } = options;

        // 1. 기존 주 소속 변경 (새로운 주 소속이 생기는 경우)
        if (isPrimary) {
            await this.empDeptPosRepo.update(
                {
                    employeeId,
                    isPrimary: true,
                    isActive: true,
                },
                {
                    isPrimary: false,
                },
            );
        }

        // 2. 새로운 배정 생성
        const assignment = this.empDeptPosRepo.create({
            employeeId,
            departmentId,
            positionId,
            startDate,
            isPrimary,
            isTemporary,
            reason,
            isActive: true,
            createdBy,
        });

        const savedAssignment = await this.empDeptPosRepo.save(assignment);

        // // 3. 이력 테이블에도 기록
        // const history = this.empDeptHistoryRepo.create({
        //     employeeId,
        //     departmentId,
        //     startDate,
        //     reason,
        //     isActive: true,
        //     isManager: await this.checkIfManagerPosition(positionId),
        //     createdBy,
        // });

        // await this.empDeptHistoryRepo.save(history);

        return savedAssignment;
    }

    /**
     * 직원 부서/직책 변경 종료
     */
    async terminateEmployeeAssignment(
        assignmentId: string,
        endDate: Date = new Date(),
        reason?: string,
        updatedBy?: string,
    ) {
        // 1. 중간테이블 업데이트
        await this.empDeptPosRepo.update(assignmentId, {
            endDate,
            isActive: false,
            updatedBy,
        });

        // 2. 해당 배정 정보 조회
        const assignment = await this.empDeptPosRepo.findOne({
            where: { id: assignmentId },
        });

        // if (assignment) {
        //     // 3. 이력 테이블 업데이트
        //     await this.empDeptHistoryRepo.update(
        //         {
        //             employeeId: assignment.employeeId,
        //             departmentId: assignment.departmentId,
        //             isActive: true,
        //         },
        //         {
        //             endDate,
        //             isActive: false,
        //             updatedBy,
        //         },
        //     );
        // }
    }

    // =====================================
    // 조직도 및 통계
    // =====================================

    /**
     * 부서별 인원 현황
     */
    async getDepartmentHeadcount() {
        return await this.empDeptPosRepo
            .createQueryBuilder('edp')
            .leftJoin('edp.department', 'dept')
            .leftJoin('edp.position', 'pos')
            .select([
                'dept.id as departmentId',
                'dept.departmentName as departmentName',
                'COUNT(CASE WHEN edp.isPrimary = true THEN 1 END) as primaryCount',
                'COUNT(CASE WHEN edp.isTemporary = true THEN 1 END) as temporaryCount',
                'COUNT(*) as totalCount',
            ])
            .where('edp.isActive = :isActive', { isActive: true })
            .andWhere('edp.endDate IS NULL')
            .groupBy('dept.id, dept.departmentName')
            .getRawMany();
    }

    /**
     * 직책별 인원 현황
     */
    async getPositionHeadcount() {
        return await this.empDeptPosRepo
            .createQueryBuilder('edp')
            .leftJoin('edp.position', 'pos')
            .select([
                'pos.id as positionId',
                'pos.positionTitle as positionTitle',
                'pos.level as level',
                'COUNT(*) as count',
            ])
            .where('edp.isActive = :isActive', { isActive: true })
            .andWhere('edp.endDate IS NULL')
            .groupBy('pos.id, pos.positionTitle, pos.level')
            .orderBy('pos.level', 'DESC')
            .getRawMany();
    }

    /**
     * 겸직 현황 조회
     */
    async getConcurrentAssignments() {
        return await this.empDeptPosRepo
            .createQueryBuilder('edp')
            .leftJoin('edp.employee', 'emp')
            .select([
                'emp.id as employeeId',
                'emp.name as employeeName',
                'emp.employeeNumber as employeeNumber',
                'COUNT(*) as assignmentCount',
            ])
            .where('edp.isActive = :isActive', { isActive: true })
            .andWhere('edp.endDate IS NULL')
            .groupBy('emp.id, emp.name, emp.employeeNumber')
            .having('COUNT(*) > 1')
            .getRawMany();
    }

    // =====================================
    // 헬퍼 메서드
    // =====================================

    private async checkIfManagerPosition(positionId: string): Promise<boolean> {
        const position = await this.positionRepo.findOne({
            where: { id: positionId },
        });
        return position?.hasManagementAuthority || false;
    }

    /**
     * 직책 데이터 초기화 (샘플 데이터)
     */
    async initializePositions() {
        const positions = [
            {
                positionTitle: '부서장',
                positionCode: 'DEPT_HEAD',
                level: 100,
                hasManagementAuthority: true,
                approvalLevel: 5,
                description: '부서 전체를 총괄하는 책임자',
            },
            {
                positionTitle: '파트장',
                positionCode: 'PART_HEAD',
                level: 80,
                hasManagementAuthority: true,
                approvalLevel: 4,
                description: '파트 단위를 관리하는 중간관리자',
            },
            {
                positionTitle: '팀장',
                positionCode: 'TEAM_LEADER',
                level: 60,
                hasManagementAuthority: true,
                approvalLevel: 3,
                description: '팀 단위를 이끄는 팀장',
            },
            {
                positionTitle: '직원',
                positionCode: 'STAFF',
                level: 20,
                hasManagementAuthority: false,
                approvalLevel: 1,
                description: '일반 구성원',
            },
        ];

        for (const posData of positions) {
            const exists = await this.positionRepo.findOne({
                where: { positionCode: posData.positionCode },
            });

            if (!exists) {
                await this.positionRepo.save(this.positionRepo.create(posData));
            }
        }
    }
}

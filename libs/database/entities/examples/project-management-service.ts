import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Between } from 'typeorm';
import { Employee } from '../employee.entity';
import { Project, ProjectStatus } from '../project.entity';
import { ProjectRole, ProjectRoleType } from '../project-role.entity';
import { EmployeeProjectAssignment, AssignmentStatus, CommitmentLevel } from '../employee-project-assignment.entity';

@Injectable()
export class ProjectManagementService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepo: Repository<Employee>,

        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>,

        @InjectRepository(ProjectRole)
        private readonly projectRoleRepo: Repository<ProjectRole>,

        @InjectRepository(EmployeeProjectAssignment)
        private readonly assignmentRepo: Repository<EmployeeProjectAssignment>,
    ) {}

    // =====================================
    // 프로젝트 조회
    // =====================================

    /**
     * 직원의 현재 프로젝트 배정 조회
     */
    async getEmployeeCurrentProjects(employeeId: string) {
        return await this.assignmentRepo.find({
            where: {
                employeeId,
                status: AssignmentStatus.ACTIVE,
            },
            order: {
                allocationPercentage: 'DESC', // 투입률 높은 순
                assignmentStartDate: 'ASC',
            },
        });
    }

    /**
     * 프로젝트의 현재 팀 구성 조회
     */
    async getProjectTeamMembers(projectId: string) {
        return await this.assignmentRepo
            .createQueryBuilder('assignment')
            .leftJoinAndSelect('assignment.employee', 'employee')
            .leftJoinAndSelect('assignment.projectRole', 'role')
            .where('assignment.projectId = :projectId', { projectId })
            .andWhere('assignment.status = :status', { status: AssignmentStatus.ACTIVE })
            .orderBy('role.level', 'DESC')
            .addOrderBy('assignment.allocationPercentage', 'DESC')
            .getMany();
    }

    /**
     * 프로젝트 리더 조회
     */
    async getProjectLeaders(projectId: string) {
        return await this.assignmentRepo
            .createQueryBuilder('assignment')
            .leftJoinAndSelect('assignment.employee', 'employee')
            .leftJoinAndSelect('assignment.projectRole', 'role')
            .where('assignment.projectId = :projectId', { projectId })
            .andWhere('assignment.status = :status', { status: AssignmentStatus.ACTIVE })
            .andWhere('role.hasProjectAuthority = :hasAuthority', { hasAuthority: true })
            .orderBy('role.level', 'DESC')
            .getMany();
    }

    // =====================================
    // 프로젝트 배정 관리
    // =====================================

    /**
     * 직원을 프로젝트에 배정
     */
    async assignEmployeeToProject(
        employeeId: string,
        projectId: string,
        projectRoleId: string,
        options: {
            startDate?: Date;
            endDate?: Date;
            commitmentLevel?: CommitmentLevel;
            allocationPercentage?: number;
            hourlyRate?: number;
            estimatedHours?: number;
            reason?: string;
            createdBy?: string;
        } = {},
    ) {
        const {
            startDate = new Date(),
            endDate,
            commitmentLevel = CommitmentLevel.PART_TIME,
            allocationPercentage = 50,
            hourlyRate,
            estimatedHours,
            reason,
            createdBy,
        } = options;

        // 1. 기존 동일 프로젝트 배정 확인
        const existingAssignment = await this.assignmentRepo.findOne({
            where: {
                employeeId,
                projectId,
                status: AssignmentStatus.ACTIVE,
            },
        });

        if (existingAssignment) {
            throw new Error('이미 해당 프로젝트에 배정된 직원입니다.');
        }

        // 2. 새로운 배정 생성
        const assignment = this.assignmentRepo.create({
            employeeId,
            projectId,
            projectRoleId,
            assignmentStartDate: startDate,
            assignmentEndDate: endDate,
            status: AssignmentStatus.ASSIGNED,
            commitmentLevel,
            allocationPercentage,
            hourlyRate,
            estimatedHours,
            reason,
            createdBy,
        });

        return await this.assignmentRepo.save(assignment);
    }

    /**
     * 프로젝트 배정 활성화 (프로젝트 시작)
     */
    async activateProjectAssignment(assignmentId: string) {
        await this.assignmentRepo.update(assignmentId, {
            status: AssignmentStatus.ACTIVE,
        });
    }

    /**
     * 프로젝트 배정 완료 처리
     */
    async completeProjectAssignment(assignmentId: string, completionDate: Date = new Date(), actualHours?: number) {
        const updateData: any = {
            status: AssignmentStatus.COMPLETED,
            assignmentEndDate: completionDate,
        };

        if (actualHours !== undefined) {
            updateData.actualHours = actualHours;
        }

        await this.assignmentRepo.update(assignmentId, updateData);
    }

    // =====================================
    // 프로젝트 분석
    // =====================================

    /**
     * 직원의 프로젝트 워크로드 분석
     */
    async getEmployeeWorkload(employeeId: string, targetDate: Date = new Date()) {
        const assignments = await this.assignmentRepo
            .createQueryBuilder('assignment')
            .leftJoinAndSelect('assignment.project', 'project')
            .leftJoinAndSelect('assignment.projectRole', 'role')
            .where('assignment.employeeId = :employeeId', { employeeId })
            .andWhere('assignment.status = :status', { status: AssignmentStatus.ACTIVE })
            .andWhere('assignment.assignmentStartDate <= :targetDate', { targetDate })
            .andWhere('(assignment.assignmentEndDate IS NULL OR assignment.assignmentEndDate >= :targetDate)', {
                targetDate,
            })
            .getMany();

        const totalAllocation = assignments.reduce((sum, assignment) => sum + assignment.allocationPercentage, 0);

        return {
            assignments,
            totalAllocation,
            isOverloaded: totalAllocation > 100,
            availableCapacity: Math.max(0, 100 - totalAllocation),
        };
    }

    /**
     * 프로젝트별 인력 현황
     */
    async getProjectResourceSummary() {
        return await this.assignmentRepo
            .createQueryBuilder('assignment')
            .leftJoin('assignment.project', 'project')
            .leftJoin('assignment.projectRole', 'role')
            .select([
                'project.id as projectId',
                'project.projectName as projectName',
                'project.status as projectStatus',
                'COUNT(*) as memberCount',
                'SUM(assignment.allocationPercentage) as totalAllocation',
                'AVG(assignment.allocationPercentage) as avgAllocation',
                'SUM(assignment.estimatedHours) as totalEstimatedHours',
                'SUM(assignment.actualHours) as totalActualHours',
            ])
            .where('assignment.status = :status', { status: AssignmentStatus.ACTIVE })
            .groupBy('project.id, project.projectName, project.status')
            .orderBy('totalAllocation', 'DESC')
            .getRawMany();
    }

    /**
     * 역할별 인력 분포
     */
    async getRoleDistribution() {
        return await this.assignmentRepo
            .createQueryBuilder('assignment')
            .leftJoin('assignment.projectRole', 'role')
            .select([
                'role.roleName as roleName',
                'role.roleType as roleType',
                'COUNT(*) as assignmentCount',
                'AVG(assignment.allocationPercentage) as avgAllocation',
            ])
            .where('assignment.status = :status', { status: AssignmentStatus.ACTIVE })
            .groupBy('role.roleName, role.roleType')
            .orderBy('assignmentCount', 'DESC')
            .getRawMany();
    }

    /**
     * 과부하 직원 조회 (투입률 100% 초과)
     */
    async getOverloadedEmployees(threshold: number = 100) {
        const result = await this.assignmentRepo
            .createQueryBuilder('assignment')
            .leftJoin('assignment.employee', 'employee')
            .select([
                'employee.id as employeeId',
                'employee.name as employeeName',
                'employee.employeeNumber as employeeNumber',
                'SUM(assignment.allocationPercentage) as totalAllocation',
                'COUNT(*) as projectCount',
            ])
            .where('assignment.status = :status', { status: AssignmentStatus.ACTIVE })
            .groupBy('employee.id, employee.name, employee.employeeNumber')
            .having('SUM(assignment.allocationPercentage) > :threshold', { threshold })
            .orderBy('totalAllocation', 'DESC')
            .getRawMany();

        return result;
    }

    // =====================================
    // 프로젝트 역할 관리
    // =====================================

    /**
     * 프로젝트 역할 초기화 (샘플 데이터)
     */
    async initializeProjectRoles() {
        const roles = [
            // Leadership Roles
            {
                roleName: '프로젝트 매니저',
                roleCode: 'PM',
                roleType: ProjectRoleType.LEADERSHIP,
                level: 100,
                hasProjectAuthority: true,
                approvalLevel: 5,
                description: '프로젝트 전체를 관리하고 책임지는 리더',
                requiredSkills: ['리더십', '의사소통', '프로젝트 관리'],
                responsibilities: ['프로젝트 계획 수립', '팀 관리', '위험 관리', '이해관계자 소통'],
            },
            {
                roleName: '테크리드',
                roleCode: 'TECH_LEAD',
                roleType: ProjectRoleType.LEADERSHIP,
                level: 90,
                hasProjectAuthority: true,
                approvalLevel: 4,
                description: '기술적 리더십을 담당하는 역할',
                requiredSkills: ['기술 전문성', '아키텍처 설계', '멘토링'],
                responsibilities: ['기술 결정', '코드 리뷰', '팀 기술 지도'],
            },

            // Advisory Roles
            {
                roleName: '자문위원',
                roleCode: 'ADVISOR',
                roleType: ProjectRoleType.ADVISORY,
                level: 80,
                hasProjectAuthority: false,
                approvalLevel: 3,
                description: '전문적 조언을 제공하는 역할',
                requiredSkills: ['도메인 전문성', '컨설팅'],
                responsibilities: ['전문 자문', '방향성 제시', '검토 의견 제공'],
            },

            // Technical Roles
            {
                roleName: '선임개발자',
                roleCode: 'SR_DEV',
                roleType: ProjectRoleType.TECHNICAL,
                level: 70,
                hasProjectAuthority: false,
                approvalLevel: 2,
                description: '고급 개발 업무를 담당하는 개발자',
                requiredSkills: ['고급 프로그래밍', '시스템 설계'],
                responsibilities: ['핵심 기능 개발', '기술 연구', '주니어 멘토링'],
            },
            {
                roleName: '개발자',
                roleCode: 'DEVELOPER',
                roleType: ProjectRoleType.TECHNICAL,
                level: 50,
                hasProjectAuthority: false,
                approvalLevel: 1,
                description: '소프트웨어 개발을 담당하는 역할',
                requiredSkills: ['프로그래밍', '디버깅'],
                responsibilities: ['기능 개발', '테스트 작성', '버그 수정'],
            },

            // Business Roles
            {
                roleName: '비즈니스 분석가',
                roleCode: 'BA',
                roleType: ProjectRoleType.BUSINESS,
                level: 60,
                hasProjectAuthority: false,
                approvalLevel: 2,
                description: '비즈니스 요구사항을 분석하고 정리하는 역할',
                requiredSkills: ['비즈니스 분석', '요구사항 정의'],
                responsibilities: ['요구사항 수집', '비즈니스 프로세스 분석', '사용자 스토리 작성'],
            },

            // Support Roles
            {
                roleName: 'UI/UX 디자이너',
                roleCode: 'DESIGNER',
                roleType: ProjectRoleType.SUPPORT,
                level: 60,
                hasProjectAuthority: false,
                approvalLevel: 1,
                description: '사용자 인터페이스 및 경험을 설계하는 역할',
                requiredSkills: ['디자인', 'UX 리서치', '프로토타이핑'],
                responsibilities: ['UI 설계', 'UX 연구', '프로토타입 제작'],
            },

            // Quality Roles
            {
                roleName: 'QA 엔지니어',
                roleCode: 'QA',
                roleType: ProjectRoleType.QUALITY,
                level: 50,
                hasProjectAuthority: false,
                approvalLevel: 1,
                description: '품질 보증을 담당하는 역할',
                requiredSkills: ['테스트 설계', '자동화 테스트'],
                responsibilities: ['테스트 계획 수립', '테스트 실행', '품질 검증'],
            },
        ];

        for (const roleData of roles) {
            const exists = await this.projectRoleRepo.findOne({
                where: { roleCode: roleData.roleCode },
            });

            if (!exists) {
                await this.projectRoleRepo.save(this.projectRoleRepo.create(roleData));
            }
        }
    }

    /**
     * 프로젝트 상태별 통계
     */
    async getProjectStatusStatistics() {
        return await this.projectRepo
            .createQueryBuilder('project')
            .select(['project.status as status', 'COUNT(*) as count', 'AVG(project.progressPercentage) as avgProgress'])
            .where('project.isActive = :isActive', { isActive: true })
            .groupBy('project.status')
            .getRawMany();
    }
}

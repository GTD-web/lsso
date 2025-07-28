import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
    Unique,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Project } from './project.entity';
import { ProjectRole } from './project-role.entity';

export enum AssignmentStatus {
    ASSIGNED = 'assigned', // 배정됨
    ACTIVE = 'active', // 활동중
    COMPLETED = 'completed', // 완료
    WITHDRAWN = 'withdrawn', // 철수
}

export enum CommitmentLevel {
    FULL_TIME = 'full_time', // 전담 (100%)
    PART_TIME = 'part_time', // 파트타임 (50% 이하)
    CONSULTING = 'consulting', // 컨설팅 (필요시)
    SUPPORTING = 'supporting', // 지원 (10-20%)
}

@Entity('employee_project_assignments')
@Unique(['employeeId', 'projectId']) // 한 프로젝트에서 한 직원은 하나의 역할만
@Index(['employeeId'])
@Index(['projectId'])
@Index(['projectRoleId'])
@Index(['employeeId', 'status'])
@Index(['projectId', 'status'])
@Index(['assignmentStartDate'])
export class EmployeeProjectAssignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '직원 ID', type: 'uuid' })
    employeeId: string;

    @Column({ comment: '프로젝트 ID', type: 'uuid' })
    projectId: string;

    @Column({ comment: '프로젝트 역할 ID', type: 'uuid' })
    projectRoleId: string;

    @Column({ comment: '배정 시작일', type: 'date' })
    assignmentStartDate: Date;

    @Column({ comment: '배정 종료일', type: 'date', nullable: true })
    assignmentEndDate?: Date;

    @Column({
        comment: '배정 상태',
        type: 'enum',
        enum: AssignmentStatus,
        default: AssignmentStatus.ASSIGNED,
    })
    status: AssignmentStatus;

    @Column({
        comment: '참여 수준',
        type: 'enum',
        enum: CommitmentLevel,
        default: CommitmentLevel.PART_TIME,
    })
    commitmentLevel: CommitmentLevel;

    @Column({ comment: '투입률 (%)', type: 'decimal', precision: 5, scale: 2, default: 50 })
    allocationPercentage: number;

    @Column({ comment: '시간당 단가', type: 'decimal', precision: 10, scale: 2, nullable: true })
    hourlyRate?: number;

    @Column({ comment: '예상 투입 시간', type: 'integer', nullable: true })
    estimatedHours?: number;

    @Column({ comment: '실제 투입 시간', type: 'integer', default: 0 })
    actualHours: number;

    @Column({ comment: '배정 이유', nullable: true })
    reason?: string;

    @Column({ comment: '특별 권한', type: 'jsonb', nullable: true })
    specialPermissions?: string[];

    @Column({ comment: '성과 목표', type: 'jsonb', nullable: true })
    performanceTargets?: any;

    @Column({ comment: '비고', nullable: true })
    notes?: string;

    @Column({ comment: '생성자 ID', type: 'uuid', nullable: true })
    createdBy?: string;

    @Column({ comment: '수정자 ID', type: 'uuid', nullable: true })
    updatedBy?: string;

    // 관계 설정 (eager loading으로 자주 함께 조회)
    @ManyToOne(() => Employee, { eager: true })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @ManyToOne(() => Project, { eager: true })
    @JoinColumn({ name: 'projectId' })
    project: Project;

    @ManyToOne(() => ProjectRole, { eager: true })
    @JoinColumn({ name: 'projectRoleId' })
    projectRole: ProjectRole;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // 비즈니스 로직 헬퍼

    /**
     * 프로젝트 리더 여부 확인
     */
    get isProjectLeader(): boolean {
        return this.projectRole?.hasProjectAuthority && this.projectRole?.level >= 90;
    }

    /**
     * 전담 참여 여부 확인
     */
    get isFullTimeAssignment(): boolean {
        return this.commitmentLevel === CommitmentLevel.FULL_TIME || this.allocationPercentage >= 80;
    }

    /**
     * 활성 배정 여부 확인
     */
    get isActiveAssignment(): boolean {
        return (
            this.status === AssignmentStatus.ACTIVE &&
            new Date() >= this.assignmentStartDate &&
            (!this.assignmentEndDate || new Date() <= this.assignmentEndDate)
        );
    }
}

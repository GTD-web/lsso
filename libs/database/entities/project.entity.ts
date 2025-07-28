import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Department } from './department.entity';

export enum ProjectStatus {
    PLANNING = 'planning', // 기획중
    ACTIVE = 'active', // 진행중
    ON_HOLD = 'on_hold', // 보류
    COMPLETED = 'completed', // 완료
    CANCELLED = 'cancelled', // 취소
}

export enum ProjectPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical',
}

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '프로젝트명' })
    projectName: string;

    @Column({ unique: true, comment: '프로젝트 코드' })
    projectCode: string;

    @Column({ comment: '프로젝트 설명', type: 'text', nullable: true })
    description?: string;

    @Column({
        comment: '프로젝트 상태',
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.PLANNING,
    })
    status: ProjectStatus;

    @Column({
        comment: '우선순위',
        type: 'enum',
        enum: ProjectPriority,
        default: ProjectPriority.MEDIUM,
    })
    priority: ProjectPriority;

    @Column({ comment: '시작일', type: 'date' })
    startDate: Date;

    @Column({ comment: '종료일', type: 'date' })
    endDate: Date;

    @Column({ comment: '실제 시작일', type: 'date', nullable: true })
    actualStartDate?: Date;

    @Column({ comment: '실제 종료일', type: 'date', nullable: true })
    actualEndDate?: Date;

    @Column({ comment: '예산', type: 'decimal', precision: 15, scale: 2, nullable: true })
    budget?: number;

    @Column({ comment: '주관 부서 ID', type: 'uuid', nullable: true })
    ownerDepartmentId?: string;

    @Column({ comment: '프로젝트 매니저 ID', type: 'uuid', nullable: true })
    projectManagerId?: string;

    @Column({ comment: '진행률 (%)', type: 'decimal', precision: 5, scale: 2, default: 0 })
    progressPercentage: number;

    @Column({ comment: '목표 및 산출물', type: 'jsonb', nullable: true })
    objectives?: any;

    @Column({ comment: '리스크 정보', type: 'jsonb', nullable: true })
    risks?: any;

    @Column({ comment: '활성 여부', default: true })
    isActive: boolean;

    @Column({ comment: '생성자 ID', type: 'uuid', nullable: true })
    createdBy?: string;

    @Column({ comment: '수정자 ID', type: 'uuid', nullable: true })
    updatedBy?: string;

    // 관계 설정
    @ManyToOne(() => Department, { nullable: true })
    @JoinColumn({ name: 'ownerDepartmentId' })
    ownerDepartment?: Department;

    @ManyToOne(() => Employee, { nullable: true })
    @JoinColumn({ name: 'projectManagerId' })
    projectManager?: Employee;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

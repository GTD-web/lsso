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
import { Employee } from '../employee.entity';
import { Department } from '../department.entity';
import { Position } from '../position.entity';

export enum ManagerType {
    DIRECT = 'direct', // 직접 상사
    FUNCTIONAL = 'functional', // 기능적 상사
    PROJECT = 'project', // 프로젝트 리더
    TEMPORARY = 'temporary', // 임시 상사
    DEPUTY = 'deputy', // 대리 권한
}

@Entity('employee_department_positions')
@Unique(['employeeId', 'departmentId'])
@Index(['employeeId'])
@Index(['departmentId'])
@Index(['positionId'])
@Index(['directManagerId'])
@Index(['employeeId', 'isActive'])
@Index(['departmentId', 'isActive'])
export class EnhancedEmployeeDepartmentPosition {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '직원 ID', type: 'uuid' })
    employeeId: string;

    @Column({ comment: '부서 ID', type: 'uuid' })
    departmentId: string;

    @Column({ comment: '직책 ID', type: 'uuid' })
    positionId: string;

    // ===== 매니저 관계 통합 관리 =====
    @Column({ comment: '직접 상사 ID', type: 'uuid', nullable: true })
    directManagerId?: string;

    @Column({
        comment: '관리 관계 타입',
        type: 'enum',
        enum: ManagerType,
        default: ManagerType.DIRECT,
    })
    managerType: ManagerType;

    @Column({ comment: '위임 권한 레벨', nullable: true })
    delegatedAuthorityLevel?: number;

    // ===== 기존 필드들 =====
    @Column({ comment: '시작일', type: 'date' })
    startDate: Date;

    @Column({ comment: '종료일', type: 'date', nullable: true })
    endDate?: Date;

    @Column({ comment: '활성 여부', default: true })
    isActive: boolean;

    @Column({ comment: '주 소속 여부 (메인 부서)', default: true })
    isPrimary: boolean;

    @Column({ comment: '임시 발령 여부', default: false })
    isTemporary: boolean;

    @Column({ comment: '발령 이유', nullable: true })
    reason?: string;

    @Column({ comment: '권한 레벨', nullable: true })
    authorityLevel?: number;

    @Column({ comment: '비고', nullable: true })
    notes?: string;

    @Column({ comment: '생성자 ID', type: 'uuid', nullable: true })
    createdBy?: string;

    @Column({ comment: '수정자 ID', type: 'uuid', nullable: true })
    updatedBy?: string;

    // ===== 관계 설정 =====
    @ManyToOne(() => Employee, { eager: true })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @ManyToOne(() => Department, { eager: true })
    @JoinColumn({ name: 'departmentId' })
    department: Department;

    @ManyToOne(() => Position, { eager: true })
    @JoinColumn({ name: 'positionId' })
    position: Position;

    // 직접 상사 관계
    @ManyToOne(() => Employee, { nullable: true })
    @JoinColumn({ name: 'directManagerId' })
    directManager?: Employee;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // ===== 비즈니스 로직 헬퍼 =====

    /**
     * 부서장인지 확인
     */
    get isDepartmentHead(): boolean {
        return this.position?.hasManagementAuthority && this.position?.level >= 80; // 부서장 레벨 이상
    }

    /**
     * 팀장 이상인지 확인
     */
    get isTeamLevelOrAbove(): boolean {
        return this.position?.hasManagementAuthority && this.position?.level >= 60; // 팀장 레벨 이상
    }

    /**
     * 관리 권한이 있는지 확인
     */
    get hasManagementAuthority(): boolean {
        return this.position?.hasManagementAuthority || false;
    }
}

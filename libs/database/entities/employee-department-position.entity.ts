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
import { Department } from './department.entity';
import { Position } from './position.entity';

export enum ManagerType {
    DIRECT = 'direct', // 직접 상사
    FUNCTIONAL = 'functional', // 기능적 상사
    PROJECT = 'project', // 프로젝트 리더
    TEMPORARY = 'temporary', // 임시 상사
    DEPUTY = 'deputy', // 대리 권한
}

@Entity('employee_department_positions')
@Unique(['employeeId', 'departmentId']) // 한 직원이 같은 부서에서는 하나의 직책만 가능
@Index(['employeeId'])
@Index(['departmentId'])
@Index(['positionId'])
@Index(['employeeId', 'isActive'])
@Index(['departmentId', 'isActive'])
export class EmployeeDepartmentPosition {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '직원 ID', type: 'uuid' })
    employeeId: string;

    @Column({ comment: '부서 ID', type: 'uuid' })
    departmentId: string;

    @Column({ comment: '직책 ID', type: 'uuid' })
    positionId: string;

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

    // 관계 설정 (eager loading으로 자주 함께 조회되는 데이터)
    @ManyToOne(() => Employee, { eager: true })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @ManyToOne(() => Department, { eager: true })
    @JoinColumn({ name: 'departmentId' })
    department: Department;

    @ManyToOne(() => Position, { eager: true })
    @JoinColumn({ name: 'positionId' })
    position: Position;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Employee } from '../employee/employee.entity';
import { Rank } from '../rank/rank.entity';

export enum PromotionType {
    INITIAL = 'initial', // 최초 입사시 직급 부여
    PROMOTION = 'promotion', // 승진
    DEMOTION = 'demotion', // 강등
    ADJUSTMENT = 'adjustment', // 직급 조정
}

@Entity('employee_rank_histories')
@Index(['employeeId', 'rankId'])
export class EmployeeRankHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '직원 ID', type: 'uuid' })
    employeeId: string;

    @Column({ comment: '직급 ID', type: 'uuid' })
    rankId: string;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // 관계 설정
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'employeeId' })
    employee: Promise<Employee>;

    @ManyToOne(() => Rank)
    @JoinColumn({ name: 'rankId' })
    rank: Promise<Rank>;
}

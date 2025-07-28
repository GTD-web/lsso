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
import { Employee } from './employee.entity';
import { Rank } from './rank.entity';

export enum PromotionType {
    INITIAL = 'initial', // 최초 입사시 직급 부여
    PROMOTION = 'promotion', // 승진
    DEMOTION = 'demotion', // 강등
    ADJUSTMENT = 'adjustment', // 직급 조정
}

@Entity('employee_rank_histories')
@Index(['employeeId', 'rankId'])
@Index(['employeeId', 'startDate'])
@Index(['employeeId', 'isActive'])
@Index(['promotionDate'])
export class EmployeeRankHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '직원 ID', type: 'uuid' })
    employeeId: string;

    @Column({ comment: '직급 ID', type: 'uuid' })
    rankId: string;

    @Column({ comment: '시작일', type: 'date' })
    startDate: Date;

    @Column({ comment: '종료일', type: 'date', nullable: true })
    endDate?: Date;

    @Column({ comment: '활성 여부', default: true })
    isActive: boolean;

    @Column({
        comment: '승진 유형',
        type: 'enum',
        enum: PromotionType,
        default: PromotionType.INITIAL,
    })
    promotionType: PromotionType;

    @Column({ comment: '승진일 (발령일)', type: 'date' })
    promotionDate: Date;

    @Column({ comment: '평가 점수', type: 'decimal', precision: 5, scale: 2, nullable: true })
    evaluationScore?: number;

    @Column({ comment: '승진 사유', nullable: true })
    reason?: string;

    @Column({ comment: '이전 직급 ID', type: 'uuid', nullable: true })
    previousRankId?: string;

    @Column({ comment: '다음 예상 승진일', type: 'date', nullable: true })
    expectedNextPromotionDate?: Date;

    @Column({ comment: '승인자 ID', type: 'uuid', nullable: true })
    approvedBy?: string;

    @Column({ comment: '발령 번호', nullable: true })
    appointmentNumber?: string;

    @Column({ comment: '비고', nullable: true })
    notes?: string;

    @Column({ comment: '생성자 ID', type: 'uuid', nullable: true })
    createdBy?: string;

    @Column({ comment: '수정자 ID', type: 'uuid', nullable: true })
    updatedBy?: string;

    // 관계 설정
    @ManyToOne(() => Employee, { lazy: true })
    @JoinColumn({ name: 'employeeId' })
    employee: Promise<Employee>;

    @ManyToOne(() => Rank, { lazy: true })
    @JoinColumn({ name: 'rankId' })
    rank: Promise<Rank>;

    @ManyToOne(() => Rank, { lazy: true })
    @JoinColumn({ name: 'previousRankId' })
    previousRank?: Promise<Rank>;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

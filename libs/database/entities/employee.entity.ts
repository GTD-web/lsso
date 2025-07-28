import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Gender, EmployeeStatus } from '../../common/enums';
import { Rank } from './rank.entity';

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, comment: '사번' })
    employeeNumber: string;

    @Column({ comment: '이름' })
    name: string;

    @Column({ unique: true, comment: '이메일' })
    email: string;

    @Column({ comment: '비밀번호', nullable: true })
    password?: string;

    @Column({ comment: '전화번호', nullable: true })
    phoneNumber?: string;

    @Column({ comment: '생년월일', type: 'date', nullable: true })
    dateOfBirth?: Date;

    @Column({
        comment: '성별',
        type: 'enum',
        enum: Gender,
        nullable: true,
    })
    gender?: Gender;

    @Column({ comment: '입사일', type: 'date' })
    hireDate: Date;

    @Column({
        comment: '재직 상태',
        type: 'enum',
        enum: EmployeeStatus,
        default: EmployeeStatus.Active,
    })
    status: EmployeeStatus;

    // 부서, 직책 관계는 중간테이블로 분리
    // 직급은 현재 상태 + 이력 관리 혼합 방식

    @Column({ comment: '현재 직급 ID', type: 'uuid', nullable: true })
    currentRankId?: string;

    @ManyToOne(() => Rank, { eager: true })
    @JoinColumn({ name: 'currentRankId' })
    currentRank?: Rank;

    @Column({ comment: '퇴사일', type: 'date', nullable: true })
    terminationDate?: Date;

    @Column({ comment: '초기 비밀번호 설정 여부', default: false })
    isInitialPasswordSet: boolean;

    // 매니저 관계는 EmployeeDepartmentPosition에서 관리

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

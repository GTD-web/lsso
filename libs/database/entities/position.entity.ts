import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('positions')
export class Position {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '직책명 (예: 부서장, 파트장, 팀장, 직원)' })
    positionTitle: string;

    @Column({ unique: true, comment: '직책 코드 (예: DEPT_HEAD, PART_HEAD, TEAM_LEADER, STAFF)' })
    positionCode: string;

    @Column({ comment: '직책 레벨 (높을수록 상위 직책)' })
    level: number;

    @Column({ comment: '관리 권한 여부', default: false })
    hasManagementAuthority: boolean;

    @Column({ comment: '승인 권한 레벨', default: 0 })
    approvalLevel: number;

    @Column({ comment: '직책 설명', nullable: true })
    description?: string;

    @Column({ comment: '활성 여부', default: true })
    isActive: boolean;

    // 직원 관계는 이력 테이블로 분리
    // 현재 직책은 EmployeeDepartmentPosition 테이블에서 관리

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

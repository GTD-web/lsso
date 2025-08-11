import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ranks')
export class Rank {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '직급명' })
    rankName: string;

    @Column({ unique: true, comment: '직급 코드' })
    rankCode: string;

    @Column({ comment: '직급 레벨 (낮을수록 상위 직급)' })
    level: number;
    // 직원 관계는 이력 테이블로 분리
}

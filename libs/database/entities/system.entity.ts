import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';

@Entity('systems')
export class System {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, comment: '클라이언트 ID' })
    clientId: string;

    @Column({ comment: '클라이언트 시크릿' })
    clientSecret: string;

    @Column({ unique: true, comment: '시스템 이름' })
    name: string;

    @Column({ nullable: true, comment: '시스템 설명' })
    description: string;

    @Column({ comment: '도메인' })
    domain: string;

    @Column({
        type: 'jsonb',
        default: [],
        comment: '허용된 오리진 목록',
    })
    allowedOrigin: string[];

    @Column({ nullable: true, comment: '헬스체크 URL' })
    healthCheckUrl: string;

    @Column({
        default: true,
        comment: '활성화 상태',
    })
    isActive: boolean;

    @CreateDateColumn({ comment: '생성일시' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일시' })
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제일시' })
    deletedAt: Date;
}

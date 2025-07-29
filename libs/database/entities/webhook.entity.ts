import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('webhooks')
export class Webhook {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '웹훅 이름' })
    webhookName: string;

    @Column({ comment: '설명', nullable: true })
    description?: string;

    @Column({ comment: '대상 URL' })
    targetUrl: string;

    @Column({ comment: '이벤트 유형' })
    eventType: string;

    @Column({ comment: '엔티티 유형' })
    entityType: string;

    @Column({ comment: '시크릿 키', nullable: true })
    secretKey?: string;

    @Column({
        comment: '헤더 정보 (JSON 형식)',
        type: 'jsonb',
        nullable: true,
    })
    headers?: Record<string, any>;

    @Column({
        comment: '활성화 상태',
        type: 'boolean',
        default: true,
    })
    isActive: boolean;

    @Column({
        comment: '재시도 횟수',
        type: 'int',
        default: 3,
    })
    retryCount: number;

    @Column({
        comment: '타임아웃 시간(초)',
        type: 'int',
        default: 30,
    })
    timeoutSeconds: number;

    @CreateDateColumn({ comment: '생성일시' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일시' })
    updatedAt: Date;
}

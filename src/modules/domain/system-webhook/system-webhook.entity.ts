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

@Entity('system_webhooks')
@Index(['systemId', 'webhookId'], { unique: true })
@Index(['systemId'])
@Index(['webhookId'])
export class SystemWebhook {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', comment: '시스템 ID' })
    systemId: string;

    @Column({ type: 'uuid', comment: '웹훅 ID' })
    webhookId: string;

    @Column({
        nullable: true,
        comment: '마지막 실행일시',
    })
    lastExecutedAt?: Date;

    @Column({
        default: 0,
        comment: '총 실행 횟수',
    })
    executionCount: number;

    @Column({
        default: 0,
        comment: '성공 횟수',
    })
    successCount: number;

    @Column({
        default: 0,
        comment: '실패 횟수',
    })
    failureCount: number;

    @CreateDateColumn({ comment: '생성일시' })
    createdAt: Date;

    // 관계 설정
    @ManyToOne('System', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'systemId' })
    system: any;

    @ManyToOne('Webhook', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'webhookId' })
    webhook: any;
}

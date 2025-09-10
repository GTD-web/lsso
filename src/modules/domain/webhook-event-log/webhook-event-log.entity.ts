import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';

@Entity('webhook_event_logs')
@Index(['webhookId'])
@Index(['eventType'])
@Index(['entityId'])
@Index(['isSuccess'])
@Index(['createdAt'])
export class WebhookEventLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', comment: '웹훅 ID' })
    webhookId: string;

    @Column({ comment: '이벤트 유형' })
    eventType: string;

    @Column({ type: 'uuid', comment: '엔티티 ID' })
    entityId: string;

    @Column({
        comment: '페이로드 데이터 (JSON 형식)',
        type: 'jsonb',
    })
    payload: Record<string, any>;

    @Column({
        comment: '응답 상태 코드',
        type: 'int',
        nullable: true,
    })
    responseCode?: number;

    @Column({
        comment: '응답 본문',
        type: 'text',
        nullable: true,
    })
    responseBody?: string;

    @Column({
        comment: '시도 횟수',
        type: 'int',
        default: 1,
    })
    attemptCount: number;

    @Column({
        comment: '성공 여부',
        type: 'boolean',
        default: false,
    })
    isSuccess: boolean;

    @Column({
        comment: '마지막 시도 시간',
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    })
    lastAttemptAt: Date;

    @CreateDateColumn({ comment: '생성일시' })
    createdAt: Date;

    // 관계 설정
    @ManyToOne('Webhook', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'webhookId' })
    webhook: any;
}

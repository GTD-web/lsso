import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('fcm_tokens')
@Index(['fcmToken'], { unique: true })
@Index(['isActive'])
export class FcmToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', comment: 'FCM 토큰 값', unique: true })
    fcmToken: string;

    @Column({
        type: 'varchar',
        length: 50,
        comment: '디바이스 타입 (예: lsms-prod, portal-prod)',
    })
    deviceType: string;

    @Column({ type: 'text', comment: '디바이스 정보', default: 'mobile' })
    deviceInfo: string;

    @Column({ type: 'boolean', comment: '활성화 상태', default: true })
    isActive: boolean;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

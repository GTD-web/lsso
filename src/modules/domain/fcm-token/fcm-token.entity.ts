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
        comment: '디바이스 타입 (예: android, ios, pc, web)',
        default: 'pc',
    })
    deviceType: string;

    @Column({ type: 'json', comment: '디바이스 정보', nullable: true })
    deviceInfo?: {
        model?: string;
        osVersion?: string;
        appVersion?: string;
        userAgent?: string;
        platform?: string;
        [key: string]: any;
    };

    @Column({ type: 'boolean', comment: '활성화 상태', default: true })
    isActive: boolean;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

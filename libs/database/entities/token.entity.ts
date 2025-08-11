import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '액세스 토큰' })
    accessToken: string;

    @Column({ comment: '토큰 만료일시' })
    tokenExpiresAt: Date;

    @Column({ comment: '리프레시 토큰', nullable: true })
    refreshToken?: string;

    @Column({ comment: '리프레시 토큰 만료일시', nullable: true })
    refreshTokenExpiresAt?: Date;

    @Column({
        nullable: true,
        comment: '클라이언트 정보 (브라우저, 앱 등)',
    })
    clientInfo?: string;

    @Column({
        nullable: true,
        comment: 'IP 주소',
    })
    ipAddress?: string;

    @Column({ nullable: true })
    lastAccess: Date;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ comment: '생성일시' })
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

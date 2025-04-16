import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Admin } from './admin.entity';

@Entity('refresh_tokens')
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    token: string;

    @Column()
    adminId: string;

    @ManyToOne(() => Admin, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'adminId' })
    admin: Admin;

    @Column()
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: false })
    isRevoked: boolean;

    @Column({ nullable: true })
    userAgent: string;

    @Column({ nullable: true })
    ip: string;

    isExpired(): boolean {
        return this.expiresAt < new Date();
    }
}

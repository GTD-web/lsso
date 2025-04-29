import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { System } from 'src/systems/entities/system.entity';

@Entity('tokens')
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    systemId: string;

    @ManyToOne(() => User, (user) => user.tokens)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => System, (system) => system.tokens)
    @JoinColumn({ name: 'systemId' })
    system: System;

    @Column()
    accessToken: string;

    @Column({ nullable: true })
    refreshToken: string;

    @Column({ nullable: true })
    tokenFingerprint: string;

    @Column()
    tokenExpiresAt: Date;

    @Column({ nullable: true })
    refreshTokenExpiresAt: Date;

    @Column({ nullable: true })
    lastAccess: Date;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

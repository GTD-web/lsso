import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';
import { Token } from 'src/tokens/entities/token.entity';

@Entity('systems')
export class System {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    // @Column({ unique: true })
    // publicKey: string;

    // @Column({ unique: true })
    // secretKey: string;

    @Column({ type: 'jsonb', default: [] })
    allowedOrigin: string[];

    @Column({ nullable: true })
    healthCheckUrl: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Token, (token) => token.system)
    tokens: Token[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

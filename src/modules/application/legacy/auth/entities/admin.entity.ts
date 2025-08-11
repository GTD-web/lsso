import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import { Token } from '../../../../../../libs/database/entities/token.entity';
import * as bcrypt from 'bcrypt';

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        // 비밀번호가 변경되었거나 새로 생성된 경우에만 해싱
        if (this.password) {
            // 이미 해시된 패스워드인지 확인 ($2b$로 시작하는 bcrypt 해시)
            if (!this.password.startsWith('$2b$')) {
                const salt = await bcrypt.genSalt();
                this.password = await bcrypt.hash(this.password, salt);
            }
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Token } from './token.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, comment: '사번' })
    employeeNumber: string;

    @Column({ comment: '이름' })
    name: string;

    @Column({ unique: true, comment: '이메일' })
    email: string;

    @Column({ comment: '비밀번호' })
    password: string;

    @Column({ comment: '전화번호', nullable: true })
    phoneNumber: string;

    @Column({ comment: '생년월일', nullable: true })
    dateOfBirth: Date;

    @Column({ comment: '성별', nullable: true })
    gender: string;

    @Column({ comment: '입사일', nullable: true })
    hireDate: Date;

    @Column({ comment: '재직 상태', nullable: true })
    status: string;

    @Column({ comment: '부서', nullable: true })
    department: string;

    @Column({ comment: '직위', nullable: true })
    position: string;

    @Column({ comment: '직급', nullable: true })
    rank: string;

    @Column({ comment: '초기 비밀번호 설정 여부', default: false })
    isInitialPasswordSet: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[];
}

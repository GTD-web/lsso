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
import { Employee } from './employee.entity';
import { Token } from './token.entity';

@Entity('employee_tokens')
@Index(['employeeId', 'tokenId'], { unique: true })
@Index(['employeeId'])
@Index(['tokenId'])
export class EmployeeToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', comment: '직원 ID' })
    employeeId: string;

    @Column({ type: 'uuid', comment: '토큰 ID' })
    tokenId: string;

    // 관계 설정
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @ManyToOne(() => Token)
    @JoinColumn({ name: 'tokenId' })
    token: Token;
}

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
import { Employee } from '../employee/employee.entity';
import { FcmToken } from '../fcm-token/fcm-token.entity';

@Entity('employee_fcm_tokens')
@Index(['employeeId', 'fcmTokenId'], { unique: true })
@Index(['employeeId'])
@Index(['fcmTokenId'])
export class EmployeeFcmToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', comment: '직원 ID' })
    employeeId: string;

    @Column({ type: 'uuid', comment: 'FCM 토큰 ID' })
    fcmTokenId: string;

    @CreateDateColumn({ comment: '연결 생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '연결 수정일' })
    updatedAt: Date;

    // 관계 설정
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @ManyToOne(() => FcmToken)
    @JoinColumn({ name: 'fcmTokenId' })
    fcmToken: FcmToken;
}

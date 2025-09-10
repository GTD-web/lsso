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
import { SystemRole } from '../system-role/system-role.entity';

@Entity('employee_system_roles')
@Index(['employeeId', 'systemRoleId'], { unique: true }) // 중복 역할 할당 방지
@Index(['employeeId'])
@Index(['systemRoleId'])
@Index(['createdAt'])
export class EmployeeSystemRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', comment: '직원 ID' })
    employeeId: string;

    @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @Column({ type: 'uuid', comment: '시스템 역할 ID' })
    systemRoleId: string;

    @ManyToOne(() => SystemRole, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'systemRoleId' })
    systemRole: SystemRole;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

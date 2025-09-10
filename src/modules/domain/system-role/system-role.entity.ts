import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
} from 'typeorm';
import { System } from '../system/system.entity';
import { EmployeeSystemRole } from '../employee-system-role/employee-system-role.entity';

@Entity('system_roles')
@Index(['systemId', 'roleCode'], { unique: true }) // 시스템별로 역할코드 유니크
@Index(['systemId', 'isActive'])
export class SystemRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', comment: '시스템 ID' })
    systemId: string;

    @ManyToOne(() => System, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'systemId' })
    system: System;

    @Column({ comment: '역할 이름' })
    roleName: string;

    @Column({ comment: '역할 코드' })
    roleCode: string;

    @Column({ nullable: true, comment: '역할 설명' })
    description?: string;

    @Column({
        type: 'jsonb',
        default: [],
        comment: '권한 목록',
    })
    permissions: string[];

    @Column({ comment: '정렬 순서', default: 0 })
    sortOrder: number;

    @Column({ default: true, comment: '활성화 상태' })
    isActive: boolean;

    @OneToMany(() => EmployeeSystemRole, (esr) => esr.systemRole)
    employeeSystemRoles?: EmployeeSystemRole[];

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

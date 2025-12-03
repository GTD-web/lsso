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

    @Column({ default: false, comment: '기본 역할 여부 (직원 생성 시 자동 할당)' })
    isDefault: boolean;

    @OneToMany(() => EmployeeSystemRole, (esr) => esr.systemRole)
    employeeSystemRoles?: EmployeeSystemRole[];

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;

    // ==================== Setter 메서드 ====================

    /**
     * 역할 이름을 설정한다
     */
    역할이름을설정한다(roleName: string): void {
        this.roleName = roleName;
    }

    /**
     * 역할 코드를 설정한다
     */
    역할코드를설정한다(roleCode: string): void {
        this.roleCode = roleCode;
    }

    /**
     * 역할 설명을 설정한다
     */
    역할설명을설정한다(description?: string): void {
        this.description = description;
    }

    /**
     * 권한 목록을 설정한다
     */
    권한목록을설정한다(permissions: string[]): void {
        this.permissions = permissions;
    }

    /**
     * 정렬 순서를 설정한다
     */
    정렬순서를설정한다(sortOrder: number): void {
        this.sortOrder = sortOrder;
    }

    /**
     * 활성화 상태를 설정한다
     */
    활성상태를설정한다(isActive: boolean): void {
        this.isActive = isActive;
    }

    /**
     * 기본 역할로 설정한다
     */
    기본역할로설정한다(): void {
        this.isDefault = true;
    }

    /**
     * 기본 역할 설정을 해제한다
     */
    기본역할설정을해제한다(): void {
        this.isDefault = false;
    }

    /**
     * 기본 역할 여부를 설정한다
     */
    기본역할여부를설정한다(isDefault: boolean): void {
        this.isDefault = isDefault;
    }

    /**
     * 비활성화한다
     */
    비활성화한다(): void {
        this.isActive = false;
    }
}

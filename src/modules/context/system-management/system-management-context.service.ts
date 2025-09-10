import { Injectable } from '@nestjs/common';
import { DomainSystemService } from '../../domain/system/system.service';
import { DomainWebhookService } from '../../domain/webhook/webhook.service';
import { DomainWebhookEventLogService } from '../../domain/webhook-event-log/webhook-event-log.service';
import { DomainSystemWebhookService } from '../../domain/system-webhook/system-webhook.service';
import { DomainSystemRoleService } from '../../domain/system-role/system-role.service';
import { DomainEmployeeSystemRoleService } from '../../domain/employee-system-role/employee-system-role.service';
import { SystemRole } from '../../domain/system-role/system-role.entity';
import { EmployeeSystemRole } from '../../domain/employee-system-role/employee-system-role.entity';

@Injectable()
export class SystemManagementContextService {
    constructor(
        private readonly 시스템서비스: DomainSystemService,
        private readonly 웹훅서비스: DomainWebhookService,
        private readonly 웹훅이벤트로그서비스: DomainWebhookEventLogService,
        private readonly 시스템웹훅서비스: DomainSystemWebhookService,
        private readonly 시스템역할서비스: DomainSystemRoleService,
        private readonly 직원시스템역할서비스: DomainEmployeeSystemRoleService,
    ) {}

    // ================================
    // 시스템 역할 관리
    // ================================

    async 시스템역할을_생성한다(data: {
        systemId: string;
        roleName: string;
        roleCode: string;
        description?: string;
        permissions?: string[];
        sortOrder?: number;
    }): Promise<SystemRole> {
        return this.시스템역할서비스.createSystemRole(data);
    }

    async 시스템의_역할목록을_조회한다(systemId: string): Promise<SystemRole[]> {
        return this.시스템역할서비스.findBySystemId(systemId);
    }

    async 시스템역할을_ID로_조회한다(systemRoleId: string): Promise<SystemRole | null> {
        return this.시스템역할서비스.findById(systemRoleId);
    }

    async 시스템역할을_수정한다(
        systemRoleId: string,
        data: {
            roleName?: string;
            roleCode?: string;
            description?: string;
            permissions?: string[];
            sortOrder?: number;
            isActive?: boolean;
        },
    ): Promise<SystemRole> {
        return this.시스템역할서비스.updateSystemRole(systemRoleId, data);
    }

    async 시스템역할을_비활성화한다(systemRoleId: string): Promise<void> {
        return this.시스템역할서비스.deactivateSystemRole(systemRoleId);
    }

    // ================================
    // 직원 시스템 역할 할당 관리
    // ================================

    async 직원에게_시스템역할을_할당한다(employeeId: string, systemRoleId: string): Promise<EmployeeSystemRole> {
        return this.직원시스템역할서비스.assignRole(employeeId, systemRoleId);
    }

    async 직원의_시스템역할을_해제한다(employeeId: string, systemRoleId: string): Promise<void> {
        return this.직원시스템역할서비스.unassignRole(employeeId, systemRoleId);
    }

    async 직원의_모든_시스템역할을_해제한다(employeeId: string): Promise<void> {
        return this.직원시스템역할서비스.unassignAllRolesByEmployeeId(employeeId);
    }

    async 시스템역할의_모든_할당을_해제한다(systemRoleId: string): Promise<void> {
        return this.직원시스템역할서비스.unassignAllRolesBySystemRoleId(systemRoleId);
    }

    // ================================
    // 조회 기능 (ID 기반)
    // ================================

    async 직원의_시스템역할목록을_조회한다(employeeId: string): Promise<EmployeeSystemRole[]> {
        return this.직원시스템역할서비스.findByEmployeeId(employeeId);
    }

    async 시스템역할의_직원목록을_조회한다(systemRoleId: string): Promise<EmployeeSystemRole[]> {
        return this.직원시스템역할서비스.findBySystemRoleId(systemRoleId);
    }

    async 직원이_시스템역할을_가지고있는지_확인한다(employeeId: string, systemRoleId: string): Promise<boolean> {
        const assignment = await this.직원시스템역할서비스.findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId);
        return !!assignment;
    }

    async 직원의_시스템역할ID목록을_조회한다(employeeId: string): Promise<string[]> {
        return this.직원시스템역할서비스.getSystemRoleIdsByEmployeeId(employeeId);
    }

    async 시스템역할의_직원ID목록을_조회한다(systemRoleId: string): Promise<string[]> {
        return this.직원시스템역할서비스.getEmployeeIdsBySystemRoleId(systemRoleId);
    }

    // ================================
    // 복합 조회 기능
    // ================================

    async 직원이_시스템에서_가진_역할목록을_조회한다(employeeId: string): Promise<SystemRole[]> {
        const employeeSystemRoles = await this.직원시스템역할서비스.findByEmployeeId(employeeId);
        const systemRoles = employeeSystemRoles.map((esr) => esr.systemRole!).filter(Boolean);
        return systemRoles;
    }

    // async 직원이_시스템의_특정권한을_가지고있는지_확인한다(
    //     employeeId: string,
    //     systemId: string,
    //     permission: string,
    // ): Promise<boolean> {
    //     const systemRoles = await this.직원이_시스템에서_가진_역할목록을_조회한다(employeeId, systemId);
    //     return systemRoles.some((role) => role.permissions.includes(permission));
    // }
}

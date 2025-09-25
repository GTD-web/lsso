import { Injectable, Logger } from '@nestjs/common';
import { DomainSystemService } from '../../domain/system/system.service';
import { DomainSystemRoleService } from '../../domain/system-role/system-role.service';
import { DomainEmployeeSystemRoleService } from '../../domain/employee-system-role/employee-system-role.service';
import { SystemRole } from '../../domain/system-role/system-role.entity';
import { EmployeeSystemRole } from '../../domain/employee-system-role/employee-system-role.entity';

@Injectable()
export class SystemManagementContextService {
    private readonly logger = new Logger(SystemManagementContextService.name);

    constructor(
        private readonly 시스템서비스: DomainSystemService,
        private readonly 시스템역할서비스: DomainSystemRoleService,
        private readonly 직원시스템역할서비스: DomainEmployeeSystemRoleService,
    ) {}

    /**
     * 시스템 역할을 생성하거나 기존 역할을 조회합니다
     */
    private async 시스템역할_생성_또는_조회(
        systemId: string,
        roleCode: string,
        roleName: string,
        description: string,
        permissions: string[],
    ): Promise<SystemRole> {
        try {
            // 기존 역할 조회 시도
            const existingRole = await this.시스템역할서비스.findBySystemIdAndRoleCode(systemId, roleCode);
            if (existingRole) {
                this.logger.log(`기존 시스템 역할 사용: ${roleCode}`);
                return existingRole;
            }
        } catch (error) {
            // 존재하지 않으면 새로 생성
        }

        // 새 역할 생성
        const newRole = await this.시스템역할서비스.createSystemRole({
            systemId,
            roleCode,
            roleName,
            description,
            permissions,
            sortOrder: 0,
        });

        this.logger.log(`새 시스템 역할 생성: ${roleCode}`);
        return newRole;
    }

    /**
     * 직원에게 역할을 할당합니다 (이미 할당된 경우 무시)
     */
    private async 역할_할당_시도(employeeId: string, systemRoleId: string): Promise<void> {
        try {
            // 이미 할당된 역할인지 확인
            const existing = await this.직원시스템역할서비스.findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId);
            if (existing) {
                return; // 이미 할당됨
            }

            // 역할 할당
            await this.직원시스템역할서비스.assignRole(employeeId, systemRoleId);
        } catch (error) {
            // 중복 할당 에러는 무시
            if (error.message?.includes('이미 할당된 역할')) {
                return;
            }
            throw error;
        }
    }

    // ================================
    // 시스템 관리
    // ================================

    async 시스템을_생성한다(data: {
        name: string;
        description?: string;
        domain: string;
        allowedOrigin: string[];
        healthCheckUrl?: string;
        isActive?: boolean;
    }): Promise<any> {
        // 이름 중복 확인
        const existingSystem = await this.시스템서비스.findByName(data.name);
        if (existingSystem) {
            throw new Error('이미 존재하는 시스템 이름입니다.');
        }

        // 클라이언트 크리덴셜 생성
        const { clientId, clientSecret, hash } = this.시스템서비스.generateCredentials();

        const systemData = {
            clientId,
            clientSecret: hash,
            name: data.name,
            description: data.description,
            domain: data.domain,
            allowedOrigin: data.allowedOrigin,
            healthCheckUrl: data.healthCheckUrl,
            isActive: data.isActive ?? true,
        };

        const savedSystem = await this.시스템서비스.save(systemData);

        // 원본 시크릿과 함께 반환
        return {
            system: savedSystem,
            originalSecret: clientSecret,
        };
    }

    async 모든_시스템을_조회한다(): Promise<any[]> {
        return this.시스템서비스.findAllSystems();
    }

    async 시스템을_검색한다(query: string): Promise<any[]> {
        return this.시스템서비스.searchSystems(query);
    }

    async 시스템을_ID로_조회한다(systemId: string): Promise<any | null> {
        return this.시스템서비스.findOne({ where: { id: systemId } });
    }

    async 시스템을_수정한다(
        systemId: string,
        data: {
            name?: string;
            description?: string;
            domain?: string;
            allowedOrigin?: string[];
            healthCheckUrl?: string;
            isActive?: boolean;
        },
    ): Promise<any> {
        const system = await this.시스템서비스.findOne({ where: { id: systemId } });
        if (!system) {
            throw new Error('해당 시스템을 찾을 수 없습니다.');
        }

        // 이름 변경 시 중복 확인
        if (data.name && data.name !== system.name) {
            const existingSystem = await this.시스템서비스.findByName(data.name);
            if (existingSystem) {
                throw new Error('이미 존재하는 시스템 이름입니다.');
            }
        }

        return this.시스템서비스.update(systemId, data);
    }

    async 시스템을_삭제한다(systemId: string): Promise<void> {
        const system = await this.시스템서비스.findOne({ where: { id: systemId } });
        if (!system) {
            throw new Error('해당 시스템을 찾을 수 없습니다.');
        }

        await this.시스템서비스.delete(systemId);
    }

    async 시스템의_API키를_재생성한다(systemId: string): Promise<any> {
        const system = await this.시스템서비스.findOne({ where: { id: systemId } });
        if (!system) {
            throw new Error('해당 시스템을 찾을 수 없습니다.');
        }

        // 새로운 시크릿 생성
        const { clientSecret, hash } = this.시스템서비스.generateSecret();

        const updatedSystem = await this.시스템서비스.update(systemId, {
            clientSecret: hash,
        });

        return {
            system: updatedSystem,
            originalSecret: clientSecret,
        };
    }

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

    async 모든_시스템역할을_조회한다(): Promise<SystemRole[]> {
        return this.시스템역할서비스.findAllSystemRoles();
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

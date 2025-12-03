import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainSystemRoleRepository } from './system-role.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { SystemRole } from './system-role.entity';

@Injectable()
export class DomainSystemRoleService extends BaseService<SystemRole> {
    constructor(private readonly systemRoleRepository: DomainSystemRoleRepository) {
        super(systemRoleRepository);
    }

    /**
     * ID로 시스템 역할을 조회합니다
     */
    async findById(id: string): Promise<SystemRole | null> {
        return this.systemRoleRepository.findOne({ where: { id } });
    }

    /**
     * 모든 시스템 역할을 조회합니다
     */
    async findAllSystemRoles(): Promise<SystemRole[]> {
        return this.systemRoleRepository.findAll({
            order: { systemId: 'ASC', sortOrder: 'ASC', roleName: 'ASC' },
        });
    }

    /**
     * 시스템 ID로 활성화된 역할 목록을 조회합니다
     */

    async findBySystemId(systemId: string): Promise<SystemRole[]> {
        return this.systemRoleRepository.findAll({
            where: { systemId, isActive: true },
            order: { sortOrder: 'ASC', roleName: 'ASC' },
        });
    }

    /**
     * 시스템 ID와 역할 코드로 특정 역할을 조회합니다
     */

    async findBySystemIdAndRoleCode(systemId: string, roleCode: string): Promise<SystemRole | null> {
        return this.systemRoleRepository.findOne({
            where: { systemId, roleCode },
        });
    }

    /**
     * 새로운 시스템 역할을 생성합니다
     */

    async createSystemRole(data: {
        systemId: string;
        roleName: string;
        roleCode: string;
        description?: string;
        permissions?: string[];
        sortOrder?: number;
        isDefault?: boolean;
    }): Promise<SystemRole> {
        // 동일한 시스템에서 역할 코드 중복 확인
        const existing = await this.findBySystemIdAndRoleCode(data.systemId, data.roleCode);
        if (existing) {
            throw new BadRequestException(`역할 코드 '${data.roleCode}'는 이미 존재합니다.`);
        }

        return this.systemRoleRepository.save({
            systemId: data.systemId,
            roleName: data.roleName,
            roleCode: data.roleCode,
            description: data.description,
            permissions: data.permissions || [],
            sortOrder: data.sortOrder || 0,
            isActive: true,
            isDefault: data.isDefault || false,
        });
    }

    /**
     * 시스템 역할 정보를 업데이트합니다
     */

    async updateSystemRole(
        id: string,
        data: {
            roleName?: string;
            roleCode?: string;
            description?: string;
            permissions?: string[];
            sortOrder?: number;
            isActive?: boolean;
            isDefault?: boolean;
        },
    ): Promise<SystemRole> {
        const systemRole = await this.systemRoleRepository.findOne({ where: { id } });
        if (!systemRole) {
            throw new NotFoundException('시스템 역할을 찾을 수 없습니다.');
        }

        // 역할 코드 변경 시 중복 확인
        if (data.roleCode && data.roleCode !== systemRole.roleCode) {
            const existing = await this.findBySystemIdAndRoleCode(systemRole.systemId, data.roleCode);
            if (existing) {
                throw new BadRequestException(`역할 코드 '${data.roleCode}'는 이미 존재합니다.`);
            }
        }

        await this.systemRoleRepository.update(id, data);
        return this.systemRoleRepository.findOne({ where: { id } })!;
    }

    /**
     * 시스템 역할을 비활성화합니다
     */

    async deactivateSystemRole(id: string): Promise<void> {
        const systemRole = await this.systemRoleRepository.findOne({ where: { id } });
        if (!systemRole) {
            throw new NotFoundException('시스템 역할을 찾을 수 없습니다.');
        }

        await this.systemRoleRepository.update(id, { isActive: false });
    }

    /**
     * 모든 기본 역할을 조회합니다
     */
    async findDefaultRoles(): Promise<SystemRole[]> {
        return this.systemRoleRepository.findAll({
            where: { isDefault: true, isActive: true },
            order: { sortOrder: 'ASC', roleName: 'ASC' },
        });
    }

    /**
     * 특정 시스템의 기본 역할을 조회합니다
     */
    async findDefaultRolesBySystemId(systemId: string): Promise<SystemRole[]> {
        return this.systemRoleRepository.findAll({
            where: { systemId, isDefault: true, isActive: true },
            order: { sortOrder: 'ASC', roleName: 'ASC' },
        });
    }
}

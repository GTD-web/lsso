import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SystemManagementContextService } from '../../../context/system-management/system-management-context.service';
import {
    CreateSystemDto,
    UpdateSystemDto,
    SystemResponseDto,
    CreateSystemRoleDto,
    UpdateSystemRoleDto,
    SystemRoleResponseDto,
} from './dto';
import { System } from '../../../domain/system/system.entity';
import { SystemRole } from '../../../domain/system-role/system-role.entity';

@Injectable()
export class SystemApplicationService {
    constructor(private readonly 시스템관리컨텍스트서비스: SystemManagementContextService) {}

    // ==================== 시스템 관리 ====================

    async 시스템목록조회(): Promise<SystemResponseDto[]> {
        try {
            const systems = await this.시스템관리컨텍스트서비스.모든_시스템을_조회한다();
            return systems.map((system) => this.시스템_엔티티를_DTO로_변환(system));
        } catch (error) {
            throw new NotFoundException('시스템 목록 조회에 실패했습니다.');
        }
    }

    async 시스템검색(query: string): Promise<SystemResponseDto[]> {
        try {
            const systems = await this.시스템관리컨텍스트서비스.시스템을_검색한다(query);
            return systems.map((system) => this.시스템_엔티티를_DTO로_변환(system));
        } catch (error) {
            throw new NotFoundException('시스템 검색에 실패했습니다.');
        }
    }

    async 시스템상세조회(id: string): Promise<SystemResponseDto> {
        try {
            const system = await this.시스템관리컨텍스트서비스.시스템을_ID로_조회한다(id);
            if (!system) {
                throw new NotFoundException('해당 시스템을 찾을 수 없습니다.');
            }
            return this.시스템_엔티티를_DTO로_변환(system);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('시스템 조회에 실패했습니다.');
        }
    }

    async 시스템생성(createDto: CreateSystemDto): Promise<SystemResponseDto> {
        try {
            const result = await this.시스템관리컨텍스트서비스.시스템을_생성한다({
                name: createDto.name,
                description: createDto.description,
                domain: createDto.domain,
                allowedOrigin: createDto.allowedOrigin,
                healthCheckUrl: createDto.healthCheckUrl,
                isActive: createDto.isActive,
            });

            // 응답에는 원본 시크릿을 포함 (생성 시에만)
            const response = this.시스템_엔티티를_DTO로_변환(result.system);
            response.clientSecret = result.originalSecret; // 원본 시크릿 반환

            return response;
        } catch (error) {
            if (error.message?.includes('이미 존재하는 시스템 이름')) {
                throw new ConflictException('이미 존재하는 시스템 이름입니다.');
            }
            throw new ConflictException('시스템 생성에 실패했습니다.');
        }
    }

    async 시스템수정(id: string, updateDto: UpdateSystemDto): Promise<SystemResponseDto> {
        try {
            const updatedSystem = await this.시스템관리컨텍스트서비스.시스템을_수정한다(id, {
                name: updateDto.name,
                description: updateDto.description,
                domain: updateDto.domain,
                allowedOrigin: updateDto.allowedOrigin,
                healthCheckUrl: updateDto.healthCheckUrl,
            });
            return this.시스템_엔티티를_DTO로_변환(updatedSystem);
        } catch (error) {
            if (error.message?.includes('이미 존재하는 시스템 이름')) {
                throw new ConflictException('이미 존재하는 시스템 이름입니다.');
            }
            if (error.message?.includes('해당 시스템을 찾을 수 없습니다')) {
                throw new NotFoundException('해당 시스템을 찾을 수 없습니다.');
            }
            throw new ConflictException('시스템 수정에 실패했습니다.');
        }
    }

    async 시스템활성상태변경(id: string, isActive: boolean): Promise<SystemResponseDto> {
        try {
            const updatedSystem = await this.시스템관리컨텍스트서비스.시스템_활성상태를_변경한다(id, isActive);
            return this.시스템_엔티티를_DTO로_변환(updatedSystem);
        } catch (error) {
            if (error.message?.includes('해당 시스템을 찾을 수 없습니다')) {
                throw new NotFoundException('해당 시스템을 찾을 수 없습니다.');
            }
            throw new NotFoundException('시스템 활성 상태 변경에 실패했습니다.');
        }
    }

    async 시스템삭제(id: string): Promise<void> {
        try {
            await this.시스템관리컨텍스트서비스.시스템을_삭제한다(id);
        } catch (error) {
            if (error.message?.includes('해당 시스템을 찾을 수 없습니다')) {
                throw new NotFoundException('해당 시스템을 찾을 수 없습니다.');
            }
            throw new NotFoundException('시스템 삭제에 실패했습니다.');
        }
    }

    async API키_재생성(id: string): Promise<SystemResponseDto> {
        try {
            const result = await this.시스템관리컨텍스트서비스.시스템의_API키를_재생성한다(id);

            const response = this.시스템_엔티티를_DTO로_변환(result.system);
            response.clientSecret = result.originalSecret; // 새로 생성된 원본 시크릿 반환

            return response;
        } catch (error) {
            if (error.message?.includes('해당 시스템을 찾을 수 없습니다')) {
                throw new NotFoundException('해당 시스템을 찾을 수 없습니다.');
            }
            throw new NotFoundException('API 키 재생성에 실패했습니다.');
        }
    }

    // ==================== 시스템 롤 관리 ====================

    async 시스템롤목록조회(systemId?: string): Promise<SystemRoleResponseDto[]> {
        try {
            let systemRoles: any[];

            if (systemId) {
                systemRoles = await this.시스템관리컨텍스트서비스.시스템의_역할목록을_조회한다(systemId);
            } else {
                systemRoles = await this.시스템관리컨텍스트서비스.모든_시스템역할을_조회한다();
            }

            return systemRoles.map((role) => this.시스템롤_엔티티를_DTO로_변환(role));
        } catch (error) {
            throw new NotFoundException('시스템 역할 목록 조회에 실패했습니다.');
        }
    }

    async 시스템롤상세조회(id: string): Promise<SystemRoleResponseDto> {
        try {
            const systemRole = await this.시스템관리컨텍스트서비스.시스템역할을_ID로_조회한다(id);
            if (!systemRole) {
                throw new NotFoundException('해당 시스템 롤을 찾을 수 없습니다.');
            }
            return this.시스템롤_엔티티를_DTO로_변환(systemRole);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('시스템 역할 조회에 실패했습니다.');
        }
    }

    async 시스템롤생성(createDto: CreateSystemRoleDto): Promise<SystemRoleResponseDto> {
        try {
            const savedRole = await this.시스템관리컨텍스트서비스.시스템역할을_생성한다({
                systemId: createDto.systemId,
                roleName: createDto.roleName,
                roleCode: createDto.roleCode,
                description: createDto.description,
                permissions: createDto.permissions,
                sortOrder: createDto.sortOrder,
            });
            return this.시스템롤_엔티티를_DTO로_변환(savedRole);
        } catch (error) {
            if (error.message?.includes('이미 할당된 역할') || error.message?.includes('이미 존재합니다')) {
                throw new ConflictException('해당 시스템에 이미 존재하는 역할 코드입니다.');
            }
            throw new ConflictException('시스템 역할 생성에 실패했습니다.');
        }
    }

    async 시스템롤수정(id: string, updateDto: UpdateSystemRoleDto): Promise<SystemRoleResponseDto> {
        try {
            const updatedRole = await this.시스템관리컨텍스트서비스.시스템역할을_수정한다(id, {
                roleName: updateDto.roleName,
                roleCode: updateDto.roleCode,
                description: updateDto.description,
                permissions: updateDto.permissions,
                sortOrder: updateDto.sortOrder,
                isActive: updateDto.isActive,
            });
            return this.시스템롤_엔티티를_DTO로_변환(updatedRole);
        } catch (error) {
            if (error.message?.includes('이미 존재합니다')) {
                throw new ConflictException('해당 시스템에 이미 존재하는 역할 코드입니다.');
            }
            if (error.message?.includes('찾을 수 없습니다')) {
                throw new NotFoundException('해당 시스템 롤을 찾을 수 없습니다.');
            }
            throw new ConflictException('시스템 역할 수정에 실패했습니다.');
        }
    }

    async 시스템롤삭제(id: string): Promise<void> {
        try {
            await this.시스템관리컨텍스트서비스.시스템역할을_비활성화한다(id);
        } catch (error) {
            if (error.message?.includes('찾을 수 없습니다')) {
                throw new NotFoundException('해당 시스템 롤을 찾을 수 없습니다.');
            }
            throw new NotFoundException('시스템 역할 삭제에 실패했습니다.');
        }
    }

    // ==================== 헬퍼 메서드 ====================

    private 시스템_엔티티를_DTO로_변환(system: any): SystemResponseDto {
        return {
            id: system.id,
            clientId: system.clientId,
            clientSecret: '***', // 보안상 마스킹
            name: system.name,
            description: system.description,
            domain: system.domain,
            allowedOrigin: system.allowedOrigin,
            healthCheckUrl: system.healthCheckUrl,
            isActive: system.isActive,
            roles: system.roles ? system.roles.map((role: SystemRole) => this.시스템롤_엔티티를_DTO로_변환(role)) : [],
            createdAt: system.createdAt,
            updatedAt: system.updatedAt,
        };
    }

    private 시스템롤_엔티티를_DTO로_변환(systemRole: any): SystemRoleResponseDto {
        const dto: any = {
            id: systemRole.id,
            systemId: systemRole.systemId,
            roleName: systemRole.roleName,
            roleCode: systemRole.roleCode,
            description: systemRole.description,
            permissions: systemRole.permissions,
            sortOrder: systemRole.sortOrder,
            isActive: systemRole.isActive,
            createdAt: systemRole.createdAt,
            updatedAt: systemRole.updatedAt,
        };

        // 시스템 정보가 있으면 포함
        if (systemRole.system) {
            dto.system = {
                id: systemRole.system.id,
                clientId: systemRole.system.clientId,
                name: systemRole.system.name,
                description: systemRole.system.description,
                domain: systemRole.system.domain,
                allowedOrigin: systemRole.system.allowedOrigin,
                healthCheckUrl: systemRole.system.healthCheckUrl,
                isActive: systemRole.system.isActive,
                createdAt: systemRole.system.createdAt,
                updatedAt: systemRole.system.updatedAt,
            };
        }

        return dto;
    }
}

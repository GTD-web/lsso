import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EmployeeSystemRoleManagementContextService } from '../../../../context/employee-management/employee-system-role-management-context.service';
import { EmployeeSystemRole } from '../../../../domain/employee-system-role/employee-system-role.entity';
import {
    CreateEmployeeSystemRoleDto,
    UpdateEmployeeSystemRoleDto,
    EmployeeSystemRoleListResponseDto,
    EmployeeSystemRoleGroupedListResponseDto,
    EmployeeSystemRoleGroupedDto,
} from '../dto';

@Injectable()
export class EmployeeSystemRoleApplicationService {
    constructor(private readonly employeeSystemRoleManagementContext: EmployeeSystemRoleManagementContextService) {}

    /**
     * 모든 직원 시스템 역할 관계 조회
     */
    async 모든_직원_시스템_역할_조회(): Promise<EmployeeSystemRoleListResponseDto[]> {
        const relations = await this.employeeSystemRoleManagementContext.모든_직원_시스템_역할_관계_조회();

        return relations.map((relation) => ({
            id: relation.id,
            employeeId: relation.employeeId,
            systemRoleId: relation.systemRoleId,
            createdAt: relation.createdAt,
            updatedAt: relation.updatedAt,
            employee: relation.employee
                ? {
                      id: relation.employee.id,
                      name: relation.employee.name,
                      employeeNumber: relation.employee.employeeNumber,
                  }
                : undefined,
            systemRole: relation.systemRole
                ? {
                      id: relation.systemRole.id,
                      roleName: relation.systemRole.roleName,
                      roleCode: relation.systemRole.roleCode,
                      system: {
                          id: relation.systemRole.system.id,
                          name: relation.systemRole.system.name,
                      },
                  }
                : undefined,
        }));
    }

    /**
     * 직원별 시스템 역할 조회
     */
    async 직원별_시스템_역할_조회(employeeId: string): Promise<EmployeeSystemRoleListResponseDto[]> {
        const relations = await this.employeeSystemRoleManagementContext.직원별_시스템_역할_조회(employeeId);

        return relations.map((relation) => ({
            id: relation.id,
            employeeId: relation.employeeId,
            systemRoleId: relation.systemRoleId,
            createdAt: relation.createdAt,
            updatedAt: relation.updatedAt,
            systemRole: relation.systemRole
                ? {
                      id: relation.systemRole.id,
                      roleName: relation.systemRole.roleName,
                      roleCode: relation.systemRole.roleCode,
                      system: {
                          id: relation.systemRole.system.id,
                          name: relation.systemRole.system.name,
                      },
                  }
                : undefined,
        }));
    }

    /**
     * 시스템 역할별 직원 조회
     */
    async 시스템_역할별_직원_조회(systemRoleId: string): Promise<EmployeeSystemRoleListResponseDto[]> {
        const relations = await this.employeeSystemRoleManagementContext.시스템_역할별_직원_조회(systemRoleId);

        return relations.map((relation) => ({
            id: relation.id,
            employeeId: relation.employeeId,
            systemRoleId: relation.systemRoleId,
            createdAt: relation.createdAt,
            updatedAt: relation.updatedAt,
            employee: relation.employee
                ? {
                      id: relation.employee.id,
                      name: relation.employee.name,
                      employeeNumber: relation.employee.employeeNumber,
                  }
                : undefined,
        }));
    }

    /**
     * 직원 시스템 역할 상세 조회
     */
    async 직원_시스템_역할_상세_조회(id: string): Promise<EmployeeSystemRoleListResponseDto> {
        const relation = await this.employeeSystemRoleManagementContext.직원_시스템_역할_관계_조회(id);

        if (!relation) {
            throw new NotFoundException('직원 시스템 역할을 찾을 수 없습니다.');
        }

        return {
            id: relation.id,
            employeeId: relation.employeeId,
            systemRoleId: relation.systemRoleId,
            createdAt: relation.createdAt,
            updatedAt: relation.updatedAt,
            employee: relation.employee
                ? {
                      id: relation.employee.id,
                      name: relation.employee.name,
                      employeeNumber: relation.employee.employeeNumber,
                  }
                : undefined,
            systemRole: relation.systemRole
                ? {
                      id: relation.systemRole.id,
                      roleName: relation.systemRole.roleName,
                      roleCode: relation.systemRole.roleCode,
                      system: {
                          id: relation.systemRole.system.id,
                          name: relation.systemRole.system.name,
                      },
                  }
                : undefined,
        };
    }

    /**
     * 직원에게 시스템 역할 할당
     */
    async 직원_시스템_역할_할당(dto: CreateEmployeeSystemRoleDto): Promise<EmployeeSystemRoleListResponseDto> {
        const relation = await this.employeeSystemRoleManagementContext.직원에게_시스템_역할_할당(
            dto.employeeId,
            dto.systemRoleId,
        );
        return this.직원_시스템_역할_상세_조회(relation.id);
    }

    /**
     * 직원 시스템 역할 해제
     */
    async 직원_시스템_역할_해제(id: string): Promise<{ message: string }> {
        const relation = await this.employeeSystemRoleManagementContext.ID로_직원_시스템_역할_조회(id);
        if (!relation) {
            throw new NotFoundException('직원 시스템 역할을 찾을 수 없습니다.');
        }

        await this.employeeSystemRoleManagementContext.직원의_시스템_역할_해제(
            relation.employeeId,
            relation.systemRoleId,
        );
        return { message: '직원 시스템 역할이 성공적으로 해제되었습니다.' };
    }

    /**
     * 직원의 모든 시스템 역할 해제
     */
    async 직원_모든_시스템_역할_해제(employeeId: string): Promise<{ message: string }> {
        await this.employeeSystemRoleManagementContext.직원의_모든_시스템_역할_해제(employeeId);
        return { message: '직원의 모든 시스템 역할이 성공적으로 해제되었습니다.' };
    }

    /**
     * 직원별로 그룹핑된 시스템 역할 조회
     */
    async 직원별_그룹핑된_시스템_역할_조회(employeeId?: string): Promise<EmployeeSystemRoleGroupedListResponseDto> {
        let relations: EmployeeSystemRole[];

        if (employeeId) {
            relations = await this.employeeSystemRoleManagementContext.직원별_시스템_역할_조회(employeeId);
        } else {
            relations = await this.employeeSystemRoleManagementContext.모든_직원_시스템_역할_관계_조회();
        }

        // 직원별로 그룹핑
        const employeeGroups = new Map<string, EmployeeSystemRoleGroupedDto>();

        relations.forEach((relation) => {
            const employeeId = relation.employeeId;

            if (!employeeGroups.has(employeeId)) {
                employeeGroups.set(employeeId, {
                    employeeId: relation.employeeId,
                    employeeName: relation.employee?.name || '',
                    employeeNumber: relation.employee?.employeeNumber || '',
                    systemRoles: [],
                    totalRoles: 0,
                    firstRoleAssignedAt: relation.createdAt, // 첫 번째 역할 할당일로 초기화
                    lastRoleUpdatedAt: relation.updatedAt, // 첫 번째 역할 수정일로 초기화
                });
            }

            const group = employeeGroups.get(employeeId)!;

            // 최초 할당일과 최근 수정일 업데이트
            if (relation.createdAt < group.firstRoleAssignedAt) {
                group.firstRoleAssignedAt = relation.createdAt;
            }
            if (relation.updatedAt > group.lastRoleUpdatedAt) {
                group.lastRoleUpdatedAt = relation.updatedAt;
            }

            if (relation.systemRole) {
                const roleDto = {
                    id: relation.systemRole.id,
                    roleName: relation.systemRole.roleName,
                    roleCode: relation.systemRole.roleCode,
                    systemName: relation.systemRole.system?.name || '',
                    assignedAt: relation.createdAt,
                    updatedAt: relation.updatedAt,
                };

                group.systemRoles.push(roleDto);
                group.totalRoles++;
            }
        });

        const employees = Array.from(employeeGroups.values());

        return {
            employees,
            totalEmployees: employees.length,
            totalRelations: relations.length,
        };
    }
}

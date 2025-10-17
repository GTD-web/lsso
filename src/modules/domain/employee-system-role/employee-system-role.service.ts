import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainEmployeeSystemRoleRepository } from './employee-system-role.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { EmployeeSystemRole } from './employee-system-role.entity';
import { In } from 'typeorm';

@Injectable()
export class DomainEmployeeSystemRoleService extends BaseService<EmployeeSystemRole> {
    constructor(private readonly employeeSystemRoleRepository: DomainEmployeeSystemRoleRepository) {
        super(employeeSystemRoleRepository);
    }

    /**
     * 직원 ID로 직원의 시스템 역할 목록을 조회합니다
     */

    async findByEmployeeId(employeeId: string): Promise<EmployeeSystemRole[]> {
        return this.employeeSystemRoleRepository.findAll({
            where: { employeeId },
            relations: ['systemRole', 'systemRole.system'],
        });
    }

    /**
     * 여러 직원의 시스템 역할 목록을 일괄 조회합니다
     */
    async findByEmployeeIds(employeeIds: string[]): Promise<EmployeeSystemRole[]> {
        if (employeeIds.length === 0) return [];
        return this.employeeSystemRoleRepository.findAll({
            where: { employeeId: In(employeeIds) },
            relations: ['systemRole', 'systemRole.system'],
        });
    }

    /**
     * 시스템 역할 ID로 해당 역할을 가진 직원 목록을 조회합니다
     */

    async findBySystemRoleId(systemRoleId: string): Promise<EmployeeSystemRole[]> {
        return this.employeeSystemRoleRepository.findAll({
            where: { systemRoleId },
            relations: ['employee'],
        });
    }

    /**
     * 특정 직원이 특정 시스템 역할을 가지고 있는지 조회합니다
     */

    async findByEmployeeIdAndSystemRoleId(
        employeeId: string,
        systemRoleId: string,
    ): Promise<EmployeeSystemRole | null> {
        return this.employeeSystemRoleRepository.findOne({
            where: { employeeId, systemRoleId },
            relations: ['systemRole'],
        });
    }

    /**
     * 직원에게 시스템 역할을 할당합니다
     */

    async assignRole(employeeId: string, systemRoleId: string): Promise<EmployeeSystemRole> {
        // 이미 할당된 역할인지 확인
        const existing = await this.findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId);
        if (existing) {
            throw new BadRequestException('이미 할당된 역할입니다.');
        }

        return this.employeeSystemRoleRepository.save({
            employeeId,
            systemRoleId,
        });
    }

    /**
     * 직원의 특정 시스템 역할을 해제합니다
     */

    async unassignRole(employeeId: string, systemRoleId: string): Promise<void> {
        const employeeSystemRole = await this.findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId);
        if (!employeeSystemRole) {
            throw new NotFoundException('할당된 역할을 찾을 수 없습니다.');
        }

        await this.employeeSystemRoleRepository.delete(employeeSystemRole.id);
    }

    /**
     * 직원의 모든 시스템 역할을 해제합니다
     */

    async unassignAllRolesByEmployeeId(employeeId: string): Promise<void> {
        const roles = await this.findByEmployeeId(employeeId);
        if (roles.length > 0) {
            for (const role of roles) {
                await this.employeeSystemRoleRepository.delete(role.id);
            }
        }
    }

    /**
     * 특정 시스템 역할의 모든 할당을 해제합니다
     */

    async unassignAllRolesBySystemRoleId(systemRoleId: string): Promise<void> {
        const assignments = await this.findBySystemRoleId(systemRoleId);
        if (assignments.length > 0) {
            for (const assignment of assignments) {
                await this.employeeSystemRoleRepository.delete(assignment.id);
            }
        }
    }

    /**
     * 시스템 역할에 할당된 직원 ID 목록을 조회합니다
     */

    async getEmployeeIdsBySystemRoleId(systemRoleId: string): Promise<string[]> {
        const assignments = await this.employeeSystemRoleRepository.findAll({
            where: { systemRoleId },
            select: { employeeId: true },
        });
        return assignments.map((assignment) => assignment.employeeId);
    }

    /**
     * 직원이 할당받은 시스템 역할 ID 목록을 조회합니다
     */

    async getSystemRoleIdsByEmployeeId(employeeId: string): Promise<string[]> {
        const assignments = await this.employeeSystemRoleRepository.findAll({
            where: { employeeId },
            select: { systemRoleId: true },
        });
        return assignments.map((assignment) => assignment.systemRoleId);
    }
}

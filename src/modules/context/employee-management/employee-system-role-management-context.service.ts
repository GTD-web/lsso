import { Injectable } from '@nestjs/common';
import { DomainEmployeeSystemRoleService } from '../../domain/employee-system-role/employee-system-role.service';
import { EmployeeSystemRole } from '../../domain/employee-system-role/employee-system-role.entity';

@Injectable()
export class EmployeeSystemRoleManagementContextService {
    constructor(private readonly employeeSystemRoleService: DomainEmployeeSystemRoleService) {}

    /**
     * 모든 직원 시스템 역할 관계를 조회합니다
     */
    async 모든_직원_시스템_역할_관계_조회(): Promise<EmployeeSystemRole[]> {
        return this.employeeSystemRoleService.findAll({
            relations: ['employee', 'systemRole', 'systemRole.system'],
        });
    }

    /**
     * 직원별 시스템 역할을 조회합니다
     */
    async 직원별_시스템_역할_조회(employeeId: string): Promise<EmployeeSystemRole[]> {
        return this.employeeSystemRoleService.findByEmployeeId(employeeId);
    }

    /**
     * 시스템 역할별 직원을 조회합니다
     */
    async 시스템_역할별_직원_조회(systemRoleId: string): Promise<EmployeeSystemRole[]> {
        return this.employeeSystemRoleService.findBySystemRoleId(systemRoleId);
    }

    /**
     * 직원 시스템 역할 관계를 ID로 조회합니다
     */
    async 직원_시스템_역할_관계_조회(id: string): Promise<EmployeeSystemRole | null> {
        return this.employeeSystemRoleService.findOne({
            where: { id },
            relations: ['employee', 'systemRole', 'systemRole.system'],
        });
    }

    /**
     * 직원에게 시스템 역할을 할당합니다
     */
    async 직원에게_시스템_역할_할당(employeeId: string, systemRoleId: string): Promise<EmployeeSystemRole> {
        return this.employeeSystemRoleService.assignRole(employeeId, systemRoleId);
    }

    /**
     * 직원의 시스템 역할을 해제합니다
     */
    async 직원의_시스템_역할_해제(employeeId: string, systemRoleId: string): Promise<void> {
        return this.employeeSystemRoleService.unassignRole(employeeId, systemRoleId);
    }

    /**
     * ID로 직원 시스템 역할을 조회합니다
     */
    async ID로_직원_시스템_역할_조회(id: string): Promise<EmployeeSystemRole | null> {
        return this.employeeSystemRoleService.findOne({
            where: { id },
        });
    }

    /**
     * 직원의 모든 시스템 역할을 해제합니다
     */
    async 직원의_모든_시스템_역할_해제(employeeId: string): Promise<void> {
        return this.employeeSystemRoleService.unassignAllRolesByEmployeeId(employeeId);
    }

    /**
     * 특정 시스템 역할의 모든 할당을 해제합니다
     */
    async 시스템_역할의_모든_할당_해제(systemRoleId: string): Promise<void> {
        return this.employeeSystemRoleService.unassignAllRolesBySystemRoleId(systemRoleId);
    }

    /**
     * 직원이 특정 시스템 역할을 가지고 있는지 확인합니다
     */
    async 직원의_시스템_역할_보유_여부_확인(employeeId: string, systemRoleId: string): Promise<boolean> {
        const relation = await this.employeeSystemRoleService.findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId);
        return !!relation;
    }

    /**
     * 시스템 역할에 할당된 직원 ID 목록을 조회합니다
     */
    async 시스템_역할에_할당된_직원_ID_목록_조회(systemRoleId: string): Promise<string[]> {
        return this.employeeSystemRoleService.getEmployeeIdsBySystemRoleId(systemRoleId);
    }

    /**
     * 직원이 할당받은 시스템 역할 ID 목록을 조회합니다
     */
    async 직원이_할당받은_시스템_역할_ID_목록_조회(employeeId: string): Promise<string[]> {
        return this.employeeSystemRoleService.getSystemRoleIdsByEmployeeId(employeeId);
    }
}

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { DomainSystemService } from '../../domain/system/system.service';
import { DomainWebhookService } from '../../domain/webhook/webhook.service';
import { DomainWebhookEventLogService } from '../../domain/webhook-event-log/webhook-event-log.service';
import { DomainSystemWebhookService } from '../../domain/system-webhook/system-webhook.service';
import { DomainSystemRoleService } from '../../domain/system-role/system-role.service';
import { DomainEmployeeSystemRoleService } from '../../domain/employee-system-role/employee-system-role.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { SystemRole } from '../../domain/system-role/system-role.entity';
import { EmployeeSystemRole } from '../../domain/employee-system-role/employee-system-role.entity';

@Injectable()
export class SystemManagementContextService implements OnModuleInit {
    private readonly logger = new Logger(SystemManagementContextService.name);

    constructor(
        private readonly 시스템서비스: DomainSystemService,
        private readonly 웹훅서비스: DomainWebhookService,
        private readonly 웹훅이벤트로그서비스: DomainWebhookEventLogService,
        private readonly 시스템웹훅서비스: DomainSystemWebhookService,
        private readonly 시스템역할서비스: DomainSystemRoleService,
        private readonly 직원시스템역할서비스: DomainEmployeeSystemRoleService,
        private readonly 부서서비스: DomainDepartmentService,
        private readonly 직원부서직책서비스: DomainEmployeeDepartmentPositionService,
    ) {}

    async onModuleInit() {
        try {
            // await this.Web파트_부서에_테스트_역할_부여();
        } catch (error) {
            this.logger.error('테스트 데이터 생성 중 오류 발생:', error);
        }
    }

    /**
     * Web파트 부서 직원들에게 RMS-PROD 시스템의 테스트 역할을 부여합니다
     */
    private async Web파트_부서에_테스트_역할_부여(): Promise<void> {
        try {
            this.logger.log('Web파트 부서 직원들에게 테스트 역할 부여 시작...');

            // 1. RMS-PROD 시스템 조회
            const systems = await this.시스템서비스.findAll();
            const rmsSystem = systems.find((system) => system.name === 'RMS-PROD');

            if (!rmsSystem) {
                this.logger.warn('RMS-PROD 시스템을 찾을 수 없습니다.');
                return;
            }

            this.logger.log(`RMS-PROD 시스템 찾음: ${rmsSystem.id}`);

            // 2. Web파트 부서 조회
            const departments = await this.부서서비스.findAll();
            const webDepartment = departments.find((dept) => dept.departmentName === 'Web파트');

            if (!webDepartment) {
                this.logger.warn('Web파트 부서를 찾을 수 없습니다.');
                return;
            }

            this.logger.log(`Web파트 부서 찾음: ${webDepartment.id}`);

            // 3. resourceManager와 systemAdmin 역할 생성/조회
            const resourceManagerRole = await this.시스템역할_생성_또는_조회(
                rmsSystem.id,
                'resourceManager',
                'Resource Manager',
                'RMS 리소스 관리자',
                ['resource.read', 'resource.write', 'resource.delete'],
            );

            const systemAdminRole = await this.시스템역할_생성_또는_조회(
                rmsSystem.id,
                'systemAdmin',
                'System Administrator',
                'RMS 시스템 관리자',
                ['system.read', 'system.write', 'system.admin', 'user.manage'],
            );

            this.logger.log(
                `시스템 역할 준비 완료 - resourceManager: ${resourceManagerRole.id}, systemAdmin: ${systemAdminRole.id}`,
            );

            // 4. Web파트 부서 직원들 조회
            const employeeDepartmentPositions = await this.직원부서직책서비스.findByDepartmentId(webDepartment.id);

            if (employeeDepartmentPositions.length === 0) {
                this.logger.warn('Web파트 부서에 직원이 없습니다.');
                return;
            }

            this.logger.log(`Web파트 부서 직원 ${employeeDepartmentPositions.length}명 찾음`);

            // 5. 각 직원에게 역할 할당
            let assignedCount = 0;
            for (const empDeptPos of employeeDepartmentPositions) {
                try {
                    // resourceManager 역할 할당
                    await this.역할_할당_시도(empDeptPos.employeeId, resourceManagerRole.id);

                    // systemAdmin 역할 할당
                    await this.역할_할당_시도(empDeptPos.employeeId, systemAdminRole.id);

                    assignedCount++;
                } catch (error) {
                    this.logger.warn(`직원 ${empDeptPos.employeeId} 역할 할당 실패:`, error.message);
                }
            }

            this.logger.log(`Web파트 부서 직원 ${assignedCount}명에게 테스트 역할 할당 완료`);
        } catch (error) {
            this.logger.error('Web파트 부서 테스트 역할 부여 중 오류:', error);
            throw error;
        }
    }

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

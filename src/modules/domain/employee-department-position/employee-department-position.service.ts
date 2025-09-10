import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeDepartmentPositionRepository } from './employee-department-position.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { EmployeeDepartmentPosition } from './employee-department-position.entity';
import { In } from 'typeorm';

@Injectable()
export class DomainEmployeeDepartmentPositionService extends BaseService<EmployeeDepartmentPosition> {
    constructor(private readonly employeeDepartmentPositionRepository: DomainEmployeeDepartmentPositionRepository) {
        super(employeeDepartmentPositionRepository);
    }

    // 직원의 부서-직책 정보 조회
    async findByEmployeeId(employeeId: string): Promise<EmployeeDepartmentPosition> {
        return this.employeeDepartmentPositionRepository.findOne({
            where: { employeeId },
        });
    }

    // 직원의 부서-직책 정보 조회
    async findAllByEmployeeIds(employeeIds: string[]): Promise<EmployeeDepartmentPosition[]> {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { employeeId: In(employeeIds) },
            order: { createdAt: 'DESC' },
        });
    }

    // 부서의 직원-직책 정보 조회
    async findByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]> {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId },
            order: { createdAt: 'DESC' },
        });
    }

    // 🚀 성능 최적화: 여러 부서의 직원-직책 정보를 배치 조회
    async findByDepartmentIds(departmentIds: string[]): Promise<EmployeeDepartmentPosition[]> {
        if (departmentIds.length === 0) return [];

        return this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId: In(departmentIds) },
            order: { departmentId: 'ASC', createdAt: 'DESC' },
        });
    }

    // 특정 직책의 직원들 조회
    async findByPositionId(positionId: string): Promise<EmployeeDepartmentPosition[]> {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { positionId },
            order: { createdAt: 'DESC' },
        });
    }

    // 특정 직원의 특정 부서에서의 직책 조회
    async findByEmployeeAndDepartment(employeeId: string, departmentId: string): Promise<EmployeeDepartmentPosition> {
        const position = await this.employeeDepartmentPositionRepository.findOne({
            where: { employeeId, departmentId },
        });
        if (!position) {
            throw new NotFoundException('해당 부서에서 직원의 직책을 찾을 수 없습니다.');
        }
        return position;
    }

    // 직원-부서-직책 관계 생성
    async createEmployeeDepartmentPosition(
        employeeId: string,
        departmentId: string,
        positionId: string,
    ): Promise<EmployeeDepartmentPosition> {
        return this.employeeDepartmentPositionRepository.save({
            employeeId,
            departmentId,
            positionId,
        });
    }

    async deleteEmployeeDepartmentPosition(id: string): Promise<void> {
        await this.employeeDepartmentPositionRepository.delete(id);
    }

    // 직원의 부서 이동 (새로운 부서-직책 할당)
    async transferEmployee(
        employeeId: string,
        newDepartmentId: string,
        newPositionId: string,
    ): Promise<EmployeeDepartmentPosition> {
        return this.createEmployeeDepartmentPosition(employeeId, newDepartmentId, newPositionId);
    }

    // 부서별 직책 통계 조회
    async getDepartmentPositionStats(departmentId: string): Promise<any> {
        const positions = await this.findByDepartmentId(departmentId);
        const stats = positions.reduce((acc, position) => {
            acc[position.positionId] = (acc[position.positionId] || 0) + 1;
            return acc;
        }, {});
        return stats;
    }

    // 직원의 현재 주요 부서-직책 조회 (가장 최근)
    async findCurrentPositionByEmployeeId(employeeId: string): Promise<EmployeeDepartmentPosition> {
        const positions = await this.employeeDepartmentPositionRepository.findAll({
            where: { employeeId },
            order: { createdAt: 'DESC' },
            take: 1,
        });

        if (!positions.length) {
            throw new NotFoundException('직원의 부서-직책 정보를 찾을 수 없습니다.');
        }

        return positions[0];
    }

    // 특정 부서의 관리자급 직책 조회 (레벨 기반)
    async findManagersByDepartment(departmentId: string): Promise<EmployeeDepartmentPosition[]> {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId },
            order: { createdAt: 'DESC' },
        });
    }

    // 최근 조직 변경 이력 조회
    async findRecentOrganizationChanges(limit: number = 20): Promise<EmployeeDepartmentPosition[]> {
        return this.employeeDepartmentPositionRepository.findAll({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
}

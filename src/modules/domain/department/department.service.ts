import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { DomainDepartmentRepository } from './department.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Department } from '../../../../libs/database/entities';
import { In } from 'typeorm';

@Injectable()
export class DomainDepartmentService extends BaseService<Department> {
    private readonly logger = new Logger(DomainDepartmentService.name);

    constructor(private readonly departmentRepository: DomainDepartmentRepository) {
        super(departmentRepository);
    }

    // 부서 찾기
    async findById(departmentId: string): Promise<Department> {
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
        });
        return department;
    }

    // 부서 찾기 (상위 부서 정보 포함)
    async findByIdWithParent(departmentId: string): Promise<Department> {
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
            relations: ['parentDepartment'],
        });
        return department;
    }

    // 여러 부서 ID로 찾기
    async findByIds(departmentIds: string[]): Promise<Department[]> {
        if (departmentIds.length === 0) return [];
        return this.departmentRepository.findAll({
            where: { id: In(departmentIds) },
        });
    }

    // 여러 부서 ID로 찾기 (상위 부서 정보 포함)
    async findByIdsWithParent(departmentIds: string[]): Promise<Department[]> {
        if (departmentIds.length === 0) return [];
        return this.departmentRepository.findAll({
            where: { id: In(departmentIds) },
            relations: ['parentDepartment'],
        });
    }

    // 부서 이름으로 찾기
    async findByName(departmentName: string): Promise<Department> {
        const department = await this.departmentRepository.findOne({
            where: { departmentName },
        });
        if (!department) {
            throw new NotFoundException('부서를 찾을 수 없습니다.');
        }
        return department;
    }

    // 부서 코드로 찾기
    async findByCode(departmentCode: string): Promise<Department> {
        const department = await this.departmentRepository.findOne({
            where: { departmentCode },
        });
        return department;
    }

    // 부서 코드로 찾기 (컨텍스트용 별칭)
    async findByDepartmentCode(departmentCode: string): Promise<Department> {
        return this.findByCode(departmentCode);
    }

    // 전체 부서 목록 조회
    async findAllDepartments(): Promise<Department[]> {
        return this.departmentRepository.findAll({
            order: { departmentName: 'ASC' },
        });
    }

    // 최상위 부서 목록 조회
    async findRootDepartments(): Promise<Department[]> {
        return this.departmentRepository.findAll({
            where: { parentDepartmentId: null },
            order: { order: 'ASC' },
        });
    }

    // 전체 부서 목록 조회
    async findAllDepartmentsWithChildren(): Promise<Department[]> {
        return this.departmentRepository.findAll({
            relations: ['childDepartments'],
            order: { order: 'ASC' },
        });
    }

    // 하위 부서 조회
    async findChildDepartments(departmentId: string): Promise<Department[]> {
        return this.departmentRepository.findAll({
            where: { parentDepartmentId: departmentId },
            order: { order: 'ASC' },
        });
    }

    // 부서 생성
    async createDepartment(data: {
        departmentName: string;
        departmentCode: string;
        type: any;
        parentDepartmentId?: string;
        order?: number;
    }): Promise<Department> {
        return this.save(data);
    }

    // 부서 수정
    async updateDepartment(departmentId: string, data: Partial<Department>): Promise<Department> {
        return this.update(departmentId, data);
    }

    // 부서 삭제
    async deleteDepartment(departmentId: string): Promise<void> {
        return this.delete(departmentId);
    }

    // ==================== 단순한 도메인 함수들 (기존 컨텍스트에서 이동) ====================

    /**
     * 부서 존재여부 확인
     */
    async exists(departmentId: string): Promise<boolean> {
        const department = await this.findById(departmentId);
        console.log('department', department);
        if (department) {
            return true;
        }
        return false;
    }

    /**
     * 부서 코드 중복 확인
     */
    async isCodeDuplicate(departmentCode: string, excludeId?: string): Promise<boolean> {
        const department = await this.findByCode(departmentCode);
        if (department) {
            return true;
        }
        return false;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainPositionRepository } from './position.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Position } from '../../../../libs/database/entities';
import { In } from 'typeorm';

@Injectable()
export class DomainPositionService extends BaseService<Position> {
    constructor(private readonly positionRepository: DomainPositionRepository) {
        super(positionRepository);
    }

    // 직책 찾기
    async findById(positionId: string): Promise<Position> {
        const position = await this.positionRepository.findOne({
            where: { id: positionId },
        });
        return position;
    }

    // 여러 직책 ID로 찾기
    async findByIds(positionIds: string[]): Promise<Position[]> {
        if (positionIds.length === 0) return [];
        return this.positionRepository.findAll({
            where: { id: In(positionIds) },
        });
    }

    // 직책명으로 찾기
    async findByTitle(positionTitle: string): Promise<Position> {
        const position = await this.positionRepository.findOne({
            where: { positionTitle },
        });
        return position;
    }

    // 직책 코드로 찾기
    async findByCode(positionCode: string): Promise<Position> {
        const position = await this.positionRepository.findOne({
            where: { positionCode },
        });
        return position;
    }

    // 직책 코드로 찾기 (컨텍스트용 별칭)
    async findByPositionCode(positionCode: string): Promise<Position> {
        return this.findByCode(positionCode);
    }

    // 레벨별 직책 조회
    async findByLevel(level: number): Promise<Position[]> {
        return this.positionRepository.findAll({
            where: { level },
            order: { level: 'ASC' },
        });
    }

    // 관리 권한이 있는 직책 조회
    async findManagementPositions(): Promise<Position[]> {
        return this.positionRepository.findAll({
            where: { hasManagementAuthority: true },
            order: { level: 'DESC' },
        });
    }

    // 🚀 성능 최적화: 전체 직책 목록 조회 (레벨 순)
    async findAllPositions(): Promise<Position[]> {
        return this.positionRepository.findAll({
            order: { level: 'ASC', positionTitle: 'ASC' },
        });
    }

    // 직책 생성
    async createPosition(data: {
        positionTitle: string;
        positionCode: string;
        level: number;
        hasManagementAuthority: boolean;
    }): Promise<Position> {
        return this.save(data);
    }

    // 직책 수정
    async updatePosition(positionId: string, data: Partial<Position>): Promise<Position> {
        return this.update(positionId, data);
    }

    // 직책 삭제
    async deletePosition(positionId: string): Promise<void> {
        return this.delete(positionId);
    }

    // ==================== 단순한 도메인 함수들 (기존 컨텍스트에서 이동) ====================

    /**
     * 직책 존재여부 확인
     */
    async exists(positionId: string): Promise<boolean> {
        const position = await this.findById(positionId);
        console.log('position', position);
        if (position) {
            await this.findById(positionId);
            return true;
        }
        return false;
    }

    /**
     * 직책 코드 중복 확인
     */
    async isCodeDuplicate(positionCode: string, excludeId?: string): Promise<boolean> {
        const position = await this.findByCode(positionCode);
        console.log('position', position);
        if (position) {
            return true;
        }
        return false;
    }
}

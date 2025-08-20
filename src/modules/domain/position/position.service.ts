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
        if (!position) {
            throw new NotFoundException('직책을 찾을 수 없습니다.');
        }
        return position;
    }

    // 직책 코드로 찾기
    async findByCode(positionCode: string): Promise<Position> {
        const position = await this.positionRepository.findOne({
            where: { positionCode },
        });
        return position;
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
}

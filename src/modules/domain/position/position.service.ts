import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainPositionRepository } from './position.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Position } from '../../../../libs/database/entities';

@Injectable()
export class DomainPositionService extends BaseService<Position> {
    constructor(private readonly positionRepository: DomainPositionRepository) {
        super(positionRepository);
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
        if (!position) {
            throw new NotFoundException('직책을 찾을 수 없습니다.');
        }
        return position;
    }

    // 활성 직책 목록 조회
    async findActivePositions(): Promise<Position[]> {
        return this.positionRepository.findAll({
            where: { isActive: true },
            order: { level: 'DESC' },
        });
    }

    // 레벨별 직책 조회
    async findByLevel(level: number): Promise<Position[]> {
        return this.positionRepository.findAll({
            where: { level },
            order: { positionTitle: 'ASC' },
        });
    }

    // 관리 권한이 있는 직책 조회
    async findManagementPositions(): Promise<Position[]> {
        return this.positionRepository.findAll({
            where: { hasManagementAuthority: true, isActive: true },
            order: { level: 'DESC' },
        });
    }
}

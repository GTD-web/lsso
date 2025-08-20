import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainRankRepository } from './rank.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Rank } from '../../../../libs/database/entities';
import { In } from 'typeorm';

@Injectable()
export class DomainRankService extends BaseService<Rank> {
    constructor(private readonly rankRepository: DomainRankRepository) {
        super(rankRepository);
    }

    // 직급 찾기
    async findById(rankId: string): Promise<Rank> {
        const rank = await this.rankRepository.findOne({
            where: { id: rankId },
        });
        return rank;
    }

    // 여러 직급 ID로 찾기
    async findByIds(rankIds: string[]): Promise<Rank[]> {
        if (rankIds.length === 0) return [];
        return this.rankRepository.findAll({
            where: { id: In(rankIds) },
        });
    }

    // 직급명으로 찾기
    async findByName(rankName: string): Promise<Rank> {
        const rank = await this.rankRepository.findOne({
            where: { rankName },
        });

        return rank;
    }

    // 직급 코드로 찾기
    async findByCode(rankCode: string): Promise<Rank> {
        const rank = await this.rankRepository.findOne({
            where: { rankCode },
        });

        return rank;
    }

    // 전체 직급 목록 조회 (레벨 순)
    async findAllRanks(): Promise<Rank[]> {
        return this.rankRepository.findAll({
            order: { level: 'DESC' },
        });
    }

    // 레벨별 직급 조회
    async findByLevel(level: number): Promise<Rank[]> {
        return this.rankRepository.findAll({
            where: { level },
            order: { rankName: 'ASC' },
        });
    }

    // 특정 레벨 이상의 직급 조회
    async findByMinLevel(minLevel: number): Promise<Rank[]> {
        return this.rankRepository.findAll({
            order: { level: 'DESC' },
        });
    }
}

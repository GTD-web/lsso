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

    // 직급 코드로 찾기 (컨텍스트용 별칭)
    async findByRankCode(rankCode: string): Promise<Rank> {
        return this.findByCode(rankCode);
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

    // 직급 생성
    async createRank(data: { rankName: string; rankCode: string; level: number }): Promise<Rank> {
        return this.save(data);
    }

    // 직급 수정
    async updateRank(rankId: string, data: Partial<Rank>): Promise<Rank> {
        return this.update(rankId, data);
    }

    // 직급 삭제
    async deleteRank(rankId: string): Promise<void> {
        return this.delete(rankId);
    }

    // ==================== 단순한 도메인 함수들 (기존 컨텍스트에서 이동) ====================

    /**
     * 직급 존재여부 확인
     */
    async exists(rankId: string): Promise<boolean> {
        const rank = await this.findById(rankId);
        console.log('rank', rank);
        if (rank) {
            return true;
        }
        return false;
    }

    /**
     * 직급 코드 중복 확인
     */
    async isCodeDuplicate(rankCode: string, excludeId?: string): Promise<boolean> {
        const rank = await this.findByCode(rankCode);
        console.log('rank', rank);
        if (rank) {
            return true;
        }
        return false;
    }
}

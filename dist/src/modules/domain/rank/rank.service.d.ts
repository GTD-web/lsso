import { DomainRankRepository } from './rank.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Rank } from '../../../../libs/database/entities';
export declare class DomainRankService extends BaseService<Rank> {
    private readonly rankRepository;
    constructor(rankRepository: DomainRankRepository);
    findById(rankId: string): Promise<Rank>;
    findByName(rankName: string): Promise<Rank>;
    findByCode(rankCode: string): Promise<Rank>;
    findAllRanks(): Promise<Rank[]>;
    findByLevel(level: number): Promise<Rank[]>;
    findByMinLevel(minLevel: number): Promise<Rank[]>;
}

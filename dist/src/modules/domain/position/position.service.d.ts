import { DomainPositionRepository } from './position.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Position } from '../../../../libs/database/entities';
export declare class DomainPositionService extends BaseService<Position> {
    private readonly positionRepository;
    constructor(positionRepository: DomainPositionRepository);
    findById(positionId: string): Promise<Position>;
    findByTitle(positionTitle: string): Promise<Position>;
    findByCode(positionCode: string): Promise<Position>;
    findByLevel(level: number): Promise<Position[]>;
    findManagementPositions(): Promise<Position[]>;
}

import { DomainEmployeeRankHistoryRepository } from './employee-rank-history.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { EmployeeRankHistory } from '../../../../libs/database/entities';
export declare class DomainEmployeeRankHistoryService extends BaseService<EmployeeRankHistory> {
    private readonly employeeRankHistoryRepository;
    constructor(employeeRankHistoryRepository: DomainEmployeeRankHistoryRepository);
    findByEmployeeId(employeeId: string): Promise<EmployeeRankHistory[]>;
    findByRankId(rankId: string): Promise<EmployeeRankHistory[]>;
    findCurrentRankByEmployeeId(employeeId: string): Promise<EmployeeRankHistory>;
    findByEmployeeAndRank(employeeId: string, rankId: string): Promise<EmployeeRankHistory[]>;
    createRankHistory(employeeId: string, rankId: string): Promise<EmployeeRankHistory>;
    findByDateRange(startDate: Date, endDate: Date): Promise<EmployeeRankHistory[]>;
    getRankChangeCountByEmployeeId(employeeId: string): Promise<number>;
    findRecentRankChanges(limit?: number): Promise<EmployeeRankHistory[]>;
}

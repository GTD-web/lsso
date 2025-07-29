import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainEmployeeRankHistoryService } from './employee-rank-history.service';
import { DomainEmployeeRankHistoryRepository } from './employee-rank-history.repository';
import { EmployeeRankHistory } from '../../../../libs/database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeRankHistory])],
    providers: [DomainEmployeeRankHistoryService, DomainEmployeeRankHistoryRepository],
    exports: [DomainEmployeeRankHistoryService],
})
export class DomainEmployeeRankHistoryModule {}

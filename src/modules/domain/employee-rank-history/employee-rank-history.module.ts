import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainEmployeeRankHistoryService } from './employee-rank-history.service';
import { DomainEmployeeRankHistoryRepository } from './employee-rank-history.repository';
import { EmployeeRankHistory } from './employee-rank-history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeRankHistory])],
    providers: [DomainEmployeeRankHistoryService, DomainEmployeeRankHistoryRepository],
    exports: [DomainEmployeeRankHistoryService],
})
export class DomainEmployeeRankHistoryModule {}

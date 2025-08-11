import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainDepartmentModule } from '../../domain/department/department.module';
import { DomainPositionModule } from '../../domain/position/position.module';
import { DomainRankModule } from '../../domain/rank/rank.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';
import { DomainEmployeeRankHistoryModule } from '../../domain/employee-rank-history/employee-rank-history.module';
import { DomainUserModule } from '../../domain/user/user.module';

@Module({
    imports: [
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainRankModule,
        DomainEmployeeDepartmentPositionModule,
        DomainEmployeeRankHistoryModule,
        DomainUserModule,
    ],
    providers: [MigrationService],
    exports: [MigrationService],
})
export class MigrationModule {}

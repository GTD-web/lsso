import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MigrationService } from './migration.service';
import { MigrationController } from './migration.controller';
import { DomainEmployeeModule } from '../../domain/employee/employee.module';
import { DomainDepartmentModule } from '../../domain/department/department.module';
import { DomainPositionModule } from '../../domain/position/position.module';
import { DomainRankModule } from '../../domain/rank/rank.module';
import { DomainEmployeeDepartmentPositionModule } from '../../domain/employee-department-position/employee-department-position.module';
import { DomainEmployeeRankHistoryModule } from '../../domain/employee-rank-history/employee-rank-history.module';
import { typeOrmProductionConfig } from '../../../../libs/configs/typeorm-production.config';
import { Entities } from 'libs/database/entities';

@Module({
    imports: [
        // 실서버 DB 연결 (데이터 동기화용) - 환경변수로 활성화/비활성화

        TypeOrmModule.forRootAsync({
            name: 'production',
            inject: [ConfigService],
            useFactory: typeOrmProductionConfig,
        }),
        TypeOrmModule.forFeature(Entities),
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainRankModule,
        DomainEmployeeDepartmentPositionModule,
        DomainEmployeeRankHistoryModule,
    ],
    controllers: [MigrationController],
    providers: [MigrationService],
    exports: [MigrationService],
})
export class MigrationModule {}

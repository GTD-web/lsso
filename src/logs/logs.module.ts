import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from './services/logs.service';
import { Log } from './entities/log.entity';
import { AdminLogsController } from './controllers/admin.controller';
import { LogsAdminUseCase } from './usecases/admin.usecase';

@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    providers: [LogsService, LogsAdminUseCase],
    controllers: [AdminLogsController],
    exports: [LogsService, LogsAdminUseCase],
})
export class LogsModule {}

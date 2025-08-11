import { Module } from '@nestjs/common';
import { LogsService } from './services/logs.service';
import { AdminLogsController } from './controllers/admin.controller';
import { LogsAdminUseCase } from './usecases/admin.usecase';
import { DomainLogModule } from '../../../domain/log/log.module';

@Module({
    imports: [DomainLogModule],
    providers: [LogsService, LogsAdminUseCase],
    controllers: [AdminLogsController],
    exports: [LogsService, LogsAdminUseCase],
})
export class LogsModule {}

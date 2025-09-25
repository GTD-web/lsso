import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogApplicationService } from './log-application.service';
import { LogManagementContextModule } from '../../../context/log-management/log-management-context.module';

@Module({
    imports: [LogManagementContextModule],
    controllers: [LogController],
    providers: [LogApplicationService],
    exports: [LogApplicationService],
})
export class LogModule {}

import { Module } from '@nestjs/common';
import { LogManagementContextService } from './log-management-context.service';
import { DomainLogModule } from '../../domain/log/log.module';

@Module({
    imports: [DomainLogModule],
    providers: [LogManagementContextService],
    exports: [LogManagementContextService],
})
export class LogManagementContextModule {}

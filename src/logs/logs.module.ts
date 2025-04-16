import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from './logs.service';
import { Log } from './entities/log.entity';
import { AdminLogsController } from './admin-logs.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    providers: [LogsService],
    controllers: [AdminLogsController],
    exports: [LogsService],
})
export class LogsModule {}

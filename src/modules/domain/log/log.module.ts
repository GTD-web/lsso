import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainLogService } from './log.service';
import { DomainLogRepository } from './log.repository';
import { Log } from './log.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    providers: [DomainLogService, DomainLogRepository],
    exports: [DomainLogService],
})
export class DomainLogModule {}

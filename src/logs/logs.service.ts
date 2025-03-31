import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsService {
    constructor(
        @InjectRepository(Log)
        private logRepository: Repository<Log>,
    ) {}

    async createLog(data: CreateLogDto) {
        const log = this.logRepository.create(data);
        await this.logRepository.save(log);
    }
}

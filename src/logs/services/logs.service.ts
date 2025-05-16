import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Between, ILike, MoreThanOrEqual, LessThanOrEqual, Not } from 'typeorm';
import { Log } from '../entities/log.entity';
import { CreateLogDto } from '../dto/create-log.dto';
import { LogFilterDto, SortDirection } from '../dto/log-filter.dto';

@Injectable()
export class LogsService {
    private readonly logger = new Logger(LogsService.name);

    constructor(
        @InjectRepository(Log)
        private logRepository: Repository<Log>,
    ) {}

    async create(createLogDto: CreateLogDto): Promise<void> {
        const log = this.logRepository.create(createLogDto);
        await this.logRepository.insert(log);
    }

    async createMany(createLogDto: CreateLogDto[]): Promise<void> {
        await this.logRepository.insert(createLogDto);
    }

    async findAll(page = 1, limit = 10): Promise<{ logs: Log[]; total: number; page: number; totalPages: number }> {
        const [logs, total] = await this.logRepository.findAndCount({
            order: { requestTimestamp: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string): Promise<Log> {
        const log = await this.logRepository.findOne({ where: { id } });
        if (!log) {
            throw new NotFoundException(`Log with ID ${id} not found`);
        }
        return log;
    }

    async filterLogs(
        filterDto: LogFilterDto,
    ): Promise<{ logs: Log[]; total: number; page: number; totalPages: number }> {
        const {
            page = 1,
            limit = 10,
            startDate,
            endDate,
            method,
            url,
            statusCode,
            host,
            ip,
            system,
            errorsOnly,
            sortBy = 'requestTimestamp',
            sortDirection = SortDirection.DESC,
        } = filterDto;

        const where: FindOptionsWhere<Log> = {};

        if (startDate && endDate) {
            where.requestTimestamp = Between(startDate, endDate);
        } else if (startDate) {
            where.requestTimestamp = MoreThanOrEqual(startDate);
        } else if (endDate) {
            where.requestTimestamp = LessThanOrEqual(endDate);
        }

        if (url) {
            where.url = ILike(`%${url}%`);
        }

        if (host) {
            where.host = ILike(`%${host}%`);
        }

        if (ip) {
            where.ip = ILike(`%${ip}%`);
        }

        if (method) {
            where.method = method;
        }

        if (statusCode) {
            where.statusCode = statusCode;
        }

        if (errorsOnly) {
            where.isError = true;
        }

        if (system) {
            where.system = ILike(`%${system}%`);
        }

        const order: any = {};
        order[sortBy] = sortDirection;

        const [logs, total] = await this.logRepository.findAndCount({
            where,
            order,
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
}

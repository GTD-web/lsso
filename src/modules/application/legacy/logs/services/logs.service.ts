import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Between, ILike, MoreThanOrEqual, LessThanOrEqual, Not } from 'typeorm';
import { Log } from '../../../../../../libs/database/entities';
import { CreateLogDto } from '../dto/create-log.dto';
import { LogFilterDto, SortDirection } from '../dto/log-filter.dto';
import { DomainLogService } from '../../../../domain/log/log.service';
import { IRepositoryOptions } from '../../../../../../libs/common/interfaces/repository.interface';

@Injectable()
export class LogsService {
    private readonly logger = new Logger(LogsService.name);

    constructor(private readonly domainLogService: DomainLogService) {}

    async create(createLogDto: CreateLogDto): Promise<void> {
        await this.domainLogService.save(createLogDto);
    }

    async createMany(createLogDto: CreateLogDto[]): Promise<void> {
        for (const dto of createLogDto) {
            await this.domainLogService.create(dto);
        }
    }

    async findAll(page = 1, limit = 10): Promise<{ logs: Log[]; total: number; page: number; totalPages: number }> {
        const options: IRepositoryOptions<Log> = {
            order: { requestTimestamp: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        };
        const logs = await this.domainLogService.findAll(options);
        const allLogs = await this.domainLogService.findAll();
        const total = allLogs.length;

        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string): Promise<Log> {
        const log = await this.domainLogService.findOne({ where: { id } });
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

        const options: IRepositoryOptions<Log> = {
            where,
            order,
            skip: (page - 1) * limit,
            take: limit,
        };

        const logs = await this.domainLogService.findAll(options);
        const allFilteredLogs = await this.domainLogService.findAll({ where });
        const total = allFilteredLogs.length;

        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
}

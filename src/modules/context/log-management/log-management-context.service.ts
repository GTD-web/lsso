import { Injectable, Logger } from '@nestjs/common';
import { DomainLogService } from '../../domain/log/log.service';
import { Log } from '../../domain/log/log.entity';
import { FindOptionsWhere, Between, ILike, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { IRepositoryOptions } from '../../../../libs/common/interfaces/repository.interface';

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export interface LogFilterOptions {
    page?: number;
    limit?: number;
    startDate?: Date;
    endDate?: Date;
    method?: string;
    url?: string;
    statusCode?: number;
    host?: string;
    ip?: string;
    system?: string;
    errorsOnly?: boolean;
    sortBy?: string;
    sortDirection?: SortDirection;
}

@Injectable()
export class LogManagementContextService {
    private readonly logger = new Logger(LogManagementContextService.name);

    constructor(private readonly 로그서비스: DomainLogService) {}

    // ================================
    // 로그 조회 관리
    // ================================

    async 모든_로그를_조회한다(
        page = 1,
        limit = 10,
    ): Promise<{
        logs: Log[];
        total: number;
        page: number;
        totalPages: number;
    }> {
        const options: IRepositoryOptions<Log> = {
            order: { requestTimestamp: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        };

        const logs = await this.로그서비스.findAll(options);
        const allLogs = await this.로그서비스.findAll();
        const total = allLogs.length;

        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async 로그를_ID로_조회한다(id: string): Promise<Log | null> {
        return this.로그서비스.findOne({ where: { id } });
    }

    async 로그를_필터링하여_조회한다(filterOptions: LogFilterOptions): Promise<{
        logs: Log[];
        total: number;
        page: number;
        totalPages: number;
    }> {
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
        } = filterOptions;

        const where: FindOptionsWhere<Log> = {};

        // 날짜 범위 필터
        if (startDate && endDate) {
            where.requestTimestamp = Between(startDate, endDate);
        } else if (startDate) {
            where.requestTimestamp = MoreThanOrEqual(startDate);
        } else if (endDate) {
            where.requestTimestamp = LessThanOrEqual(endDate);
        }

        // URL 필터 (부분 검색)
        if (url) {
            where.url = ILike(`%${url}%`);
        }

        // 호스트 필터 (부분 검색)
        if (host) {
            where.host = ILike(`%${host}%`);
        }

        // IP 주소 필터 (부분 검색)
        if (ip) {
            where.ip = ILike(`%${ip}%`);
        }

        // HTTP 메서드 필터
        if (method) {
            where.method = method;
        }

        // 상태 코드 필터
        if (statusCode) {
            where.statusCode = statusCode;
        }

        // 에러만 필터링
        if (errorsOnly) {
            where.isError = true;
        }

        // 시스템 필터 (부분 검색)
        if (system) {
            where.system = ILike(`%${system}%`);
        }

        // 정렬 설정
        const order: any = {};
        order[sortBy] = sortDirection;

        const options: IRepositoryOptions<Log> = {
            where,
            order,
            skip: (page - 1) * limit,
            take: limit,
        };

        const logs = await this.로그서비스.findAll(options);
        const allFilteredLogs = await this.로그서비스.findAll({ where });
        const total = allFilteredLogs.length;

        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async 에러_로그를_조회한다(): Promise<Log[]> {
        return this.로그서비스.findErrorLogs();
    }

    async 시스템별_로그를_조회한다(system: string): Promise<Log[]> {
        return this.로그서비스.findBySystem(system);
    }

    async 느린_요청을_조회한다(minResponseTime: number = 1000): Promise<Log[]> {
        return this.로그서비스.findSlowRequests(minResponseTime);
    }

    async IP주소별_로그를_조회한다(ip: string): Promise<Log[]> {
        return this.로그서비스.findByIpAddress(ip);
    }

    async 로그인_로그를_조회한다(days: number = 7): Promise<Log[]> {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);

        const { logs } = await this.로그를_필터링하여_조회한다({
            startDate: fromDate,
            url: '/auth/login',
            limit: 1000,
        });

        return logs;
    }

    // ================================
    // 로그 생성 관리
    // ================================

    async 로그를_생성한다(logData: {
        host: string;
        method: string;
        url: string;
        params?: any;
        query?: any;
        body?: any;
        ip: string;
        userAgent: string;
        requestTimestamp?: Date;
        responseTimestamp?: Date;
        responseTime?: number;
        statusCode?: number;
        response?: any;
        system?: string;
        error?: any;
        isError?: boolean;
    }): Promise<Log> {
        return this.로그서비스.save(logData);
    }

    async 여러_로그를_생성한다(logsData: any[]): Promise<Log[]> {
        const logs: Log[] = [];
        for (const logData of logsData) {
            const log = await this.로그서비스.save(logData);
            logs.push(log);
        }
        return logs;
    }
}

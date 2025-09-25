import { Injectable, NotFoundException } from '@nestjs/common';
import { LogManagementContextService } from '../../../context/log-management/log-management-context.service';
import { CreateLogDto, LogFilterDto, LogResponseDto, LogsResponseDto } from './dto';
import { Log } from '../../../domain/log/log.entity';

@Injectable()
export class LogApplicationService {
    constructor(private readonly 로그관리컨텍스트서비스: LogManagementContextService) {}

    // ==================== 로그 생성 관리 ====================

    async 로그생성(createLogDto: CreateLogDto): Promise<LogResponseDto> {
        try {
            const log = await this.로그관리컨텍스트서비스.로그를_생성한다(createLogDto);
            return this.로그_엔티티를_DTO로_변환(log);
        } catch (error) {
            throw new Error('로그 생성에 실패했습니다.');
        }
    }

    async 여러로그생성(createLogDtos: CreateLogDto[]): Promise<LogResponseDto[]> {
        try {
            const logs = await this.로그관리컨텍스트서비스.여러_로그를_생성한다(createLogDtos);
            return logs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        } catch (error) {
            throw new Error('여러 로그 생성에 실패했습니다.');
        }
    }

    // ==================== 로그 조회 관리 ====================

    async 로그목록조회(page = 1, limit = 10): Promise<LogsResponseDto> {
        try {
            const result = await this.로그관리컨텍스트서비스.모든_로그를_조회한다(page, limit);

            return {
                logs: result.logs.map((log) => this.로그_엔티티를_DTO로_변환(log)),
                total: result.total,
                page: result.page,
                limit: limit,
                totalPages: result.totalPages,
            };
        } catch (error) {
            throw new NotFoundException('로그 목록 조회에 실패했습니다.');
        }
    }

    async 로그상세조회(id: string): Promise<LogResponseDto> {
        try {
            const log = await this.로그관리컨텍스트서비스.로그를_ID로_조회한다(id);
            if (!log) {
                throw new NotFoundException('해당 로그를 찾을 수 없습니다.');
            }
            return this.로그_엔티티를_DTO로_변환(log);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException('로그 조회에 실패했습니다.');
        }
    }

    async 로그필터링조회(filterDto: LogFilterDto): Promise<LogsResponseDto> {
        try {
            const filterOptions = {
                page: filterDto.page,
                limit: filterDto.limit,
                startDate: filterDto.startDate,
                endDate: filterDto.endDate,
                method: filterDto.method,
                url: filterDto.url,
                statusCode: filterDto.statusCode,
                host: filterDto.host,
                ip: filterDto.ip,
                system: filterDto.system,
                errorsOnly: filterDto.errorsOnly,
                sortBy: filterDto.sortBy,
                sortDirection: filterDto.sortDirection,
            };

            const result = await this.로그관리컨텍스트서비스.로그를_필터링하여_조회한다(filterOptions);

            return {
                logs: result.logs.map((log) => this.로그_엔티티를_DTO로_변환(log)),
                total: result.total,
                page: result.page,
                limit: filterDto.limit || 10,
                totalPages: result.totalPages,
            };
        } catch (error) {
            throw new NotFoundException('로그 필터링 조회에 실패했습니다.');
        }
    }

    async 에러로그조회(): Promise<LogResponseDto[]> {
        try {
            const errorLogs = await this.로그관리컨텍스트서비스.에러_로그를_조회한다();
            return errorLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        } catch (error) {
            throw new NotFoundException('에러 로그 조회에 실패했습니다.');
        }
    }

    async 시스템별로그조회(system: string): Promise<LogResponseDto[]> {
        try {
            const systemLogs = await this.로그관리컨텍스트서비스.시스템별_로그를_조회한다(system);
            return systemLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        } catch (error) {
            throw new NotFoundException('시스템별 로그 조회에 실패했습니다.');
        }
    }

    async 느린요청조회(minResponseTime = 1000): Promise<LogResponseDto[]> {
        try {
            const slowLogs = await this.로그관리컨텍스트서비스.느린_요청을_조회한다(minResponseTime);
            return slowLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        } catch (error) {
            throw new NotFoundException('느린 요청 조회에 실패했습니다.');
        }
    }

    async IP주소별로그조회(ip: string): Promise<LogResponseDto[]> {
        try {
            const ipLogs = await this.로그관리컨텍스트서비스.IP주소별_로그를_조회한다(ip);
            return ipLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        } catch (error) {
            throw new NotFoundException('IP주소별 로그 조회에 실패했습니다.');
        }
    }

    async 로그인로그조회(days = 7): Promise<LogResponseDto[]> {
        try {
            const loginLogs = await this.로그관리컨텍스트서비스.로그인_로그를_조회한다(days);
            return loginLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        } catch (error) {
            throw new NotFoundException('로그인 로그 조회에 실패했습니다.');
        }
    }

    // ==================== 헬퍼 메서드 ====================

    private 로그_엔티티를_DTO로_변환(log: Log): LogResponseDto {
        return {
            id: log.id,
            requestTimestamp: log.requestTimestamp,
            responseTimestamp: log.responseTimestamp,
            method: log.method,
            url: log.url,
            params: log.params,
            query: log.query,
            body: log.body,
            statusCode: log.statusCode,
            responseTime: log.responseTime,
            response: log.response,
            error: log.error,
            ip: log.ip,
            host: log.host,
            userAgent: log.userAgent,
            system: log.system,
            isError: log.isError,
        };
    }
}

import { Injectable, Logger } from '@nestjs/common';
import { LogsService } from '../services/logs.service';
import { LogFilterDto } from '../dto/log-filter.dto';
import { Log } from '../entities/log.entity';
import { LogResponseDto } from '../dto/log-response.dto';

@Injectable()
export class LogsAdminUseCase {
    private readonly logger = new Logger(LogsAdminUseCase.name);

    constructor(private readonly logsService: LogsService) {}

    /**
     * 로그 목록 조회
     * @param page 페이지 번호
     * @param limit 페이지당 항목 수
     * @returns 로그 목록과 페이지 정보
     */
    async findAll(page = 1, limit = 10): Promise<{ logs: Log[]; total: number; page: number; totalPages: number }> {
        console.log('findAll', page, limit);
        try {
            return await this.logsService.findAll(page, limit);
        } catch (error) {
            this.logger.error(`로그 목록 조회 중 오류 발생: ${error.message}`);
            return {
                logs: [],
                total: 0,
                page,
                totalPages: 0,
            };
        }
    }

    /**
     * 로그 상세 조회
     * @param id 로그 ID
     * @returns 로그 상세 정보
     */
    async findOne(id: string): Promise<Log> {
        try {
            return await this.logsService.findOne(id);
        } catch (error) {
            this.logger.error(`로그 상세 조회 중 오류 발생: ${error.message}`);
            throw error;
        }
    }

    /**
     * 로그 필터링
     * @param filterDto 필터 조건
     * @returns 필터링된 로그 목록과 페이지 정보
     */
    async filterLogs(
        filterDto: LogFilterDto,
    ): Promise<{ logs: Log[]; total: number; page: number; totalPages: number }> {
        try {
            return await this.logsService.filterLogs(filterDto);
        } catch (error) {
            this.logger.error(`로그 필터링 중 오류 발생: ${error.message}`);
            return {
                logs: [],
                total: 0,
                page: filterDto.page || 1,
                totalPages: 0,
            };
        }
    }

    /**
     * 로그인 관련 로그를 가져오는 함수
     * @param days 조회할 일수
     * @returns 로그인 관련 로그 목록
     */
    async findLoginLogs(days: number = 7): Promise<Log[]> {
        try {
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - days);

            const { logs } = await this.logsService.filterLogs({
                startDate: fromDate,
                url: '/auth/login',
                limit: 1000,
            });

            return logs;
        } catch (error) {
            this.logger.error(`로그인 로그를 가져오는 중 오류 발생: ${error.message}`);
            return [];
        }
    }

    /**
     * Log 엔티티를 LogResponseDto로 변환
     * @param log Log 엔티티
     * @returns LogResponseDto
     */
    mapLogToDto(log: Log): LogResponseDto {
        const responseDto = new LogResponseDto();
        responseDto.id = log.id;
        responseDto.requestTimestamp = log.requestTimestamp;
        responseDto.method = log.method;
        responseDto.url = log.url;
        responseDto.query = log.query;
        responseDto.body = log.body;
        responseDto.statusCode = log.statusCode;
        responseDto.responseTime = log.responseTime;
        responseDto.response = log.response;
        responseDto.error = log.error;
        responseDto.ip = log.ip;
        responseDto.host = log.host;
        responseDto.userAgent = log.userAgent;
        responseDto.system = log.system;
        return responseDto;
    }
}

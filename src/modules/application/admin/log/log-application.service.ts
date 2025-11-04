import { Injectable, NotFoundException } from '@nestjs/common';
import { LogManagementContextService } from '../../../context/log-management/log-management-context.service';
import { CreateLogDto, LogFilterDto, LogResponseDto, LogsResponseDto, TimeStatisticsDto } from './dto';
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

            // 모든 로그를 조회하여 통계 계산 (페이지네이션 없이)
            const allLogs = await this.로그관리컨텍스트서비스.로그를_필터링하여_조회한다({
                page: 1,
                limit: 100000, // 충분히 큰 값
            });
            const timeStatistics = this.시간별_응답_통계_계산(allLogs.allFilteredLogs || []);

            return {
                logs: result.logs.map((log) => this.로그_엔티티를_DTO로_변환(log)),
                total: result.total,
                page: result.page,
                limit: limit,
                totalPages: result.totalPages,
                timeStatistics,
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

            // 시간별 응답 종류별 통계 계산
            const timeStatistics = this.시간별_응답_통계_계산(result.allFilteredLogs || []);

            return {
                logs: result.logs.map((log) => this.로그_엔티티를_DTO로_변환(log)),
                total: result.total,
                page: result.page,
                limit: filterDto.limit || 10,
                totalPages: result.totalPages,
                timeStatistics,
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

    /**
     * 시간별 응답 종류별 통계 계산 (빈 시간대도 0으로 채움)
     */
    private 시간별_응답_통계_계산(logs: Log[]): TimeStatisticsDto[] {
        const timeMap = new Map<string, { success: number; fail: number }>();

        // 유효한 타임스탬프가 있는 로그만 필터링
        const validLogs = logs.filter((log) => log.requestTimestamp);

        if (validLogs.length === 0) {
            return [];
        }

        // 최소 시간과 최대 시간 찾기
        const timestamps = validLogs.map((log) => log.requestTimestamp!);
        const minTime = new Date(Math.min(...timestamps.map((t) => t.getTime())));
        const maxTime = new Date(Math.max(...timestamps.map((t) => t.getTime())));

        // 최소 시간부터 최대 시간까지 모든 1분 단위 시간대 생성
        const allTimeKeys = this.모든_시간대_생성(minTime, maxTime);

        // 모든 시간대를 0으로 초기화
        allTimeKeys.forEach((timeKey) => {
            timeMap.set(timeKey, { success: 0, fail: 0 });
        });

        // 실제 데이터 집계
        validLogs.forEach((log) => {
            const timeKey = this.시간_키_생성(log.requestTimestamp!);
            const stats = timeMap.get(timeKey);

            if (stats) {
                // 응답 상태 판단
                if (this.응답_성공_여부(log)) {
                    stats.success++;
                } else {
                    stats.fail++;
                }
            }
        });

        // Map을 배열로 변환 (시간순 정렬)
        return allTimeKeys.map((time) => {
            const stats = timeMap.get(time)!;
            return { [time]: stats } as TimeStatisticsDto;
        });
    }

    /**
     * 최소 시간부터 최대 시간까지 모든 1분 단위 시간대 생성
     */
    private 모든_시간대_생성(minTime: Date, maxTime: Date): string[] {
        const timeKeys: string[] = [];
        const current = new Date(minTime);

        // 분 단위로 정규화 (초, 밀리초 제거)
        current.setSeconds(0, 0);

        const max = new Date(maxTime);
        max.setSeconds(0, 0);

        while (current <= max) {
            timeKeys.push(this.시간_키_생성(current));
            // 1분 추가
            current.setMinutes(current.getMinutes() + 1);
        }

        return timeKeys;
    }

    /**
     * 시간 키 생성 (YYYY-MM-DD HH:MM:00 형식 - 1분 단위)
     */
    private 시간_키_생성(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:00`;
    }

    /**
     * 응답 성공 여부 판단
     */
    private 응답_성공_여부(log: Log): boolean {
        // isError가 true이면 실패
        if (log.isError) {
            return false;
        }

        // statusCode가 있으면 상태 코드로 판단
        if (log.statusCode !== null && log.statusCode !== undefined) {
            // 200-299: 성공
            if (log.statusCode >= 200 && log.statusCode < 300) {
                return true;
            }
            // 300-399: 리다이렉트 (성공으로 간주)
            if (log.statusCode >= 300 && log.statusCode < 400) {
                return true;
            }
            // 400 이상: 실패
            return false;
        }

        // statusCode와 isError가 모두 없으면 기본적으로 성공으로 간주
        return true;
    }
}

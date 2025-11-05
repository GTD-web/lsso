import { Injectable, NotFoundException } from '@nestjs/common';
import { LogManagementContextService } from '../../../context/log-management/log-management-context.service';
import {
    CreateLogDto,
    LogFilterDto,
    LogResponseDto,
    LogsResponseDto,
    TimeStatisticsResponseDto,
    TimeStatisticsDto,
    TimeStatisticsFilterDto,
    SortDirection,
} from './dto';
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

    async 시간별응답통계조회(filterDto: TimeStatisticsFilterDto): Promise<TimeStatisticsResponseDto> {
        try {
            const filterOptions = {
                page: 1,
                limit: 100000, // 충분히 큰 값으로 모든 필터링된 로그 조회
                startDate: filterDto.startDate,
                endDate: filterDto.endDate,
                method: filterDto.method,
                url: filterDto.url,
                statusCode: filterDto.statusCode,
                host: filterDto.host,
                ip: filterDto.ip,
                system: filterDto.system,
                errorsOnly: filterDto.errorsOnly,
                sortBy: 'requestTimestamp',
                sortDirection: SortDirection.ASC,
            };

            const result = await this.로그관리컨텍스트서비스.로그를_필터링하여_조회한다(filterOptions);

            // 시간별 응답 종류별 통계 계산
            const timeUnit = filterDto.timeUnit || '1m';
            const timeStatistics = this.시간별_응답_통계_계산(
                result.allFilteredLogs || [],
                filterDto.startDate,
                filterDto.endDate,
                timeUnit,
            );

            return {
                timeStatistics,
            };
        } catch (error) {
            throw new NotFoundException('시간별 응답 통계 조회에 실패했습니다.');
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
    private 시간별_응답_통계_계산(
        logs: Log[],
        startDate?: Date,
        endDate?: Date,
        timeUnit: string = '1m',
    ): TimeStatisticsDto[] {
        const timeMap = new Map<string, { success: number; fail: number }>();

        // 유효한 타임스탬프가 있는 로그만 필터링
        const validLogs = logs.filter((log) => log.requestTimestamp);

        // 최소 시간과 최대 시간 결정
        let minTime: Date;
        let maxTime: Date;

        if (startDate && endDate) {
            // 요청으로 들어온 startDate와 endDate를 기준으로 사용
            minTime = new Date(startDate);
            maxTime = new Date(endDate);
        } else if (validLogs.length === 0) {
            return [];
        } else {
            // startDate나 endDate가 없으면 로그 데이터에서 찾기
            const timestamps = validLogs.map((log) => log.requestTimestamp!);
            minTime = new Date(Math.min(...timestamps.map((t) => t.getTime())));
            maxTime = new Date(Math.max(...timestamps.map((t) => t.getTime())));
        }

        // 시간 단위 파싱 (예: "10m" -> { value: 10, unit: 'm' })
        const parsedTimeUnit = this.시간_단위_파싱(timeUnit);

        // 최소 시간부터 최대 시간까지 지정된 단위로 시간대 생성
        const allTimeKeys = this.모든_시간대_생성(minTime, maxTime, parsedTimeUnit);

        // 모든 시간대를 0으로 초기화
        allTimeKeys.forEach((timeKey) => {
            timeMap.set(timeKey, { success: 0, fail: 0 });
        });

        // 실제 데이터 집계
        validLogs.forEach((log) => {
            // 로그 시간을 단위에 맞게 정규화
            const normalizedDate = this.시간_정규화(log.requestTimestamp!, parsedTimeUnit);
            const timeKey = this.시간_키_생성(normalizedDate, parsedTimeUnit);
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
     * 시간 단위 파싱 (예: "10m" -> { value: 10, unit: 'm' })
     */
    private 시간_단위_파싱(timeUnit: string): { value: number; unit: 'm' | 'h' | 'd' } {
        const match = timeUnit.match(/^(\d+)([mhd])$/);
        if (!match) {
            throw new Error(`잘못된 시간 단위 형식입니다: ${timeUnit}`);
        }
        return {
            value: parseInt(match[1], 10),
            unit: match[2] as 'm' | 'h' | 'd',
        };
    }

    /**
     * 시간을 지정된 단위에 맞게 정규화
     */
    private 시간_정규화(date: Date, parsedTimeUnit: { value: number; unit: 'm' | 'h' | 'd' }): Date {
        const normalized = new Date(date);

        if (parsedTimeUnit.unit === 'm') {
            // 분 단위로 정규화 (초, 밀리초 제거)
            normalized.setSeconds(0, 0);
            // 분을 단위의 배수로 정규화
            const normalizedMinutes = Math.floor(normalized.getMinutes() / parsedTimeUnit.value) * parsedTimeUnit.value;
            normalized.setMinutes(normalizedMinutes, 0);
        } else if (parsedTimeUnit.unit === 'h') {
            // 시간 단위로 정규화 (분, 초, 밀리초 제거)
            normalized.setMinutes(0, 0, 0);
            // 시간을 단위의 배수로 정규화
            const normalizedHours = Math.floor(normalized.getHours() / parsedTimeUnit.value) * parsedTimeUnit.value;
            normalized.setHours(normalizedHours, 0, 0, 0);
        } else if (parsedTimeUnit.unit === 'd') {
            // 일 단위로 정규화 (시, 분, 초, 밀리초 제거)
            normalized.setHours(0, 0, 0, 0);
            // 일 단위는 날짜 그대로 사용 (단위 배수 정규화 불필요)
        }

        return normalized;
    }

    /**
     * 최소 시간부터 최대 시간까지 지정된 단위로 시간대 생성
     */
    private 모든_시간대_생성(
        minTime: Date,
        maxTime: Date,
        parsedTimeUnit: { value: number; unit: 'm' | 'h' | 'd' },
    ): string[] {
        const timeKeys: string[] = [];
        const current = new Date(minTime);

        // 단위에 따라 정규화
        if (parsedTimeUnit.unit === 'm') {
            // 분 단위로 정규화 (초, 밀리초 제거)
            current.setSeconds(0, 0);
            // 분을 단위의 배수로 정규화 (예: 10분 단위면 10분 단위로 맞춤)
            const normalizedMinutes = Math.floor(current.getMinutes() / parsedTimeUnit.value) * parsedTimeUnit.value;
            current.setMinutes(normalizedMinutes, 0);
        } else if (parsedTimeUnit.unit === 'h') {
            // 시간 단위로 정규화 (분, 초, 밀리초 제거)
            current.setMinutes(0, 0, 0);
            // 시간을 단위의 배수로 정규화 (예: 2시간 단위면 2시간 단위로 맞춤)
            const normalizedHours = Math.floor(current.getHours() / parsedTimeUnit.value) * parsedTimeUnit.value;
            current.setHours(normalizedHours, 0, 0, 0);
        } else if (parsedTimeUnit.unit === 'd') {
            // 일 단위로 정규화 (시, 분, 초, 밀리초 제거)
            current.setHours(0, 0, 0, 0);
            // 일 단위는 시작일을 기준으로 단위만큼 증가 (별도 정규화 불필요)
        }

        const max = new Date(maxTime);
        if (parsedTimeUnit.unit === 'm') {
            max.setSeconds(0, 0);
        } else if (parsedTimeUnit.unit === 'h') {
            max.setMinutes(0, 0, 0);
        } else if (parsedTimeUnit.unit === 'd') {
            max.setHours(0, 0, 0, 0);
        }

        while (current <= max) {
            timeKeys.push(this.시간_키_생성(current, parsedTimeUnit));
            // 단위에 따라 시간 증가
            if (parsedTimeUnit.unit === 'm') {
                current.setMinutes(current.getMinutes() + parsedTimeUnit.value);
            } else if (parsedTimeUnit.unit === 'h') {
                current.setHours(current.getHours() + parsedTimeUnit.value);
            } else if (parsedTimeUnit.unit === 'd') {
                current.setDate(current.getDate() + parsedTimeUnit.value);
            }
        }

        return timeKeys;
    }

    /**
     * 시간 키 생성 (단위에 따라 형식 변경)
     */
    private 시간_키_생성(date: Date, parsedTimeUnit: { value: number; unit: 'm' | 'h' | 'd' }): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        if (parsedTimeUnit.unit === 'd') {
            // 일 단위: YYYY-MM-DD 형식
            return `${year}-${month}-${day}`;
        } else if (parsedTimeUnit.unit === 'h') {
            // 시간 단위: YYYY-MM-DD HH:00:00 형식
            const hour = String(date.getHours()).padStart(2, '0');
            return `${year}-${month}-${day} ${hour}:00:00`;
        } else {
            // 분 단위: YYYY-MM-DD HH:MM:00 형식
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hour}:${minute}:00`;
        }
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

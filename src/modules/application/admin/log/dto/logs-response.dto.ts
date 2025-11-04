import { ApiProperty } from '@nestjs/swagger';
import { LogResponseDto } from './log-response.dto';

export class TimeStatisticsDto {
    [time: string]: {
        success: number;
        fail: number;
    };
}

export class LogsResponseDto {
    @ApiProperty({ description: '로그 목록', type: [LogResponseDto] })
    logs: LogResponseDto[];

    @ApiProperty({ description: '전체 로그 수' })
    total: number;

    @ApiProperty({ description: '현재 페이지 번호' })
    page: number;

    @ApiProperty({ description: '페이지당 항목 수' })
    limit: number;

    @ApiProperty({ description: '전체 페이지 수' })
    totalPages: number;

    @ApiProperty({
        description: '시간별 응답 종류별 통계',
        type: [TimeStatisticsDto],
        example: [{ '2025-11-04 09:00:00': { success: 10, fail: 5 } }],
    })
    timeStatistics: TimeStatisticsDto[];
}

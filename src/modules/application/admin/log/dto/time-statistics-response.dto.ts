import { ApiProperty } from '@nestjs/swagger';
import { TimeStatisticsDto } from './logs-response.dto';

export class TimeStatisticsResponseDto {
    @ApiProperty({
        description: '시간별 응답 종류별 통계',
        type: [TimeStatisticsDto],
        example: [{ '2025-11-04 09:00:00': { success: 10, fail: 5 } }],
    })
    timeStatistics: TimeStatisticsDto[];
}


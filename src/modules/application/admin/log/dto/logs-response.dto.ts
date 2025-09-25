import { ApiProperty } from '@nestjs/swagger';
import { LogResponseDto } from './log-response.dto';

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
}

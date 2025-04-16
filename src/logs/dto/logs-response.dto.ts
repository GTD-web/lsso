import { ApiProperty } from '@nestjs/swagger';
import { LogResponseDto } from './log-response.dto';

export class LogsResponseDto {
    @ApiProperty({ description: 'Array of log entries', type: [LogResponseDto] })
    logs: LogResponseDto[];

    @ApiProperty({ description: 'Total number of log entries matching the criteria' })
    total: number;

    @ApiProperty({ description: 'Current page number' })
    page: number;

    @ApiProperty({ description: 'Number of logs per page' })
    limit: number;
}

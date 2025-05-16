import { ApiProperty } from '@nestjs/swagger';

export class LogResponseDto {
    @ApiProperty({ description: 'Unique identifier for the log entry' })
    id: string;

    @ApiProperty({ description: 'Timestamp when the log was created' })
    timestamp: Date;

    @ApiProperty({ description: 'HTTP method of the request' })
    method: string;

    @ApiProperty({ description: 'URL path of the request' })
    url: string;

    @ApiProperty({ description: 'Query parameters of the request', required: false })
    query?: Record<string, any>;

    @ApiProperty({ description: 'Request headers', required: false })
    headers?: Record<string, string>;

    @ApiProperty({ description: 'Request body', required: false })
    body?: any;

    @ApiProperty({ description: 'Response status code' })
    statusCode: number;

    @ApiProperty({ description: 'Response time in milliseconds' })
    responseTime: number;

    @ApiProperty({ description: 'Response body', required: false })
    response?: any;

    @ApiProperty({ description: 'Error message if any', required: false })
    error?: string;

    @ApiProperty({ description: 'IP address of the requester' })
    ip: string;

    @ApiProperty({ description: 'Host of the request' })
    host: string;

    @ApiProperty({ description: 'User agent of the requester', required: false })
    userAgent?: string;

    @ApiProperty({ description: 'System name', required: false })
    system?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LogResponseDto {
    @ApiProperty({ description: '로그 ID' })
    id: string;

    @ApiProperty({ description: '요청 시간' })
    requestTimestamp: Date;

    @ApiPropertyOptional({ description: '응답 완료 시간' })
    responseTimestamp?: Date;

    @ApiProperty({ description: 'HTTP 메서드' })
    method: string;

    @ApiProperty({ description: 'URL 경로' })
    url: string;

    @ApiPropertyOptional({ description: '요청 파라미터' })
    params?: Record<string, any>;

    @ApiPropertyOptional({ description: '쿼리 파라미터' })
    query?: Record<string, any>;

    @ApiPropertyOptional({ description: '요청 본문' })
    body?: any;

    @ApiProperty({ description: 'HTTP 상태 코드' })
    statusCode: number;

    @ApiPropertyOptional({ description: '응답 시간 (밀리초)' })
    responseTime?: number;

    @ApiPropertyOptional({ description: '응답 본문' })
    response?: any;

    @ApiPropertyOptional({ description: '에러 정보' })
    error?: any;

    @ApiProperty({ description: 'IP 주소' })
    ip: string;

    @ApiProperty({ description: '호스트' })
    host: string;

    @ApiProperty({ description: '사용자 에이전트' })
    userAgent: string;

    @ApiPropertyOptional({ description: '시스템 구분자' })
    system?: string;

    @ApiProperty({ description: '에러 발생 여부' })
    isError: boolean;
}

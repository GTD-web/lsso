import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsDate, IsBoolean, Matches } from 'class-validator';

export class TimeStatisticsFilterDto {
    @ApiProperty({ description: '시작 날짜', required: true })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: '종료 날짜', required: true })
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @ApiPropertyOptional({
        description: '시간 통계 단위 (예: 10m, 2h, 1d)',
        default: '1m',
        example: '10m',
    })
    @IsString()
    @Matches(/^\d+[mhd]$/, {
        message: 'timeUnit은 숫자와 단위(m/h/d)를 포함한 형식이어야 합니다. 예: 10m, 2h, 1d',
    })
    @IsOptional()
    timeUnit?: string = '1m';

    @ApiPropertyOptional({ description: 'HTTP 메서드' })
    @IsString()
    @IsOptional()
    method?: string;

    @ApiPropertyOptional({ description: 'URL 경로' })
    @IsString()
    @IsOptional()
    url?: string;

    @ApiPropertyOptional({ description: 'HTTP 상태 코드' })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    statusCode?: number;

    @ApiPropertyOptional({ description: '호스트' })
    @IsString()
    @IsOptional()
    host?: string;

    @ApiPropertyOptional({ description: 'IP 주소' })
    @IsString()
    @IsOptional()
    ip?: string;

    @ApiPropertyOptional({ description: '시스템 구분자' })
    @IsString()
    @IsOptional()
    system?: string;

    @ApiPropertyOptional({ description: '에러만 조회 (상태코드 >= 400)', default: false })
    @Type(() => Boolean)
    @IsBoolean()
    @IsOptional()
    errorsOnly?: boolean = false;
}

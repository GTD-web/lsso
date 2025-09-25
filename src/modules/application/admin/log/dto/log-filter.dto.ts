import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsDate, IsBoolean, IsEnum } from 'class-validator';

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class LogFilterDto {
    @ApiPropertyOptional({ description: '페이지 번호', default: 1 })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    page?: number = 1;

    @ApiPropertyOptional({ description: '페이지당 항목 수', default: 10 })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    limit?: number = 10;

    @ApiPropertyOptional({ description: '시작 날짜' })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    startDate?: Date;

    @ApiPropertyOptional({ description: '종료 날짜' })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    endDate?: Date;

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

    @ApiPropertyOptional({
        description: '정렬 기준',
        default: 'requestTimestamp',
        enum: ['requestTimestamp', 'method', 'url', 'statusCode', 'responseTime', 'ip', 'host'],
    })
    @IsString()
    @IsOptional()
    sortBy?: string = 'requestTimestamp';

    @ApiPropertyOptional({
        description: '정렬 방향',
        default: SortDirection.DESC,
        enum: SortDirection,
    })
    @IsEnum(SortDirection)
    @IsOptional()
    sortDirection?: SortDirection = SortDirection.DESC;
}

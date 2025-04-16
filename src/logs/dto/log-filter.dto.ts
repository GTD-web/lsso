import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsDate, IsBoolean, IsEnum, IsIn } from 'class-validator';

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class LogFilterDto {
    @ApiProperty({ description: 'Page number', required: false, default: 1 })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    page?: number = 1;

    @ApiProperty({ description: 'Number of logs per page', required: false, default: 10 })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    limit?: number = 10;

    @ApiProperty({ description: 'Start date for filtering logs', required: false })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    startDate?: Date;

    @ApiProperty({ description: 'End date for filtering logs', required: false })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'Search term (searches in URL)', required: false })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiProperty({ description: 'HTTP method filter', required: false })
    @IsString()
    @IsOptional()
    method?: string;

    @ApiProperty({ description: 'URL path filter', required: false })
    @IsString()
    @IsOptional()
    url?: string;

    @ApiProperty({ description: 'Status code filter', required: false })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    statusCode?: number;

    @ApiProperty({ description: 'Host filter', required: false })
    @IsString()
    @IsOptional()
    host?: string;

    @ApiProperty({ description: 'IP address filter', required: false })
    @IsString()
    @IsOptional()
    ip?: string;

    @ApiProperty({ description: 'Show only errors (status >= 400)', required: false, default: false })
    @Type(() => Boolean)
    @IsBoolean()
    @IsOptional()
    errorsOnly?: boolean = false;

    @ApiProperty({
        description: 'Field to sort by',
        required: false,
        default: 'requestTimestamp',
        enum: ['requestTimestamp', 'method', 'url', 'statusCode', 'responseTime', 'ip', 'host'],
    })
    @IsString()
    @IsOptional()
    sortBy?: string = 'requestTimestamp';

    @ApiProperty({
        description: 'Sort direction',
        required: false,
        default: SortDirection.DESC,
        enum: SortDirection,
    })
    @IsEnum(SortDirection)
    @IsOptional()
    sortDirection?: SortDirection = SortDirection.DESC;
}

import { IsString, IsObject, IsDate, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateLogDto {
    @IsString()
    method: string;

    @IsString()
    url: string;

    @IsObject()
    @IsOptional()
    params?: any;

    @IsObject()
    @IsOptional()
    query?: any;

    @IsObject()
    @IsOptional()
    body?: any;

    @IsString()
    ip: string;

    @IsString()
    host: string;

    @IsString()
    userAgent: string;

    @IsString()
    @IsOptional()
    system?: string;

    @IsDate()
    @IsOptional()
    requestTimestamp?: Date;

    @IsDate()
    @IsOptional()
    responseTimestamp?: Date;

    @IsNumber()
    @IsOptional()
    responseTime?: number;

    @IsNumber()
    @IsOptional()
    statusCode?: number;

    @IsObject()
    @IsOptional()
    response?: any;

    @IsObject()
    @IsOptional()
    error?: any;

    @IsBoolean()
    @IsOptional()
    isError?: boolean;
}

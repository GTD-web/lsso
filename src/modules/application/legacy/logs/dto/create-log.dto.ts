import { IsString, IsObject, IsDate, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateLogDto {
    @IsString()
    method: string;

    @IsString()
    url: string;

    @IsObject()
    params: any;

    @IsObject()
    query: any;

    @IsObject()
    body: any;

    @IsString()
    ip: string;

    @IsString()
    userAgent: string;

    @IsDate()
    requestTimestamp: Date;

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

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreateTokenDto {
    @ApiProperty({
        description: '직원 ID',
        example: '987fcdeb-51a2-43b7-89cd-321654987000',
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    employeeId: string;

    @ApiPropertyOptional({ description: '사번', example: '24020' })
    @IsOptional()
    @IsString()
    employeeNumber?: string;

    @ApiPropertyOptional({ description: '액세스 토큰 만료 일수', default: 30, minimum: 1, maximum: 365 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(365)
    expiresInDays?: number;

    @ApiPropertyOptional({ description: '리프레시 토큰 만료 일수', default: 90, minimum: 30, maximum: 730 })
    @IsOptional()
    @IsInt()
    @Min(30)
    @Max(730)
    refreshExpiresInDays?: number;

    @ApiPropertyOptional({ description: '액세스 토큰' })
    @IsOptional()
    @IsString()
    accessToken?: string;

    @ApiPropertyOptional({ description: '리프레시 토큰' })
    @IsOptional()
    @IsString()
    refreshToken?: string;

    @ApiPropertyOptional({ description: '토큰 만료 일시' })
    @IsOptional()
    tokenExpiresAt?: Date;

    @ApiPropertyOptional({ description: '리프레시 토큰 만료 일시' })
    @IsOptional()
    refreshTokenExpiresAt?: Date;

    @ApiPropertyOptional({ description: '클라이언트 정보' })
    @IsOptional()
    @IsString()
    clientInfo?: string;

    @ApiPropertyOptional({ description: 'IP 주소' })
    @IsOptional()
    @IsString()
    ipAddress?: string;
}

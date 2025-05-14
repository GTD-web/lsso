import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreateTokenDto {
    @ApiProperty({
        description: '사용자 ID',
        example: '987fcdeb-51a2-43b7-89cd-321654987000',
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

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
}

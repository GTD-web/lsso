import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, Max } from 'class-validator';

export class RenewTokenDto {
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

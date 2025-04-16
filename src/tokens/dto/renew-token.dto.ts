import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class RenewTokenDto {
    @ApiProperty({
        description: '토큰 만료 일수 (기본값 30일)',
        example: 90,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    expiresInDays?: number;
}

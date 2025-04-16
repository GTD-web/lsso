import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTokenDto {
    @ApiProperty({
        description: '사용자 ID',
        example: '987fcdeb-51a2-43b7-89cd-321654987000',
    })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({
        description: '시스템 ID',
        example: '456fcdeb-51a2-43b7-89cd-321654987123',
    })
    @IsNotEmpty()
    @IsString()
    systemId: string;

    @ApiProperty({
        description: '토큰 만료 일수 (기본값 30일)',
        example: 90,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    expiresInDays?: number;
}

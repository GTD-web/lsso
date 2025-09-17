import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateRankRequestDto {
    @ApiProperty({ description: '직급명', example: '과장' })
    @IsString()
    rankName: string;

    @ApiProperty({ description: '직급 코드', example: 'MANAGER' })
    @IsString()
    rankCode: string;

    @ApiProperty({ description: '직급 레벨 (낮을수록 상위 직급)', example: 3 })
    @IsNumber()
    level: number;
}

export class UpdateRankRequestDto {
    @ApiPropertyOptional({ description: '직급명', example: '과장' })
    @IsOptional()
    @IsString()
    rankName?: string;

    @ApiPropertyOptional({ description: '직급 코드', example: 'MANAGER' })
    @IsOptional()
    @IsString()
    rankCode?: string;

    @ApiPropertyOptional({ description: '직급 레벨 (낮을수록 상위 직급)', example: 3 })
    @IsOptional()
    @IsNumber()
    level?: number;
}

export class RankResponseDto {
    @ApiProperty({ description: '직급 ID' })
    id: string;

    @ApiProperty({ description: '직급명' })
    rankName: string;

    @ApiProperty({ description: '직급 코드' })
    rankCode: string;

    @ApiProperty({ description: '직급 레벨 (낮을수록 상위 직급)' })
    level: number;
}

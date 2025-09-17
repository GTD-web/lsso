import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreatePositionRequestDto {
    @ApiProperty({ description: '직책명', example: '부서장' })
    @IsString()
    positionTitle: string;

    @ApiProperty({ description: '직책 코드', example: 'DEPT_HEAD' })
    @IsString()
    positionCode: string;

    @ApiProperty({ description: '직책 레벨 (낮을수록 상위 직책)', example: 1 })
    @IsNumber()
    level: number;

    @ApiPropertyOptional({ description: '관리 권한 여부', example: true })
    @IsOptional()
    @IsBoolean()
    hasManagementAuthority?: boolean;
}

export class UpdatePositionRequestDto {
    @ApiPropertyOptional({ description: '직책명', example: '부서장' })
    @IsOptional()
    @IsString()
    positionTitle?: string;

    @ApiPropertyOptional({ description: '직책 코드', example: 'DEPT_HEAD' })
    @IsOptional()
    @IsString()
    positionCode?: string;

    @ApiPropertyOptional({ description: '직책 레벨 (낮을수록 상위 직책)', example: 1 })
    @IsOptional()
    @IsNumber()
    level?: number;

    @ApiPropertyOptional({ description: '관리 권한 여부', example: true })
    @IsOptional()
    @IsBoolean()
    hasManagementAuthority?: boolean;
}

export class PositionResponseDto {
    @ApiProperty({ description: '직책 ID' })
    id: string;

    @ApiProperty({ description: '직책명' })
    positionTitle: string;

    @ApiProperty({ description: '직책 코드' })
    positionCode: string;

    @ApiProperty({ description: '직책 레벨 (낮을수록 상위 직책)' })
    level: number;

    @ApiProperty({ description: '관리 권한 여부' })
    hasManagementAuthority: boolean;
}

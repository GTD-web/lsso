import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsBoolean, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateSystemRoleDto {
    @ApiProperty({ description: '시스템 ID' })
    @IsUUID()
    systemId: string;

    @ApiProperty({ description: '역할 이름', example: '관리자' })
    @IsString()
    roleName: string;

    @ApiProperty({ description: '역할 코드', example: 'admin' })
    @IsString()
    roleCode: string;

    @ApiPropertyOptional({ description: '역할 설명', example: '시스템 전체 관리 권한' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: '권한 목록',
        example: ['read', 'write', 'delete'],
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    permissions?: string[];

    @ApiPropertyOptional({ description: '정렬 순서', example: 1 })
    @IsOptional()
    @IsNumber()
    sortOrder?: number;

    @ApiPropertyOptional({ description: '활성화 상태', example: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

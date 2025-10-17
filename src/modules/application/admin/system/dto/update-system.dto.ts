import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class UpdateSystemDto {
    @ApiPropertyOptional({ description: '시스템 이름', example: 'RMS' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: '시스템 설명', example: '리소스 관리 시스템' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: '도메인', example: 'rms.company.com' })
    @IsOptional()
    @IsString()
    domain?: string;

    @ApiPropertyOptional({
        description: '허용된 오리진 목록',
        example: ['https://rms.company.com', 'https://admin.company.com'],
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    allowedOrigin?: string[];

    @ApiPropertyOptional({ description: '헬스체크 URL', example: 'https://rms.company.com/health' })
    @IsOptional()
    @IsUrl()
    healthCheckUrl?: string;
}

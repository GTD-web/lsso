import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsBoolean, IsOptional, IsUrl, ArrayMinSize } from 'class-validator';

export class CreateSystemDto {
    @ApiProperty({ description: '시스템 이름', example: 'RMS' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: '시스템 설명', example: '리소스 관리 시스템' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: '도메인', example: 'rms.company.com' })
    @IsString()
    domain: string;

    @ApiProperty({
        description: '허용된 오리진 목록',
        example: ['https://rms.company.com', 'https://admin.company.com'],
        type: [String],
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    allowedOrigin: string[];

    @ApiPropertyOptional({ description: '헬스체크 URL', example: 'https://rms.company.com/health' })
    @IsOptional()
    @IsUrl()
    healthCheckUrl?: string;

    @ApiPropertyOptional({ description: '활성화 상태', example: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

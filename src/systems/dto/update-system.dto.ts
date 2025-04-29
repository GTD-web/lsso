import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsUrl, IsOptional, IsBoolean } from 'class-validator';

export class UpdateSystemDto {
    @ApiProperty({
        description: '시스템 이름',
        example: 'Sample System',
        required: false,
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        description: '시스템 설명',
        example: 'This is a sample system description',
        required: false,
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: '허용된 출처 URL 목록',
        example: ['https://sample-system.com'],
        type: [String],
        required: false,
    })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    allowedOrigin: string[];

    @ApiProperty({
        description: '헬스 체크 URL',
        example: 'https://sample-system.com/health',
        required: false,
    })
    @IsString()
    @IsOptional()
    healthCheckUrl: string;

    @ApiProperty({
        description: '공개키/비밀키 쌍 재생성 여부 (주의: true로 설정 시 기존 키는 즉시 무효화됩니다)',
        example: false,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    regenerateKeys: boolean;
}

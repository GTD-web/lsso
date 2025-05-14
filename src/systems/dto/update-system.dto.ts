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
        description: '시스템 도메인',
        example: 'example.com',
        required: false,
    })
    @IsString()
    @IsOptional()
    domain: string;

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
        description: '클라이언트 ID',
        example: 'client-a1b2c3d4',
        required: false,
    })
    @IsString()
    @IsOptional()
    clientId?: string;

    @ApiProperty({
        description: '클라이언트 시크릿',
        example: 'secret-a1b2c3d4e5f6',
        required: false,
    })
    @IsString()
    @IsOptional()
    clientSecret?: string;

    @ApiProperty({
        description: '활성 여부',
        example: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

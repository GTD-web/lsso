import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsUrl, IsOptional, IsBoolean } from 'class-validator';

export class CreateSystemDto {
    @ApiProperty({
        description: '시스템 이름',
        example: 'Sample System',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
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
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    domain: string;

    @ApiProperty({
        description: '허용된 출처 URL 목록',
        example: ['https://sample-system.com'],
        type: [String],
        required: true,
    })
    @IsArray()
    @IsString({ each: true })
    // @IsUrl({}, { each: true })
    allowedOrigin: string[];

    @ApiProperty({
        description: '헬스 체크 URL',
        example: 'https://sample-system.com/health',
        required: false,
    })
    @IsString()
    // @IsUrl()
    @IsOptional()
    healthCheckUrl: string;

    @ApiProperty({
        description: '클라이언트 ID (입력하지 않으면 자동 생성)',
        example: 'client-a1b2c3d4',
        required: false,
    })
    @IsString()
    @IsOptional()
    clientId?: string;

    @ApiProperty({
        description: '클라이언트 시크릿 (입력하지 않으면 자동 생성)',
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
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

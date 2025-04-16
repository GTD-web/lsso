import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsUrl, IsOptional } from 'class-validator';

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
}

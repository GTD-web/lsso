import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
    @ApiPropertyOptional({
        description: '관리자 이메일',
        example: 'admin@example.com',
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({
        description: '관리자 이름',
        example: '홍길동',
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({
        description: '관리자 역할',
        example: 'admin',
    })
    @IsString()
    @IsOptional()
    role?: string;
}

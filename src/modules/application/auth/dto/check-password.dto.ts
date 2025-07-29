import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckPasswordRequestDto {
    @ApiProperty({
        description: '현재 비밀번호',
        example: 'currentPassword123',
    })
    @IsString()
    currentPassword: string;

    @ApiPropertyOptional({
        description: '이메일 (선택사항)',
        example: 'user@example.com',
    })
    @IsOptional()
    @IsEmail()
    email?: string;
}

export class CheckPasswordResponseDto {
    @ApiProperty({
        example: true,
        description: '비밀번호 일치 여부',
    })
    isValid: boolean;
}

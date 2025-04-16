import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
    @ApiProperty({
        description: '관리자 이메일',
        example: 'admin@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: '관리자 비밀번호',
        example: 'admin123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

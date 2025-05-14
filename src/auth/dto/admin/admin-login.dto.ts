import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginDto {
    @ApiProperty({
        description: '관리자 이메일',
        example: 'admin@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: '비밀번호',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

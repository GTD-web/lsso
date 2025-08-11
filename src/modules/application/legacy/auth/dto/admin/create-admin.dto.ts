import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
    @ApiProperty({
        description: '관리자 이메일',
        example: 'admin@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: '관리자 이름',
        example: '홍길동',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: '관리자 역할',
        example: 'admin',
    })
    @IsString()
    @IsNotEmpty()
    role: string;

    @ApiProperty({
        description: '비밀번호',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

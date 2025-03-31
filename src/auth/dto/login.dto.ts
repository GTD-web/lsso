import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: '사용자 이메일' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: '비밀번호' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: '클라이언트 ID' })
    @IsString()
    @IsNotEmpty()
    client_id: string;
}

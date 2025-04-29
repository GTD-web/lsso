import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: '사용자 이메일', example: 'kim.kyuhyun@lumir.space' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: '비밀번호', example: '1234' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: '클라이언트 ID', example: '457ea161-a0ae-4f2e-9b40-e7ac89285537' })
    @IsString()
    @IsNotEmpty()
    client_id: string;
}

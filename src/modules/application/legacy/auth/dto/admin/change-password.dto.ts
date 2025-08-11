import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @ApiProperty({
        description: '현재 비밀번호',
        example: 'current_password',
    })
    @IsString()
    @IsNotEmpty()
    currentPassword: string;

    @ApiProperty({
        description: '새 비밀번호',
        example: 'new_password123',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;
}

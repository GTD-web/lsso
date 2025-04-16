import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminTokenRefreshDto {
    @ApiProperty({
        description: '리프레시 토큰',
        example: 'rt_cd5f1342-a472-47d8-a44c-4e09128eb87e',
    })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}

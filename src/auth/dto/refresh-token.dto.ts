import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
    @ApiProperty({
        description: '리프레시 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;

    @ApiProperty({
        description: '시스템 ID',
        example: '01998b82-e415-4446-b35a-435a8697fbc2',
    })
    @IsNotEmpty()
    @IsString()
    systemId: string;
}

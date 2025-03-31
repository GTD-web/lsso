import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiProperty({ description: '액세스 토큰', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi...' })
    accessToken: string;

    @ApiProperty({
        description: '시크릿 키',
        example: '08c9124e08661f87e893544360d86d84de0154902fde79802d81ba7f0ec794a5',
    })
    secret: string;

    @ApiProperty({ description: '토큰 만료 시간', example: '2025-03-26T00:00:00.000Z' })
    expiresAt: Date;

    @ApiProperty({ description: '사용자 이름', example: '구석현' })
    name: string;

    @ApiProperty({ description: '사용자 이메일', example: 'koo.sukhyun@lumir.space' })
    email: string;

    @ApiProperty({ description: '사용자 사번', example: '24020' })
    employeeNumber: string;
}

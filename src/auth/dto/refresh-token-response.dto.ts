import { ApiProperty } from '@nestjs/swagger';

export class TokenRefreshDataDto {
    @ApiProperty({
        description: '새로운 액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    accessToken: string;

    @ApiProperty({
        description: '토큰 만료일',
        example: '2023-12-31T23:59:59Z',
    })
    expiresAt: Date;

    @ApiProperty({
        description: '새로운 리프레시 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    refreshToken: string;

    @ApiProperty({
        description: '리프레시 토큰 만료일',
        example: '2024-03-31T23:59:59Z',
    })
    refreshTokenExpiresAt: Date;
}

export class TokenErrorDto {
    @ApiProperty({
        description: '오류 코드',
        example: 'AUTH_REFRESH_ERROR',
    })
    code: string;

    @ApiProperty({
        description: '오류 메시지',
        example: '리프레시 토큰이 유효하지 않습니다.',
    })
    message: string;
}

export class RefreshTokenResponseDto {
    @ApiProperty({
        description: '응답 성공 여부',
        example: true,
    })
    success: boolean;

    @ApiProperty({
        description: '응답 데이터',
        nullable: true,
        type: TokenRefreshDataDto,
    })
    data?: TokenRefreshDataDto;

    @ApiProperty({
        description: '오류 정보',
        nullable: true,
        type: TokenErrorDto,
    })
    error?: TokenErrorDto;
}

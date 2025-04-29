import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TokenResponseDto {
    @ApiProperty({
        description: '토큰 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @ApiProperty({
        description: '사용자 ID',
        example: '987fcdeb-51a2-43b7-89cd-321654987000',
    })
    userId: string;

    @ApiProperty({
        description: '시스템 ID',
        example: '456fcdeb-51a2-43b7-89cd-321654987123',
    })
    systemId: string;

    @ApiProperty({
        description: '액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    accessToken: string;

    @ApiPropertyOptional({
        description: '리프레시 토큰',
    })
    refreshToken: string;

    @ApiProperty({
        description: '토큰 시크릿',
        example: 'a1b2c3d4e5f6g7h8i9j0...',
    })
    secret: string;

    @ApiProperty({
        description: '토큰 만료 일자',
        example: '2023-12-31T23:59:59Z',
    })
    tokenExpiresAt: Date;

    @ApiPropertyOptional({
        description: '리프레시 토큰 만료일',
    })
    refreshTokenExpiresAt: Date;

    @ApiPropertyOptional({
        description: '마지막 접근 일자',
        example: '2023-06-15T14:30:00Z',
        required: false,
    })
    lastAccess?: Date | null;

    @ApiProperty({
        description: '토큰 활성화 상태',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        description: '생성일',
        example: '2023-01-01T00:00:00Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: '수정일',
        example: '2023-01-01T00:00:00Z',
    })
    updatedAt: Date;

    @ApiProperty({
        description: '사용자 이름',
        example: '홍길동',
        required: false,
    })
    userName?: string;

    @ApiProperty({
        description: '사용자 이메일',
        example: 'user@example.com',
        required: false,
    })
    userEmail?: string;

    @ApiProperty({
        description: '시스템 이름',
        example: 'HR 시스템',
        required: false,
    })
    systemName?: string;
}

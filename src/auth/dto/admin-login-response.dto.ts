import { ApiProperty } from '@nestjs/swagger';

export class AdminUserDto {
    @ApiProperty({
        description: '사용자 ID',
        example: 'admin-001',
    })
    id: string;

    @ApiProperty({
        description: '사용자 이메일',
        example: 'admin@example.com',
    })
    email: string;

    @ApiProperty({
        description: '사용자 이름',
        example: '관리자',
    })
    name: string;

    @ApiProperty({
        description: '사용자 역할',
        example: 'admin',
    })
    role: string;
}

export class AdminAuthDataDto {
    @ApiProperty({
        description: '사용자 정보',
        type: AdminUserDto,
    })
    user: AdminUserDto;

    @ApiProperty({
        description: 'JWT 액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    token: string;

    @ApiProperty({
        description: '리프레시 토큰',
        example: 'rt_cd5f1342-a472-47d8-a44c-4e09128eb87e',
    })
    refreshToken: string;
}

export class AdminErrorDto {
    @ApiProperty({
        description: '오류 코드',
        example: 'AUTH_INVALID_CREDENTIALS',
    })
    code: string;

    @ApiProperty({
        description: '오류 메시지',
        example: '이메일 또는 비밀번호가 올바르지 않습니다.',
    })
    message: string;
}

export class AdminLoginResponseDto {
    @ApiProperty({
        description: '응답 성공 여부',
        example: true,
    })
    success: boolean;

    @ApiProperty({
        description: '응답 데이터',
        nullable: true,
        type: AdminAuthDataDto,
    })
    data?: AdminAuthDataDto;

    @ApiProperty({
        description: '오류 정보',
        nullable: true,
        type: AdminErrorDto,
    })
    error?: AdminErrorDto;
}

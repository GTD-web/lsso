import { ApiProperty } from '@nestjs/swagger';

export class UserAuthDataDto {
    @ApiProperty({ description: '액세스 토큰', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi...' })
    accessToken: string;

    @ApiProperty({ description: '토큰 만료 시간', example: '2025-03-26T00:00:00.000Z' })
    expiresAt: Date;

    @ApiProperty({
        description: '리프레시 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi...',
    })
    refreshToken: string;

    @ApiProperty({
        description: '리프레시 토큰 만료 시간',
        example: '2025-06-26T00:00:00.000Z',
    })
    refreshTokenExpiresAt: Date;

    @ApiProperty({ description: '사용자 이름', example: '구석현' })
    name: string;

    @ApiProperty({ description: '사용자 이메일', example: 'koo.sukhyun@lumir.space' })
    email: string;

    @ApiProperty({ description: '사용자 비밀번호', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    password: string;

    @ApiProperty({ description: '사용자 사번', example: '24020' })
    employeeNumber: string;

    @ApiProperty({ description: '사용자 전화번호', example: '010-1234-5678' })
    phoneNumber: string;

    @ApiProperty({ description: '사용자 생년월일', example: '1980-07-04T00:00:00.000Z' })
    dateOfBirth: Date;

    @ApiProperty({ description: '사용자 성별', example: 'MALE' })
    gender: string;

    @ApiProperty({ description: '사용자 입사일', example: '2024-05-21T00:00:00.000Z' })
    hireDate: Date;

    @ApiProperty({ description: '사용자 재직 상태', example: '재직중' })
    status: string;

    @ApiProperty({ description: '사용자 부서', example: '대표이사' })
    department: string;

    @ApiProperty({ description: '사용자 직위', example: '대표이사' })
    position: string;

    @ApiProperty({ description: '사용자 직급', example: '대표이사' })
    rank: string;
}

export class UserErrorDto {
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

export class LoginResponseDto {
    @ApiProperty({
        description: '응답 성공 여부',
        example: true,
    })
    success: boolean;

    @ApiProperty({
        description: '응답 데이터',
        nullable: true,
        type: UserAuthDataDto,
    })
    data?: UserAuthDataDto;

    @ApiProperty({
        description: '오류 정보',
        nullable: true,
        type: UserErrorDto,
    })
    error?: UserErrorDto;
}

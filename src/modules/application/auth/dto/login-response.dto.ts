import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiProperty({ example: 'Bearer', description: '토큰 타입' })
    tokenType: string;

    @ApiProperty({ description: '액세스 토큰' })
    accessToken: string;

    @ApiProperty({ example: 86400, description: '액세스 토큰 만료 시간(초)' })
    expiresIn: number;

    @ApiProperty({ description: '리프레시 토큰' })
    refreshToken: string;

    @ApiProperty({ example: 2592000, description: '리프레시 토큰 만료 시간(초)' })
    refreshTokenExpiresIn: number;

    @ApiProperty({ description: '사용자 ID' })
    id: string;

    @ApiProperty({ description: '사용자 이름' })
    name: string;

    @ApiProperty({ description: '사용자 이메일' })
    email: string;

    @ApiProperty({ description: '직원 번호' })
    employeeNumber: string;

    @ApiPropertyOptional({ description: '전화번호' })
    phoneNumber?: string;

    @ApiPropertyOptional({ description: '생년월일' })
    dateOfBirth?: string;

    @ApiPropertyOptional({ description: '성별' })
    gender?: string;

    @ApiProperty({ description: '입사일' })
    hireDate: string;

    @ApiProperty({ description: '직원 상태' })
    status: string;

    @ApiPropertyOptional({ description: '부서명' })
    department?: string;

    @ApiPropertyOptional({ description: '직책명' })
    position?: string;

    @ApiPropertyOptional({ description: '직급명' })
    rank?: string;

    @ApiProperty({ description: '시스템명' })
    system: string;
}

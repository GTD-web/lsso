import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
    @ApiProperty({ description: '사용자 ID' })
    id: string;

    @ApiProperty({ description: '사용자 이름' })
    name: string;

    @ApiProperty({ description: '사용자 이메일' })
    email: string;

    @ApiProperty({ description: '직원 번호' })
    employee_number: string;
}

export class TokenVerifyResponseDto {
    @ApiProperty({ example: true, description: '토큰 유효성' })
    valid: boolean;

    @ApiProperty({ type: UserInfoDto, description: '사용자 정보' })
    user_info: UserInfoDto;

    @ApiProperty({ example: 86400, description: '토큰 만료까지 남은 시간(초)' })
    expires_in: number;
}

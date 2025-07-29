import { IsString, IsEmail, IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum GrantType {
    PASSWORD = 'password',
    REFRESH_TOKEN = 'refresh_token',
}

export class LoginRequestDto {
    @ApiProperty({
        enum: GrantType,
        description: 'password: 사용자 인증 방식, refresh_token: 리프레시 토큰 방식',
        example: GrantType.PASSWORD,
    })
    @IsEnum(GrantType)
    grant_type: GrantType;

    @ApiPropertyOptional({
        description: '사용자 이메일 (grant_type이 password인 경우에만 필요)',
        example: 'user@example.com',
    })
    @ValidateIf((obj) => obj.grant_type === GrantType.PASSWORD)
    @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({
        description: '사용자 비밀번호 (grant_type이 password인 경우에만 필요)',
        example: 'password123',
    })
    @ValidateIf((obj) => obj.grant_type === GrantType.PASSWORD)
    @IsString()
    @IsOptional()
    password?: string;

    @ApiPropertyOptional({
        description: '리프레시 토큰 (grant_type이 refresh_token인 경우에만 필요)',
    })
    @ValidateIf((obj) => obj.grant_type === GrantType.REFRESH_TOKEN)
    @IsString()
    @IsOptional()
    refresh_token?: string;
}

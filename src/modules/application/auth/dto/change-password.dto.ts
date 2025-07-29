import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordRequestDto {
    @ApiProperty({
        description: '새 비밀번호',
        minLength: 6,
        example: 'newPassword123',
    })
    @IsString()
    @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
    newPassword: string;
}

export class ChangePasswordResponseDto {
    @ApiProperty({
        example: '비밀번호가 성공적으로 변경되었습니다.',
        description: '응답 메시지',
    })
    message: string;
}

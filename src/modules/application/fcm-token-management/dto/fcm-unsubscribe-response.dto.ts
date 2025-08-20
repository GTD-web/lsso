import { ApiProperty } from '@nestjs/swagger';

export class FcmUnsubscribeResponseDto {
    @ApiProperty({
        description: '구독 해지 성공 여부',
        example: true,
    })
    success: boolean;

    @ApiProperty({
        description: '응답 메시지',
        example: 'FCM 토큰 구독이 성공적으로 해지되었습니다.',
    })
    message: string;
}

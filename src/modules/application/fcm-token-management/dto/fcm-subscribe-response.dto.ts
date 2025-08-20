import { ApiProperty } from '@nestjs/swagger';

export class FcmSubscribeResponseDto {
    @ApiProperty({
        description: '구독 성공 여부',
        example: true,
    })
    success: boolean;

    @ApiProperty({
        description: '응답 메시지',
        example: 'FCM 토큰이 성공적으로 등록되었습니다.',
    })
    message: string;

    @ApiProperty({
        description: '등록된 FCM 토큰',
        example: 'eGb1fxhAPTM6F-XYvVQFNu:APA91bEniVqcKgVLvVeS5Z5FZ5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    })
    fcmToken: string;
}

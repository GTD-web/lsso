import { ApiProperty } from '@nestjs/swagger';

export class FcmSubscribeResponseDto {
    @ApiProperty({
        description: '등록된 FCM 토큰',
        example: 'eGb1fxhAPTM6F-XYvVQFNu:APA91bEniVqcKgVLvVeS5Z5FZ5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    })
    fcmToken: string;
}

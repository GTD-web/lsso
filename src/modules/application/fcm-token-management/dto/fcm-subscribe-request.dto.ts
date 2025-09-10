import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FcmSubscribeRequestDto {
    @ApiProperty({
        description: '직원 번호',
        example: '25001',
    })
    @IsString()
    @IsNotEmpty()
    employeeNumber: string;

    @ApiProperty({
        description: 'FCM 토큰',
        example: 'eGb1fxhAPTM6F-XYvVQFNu:APA91bEniVqcKgVLvVeS5Z5FZ5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    })
    @IsString()
    @IsNotEmpty()
    fcmToken: string;

    @ApiProperty({
        description: '기기 타입',
        example: 'pc, mobile',
    })
    @IsString()
    @IsNotEmpty()
    deviceType: string;
}

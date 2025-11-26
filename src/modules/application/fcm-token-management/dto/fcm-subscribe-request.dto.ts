import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEmployeeIdentifierDto } from './base-employee-identifier.dto';

export class FcmSubscribeRequestDto extends BaseEmployeeIdentifierDto {
    @ApiProperty({
        description: 'FCM 토큰',
        example: 'eGb1fxhAPTM6F-XYvVQFNu:APA91bEniVqcKgVLvVeS5Z5FZ5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    })
    @IsString()
    @IsNotEmpty()
    fcmToken: string;

    @ApiProperty({
        description: '디바이스 타입',
        example: 'lsms-prod, portal-prod',
    })
    @IsString()
    @IsNotEmpty()
    deviceType: string;

    @ApiProperty({
        description: '디바이스 정보',
        example: 'desktop, mobile',
    })
    @IsString()
    @IsNotEmpty()
    deviceInfo: string;
}

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
        description: '기기 타입',
        example: 'pc',
    })
    @IsString()
    @IsNotEmpty()
    deviceType: string;
}

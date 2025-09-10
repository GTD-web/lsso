import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEmployeeIdentifierDto } from './base-employee-identifier.dto';
import { DeviceType } from '../../../domain/fcm-token/fcm-token.entity';

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
        example: DeviceType.PC,
        enum: DeviceType,
    })
    @IsEnum(DeviceType)
    @IsNotEmpty()
    deviceType: DeviceType;
}

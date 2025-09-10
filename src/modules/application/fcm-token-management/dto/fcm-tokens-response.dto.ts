import { ApiProperty } from '@nestjs/swagger';
import { DeviceType } from '../../../domain/fcm-token/fcm-token.entity';

export class FcmTokenDto {
    @ApiProperty({ description: 'FCM 토큰' })
    fcmToken: string;

    @ApiProperty({
        description: '디바이스 타입',
        enum: DeviceType,
        example: DeviceType.PC,
    })
    deviceType: DeviceType;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;
}

export class FcmTokensResponseDto {
    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '직원 번호' })
    employeeNumber: string;

    @ApiProperty({
        description: 'FCM 토큰 목록',
        type: [FcmTokenDto],
    })
    tokens: FcmTokenDto[];
}

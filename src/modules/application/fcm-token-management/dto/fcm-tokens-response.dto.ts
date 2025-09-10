import { ApiProperty } from '@nestjs/swagger';

export class FcmTokenDto {
    @ApiProperty({ description: 'FCM 토큰' })
    fcmToken: string;

    @ApiProperty({
        description: '디바이스 타입 (예: android, ios, pc, web)',
        type: String,
        example: 'pc',
    })
    deviceType: string;

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

import { ApiProperty } from '@nestjs/swagger';

export class FcmTokenRemoveResultDto {
    @ApiProperty({ description: '직원 번호' })
    employeeNumber: string;

    @ApiProperty({ description: 'FCM 토큰 값' })
    fcmToken: string;

    @ApiProperty({ description: '삭제 성공 여부' })
    success: boolean;

    @ApiProperty({ description: '에러 메시지 (실패한 경우)', required: false })
    error?: string;
}

export class FcmRemoveTokenResponseDto {
    @ApiProperty({
        description: '각 직원-토큰 조합별 삭제 결과',
        type: [FcmTokenRemoveResultDto],
    })
    results: FcmTokenRemoveResultDto[];

    @ApiProperty({ description: '전체 삭제 시도 횟수' })
    totalAttempts: number;

    @ApiProperty({ description: '성공한 삭제 횟수' })
    successCount: number;

    @ApiProperty({ description: '실패한 삭제 횟수' })
    failCount: number;
}

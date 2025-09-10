import { ApiProperty } from '@nestjs/swagger';
import { FcmTokenDto, FcmTokensResponseDto } from './fcm-tokens-response.dto';
import { DeviceType } from '../../../domain/fcm-token/fcm-token.entity';

export class FlatFcmTokenDto extends FcmTokenDto {
    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '직원 번호' })
    employeeNumber: string;
}

export class MultipleFcmTokensResponseDto {
    @ApiProperty({
        description: '직원별로 그룹핑된 토큰 정보',
        type: [FcmTokensResponseDto],
    })
    byEmployee: FcmTokensResponseDto[];

    @ApiProperty({
        description: '모든 토큰의 flat한 배열',
        type: [FlatFcmTokenDto],
    })
    allTokens: FlatFcmTokenDto[];

    @ApiProperty({ description: '총 직원 수' })
    totalEmployees: number;

    @ApiProperty({ description: '총 토큰 수' })
    totalTokens: number;
}

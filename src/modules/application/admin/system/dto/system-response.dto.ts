import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SystemResponseDto {
    @ApiProperty({ description: '시스템 ID' })
    id: string;

    @ApiProperty({ description: '클라이언트 ID' })
    clientId: string;

    @ApiProperty({ description: '클라이언트 시크릿' })
    clientSecret: string;

    @ApiProperty({ description: '시스템 이름' })
    name: string;

    @ApiPropertyOptional({ description: '시스템 설명' })
    description?: string;

    @ApiProperty({ description: '도메인' })
    domain: string;

    @ApiProperty({ description: '허용된 오리진 목록', type: [String] })
    allowedOrigin: string[];

    @ApiPropertyOptional({ description: '헬스체크 URL' })
    healthCheckUrl?: string;

    @ApiProperty({ description: '활성화 상태' })
    isActive: boolean;

    @ApiProperty({ description: '생성일시' })
    createdAt: Date;

    @ApiProperty({ description: '수정일시' })
    updatedAt: Date;
}

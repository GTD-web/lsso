import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SystemInfoDto {
    @ApiProperty({ description: '시스템 ID' })
    id: string;

    @ApiProperty({ description: '클라이언트 ID' })
    clientId: string;

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

export class SystemRoleResponseDto {
    @ApiProperty({ description: '시스템 롤 ID' })
    id: string;

    @ApiProperty({ description: '시스템 ID' })
    systemId: string;

    @ApiProperty({ description: '역할 이름' })
    roleName: string;

    @ApiProperty({ description: '역할 코드' })
    roleCode: string;

    @ApiPropertyOptional({ description: '역할 설명' })
    description?: string;

    @ApiProperty({ description: '권한 목록', type: [String] })
    permissions: string[];

    @ApiProperty({ description: '정렬 순서' })
    sortOrder: number;

    @ApiProperty({ description: '활성화 상태' })
    isActive: boolean;

    @ApiProperty({ description: '기본 역할 여부 (직원 생성 시 자동 할당)' })
    isDefault: boolean;

    @ApiProperty({ description: '생성일시' })
    createdAt: Date;

    @ApiProperty({ description: '수정일시' })
    updatedAt: Date;

    @ApiPropertyOptional({ description: '시스템 정보', type: SystemInfoDto })
    system?: SystemInfoDto;
}

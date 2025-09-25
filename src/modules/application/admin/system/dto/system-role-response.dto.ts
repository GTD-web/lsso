import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

    @ApiProperty({ description: '생성일시' })
    createdAt: Date;

    @ApiProperty({ description: '수정일시' })
    updatedAt: Date;
}

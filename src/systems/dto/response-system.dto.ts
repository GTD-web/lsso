import { ApiProperty } from '@nestjs/swagger';

export class ResponseSystemDto {
    @ApiProperty({
        description: '시스템 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @ApiProperty({
        description: '시스템 이름',
        example: 'Sample System',
    })
    name: string;

    @ApiProperty({
        description: '시스템 설명',
        example: 'This is a sample system description',
    })
    description: string;

    @ApiProperty({
        description: '클라이언트 ID',
        example: '987fcdeb-51a2-43b7-89cd-321654987000',
    })
    clientId: string;

    @ApiProperty({
        description: '클라이언트 시크릿',
        example: 'a1b2c3d4e5f6g7h8i9j0...',
    })
    clientSecret: string;

    @ApiProperty({
        description: '허용된 출처 URL 목록',
        example: ['https://sample-system.com'],
        type: [String],
    })
    allowedOrigin: string[];

    @ApiProperty({
        description: '헬스 체크 URL',
        example: 'https://sample-system.com/health',
    })
    healthCheckUrl: string;

    @ApiProperty({
        description: '시스템 활성화 상태',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        description: '생성일',
        example: '2023-01-01T00:00:00Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: '수정일',
        example: '2023-01-01T00:00:00Z',
    })
    updatedAt: Date;
}

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
        description: '시스템 도메인',
        example: 'sample-system.com',
    })
    domain: string;

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

    // uuid 예시
    @ApiProperty({
        description: '클라이언트 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    clientId: string;

    // randomBytes(32).toString('hex') 예시
    @ApiProperty({
        description: '클라이언트 시크릿',
        example: 'c891e70e62fc104e7d92c30b920cfb9e4cd39fa2c117fd2cb6e1e05c4054c204',
    })
    clientSecret: string;

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

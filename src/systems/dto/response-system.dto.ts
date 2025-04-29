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
        description: '공개키 (RSA Public Key)',
        example:
            '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----',
    })
    publicKey: string;

    @ApiProperty({
        description: '비밀키 (RSA Private Key)',
        example: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAA...\n-----END PRIVATE KEY-----',
    })
    secretKey: string;

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

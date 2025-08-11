import { ApiProperty } from '@nestjs/swagger';

export class AdminProfileDto {
    @ApiProperty({
        description: '관리자 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @ApiProperty({
        description: '이메일',
        example: 'admin@example.com',
    })
    email: string;

    @ApiProperty({
        description: '이름',
        example: '홍길동',
    })
    name: string;

    @ApiProperty({
        description: '역할',
        example: 'admin',
    })
    role: string;

    @ApiProperty({
        description: '마지막 로그인 시간',
        example: '2023-01-01T00:00:00Z',
        required: false,
    })
    lastLogin?: Date;

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

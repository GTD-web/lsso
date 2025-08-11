import { ApiProperty } from '@nestjs/swagger';

export class PositionResponseDto {
    constructor(position: any) {
        this._id = position._id;
        this.position_title = position.position_title;
        this.position_code = position.position_code;
        this.level = position.level;
        this.description = position.description;
        this.created_at = position.created_at;
        this.updated_at = position.updated_at;
        this.id = position.id;
    }

    @ApiProperty({ description: '직책 MongoDB ID', example: '67d106849af04fc1b2f65be1' })
    _id: string;

    @ApiProperty({ description: '직책명', example: '파트장' })
    position_title: string;

    @ApiProperty({ description: '직책 코드', example: '파트장' })
    position_code: string;

    @ApiProperty({ description: '직책 레벨', example: 5 })
    level: number;

    @ApiProperty({ description: '직책 설명', example: '' })
    description: string;

    @ApiProperty({ description: '생성일', example: '2025-03-12T03:59:00.853Z' })
    created_at: Date;

    @ApiProperty({ description: '수정일', example: '2025-06-27T08:08:15.994Z' })
    updated_at: Date;

    @ApiProperty({ description: '직책 ID (별칭)', example: '67d106849af04fc1b2f65be1' })
    id: string;
}

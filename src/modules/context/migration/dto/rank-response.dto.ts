import { ApiProperty } from '@nestjs/swagger';

export class RankResponseDto {
    constructor(rank: any) {
        this._id = rank._id;
        this.rank_name = rank.rank_name;
        this.rank_code = rank.rank_code;
        this.level = rank.level;
        this.description = rank.description;
        this.created_at = rank.created_at;
        this.updated_at = rank.updated_at;
        this.id = rank.id;
    }

    @ApiProperty({ description: '직급 MongoDB ID', example: '67d107c49af04fc1b2f65bf9' })
    _id: string;

    @ApiProperty({ description: '직급명', example: '사장' })
    rank_name: string;

    @ApiProperty({ description: '직급 코드', example: '사장' })
    rank_code: string;

    @ApiProperty({ description: '직급 레벨', example: 1 })
    level: number;

    @ApiProperty({ description: '직급 설명', example: '' })
    description: string;

    @ApiProperty({ description: '생성일', example: '2025-03-12T04:04:20.303Z' })
    created_at: Date;

    @ApiProperty({ description: '수정일', example: '2025-06-17T08:31:54.817Z' })
    updated_at: Date;

    @ApiProperty({ description: '직급 ID (별칭)', example: '67d107c49af04fc1b2f65bf9' })
    id: string;
}

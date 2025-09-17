import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PromoteEmployeeRequestDto {
    @ApiProperty({ description: '새로운 직급 ID' })
    @IsUUID()
    rankId: string;
}

export class EmployeeRankHistoryResponseDto {
    @ApiProperty({ description: '이력 ID' })
    id: string;

    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '직급 ID' })
    rankId: string;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;
}

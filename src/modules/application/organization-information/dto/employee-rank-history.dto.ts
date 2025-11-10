import { ApiProperty } from '@nestjs/swagger';

/**
 * 직원 직급 이력 DTO
 */
export class EmployeeRankHistoryDto {
    @ApiProperty({ description: '이력 ID' })
    id: string;

    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '직급 ID' })
    rankId: string;

    @ApiProperty({ description: '생성일' })
    createdAt: string;
}

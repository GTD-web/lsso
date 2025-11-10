import { ApiProperty } from '@nestjs/swagger';

/**
 * 직원 부서 배치 정보 DTO
 */
export class EmployeeAssignmentDto {
    @ApiProperty({ description: '배치 ID' })
    id: string;

    @ApiProperty({ description: '부서 ID' })
    departmentId: string;

    @ApiProperty({ description: '직책 ID' })
    positionId: string;

    @ApiProperty({ description: '관리자 여부' })
    isManager: boolean;

    @ApiProperty({ description: '생성일' })
    createdAt: string;
}


import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsBoolean } from 'class-validator';

export class AssignEmployeeRequestDto {
    @ApiProperty({ description: '직원 ID' })
    @IsUUID()
    employeeId: string;

    @ApiProperty({ description: '부서 ID' })
    @IsUUID()
    departmentId: string;

    @ApiProperty({ description: '직책 ID' })
    @IsUUID()
    positionId: string;

    @ApiPropertyOptional({ description: '관리자 권한 여부', example: false })
    @IsOptional()
    @IsBoolean()
    isManager?: boolean;
}

export class UpdateEmployeeAssignmentRequestDto {
    @ApiPropertyOptional({ description: '부서 ID' })
    @IsOptional()
    @IsUUID()
    departmentId?: string;

    @ApiPropertyOptional({ description: '직책 ID' })
    @IsOptional()
    @IsUUID()
    positionId?: string;

    @ApiPropertyOptional({ description: '관리자 권한 여부', example: false })
    @IsOptional()
    @IsBoolean()
    isManager?: boolean;
}

export class EmployeeAssignmentResponseDto {
    @ApiProperty({ description: '배치 ID' })
    id: string;

    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '부서 ID' })
    departmentId: string;

    @ApiProperty({ description: '직책 ID' })
    positionId: string;

    @ApiProperty({ description: '관리자 권한 여부' })
    isManager: boolean;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;
}

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

export class UpdateManagerStatusRequestDto {
    @ApiProperty({ description: '관리자 권한 여부', example: true })
    @IsBoolean()
    isManager: boolean;
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

export class EmployeeAssignmentListResponseDto {
    @ApiProperty({ description: '배치 목록', type: [EmployeeAssignmentResponseDto] })
    assignments: EmployeeAssignmentResponseDto[];
}

export class EmployeeAssignmentDetailResponseDto {
    @ApiProperty({ description: '배치 ID' })
    id: string;

    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '직원번호' })
    employeeNumber: string;

    @ApiProperty({ description: '직원명' })
    employeeName: string;

    @ApiProperty({ description: '부서 ID' })
    departmentId: string;

    @ApiProperty({ description: '부서명' })
    departmentName: string;

    @ApiProperty({ description: '부서 코드' })
    departmentCode: string;

    @ApiProperty({ description: '직책 ID' })
    positionId: string;

    @ApiProperty({ description: '직책명' })
    positionTitle: string;

    @ApiProperty({ description: '직책 코드' })
    positionCode: string;

    @ApiProperty({ description: '직급 ID', required: false })
    rankId?: string;

    @ApiProperty({ description: '직급명', required: false })
    rankName?: string;

    @ApiProperty({ description: '직급 코드', required: false })
    rankCode?: string;

    @ApiProperty({ description: '관리자 권한 여부' })
    isManager: boolean;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;
}

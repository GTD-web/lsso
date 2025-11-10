import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { DepartmentType } from '../../../../domain/department/department.entity';

export class CreateDepartmentRequestDto {
    @ApiProperty({ description: '부서명', example: '개발팀' })
    @IsString()
    departmentName: string;

    @ApiProperty({ description: '부서 코드', example: 'DEV_TEAM' })
    @IsString()
    departmentCode: string;

    @ApiProperty({
        description: '부서 유형',
        enum: DepartmentType,
        example: DepartmentType.DEPARTMENT,
    })
    @IsEnum(DepartmentType)
    type: DepartmentType;

    @ApiPropertyOptional({ description: '상위 부서 ID' })
    @IsOptional()
    @IsUUID()
    parentDepartmentId?: string;

    @ApiPropertyOptional({ description: '정렬 순서', example: 1 })
    @IsOptional()
    @IsNumber()
    order?: number;
}

export class UpdateDepartmentRequestDto {
    @ApiPropertyOptional({ description: '부서명', example: '개발팀' })
    @IsOptional()
    @IsString()
    departmentName?: string;

    @ApiPropertyOptional({ description: '부서 코드', example: 'DEV_TEAM' })
    @IsOptional()
    @IsString()
    departmentCode?: string;

    @ApiPropertyOptional({
        description: '부서 유형',
        enum: DepartmentType,
        example: DepartmentType.DEPARTMENT,
    })
    @IsOptional()
    @IsEnum(DepartmentType)
    type?: DepartmentType;

    @ApiPropertyOptional({ description: '상위 부서 ID' })
    @IsOptional()
    @IsUUID()
    parentDepartmentId?: string;

    @ApiPropertyOptional({ description: '정렬 순서', example: 1 })
    @IsOptional()
    @IsNumber()
    order?: number;
}

export class DepartmentResponseDto {
    @ApiProperty({ description: '부서 ID' })
    id: string;

    @ApiProperty({ description: '부서명' })
    departmentName: string;

    @ApiProperty({ description: '부서 코드' })
    departmentCode: string;

    @ApiProperty({ description: '부서 유형', enum: DepartmentType })
    type: DepartmentType;

    @ApiProperty({ description: '상위 부서 ID', required: false })
    parentDepartmentId?: string;

    @ApiProperty({ description: '정렬 순서' })
    order: number;

    @ApiProperty({ description: '하위 부서 목록', type: [DepartmentResponseDto], required: false })
    childDepartments?: DepartmentResponseDto[];

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;
}

export class DepartmentListResponseDto {
    @ApiProperty({ description: '부서 목록', type: [DepartmentResponseDto] })
    departments: DepartmentResponseDto[];
}

export class UpdateDepartmentOrderRequestDto {
    @ApiProperty({ description: '새로운 정렬 순서', example: 25 })
    @IsNumber()
    newOrder: number;
}

export class UpdateDepartmentParentRequestDto {
    @ApiProperty({ description: '새로운 상위 부서 ID', example: 'uuid' })
    @IsUUID()
    newParentDepartmentId: string;
}

// 부서 계층구조별 직원 정보 DTO
export class DepartmentEmployeeInfoDto {
    @ApiProperty({ description: '직원 ID' })
    id: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({ description: '이름' })
    name: string;

    @ApiProperty({ description: '이메일', required: false })
    email?: string;

    @ApiProperty({ description: '전화번호', required: false })
    phoneNumber?: string;

    @ApiProperty({ description: '직책 ID', required: false })
    positionId?: string;

    @ApiProperty({ description: '직책명', required: false })
    positionTitle?: string;

    @ApiProperty({ description: '직급 ID', required: false })
    rankId?: string;

    @ApiProperty({ description: '직급명', required: false })
    rankName?: string;

    @ApiProperty({ description: '매니저 여부' })
    isManager: boolean;

    @ApiPropertyOptional({ description: '메타데이터', type: 'object', required: false })
    metadata?: Record<string, any>;
}

export class DepartmentWithEmployeesDto {
    @ApiProperty({ description: '부서 ID' })
    id: string;

    @ApiProperty({ description: '부서명' })
    departmentName: string;

    @ApiProperty({ description: '부서 코드' })
    departmentCode: string;

    @ApiProperty({ description: '부서 유형', enum: DepartmentType })
    type: DepartmentType;

    @ApiProperty({ description: '상위 부서 ID', required: false })
    parentDepartmentId?: string;

    @ApiProperty({ description: '정렬 순서' })
    order: number;

    @ApiProperty({ description: '직원 목록', type: [DepartmentEmployeeInfoDto] })
    employees: DepartmentEmployeeInfoDto[];

    @ApiProperty({ description: '하위 부서 목록', type: [DepartmentWithEmployeesDto], required: false })
    childDepartments?: DepartmentWithEmployeesDto[];
}

export class DepartmentHierarchyResponseDto {
    @ApiProperty({ description: '부서 계층구조', type: [DepartmentWithEmployeesDto] })
    departments: DepartmentWithEmployeesDto[];
}

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

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DepartmentType } from '../../../../../libs/database/entities';
import { EmployeeResponseDto } from './employee-response.dto';

export class DepartmentWithEmployeesDto {
    @ApiProperty({ description: '부서 ID' })
    id: string;

    @ApiProperty({ description: '부서명' })
    departmentName: string;

    @ApiProperty({ description: '부서 코드' })
    departmentCode: string;

    @ApiProperty({ description: '부서 유형', enum: DepartmentType })
    type: DepartmentType;

    @ApiPropertyOptional({ description: '상위 부서 ID' })
    parentDepartmentId?: string;

    @ApiPropertyOptional({ description: '상위 부서명' })
    parentDepartmentName?: string;

    @ApiProperty({ description: '정렬 순서' })
    order: number;

    @ApiProperty({ description: '부서 깊이 (루트 부서는 0)' })
    depth: number;

    @ApiProperty({
        description: '해당 부서 소속 직원 목록',
        type: [EmployeeResponseDto],
    })
    employees: EmployeeResponseDto[];

    @ApiProperty({
        description: '해당 부서 직원 수',
    })
    employeeCount: number;

    @ApiProperty({
        description: '하위 부서 목록',
        type: [DepartmentWithEmployeesDto],
    })
    childDepartments: DepartmentWithEmployeesDto[];

    @ApiProperty({
        description: '하위 부서 수',
    })
    childDepartmentCount: number;
}

export class DepartmentHierarchyResponseDto {
    @ApiProperty({
        description: '부서 계층구조',
        type: [DepartmentWithEmployeesDto],
    })
    departments: DepartmentWithEmployeesDto[];

    @ApiProperty({
        description: '총 부서 수',
    })
    totalDepartments: number;

    @ApiProperty({
        description: '총 직원 수',
    })
    totalEmployees: number;

    @ApiProperty({
        description: '최대 깊이',
    })
    maxDepth: number;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DepartmentType } from '../../../../../libs/database/entities';

// 관리자 정보
export class ManagerInfoDto {
    @ApiProperty({ description: '관리자 직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '관리자 이름' })
    name: string;

    @ApiProperty({ description: '관리자 사번' })
    employeeNumber: string;

    @ApiPropertyOptional({ description: '관리자 이메일' })
    email?: string;

    @ApiProperty({ description: '관리자 직책 ID' })
    positionId: string;

    @ApiProperty({ description: '관리자 직책명' })
    positionTitle: string;
}

// 부서별 관리자 정보
export class DepartmentManagerDto {
    @ApiProperty({ description: '부서 ID' })
    departmentId: string;

    @ApiProperty({ description: '부서명' })
    departmentName: string;

    @ApiProperty({ description: '부서 코드' })
    departmentCode: string;

    @ApiProperty({ description: '부서 유형', enum: DepartmentType })
    type: DepartmentType;

    @ApiPropertyOptional({ description: '상위 부서 ID' })
    parentDepartmentId?: string;

    @ApiProperty({ description: '부서 계층 깊이 (최상위 부서가 0)', example: 0 })
    depth: number;

    @ApiProperty({ description: '해당 부서의 관리자 목록', type: [ManagerInfoDto] })
    managers: ManagerInfoDto[];
}

// 직원의 부서별 관리자 라인 정보
export class EmployeeDepartmentManagersDto {
    @ApiProperty({ description: '부서 ID' })
    departmentId: string;

    @ApiProperty({ description: '부서명' })
    departmentName: string;

    @ApiProperty({
        description: '해당 부서의 직속 라인 관리자 정보 (소속 부서부터 최상위 부서까지)',
        type: [DepartmentManagerDto],
    })
    managerLine: DepartmentManagerDto[];
}

// 직원의 관리자 라인 정보 (여러 부서 배치 고려)
export class EmployeeManagersDto {
    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '직원 이름' })
    name: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({
        description: '직원이 소속된 모든 부서의 관리자 라인 정보',
        type: [EmployeeDepartmentManagersDto],
    })
    departments: EmployeeDepartmentManagersDto[];
}

// 전체 직원의 관리자 정보 응답
export class EmployeesManagersResponseDto {
    @ApiProperty({ description: '직원별 관리자 정보 목록', type: [EmployeeManagersDto] })
    employees: EmployeeManagersDto[];

    @ApiProperty({ description: '총 직원 수' })
    total: number;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsArray } from 'class-validator';

export class CreateEmployeeSystemRoleDto {
    @ApiProperty({ description: '직원 ID', example: 'uuid-employee-id' })
    @IsUUID()
    employeeId: string;

    @ApiProperty({ description: '시스템 역할 ID', example: 'uuid-system-role-id' })
    @IsUUID()
    systemRoleId: string;
}

export class UpdateEmployeeSystemRoleDto {
    @ApiPropertyOptional({ description: '시스템 역할 ID', example: 'uuid-system-role-id' })
    @IsOptional()
    @IsUUID()
    systemRoleId?: string;
}

export class EmployeeSystemRoleEmployeeDto {
    @ApiProperty({ description: '직원 ID' })
    id: string;

    @ApiProperty({ description: '직원명' })
    name: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;
}

export class EmployeeSystemRoleSystemDto {
    @ApiProperty({ description: '시스템 ID' })
    id: string;

    @ApiProperty({ description: '시스템명' })
    name: string;
}

export class EmployeeSystemRoleRoleDto {
    @ApiProperty({ description: '시스템 역할 ID' })
    id: string;

    @ApiProperty({ description: '역할명' })
    roleName: string;

    @ApiProperty({ description: '역할 코드' })
    roleCode: string;

    @ApiProperty({ description: '소속 시스템', type: EmployeeSystemRoleSystemDto })
    system: EmployeeSystemRoleSystemDto;
}

export class EmployeeSystemRoleListResponseDto {
    @ApiProperty({ description: '관계 ID' })
    id: string;

    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '시스템 역할 ID' })
    systemRoleId: string;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;

    @ApiPropertyOptional({ description: '직원 정보', type: EmployeeSystemRoleEmployeeDto })
    employee?: EmployeeSystemRoleEmployeeDto;

    @ApiPropertyOptional({ description: '시스템 역할 정보', type: EmployeeSystemRoleRoleDto })
    systemRole?: EmployeeSystemRoleRoleDto;
}

export class EmployeeSystemRoleDetailDto {
    @ApiProperty({ description: '시스템 역할 ID' })
    id: string;

    @ApiProperty({ description: '역할명' })
    roleName: string;

    @ApiProperty({ description: '역할 코드' })
    roleCode: string;

    @ApiProperty({ description: '소속 시스템명' })
    systemName: string;

    @ApiProperty({ description: '할당일' })
    assignedAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;
}

export class EmployeeSystemRoleGroupedDto {
    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '직원명' })
    employeeName: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({ description: '시스템 역할 목록', type: [EmployeeSystemRoleDetailDto] })
    systemRoles: EmployeeSystemRoleDetailDto[];

    @ApiProperty({ description: '전체 역할 수' })
    totalRoles: number;

    @ApiProperty({ description: '최초 역할 할당일' })
    firstRoleAssignedAt: Date;

    @ApiProperty({ description: '최근 역할 수정일' })
    lastRoleUpdatedAt: Date;
}

export class EmployeeSystemRoleGroupedListResponseDto {
    @ApiProperty({ description: '직원별 시스템 역할 목록', type: [EmployeeSystemRoleGroupedDto] })
    employees: EmployeeSystemRoleGroupedDto[];

    @ApiProperty({ description: '전체 직원 수' })
    totalEmployees: number;

    @ApiProperty({ description: '전체 관계 수' })
    totalRelations: number;
}

export class BulkUpdateEmployeeSystemRolesDto {
    @ApiProperty({ description: '직원 ID', example: 'uuid-employee-id' })
    @IsUUID()
    employeeId: string;

    @ApiProperty({ description: '시스템 역할 ID 목록', type: [String], example: ['uuid-1', 'uuid-2'] })
    @IsArray()
    @IsUUID('4', { each: true })
    systemRoleIds: string[];
}

export class BulkUpdateEmployeeSystemRolesResultDto {
    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '삭제된 역할 수' })
    deletedCount: number;

    @ApiProperty({ description: '추가된 역할 수' })
    addedCount: number;

    @ApiProperty({ description: '할당된 시스템 역할 목록', type: [EmployeeSystemRoleListResponseDto] })
    systemRoles: EmployeeSystemRoleListResponseDto[];
}

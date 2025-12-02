import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class DepartmentHierarchyRequestDto {
    @ApiPropertyOptional({
        description: '조회할 최상위 부서 ID (지정하지 않으면 전체 조직도 조회)',
        example: 'dept-uuid-123',
    })
    @IsOptional()
    @IsUUID()
    rootDepartmentId?: string;

    @ApiPropertyOptional({
        description: '최대 조회 깊이 (기본값: 무제한)',
        example: 3,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    maxDepth?: number;

    @ApiPropertyOptional({
        description: '직원 상세 정보 포함 여부 (부서, 직책, 직급 정보)',
        example: true,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    withEmployeeDetail?: boolean;

    @ApiPropertyOptional({
        description: '퇴사한 직원 포함 여부',
        example: false,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    includeTerminated?: boolean;

    @ApiPropertyOptional({
        description: '빈 부서 포함 여부 (직원이 없는 부서도 포함)',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    includeEmptyDepartments?: boolean;

    @ApiPropertyOptional({
        description: '비활성화된 부서 포함 여부',
        example: false,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    includeInactiveDepartments?: boolean;
}

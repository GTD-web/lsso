import { IsArray, IsOptional, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EmployeesRequestDto {
    @ApiPropertyOptional({
        description: '직원 식별자 배열 (직원 ID 또는 사번, 비어있으면 전체 직원 조회)',
        example: ['emp123', 'E2023001', 'emp456', 'E2023002'],
        type: [String],
    })
    @IsArray()
    @IsOptional()
    @Type(() => String)
    identifiers?: string[];

    @ApiPropertyOptional({
        description: '상세 정보 포함 여부 (부서, 직책, 직급의 상세 정보)',
        example: false,
        type: Boolean,
        default: false,
    })
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    @IsOptional()
    withDetail?: boolean = false;

    @ApiPropertyOptional({
        description: '퇴사한 직원 포함 여부',
        example: false,
        type: Boolean,
        default: false,
    })
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    @IsOptional()
    includeTerminated?: boolean = false;
}

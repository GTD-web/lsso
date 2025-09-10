import { IsString, IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseEmployeeIdentifierDto {
    @ApiPropertyOptional({
        description: '직원 ID (UUID). employeeNumber와 함께 제공되면 정합성을 체크합니다.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsOptional()
    @IsUUID('4', { message: 'employeeId는 유효한 UUID 형식이어야 합니다.' })
    @ValidateIf((obj) => !obj.employeeNumber || obj.employeeId)
    employeeId?: string;

    @ApiPropertyOptional({
        description: '직원 번호. employeeId와 함께 제공되면 같은 직원을 가리키는지 검증합니다.',
        example: '25001',
    })
    @IsOptional()
    @IsString()
    @ValidateIf((obj) => !obj.employeeId || obj.employeeNumber)
    employeeNumber?: string;
}

import { IsString, IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseEmployeeIdentifierDto {
    @ApiPropertyOptional({
        description: '직원 ID (UUID)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsOptional()
    @IsUUID('4', { message: 'employeeId는 유효한 UUID 형식이어야 합니다.' })
    @ValidateIf((obj) => !obj.employeeNumber || obj.employeeId)
    employeeId?: string;

    @ApiPropertyOptional({
        description: '직원 번호',
        example: '25001',
    })
    @IsOptional()
    @IsString()
    @ValidateIf((obj) => !obj.employeeId || obj.employeeNumber)
    employeeNumber?: string;

    /**
     * employeeId와 employeeNumber 중 하나는 반드시 제공되어야 함을 검증
     */
    validate(): void {
        if (!this.employeeId && !this.employeeNumber) {
            throw new Error('employeeId 또는 employeeNumber 중 하나는 반드시 제공되어야 합니다.');
        }
    }

    /**
     * employeeId가 있으면 employeeId를 우선 반환, 없으면 employeeNumber 반환
     */
    getIdentifier(): { type: 'id' | 'number'; value: string } {
        if (this.employeeId) {
            return { type: 'id', value: this.employeeId };
        }
        if (this.employeeNumber) {
            return { type: 'number', value: this.employeeNumber };
        }
        throw new Error('employeeId 또는 employeeNumber 중 하나는 반드시 제공되어야 합니다.');
    }
}

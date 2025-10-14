import { IsString, IsOptional, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmployeeStatus } from '../../../../../libs/common/enums';

/**
 * 직원 퇴사처리 요청 DTO
 * 목적: 수습기간 평가 후 불합격 시 퇴사처리
 */
export class TerminateEmployeeRequestDto {
    @ApiProperty({
        description: '직원 ID 또는 사번',
        example: 'emp-uuid-123',
    })
    @IsString()
    employeeIdentifier: string;

    @ApiProperty({
        description: '퇴사일 (YYYY-MM-DD)',
        example: '2025-04-01',
        type: 'string',
        format: 'date',
    })
    @IsDateString()
    terminationDate: string;

    @ApiPropertyOptional({
        description: '퇴사 사유',
        example: '수습기간 평가 불합격',
        maxLength: 500,
    })
    @IsString()
    @IsOptional()
    terminationReason?: string;

    @ApiPropertyOptional({
        description: '퇴사 처리자 ID',
        example: 'hr-uuid-123',
    })
    @IsUUID()
    @IsOptional()
    processedBy?: string;
}

/**
 * 직원 퇴사처리 응답 DTO
 */
export class TerminateEmployeeResponseDto {
    @ApiProperty({
        description: '퇴사처리 성공 여부',
        example: true,
    })
    success: boolean;

    @ApiProperty({
        description: '퇴사처리된 직원 정보',
    })
    employee: {
        id: string;
        employeeNumber: string;
        name: string;
        status: EmployeeStatus;
        terminationDate: string;
        terminationReason?: string;
        updatedAt: string;
    };

    @ApiProperty({
        description: '처리 결과 메시지',
        example: '직원이 성공적으로 퇴사처리되었습니다.',
    })
    message: string;
}

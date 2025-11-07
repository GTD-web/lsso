import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender, EmployeeStatus } from '../../../../../libs/common/enums';

/**
 * 채용된 직원 정보 DTO
 */
export class HiredEmployeeDto {
    @ApiProperty({ description: '직원 ID' })
    id: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({ description: '이름' })
    name: string;

    @ApiPropertyOptional({ description: '이메일' })
    email?: string;

    @ApiPropertyOptional({ description: '전화번호' })
    phoneNumber?: string;

    @ApiPropertyOptional({ description: '생년월일' })
    dateOfBirth?: string;

    @ApiPropertyOptional({ description: '성별', enum: Gender })
    gender?: Gender;

    @ApiProperty({ description: '입사일' })
    hireDate: string;

    @ApiProperty({ description: '직원 상태', enum: EmployeeStatus })
    status: EmployeeStatus;

    @ApiPropertyOptional({ description: '현재 직급 ID' })
    currentRankId?: string;

    @ApiProperty({ description: '초기 비밀번호 설정 여부' })
    isInitialPasswordSet: boolean;

    @ApiProperty({ description: '생성일' })
    createdAt: string;

    @ApiProperty({ description: '수정일' })
    updatedAt: string;
}


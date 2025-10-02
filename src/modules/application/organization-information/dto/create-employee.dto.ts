import { IsString, IsOptional, IsEmail, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender, EmployeeStatus } from '../../../../../libs/common/enums';

/**
 * 직원 생성 요청 DTO (입력/전송 검증 - 1단계)
 * 목적: "형식"과 "존재" 확인 (스키마·타입·필수값)
 * 실패 시: 400 Bad Request
 */
export class CreateEmployeeRequestDto {
    @ApiPropertyOptional({
        description: '사번 (미입력시 서버에서 자동 생성)',
        example: '25001',
        minLength: 5,
        maxLength: 5,
        required: false,
    })
    @IsString()
    @IsOptional()
    employeeNumber?: string;

    @ApiProperty({
        description: '이름',
        example: '홍길동',
        minLength: 1,
        maxLength: 50,
    })
    @IsString()
    name: string;

    @ApiPropertyOptional({
        description: '이메일 (선택사항, nullable)',
        example: 'hong@company.com',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({
        description: '전화번호',
        example: '010-1234-5678',
    })
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @ApiPropertyOptional({
        description: '생년월일 (YYYY-MM-DD)',
        example: '1990-01-01',
        type: 'string',
        format: 'date',
    })
    @IsDateString()
    @IsOptional()
    dateOfBirth?: string;

    @ApiPropertyOptional({
        description: '성별',
        enum: Gender,
        example: Gender.Male,
    })
    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @ApiProperty({
        description: '입사일 (YYYY-MM-DD)',
        example: '2025-01-01',
        type: 'string',
        format: 'date',
    })
    @IsDateString()
    hireDate: string;

    @ApiPropertyOptional({
        description: '직원 상태',
        enum: EmployeeStatus,
        example: EmployeeStatus.Active,
        default: EmployeeStatus.Active,
    })
    @IsEnum(EmployeeStatus)
    @IsOptional()
    status?: EmployeeStatus;

    @ApiPropertyOptional({
        description: '직급 ID',
        example: 'rank-uuid',
        format: 'uuid',
    })
    @IsUUID()
    @IsOptional()
    currentRankId?: string;

    @ApiPropertyOptional({
        description: '부서 ID (배치용)',
        example: 'dept-uuid',
        format: 'uuid',
    })
    @IsUUID()
    @IsOptional()
    departmentId?: string;

    @ApiPropertyOptional({
        description: '직책 ID (배치용)',
        example: 'position-uuid',
        format: 'uuid',
    })
    @IsUUID()
    @IsOptional()
    positionId?: string;

    @ApiPropertyOptional({
        description: '관리자 여부',
        example: false,
        default: false,
    })
    @IsOptional()
    isManager?: boolean;
}

/**
 * 직원 생성 응답 DTO
 */
export class CreateEmployeeResponseDto {
    @ApiProperty({
        description: '생성된 직원 정보',
    })
    employee: {
        id: string;
        employeeNumber: string;
        name: string;
        email?: string;
        phoneNumber?: string;
        dateOfBirth?: string;
        gender?: Gender;
        hireDate: string;
        status: EmployeeStatus;
        currentRankId?: string;
        isInitialPasswordSet: boolean;
        createdAt: string;
        updatedAt: string;
    };

    @ApiPropertyOptional({
        description: '부서 배치 정보 (부서ID가 제공된 경우)',
    })
    assignment?: {
        id: string;
        departmentId: string;
        positionId: string;
        isManager: boolean;
        createdAt: string;
    };

    @ApiPropertyOptional({
        description: '직급 이력 (직급ID가 제공된 경우)',
    })
    rankHistory?: {
        id: string;
        employeeId: string;
        rankId: string;
        createdAt: string;
    };
}

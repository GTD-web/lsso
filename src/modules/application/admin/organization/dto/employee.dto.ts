import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsEmail, IsDateString, IsUUID, IsBoolean, IsArray } from 'class-validator';
import { Gender, EmployeeStatus } from '../../../../../../libs/common/enums';

export class CreateEmployeeRequestDto {
    @ApiProperty({ description: '이름', example: '홍길동' })
    @IsString()
    name: string;

    @ApiProperty({ description: '이메일', example: 'hong@company.com' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ description: '전화번호', example: '010-1234-5678' })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiPropertyOptional({ description: '생년월일', example: '1990-01-01' })
    @IsOptional()
    @IsDateString()
    dateOfBirth?: string;

    @ApiPropertyOptional({
        description: '성별',
        enum: Gender,
        example: Gender.Male,
    })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @ApiProperty({ description: '입사일', example: '2023-01-01' })
    @IsDateString()
    hireDate: string;

    @ApiPropertyOptional({ description: '현재 직급 ID' })
    @IsOptional()
    @IsUUID()
    currentRankId?: string;

    @ApiPropertyOptional({ description: '부서 ID' })
    @IsOptional()
    @IsUUID()
    departmentId?: string;

    @ApiPropertyOptional({ description: '직책 ID' })
    @IsOptional()
    @IsUUID()
    positionId?: string;

    @ApiPropertyOptional({ description: '관리자 권한 여부', default: false })
    @IsOptional()
    @IsBoolean()
    isManager?: boolean;
}

export class UpdateEmployeeRequestDto {
    @ApiPropertyOptional({ description: '이름', example: '홍길동' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: '이메일', example: 'hong@company.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ description: '전화번호', example: '010-1234-5678' })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiPropertyOptional({ description: '생년월일', example: '1990-01-01' })
    @IsOptional()
    @IsDateString()
    dateOfBirth?: string;

    @ApiPropertyOptional({
        description: '성별',
        enum: Gender,
        example: Gender.Male,
    })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @ApiPropertyOptional({ description: '입사일', example: '2023-01-01' })
    @IsOptional()
    @IsDateString()
    hireDate?: string;

    @ApiPropertyOptional({
        description: '재직 상태',
        enum: EmployeeStatus,
        example: EmployeeStatus.Active,
    })
    @IsOptional()
    @IsEnum(EmployeeStatus)
    status?: EmployeeStatus;

    @ApiPropertyOptional({ description: '현재 직급 ID' })
    @IsOptional()
    @IsUUID()
    currentRankId?: string;

    @ApiPropertyOptional({ description: '퇴사일', example: '2024-12-31' })
    @IsOptional()
    @IsDateString()
    terminationDate?: string;

    @ApiPropertyOptional({ description: '부서 ID' })
    @IsOptional()
    @IsUUID()
    departmentId?: string;

    @ApiPropertyOptional({ description: '직책 ID' })
    @IsOptional()
    @IsUUID()
    positionId?: string;

    @ApiPropertyOptional({ description: '관리자 권한 여부', default: false })
    @IsOptional()
    @IsBoolean()
    isManager?: boolean;
}

export class EmployeeResponseDto {
    @ApiProperty({ description: '직원 ID' })
    id: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({ description: '이름' })
    name: string;

    @ApiProperty({ description: '이메일' })
    email: string;

    @ApiProperty({ description: '전화번호', required: false })
    phoneNumber?: string;

    @ApiProperty({ description: '생년월일', required: false })
    dateOfBirth?: Date;

    @ApiProperty({ description: '성별', enum: Gender, required: false })
    gender?: Gender;

    @ApiProperty({ description: '입사일' })
    hireDate: Date;

    @ApiProperty({ description: '재직 상태', enum: EmployeeStatus })
    status: EmployeeStatus;

    @ApiProperty({ description: '현재 직급 ID', required: false })
    currentRankId?: string;

    @ApiProperty({ description: '퇴사일', required: false })
    terminationDate?: Date;

    @ApiProperty({ description: '초기 비밀번호 설정 여부' })
    isInitialPasswordSet: boolean;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;
}

export class EmployeeListResponseDto {
    @ApiProperty({ description: '직원 목록', type: [EmployeeResponseDto] })
    employees: EmployeeResponseDto[];
}

export class NextEmployeeNumberResponseDto {
    @ApiProperty({
        description: '다음 직원번호',
        example: '25001',
        examples: {
            '2025년 첫 직원': { value: '25001' },
            '2025년 다섯번째 직원': { value: '25005' },
            '2024년 마지막 직원': { value: '24999' },
        },
    })
    nextEmployeeNumber: string;

    @ApiProperty({ description: '기준 연도', example: 2025 })
    year: number;

    @ApiProperty({ description: '해당 연도 직원 수', example: 4 })
    currentCount: number;
}

// 확장된 직원 정보 DTO (부서, 직책, 직급, 토큰 등 포함)
export class EmployeeDetailInfoDto {
    @ApiProperty({ description: '직원 ID' })
    id: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({ description: '이름' })
    name: string;

    @ApiProperty({ description: '이메일' })
    email: string;

    @ApiProperty({ description: '전화번호', required: false })
    phoneNumber?: string;

    @ApiProperty({ description: '생년월일', required: false })
    dateOfBirth?: Date;

    @ApiProperty({ description: '성별', enum: Gender, required: false })
    gender?: Gender;

    @ApiProperty({ description: '입사일' })
    hireDate: Date;

    @ApiProperty({ description: '재직 상태', enum: EmployeeStatus })
    status: EmployeeStatus;

    @ApiProperty({ description: '현재 직급 ID', required: false })
    currentRankId?: string;

    @ApiProperty({ description: '퇴사일', required: false })
    terminationDate?: Date;

    @ApiProperty({ description: '초기 비밀번호 설정 여부' })
    isInitialPasswordSet: boolean;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;

    // 추가 정보
    @ApiProperty({ description: '부서 정보 목록', type: 'array', items: { type: 'object' }, required: false })
    departments?: {
        assignmentId: string;
        departmentId: string;
        departmentName: string;
        departmentType: string;
        positionId: string;
        positionTitle: string;
        isManager: boolean;
    }[];

    @ApiProperty({ description: '직급 정보', required: false })
    rank?: {
        rankId: string;
        rankName: string;
        rankCode: string;
        level: number;
    };

    @ApiProperty({ description: '인증 토큰 목록', type: 'array', items: { type: 'object' }, required: false })
    tokens?: {
        tokenId: string;
        accessToken: string;
        tokenExpiresAt: Date;
    }[];

    @ApiProperty({ description: 'FCM 토큰 목록', type: 'array', items: { type: 'object' }, required: false })
    fcmTokens?: {
        fcmTokenId: string;
        fcmToken: string;
        deviceType: string;
    }[];

    @ApiProperty({ description: '시스템별 역할 목록', type: 'array', items: { type: 'object' }, required: false })
    systemRoles?: {
        systemRoleId: string;
        systemId: string;
        systemName: string;
        roleName: string;
        roleCode: string;
    }[];
}

export class EmployeeDetailListResponseDto {
    @ApiProperty({ description: '직원 상세 목록', type: [EmployeeDetailInfoDto] })
    employees: EmployeeDetailInfoDto[];
}

// 일괄 수정 DTO
export class BulkUpdateDepartmentRequestDto {
    @ApiProperty({ description: '직원 ID 목록', type: [String] })
    @IsArray()
    @IsUUID('4', { each: true })
    employeeIds: string[];

    @ApiProperty({ description: '변경할 부서 ID' })
    @IsUUID()
    departmentId: string;
}

export class BulkUpdatePositionRequestDto {
    @ApiProperty({ description: '직원 ID 목록', type: [String] })
    @IsArray()
    @IsUUID('4', { each: true })
    employeeIds: string[];

    @ApiProperty({ description: '변경할 직책 ID' })
    @IsUUID()
    positionId: string;
}

export class BulkUpdateRankRequestDto {
    @ApiProperty({ description: '직원 ID 목록', type: [String] })
    @IsArray()
    @IsUUID('4', { each: true })
    employeeIds: string[];

    @ApiProperty({ description: '변경할 직급 ID' })
    @IsUUID()
    rankId: string;
}

export class BulkUpdateStatusRequestDto {
    @ApiProperty({ description: '직원 ID 목록', type: [String] })
    @IsArray()
    @IsUUID('4', { each: true })
    employeeIds: string[];

    @ApiProperty({ description: '변경할 재직상태', enum: EmployeeStatus })
    @IsEnum(EmployeeStatus)
    status: EmployeeStatus;

    @ApiPropertyOptional({ description: '퇴사일 (재직상태가 퇴사인 경우)', example: '2024-12-31' })
    @IsOptional()
    @IsDateString()
    terminationDate?: string;
}

export class BulkUpdateResultDto {
    @ApiProperty({ description: '성공한 직원 수' })
    successCount: number;

    @ApiProperty({ description: '실패한 직원 수' })
    failCount: number;

    @ApiProperty({ description: '성공한 직원 ID 목록', type: [String] })
    successIds: string[];

    @ApiProperty({ description: '실패한 직원 ID 목록', type: [String] })
    failIds: string[];

    @ApiPropertyOptional({ description: '에러 메시지 목록' })
    errors?: { employeeId: string; message: string }[];
}

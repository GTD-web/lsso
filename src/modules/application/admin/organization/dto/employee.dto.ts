import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsEmail, IsDateString, IsUUID } from 'class-validator';
import { Gender, EmployeeStatus } from '../../../../../../libs/common/enums';

export class CreateEmployeeRequestDto {
    @ApiProperty({ description: '사번', example: 'EMP001' })
    @IsString()
    employeeNumber: string;

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

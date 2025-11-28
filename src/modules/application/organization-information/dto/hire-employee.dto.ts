import { IsString, IsOptional, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Gender } from '../../../../../libs/common/enums';
import { HiredEmployeeDto } from './hired-employee.dto';
import { DepartmentDetailDto, RankDetailDto } from './employee-response.dto';

/**
 * 직원 채용 요청 DTO (입력/전송 검증 - 1단계)
 * 목적: "형식"과 "존재" 확인 (스키마·타입·필수값)
 * 실패 시: 400 Bad Request
 */
export class HireEmployeeRequestDto {
    @ApiProperty({
        description: '한글이름',
        example: '홍길동',
        minLength: 1,
        maxLength: 50,
    })
    @IsString()
    koreanName: string;

    @ApiProperty({
        description: '영어이름',
        example: 'Gildong',
        minLength: 1,
        maxLength: 50,
    })
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value))
    @IsString()
    englishFirstName: string;

    @ApiProperty({
        description: '영어성',
        example: 'Hong',
        minLength: 1,
        maxLength: 50,
    })
    @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value))
    @IsString()
    englishLastName: string;

    @ApiPropertyOptional({ description: '사번', example: '25001' })
    @IsOptional()
    @IsString()
    employeeNumber?: string;

    @ApiProperty({
        description: '입사일 (YYYY-MM-DD)',
        example: '2025-01-01',
        type: 'string',
        format: 'date',
    })
    @IsDateString()
    hireDate: string;

    @ApiProperty({
        description: '부서 ID',
        example: 'dept-uuid',
        format: 'uuid',
    })
    @IsUUID()
    departmentId: string;

    @ApiProperty({
        description: '직급 ID',
        example: 'rank-uuid',
        format: 'uuid',
    })
    @IsUUID()
    rankId: string;

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
}

/**
 * 직원 채용 응답 DTO
 */
export class HireEmployeeResponseDto {
    @ApiProperty({
        description: '생성된 직원 정보',
        type: HiredEmployeeDto,
    })
    employee: HiredEmployeeDto;

    @ApiPropertyOptional({
        description: '부서 정보 (부서ID가 제공된 경우)',
        type: DepartmentDetailDto,
    })
    department?: DepartmentDetailDto;

    @ApiPropertyOptional({
        description: '직급 정보 (직급ID가 제공된 경우)',
        type: RankDetailDto,
    })
    rank?: RankDetailDto;
}

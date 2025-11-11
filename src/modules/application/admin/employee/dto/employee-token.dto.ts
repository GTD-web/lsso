import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateEmployeeTokenDto {
    @ApiProperty({ description: '직원 ID', example: 'uuid-employee-id' })
    @IsUUID()
    employeeId: string;

    @ApiProperty({ description: '토큰 ID', example: 'uuid-token-id' })
    @IsUUID()
    tokenId: string;
}

export class UpdateEmployeeTokenDto {
    @ApiPropertyOptional({ description: '토큰 ID', example: 'uuid-token-id' })
    @IsOptional()
    @IsUUID()
    tokenId?: string;
}

export class EmployeeTokenEmployeeDto {
    @ApiProperty({ description: '직원 ID' })
    id: string;

    @ApiProperty({ description: '직원명' })
    name: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({ description: '이메일' })
    email: string;
}

export class EmployeeTokenTokenDto {
    @ApiProperty({ description: '토큰 ID' })
    id: string;

    @ApiProperty({ description: '액세스 토큰' })
    accessToken: string;

    @ApiProperty({ description: '토큰 만료일시' })
    tokenExpiresAt: Date;

    @ApiPropertyOptional({ description: '클라이언트 정보' })
    clientInfo?: string;

    @ApiProperty({ description: '활성화 상태' })
    isActive: boolean;
}

export class EmployeeTokenListResponseDto {
    @ApiProperty({ description: '관계 ID' })
    id: string;

    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '토큰 ID' })
    tokenId: string;

    @ApiPropertyOptional({ description: '직원 정보', type: EmployeeTokenEmployeeDto })
    employee?: EmployeeTokenEmployeeDto;

    @ApiPropertyOptional({ description: '토큰 정보', type: EmployeeTokenTokenDto })
    token?: EmployeeTokenTokenDto;
}

export class EmployeeTokenDetailDto {
    @ApiProperty({ description: '토큰 ID' })
    id: string;

    @ApiProperty({ description: '액세스 토큰 (마스킹)' })
    accessTokenMasked: string;

    @ApiProperty({ description: '토큰 만료일시' })
    tokenExpiresAt: Date;

    @ApiPropertyOptional({ description: '클라이언트 정보' })
    clientInfo?: string;

    @ApiProperty({ description: '활성화 상태' })
    isActive: boolean;

    @ApiProperty({ description: '토큰 생성일' })
    tokenCreatedAt: Date;

    @ApiProperty({ description: '마지막 접근일시' })
    lastAccess?: Date;
}

export class EmployeeTokenGroupedDto {
    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '직원명' })
    employeeName: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({ description: '이메일' })
    employeeEmail: string;

    @ApiProperty({ description: '토큰 목록', type: [EmployeeTokenDetailDto] })
    tokens: EmployeeTokenDetailDto[];

    @ApiProperty({ description: '전체 토큰 수' })
    totalTokens: number;

    @ApiProperty({ description: '활성 토큰 수' })
    activeTokens: number;

    @ApiProperty({ description: '최초 토큰 생성일' })
    firstTokenCreatedAt: Date;

    @ApiProperty({ description: '최근 토큰 활동일' })
    lastTokenActivity: Date;
}

export class EmployeeTokenGroupedListResponseDto {
    @ApiProperty({ description: '직원별 토큰 목록', type: [EmployeeTokenGroupedDto] })
    employees: EmployeeTokenGroupedDto[];

    @ApiProperty({ description: '전체 직원 수' })
    totalEmployees: number;

    @ApiProperty({ description: '전체 관계 수' })
    totalRelations: number;
}

export class TokenResponseDto {
    @ApiProperty({ description: '토큰 ID' })
    id: string;

    @ApiProperty({ description: '액세스 토큰' })
    accessToken: string;

    @ApiProperty({ description: '토큰 만료일시' })
    tokenExpiresAt: Date;

    @ApiPropertyOptional({ description: '리프레시 토큰' })
    refreshToken?: string;

    @ApiPropertyOptional({ description: '리프레시 토큰 만료일시' })
    refreshTokenExpiresAt?: Date;

    @ApiPropertyOptional({ description: '클라이언트 정보' })
    clientInfo?: string;

    @ApiPropertyOptional({ description: 'IP 주소' })
    ipAddress?: string;

    @ApiPropertyOptional({ description: '마지막 접근일시' })
    lastAccess?: Date;

    @ApiProperty({ description: '활성화 상태' })
    isActive: boolean;

    @ApiProperty({ description: '생성일시' })
    createdAt: Date;

    @ApiProperty({ description: '수정일시' })
    updatedAt: Date;
}

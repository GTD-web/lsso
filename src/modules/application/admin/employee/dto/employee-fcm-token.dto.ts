import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateEmployeeFcmTokenDto {
    @ApiProperty({ description: '직원 ID', example: 'uuid-employee-id' })
    @IsUUID()
    employeeId: string;

    @ApiProperty({ description: 'FCM 토큰 ID', example: 'uuid-fcm-token-id' })
    @IsUUID()
    fcmTokenId: string;
}

export class UpdateEmployeeFcmTokenDto {
    @ApiPropertyOptional({ description: 'FCM 토큰 ID', example: 'uuid-fcm-token-id' })
    @IsOptional()
    @IsUUID()
    fcmTokenId?: string;
}

export class EmployeeFcmTokenEmployeeDto {
    @ApiProperty({ description: '직원 ID' })
    id: string;

    @ApiProperty({ description: '직원명' })
    name: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({ description: '이메일' })
    email: string;
}

export class FcmTokenDeviceInfoDto {
    @ApiPropertyOptional({ description: '디바이스 모델명' })
    model?: string;

    @ApiPropertyOptional({ description: 'OS 버전' })
    osVersion?: string;

    @ApiPropertyOptional({ description: '앱 버전' })
    appVersion?: string;

    @ApiPropertyOptional({ description: '사용자 에이전트' })
    userAgent?: string;

    @ApiPropertyOptional({ description: '플랫폼' })
    platform?: string;
}

export class EmployeeFcmTokenTokenDto {
    @ApiProperty({ description: 'FCM 토큰 ID' })
    id: string;

    @ApiProperty({ description: 'FCM 토큰 값' })
    fcmToken: string;

    @ApiProperty({ description: '디바이스 타입' })
    deviceType: string;

    @ApiProperty({ description: '디바이스 정보' })
    deviceInfo: string;

    @ApiProperty({ description: '활성화 상태' })
    isActive: boolean;

    @ApiProperty({ description: '관계 생성일' })
    relationCreatedAt: Date;

    @ApiProperty({ description: '관계 수정일' })
    relationUpdatedAt: Date;
}

export class EmployeeFcmTokenListResponseDto {
    @ApiProperty({ description: '관계 ID' })
    id: string;

    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: 'FCM 토큰 ID' })
    fcmTokenId: string;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;

    @ApiPropertyOptional({ description: '직원 정보', type: EmployeeFcmTokenEmployeeDto })
    employee?: EmployeeFcmTokenEmployeeDto;

    @ApiPropertyOptional({ description: 'FCM 토큰 정보', type: EmployeeFcmTokenTokenDto })
    fcmToken?: EmployeeFcmTokenTokenDto;
}

export class EmployeeFcmTokenGroupedDto {
    @ApiProperty({ description: '직원 ID' })
    employeeId: string;

    @ApiProperty({ description: '직원명' })
    employeeName: string;

    @ApiProperty({ description: '사번' })
    employeeNumber: string;

    @ApiProperty({ description: '이메일' })
    employeeEmail: string;

    @ApiProperty({ description: 'FCM 토큰 목록', type: [EmployeeFcmTokenTokenDto] })
    fcmTokens: EmployeeFcmTokenTokenDto[];

    @ApiProperty({ description: '전체 토큰 수' })
    totalTokens: number;

    @ApiProperty({ description: '활성 토큰 수' })
    activeTokens: number;

    @ApiProperty({ description: '최초 관계 생성일' })
    firstRelationCreatedAt: Date;

    @ApiProperty({ description: '최근 관계 수정일' })
    lastRelationUpdatedAt: Date;
}

export class EmployeeFcmTokenGroupedListResponseDto {
    @ApiProperty({ description: '직원별 FCM 토큰 목록', type: [EmployeeFcmTokenGroupedDto] })
    employees: EmployeeFcmTokenGroupedDto[];

    @ApiProperty({ description: '전체 직원 수' })
    totalEmployees: number;

    @ApiProperty({ description: '전체 관계 수' })
    totalRelations: number;
}

export class EmployeeFcmTokenStatsDto {
    @ApiProperty({ description: '전체 관계 수' })
    totalRelations: number;

    @ApiProperty({ description: '활성 토큰 수' })
    activeTokens: number;

    @ApiProperty({ description: '비활성 토큰 수' })
    inactiveTokens: number;

    @ApiProperty({ description: '직원 수' })
    employeeCount: number;

    @ApiProperty({ description: 'FCM 토큰 수' })
    fcmTokenCount: number;
}

export class AdminFcmTokenResponseDto {
    @ApiProperty({ description: 'FCM 토큰 ID' })
    id: string;

    @ApiProperty({ description: 'FCM 토큰 값' })
    fcmToken: string;

    @ApiProperty({ description: '디바이스 타입' })
    deviceType: string;

    @ApiProperty({ description: '디바이스 정보' })
    deviceInfo: string;

    @ApiProperty({ description: '활성화 상태' })
    isActive: boolean;

    @ApiProperty({ description: '생성일' })
    createdAt: Date;

    @ApiProperty({ description: '수정일' })
    updatedAt: Date;
}

import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { EmployeeFcmTokenApplicationService } from '../services/employee-fcm-token-application.service';
import {
    CreateEmployeeFcmTokenDto,
    UpdateEmployeeFcmTokenDto,
    EmployeeFcmTokenListResponseDto,
    EmployeeFcmTokenStatsDto,
    EmployeeFcmTokenGroupedListResponseDto,
} from '../dto';

@ApiTags('Admin - 직원 FCM 토큰 관리')
// @ApiBearerAuth()
@Controller('admin/employee-fcm-tokens')
export class EmployeeFcmTokenController {
    constructor(private readonly employeeFcmTokenApplicationService: EmployeeFcmTokenApplicationService) {}

    @Get()
    @ApiOperation({ summary: '직원별 FCM 토큰 관계 목록 조회 (그룹핑)' })
    @ApiResponse({ status: 200, type: EmployeeFcmTokenGroupedListResponseDto })
    @ApiQuery({ name: 'employeeId', required: false, description: '특정 직원의 FCM 토큰 조회' })
    async findAllGroupedByEmployee(
        @Query('employeeId') employeeId?: string,
    ): Promise<EmployeeFcmTokenGroupedListResponseDto> {
        return await this.employeeFcmTokenApplicationService.직원별_그룹핑된_FCM_토큰_관계_조회(employeeId);
    }

    @Get('stats')
    @ApiOperation({ summary: 'FCM 토큰 통계 조회' })
    @ApiResponse({ status: 200, type: EmployeeFcmTokenStatsDto })
    async getStats(): Promise<EmployeeFcmTokenStatsDto> {
        return await this.employeeFcmTokenApplicationService.FCM_토큰_통계_조회();
    }

    @Get(':id')
    @ApiOperation({ summary: '직원 FCM 토큰 관계 상세 조회' })
    @ApiResponse({ status: 200, type: EmployeeFcmTokenListResponseDto })
    @ApiResponse({ status: 404, description: '직원 FCM 토큰 관계를 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '직원 FCM 토큰 관계 ID' })
    async findOne(@Param('id') id: string): Promise<EmployeeFcmTokenListResponseDto> {
        return await this.employeeFcmTokenApplicationService.직원_FCM_토큰_관계_상세_조회(id);
    }

    @Post()
    @ApiOperation({ summary: '직원 FCM 토큰 관계 생성' })
    @ApiBody({ type: CreateEmployeeFcmTokenDto })
    @ApiResponse({ status: 201, type: EmployeeFcmTokenListResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    async create(@Body() createDto: CreateEmployeeFcmTokenDto): Promise<EmployeeFcmTokenListResponseDto> {
        return await this.employeeFcmTokenApplicationService.직원_FCM_토큰_관계_생성(createDto);
    }

    @Put(':id')
    @ApiOperation({ summary: '직원 FCM 토큰 관계 수정' })
    @ApiBody({ type: UpdateEmployeeFcmTokenDto })
    @ApiResponse({ status: 200, type: EmployeeFcmTokenListResponseDto })
    @ApiResponse({ status: 404, description: '직원 FCM 토큰 관계를 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '직원 FCM 토큰 관계 ID' })
    async update(
        @Param('id') id: string,
        @Body() updateDto: UpdateEmployeeFcmTokenDto,
    ): Promise<EmployeeFcmTokenListResponseDto> {
        return await this.employeeFcmTokenApplicationService.직원_FCM_토큰_관계_수정(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '직원 FCM 토큰 관계 삭제' })
    @ApiResponse({ status: 200, description: '관계 삭제 성공' })
    @ApiResponse({ status: 404, description: '직원 FCM 토큰 관계를 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '직원 FCM 토큰 관계 ID' })
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        return await this.employeeFcmTokenApplicationService.직원_FCM_토큰_관계_삭제(id);
    }

    @Delete('employee/:employeeId/all')
    @ApiOperation({ summary: '직원의 모든 FCM 토큰 관계 삭제' })
    @ApiResponse({ status: 200, description: '모든 관계 삭제 성공' })
    @ApiParam({ name: 'employeeId', description: '직원 ID' })
    async removeAllByEmployee(@Param('employeeId') employeeId: string): Promise<{ message: string }> {
        return await this.employeeFcmTokenApplicationService.직원_모든_FCM_토큰_관계_삭제(employeeId);
    }

    @Put(':employeeId/:fcmTokenId/usage')
    @ApiOperation({ summary: 'FCM 토큰 사용일 업데이트' })
    @ApiResponse({ status: 200, type: EmployeeFcmTokenListResponseDto })
    @ApiResponse({ status: 404, description: '직원 FCM 토큰 관계를 찾을 수 없음' })
    @ApiParam({ name: 'employeeId', description: '직원 ID' })
    @ApiParam({ name: 'fcmTokenId', description: 'FCM 토큰 ID' })
    async updateUsage(
        @Param('employeeId') employeeId: string,
        @Param('fcmTokenId') fcmTokenId: string,
    ): Promise<EmployeeFcmTokenListResponseDto> {
        return await this.employeeFcmTokenApplicationService.FCM_토큰_사용일_업데이트(employeeId, fcmTokenId);
    }

    @Delete('cleanup/old-tokens')
    @ApiOperation({ summary: '오래된 FCM 토큰 관계 정리' })
    @ApiResponse({ status: 200, description: '정리 완료' })
    @ApiQuery({ name: 'cutoffDays', required: false, description: '기준 일수 (기본: 30일)' })
    async cleanupOldTokens(@Query('cutoffDays') cutoffDays?: number): Promise<{ deletedCount: number }> {
        return await this.employeeFcmTokenApplicationService.오래된_FCM_토큰_관계_정리(cutoffDays);
    }
}

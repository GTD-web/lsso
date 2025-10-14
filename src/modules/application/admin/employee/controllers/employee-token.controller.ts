import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { EmployeeTokenApplicationService } from '../services/employee-token-application.service';
import {
    CreateEmployeeTokenDto,
    UpdateEmployeeTokenDto,
    EmployeeTokenListResponseDto,
    EmployeeTokenGroupedListResponseDto,
} from '../dto';

@ApiTags('Admin - 직원 토큰 관리')
// @ApiBearerAuth()
@Controller('admin/employee-tokens')
export class EmployeeTokenController {
    constructor(private readonly employeeTokenApplicationService: EmployeeTokenApplicationService) {}

    @Get()
    @ApiOperation({ summary: '직원별 토큰 관계 목록 조회 (그룹핑)' })
    @ApiResponse({ status: 200, type: EmployeeTokenGroupedListResponseDto })
    @ApiQuery({ name: 'employeeId', required: false, description: '특정 직원의 토큰 조회' })
    async findAllGroupedByEmployee(
        @Query('employeeId') employeeId?: string,
    ): Promise<EmployeeTokenGroupedListResponseDto> {
        return await this.employeeTokenApplicationService.직원별_그룹핑된_토큰_관계_조회(employeeId);
    }

    @Get(':id')
    @ApiOperation({ summary: '직원 토큰 관계 상세 조회' })
    @ApiResponse({ status: 200, type: EmployeeTokenListResponseDto })
    @ApiResponse({ status: 404, description: '직원 토큰 관계를 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '직원 토큰 관계 ID' })
    async findOne(@Param('id') id: string): Promise<EmployeeTokenListResponseDto> {
        return await this.employeeTokenApplicationService.직원_토큰_관계_상세_조회(id);
    }

    @Post()
    @ApiOperation({ summary: '직원 토큰 관계 생성' })
    @ApiBody({ type: CreateEmployeeTokenDto })
    @ApiResponse({ status: 201, type: EmployeeTokenListResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    async create(@Body() createDto: CreateEmployeeTokenDto): Promise<EmployeeTokenListResponseDto> {
        return await this.employeeTokenApplicationService.직원_토큰_관계_생성_또는_업데이트(createDto);
    }

    @Put(':id')
    @ApiOperation({ summary: '직원 토큰 관계 수정' })
    @ApiBody({ type: UpdateEmployeeTokenDto })
    @ApiResponse({ status: 200, type: EmployeeTokenListResponseDto })
    @ApiResponse({ status: 404, description: '직원 토큰 관계를 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '직원 토큰 관계 ID' })
    async update(
        @Param('id') id: string,
        @Body() updateDto: UpdateEmployeeTokenDto,
    ): Promise<EmployeeTokenListResponseDto> {
        return await this.employeeTokenApplicationService.직원_토큰_관계_수정(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '직원 토큰 관계 삭제' })
    @ApiResponse({ status: 200, description: '관계 삭제 성공' })
    @ApiResponse({ status: 404, description: '직원 토큰 관계를 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '직원 토큰 관계 ID' })
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        return await this.employeeTokenApplicationService.직원_토큰_관계_삭제(id);
    }

    @Delete('tokens/bulk')
    @ApiOperation({ summary: '토큰들과 관련된 모든 관계 삭제' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                tokenIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '삭제할 토큰 ID 배열',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: '관계 삭제 성공' })
    async removeBulkByTokens(@Body() body: { tokenIds: string[] }): Promise<{ deletedCount: number }> {
        return await this.employeeTokenApplicationService.토큰_관련_관계_삭제(body.tokenIds);
    }
}

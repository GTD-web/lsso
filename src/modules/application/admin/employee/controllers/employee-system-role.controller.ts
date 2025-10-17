import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { EmployeeSystemRoleApplicationService } from '../services/employee-system-role-application.service';
import {
    CreateEmployeeSystemRoleDto,
    EmployeeSystemRoleListResponseDto,
    EmployeeSystemRoleGroupedListResponseDto,
    BulkUpdateEmployeeSystemRolesDto,
    BulkUpdateEmployeeSystemRolesResultDto,
} from '../dto';

@ApiTags('Admin - 직원 시스템 역할 관리')
// @ApiBearerAuth()
@Controller('admin/employee-system-roles')
export class EmployeeSystemRoleController {
    constructor(private readonly employeeSystemRoleApplicationService: EmployeeSystemRoleApplicationService) {}

    @Get()
    @ApiOperation({ summary: '직원별 시스템 역할 목록 조회 (그룹핑)' })
    @ApiResponse({ status: 200, type: EmployeeSystemRoleGroupedListResponseDto })
    @ApiQuery({ name: 'employeeId', required: false, description: '특정 직원의 시스템 역할 조회' })
    async findAllGroupedByEmployee(
        @Query('employeeId') employeeId?: string,
    ): Promise<EmployeeSystemRoleGroupedListResponseDto> {
        return await this.employeeSystemRoleApplicationService.직원별_그룹핑된_시스템_역할_조회(employeeId);
    }

    @Get(':id')
    @ApiOperation({ summary: '직원 시스템 역할 상세 조회' })
    @ApiResponse({ status: 200, type: EmployeeSystemRoleListResponseDto })
    @ApiResponse({ status: 404, description: '직원 시스템 역할을 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '직원 시스템 역할 ID' })
    async findOne(@Param('id') id: string): Promise<EmployeeSystemRoleListResponseDto> {
        return await this.employeeSystemRoleApplicationService.직원_시스템_역할_상세_조회(id);
    }

    // @Post()
    // @ApiOperation({ summary: '직원에게 시스템 역할 할당' })
    // @ApiBody({ type: CreateEmployeeSystemRoleDto })
    // @ApiResponse({ status: 201, type: EmployeeSystemRoleListResponseDto })
    // @ApiResponse({ status: 400, description: '이미 할당된 역할이거나 잘못된 요청' })
    // async create(@Body() createDto: CreateEmployeeSystemRoleDto): Promise<EmployeeSystemRoleListResponseDto> {
    //     return await this.employeeSystemRoleApplicationService.직원_시스템_역할_할당(createDto);
    // }

    // @Delete(':id')
    // @ApiOperation({ summary: '직원 시스템 역할 해제' })
    // @ApiResponse({ status: 200, description: '역할 해제 성공' })
    // @ApiResponse({ status: 404, description: '직원 시스템 역할을 찾을 수 없음' })
    // @ApiParam({ name: 'id', description: '직원 시스템 역할 ID' })
    // async remove(@Param('id') id: string): Promise<{ message: string }> {
    //     return await this.employeeSystemRoleApplicationService.직원_시스템_역할_해제(id);
    // }

    // @Delete('employee/:employeeId/all')
    // @ApiOperation({ summary: '직원의 모든 시스템 역할 해제' })
    // @ApiResponse({ status: 200, description: '모든 역할 해제 성공' })
    // @ApiParam({ name: 'employeeId', description: '직원 ID' })
    // async removeAllByEmployee(@Param('employeeId') employeeId: string): Promise<{ message: string }> {
    //     return await this.employeeSystemRoleApplicationService.직원_모든_시스템_역할_해제(employeeId);
    // }

    @Put('employee/bulk')
    @ApiOperation({ summary: '직원 시스템 역할 일괄 업데이트 (기존 전체 삭제 후 새로 할당)' })
    @ApiBody({ type: BulkUpdateEmployeeSystemRolesDto })
    @ApiResponse({ status: 200, description: '역할 일괄 업데이트 성공', type: BulkUpdateEmployeeSystemRolesResultDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 404, description: '직원 또는 시스템 역할을 찾을 수 없음' })
    async bulkUpdateEmployeeSystemRoles(
        @Body() dto: BulkUpdateEmployeeSystemRolesDto,
    ): Promise<BulkUpdateEmployeeSystemRolesResultDto> {
        return await this.employeeSystemRoleApplicationService.직원_시스템_역할_일괄_업데이트(dto);
    }
}

import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../../libs/common/guards/jwt-auth.guard';
import { SystemApplicationService } from './system-application.service';
import { CreateSystemRoleDto, UpdateSystemRoleDto, SystemRoleResponseDto } from './dto';

@ApiTags('Admin - 시스템 역할 관리')
// @ApiBearerAuth()
@Controller('admin/system-roles')
export class SystemRoleController {
    constructor(private readonly systemApplicationService: SystemApplicationService) {}

    @Get()
    @ApiOperation({ summary: '시스템 역할 목록 조회' })
    @ApiResponse({ status: 200, type: [SystemRoleResponseDto] })
    @ApiQuery({ name: 'systemId', required: false, description: '시스템 ID (특정 시스템의 역할만 조회)' })
    @ApiQuery({ name: 'defaultOnly', required: false, description: '기본 역할만 조회 (true/false)' })
    async getSystemRoles(
        @Query('systemId') systemId?: string,
        @Query('defaultOnly') defaultOnly?: string,
    ): Promise<SystemRoleResponseDto[]> {
        // 기본 역할만 조회하는 경우
        if (defaultOnly === 'true') {
            return await this.systemApplicationService.기본역할목록조회();
        }

        return await this.systemApplicationService.시스템롤목록조회(systemId);
    }

    @Get(':id')
    @ApiOperation({ summary: '시스템 역할 상세 조회' })
    @ApiResponse({ status: 200, type: SystemRoleResponseDto })
    @ApiResponse({ status: 404, description: '시스템 역할을 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '시스템 역할 ID' })
    async getSystemRole(@Param('id') id: string): Promise<SystemRoleResponseDto> {
        return await this.systemApplicationService.시스템롤상세조회(id);
    }

    @Post()
    @ApiOperation({ summary: '시스템 역할 생성' })
    @ApiBody({ type: CreateSystemRoleDto })
    @ApiResponse({ status: 201, type: SystemRoleResponseDto })
    @ApiResponse({ status: 404, description: '시스템을 찾을 수 없음' })
    @ApiResponse({ status: 409, description: '이미 존재하는 역할 코드' })
    async createSystemRole(@Body() createSystemRoleDto: CreateSystemRoleDto): Promise<SystemRoleResponseDto> {
        return await this.systemApplicationService.시스템롤생성(createSystemRoleDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: '시스템 역할 수정' })
    @ApiBody({ type: UpdateSystemRoleDto })
    @ApiResponse({ status: 200, type: SystemRoleResponseDto })
    @ApiResponse({ status: 404, description: '시스템 역할을 찾을 수 없음' })
    @ApiResponse({ status: 409, description: '이미 존재하는 역할 코드' })
    @ApiParam({ name: 'id', description: '시스템 역할 ID' })
    async updateSystemRole(
        @Param('id') id: string,
        @Body() updateSystemRoleDto: UpdateSystemRoleDto,
    ): Promise<SystemRoleResponseDto> {
        return await this.systemApplicationService.시스템롤수정(id, updateSystemRoleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '시스템 역할 삭제' })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: '시스템 역할을 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '시스템 역할 ID' })
    async deleteSystemRole(@Param('id') id: string): Promise<void> {
        return await this.systemApplicationService.시스템롤삭제(id);
    }
}

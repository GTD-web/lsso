import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../../libs/common/guards/jwt-auth.guard';
import { SystemApplicationService } from './system-application.service';
import { CreateSystemDto, UpdateSystemDto, SystemResponseDto } from './dto';

@ApiTags('Admin - 시스템 관리')
@ApiBearerAuth()
@Controller('admin/systems')
export class SystemController {
    constructor(private readonly systemApplicationService: SystemApplicationService) {}

    @Get()
    @ApiOperation({ summary: '시스템 목록 조회' })
    @ApiResponse({ status: 200, type: [SystemResponseDto] })
    @ApiQuery({ name: 'search', required: false, description: '검색어 (이름, 설명, 도메인)' })
    async getSystems(@Query('search') search?: string): Promise<SystemResponseDto[]> {
        if (search) {
            return await this.systemApplicationService.시스템검색(search);
        }
        return await this.systemApplicationService.시스템목록조회();
    }

    @Get('search')
    @ApiOperation({ summary: '시스템 검색' })
    @ApiResponse({ status: 200, type: [SystemResponseDto] })
    @ApiQuery({ name: 'query', required: true, description: '검색어' })
    async searchSystems(@Query('query') query: string): Promise<SystemResponseDto[]> {
        return await this.systemApplicationService.시스템검색(query);
    }

    @Get(':id')
    @ApiOperation({ summary: '시스템 상세 조회' })
    @ApiResponse({ status: 200, type: SystemResponseDto })
    @ApiResponse({ status: 404, description: '시스템을 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async getSystem(@Param('id') id: string): Promise<SystemResponseDto> {
        return await this.systemApplicationService.시스템상세조회(id);
    }

    @Post()
    @ApiOperation({
        summary: '시스템 생성',
        description: '새로운 시스템을 등록하고 클라이언트 ID/시크릿을 자동 생성합니다.',
    })
    @ApiBody({ type: CreateSystemDto })
    @ApiResponse({ status: 201, type: SystemResponseDto })
    @ApiResponse({ status: 409, description: '이미 존재하는 시스템 이름' })
    async createSystem(@Body() createSystemDto: CreateSystemDto): Promise<SystemResponseDto> {
        return await this.systemApplicationService.시스템생성(createSystemDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: '시스템 수정' })
    @ApiBody({ type: UpdateSystemDto })
    @ApiResponse({ status: 200, type: SystemResponseDto })
    @ApiResponse({ status: 404, description: '시스템을 찾을 수 없음' })
    @ApiResponse({ status: 409, description: '이미 존재하는 시스템 이름' })
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async updateSystem(@Param('id') id: string, @Body() updateSystemDto: UpdateSystemDto): Promise<SystemResponseDto> {
        return await this.systemApplicationService.시스템수정(id, updateSystemDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '시스템 삭제' })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: '시스템을 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async deleteSystem(@Param('id') id: string): Promise<void> {
        return await this.systemApplicationService.시스템삭제(id);
    }

    @Post(':id/regenerate-keys')
    @ApiOperation({
        summary: 'API 키 재생성',
        description: '클라이언트 시크릿을 새로 생성합니다.',
    })
    @ApiResponse({ status: 200, type: SystemResponseDto })
    @ApiResponse({ status: 404, description: '시스템을 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async regenerateApiKeys(@Param('id') id: string): Promise<SystemResponseDto> {
        return await this.systemApplicationService.API키_재생성(id);
    }
}

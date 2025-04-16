import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { ResponseSystemDto } from './dto/response-system.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('관리자 시스템 API')
@Controller('admin/systems')
export class AdminSystemsController {
    constructor(private readonly systemsService: SystemsService) {}

    @Get()
    @ApiOperation({ summary: '시스템 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '시스템 목록 조회 성공',
        type: ApiResponseDto,
    })
    async findAll(): Promise<ApiResponseDto<ResponseSystemDto[]>> {
        try {
            const systems = await this.systemsService.findAll();
            return ApiResponseDto.success(systems);
        } catch (error) {
            return ApiResponseDto.error('SYSTEMS_FETCH_ERROR', '시스템 목록을 조회하는 중 오류가 발생했습니다.');
        }
    }

    @Get('search')
    @ApiOperation({ summary: '시스템 검색' })
    @ApiResponse({
        status: 200,
        description: '시스템 검색 성공',
        type: ApiResponseDto,
    })
    async search(@Query('query') query: string): Promise<ApiResponseDto<ResponseSystemDto[]>> {
        try {
            const systems = await this.systemsService.searchSystems(query);
            return ApiResponseDto.success(systems);
        } catch (error) {
            return ApiResponseDto.error('SYSTEMS_SEARCH_ERROR', '시스템 검색 중 오류가 발생했습니다.');
        }
    }

    @Get(':id')
    @ApiOperation({ summary: '시스템 상세 조회' })
    @ApiResponse({
        status: 200,
        description: '시스템 상세 조회 성공',
        type: ApiResponseDto,
    })
    async findOne(@Param('id') id: string): Promise<ApiResponseDto<ResponseSystemDto>> {
        try {
            const system = await this.systemsService.findOne(id);
            return ApiResponseDto.success(system);
        } catch (error) {
            return ApiResponseDto.error('SYSTEM_NOT_FOUND', `해당 ID의 시스템을 찾을 수 없습니다: ${id}`);
        }
    }

    @Post()
    @ApiOperation({ summary: '시스템 생성' })
    @ApiBody({ type: CreateSystemDto })
    @ApiResponse({
        status: 201,
        description: '시스템 생성 성공',
        type: ApiResponseDto,
    })
    async create(@Body() createSystemDto: CreateSystemDto): Promise<ApiResponseDto<ResponseSystemDto>> {
        try {
            const system = await this.systemsService.create(createSystemDto);
            return ApiResponseDto.success(system);
        } catch (error) {
            return ApiResponseDto.error('SYSTEM_CREATE_ERROR', '시스템 생성 중 오류가 발생했습니다.');
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: '시스템 수정' })
    @ApiBody({ type: UpdateSystemDto })
    @ApiResponse({
        status: 200,
        description: '시스템 수정 성공',
        type: ApiResponseDto,
    })
    async update(
        @Param('id') id: string,
        @Body() updateSystemDto: UpdateSystemDto,
    ): Promise<ApiResponseDto<ResponseSystemDto>> {
        try {
            const system = await this.systemsService.update(id, updateSystemDto);
            return ApiResponseDto.success(system);
        } catch (error) {
            return ApiResponseDto.error('SYSTEM_UPDATE_ERROR', `시스템 수정 중 오류가 발생했습니다: ${error.message}`);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: '시스템 삭제' })
    @ApiResponse({
        status: 200,
        description: '시스템 삭제 성공',
        type: ApiResponseDto,
    })
    async remove(@Param('id') id: string): Promise<ApiResponseDto<boolean>> {
        try {
            await this.systemsService.remove(id);
            return ApiResponseDto.success(true);
        } catch (error) {
            return ApiResponseDto.error('SYSTEM_DELETE_ERROR', `시스템 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    }
}

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    HttpException,
    Query,
    Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';
import { ResponseSystemDto } from '../dto/response-system.dto';
import { ApiResponseDto } from 'libs/common/dto/api-response.dto';
import { AdminUsecase } from '../usecases/admin.usecase';

@ApiTags('관리자 시스템 API')
@Controller('admin/systems')
export class AdminSystemsController {
    constructor(private readonly adminUsecase: AdminUsecase) {}

    @Get()
    @ApiOperation({ summary: '시스템 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '시스템 목록 조회 성공',
        type: ApiResponseDto,
    })
    @ApiQuery({ name: 'search', required: false, description: '검색어 (이름, 설명, 공개키, 허용된 출처)' })
    async findAll(@Query('search') search?: string): Promise<ApiResponseDto<ResponseSystemDto[]>> {
        try {
            let systems;
            if (search) {
                systems = await this.adminUsecase.searchSystems(search);
            } else {
                systems = await this.adminUsecase.findAll();
            }
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
            const systems = await this.adminUsecase.searchSystems(query);
            return ApiResponseDto.success<ResponseSystemDto[]>(systems);
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
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async findOne(@Param('id') id: string): Promise<ApiResponseDto<ResponseSystemDto>> {
        try {
            const system = await this.adminUsecase.findOne(id);
            return ApiResponseDto.success(system);
        } catch (error) {
            return ApiResponseDto.error('SYSTEM_NOT_FOUND', `해당 ID의 시스템을 찾을 수 없습니다: ${id}`);
        }
    }

    @Post()
    @ApiOperation({ summary: '시스템 생성', description: '새로운 시스템을 등록하고 공개키/비밀키 쌍을 생성합니다.' })
    @ApiBody({ type: CreateSystemDto })
    @ApiResponse({
        status: 201,
        description: '시스템 생성 성공',
        type: ApiResponseDto,
    })
    async create(@Body() createSystemDto: CreateSystemDto): Promise<ApiResponseDto<ResponseSystemDto>> {
        try {
            console.log(createSystemDto);
            const system = await this.adminUsecase.registerSystem(createSystemDto);
            console.log(system);
            return ApiResponseDto.success(system);
        } catch (error) {
            return ApiResponseDto.error('SYSTEM_CREATE_ERROR', '시스템 생성 중 오류가 발생했습니다.');
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: '시스템 부분 수정' })
    @ApiBody({ type: UpdateSystemDto })
    @ApiResponse({
        status: 200,
        description: '시스템 수정 성공',
        type: ApiResponseDto,
    })
    async partialUpdate(
        @Param('id') id: string,
        @Body() updateSystemDto: UpdateSystemDto,
    ): Promise<ApiResponseDto<ResponseSystemDto>> {
        try {
            let system;

            system = await this.adminUsecase.update(id, updateSystemDto);

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
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async remove(@Param('id') id: string): Promise<ApiResponseDto<boolean>> {
        try {
            await this.adminUsecase.remove(id);
            return ApiResponseDto.success(true);
        } catch (error) {
            return ApiResponseDto.error('SYSTEM_DELETE_ERROR', `시스템 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    }

    @Post(':id/regenerate-keys')
    @ApiOperation({ summary: 'API 키 재생성', description: '공개키/비밀키 쌍을 새로 생성합니다.' })
    @ApiResponse({
        status: 200,
        description: '키가 재생성되었습니다.',
        type: ApiResponseDto,
    })
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async regenerateApiKeys(@Param('id') id: string): Promise<ApiResponseDto<ResponseSystemDto>> {
        try {
            const system = await this.adminUsecase.regenerateApiKeys(id);
            return ApiResponseDto.success(system);
        } catch (error) {
            return ApiResponseDto.error('KEY_REGENERATION_ERROR', `키 재생성 중 오류가 발생했습니다: ${error.message}`);
        }
    }
}

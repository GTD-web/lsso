import { Controller, Get, Post, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { LogsAdminUseCase } from '../usecases/admin.usecase';
import { Log } from '../../../../../../libs/database/entities';
import { LogFilterDto } from '../dto/log-filter.dto';
import { ApiResponseDto } from 'libs/common/dto/api-response.dto';
import { LogResponseDto } from '../dto/log-response.dto';
import { LogsResponseDto } from '../dto/logs-response.dto';

@ApiTags('관리자 로그 API')
@Controller('admin/logs')
export class AdminLogsController {
    constructor(private readonly logsAdminUseCase: LogsAdminUseCase) {}

    @Get()
    @ApiOperation({ summary: '로그 목록 조회' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '로그 목록 조회 성공',
        type: ApiResponseDto,
    })
    @ApiQuery({ name: 'page', required: false, description: '페이지 번호', type: Number })
    @ApiQuery({ name: 'limit', required: false, description: '페이지당 항목 수', type: Number })
    async findAll(@Query('page') page = 1, @Query('limit') limit = 10): Promise<ApiResponseDto<LogsResponseDto>> {
        try {
            const { logs, total, page: pageNum, totalPages } = await this.logsAdminUseCase.findAll(+page, +limit);
            const responseData: LogsResponseDto = {
                logs: logs.map((log) => this.logsAdminUseCase.mapLogToDto(log)),
                total,
                page: pageNum,
                limit: +limit,
            };

            return ApiResponseDto.success(responseData);
        } catch (error) {
            return ApiResponseDto.error('LOGS_FETCH_ERROR', '로그 목록을 가져오는 중 오류가 발생했습니다.');
        }
    }

    @Get(':id')
    @ApiOperation({ summary: '로그 상세 조회' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '로그 상세 조회 성공',
        type: ApiResponseDto,
    })
    @ApiParam({ name: 'id', description: '로그 ID' })
    async findOne(@Param('id') id: string): Promise<ApiResponseDto<LogResponseDto>> {
        try {
            const log = await this.logsAdminUseCase.findOne(id);
            return ApiResponseDto.success(this.logsAdminUseCase.mapLogToDto(log));
        } catch (error) {
            return ApiResponseDto.error('LOG_NOT_FOUND', `ID가 ${id}인 로그를 찾을 수 없습니다.`);
        }
    }

    @Post('filter')
    @ApiOperation({ summary: '로그 필터링' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '로그 필터링 성공',
        type: ApiResponseDto,
    })
    async filter(@Body() filterDto: LogFilterDto): Promise<ApiResponseDto<LogsResponseDto>> {
        try {
            const { logs, total, page, totalPages } = await this.logsAdminUseCase.filterLogs(filterDto);

            const responseData: LogsResponseDto = {
                logs: logs.map((log) => this.logsAdminUseCase.mapLogToDto(log)),
                total,
                page,
                limit: filterDto.limit || 10,
            };

            return ApiResponseDto.success(responseData);
        } catch (error) {
            return ApiResponseDto.error('LOGS_FILTER_ERROR', '로그 필터링 중 오류가 발생했습니다.');
        }
    }
}

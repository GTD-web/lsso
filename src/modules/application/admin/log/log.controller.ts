import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../../libs/common/guards/jwt-auth.guard';
import { LogApplicationService } from './log-application.service';
import { LogFilterDto, LogResponseDto, LogsResponseDto } from './dto';

@ApiTags('Admin - 로그 관리')
// @ApiBearerAuth()
@Controller('admin/logs')
export class LogController {
    constructor(private readonly logApplicationService: LogApplicationService) {}

    @Get()
    @ApiOperation({ summary: '로그 목록 조회' })
    @ApiResponse({ status: 200, type: LogsResponseDto })
    @ApiQuery({ name: 'page', required: false, description: '페이지 번호', type: Number })
    @ApiQuery({ name: 'limit', required: false, description: '페이지당 항목 수', type: Number })
    async findAll(@Query('page') page = 1, @Query('limit') limit = 10): Promise<LogsResponseDto> {
        return await this.logApplicationService.로그목록조회(+page, +limit);
    }

    @Get(':id')
    @ApiOperation({ summary: '로그 상세 조회' })
    @ApiResponse({ status: 200, type: LogResponseDto })
    @ApiResponse({ status: 404, description: '로그를 찾을 수 없음' })
    @ApiParam({ name: 'id', description: '로그 ID' })
    async findOne(@Param('id') id: string): Promise<LogResponseDto> {
        return await this.logApplicationService.로그상세조회(id);
    }

    @Post('filter')
    @ApiOperation({ summary: '로그 필터링' })
    @ApiBody({ type: LogFilterDto })
    @ApiResponse({ status: 200, type: LogsResponseDto })
    async filter(@Body() filterDto: LogFilterDto): Promise<LogsResponseDto> {
        return await this.logApplicationService.로그필터링조회(filterDto);
    }
}

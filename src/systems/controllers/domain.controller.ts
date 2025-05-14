import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { SystemsService } from '../services/systems.service';
import { System } from '../entities/system.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';

@ApiTags('도메인 시스템 API')
@Controller('domain/systems')
export class DomainSystemsController {
    constructor(private readonly systemsService: SystemsService) {}

    @Post()
    @ApiOperation({ summary: '시스템 생성' })
    @ApiResponse({ status: 201, description: '시스템이 성공적으로 생성됨' })
    async create(@Body() createDto: CreateSystemDto): Promise<System> {
        return await this.systemsService.create(createDto);
    }

    @Get()
    @ApiOperation({ summary: '시스템 목록 조회' })
    @ApiResponse({ status: 200, description: '시스템 목록' })
    async findAll(@Query() options?: any): Promise<System[]> {
        return await this.systemsService.findAll(options);
    }

    @Get(':id')
    @ApiOperation({ summary: '시스템 상세 조회' })
    @ApiResponse({ status: 200, description: '시스템 상세 정보' })
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async findOne(@Param('id') id: string): Promise<System> {
        return await this.systemsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: '시스템 정보 수정' })
    @ApiResponse({ status: 200, description: '수정된 시스템 정보' })
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async update(@Param('id') id: string, @Body() updateDto: UpdateSystemDto): Promise<System> {
        return await this.systemsService.update(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '시스템 삭제' })
    @ApiResponse({ status: 200, description: '시스템 삭제 성공' })
    @ApiParam({ name: 'id', description: '시스템 ID' })
    async remove(@Param('id') id: string): Promise<void> {
        return await this.systemsService.remove(id);
    }
}

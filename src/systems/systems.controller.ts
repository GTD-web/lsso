import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { System } from './entities/system.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { ResponseSystemDto } from './dto/response-system.dto';

@ApiTags('시스템')
@Controller('systems')
export class SystemsController {
    constructor(private readonly systemsService: SystemsService) {}

    @Get()
    @ApiOperation({ summary: '시스템 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '시스템 목록 조회 성공',
        type: ResponseSystemDto,
    })
    findAll(): Promise<ResponseSystemDto[]> {
        return this.systemsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: '시스템 상세 조회' })
    @ApiResponse({
        status: 200,
        description: '시스템 상세 조회 성공',
        type: ResponseSystemDto,
    })
    findOne(@Param('id') id: string): Promise<ResponseSystemDto> {
        return this.systemsService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: '시스템 생성' })
    @ApiBody({ type: CreateSystemDto })
    @ApiResponse({
        status: 201,
        description: '시스템 생성 성공',
        type: ResponseSystemDto,
    })
    create(@Body() createSystemDto: CreateSystemDto): Promise<ResponseSystemDto> {
        return this.systemsService.create(createSystemDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: '시스템 수정' })
    @ApiBody({ type: UpdateSystemDto })
    @ApiResponse({
        status: 200,
        description: '시스템 수정 성공',
        type: ResponseSystemDto,
    })
    update(@Param('id') id: string, @Body() updateSystemDto: UpdateSystemDto): Promise<ResponseSystemDto> {
        console.log(updateSystemDto);
        return this.systemsService.update(id, updateSystemDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '시스템 삭제' })
    @ApiResponse({
        status: 200,
        description: '시스템 삭제 성공',
    })
    remove(@Param('id') id: string): Promise<void> {
        return this.systemsService.remove(id);
    }
}

import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ResponseSystemDto } from './dto';

@Controller('systems')
export class SystemsController {
    constructor(private readonly systemsService: SystemsService) {}
}

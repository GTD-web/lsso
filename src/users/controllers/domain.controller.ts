import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('도메인 사용자 API')
@Controller('domain/users')
export class DomainUsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createDto: any) {
        return await this.usersService.create(createDto);
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.usersService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: any) {
        return await this.usersService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.usersService.remove(id);
    }
}

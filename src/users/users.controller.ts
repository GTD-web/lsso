import { Controller, Get, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('users')
@ApiExcludeController()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('sync')
    async syncEmployees() {
        return await this.usersService.syncEmployees();
    }

    @Post('webhook/create')
    async webhookCreate(@Body() body: any) {
        console.log('created employee', body);
        await this.usersService.syncEmployees();
    }

    @Post('webhook/update')
    async webhookUpdate(@Body() body: any) {
        console.log('updated employee', body);
        await this.usersService.syncEmployees();
    }

    @Post('webhook/position_changed')
    async webhookPositionChanged(@Body() body: any) {
        console.log('position changed', body);
        await this.usersService.syncEmployees();
    }

    @Post('webhook/department_changed')
    async webhookDepartmentChanged(@Body() body: any) {
        console.log('department changed', body);
        await this.usersService.syncEmployees();
    }

    @Post('webhook/delete')
    async webhookDelete(@Body() body: any) {
        console.log('deleted employee', body);
        await this.usersService.syncEmployees();
    }
}

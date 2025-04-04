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
        console.log(await this.usersService.getEmployees());
    }

    @Post('webhook/update')
    async webhookUpdate(@Body() body: any) {
        console.log('updated employee', body);
        console.log(await this.usersService.getEmployees());
    }

    @Post('webhook/delete')
    async webhookDelete(@Body() body: any) {
        console.log('deleted employee', body);
        console.log(await this.usersService.getEmployees());
    }
}

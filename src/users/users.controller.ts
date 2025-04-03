import { Controller, Get, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('users')
@ApiExcludeController()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('webhook/create')
    webhookCreate(@Body() body: any) {
        console.log('created employee', body);
        console.log(this.usersService.getEmployees());
    }

    @Post('webhook/update')
    webhookUpdate(@Body() body: any) {
        console.log('updated employee', body);
        console.log(this.usersService.getEmployees());
    }

    @Post('webhook/delete')
    webhookDelete(@Body() body: any) {
        console.log('deleted employee', body);
        console.log(this.usersService.getEmployees());
    }
}

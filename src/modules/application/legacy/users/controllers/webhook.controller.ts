import { Controller, Get, Body, Post } from '@nestjs/common';
import { WebhookUsecase } from '../usecases/webhook.usecase';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from '../../../../../../libs/common/decorators/public.decorator';

@Controller('webhook/users')
@Public()
@ApiExcludeController()
export class WebhookUsersController {
    constructor(private readonly webhookUsecase: WebhookUsecase) {}

    @Get('sync')
    async syncEmployees() {
        return await this.webhookUsecase.syncEmployees();
    }

    @Post('create')
    async webhookCreate(@Body() body: any) {
        console.log('created employee', body);
        await this.webhookUsecase.syncEmployees();
    }

    @Post('update')
    async webhookUpdate(@Body() body: any) {
        console.log('updated employee', body);
        await this.webhookUsecase.syncEmployees();
    }

    @Post('position_changed')
    async webhookPositionChanged(@Body() body: any) {
        console.log('position changed', body);
        await this.webhookUsecase.syncEmployees();
    }

    @Post('department_changed')
    async webhookDepartmentChanged(@Body() body: any) {
        console.log('department changed', body);
        await this.webhookUsecase.syncEmployees();
    }

    @Post('delete')
    async webhookDelete(@Body() body: any) {
        console.log('deleted employee', body);
        await this.webhookUsecase.syncEmployees();
    }
}

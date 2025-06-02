import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    @Get('set-initial-password')
    async setInitialPassword(@Res() res: Response, @Query('token') token: string) {
        return res.render('pages/set-initial-password', {
            token,
        });
    }

    @Get('change-password')
    async changePassword(@Res() res: Response) {
        return res.render('pages/change-password');
    }
}

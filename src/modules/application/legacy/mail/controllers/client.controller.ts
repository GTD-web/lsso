import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from '../mail.service';
import { ApiBody } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Legacy - 메일')
@Controller('mail')
export class ClientMailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send')
    @ApiOperation({ summary: '이메일 발송' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                recipients: { type: 'array', items: { type: 'string' } },
                subject: { type: 'string' },
                template: { type: 'string' },
                data: { type: 'object' },
            },
        },
    })
    async sendMail(@Body() body: { recipients: string[]; subject: string; template: string; data: any }) {
        await this.mailService.sendEmail({
            recipients: body.recipients,
            subject: body.subject,
            template: body.template,
            context: body.data,
        });
    }
}

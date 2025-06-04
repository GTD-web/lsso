import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { SendMailDto } from './dtos/sendMail.dto';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {
        // Handlebars 헬퍼 함수 등록
        handlebars.registerHelper({
            multiply: (a: number, b: number) => a * b,
            divide: (a: number, b: number) => a / b,
            round: (num: number) => Math.round(num),
            gt: (a: number | any[], b: number) => {
                if (Array.isArray(a)) {
                    return a.length > b;
                }
                return a > b;
            },
            eq: (a: number, b: number) => a === b,
            mod: (a: number, b: number) => a % b,
            times: function (n: number, block: any) {
                let accum = '';
                for (let i = 0; i < n; ++i) accum += block.fn(i);
                return accum;
            },
            or: (a: boolean, b: boolean) => a || b,
            minutesToHours: (minutes: number) => {
                return Number((minutes / 60).toFixed(2));
            },
        });
    }

    /**
     * 이메일을 발송합니다.
     * @param to 수신자 이메일 주소 배열
     * @param subject 이메일 제목
     * @param template 템플릿 파일명 (확장자 제외)
     * @param context 템플릿에 전달할 데이터
     */
    async sendEmail(dto: SendMailDto) {
        console.log(dto);
        let { recipients: to, subject, template, context } = dto;
        const templatePath = join(__dirname, '..', '..', 'src', 'mail', 'templates', `${template}.hbs`);
        let source = '';
        try {
            source = fs.readFileSync(templatePath, 'utf-8');
        } catch (error) {
            console.error(`Error reading template file: ${error}`);
            throw new BadRequestException('해당 경로에 파일이 존재하지 않습니다.');
        }
        const compiledTemplate = handlebars.compile(source);
        const html = compiledTemplate(context);
        to = ['kim.kyuhyun@lumir.space'];
        await this.mailerService.sendMail({
            from: `"No Reply" <${process.env.GMAIL_USER}>`,
            to: to,
            subject: subject,
            html: html,
        });
    }
}

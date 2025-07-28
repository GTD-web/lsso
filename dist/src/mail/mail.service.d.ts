import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from './dtos/sendMail.dto';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmail(dto: SendMailDto): Promise<void>;
}

import { MailService } from '../mail.service';
export declare class ClientMailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendMail(body: {
        recipients: string[];
        subject: string;
        template: string;
        data: any;
    }): Promise<void>;
}

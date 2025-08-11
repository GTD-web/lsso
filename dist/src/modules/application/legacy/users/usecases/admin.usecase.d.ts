import { Employee } from '../../../../../../libs/database/entities/employee.entity';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
export declare class AdminUsecase {
    private readonly usersService;
    private readonly jwtService;
    private readonly mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    searchUsers(query: string): Promise<Employee[]>;
    sendInitPassSetMail(email: string): Promise<void>;
    sendTempPasswordMail(email: string): Promise<void>;
}

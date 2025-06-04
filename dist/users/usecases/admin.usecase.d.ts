import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
export declare class AdminUsecase {
    private readonly usersService;
    private readonly jwtService;
    private readonly mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    searchUsers(query: string): Promise<User[]>;
    sendInitPassSetMail(email: string): Promise<void>;
    sendInitPassSetMailToAll(): Promise<void>;
    sendTempPasswordMail(email: string): Promise<void>;
}

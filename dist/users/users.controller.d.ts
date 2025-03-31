import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    webhookCreate(body: any): void;
    webhookUpdate(body: any): void;
    webhookDelete(body: any): void;
}

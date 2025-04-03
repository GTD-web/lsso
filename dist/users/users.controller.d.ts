import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    syncEmployees(): Promise<void>;
    webhookCreate(body: any): Promise<void>;
    webhookUpdate(body: any): Promise<void>;
    webhookDelete(body: any): Promise<void>;
}

import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    syncEmployees(): Promise<void>;
    webhookCreate(body: any): Promise<void>;
    webhookUpdate(body: any): Promise<void>;
    webhookPositionChanged(body: any): Promise<void>;
    webhookDepartmentChanged(body: any): Promise<void>;
    webhookDelete(body: any): Promise<void>;
}

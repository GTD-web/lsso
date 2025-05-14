import { UsersService } from '../services/users.service';
export declare class DomainUsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createDto: any): Promise<import("../entities/user.entity").User>;
    findAll(): Promise<import("../entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../entities/user.entity").User>;
    update(id: string, updateDto: any): Promise<import("../entities/user.entity").User>;
    remove(id: string): Promise<void>;
}

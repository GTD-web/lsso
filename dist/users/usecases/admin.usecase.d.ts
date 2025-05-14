import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
export declare class AdminUsecase {
    private readonly usersService;
    constructor(usersService: UsersService);
    searchUsers(query: string): Promise<User[]>;
}

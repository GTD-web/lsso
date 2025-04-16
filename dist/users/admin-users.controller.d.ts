import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
export declare class AdminUsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<ApiResponseDto<UserResponseDto[]>>;
    search(query: string): Promise<ApiResponseDto<UserResponseDto[]>>;
    findOne(id: string): Promise<ApiResponseDto<UserResponseDto>>;
}

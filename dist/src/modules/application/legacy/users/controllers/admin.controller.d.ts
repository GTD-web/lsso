import { UsersService } from '../services/users.service';
import { UserResponseDto } from '../dto/user-response.dto';
import { ApiResponseDto } from '../../../../../common/dto/api-response.dto';
import { AdminUsecase } from '../usecases/admin.usecase';
export declare class AdminUsersController {
    private readonly usersService;
    private readonly adminUsecase;
    constructor(usersService: UsersService, adminUsecase: AdminUsecase);
    findAll(): Promise<ApiResponseDto<UserResponseDto[]>>;
    search(query: string): Promise<ApiResponseDto<UserResponseDto[]>>;
    findOne(id: string): Promise<ApiResponseDto<UserResponseDto>>;
    sendInitPassSetMail(body: {
        email: string;
    }): Promise<ApiResponseDto<void>>;
    sendTempPasswordMail(body: {
        email: string;
    }): Promise<ApiResponseDto<void>>;
}

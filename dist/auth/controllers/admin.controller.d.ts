import { AdminUseCase } from '../usecases/admin.usecase';
import { ChangePasswordDto, AdminLoginDto, AdminLoginResponseDto, AdminProfileDto, AdminTokenVerifyDto, AdminTokenRefreshDto, TokenResponseDto } from '../dto/admin';
import { Request } from 'express';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
interface RequestWithUser extends Request {
    user: {
        sub: string;
        email: string;
        role: string;
    };
}
export declare class AdminAuthController {
    private readonly adminUseCase;
    constructor(adminUseCase: AdminUseCase);
    login(loginDto: AdminLoginDto): Promise<ApiResponseDto<AdminLoginResponseDto>>;
    verifyToken(verifyDto: AdminTokenVerifyDto): Promise<ApiResponseDto<AdminLoginResponseDto>>;
    refreshToken(refreshDto: AdminTokenRefreshDto): Promise<ApiResponseDto<TokenResponseDto>>;
    getProfile(req: RequestWithUser): Promise<ApiResponseDto<AdminProfileDto>>;
    changePassword(req: RequestWithUser, changePasswordDto: ChangePasswordDto): Promise<ApiResponseDto<{
        success: boolean;
    }>>;
}
export {};

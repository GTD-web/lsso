import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto, AdminLoginResponseDto, AdminTokenVerifyDto, AdminTokenRefreshDto } from './dto';
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    adminLogin(loginDto: AdminLoginDto): Promise<AdminLoginResponseDto>;
    verifyToken(verifyDto: AdminTokenVerifyDto): Promise<AdminLoginResponseDto>;
    refreshToken(refreshDto: AdminTokenRefreshDto): Promise<AdminLoginResponseDto>;
    adminLogout(auth: string, body: {
        refreshToken: string;
    }): Promise<{
        success: boolean;
    }>;
}

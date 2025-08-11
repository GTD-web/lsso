import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { AdminLoginResponseDto, AdminProfileDto, TokenResponseDto } from '../dto/admin';
export declare class AdminUseCase {
    private readonly authService;
    private readonly jwtService;
    private readonly configService;
    private readonly jwtSecret;
    constructor(authService: AuthService, jwtService: JwtService, configService: ConfigService);
    login(email: string, password: string): Promise<AdminLoginResponseDto>;
    verifyToken(token: string): Promise<AdminLoginResponseDto>;
    refreshToken(refreshToken: string): Promise<TokenResponseDto>;
    getProfile(adminId: string): Promise<AdminProfileDto>;
    changePassword(adminId: string, currentPassword: string, newPassword: string): Promise<{
        success: boolean;
    }>;
}

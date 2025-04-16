import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AdminLoginDto, AdminAuthDataDto, AdminUserDto } from './dto';
import { Admin } from './entities/admin.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { Request } from 'express';
export declare class AdminAuthService {
    private readonly jwtService;
    private adminRepository;
    private refreshTokenRepository;
    private readonly logger;
    constructor(jwtService: JwtService, adminRepository: Repository<Admin>, refreshTokenRepository: Repository<RefreshToken>);
    private ensureAdminExists;
    adminLogin(loginDto: AdminLoginDto, request?: Request): Promise<AdminAuthDataDto>;
    verifyAdminToken(token: string): Promise<AdminUserDto>;
    refreshAdminToken(refreshTokenStr: string, request?: Request): Promise<AdminAuthDataDto>;
    adminLogout(refreshTokenStr: string): Promise<boolean>;
    private generateRefreshToken;
    private generateRandomString;
}

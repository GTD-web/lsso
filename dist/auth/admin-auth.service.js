"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AdminAuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
let AdminAuthService = AdminAuthService_1 = class AdminAuthService {
    constructor(jwtService, adminRepository, refreshTokenRepository) {
        this.jwtService = jwtService;
        this.adminRepository = adminRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.logger = new common_1.Logger(AdminAuthService_1.name);
        this.ensureAdminExists().catch((err) => {
            this.logger.error('기본 관리자 계정 생성 실패:', err);
        });
    }
    async ensureAdminExists() {
        const adminCount = await this.adminRepository.count();
        if (adminCount === 0) {
            this.logger.log('기본 관리자 계정이 없습니다. 생성합니다...');
            const admin = this.adminRepository.create({
                email: 'admin@example.com',
                name: '관리자',
                role: 'admin',
                password: 'admin123',
            });
            await this.adminRepository.save(admin);
            this.logger.log(`기본 관리자 계정이 생성되었습니다. 이메일: ${admin.email}`);
        }
    }
    async adminLogin(loginDto, request) {
        const { email, password } = loginDto;
        try {
            const admin = await this.adminRepository.findOne({ where: { email } });
            if (!admin) {
                throw new common_1.NotFoundException('존재하지 않는 관리자 계정입니다.');
            }
            const isPasswordValid = await admin.validatePassword(password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
            }
            const payload = {
                sub: admin.id,
                email: admin.email,
                role: admin.role,
            };
            const token = this.jwtService.sign(payload, {
                expiresIn: '1h',
                secret: process.env.JWT_SECRET || 'admin-secret-key',
            });
            const refreshToken = await this.generateRefreshToken(admin.id, request?.ip, request?.headers['user-agent']);
            const userDto = {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            };
            return {
                user: userDto,
                token,
                refreshToken: refreshToken.token,
            };
        }
        catch (error) {
            this.logger.error(`관리자 로그인 실패: ${error.message}`, error.stack);
            throw error;
        }
    }
    async verifyAdminToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET || 'admin-secret-key',
            });
            if (payload.role !== 'admin') {
                throw new common_1.UnauthorizedException('관리자 권한이 아닙니다.');
            }
            const admin = await this.adminRepository.findOne({ where: { id: payload.sub } });
            if (!admin) {
                throw new common_1.NotFoundException('존재하지 않는 관리자입니다.');
            }
            return {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            };
        }
        catch (error) {
            this.logger.error(`토큰 검증 실패: ${error.message}`);
            if (error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('만료된 토큰입니다.');
            }
            throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
        }
    }
    async refreshAdminToken(refreshTokenStr, request) {
        try {
            const refreshToken = await this.refreshTokenRepository.findOne({
                where: { token: refreshTokenStr },
                relations: ['admin'],
            });
            if (!refreshToken) {
                throw new common_1.UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
            }
            if (refreshToken.isExpired() || refreshToken.isRevoked) {
                throw new common_1.UnauthorizedException('만료되거나 취소된 리프레시 토큰입니다.');
            }
            const admin = refreshToken.admin;
            if (!admin) {
                throw new common_1.NotFoundException('존재하지 않는 관리자입니다.');
            }
            const payload = {
                sub: admin.id,
                email: admin.email,
                role: admin.role,
            };
            const token = this.jwtService.sign(payload, {
                expiresIn: '1h',
                secret: process.env.JWT_SECRET || 'admin-secret-key',
            });
            refreshToken.isRevoked = true;
            await this.refreshTokenRepository.save(refreshToken);
            const newRefreshToken = await this.generateRefreshToken(admin.id, request?.ip || refreshToken.ip, request?.headers['user-agent'] || refreshToken.userAgent);
            const userDto = {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            };
            return {
                user: userDto,
                token,
                refreshToken: newRefreshToken.token,
            };
        }
        catch (error) {
            this.logger.error(`토큰 갱신 실패: ${error.message}`, error.stack);
            throw error;
        }
    }
    async adminLogout(refreshTokenStr) {
        try {
            const refreshToken = await this.refreshTokenRepository.findOne({
                where: { token: refreshTokenStr },
            });
            if (!refreshToken) {
                return true;
            }
            refreshToken.isRevoked = true;
            await this.refreshTokenRepository.save(refreshToken);
            return true;
        }
        catch (error) {
            this.logger.error(`로그아웃 실패: ${error.message}`, error.stack);
            return false;
        }
    }
    async generateRefreshToken(adminId, ip, userAgent) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
        const refreshToken = this.refreshTokenRepository.create({
            token: `rt_${this.generateRandomString(32)}`,
            adminId,
            expiresAt,
            ip,
            userAgent,
        });
        return this.refreshTokenRepository.save(refreshToken);
    }
    generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
};
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = AdminAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(2, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminAuthService);
//# sourceMappingURL=admin-auth.service.js.map
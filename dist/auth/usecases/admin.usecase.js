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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUseCase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../services/auth.service");
let AdminUseCase = class AdminUseCase {
    constructor(authService, jwtService, configService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.jwtSecret = this.configService.get('JWT_SECRET') || 'admin-secret-key';
    }
    async login(email, password) {
        const admin = await this.authService.findByEmail(email);
        if (!admin) {
            throw new common_1.UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        const isPasswordValid = await admin.validatePassword(password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        const payload = { sub: admin.id, email: admin.email, role: admin.role };
        const { password: _, ...adminInfo } = admin;
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: this.jwtSecret,
                expiresIn: '1h',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: this.jwtSecret,
                expiresIn: '7d',
            }),
            admin: adminInfo,
        };
    }
    async verifyToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.jwtSecret,
            });
            const admin = await this.authService.findOne(payload.sub);
            if (!admin) {
                throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
            }
            const { password: _, ...adminInfo } = admin;
            return {
                accessToken: token,
                refreshToken: '',
                admin: adminInfo,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
        }
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.jwtSecret,
            });
            const admin = await this.authService.findOne(payload.sub);
            if (!admin) {
                throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
            }
            const newPayload = { sub: admin.id, email: admin.email, role: admin.role };
            return {
                accessToken: this.jwtService.sign(newPayload, {
                    secret: this.jwtSecret,
                    expiresIn: '1h',
                }),
                refreshToken: this.jwtService.sign(newPayload, {
                    secret: this.jwtSecret,
                    expiresIn: '7d',
                }),
                expiresIn: 3600,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
        }
    }
    async getProfile(adminId) {
        try {
            const admin = await this.authService.findOne(adminId);
            return {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.UnauthorizedException('관리자 정보를 찾을 수 없습니다.');
            }
            throw error;
        }
    }
    async changePassword(adminId, currentPassword, newPassword) {
        const result = await this.authService.changePassword(adminId, currentPassword, newPassword);
        if (!result) {
            throw new common_1.UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
        }
        return { success: true };
    }
};
exports.AdminUseCase = AdminUseCase;
exports.AdminUseCase = AdminUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AdminUseCase);
//# sourceMappingURL=admin.usecase.js.map
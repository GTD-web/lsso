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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_auth_service_1 = require("./admin-auth.service");
const dto_1 = require("./dto");
let AdminAuthController = class AdminAuthController {
    constructor(adminAuthService) {
        this.adminAuthService = adminAuthService;
    }
    async adminLogin(loginDto) {
        try {
            const data = await this.adminAuthService.adminLogin(loginDto);
            return { success: true, data };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    code: error.status === 401 ? 'AUTH_INVALID_CREDENTIALS' : 'AUTH_USER_NOT_FOUND',
                    message: error.message,
                },
            };
        }
    }
    async verifyToken(verifyDto) {
        try {
            const user = await this.adminAuthService.verifyAdminToken(verifyDto.token);
            return {
                success: true,
                data: {
                    user,
                    token: verifyDto.token,
                    refreshToken: '',
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    code: 'AUTH_INVALID_TOKEN',
                    message: error.message,
                },
            };
        }
    }
    async refreshToken(refreshDto) {
        try {
            const data = await this.adminAuthService.refreshAdminToken(refreshDto.refreshToken);
            return { success: true, data };
        }
        catch (error) {
            return {
                success: false,
                error: {
                    code: 'AUTH_INVALID_REFRESH_TOKEN',
                    message: error.message,
                },
            };
        }
    }
    async adminLogout(auth, body) {
        const refreshToken = body.refreshToken;
        if (refreshToken) {
            await this.adminAuthService.adminLogout(refreshToken);
        }
        return { success: true };
    }
};
exports.AdminAuthController = AdminAuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: '관리자 로그인',
        description: '관리자 계정으로 로그인하여 액세스 토큰과 리프레시 토큰을 발급받습니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 성공',
        type: dto_1.AdminLoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패 - 비밀번호가 올바르지 않습니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '존재하지 않는 관리자 계정입니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AdminLoginDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 검증', description: 'JWT 액세스 토큰의 유효성을 검증합니다.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 검증 성공',
        type: dto_1.AdminLoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패 - 유효하지 않거나 만료된 토큰입니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AdminTokenVerifyDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 갱신', description: '리프레시 토큰을 사용하여 만료된 액세스 토큰을 갱신합니다.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 갱신 성공',
        type: dto_1.AdminLoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패 - 유효하지 않거나 만료된 리프레시 토큰입니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AdminTokenRefreshDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({ summary: '관리자 로그아웃', description: '현재 세션을 로그아웃 처리합니다.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그아웃 성공',
        schema: {
            type: 'object',
            properties: {
                success: {
                    type: 'boolean',
                    example: true,
                },
            },
        },
    }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "adminLogout", null);
exports.AdminAuthController = AdminAuthController = __decorate([
    (0, swagger_1.ApiTags)('관리자 인증'),
    (0, common_1.Controller)('admin/auth'),
    __metadata("design:paramtypes", [admin_auth_service_1.AdminAuthService])
], AdminAuthController);
//# sourceMappingURL=admin-auth.controller.js.map
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
const admin_usecase_1 = require("../usecases/admin.usecase");
const admin_1 = require("../dto/admin");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
let AdminAuthController = class AdminAuthController {
    constructor(adminUseCase) {
        this.adminUseCase = adminUseCase;
    }
    async login(loginDto) {
        const result = await this.adminUseCase.login(loginDto.email, loginDto.password);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
    async verifyToken(verifyDto) {
        const result = await this.adminUseCase.verifyToken(verifyDto.token);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
    async refreshToken(refreshDto) {
        const result = await this.adminUseCase.refreshToken(refreshDto.refreshToken);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
    async getProfile(req) {
        const adminId = req.user.sub;
        const result = await this.adminUseCase.getProfile(adminId);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
    async changePassword(req, changePasswordDto) {
        const adminId = req.user.sub;
        const result = await this.adminUseCase.changePassword(adminId, changePasswordDto.currentPassword, changePasswordDto.newPassword);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
};
exports.AdminAuthController = AdminAuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '관리자 로그인' }),
    (0, swagger_1.ApiBody)({ type: admin_1.AdminLoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 성공',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_1.AdminLoginDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '토큰 검증' }),
    (0, swagger_1.ApiBody)({ type: admin_1.AdminTokenVerifyDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 검증 성공',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_1.AdminTokenVerifyDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '토큰 갱신' }),
    (0, swagger_1.ApiBody)({ type: admin_1.AdminTokenRefreshDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 갱신 성공',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_1.AdminTokenRefreshDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '내 정보 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '관리자 정보',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 변경' }),
    (0, swagger_1.ApiBody)({ type: admin_1.ChangePasswordDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '비밀번호 변경 성공',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "changePassword", null);
exports.AdminAuthController = AdminAuthController = __decorate([
    (0, swagger_1.ApiTags)('관리자 인증 API'),
    (0, common_1.Controller)('admin/auth'),
    __metadata("design:paramtypes", [admin_usecase_1.AdminUseCase])
], AdminAuthController);
//# sourceMappingURL=admin.controller.js.map
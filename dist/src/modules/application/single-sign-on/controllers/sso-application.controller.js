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
exports.SsoApplicationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sso_application_service_1 = require("../sso-application.service");
const dto_1 = require("../dto");
let SsoApplicationController = class SsoApplicationController {
    constructor(ssoApplicationService) {
        this.ssoApplicationService = ssoApplicationService;
    }
    async login(authHeader, body) {
        const result = await this.ssoApplicationService.login(authHeader, body);
        return result;
    }
    async verifyToken(authHeader) {
        return this.ssoApplicationService.verifyToken(authHeader);
    }
    async changePassword(authHeader, body) {
        return this.ssoApplicationService.changePassword(authHeader, body);
    }
    async checkPassword(authHeader, body) {
        return this.ssoApplicationService.checkPassword(authHeader, body);
    }
};
exports.SsoApplicationController = SsoApplicationController;
__decorate([
    (0, swagger_1.ApiBasicAuth)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '로그인 및 토큰 발급',
        description: '외부 시스템이 Basic Auth로 인증한 후, 사용자 이메일/비밀번호를 검증하고 액세스 토큰을 발급합니다.',
    }),
    (0, swagger_1.ApiHeader)({
        name: 'basic-auth',
        description: 'Basic Auth 헤더, 형식: Basic base64(clientId:clientSecret)',
        required: false,
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.LoginRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 성공 및 토큰 발급 성공',
        type: dto_1.LoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '시스템 인증 실패 또는 사용자 로그인 실패' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '사용자 또는 시스템을 찾을 수 없음' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], SsoApplicationController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '토큰 검증' }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer 토큰, 형식: Bearer {access_token}',
        required: false,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 검증 성공',
        type: dto_1.TokenVerifyResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '유효하지 않은 토큰' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SsoApplicationController.prototype, "verifyToken", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('change-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '비밀번호 변경',
        description: '사용자의 비밀번호를 변경합니다.',
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer 토큰, 형식: Bearer {access_token}',
        required: true,
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.ChangePasswordRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '비밀번호 변경 성공',
        type: dto_1.ChangePasswordResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ChangePasswordRequestDto]),
    __metadata("design:returntype", Promise)
], SsoApplicationController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('check-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '비밀번호 확인',
        description: '현재 비밀번호가 일치하는지 확인합니다.',
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer 토큰, 형식: Bearer {access_token}',
        required: true,
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.CheckPasswordRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '비밀번호 확인 성공',
        type: dto_1.CheckPasswordResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CheckPasswordRequestDto]),
    __metadata("design:returntype", Promise)
], SsoApplicationController.prototype, "checkPassword", null);
exports.SsoApplicationController = SsoApplicationController = __decorate([
    (0, swagger_1.ApiTags)('외부 시스템 인증 API'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [sso_application_service_1.SsoApplicationService])
], SsoApplicationController);
//# sourceMappingURL=sso-application.controller.js.map
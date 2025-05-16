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
exports.ClientAuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const swagger_1 = require("@nestjs/swagger");
const client_usecase_1 = require("../usecases/client.usecase");
let ClientAuthController = class ClientAuthController {
    constructor(authService, clientUseCase) {
        this.authService = authService;
        this.clientUseCase = clientUseCase;
    }
    async tokenRoute(authHeader, body) {
        const system = await this.clientUseCase.authenticateSystem(authHeader);
        try {
            return { ...(await this.clientUseCase.handleTokenRequest(system, body)), system: system.name };
        }
        catch (error) {
            throw new common_1.UnauthorizedException({ message: error.message, system: system?.name || null });
        }
    }
    async verifyToken(authHeader) {
        console.log('authHeader', authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.BadRequestException('유효한 Bearer 토큰이 필요합니다.');
        }
        const token = authHeader.split(' ')[1];
        return { valid: true, message: '토큰 검증 기능은 아직 구현되지 않았습니다.' };
    }
};
exports.ClientAuthController = ClientAuthController;
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
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                grant_type: {
                    type: 'string',
                    enum: ['password', 'refresh_token'],
                    description: 'password: 사용자 인증 방식, refresh_token: 리프레시 토큰 방식',
                },
                username: {
                    type: 'string',
                    description: '사용자 이메일 (grant_type이 password인 경우에만 필요)',
                },
                password: {
                    type: 'string',
                    description: '사용자 비밀번호 (grant_type이 password인 경우에만 필요)',
                },
                refresh_token: {
                    type: 'string',
                    description: '리프레시 토큰 (grant_type이 refresh_token인 경우에만 필요)',
                },
            },
            required: ['grant_type'],
            example: {
                grant_type: 'password',
                username: 'user@example.com',
                password: 'password123',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 성공 및 토큰 발급 성공',
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string' },
                token_type: { type: 'string', example: 'Bearer' },
                expires_in: { type: 'number', example: 86400 },
                refresh_token: { type: 'string' },
                refresh_token_expires_in: { type: 'number', example: 2592000 },
                user_info: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        employee_number: { type: 'string' },
                        department: { type: 'string' },
                        position: { type: 'string' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '시스템 인증 실패 또는 사용자 로그인 실패' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '사용자 또는 시스템을 찾을 수 없음' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientAuthController.prototype, "tokenRoute", null);
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
        schema: {
            type: 'object',
            properties: {
                valid: { type: 'boolean', example: true },
                user_info: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        employee_number: { type: 'string' },
                    },
                },
                expires_in: { type: 'number', example: 86400 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '유효하지 않은 토큰' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientAuthController.prototype, "verifyToken", null);
exports.ClientAuthController = ClientAuthController = __decorate([
    (0, swagger_1.ApiTags)('외부 시스템 인증 API'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, client_usecase_1.ClientUseCase])
], ClientAuthController);
//# sourceMappingURL=client.controller.js.map
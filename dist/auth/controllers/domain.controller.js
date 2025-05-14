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
exports.DomainAuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../services/auth.service");
const admin_1 = require("../dto/admin");
let DomainAuthController = class DomainAuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async findAll() {
        return this.authService.findAll();
    }
    async findOne(id) {
        return this.authService.findOne(id);
    }
    async create(createAdminDto) {
        return this.authService.create(createAdminDto);
    }
    async update(id, updateAdminDto) {
        return this.authService.update(id, updateAdminDto);
    }
    async changePassword(id, changePasswordDto) {
        const result = await this.authService.changePassword(id, changePasswordDto.currentPassword, changePasswordDto.newPassword);
        return { success: result };
    }
    async remove(id) {
        return this.authService.remove(id);
    }
};
exports.DomainAuthController = DomainAuthController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '관리자 목록',
        type: [admin_1.AdminResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DomainAuthController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '관리자 상세 조회' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '관리자 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '관리자 상세 정보',
        type: admin_1.AdminResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainAuthController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자 계정 생성' }),
    (0, swagger_1.ApiBody)({ type: admin_1.CreateAdminDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '관리자 계정 생성 성공',
        type: admin_1.AdminResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], DomainAuthController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '관리자 정보 수정' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '관리자 ID' }),
    (0, swagger_1.ApiBody)({ type: admin_1.UpdateAdminDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '관리자 정보 수정 성공',
        type: admin_1.AdminResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_1.UpdateAdminDto]),
    __metadata("design:returntype", Promise)
], DomainAuthController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/password'),
    (0, swagger_1.ApiOperation)({ summary: '관리자 비밀번호 변경' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '관리자 ID' }),
    (0, swagger_1.ApiBody)({ type: admin_1.ChangePasswordDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '비밀번호 변경 성공',
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], DomainAuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '관리자 계정 삭제' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '관리자 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '관리자 계정 삭제 성공',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainAuthController.prototype, "remove", null);
exports.DomainAuthController = DomainAuthController = __decorate([
    (0, swagger_1.ApiTags)('도메인 인증 API'),
    (0, common_1.Controller)('domain/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], DomainAuthController);
//# sourceMappingURL=domain.controller.js.map
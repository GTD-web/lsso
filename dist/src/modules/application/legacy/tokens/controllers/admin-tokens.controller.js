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
exports.AdminTokensController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const api_response_dto_1 = require("../../../../../common/dto/api-response.dto");
const admin_usecase_1 = require("../usecases/admin.usecase");
let AdminTokensController = class AdminTokensController {
    constructor(adminTokensUsecase) {
        this.adminTokensUsecase = adminTokensUsecase;
    }
    async findAll() {
        try {
            const tokensWithEmployee = await this.adminTokensUsecase.findAllWithEmployee();
            const tokenResponseDtos = tokensWithEmployee.map((token) => this.mapTokenToDto(token));
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDtos);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKENS_FETCH_ERROR', '토큰 목록을 조회하는 중 오류가 발생했습니다.');
        }
    }
    async findByEmployeeId(employeeId) {
        try {
            const tokens = await this.adminTokensUsecase.findByEmployeeId(employeeId);
            const tokenResponseDtos = tokens.map((token) => this.mapTokenToDto(token));
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDtos);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKENS_FETCH_ERROR', '직원별 토큰을 조회하는 중 오류가 발생했습니다.');
        }
    }
    async findOne(id) {
        try {
            const tokenWithEmployee = await this.adminTokensUsecase.findOneWithEmployee(id);
            const tokenResponseDto = this.mapTokenToDto(tokenWithEmployee);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_NOT_FOUND', `해당 ID의 토큰을 찾을 수 없습니다: ${id}`);
        }
    }
    async create(createTokenDto) {
        try {
            const token = await this.adminTokensUsecase.createToken(createTokenDto);
            const tokenResponseDto = this.mapTokenToDto(token);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_CREATE_ERROR', '토큰 생성 중 오류가 발생했습니다.');
        }
    }
    async updateStatus(id, updateTokenStatusDto) {
        try {
            const token = await this.adminTokensUsecase.updateStatus(id, updateTokenStatusDto.isActive);
            const tokenResponseDto = this.mapTokenToDto(token);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_UPDATE_ERROR', `토큰 상태 변경 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async renewToken(id, renewTokenDto) {
        try {
            const token = await this.adminTokensUsecase.renewToken(id, renewTokenDto);
            const tokenResponseDto = this.mapTokenToDto(token);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_RENEW_ERROR', `토큰 갱신 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async refreshToken(id) {
        try {
            const token = await this.adminTokensUsecase.refreshTokens(id);
            const tokenResponseDto = this.mapTokenToDto(token);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_REFRESH_ERROR', `리프레시 토큰을 사용한 액세스 토큰 갱신 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            await this.adminTokensUsecase.remove(id);
            return api_response_dto_1.ApiResponseDto.success(true);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_DELETE_ERROR', `토큰 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    mapTokenToDto(token) {
        const responseDto = new dto_1.TokenResponseDto();
        responseDto.id = token.id;
        responseDto.accessToken = token.accessToken;
        responseDto.refreshToken = token.refreshToken;
        responseDto.tokenExpiresAt = token.tokenExpiresAt;
        responseDto.refreshTokenExpiresAt = token.refreshTokenExpiresAt;
        responseDto.lastAccess = token.lastAccess;
        responseDto.isActive = token.isActive;
        responseDto.createdAt = token.createdAt;
        responseDto.updatedAt = token.updatedAt;
        if (token.employee) {
            responseDto.userId = token.employee.id;
            responseDto.userName = token.employee.name;
            responseDto.userEmail = token.employee.email;
        }
        else {
            responseDto.userId = null;
            responseDto.userName = null;
            responseDto.userEmail = null;
        }
        return responseDto;
    }
};
exports.AdminTokensController = AdminTokensController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '토큰 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 목록 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminTokensController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:employeeId'),
    (0, swagger_1.ApiOperation)({ summary: '직원별 토큰 조회' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: '직원 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '직원별 토큰 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminTokensController.prototype, "findByEmployeeId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 상세 조회' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 상세 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminTokensController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '토큰 생성' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '토큰 생성 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTokenDto]),
    __metadata("design:returntype", Promise)
], AdminTokensController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 상태 변경' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateTokenStatusDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 상태 변경 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateTokenStatusDto]),
    __metadata("design:returntype", Promise)
], AdminTokensController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)(':id/renew'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 갱신' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.RenewTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 갱신 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.RenewTokenDto]),
    __metadata("design:returntype", Promise)
], AdminTokensController.prototype, "renewToken", null);
__decorate([
    (0, common_1.Put)(':id/refresh'),
    (0, swagger_1.ApiOperation)({ summary: '리프레시 토큰으로 액세스 토큰 갱신' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '액세스 토큰 갱신 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminTokensController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 삭제' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 삭제 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminTokensController.prototype, "remove", null);
exports.AdminTokensController = AdminTokensController = __decorate([
    (0, swagger_1.ApiTags)('관리자 토큰 API'),
    (0, common_1.Controller)('admin/tokens'),
    __metadata("design:paramtypes", [admin_usecase_1.AdminTokensUsecase])
], AdminTokensController);
//# sourceMappingURL=admin-tokens.controller.js.map
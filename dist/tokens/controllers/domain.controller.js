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
exports.DomainTokensController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tokens_service_1 = require("../services/tokens.service");
const token_entity_1 = require("../entities/token.entity");
const create_token_dto_1 = require("../dto/create-token.dto");
let DomainTokensController = class DomainTokensController {
    constructor(tokensService) {
        this.tokensService = tokensService;
    }
    async findAll(options) {
        return await this.tokensService.findAll(options);
    }
    async findOne(id) {
        return await this.tokensService.findOne(id);
    }
    async findByUserId(userId) {
        return await this.tokensService.findByUserId(userId);
    }
    async create(createTokenDto) {
        return await this.tokensService.create(createTokenDto);
    }
    async update(id, updateData) {
        return await this.tokensService.update(id, updateData);
    }
    async remove(id) {
        return await this.tokensService.remove(id);
    }
};
exports.DomainTokensController = DomainTokensController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '토큰 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 목록',
        type: [token_entity_1.Token],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DomainTokensController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 상세 조회' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 상세 정보',
        type: token_entity_1.Token,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainTokensController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: '사용자별 토큰 조회' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: '사용자 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '사용자별 토큰 목록',
        type: [token_entity_1.Token],
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainTokensController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '토큰 생성' }),
    (0, swagger_1.ApiBody)({ type: create_token_dto_1.CreateTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '토큰 생성 성공',
        type: token_entity_1.Token,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", Promise)
], DomainTokensController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 정보 수정' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 수정 성공',
        type: token_entity_1.Token,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DomainTokensController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 삭제' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 삭제 성공',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainTokensController.prototype, "remove", null);
exports.DomainTokensController = DomainTokensController = __decorate([
    (0, swagger_1.ApiTags)('도메인 토큰 API'),
    (0, common_1.Controller)('domain/tokens'),
    __metadata("design:paramtypes", [tokens_service_1.TokensService])
], DomainTokensController);
//# sourceMappingURL=domain.controller.js.map
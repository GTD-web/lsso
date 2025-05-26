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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const token_entity_1 = require("../entities/token.entity");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../users/services/users.service");
const systems_service_1 = require("../../systems/services/systems.service");
const config_1 = require("@nestjs/config");
let TokensService = class TokensService {
    constructor(tokensRepository, jwtService, usersService, systemsService, configService) {
        this.tokensRepository = tokensRepository;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.systemsService = systemsService;
        this.configService = configService;
        this.jwtSecret = this.configService.get('JWT_SECRET') || 'defaultJwtSecret123!@#';
        if (!this.jwtSecret) {
            console.warn('JWT_SECRET 환경 변수가 설정되지 않았습니다. 기본값이 사용됩니다.');
        }
    }
    async findAll(options) {
        return this.tokensRepository.find(options);
    }
    async findOne(id) {
        const token = await this.tokensRepository.findOne({ where: { id }, relations: ['user'] });
        if (!token) {
            throw new common_1.NotFoundException(`Token with ID ${id} not found`);
        }
        return token;
    }
    async findByUserId(userId) {
        return this.tokensRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }
    async findByAccessToken(accessToken) {
        const token = await this.tokensRepository.findOne({
            where: { accessToken },
            relations: ['user'],
        });
        if (!token) {
            throw new common_1.NotFoundException(`Token with access token ${accessToken} not found`);
        }
        return token;
    }
    async findByRefreshToken(refreshToken) {
        const token = await this.tokensRepository.findOne({
            where: { refreshToken },
            relations: ['user'],
        });
        if (!token) {
            throw new common_1.NotFoundException(`Token with refresh token ${refreshToken} not found`);
        }
        return token;
    }
    async create(createTokenDto) {
        const { userId, ...tokenData } = createTokenDto;
        const user = await this.usersService.findOne(userId);
        const token = this.tokensRepository.create({
            ...tokenData,
            user,
        });
        return this.tokensRepository.save(token);
    }
    async update(id, updateData) {
        const token = await this.findOne(id);
        Object.assign(token, updateData);
        return this.tokensRepository.save(token);
    }
    async remove(id) {
        const result = await this.tokensRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Token with ID ${id} not found`);
        }
    }
    async removeAllUserTokens(userId) {
        await this.tokensRepository.delete({ user: { id: userId } });
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        users_service_1.UsersService,
        systems_service_1.SystemsService,
        config_1.ConfigService])
], TokensService);
//# sourceMappingURL=tokens.service.js.map
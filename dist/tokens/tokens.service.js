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
const token_entity_1 = require("./entities/token.entity");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
const users_service_1 = require("../users/users.service");
const systems_service_1 = require("../systems/systems.service");
let TokensService = class TokensService {
    constructor(tokensRepository, jwtService, usersService, systemsService) {
        this.tokensRepository = tokensRepository;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.systemsService = systemsService;
    }
    async generateToken(user, system, expiresInDays = 30) {
        const secret = (0, crypto_1.randomBytes)(16).toString('hex');
        const expiresIn = `${expiresInDays}d`;
        const accessToken = this.jwtService.sign({ sub: user.id }, { expiresIn, secret });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);
        return {
            secret,
            accessToken,
            tokenExpiresAt: expiresAt,
        };
    }
    async verifyToken(token, secret) {
        try {
            this.jwtService.verify(token, { secret });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async findAll() {
        return this.tokensRepository.find({
            relations: ['user', 'system'],
        });
    }
    async findOne(id) {
        const token = await this.tokensRepository.findOne({
            where: { id },
            relations: ['user', 'system'],
        });
        if (!token) {
            throw new common_1.NotFoundException(`Token with ID ${id} not found`);
        }
        return token;
    }
    async findBySystemId(systemId) {
        return this.tokensRepository.find({
            where: { systemId },
            relations: ['user', 'system'],
        });
    }
    async findByUserId(userId) {
        return this.tokensRepository.find({
            where: { userId },
            relations: ['user', 'system'],
        });
    }
    async createToken(createTokenDto) {
        const { userId, systemId, expiresInDays = 30 } = createTokenDto;
        const user = await this.usersService.findOne(userId);
        const system = await this.systemsService.findOne(systemId);
        const { secret, accessToken, tokenExpiresAt } = await this.generateToken(user, system, expiresInDays);
        const token = this.tokensRepository.create({
            user,
            system,
            userId,
            systemId,
            accessToken,
            secret,
            tokenExpiresAt,
            isActive: true,
        });
        return this.tokensRepository.save(token);
    }
    async updateStatus(id, isActive) {
        const token = await this.findOne(id);
        token.isActive = isActive;
        return this.tokensRepository.save(token);
    }
    async renewToken(id, renewTokenDto) {
        const { expiresInDays = 30 } = renewTokenDto;
        const token = await this.findOne(id);
        const { secret, accessToken, tokenExpiresAt } = await this.generateToken(token.user, token.system, expiresInDays);
        token.accessToken = accessToken;
        token.secret = secret;
        token.tokenExpiresAt = tokenExpiresAt;
        return this.tokensRepository.save(token);
    }
    async remove(id) {
        const token = await this.findOne(id);
        await this.tokensRepository.remove(token);
    }
    async create(user, system) {
        const { secret, accessToken, tokenExpiresAt } = await this.generateToken(user, system);
        return this.tokensRepository.create({
            user,
            system,
            userId: user.id,
            systemId: system.id,
            accessToken,
            secret,
            tokenExpiresAt,
            isActive: true,
        });
    }
    async save(token) {
        return this.tokensRepository.save(token);
    }
    async findByUserAndSystem(user, system) {
        return this.tokensRepository.findOne({
            where: {
                userId: user.id,
                systemId: system.id,
            },
            relations: ['user', 'system'],
        });
    }
    async findByAccessToken(accessToken) {
        return this.tokensRepository.findOne({
            where: { accessToken },
            relations: ['user', 'system'],
        });
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        users_service_1.UsersService,
        systems_service_1.SystemsService])
], TokensService);
//# sourceMappingURL=tokens.service.js.map
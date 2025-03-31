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
let TokensService = class TokensService {
    constructor(tokensRepository, jwtService) {
        this.tokensRepository = tokensRepository;
        this.jwtService = jwtService;
    }
    async generateToken(user, system) {
        const secret = (0, crypto_1.randomBytes)(16).toString('hex');
        const accessToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '24h', secret });
        return {
            secret,
            accessToken,
            tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
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
    async create(user, system) {
        const { secret, accessToken, tokenExpiresAt } = await this.generateToken(user, system);
        return this.tokensRepository.create({
            user,
            system,
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
        });
    }
    async findByAccessToken(accessToken) {
        console.log(accessToken);
        return this.tokensRepository.findOne({
            where: { accessToken },
        });
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], TokensService);
//# sourceMappingURL=tokens.service.js.map
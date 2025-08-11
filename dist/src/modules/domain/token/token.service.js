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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainTokenService = void 0;
const common_1 = require("@nestjs/common");
const token_repository_1 = require("./token.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let DomainTokenService = class DomainTokenService extends base_service_1.BaseService {
    constructor(tokenRepository, jwtService, configService) {
        super(tokenRepository);
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async findByAccessToken(accessToken) {
        const token = await this.tokenRepository.findOne({
            where: { accessToken },
        });
        if (!token) {
            throw new common_1.NotFoundException('토큰을 찾을 수 없습니다.');
        }
        return token;
    }
    async findByRefreshToken(refreshToken) {
        const token = await this.tokenRepository.findOne({
            where: { refreshToken },
        });
        if (!token) {
            throw new common_1.NotFoundException('리프레시 토큰을 찾을 수 없습니다.');
        }
        return token;
    }
    async findAllTokens() {
        return this.tokenRepository.findAll({
            order: { createdAt: 'DESC' },
        });
    }
    async findExpiredTokens() {
        const now = new Date();
        return this.tokenRepository.findAll({
            order: { tokenExpiresAt: 'ASC' },
        });
    }
    generateJwtToken(payload, expiresIn) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('GLOBAL_SECRET'),
            expiresIn: expiresIn,
        });
    }
    verifyJwtToken(token) {
        return this.jwtService.verify(token, {
            secret: this.configService.get('GLOBAL_SECRET'),
        });
    }
};
exports.DomainTokenService = DomainTokenService;
exports.DomainTokenService = DomainTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_repository_1.DomainTokenRepository,
        jwt_1.JwtService,
        config_1.ConfigService])
], DomainTokenService);
//# sourceMappingURL=token.service.js.map
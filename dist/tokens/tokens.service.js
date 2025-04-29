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
    generateTokenFingerprint(userId, systemId) {
        const random = (0, crypto_1.randomBytes)(8).toString('hex');
        const hmac = (0, crypto_1.createHmac)('sha256', this.jwtSecret);
        hmac.update(`${userId}:${systemId}:${random}`);
        return hmac.digest('hex');
    }
    async generateToken(user, system, expiresInDays = 1, refreshExpiresInDays = 7) {
        const fingerprint = this.generateTokenFingerprint(user.id, system.id);
        const expiresIn = `${expiresInDays}d`;
        const refreshExpiresIn = `${refreshExpiresInDays}d`;
        const payload = {
            sub: user.id,
            userId: user.id,
            systemId: system.id,
            type: 'access',
            fp: fingerprint.substring(0, 16),
        };
        const refreshPayload = {
            sub: user.id,
            userId: user.id,
            systemId: system.id,
            type: 'refresh',
            fp: fingerprint.substring(16, 32),
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn,
            secret: this.jwtSecret,
        });
        const refreshToken = this.jwtService.sign(refreshPayload, {
            expiresIn: refreshExpiresIn,
            secret: this.jwtSecret,
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);
        const refreshExpiresAt = new Date();
        refreshExpiresAt.setDate(refreshExpiresAt.getDate() + refreshExpiresInDays);
        return {
            fingerprint,
            accessToken,
            refreshToken,
            tokenExpiresAt: expiresAt,
            refreshTokenExpiresAt: refreshExpiresAt,
        };
    }
    async verifyToken(token, tokenFingerprint) {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.jwtSecret,
            });
            const tokenType = decoded.type;
            let fingerprintPart = '';
            if (tokenType === 'access') {
                fingerprintPart = tokenFingerprint.substring(0, 16);
            }
            else if (tokenType === 'refresh') {
                fingerprintPart = tokenFingerprint.substring(16, 32);
            }
            return decoded.fp === fingerprintPart;
        }
        catch (error) {
            console.error('토큰 검증 오류:', error.message);
            return false;
        }
    }
    async createTokenForUserAndSystem(user, system, expiresInDays = 1, refreshExpiresInDays = 7) {
        const { fingerprint, accessToken, refreshToken, tokenExpiresAt, refreshTokenExpiresAt } = await this.generateToken(user, system, expiresInDays, refreshExpiresInDays);
        const token = this.tokensRepository.create({
            user,
            system,
            userId: user.id,
            systemId: system.id,
            accessToken,
            refreshToken,
            tokenFingerprint: fingerprint,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            isActive: true,
        });
        return this.tokensRepository.save(token);
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
    async findByRefreshToken(refreshToken) {
        return this.tokensRepository.findOne({
            where: { refreshToken },
            relations: ['user', 'system'],
        });
    }
    async createToken(createTokenDto) {
        const { userId, systemId, expiresInDays = 1, refreshExpiresInDays = 7 } = createTokenDto;
        const user = await this.usersService.findOne(userId);
        const system = await this.systemsService.findOne(systemId);
        return this.createTokenForUserAndSystem(user, system, expiresInDays, refreshExpiresInDays);
    }
    async save(token) {
        return this.tokensRepository.save(token);
    }
    async updateStatus(id, isActive) {
        const token = await this.findOne(id);
        token.isActive = isActive;
        return this.tokensRepository.save(token);
    }
    async refreshTokens(id) {
        const token = await this.findOne(id);
        if (!token.refreshToken || new Date() > token.refreshTokenExpiresAt) {
            throw new Error('Refresh token is expired or invalid');
        }
        const now = new Date();
        const refreshTokenRemainingDays = Math.max(1, Math.ceil((token.refreshTokenExpiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
        const { fingerprint, accessToken, refreshToken, tokenExpiresAt, refreshTokenExpiresAt } = await this.generateToken(token.user, token.system, 1, refreshTokenRemainingDays);
        token.tokenFingerprint = fingerprint;
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.tokenExpiresAt = tokenExpiresAt;
        token.refreshTokenExpiresAt = refreshTokenExpiresAt;
        token.lastAccess = now;
        return this.tokensRepository.save(token);
    }
    async renewToken(id, renewTokenDto) {
        const { expiresInDays = 1, refreshExpiresInDays = 7 } = renewTokenDto;
        const token = await this.findOne(id);
        const { fingerprint, accessToken, refreshToken, tokenExpiresAt, refreshTokenExpiresAt } = await this.generateToken(token.user, token.system, expiresInDays, refreshExpiresInDays);
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.tokenFingerprint = fingerprint;
        token.tokenExpiresAt = tokenExpiresAt;
        token.refreshTokenExpiresAt = refreshTokenExpiresAt;
        token.lastAccess = new Date();
        return this.tokensRepository.save(token);
    }
    async remove(id) {
        const token = await this.findOne(id);
        await this.tokensRepository.remove(token);
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
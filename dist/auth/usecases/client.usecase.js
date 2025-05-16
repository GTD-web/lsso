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
exports.ClientUseCase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const systems_service_1 = require("../../systems/services/systems.service");
const users_service_1 = require("../../users/services/users.service");
const tokens_service_1 = require("../../tokens/services/tokens.service");
const bcrypt = require("bcrypt");
const client_usecase_1 = require("../../tokens/usecases/client.usecase");
let ClientUseCase = class ClientUseCase {
    constructor(systemsService, usersService, tokensService, jwtService, configService, clientTokensUsecase) {
        this.systemsService = systemsService;
        this.usersService = usersService;
        this.tokensService = tokensService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.clientTokensUsecase = clientTokensUsecase;
        this.jwtSecret = this.configService.get('JWT_SECRET') || 'jwt-secret-key';
    }
    async authenticateSystem(authHeader) {
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            throw new common_1.UnauthorizedException('유효한 Basic 인증 헤더가 필요합니다.');
        }
        try {
            const base64Credentials = authHeader.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
            const [clientId, clientSecret] = credentials.split(':');
            if (!clientId || !clientSecret) {
                throw new common_1.UnauthorizedException('클라이언트 ID 및 시크릿이 필요합니다.');
            }
            const systems = await this.systemsService.findAll({
                where: { clientId },
            });
            if (systems.length === 0) {
                throw new common_1.UnauthorizedException('유효하지 않은 클라이언트 ID입니다.');
            }
            const system = systems[0];
            if (!system.isActive) {
                throw new common_1.UnauthorizedException({ message: '비활성화된 시스템입니다.', system: system.name });
            }
            if (!(await bcrypt.compare(clientSecret, system.clientSecret))) {
                throw new common_1.UnauthorizedException({
                    message: '유효하지 않은 클라이언트 시크릿입니다.',
                    system: system.name,
                });
            }
            return system;
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('시스템 인증에 실패했습니다.');
        }
    }
    async authenticateUser(email, password) {
        if (!email || !password) {
            throw new common_1.BadRequestException('이메일과 비밀번호가 필요합니다.');
        }
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
        }
        if (user.status === '퇴사') {
            throw new common_1.UnauthorizedException('퇴사한 사용자입니다.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
        const expiresInDays = 1;
        const refreshExpiresInDays = 30;
        const token = await this.generateTokenForUser(user, expiresInDays, refreshExpiresInDays);
        return { user, token };
    }
    async handleTokenRequest(system, requestBody) {
        const { grant_type, email, password, refresh_token } = requestBody;
        if (!grant_type) {
            throw new common_1.BadRequestException('grant_type이 필요합니다.');
        }
        switch (grant_type) {
            case 'password':
                if (!email || !password) {
                    throw new common_1.BadRequestException('username과 password가 필요합니다.');
                }
                const { user, token } = await this.authenticateUser(email, password);
                return this.formatTokenResponse(token, user);
            case 'refresh_token':
                if (!refresh_token) {
                    throw new common_1.BadRequestException('refresh_token이 필요합니다.');
                }
                return await this.handleRefreshToken(refresh_token);
            default:
                throw new common_1.BadRequestException('지원하지 않는 grant_type입니다.');
        }
    }
    async handleRefreshToken(refreshToken) {
        try {
            const token = await this.tokensService.findByRefreshToken(refreshToken);
            if (new Date() > token.refreshTokenExpiresAt) {
                throw new common_1.UnauthorizedException('만료된 리프레시 토큰입니다.');
            }
            if (!token.isActive) {
                throw new common_1.UnauthorizedException('비활성화된 토큰입니다.');
            }
            const user = await this.usersService.findOne(token.userId);
            if (!user) {
                throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
            }
            const accessToken = this.generateJwtToken(user);
            const now = new Date();
            const tokenExpiresAt = new Date(now);
            tokenExpiresAt.setDate(now.getDate() + 1);
            const updatedToken = await this.tokensService.update(token.id, {
                accessToken,
                tokenExpiresAt,
                lastAccess: new Date(),
            });
            return this.formatTokenResponse(updatedToken, user);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('리프레시 토큰 처리 중 오류가 발생했습니다.');
        }
    }
    formatTokenResponse(token, user) {
        return {
            tokenType: 'Bearer',
            accessToken: token.accessToken,
            expiresIn: this.calculateExpiresIn(token.tokenExpiresAt),
            refreshToken: token.refreshToken,
            refreshTokenExpiresIn: this.calculateExpiresIn(token.refreshTokenExpiresAt),
            id: user.id,
            name: user.name,
            email: user.email,
            employeeNumber: user.employeeNumber,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            hireDate: user.hireDate,
            status: user.status,
            department: user.department,
            position: user.position,
            rank: user.rank,
        };
    }
    calculateExpiresIn(expiresAt) {
        const now = new Date();
        const diffMs = expiresAt.getTime() - now.getTime();
        return Math.floor(diffMs / 1000);
    }
    generateJwtToken(user) {
        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            employee_number: user.employeeNumber,
        };
        return this.jwtService.sign(payload, {
            secret: this.jwtSecret,
            expiresIn: '1d',
        });
    }
    async generateTokenForUser(user, expiresInDays, refreshExpiresInDays) {
        const tokenDto = {
            userId: user.id,
            expiresInDays,
            refreshExpiresInDays,
        };
        const createdToken = await this.clientTokensUsecase.createToken(tokenDto);
        return await this.tokensService.findOne(createdToken.id);
    }
};
exports.ClientUseCase = ClientUseCase;
exports.ClientUseCase = ClientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [systems_service_1.SystemsService,
        users_service_1.UsersService,
        tokens_service_1.TokensService,
        jwt_1.JwtService,
        config_1.ConfigService,
        client_usecase_1.ClientTokensUsecase])
], ClientUseCase);
//# sourceMappingURL=client.usecase.js.map
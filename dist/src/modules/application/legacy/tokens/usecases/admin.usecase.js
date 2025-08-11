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
exports.AdminTokensUsecase = void 0;
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("../services/tokens.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../users/services/users.service");
const JWT_CONSTANTS = {
    DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS: 1,
    DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS: 7,
    MIN_ACCESS_TOKEN_EXPIRES_DAYS: 1,
    MAX_ACCESS_TOKEN_EXPIRES_DAYS: 365,
    MIN_REFRESH_TOKEN_EXPIRES_DAYS: 30,
    MAX_REFRESH_TOKEN_EXPIRES_DAYS: 730,
};
let AdminTokensUsecase = class AdminTokensUsecase {
    constructor(tokensService, jwtService, usersService) {
        this.tokensService = tokensService;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async findAll() {
        return this.tokensService.findAll();
    }
    async findAllWithEmployee() {
        return this.tokensService.findAllWithEmployee();
    }
    async findOne(id) {
        return this.tokensService.findOne(id);
    }
    async findOneWithEmployee(id) {
        return this.tokensService.findOneWithEmployee(id);
    }
    async findByEmployeeId(employeeId) {
        return this.tokensService.findByEmployeeId(employeeId);
    }
    async createToken(createTokenDto) {
        const { employeeId, expiresInDays = JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS, refreshExpiresInDays = JWT_CONSTANTS.DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS, } = createTokenDto;
        const employee = await this.usersService.findOne(employeeId);
        const payload = {
            sub: employeeId,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.tokensService.generateJwtToken(payload, `${expiresInDays}d`);
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.tokensService.generateJwtToken(refreshPayload, `${refreshExpiresInDays}d`);
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, expiresInDays);
        const refreshTokenExpiresAt = this.addDays(now, refreshExpiresInDays);
        return this.tokensService.create({
            employeeId,
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            isActive: true,
        });
    }
    async updateStatus(id, isActive) {
        const token = await this.tokensService.findOne(id);
        return this.tokensService.update(id, {
            ...token,
            isActive,
        });
    }
    async renewToken(id, renewTokenDto) {
        const token = await this.tokensService.findOne(id);
        const employee = await this.tokensService.getEmployeeByToken(id);
        const { expiresInDays = JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS, refreshExpiresInDays = JWT_CONSTANTS.DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS, } = renewTokenDto;
        const payload = {
            sub: employee.id,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.tokensService.generateJwtToken(payload, `${expiresInDays}d`);
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.tokensService.generateJwtToken(refreshPayload, `${refreshExpiresInDays}d`);
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, expiresInDays);
        const refreshTokenExpiresAt = this.addDays(now, refreshExpiresInDays);
        return this.tokensService.update(id, {
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            lastAccess: now,
            isActive: true,
        });
    }
    async refreshTokens(id) {
        const token = await this.tokensService.findOne(id);
        const employee = await this.tokensService.getEmployeeByToken(id);
        if (!token.refreshToken || new Date() > token.refreshTokenExpiresAt) {
            throw new Error('리프레시 토큰이 만료되었습니다.');
        }
        if (!token.isActive) {
            throw new Error('비활성화된 토큰은 갱신할 수 없습니다.');
        }
        const payload = {
            sub: employee.id,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.tokensService.generateJwtToken(payload, `${JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS}d`);
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS);
        return this.tokensService.update(id, {
            accessToken,
            tokenExpiresAt,
            lastAccess: now,
        });
    }
    async remove(id) {
        return this.tokensService.remove(id);
    }
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};
exports.AdminTokensUsecase = AdminTokensUsecase;
exports.AdminTokensUsecase = AdminTokensUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tokens_service_1.TokensService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], AdminTokensUsecase);
//# sourceMappingURL=admin.usecase.js.map
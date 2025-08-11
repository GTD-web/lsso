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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../../../../domain/token/token.service");
const employee_token_service_1 = require("../../../../domain/employee-token/employee-token.service");
const users_service_1 = require("../../users/services/users.service");
let TokensService = class TokensService {
    constructor(tokenService, employeeTokenService, usersService) {
        this.tokenService = tokenService;
        this.employeeTokenService = employeeTokenService;
        this.usersService = usersService;
    }
    async findAll(options) {
        return this.tokenService.findAll(options);
    }
    async findAllWithEmployee() {
        const tokens = await this.tokenService.findAll();
        const tokensWithEmployee = [];
        for (const token of tokens) {
            try {
                const employee = await this.getEmployeeByToken(token.id);
                tokensWithEmployee.push({
                    ...token,
                    employee: employee,
                });
            }
            catch (error) {
                tokensWithEmployee.push({
                    ...token,
                    employee: null,
                });
            }
        }
        return tokensWithEmployee;
    }
    async findOne(id) {
        return this.tokenService.findOne({ where: { id } });
    }
    async findOneWithEmployee(id) {
        const token = await this.tokenService.findOne({ where: { id } });
        if (!token) {
            throw new common_1.NotFoundException('토큰을 찾을 수 없습니다.');
        }
        try {
            const employee = await this.getEmployeeByToken(token.id);
            return {
                ...token,
                employee: employee,
            };
        }
        catch (error) {
            return {
                ...token,
                employee: null,
            };
        }
    }
    async findByEmployeeId(employeeId) {
        const employeeTokens = await this.employeeTokenService.findByEmployeeId(employeeId);
        const tokens = [];
        for (const employeeToken of employeeTokens) {
            const token = await this.tokenService.findOne({ where: { id: employeeToken.tokenId } });
            if (token) {
                tokens.push(token);
            }
        }
        return tokens;
    }
    async findByAccessToken(accessToken) {
        return this.tokenService.findByAccessToken(accessToken);
    }
    async findByRefreshToken(refreshToken) {
        return this.tokenService.findByRefreshToken(refreshToken);
    }
    async create(createTokenDto) {
        const { employeeId, ...tokenData } = createTokenDto;
        const employee = await this.usersService.findOne(employeeId);
        const tokenCreateData = {
            accessToken: tokenData.accessToken || '',
            refreshToken: tokenData.refreshToken || '',
            tokenExpiresAt: tokenData.tokenExpiresAt || new Date(),
            refreshTokenExpiresAt: tokenData.refreshTokenExpiresAt,
            clientInfo: tokenData.clientInfo,
            ipAddress: tokenData.ipAddress,
        };
        const token = await this.tokenService.create(tokenCreateData);
        await this.employeeTokenService.createOrUpdateRelation(employeeId, token.id, {});
        return token;
    }
    async update(id, updateData) {
        return this.tokenService.update(id, updateData);
    }
    async remove(id) {
        const employeeTokens = await this.employeeTokenService.findByTokenId(id);
        for (const employeeToken of employeeTokens) {
            await this.employeeTokenService.delete(employeeToken.id);
        }
        await this.tokenService.delete(id);
    }
    async removeAllEmployeeTokens(employeeId) {
        const employeeTokens = await this.employeeTokenService.findByEmployeeId(employeeId);
        for (const employeeToken of employeeTokens) {
            await this.tokenService.delete(employeeToken.tokenId);
            await this.employeeTokenService.delete(employeeToken.id);
        }
    }
    async getEmployeeByToken(tokenId) {
        const employeeTokens = await this.employeeTokenService.findByTokenId(tokenId);
        if (employeeTokens.length === 0) {
            throw new common_1.NotFoundException('토큰에 연결된 직원을 찾을 수 없습니다.');
        }
        const employeeToken = employeeTokens[0];
        return this.usersService.findOne(employeeToken.employeeId);
    }
    generateJwtToken(payload, expiresIn) {
        return this.tokenService.generateJwtToken(payload, expiresIn);
    }
    verifyJwtToken(token) {
        return this.tokenService.verifyJwtToken(token);
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.DomainTokenService,
        employee_token_service_1.DomainEmployeeTokenService,
        users_service_1.UsersService])
], TokensService);
//# sourceMappingURL=tokens.service.js.map
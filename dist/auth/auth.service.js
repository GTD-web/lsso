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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const systems_service_1 = require("../systems/systems.service");
const users_service_1 = require("../users/users.service");
const tokens_service_1 = require("../tokens/tokens.service");
let AuthService = class AuthService {
    constructor(userService, systemService, tokenService) {
        this.userService = userService;
        this.systemService = systemService;
        this.tokenService = tokenService;
    }
    async login(loginDto) {
        const { email, password, client_id } = loginDto;
        const system = await this.systemService.findByClientId(client_id);
        if (!system) {
            throw new common_1.NotFoundException('존재하지 않는 시스템입니다.');
        }
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
        let token = await this.tokenService.findByUserAndSystem(user, system);
        if (token) {
            const { secret, accessToken, tokenExpiresAt } = await this.tokenService.generateToken(user, system);
            token.secret = secret;
            token.accessToken = accessToken;
            token.tokenExpiresAt = tokenExpiresAt;
        }
        else {
            token = await this.tokenService.create(user, system);
        }
        const newToken = await this.tokenService.save(token);
        return {
            accessToken: newToken.accessToken,
            secret: newToken.secret,
            expiresAt: newToken.tokenExpiresAt,
            name: user.name,
            email: user.email,
            password: user.password,
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
    async verifyToken(token) {
        if (!token) {
            throw new common_1.UnauthorizedException('토큰이 없습니다.');
        }
        const tokenEntity = await this.tokenService.findByAccessToken(token);
        if (!tokenEntity) {
            throw new common_1.NotFoundException('존재하지 않는 토큰입니다.');
        }
        if (tokenEntity.tokenExpiresAt < new Date()) {
            throw new common_1.UnauthorizedException('만료된 토큰입니다.');
        }
        const isTokenValid = await this.tokenService.verifyToken(tokenEntity.accessToken, tokenEntity.secret);
        if (!isTokenValid) {
            throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
        }
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        systems_service_1.SystemsService,
        tokens_service_1.TokensService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
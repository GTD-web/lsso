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
exports.AuthorizationContextService = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../../domain/employee/employee.service");
const token_service_1 = require("../../domain/token/token.service");
const system_service_1 = require("../../domain/system/system.service");
const employee_token_service_1 = require("../../domain/employee-token/employee-token.service");
let AuthorizationContextService = class AuthorizationContextService {
    constructor(직원서비스, 토큰서비스, 시스템서비스, 직원토큰서비스) {
        this.직원서비스 = 직원서비스;
        this.토큰서비스 = 토큰서비스;
        this.시스템서비스 = 시스템서비스;
        this.직원토큰서비스 = 직원토큰서비스;
    }
    async 시스템을_인증한다(clientId, clientSecret) {
        const system = await this.시스템서비스.findByClientId(clientId);
        if (!system) {
            throw new common_1.UnauthorizedException('유효하지 않은 클라이언트 ID입니다.');
        }
        if (!system.isActive) {
            throw new common_1.UnauthorizedException({ message: '비활성화된 시스템입니다.', system: system.name });
        }
        const isVerified = await this.시스템서비스.verifyClientSecret(clientSecret, system);
        if (!isVerified) {
            throw new common_1.UnauthorizedException('유효하지 않은 클라이언트 시크릿입니다.');
        }
        return system;
    }
    async 로그인정보를_검증한다(email, password) {
        const employee = await this.직원서비스.findByEmail(email);
        if (!employee) {
            throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
        }
        if (employee.status === '퇴사') {
            throw new common_1.UnauthorizedException('퇴사한 사용자입니다.');
        }
        const isPasswordValid = await this.직원서비스.verifyPassword(password, employee);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
        return employee;
    }
    async 엑세스토큰을_검증한다(accessToken) {
        const token = await this.토큰서비스.findByAccessToken(accessToken);
        if (new Date() > token.tokenExpiresAt) {
            throw new common_1.UnauthorizedException('만료된 토큰입니다.');
        }
        const payload = this.토큰서비스.verifyJwtToken(accessToken);
        const employee = await this.직원서비스.findByEmployeeId(payload.sub);
        return { employee, token };
    }
    async 리프레시토큰을_검증한다(refresh_token) {
        const token = await this.토큰서비스.findByRefreshToken(refresh_token);
        if (new Date() > token.refreshTokenExpiresAt) {
            throw new common_1.UnauthorizedException('만료된 리프레시 토큰입니다.');
        }
        const payload = this.토큰서비스.verifyJwtToken(refresh_token);
        const employee = await this.직원서비스.findByEmployeeId(payload.sub);
        return employee;
    }
    async 토큰정보를_생성한다(employee) {
        const expiresInDays = 1;
        const refreshExpiresInDays = 30;
        const payload = {
            sub: employee.id,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.토큰서비스.generateJwtToken(payload, '1d');
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.토큰서비스.generateJwtToken(refreshPayload, `${refreshExpiresInDays}d`);
        const now = new Date();
        const tokenExpiresAt = new Date(now.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
        const refreshTokenExpiresAt = new Date(now.getTime() + refreshExpiresInDays * 24 * 60 * 60 * 1000);
        const existingTokens = await this.직원토큰서비스.findByEmployeeId(employee.id);
        if (existingTokens && existingTokens.length > 0) {
            const existingToken = existingTokens[0];
            return await this.토큰서비스.update(existingToken.tokenId, {
                accessToken,
                refreshToken,
                tokenExpiresAt,
                refreshTokenExpiresAt,
            });
        }
        const token = await this.토큰서비스.save({
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
        });
        await this.직원토큰서비스.save({
            employeeId: employee.id,
            tokenId: token.id,
        });
        return token;
    }
    async 비밀번호를_변경한다(employee, newPassword) {
        const hashedPassword = this.직원서비스.hashPassword(newPassword);
        await this.직원서비스.updatePassword(employee.id, hashedPassword);
    }
    async 비밀번호를_검증한다(employee, password) {
        return await this.직원서비스.verifyPassword(password, employee);
    }
};
exports.AuthorizationContextService = AuthorizationContextService;
exports.AuthorizationContextService = AuthorizationContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_service_1.DomainEmployeeService,
        token_service_1.DomainTokenService,
        system_service_1.DomainSystemService,
        employee_token_service_1.DomainEmployeeTokenService])
], AuthorizationContextService);
//# sourceMappingURL=authorization-context.service.js.map
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
exports.SsoApplicationService = void 0;
const common_1 = require("@nestjs/common");
const authorization_context_service_1 = require("../../context/authorization/authorization-context.service");
const system_management_context_service_1 = require("../../context/system-management/system-management-context.service");
const organization_management_context_service_1 = require("../../context/organization-management/organization-management-context.service");
let SsoApplicationService = class SsoApplicationService {
    constructor(authorizationContextService, systemManagementContextService, organizationContextService) {
        this.authorizationContextService = authorizationContextService;
        this.systemManagementContextService = systemManagementContextService;
        this.organizationContextService = organizationContextService;
    }
    async login(authHeader, body) {
        const result = this.BASIC_헤더_파싱하기(authHeader);
        if (!result) {
            throw new common_1.UnauthorizedException('유효하지 않은 인증정보입니다.');
        }
        const { clientId, clientSecret } = result;
        const system = await this.authorizationContextService.시스템을_인증한다(clientId, clientSecret);
        const { grant_type, email, password, refresh_token } = body;
        let employee;
        switch (grant_type) {
            case 'password':
                employee = await this.authorizationContextService.로그인정보를_검증한다(email, password);
                break;
            case 'refresh_token':
                employee = await this.authorizationContextService.리프레시토큰을_검증한다(refresh_token);
                break;
            default:
                throw new common_1.BadRequestException('지원하지 않는 grant_type입니다.');
        }
        const { department, position, rank } = await this.organizationContextService.직원의_부서_직책_직급을_조회한다(employee);
        const token = await this.authorizationContextService.토큰정보를_생성한다(employee);
        return {
            tokenType: 'Bearer',
            accessToken: token.accessToken,
            expiresAt: token.tokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            id: employee.id,
            name: employee.name,
            email: employee.email,
            employeeNumber: employee.employeeNumber,
            phoneNumber: employee.phoneNumber,
            dateOfBirth: employee.dateOfBirth,
            gender: employee.gender,
            hireDate: employee.hireDate,
            status: employee.status,
            department: department?.departmentName || '',
            position: position?.positionTitle || '',
            rank: rank?.rankName || '',
            system: system.name,
        };
    }
    async verifyToken(authHeader) {
        const result = this.BEARER_헤더_파싱하기(authHeader);
        if (!result) {
            throw new common_1.UnauthorizedException('유효하지 않은 인증정보입니다.');
        }
        const { accessToken } = result;
        const { employee, token } = await this.authorizationContextService.엑세스토큰을_검증한다(accessToken);
        return {
            valid: true,
            user_info: {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                employee_number: employee.employeeNumber,
            },
            expires_in: this.만료시간을_초_단위로_계산하기(token.tokenExpiresAt),
        };
    }
    async changePassword(authHeader, body) {
        const result = this.BEARER_헤더_파싱하기(authHeader);
        if (!result) {
            throw new common_1.UnauthorizedException('유효하지 않은 인증정보입니다.');
        }
        const { accessToken } = result;
        const { employee } = await this.authorizationContextService.엑세스토큰을_검증한다(accessToken);
        const { newPassword } = body;
        await this.authorizationContextService.비밀번호를_변경한다(employee, newPassword);
        return {
            message: '비밀번호가 성공적으로 변경되었습니다.',
        };
    }
    async checkPassword(authHeader, body) {
        const result = this.BEARER_헤더_파싱하기(authHeader);
        if (!result) {
            throw new common_1.UnauthorizedException('유효하지 않은 인증정보입니다.');
        }
        const { accessToken } = result;
        const { employee } = await this.authorizationContextService.엑세스토큰을_검증한다(accessToken);
        const { currentPassword } = body;
        const isPasswordValid = await this.authorizationContextService.비밀번호를_검증한다(employee, currentPassword);
        return {
            isValid: isPasswordValid,
        };
    }
    BASIC_헤더_파싱하기(authHeader) {
        try {
            if (!authHeader || !authHeader.startsWith('Basic ')) {
                return null;
            }
            const base64Credentials = authHeader.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
            const [clientId, clientSecret] = credentials.split(':');
            if (!clientId || !clientSecret) {
                return null;
            }
            return { clientId, clientSecret };
        }
        catch (error) {
            console.error('Basic Auth 헤더 파싱 중 오류:', error);
            return null;
        }
    }
    BEARER_헤더_파싱하기(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        const accessToken = authHeader.split(' ')[1];
        return { accessToken };
    }
    만료시간을_초_단위로_계산하기(expiresAt) {
        const now = new Date();
        const diffMs = expiresAt.getTime() - now.getTime();
        return Math.floor(diffMs / 1000);
    }
};
exports.SsoApplicationService = SsoApplicationService;
exports.SsoApplicationService = SsoApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authorization_context_service_1.AuthorizationContextService,
        system_management_context_service_1.SystemManagementContextService,
        organization_management_context_service_1.OrganizationContextService])
], SsoApplicationService);
//# sourceMappingURL=sso-application.service.js.map
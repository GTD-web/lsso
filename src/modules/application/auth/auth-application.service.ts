import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SsoContextService } from '../../context/sso/sso-context.service';
import { SystemManagementContextService } from '../../context/system-management/system-management-context.service';
import { OrganizationContextService } from '../../context/organization/organization-context.service';
import {
    LoginRequestDto,
    LoginResponseDto,
    TokenVerifyResponseDto,
    ChangePasswordRequestDto,
    ChangePasswordResponseDto,
    CheckPasswordRequestDto,
    CheckPasswordResponseDto,
    GrantType,
} from './dto';
import {
    SsoLoginRequestDto,
    SsoTokenVerifyRequestDto,
    SystemAuthRequestDto,
    SsoPasswordChangeRequestDto,
    SsoPasswordCheckRequestDto,
} from '../../context/dto';

@Injectable()
export class AuthApplicationService {
    constructor(
        private readonly ssoContextService: SsoContextService,
        private readonly systemManagementContextService: SystemManagementContextService,
        private readonly organizationContextService: OrganizationContextService,
    ) {}

    /**
     * Basic Auth 헤더에서 시스템 인증을 처리합니다
     */
    async authenticateSystem(authHeader: string) {
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            throw new UnauthorizedException('Basic Authentication이 필요합니다.');
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [clientId, clientSecret] = credentials.split(':');

        if (!clientId || !clientSecret) {
            throw new UnauthorizedException('유효하지 않은 클라이언트 자격 증명입니다.');
        }

        // System Management Context를 통해 시스템 인증
        const 시스템 = await this.systemManagementContextService.클라이언트아이디로시스템조회하기(clientId);

        if (!시스템 || 시스템.clientSecret !== clientSecret || !시스템.isActive) {
            throw new UnauthorizedException('유효하지 않은 시스템 정보입니다.');
        }

        return {
            id: 시스템.id,
            clientId: 시스템.clientId,
            name: 시스템.name,
            description: 시스템.description,
            domain: 시스템.domain,
            allowedOrigin: 시스템.allowedOrigin,
            isActive: 시스템.isActive,
            healthCheckUrl: 시스템.healthCheckUrl,
        };
    }

    /**
     * 토큰 요청을 처리합니다 (로그인 또는 리프레시)
     */
    async handleTokenRequest(
        system: any,
        requestBody: LoginRequestDto,
        ipAddress: string = '',
        userAgent: string = '',
    ): Promise<LoginResponseDto> {
        if (requestBody.grant_type === GrantType.PASSWORD) {
            return this.handlePasswordLogin(system, requestBody, ipAddress, userAgent);
        } else if (requestBody.grant_type === GrantType.REFRESH_TOKEN) {
            return this.handleRefreshToken(system, requestBody, ipAddress, userAgent);
        } else {
            throw new BadRequestException('지원하지 않는 grant_type입니다.');
        }
    }

    /**
     * 비밀번호 방식 로그인을 처리합니다
     */
    private async handlePasswordLogin(
        system: any,
        requestBody: LoginRequestDto,
        ipAddress: string,
        userAgent: string,
    ): Promise<LoginResponseDto> {
        if (!requestBody.email || !requestBody.password) {
            throw new BadRequestException('이메일과 비밀번호가 필요합니다.');
        }

        const ssoLoginRequest: SsoLoginRequestDto = {
            email: requestBody.email,
            password: requestBody.password,
            clientId: system.clientId,
            ipAddress,
            userAgent,
        };

        const 로그인결과 = await this.ssoContextService.로그인처리하기(ssoLoginRequest);

        // 조직 정보 조회
        let 조직정보 = null;
        try {
            조직정보 = await this.organizationContextService.직원조직정보조회하기(로그인결과.사용자정보.id);
        } catch {
            // 조직 정보가 없어도 로그인은 성공
        }

        // 토큰 만료 시간 계산 (초 단위)
        const 현재시간 = new Date();
        const expiresIn = Math.floor((로그인결과.인증정보.expiresAt.getTime() - 현재시간.getTime()) / 1000);
        const refreshTokenExpiresIn = 30 * 24 * 60 * 60; // 30일

        return {
            tokenType: 로그인결과.인증정보.tokenType,
            accessToken: 로그인결과.인증정보.accessToken,
            expiresIn,
            refreshToken: 로그인결과.인증정보.refreshToken,
            refreshTokenExpiresIn,
            id: 로그인결과.사용자정보.id,
            name: 로그인결과.사용자정보.name,
            email: 로그인결과.사용자정보.email,
            employeeNumber: 로그인결과.사용자정보.employeeNumber,
            phoneNumber: 로그인결과.사용자정보.phoneNumber,
            dateOfBirth: 로그인결과.사용자정보.dateOfBirth?.toISOString().split('T')[0],
            gender: 로그인결과.사용자정보.gender,
            hireDate: 로그인결과.사용자정보.hireDate.toISOString().split('T')[0],
            status: 로그인결과.사용자정보.status,
            department: 조직정보?.현재조직?.부서?.departmentName,
            position: 조직정보?.현재조직?.직책?.positionName,
            rank: 조직정보?.현재조직?.직급?.rankName,
            system: 로그인결과.시스템정보.name,
        };
    }

    /**
     * 리프레시 토큰 방식을 처리합니다
     */
    private async handleRefreshToken(
        system: any,
        requestBody: LoginRequestDto,
        ipAddress: string,
        userAgent: string,
    ): Promise<LoginResponseDto> {
        if (!requestBody.refresh_token) {
            throw new BadRequestException('리프레시 토큰이 필요합니다.');
        }

        // 1. 기존 리프레시 토큰으로 사용자 조회 및 새 JWT 토큰 생성
        const 기존토큰 = await this.systemManagementContextService.리프레시토큰으로토큰조회하기(
            requestBody.refresh_token,
        );
        const 토큰관계 = await this.systemManagementContextService.토큰아이디로직원토큰관계조회하기(기존토큰.id);
        const 직원 = await this.ssoContextService.직원아이디로직원조회하기(토큰관계[0].employeeId);

        // 2. 새 JWT 토큰 생성 (실제 JWT 생성 로직 필요)
        const 새액세스토큰 = this.generateAccessToken(); // 임시

        // 3. System Management Context를 통해 토큰 갱신
        const 갱신결과 = await this.systemManagementContextService.토큰갱신하기(requestBody.refresh_token, {
            accessToken: 새액세스토큰,
            tokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24시간
        });

        // 4. 조직 정보 조회
        let 조직정보 = null;
        try {
            조직정보 = await this.organizationContextService.직원조직정보조회하기(직원.id);
        } catch {
            // 조직 정보가 없어도 갱신은 성공
        }

        const expiresIn = Math.floor((갱신결과.갱신된토큰.tokenExpiresAt.getTime() - new Date().getTime()) / 1000);

        return {
            tokenType: 'Bearer',
            accessToken: 갱신결과.갱신된토큰.accessToken,
            expiresIn,
            refreshToken: 갱신결과.갱신된토큰.refreshToken,
            refreshTokenExpiresIn: 30 * 24 * 60 * 60,
            id: 직원.id,
            name: 직원.name,
            email: 직원.email,
            employeeNumber: 직원.employeeNumber,
            phoneNumber: 직원.phoneNumber,
            dateOfBirth: 직원.dateOfBirth?.toISOString().split('T')[0],
            gender: 직원.gender,
            hireDate: 직원.hireDate.toISOString().split('T')[0],
            status: 직원.status,
            department: 조직정보?.현재조직?.부서?.departmentName,
            position: 조직정보?.현재조직?.직책?.positionName,
            rank: 조직정보?.현재조직?.직급?.rankName,
            system: system.name,
        };
    }

    /**
     * 토큰을 검증합니다
     */
    async verifyToken(accessToken: string): Promise<TokenVerifyResponseDto> {
        const 검증결과 = await this.ssoContextService.토큰검증하기(accessToken);

        const 현재시간 = new Date();
        const expiresIn = Math.floor((검증결과.토큰정보.tokenExpiresAt.getTime() - 현재시간.getTime()) / 1000);

        return {
            valid: true,
            user_info: {
                id: 검증결과.직원정보.id,
                name: 검증결과.직원정보.name,
                email: 검증결과.직원정보.email,
                employee_number: 검증결과.직원정보.employeeNumber,
            },
            expires_in: expiresIn,
        };
    }

    /**
     * 비밀번호를 변경합니다
     */
    async changePassword(accessToken: string, newPassword: string): Promise<ChangePasswordResponseDto> {
        // 토큰으로 사용자 확인
        const 검증결과 = await this.ssoContextService.토큰검증하기(accessToken);

        const passwordChangeRequest: SsoPasswordChangeRequestDto = {
            직원아이디: 검증결과.직원정보.id,
            새비밀번호: newPassword,
        };

        // SSO Context를 통해 비밀번호 변경
        await this.ssoContextService.비밀번호변경하기(passwordChangeRequest);

        return {
            message: '비밀번호가 성공적으로 변경되었습니다.',
        };
    }

    /**
     * 비밀번호를 확인합니다
     */
    async checkPassword(
        accessToken: string,
        currentPassword: string,
        email?: string,
    ): Promise<CheckPasswordResponseDto> {
        // 토큰으로 사용자 확인
        const 검증결과 = await this.ssoContextService.토큰검증하기(accessToken);

        const passwordCheckRequest: SsoPasswordCheckRequestDto = {
            직원아이디: 검증결과.직원정보.id,
            현재비밀번호: currentPassword,
        };

        // SSO Context를 통해 비밀번호 확인
        const isValid = await this.ssoContextService.비밀번호확인하기(passwordCheckRequest);

        return {
            isValid,
        };
    }

    /**
     * 액세스 토큰을 생성합니다 (임시)
     */
    private generateAccessToken(): string {
        return `access_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    }

    /**
     * 실제 JWT 액세스 토큰을 생성합니다 (향후 JWT 유틸리티 통합 예정)
     */
    private generateJwtAccessToken(사용자정보: {
        id: string;
        name: string;
        email: string;
        employeeNumber: string;
    }): string {
        // 향후 SSO Context의 JwtUtil을 사용하도록 변경 예정
        // 현재는 임시 토큰 생성
        return `jwt_access_${Date.now()}_${사용자정보.id}_${Math.random().toString(36).substring(2, 15)}`;
    }
}

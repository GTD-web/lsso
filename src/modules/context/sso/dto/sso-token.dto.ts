export class SsoTokenVerifyRequestDto {
    accessToken: string;
}

export class SsoTokenVerifyResponseDto {
    직원정보: {
        id: string;
        name: string;
        email: string;
        employeeNumber: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        gender?: string;
        hireDate: Date;
        status: string;
    };
    토큰정보: {
        id: string;
        accessToken: string;
        tokenExpiresAt: Date;
        clientInfo?: string;
        ipAddress?: string;
    };
    조직정보?: {
        부서아이디?: string;
        직책아이디?: string;
    };
}

export class SsoTokenRefreshRequestDto {
    refreshToken: string;
    systemId: string;
    ipAddress: string;
    userAgent: string;
}

export class SsoPasswordChangeRequestDto {
    직원아이디: string;
    새비밀번호: string;
}

export class SsoPasswordCheckRequestDto {
    직원아이디: string;
    현재비밀번호: string;
}

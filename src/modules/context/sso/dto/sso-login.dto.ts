export class SsoLoginRequestDto {
    email: string;
    password: string;
    clientId: string;
    ipAddress: string;
    userAgent: string;
}

export class SsoLoginResponseDto {
    인증정보: {
        accessToken: string;
        refreshToken: string;
        expiresAt: Date;
        tokenType: string;
    };
    사용자정보: {
        id: string;
        name: string;
        email: string;
        employeeNumber: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        gender?: string;
        hireDate: Date;
        status: string;
        조직정보?: any;
    };
    시스템정보: {
        id: string;
        name: string;
        clientId: string;
        domain: string;
    };
}

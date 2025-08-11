export declare class LoginResponseDto {
    tokenType: string;
    accessToken: string;
    expiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
    id: string;
    name: string;
    email: string;
    employeeNumber: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    gender?: string;
    hireDate: Date;
    status: string;
    department?: string;
    position?: string;
    rank?: string;
    system: string;
}

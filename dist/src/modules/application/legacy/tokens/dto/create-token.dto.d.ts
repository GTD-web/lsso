export declare class CreateTokenDto {
    employeeId: string;
    employeeNumber?: string;
    expiresInDays?: number;
    refreshExpiresInDays?: number;
    accessToken?: string;
    refreshToken?: string;
    tokenExpiresAt?: Date;
    refreshTokenExpiresAt?: Date;
    clientInfo?: string;
    ipAddress?: string;
}

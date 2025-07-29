export declare class Token {
    id: string;
    accessToken: string;
    tokenExpiresAt: Date;
    refreshToken?: string;
    refreshTokenExpiresAt?: Date;
    clientInfo?: string;
    ipAddress?: string;
    createdAt: Date;
}

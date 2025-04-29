export declare class TokenResponseDto {
    id: string;
    userId: string;
    systemId: string;
    accessToken: string;
    refreshToken: string;
    secret: string;
    tokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
    lastAccess?: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    userName?: string;
    userEmail?: string;
    systemName?: string;
}

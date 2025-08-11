export declare class TokenResponseDto {
    id: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
    tokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
    lastAccess?: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    userName?: string;
    userEmail?: string;
}

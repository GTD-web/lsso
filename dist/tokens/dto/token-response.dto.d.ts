export declare class TokenResponseDto {
    id: string;
    userId: string;
    systemId: string;
    accessToken: string;
    secret: string;
    tokenExpiresAt: Date;
    lastAccess?: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    userName?: string;
    userEmail?: string;
    systemName?: string;
}

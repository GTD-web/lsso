export declare class TokenRefreshDataDto {
    accessToken: string;
    expiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
}
export declare class TokenErrorDto {
    code: string;
    message: string;
}
export declare class RefreshTokenResponseDto {
    success: boolean;
    data?: TokenRefreshDataDto;
    error?: TokenErrorDto;
}

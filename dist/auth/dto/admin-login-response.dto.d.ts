export declare class AdminUserDto {
    id: string;
    email: string;
    name: string;
    role: string;
}
export declare class AdminAuthDataDto {
    user: AdminUserDto;
    token: string;
    refreshToken: string;
}
export declare class AdminErrorDto {
    code: string;
    message: string;
}
export declare class AdminLoginResponseDto {
    success: boolean;
    data?: AdminAuthDataDto;
    error?: AdminErrorDto;
}

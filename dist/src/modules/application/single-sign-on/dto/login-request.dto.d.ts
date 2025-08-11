export declare enum GrantType {
    PASSWORD = "password",
    REFRESH_TOKEN = "refresh_token"
}
export declare class LoginRequestDto {
    grant_type: GrantType;
    email?: string;
    password?: string;
    refresh_token?: string;
}

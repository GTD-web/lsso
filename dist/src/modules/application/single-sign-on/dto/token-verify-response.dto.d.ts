export declare class UserInfoDto {
    id: string;
    name: string;
    email: string;
    employee_number: string;
}
export declare class TokenVerifyResponseDto {
    valid: boolean;
    user_info: UserInfoDto;
    expires_in: number;
}

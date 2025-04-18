export declare class UserAuthDataDto {
    accessToken: string;
    secret: string;
    expiresAt: Date;
    name: string;
    email: string;
    password: string;
    employeeNumber: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender: string;
    hireDate: Date;
    status: string;
    department: string;
    position: string;
    rank: string;
}
export declare class UserErrorDto {
    code: string;
    message: string;
}
export declare class LoginResponseDto {
    success: boolean;
    data?: UserAuthDataDto;
    error?: UserErrorDto;
}

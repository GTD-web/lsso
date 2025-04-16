export declare class ErrorResponseDto {
    code: string;
    message: string;
    constructor(code: string, message: string);
}
export declare class ApiResponseDto<T> {
    success: boolean;
    data?: T;
    error?: ErrorResponseDto;
    private constructor();
    static success<T>(data: T): ApiResponseDto<T>;
    static error<T>(code: string, message: string): ApiResponseDto<T>;
}

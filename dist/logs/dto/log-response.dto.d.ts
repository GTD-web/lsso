export declare class LogResponseDto {
    id: string;
    timestamp: Date;
    method: string;
    url: string;
    query?: Record<string, any>;
    headers?: Record<string, string>;
    body?: any;
    statusCode: number;
    responseTime: number;
    response?: any;
    error?: string;
    ip: string;
    host: string;
    userAgent?: string;
    system?: string;
}

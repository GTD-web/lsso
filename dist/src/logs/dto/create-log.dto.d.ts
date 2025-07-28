export declare class CreateLogDto {
    method: string;
    url: string;
    params: any;
    query: any;
    body: any;
    ip: string;
    userAgent: string;
    requestTimestamp: Date;
    responseTimestamp?: Date;
    responseTime?: number;
    statusCode?: number;
    response?: any;
    error?: any;
    isError?: boolean;
}

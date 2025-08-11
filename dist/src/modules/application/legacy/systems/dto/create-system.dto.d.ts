export declare class CreateSystemDto {
    name: string;
    description: string;
    domain: string;
    allowedOrigin: string[];
    healthCheckUrl: string;
    clientId?: string;
    clientSecret?: string;
    isActive?: boolean;
}

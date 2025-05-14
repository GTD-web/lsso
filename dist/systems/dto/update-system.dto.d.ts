export declare class UpdateSystemDto {
    name: string;
    description: string;
    domain: string;
    allowedOrigin: string[];
    healthCheckUrl: string;
    clientId?: string;
    clientSecret?: string;
    isActive?: boolean;
}

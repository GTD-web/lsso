export declare class ResponseSystemDto {
    id: string;
    name: string;
    description: string;
    publicKey: string;
    secretKey: string;
    allowedOrigin: string[];
    healthCheckUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

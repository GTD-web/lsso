export declare class Webhook {
    id: string;
    webhookName: string;
    description?: string;
    targetUrl: string;
    eventType: string;
    entityType: string;
    secretKey?: string;
    headers?: Record<string, any>;
    isActive: boolean;
    retryCount: number;
    timeoutSeconds: number;
    createdAt: Date;
    updatedAt: Date;
}

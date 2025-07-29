export declare class SystemWebhook {
    id: string;
    systemId: string;
    webhookId: string;
    lastExecutedAt?: Date;
    executionCount: number;
    successCount: number;
    failureCount: number;
    createdAt: Date;
    system: any;
    webhook: any;
}

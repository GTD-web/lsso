export declare class WebhookEventLog {
    id: string;
    webhookId: string;
    eventType: string;
    entityId: string;
    payload: Record<string, any>;
    responseCode?: number;
    responseBody?: string;
    attemptCount: number;
    isSuccess: boolean;
    lastAttemptAt: Date;
    createdAt: Date;
    webhook: any;
}

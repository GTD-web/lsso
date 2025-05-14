import { WebhookUsecase } from '../usecases/webhook.usecase';
export declare class WebhookUsersController {
    private readonly webhookUsecase;
    constructor(webhookUsecase: WebhookUsecase);
    syncEmployees(): Promise<void>;
    webhookCreate(body: any): Promise<void>;
    webhookUpdate(body: any): Promise<void>;
    webhookPositionChanged(body: any): Promise<void>;
    webhookDepartmentChanged(body: any): Promise<void>;
    webhookDelete(body: any): Promise<void>;
}

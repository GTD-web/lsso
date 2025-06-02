import { Response } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    setInitialPassword(res: Response, token: string): Promise<void>;
    changePassword(res: Response): Promise<void>;
}

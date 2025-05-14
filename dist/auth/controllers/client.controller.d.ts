import { AuthService } from '../services/auth.service';
import { ClientUseCase } from '../usecases/client.usecase';
export declare class ClientAuthController {
    private readonly authService;
    private readonly clientUseCase;
    constructor(authService: AuthService, clientUseCase: ClientUseCase);
    tokenRoute(authHeader: string, body: any): Promise<any>;
    verifyToken(authHeader: string): Promise<{
        valid: boolean;
        message: string;
    }>;
}

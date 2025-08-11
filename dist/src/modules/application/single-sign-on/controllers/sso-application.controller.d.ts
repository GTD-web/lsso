import { SsoApplicationService } from '../sso-application.service';
import { LoginRequestDto, LoginResponseDto, TokenVerifyResponseDto, ChangePasswordRequestDto, ChangePasswordResponseDto, CheckPasswordRequestDto, CheckPasswordResponseDto } from '../dto';
export declare class SsoApplicationController {
    private readonly ssoApplicationService;
    constructor(ssoApplicationService: SsoApplicationService);
    login(authHeader: string, body: LoginRequestDto): Promise<LoginResponseDto>;
    verifyToken(authHeader: string): Promise<TokenVerifyResponseDto>;
    changePassword(authHeader: string, body: ChangePasswordRequestDto): Promise<ChangePasswordResponseDto>;
    checkPassword(authHeader: string, body: CheckPasswordRequestDto): Promise<CheckPasswordResponseDto>;
}

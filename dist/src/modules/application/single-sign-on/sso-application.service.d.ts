import { AuthorizationContextService } from '../../context/authorization/authorization-context.service';
import { SystemManagementContextService } from '../../context/system-management/system-management-context.service';
import { OrganizationContextService } from '../../context/organization-management/organization-management-context.service';
import { LoginRequestDto, LoginResponseDto, TokenVerifyResponseDto, ChangePasswordRequestDto, ChangePasswordResponseDto, CheckPasswordRequestDto, CheckPasswordResponseDto } from './dto';
export declare class SsoApplicationService {
    private readonly authorizationContextService;
    private readonly systemManagementContextService;
    private readonly organizationContextService;
    constructor(authorizationContextService: AuthorizationContextService, systemManagementContextService: SystemManagementContextService, organizationContextService: OrganizationContextService);
    login(authHeader: string, body: LoginRequestDto): Promise<LoginResponseDto>;
    verifyToken(authHeader: string): Promise<TokenVerifyResponseDto>;
    changePassword(authHeader: string, body: ChangePasswordRequestDto): Promise<ChangePasswordResponseDto>;
    checkPassword(authHeader: string, body: CheckPasswordRequestDto): Promise<CheckPasswordResponseDto>;
    BASIC_헤더_파싱하기(authHeader: string): {
        clientId: string;
        clientSecret: string;
    } | null;
    BEARER_헤더_파싱하기(authHeader: string): {
        accessToken: string;
    } | null;
    만료시간을_초_단위로_계산하기(expiresAt: Date): number;
}

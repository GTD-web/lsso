import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto, RefreshTokenDto, RefreshTokenResponseDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    verify(token: string): Promise<boolean>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto>;
}

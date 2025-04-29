import { LoginDto, LoginResponseDto, RefreshTokenDto, RefreshTokenResponseDto } from './dto';
import { SystemsService } from 'src/systems/systems.service';
import { UsersService } from 'src/users/users.service';
import { TokensService } from 'src/tokens/tokens.service';
export declare class AuthService {
    private readonly userService;
    private readonly systemService;
    private readonly tokenService;
    constructor(userService: UsersService, systemService: SystemsService, tokenService: TokensService);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    verifyToken(token: string): Promise<boolean>;
    refreshAccessToken(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto>;
}

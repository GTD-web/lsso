import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SystemsService } from '../../systems/services/systems.service';
import { UsersService } from '../../users/services/users.service';
import { TokensService } from '../../tokens/services/tokens.service';
import { System } from '../../systems/entities/system.entity';
import { User } from '../../users/entities/user.entity';
import { Token } from '../../tokens/entities/token.entity';
import { ClientTokensUsecase } from 'src/tokens/usecases/client.usecase';
export declare class ClientUseCase {
    private systemsService;
    private usersService;
    private tokensService;
    private jwtService;
    private configService;
    private clientTokensUsecase;
    private readonly jwtSecret;
    constructor(systemsService: SystemsService, usersService: UsersService, tokensService: TokensService, jwtService: JwtService, configService: ConfigService, clientTokensUsecase: ClientTokensUsecase);
    authenticateSystem(authHeader: string): Promise<System>;
    authenticateUser(email: string, password: string): Promise<{
        user: User;
        token: Token;
    }>;
    handleTokenRequest(system: System, requestBody: any): Promise<any>;
    handleRefreshToken(refreshToken: string): Promise<any>;
    private formatTokenResponse;
    private calculateExpiresIn;
    private generateJwtToken;
    generateTokenForUser(user: User, expiresInDays?: number, refreshExpiresInDays?: number): Promise<Token>;
    changePassword(token: string, currentPassword: string, newPassword: string): Promise<void>;
}

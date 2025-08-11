import { DomainTokenRepository } from './token.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Token } from '../../../../libs/database/entities';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class DomainTokenService extends BaseService<Token> {
    private readonly tokenRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(tokenRepository: DomainTokenRepository, jwtService: JwtService, configService: ConfigService);
    findByAccessToken(accessToken: string): Promise<Token>;
    findByRefreshToken(refreshToken: string): Promise<Token>;
    findAllTokens(): Promise<Token[]>;
    findExpiredTokens(): Promise<Token[]>;
    generateJwtToken(payload: any, expiresIn: string): string;
    verifyJwtToken(token: string): any;
}

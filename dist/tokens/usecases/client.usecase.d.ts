import { TokensService } from '../services/tokens.service';
import { Token } from '../entities/token.entity';
import { CreateTokenDto, RenewTokenDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class ClientTokensUsecase {
    private readonly tokensService;
    private jwtService;
    private configService;
    constructor(tokensService: TokensService, jwtService: JwtService, configService: ConfigService);
    findAll(): Promise<Token[]>;
    findOne(id: string): Promise<Token>;
    findByUserId(userId: string): Promise<Token[]>;
    createToken(createTokenDto: CreateTokenDto): Promise<Token>;
    updateStatus(id: string, isActive: boolean): Promise<Token>;
    renewToken(id: string, renewTokenDto: RenewTokenDto): Promise<Token>;
    refreshTokens(id: string): Promise<Token>;
    remove(id: string): Promise<void>;
    private addDays;
}

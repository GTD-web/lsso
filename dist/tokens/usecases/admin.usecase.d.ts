import { TokensService } from '../services/tokens.service';
import { Token } from '../entities/token.entity';
import { CreateTokenDto, RenewTokenDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
export declare class AdminTokensUsecase {
    private readonly tokensService;
    private jwtService;
    constructor(tokensService: TokensService, jwtService: JwtService);
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

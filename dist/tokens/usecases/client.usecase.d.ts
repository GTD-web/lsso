import { TokensService } from '../services/tokens.service';
import { Token } from '../entities/token.entity';
import { CreateTokenDto, RenewTokenDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services/users.service';
export declare class ClientTokensUsecase {
    private readonly tokensService;
    private jwtService;
    private configService;
    private usersService;
    constructor(tokensService: TokensService, jwtService: JwtService, configService: ConfigService, usersService: UsersService);
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

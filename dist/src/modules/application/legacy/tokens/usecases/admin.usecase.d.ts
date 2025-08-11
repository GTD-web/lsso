import { TokensService } from '../services/tokens.service';
import { Token } from '../../../../../../libs/database/entities/token.entity';
import { CreateTokenDto, RenewTokenDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
export declare class AdminTokensUsecase {
    private readonly tokensService;
    private jwtService;
    private usersService;
    constructor(tokensService: TokensService, jwtService: JwtService, usersService: UsersService);
    findAll(): Promise<Token[]>;
    findAllWithEmployee(): Promise<any[]>;
    findOne(id: string): Promise<Token>;
    findOneWithEmployee(id: string): Promise<any>;
    findByEmployeeId(employeeId: string): Promise<Token[]>;
    createToken(createTokenDto: CreateTokenDto): Promise<Token>;
    updateStatus(id: string, isActive: boolean): Promise<Token>;
    renewToken(id: string, renewTokenDto: RenewTokenDto): Promise<Token>;
    refreshTokens(id: string): Promise<Token>;
    remove(id: string): Promise<void>;
    private addDays;
}

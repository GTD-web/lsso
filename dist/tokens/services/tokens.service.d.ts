import { Repository, FindManyOptions } from 'typeorm';
import { Token } from '../entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from '../dto/create-token.dto';
import { UsersService } from 'src/users/services/users.service';
import { SystemsService } from 'src/systems/services/systems.service';
import { ConfigService } from '@nestjs/config';
export declare class TokensService {
    private tokensRepository;
    private jwtService;
    private usersService;
    private systemsService;
    private configService;
    private readonly jwtSecret;
    constructor(tokensRepository: Repository<Token>, jwtService: JwtService, usersService: UsersService, systemsService: SystemsService, configService: ConfigService);
    findAll(options?: FindManyOptions<Token>): Promise<Token[]>;
    findOne(id: string): Promise<Token>;
    findByUserId(userId: string): Promise<Token[]>;
    findByAccessToken(accessToken: string): Promise<Token>;
    findByRefreshToken(refreshToken: string): Promise<Token>;
    create(createTokenDto: CreateTokenDto): Promise<Token>;
    update(id: string, updateData: Partial<Token>): Promise<Token>;
    remove(id: string): Promise<void>;
    removeAllUserTokens(userId: string): Promise<void>;
}

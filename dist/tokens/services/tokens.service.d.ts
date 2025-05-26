import { Repository, FindManyOptions } from 'typeorm';
import { Token } from '../entities/token.entity';
import { CreateTokenDto } from '../dto/create-token.dto';
import { UsersService } from 'src/users/services/users.service';
import { ConfigService } from '@nestjs/config';
export declare class TokensService {
    private tokensRepository;
    private usersService;
    private configService;
    readonly jwtSecret: string;
    constructor(tokensRepository: Repository<Token>, usersService: UsersService, configService: ConfigService);
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

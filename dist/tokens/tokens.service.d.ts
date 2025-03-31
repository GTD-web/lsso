import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { System } from 'src/systems/entities/system.entity';
export declare class TokensService {
    private tokensRepository;
    private jwtService;
    constructor(tokensRepository: Repository<Token>, jwtService: JwtService);
    generateToken(user: User, system: System): Promise<{
        secret: string;
        accessToken: string;
        tokenExpiresAt: Date;
    }>;
    verifyToken(token: string, secret: string): Promise<boolean>;
    create(user: User, system: System): Promise<Token>;
    save(token: Token): Promise<Token>;
    findByUserAndSystem(user: User, system: System): Promise<Token>;
    findByAccessToken(accessToken: string): Promise<Token>;
}

import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { System } from 'src/systems/entities/system.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { UsersService } from 'src/users/users.service';
import { SystemsService } from 'src/systems/systems.service';
import { RenewTokenDto } from './dto/renew-token.dto';
export declare class TokensService {
    private tokensRepository;
    private jwtService;
    private usersService;
    private systemsService;
    constructor(tokensRepository: Repository<Token>, jwtService: JwtService, usersService: UsersService, systemsService: SystemsService);
    generateToken(user: User, system: System, expiresInDays?: number): Promise<{
        secret: string;
        accessToken: string;
        tokenExpiresAt: Date;
    }>;
    verifyToken(token: string, secret: string): Promise<boolean>;
    findAll(): Promise<Token[]>;
    findOne(id: string): Promise<Token>;
    findBySystemId(systemId: string): Promise<Token[]>;
    findByUserId(userId: string): Promise<Token[]>;
    createToken(createTokenDto: CreateTokenDto): Promise<Token>;
    updateStatus(id: string, isActive: boolean): Promise<Token>;
    renewToken(id: string, renewTokenDto: RenewTokenDto): Promise<Token>;
    remove(id: string): Promise<void>;
    create(user: User, system: System): Promise<Token>;
    save(token: Token): Promise<Token>;
    findByUserAndSystem(user: User, system: System): Promise<Token>;
    findByAccessToken(accessToken: string): Promise<Token>;
}

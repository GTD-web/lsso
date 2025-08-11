import { Token } from '../../../../../../libs/database/entities/token.entity';
import { DomainTokenService } from '../../../../domain/token/token.service';
import { DomainEmployeeTokenService } from '../../../../domain/employee-token/employee-token.service';
import { UsersService } from '../../users/services/users.service';
import { IRepositoryOptions } from '../../../../../../libs/common/interfaces/repository.interface';
import { CreateTokenDto } from '../dto/create-token.dto';
export declare class TokensService {
    private readonly tokenService;
    private readonly employeeTokenService;
    private readonly usersService;
    constructor(tokenService: DomainTokenService, employeeTokenService: DomainEmployeeTokenService, usersService: UsersService);
    findAll(options?: IRepositoryOptions<Token>): Promise<Token[]>;
    findAllWithEmployee(): Promise<any[]>;
    findOne(id: string): Promise<Token>;
    findOneWithEmployee(id: string): Promise<any>;
    findByEmployeeId(employeeId: string): Promise<Token[]>;
    findByAccessToken(accessToken: string): Promise<Token>;
    findByRefreshToken(refreshToken: string): Promise<Token>;
    create(createTokenDto: CreateTokenDto): Promise<Token>;
    update(id: string, updateData: Partial<Token>): Promise<Token>;
    remove(id: string): Promise<void>;
    removeAllEmployeeTokens(employeeId: string): Promise<void>;
    getEmployeeByToken(tokenId: string): Promise<any>;
    generateJwtToken(payload: any, expiresIn: string): string;
    verifyJwtToken(token: string): any;
}

import { TokensService } from '../services/tokens.service';
import { Token } from '../entities/token.entity';
import { CreateTokenDto } from '../dto/create-token.dto';
export declare class DomainTokensController {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    findAll(options?: any): Promise<Token[]>;
    findOne(id: string): Promise<Token>;
    findByUserId(userId: string): Promise<Token[]>;
    create(createTokenDto: CreateTokenDto): Promise<Token>;
    update(id: string, updateData: Partial<Token>): Promise<Token>;
    remove(id: string): Promise<void>;
}

import { TokensService } from './tokens.service';
import { TokenResponseDto, CreateTokenDto, UpdateTokenStatusDto, RenewTokenDto } from './dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
export declare class AdminTokensController {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    findAll(): Promise<ApiResponseDto<TokenResponseDto[]>>;
    findBySystemId(systemId: string): Promise<ApiResponseDto<TokenResponseDto[]>>;
    findByUserId(userId: string): Promise<ApiResponseDto<TokenResponseDto[]>>;
    findOne(id: string): Promise<ApiResponseDto<TokenResponseDto>>;
    create(createTokenDto: CreateTokenDto): Promise<ApiResponseDto<TokenResponseDto>>;
    updateStatus(id: string, updateTokenStatusDto: UpdateTokenStatusDto): Promise<ApiResponseDto<TokenResponseDto>>;
    renewToken(id: string, renewTokenDto: RenewTokenDto): Promise<ApiResponseDto<TokenResponseDto>>;
    refreshToken(id: string): Promise<ApiResponseDto<TokenResponseDto>>;
    remove(id: string): Promise<ApiResponseDto<boolean>>;
    private mapTokenToDto;
}

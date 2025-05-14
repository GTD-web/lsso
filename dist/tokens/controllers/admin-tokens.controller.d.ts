import { TokenResponseDto, CreateTokenDto, UpdateTokenStatusDto, RenewTokenDto } from '../dto';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import { AdminTokensUsecase } from '../usecases/admin.usecase';
export declare class AdminTokensController {
    private readonly adminTokensUsecase;
    constructor(adminTokensUsecase: AdminTokensUsecase);
    findAll(): Promise<ApiResponseDto<TokenResponseDto[]>>;
    findByUserId(userId: string): Promise<ApiResponseDto<TokenResponseDto[]>>;
    findOne(id: string): Promise<ApiResponseDto<TokenResponseDto>>;
    create(createTokenDto: CreateTokenDto): Promise<ApiResponseDto<TokenResponseDto>>;
    updateStatus(id: string, updateTokenStatusDto: UpdateTokenStatusDto): Promise<ApiResponseDto<TokenResponseDto>>;
    renewToken(id: string, renewTokenDto: RenewTokenDto): Promise<ApiResponseDto<TokenResponseDto>>;
    refreshToken(id: string): Promise<ApiResponseDto<TokenResponseDto>>;
    remove(id: string): Promise<ApiResponseDto<boolean>>;
    private mapTokenToDto;
}

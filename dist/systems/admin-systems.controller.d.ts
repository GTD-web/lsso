import { SystemsService } from './systems.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { ResponseSystemDto } from './dto/response-system.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
export declare class AdminSystemsController {
    private readonly systemsService;
    constructor(systemsService: SystemsService);
    findAll(search?: string): Promise<ApiResponseDto<ResponseSystemDto[]>>;
    search(query: string): Promise<ApiResponseDto<ResponseSystemDto[]>>;
    findOne(id: string): Promise<ApiResponseDto<ResponseSystemDto>>;
    create(createSystemDto: CreateSystemDto): Promise<ApiResponseDto<ResponseSystemDto>>;
    update(id: string, updateSystemDto: UpdateSystemDto): Promise<ApiResponseDto<ResponseSystemDto>>;
    partialUpdate(id: string, updateSystemDto: UpdateSystemDto): Promise<ApiResponseDto<ResponseSystemDto>>;
    remove(id: string): Promise<ApiResponseDto<boolean>>;
    regenerateApiKeys(id: string): Promise<ApiResponseDto<ResponseSystemDto>>;
}

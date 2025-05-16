import { LogsAdminUseCase } from '../usecases/admin.usecase';
import { LogFilterDto } from '../dto/log-filter.dto';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import { LogResponseDto } from '../dto/log-response.dto';
import { LogsResponseDto } from '../dto/logs-response.dto';
export declare class AdminLogsController {
    private readonly logsAdminUseCase;
    constructor(logsAdminUseCase: LogsAdminUseCase);
    findAll(page?: number, limit?: number): Promise<ApiResponseDto<LogsResponseDto>>;
    findOne(id: string): Promise<ApiResponseDto<LogResponseDto>>;
    filter(filterDto: LogFilterDto): Promise<ApiResponseDto<LogsResponseDto>>;
}

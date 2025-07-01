import { EmployeeResponseDto } from '../dto/employee-response.dto';
import { UsersService } from '../services/users.service';
import { AdminUsecase } from './admin.usecase';
export declare class WebhookUsecase {
    private readonly usersService;
    private readonly adminUsecase;
    constructor(usersService: UsersService, adminUsecase: AdminUsecase);
    onModuleInit(): Promise<void>;
    getEmployees(): Promise<EmployeeResponseDto[]>;
    syncEmployees(): Promise<void>;
}

import { EmployeeResponseDto } from '../dto/employee-response.dto';
import { UsersService } from '../services/users.service';
export declare class WebhookUsecase {
    private readonly usersService;
    constructor(usersService: UsersService);
    onModuleInit(): Promise<void>;
    getEmployees(): Promise<EmployeeResponseDto[]>;
    syncEmployees(): Promise<void>;
}

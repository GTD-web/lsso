import { AuthService } from '../services/auth.service';
import { CreateAdminDto, UpdateAdminDto, ChangePasswordDto } from '../dto/admin';
import { Admin } from '../entities/admin.entity';
export declare class DomainAuthController {
    private readonly authService;
    constructor(authService: AuthService);
    findAll(): Promise<Admin[]>;
    findOne(id: string): Promise<Admin>;
    create(createAdminDto: CreateAdminDto): Promise<Admin>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<{
        success: boolean;
    }>;
    remove(id: string): Promise<void>;
}

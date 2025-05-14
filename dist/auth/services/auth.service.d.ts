import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
export declare class AuthService {
    private adminRepository;
    constructor(adminRepository: Repository<Admin>);
    findAll(): Promise<Admin[]>;
    findOne(id: string): Promise<Admin>;
    findByEmail(email: string): Promise<Admin | null>;
    create(adminData: Partial<Admin>): Promise<Admin>;
    update(id: string, adminData: Partial<Admin>): Promise<Admin>;
    remove(id: string): Promise<void>;
    changePassword(id: string, currentPassword: string, newPassword: string): Promise<boolean>;
}

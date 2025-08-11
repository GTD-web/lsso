import { DomainUserRepository } from './user.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { User } from 'libs/database/entities/user.entity';
export declare class DomainUserService extends BaseService<User> {
    private readonly userRepository;
    constructor(userRepository: DomainUserRepository);
    findByEmployeeNumber(employeeNumber: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    checkEmployeeNumberExists(employeeNumber: string): Promise<boolean>;
    checkEmailExists(email: string): Promise<boolean>;
    createUser(userData: Partial<User>): Promise<User>;
    changePassword(userId: string, newPassword: string): Promise<User>;
    validatePassword(email: string, password: string): Promise<User | null>;
    isInitialPasswordSet(userId: string): Promise<boolean>;
    updateUserStatus(userId: string, status: string): Promise<User>;
    updateUserInfo(userId: string, updateData: Partial<User>): Promise<User>;
    findActiveUsers(): Promise<User[]>;
    findUsersByDepartment(department: string): Promise<User[]>;
}

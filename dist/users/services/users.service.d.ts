import { Repository, FindManyOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { EmployeeResponseDto } from '../dto/employee-response.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(options?: FindManyOptions<User>): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmployeeNumber(employeeNumber: string): Promise<User>;
    findByEmail(email: string, relations?: string[]): Promise<User>;
    hashPassword(password?: string): string;
    create(employee: EmployeeResponseDto): User;
    save(user: User): Promise<User>;
    bulkSave(users: User[]): Promise<User[]>;
    update(id: string, userData: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
}

import { User } from '../entities/user.entity';
export declare class UserResponseDto {
    id: string;
    employeeNumber: string;
    name: string;
    email: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    hireDate?: string;
    status?: string;
    department?: string;
    position?: string;
    rank?: string;
    createdAt: string;
    updatedAt: string;
    constructor(user: User);
}

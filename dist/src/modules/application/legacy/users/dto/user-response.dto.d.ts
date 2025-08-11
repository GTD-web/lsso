import { Employee } from '../../../../../../libs/database/entities/employee.entity';
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
    rank?: string;
    department?: string;
    position?: string;
    createdAt: string;
    updatedAt: string;
    isInitialPasswordSet?: boolean;
    constructor(employee: Employee);
}

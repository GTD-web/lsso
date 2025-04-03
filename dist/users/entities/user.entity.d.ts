import { Token } from 'src/tokens/entities/token.entity';
export declare class User {
    id: string;
    employeeNumber: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender: string;
    hireDate: Date;
    status: string;
    department: string;
    position: string;
    rank: string;
    tokens: Token[];
    createdAt: Date;
    updatedAt: Date;
}

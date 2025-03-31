import { Token } from 'src/tokens/entities/token.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    employeeNumber: string;
    tokens: Token[];
    createdAt: Date;
    updatedAt: Date;
}

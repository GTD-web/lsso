export declare class Admin {
    id: string;
    email: string;
    name: string;
    role: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}

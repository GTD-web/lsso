import { User } from 'src/users/entities/user.entity';
export declare class Token {
    id: string;
    userId: string;
    user: User;
    accessToken: string;
    refreshToken: string;
    tokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
    lastAccess: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

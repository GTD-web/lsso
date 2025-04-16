import { Admin } from './admin.entity';
export declare class RefreshToken {
    id: string;
    token: string;
    adminId: string;
    admin: Admin;
    expiresAt: Date;
    createdAt: Date;
    isRevoked: boolean;
    userAgent: string;
    ip: string;
    isExpired(): boolean;
}

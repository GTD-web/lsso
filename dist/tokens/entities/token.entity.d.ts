import { User } from 'src/users/entities/user.entity';
import { System } from 'src/systems/entities/system.entity';
export declare class Token {
    id: string;
    userId: string;
    systemId: string;
    user: User;
    system: System;
    accessToken: string;
    secret: string;
    tokenExpiresAt: Date;
    lastAccess: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

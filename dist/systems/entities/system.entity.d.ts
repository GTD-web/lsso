import { Token } from 'src/tokens/entities/token.entity';
export declare class System {
    id: string;
    name: string;
    description: string;
    clientId: string;
    clientSecret: string;
    allowedOrigin: string[];
    healthCheckUrl: string;
    isActive: boolean;
    tokens: Token[];
    createdAt: Date;
    updatedAt: Date;
}

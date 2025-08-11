import { DomainSystemRepository } from './system.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { System } from '../../../../libs/database/entities';
export declare class DomainSystemService extends BaseService<System> {
    private readonly systemRepository;
    constructor(systemRepository: DomainSystemRepository);
    findByClientId(clientId: string): Promise<System>;
    findByName(name: string): Promise<System>;
    findActiveSystems(): Promise<System[]>;
    findByDomain(domain: string): Promise<System>;
    verifyClientSecret(clientSecret: string, system: System): Promise<boolean>;
    generateCredentials(): {
        clientId: string;
        clientSecret: string;
        hash: string;
    };
    generateSecret(): {
        clientSecret: string;
        hash: string;
    };
}

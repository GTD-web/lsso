import { System } from '../../../../../../libs/database/entities/system.entity';
import { DomainSystemService } from '../../../../domain/system/system.service';
import { IRepositoryOptions } from '../../../../../../libs/common/interfaces/repository.interface';
import { CreateSystemDto } from '../dto/create-system.dto';
export declare class SystemsService {
    private readonly systemService;
    constructor(systemService: DomainSystemService);
    findAll(options?: IRepositoryOptions<System>): Promise<System[]>;
    findOne(id: string): Promise<System>;
    findByClientId(clientId: string): Promise<System>;
    findByName(name: string): Promise<System>;
    findByDomain(domain: string): Promise<System>;
    findActiveSystems(): Promise<System[]>;
    create(createSystemDto: CreateSystemDto): Promise<System>;
    update(id: string, systemData: Partial<System>): Promise<System>;
    remove(id: string): Promise<void>;
    verifyClientSecret(clientSecret: string, system: System): Promise<boolean>;
    generateCredentials(): {
        clientId: string;
        clientSecret: string;
        hash: string;
    };
}

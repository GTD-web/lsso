import { Repository } from 'typeorm';
import { System } from './entities/system.entity';
import { CreateSystemDto } from './dto/create-system.dto';
export declare class SystemsService {
    private systemsRepository;
    constructor(systemsRepository: Repository<System>);
    private generateClientId;
    private generateClientSecret;
    findAll(): Promise<System[]>;
    findOne(id: string): Promise<System>;
    findByClientId(clientId: string): Promise<System>;
    create(systemData: CreateSystemDto): Promise<System>;
    update(id: string, systemData: Partial<System>): Promise<System>;
    remove(id: string): Promise<void>;
    searchSystems(query: string): Promise<System[]>;
}

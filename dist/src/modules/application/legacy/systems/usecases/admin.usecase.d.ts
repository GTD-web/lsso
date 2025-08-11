import { System } from '../../../../../../libs/database/entities/system.entity';
import { SystemsService } from '../services/systems.service';
import { CreateSystemDto } from '../dto/create-system.dto';
import { ResponseSystemDto } from '../dto/response-system.dto';
export declare class AdminUsecase {
    private readonly systemsService;
    constructor(systemsService: SystemsService);
    findAll(): Promise<System[]>;
    findOne(id: string): Promise<System>;
    create(createSystemDto: CreateSystemDto): Promise<System>;
    update(id: string, updateData: Partial<System>): Promise<System>;
    remove(id: string): Promise<void>;
    searchSystems(query: string): Promise<System[]>;
    registerSystem(createSystemDto: CreateSystemDto): Promise<ResponseSystemDto>;
    regenerateApiKeys(id: string): Promise<ResponseSystemDto>;
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

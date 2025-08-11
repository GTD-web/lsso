import { Repository, FindManyOptions } from 'typeorm';
import { System } from '../entities/system.entity';
import { CreateSystemDto } from '../dto/create-system.dto';
export declare class SystemsService {
    private systemsRepository;
    constructor(systemsRepository: Repository<System>);
    findAll(options?: FindManyOptions<System>): Promise<System[]>;
    findOne(id: string): Promise<System>;
    create(createSystemDto: CreateSystemDto): Promise<System>;
    update(id: string, systemData: Partial<System>): Promise<System>;
    remove(id: string): Promise<void>;
}

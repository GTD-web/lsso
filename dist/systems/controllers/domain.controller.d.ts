import { SystemsService } from '../services/systems.service';
import { System } from '../entities/system.entity';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';
export declare class DomainSystemsController {
    private readonly systemsService;
    constructor(systemsService: SystemsService);
    create(createDto: CreateSystemDto): Promise<System>;
    findAll(options?: any): Promise<System[]>;
    findOne(id: string): Promise<System>;
    update(id: string, updateDto: UpdateSystemDto): Promise<System>;
    remove(id: string): Promise<void>;
}

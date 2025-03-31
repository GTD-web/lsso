import { SystemsService } from './systems.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { ResponseSystemDto } from './dto/response-system.dto';
export declare class SystemsController {
    private readonly systemsService;
    constructor(systemsService: SystemsService);
    findAll(): Promise<ResponseSystemDto[]>;
    findOne(id: string): Promise<ResponseSystemDto>;
    create(createSystemDto: CreateSystemDto): Promise<ResponseSystemDto>;
    update(id: string, updateSystemDto: UpdateSystemDto): Promise<ResponseSystemDto>;
    remove(id: string): Promise<void>;
}

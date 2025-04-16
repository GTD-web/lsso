import { Controller } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('시스템')
@Controller('systems')
export class SystemsController {
    constructor(private readonly systemsService: SystemsService) {}
}

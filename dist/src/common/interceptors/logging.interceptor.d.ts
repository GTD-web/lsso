import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogsService } from '../../modules/application/legacy/logs/services/logs.service';
import { SystemsService } from '../../modules/application/legacy/systems/services/systems.service';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logsService;
    private readonly systemService;
    constructor(logsService: LogsService, systemService: SystemsService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}

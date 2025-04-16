import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogsService } from '../../logs/logs.service';
import { SystemsService } from '../../systems/systems.service';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logsService;
    private readonly systemService;
    constructor(logsService: LogsService, systemService: SystemsService);
    queue: any[];
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}

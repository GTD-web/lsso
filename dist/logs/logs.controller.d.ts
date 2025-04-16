import { LogsService } from './logs.service';
import { SearchLogsDto } from './dto/search-logs.dto';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    search(searchDto: SearchLogsDto): Promise<{
        data: {
            id: string;
            timestamp: Date;
            method: string;
            url: string;
            query: any;
            body: any;
            statusCode: number;
            responseTime: number;
            response: any;
            error: any;
            ip: string;
            host: string;
            userAgent: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        error?: undefined;
    } | {
        error: {
            code: string;
            message: string;
        };
        data?: undefined;
        meta?: undefined;
    }>;
    findOne(id: string): Promise<{
        data: {
            id: string;
            timestamp: Date;
            method: string;
            url: string;
            query: any;
            body: any;
            statusCode: number;
            responseTime: number;
            response: any;
            error: any;
            ip: string;
            host: string;
            userAgent: string;
        };
        error?: undefined;
    } | {
        error: {
            code: string;
            message: string;
        };
        data?: undefined;
    }>;
}

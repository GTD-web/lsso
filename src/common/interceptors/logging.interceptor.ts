import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { LogsService } from '../../logs/services/logs.service';
import { Request, Response } from 'express';
import { SystemsService } from '../../systems/services/systems.service';
import { DateUtil } from '../utils/date.util';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logsService: LogsService, private readonly systemService: SystemsService) {
        setInterval(() => {
            if (this.queue.length > 0) {
                console.log('queue', this.queue);
                this.logsService.createMany(this.queue);
                this.queue = [];
            }
        }, 3000);
    }

    queue: any[] = [];

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const startTime = Date.now();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        if (request.url.startsWith('/api/admin') || request.url.startsWith('/api/domain')) {
            console.log('admin or domain', request.url, request.query);
            return next.handle();
        }

        let ip: string = Array.isArray(request.headers['x-forwarded-for'])
            ? request.headers['x-forwarded-for'][0]
            : (request.headers['x-forwarded-for'] as string) || request.socket.remoteAddress || '';

        if (ip.includes(',')) {
            ip = ip.split(',')[0];
        }
        if (ip === '::ffff:127.0.0.1' || ip === '::1') {
            ip = '127.0.0.1';
        }

        // 요청 정보 수집
        const logData = {
            // 요청 정보
            origin: request.headers.origin,
            host: request.headers.host,
            method: request.method,
            url: request.url,
            params: request.params,
            query: request.query,
            body: request.body,
            ip: ip,
            userAgent: request.get('user-agent'),
            requestTimestamp: DateUtil.now().toDate(),
            // 응답 정보는 나중에 채워질 예정
            responseTimestamp: null,
            responseTime: null,
            statusCode: null,
            response: null,
            system: null,
            error: null,
            isError: false,
        };

        return next.handle().pipe(
            tap(async (response) => {
                // 성공 응답 정보 추가
                logData.responseTimestamp = DateUtil.now().toDate();
                logData.responseTime = logData.responseTimestamp - startTime;
                logData.statusCode = context.switchToHttp().getResponse<Response>().statusCode;
                logData.response = request.method !== 'GET' ? response : null;
                logData.system = response.system;
            }),
            catchError(async (error) => {
                // 에러 정보 추가
                logData.responseTimestamp = DateUtil.now().toDate();
                logData.responseTime = logData.responseTimestamp - startTime;
                logData.statusCode = error.status || 500;
                logData.system = error.response.system;
                logData.error = {
                    message: error.message,
                    // stack: error.stack,
                };
                logData.isError = true;
                throw error;
            }),
            finalize(() => {
                if (this.queue.length < 1000) {
                    this.queue.push(logData);
                } else {
                    console.warn('queue is full');
                }
            }),
        );
    }
}

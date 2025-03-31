import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { async, Observable, OperatorFunction } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LogsService } from '../../logs/logs.service';
import { Request, Response } from 'express';
import { SystemsService } from '../../systems/systems.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logsService: LogsService, private readonly systemService: SystemsService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const startTime = Date.now();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        let ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
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
            requestTimestamp: new Date(),
            // 응답 정보는 나중에 채워질 예정
            responseTimestamp: null,
            responseTime: null,
            statusCode: null,
            response: null,
            error: null,
            isError: false,
        };

        return next.handle().pipe(
            tap(async (response) => {
                // 성공 응답 정보 추가
                logData.responseTimestamp = new Date();
                logData.responseTime = Date.now() - startTime;
                logData.statusCode = context.switchToHttp().getResponse<Response>().statusCode;
                logData.response = response;

                await this.logsService.createLog(logData);
            }),
            catchError(async (error) => {
                // 에러 정보 추가
                logData.responseTimestamp = new Date();
                logData.responseTime = Date.now() - startTime;
                logData.statusCode = error.status || 500;
                logData.error = {
                    message: error.message,
                    stack: error.stack,
                };
                logData.isError = true;

                await this.logsService.createLog(logData);
                throw error;
            }),
        );
    }
}

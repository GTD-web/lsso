import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { setupSwagger } from '../libs/common/utils/swagger';
import { ENV } from '../libs/configs/env.config';
import * as dtos from '../src/dtos.index';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { LoggingInterceptor } from '../libs/common/interceptors/logging.interceptor';
import { LogApplicationService } from '../src/modules/application/admin/log/log-application.service';
import * as hbs from 'hbs';
import { RequestInterceptor } from '../libs/common/interceptors/request.interceptor';
import { ErrorInterceptor } from '../libs/common/interceptors/error.interceptor';

let cachedApp: NestExpressApplication;

async function createApp(): Promise<NestExpressApplication> {
    if (!cachedApp) {
        console.log('Creating new NestJS app for Vercel...');

        const app = await NestFactory.create<NestExpressApplication>(AppModule);

        // Global pipes
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
            }),
        );

        // API 프리픽스 설정 (AppController 제외)
        app.setGlobalPrefix('api', {
            exclude: ['/set-initial-password', '/change-password'],
        });

        // Swagger setup
        setupSwagger(app, [...Object.values(dtos)]);

        // CORS setup
        app.enableCors();

        app.useGlobalInterceptors(new RequestInterceptor(), new ErrorInterceptor());
        app.useGlobalInterceptors(new LoggingInterceptor(app.get(LogApplicationService)));

        // Handlebars 설정 (Vercel에서는 static assets 경로 조정 필요)
        try {
            app.useStaticAssets(join(__dirname, '..', 'public'));
            app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
            app.setViewEngine('hbs');

            // Handlebars 파셜 설정
            hbs.registerPartials(join(__dirname, '..', 'views/partials'));
        } catch (error) {
            console.warn('Handlebars setup failed in Vercel environment:', error.message);
        }

        await app.init();
        cachedApp = app;

        console.log('NestJS app created and initialized for Vercel');
    }

    return cachedApp;
}

// Vercel용 handler export
export default async function handler(req: any, res: any) {
    try {
        const app = await createApp();
        const server = app.getHttpAdapter().getInstance();

        // Express 서버를 Vercel handler로 래핑
        return server(req, res);
    } catch (error) {
        console.error('Vercel handler error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
}

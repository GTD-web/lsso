import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './common/utils/swagger';
import * as dtos from './dtos.index';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LogsService } from './logs/services/logs.service';
import { SystemsService } from './systems/services/systems.service';
import * as hbs from 'hbs';

async function bootstrap() {
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

    app.useGlobalInterceptors(new LoggingInterceptor(app.get(LogsService), app.get(SystemsService)));

    // Handlebars 설정
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
    app.setViewEngine('hbs');

    // Handlebars 파셜 설정
    hbs.registerPartials(join(__dirname, '..', 'views/partials'));

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

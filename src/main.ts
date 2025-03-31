import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './common/utils/swagger';
import * as dtos from './dtos.index';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LogsService } from './logs/logs.service';
import { SystemsService } from './systems/systems.service';

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

    app.setGlobalPrefix('api');
    // Swagger setup
    setupSwagger(app, [...Object.values(dtos)]);

    // CORS setup
    app.enableCors();

    app.useGlobalInterceptors(new LoggingInterceptor(app.get(LogsService), app.get(SystemsService)));

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

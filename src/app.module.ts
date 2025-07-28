import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from 'libs/configs/typeorm.config';
import { ConfigService } from '@nestjs/config';
import { DomainEmployeeModule } from './modules/domain/employee/employee.module';
import databaseConfig, { JWT_CONFIG } from 'libs/configs/env.config';
import { Entities } from 'libs/database/entities';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, JWT_CONFIG],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: typeOrmConfig,
        }),
        TypeOrmModule.forFeature(Entities),

        DomainEmployeeModule,
    ],
    controllers: [AppController],
    providers: [
        // ApiDocService,
        // DbDocService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        AppService,
    ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ApiDocService } from './common/utils/api-doc.service';
import { DbDocService } from './common/utils/db-doc.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { SystemsModule } from './systems/systems.module';
import { LogsModule } from './logs/logs.module';
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: process.env.NODE_ENV !== 'production',
            schema: 'public',
            ssl: { rejectUnauthorized: false },
            // logging: true,
        }),
        UsersModule,
        SystemsModule,
        TokensModule,
        AuthModule,
        LogsModule,
        DashboardModule,
        MailModule,
    ],
    controllers: [AppController],
    providers: [
        // ApiDocService,
        // DbDocService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        // {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard,
        // },
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: TransformInterceptor,
        // },
        AppService,
    ],
})
export class AppModule {}

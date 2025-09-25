import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../libs/common/filters/http-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from '../libs/configs/typeorm.config';
import { ConfigService } from '@nestjs/config';
import databaseConfig, { JWT_CONFIG } from '../libs/configs/env.config';
import { Entities } from '../libs/database/entities';
import { SsoApplicationModule } from './modules/application/single-sign-on/sso-application.module';
import { MigrationModule } from './modules/context/migration/migration.module';
import { LogsModule } from './modules/application/legacy/logs/logs.module';
import { SystemsModule } from './modules/application/legacy/systems/systems.module';
import { OrganizationInformationApplicationModule } from './modules/application/organization-information/organization-information-application.module';
import { FcmTokenManagementApplicationModule } from './modules/application/fcm-token-management/fcm-token-management-application.module';
import { AdminModule } from './modules/application/admin/admin.module';

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

        SsoApplicationModule,
        OrganizationInformationApplicationModule,
        FcmTokenManagementApplicationModule,
        MigrationModule,
        AdminModule,

        // Legacy Modules
        // AuthModule,
        // UsersModule,
        // LogsModule,
        // SystemsModule,
        // TokensModule,
        // MailModule,
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

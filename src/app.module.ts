import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from '../libs/configs/typeorm.config';
import { ConfigService } from '@nestjs/config';
import databaseConfig, { JWT_CONFIG } from '../libs/configs/env.config';
import { Entities } from '../libs/database/entities';
import { SsoApplicationModule } from './modules/application/single-sign-on/sso-application.module';
import { MigrationModule } from './modules/context/migration/migration.module';
import { AuthModule } from './modules/application/legacy/auth/auth.module';
import { UsersModule } from './modules/application/legacy/users/users.module';
import { LogsModule } from './modules/application/legacy/logs/logs.module';
import { SystemsModule } from './modules/application/legacy/systems/systems.module';
import { TokensModule } from './modules/application/legacy/tokens/tokens.module';
import { MailModule } from './modules/application/legacy/mail/mail.module';
import { OrganizationInformationApplicationModule } from './modules/application/organization-information/organization-information-application.module';

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
        // MigrationModule,
        AuthModule,
        UsersModule,
        LogsModule,
        SystemsModule,
        TokensModule,
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
        AppService,
    ],
})
export class AppModule {}

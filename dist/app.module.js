"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const users_module_1 = require("./users/users.module");
const systems_module_1 = require("./systems/systems.module");
const logs_module_1 = require("./logs/logs.module");
const tokens_module_1 = require("./tokens/tokens.module");
const auth_module_1 = require("./auth/auth.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mail_module_1 = require("./mail/mail.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
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
            }),
            users_module_1.UsersModule,
            systems_module_1.SystemsModule,
            tokens_module_1.TokensModule,
            auth_module_1.AuthModule,
            logs_module_1.LogsModule,
            dashboard_module_1.DashboardModule,
            mail_module_1.MailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
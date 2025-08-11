"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensModule = void 0;
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("./services/tokens.service");
const users_module_1 = require("../users/users.module");
const systems_module_1 = require("../systems/systems.module");
const admin_tokens_controller_1 = require("./controllers/admin-tokens.controller");
const admin_usecase_1 = require("./usecases/admin.usecase");
const client_usecase_1 = require("./usecases/client.usecase");
const token_module_1 = require("../../../domain/token/token.module");
const employee_token_module_1 = require("../../../domain/employee-token/employee-token.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let TokensModule = class TokensModule {
};
exports.TokensModule = TokensModule;
exports.TokensModule = TokensModule = __decorate([
    (0, common_1.Module)({
        imports: [
            token_module_1.DomainTokenModule,
            employee_token_module_1.DomainEmployeeTokenModule,
            users_module_1.UsersModule,
            systems_module_1.SystemsModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('GLOBAL_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
        ],
        providers: [tokens_service_1.TokensService, admin_usecase_1.AdminTokensUsecase, client_usecase_1.ClientTokensUsecase],
        controllers: [admin_tokens_controller_1.AdminTokensController],
        exports: [tokens_service_1.TokensService, admin_usecase_1.AdminTokensUsecase, client_usecase_1.ClientTokensUsecase],
    })
], TokensModule);
//# sourceMappingURL=tokens.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const admin_auth_service_1 = require("./admin-auth.service");
const admin_auth_controller_1 = require("./admin-auth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const users_module_1 = require("../users/users.module");
const systems_module_1 = require("../systems/systems.module");
const tokens_module_1 = require("../tokens/tokens.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            systems_module_1.SystemsModule,
            users_module_1.UsersModule,
            tokens_module_1.TokensModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET || 'admin-secret-key',
                signOptions: { expiresIn: '1h' },
            }),
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin, refresh_token_entity_1.RefreshToken]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'admin-secret-key',
                    signOptions: { expiresIn: '1h' },
                }),
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [auth_controller_1.AuthController, admin_auth_controller_1.AdminAuthController],
        providers: [auth_service_1.AuthService, admin_auth_service_1.AdminAuthService],
        exports: [auth_service_1.AuthService, admin_auth_service_1.AdminAuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
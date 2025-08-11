"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationContextModule = void 0;
const common_1 = require("@nestjs/common");
const authorization_context_service_1 = require("./authorization-context.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const employee_module_1 = require("../../domain/employee/employee.module");
const token_module_1 = require("../../domain/token/token.module");
const system_module_1 = require("../../domain/system/system.module");
const employee_token_module_1 = require("../../domain/employee-token/employee-token.module");
let AuthorizationContextModule = class AuthorizationContextModule {
};
exports.AuthorizationContextModule = AuthorizationContextModule;
exports.AuthorizationContextModule = AuthorizationContextModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            config_1.ConfigModule,
            employee_module_1.DomainEmployeeModule,
            token_module_1.DomainTokenModule,
            system_module_1.DomainSystemModule,
            employee_token_module_1.DomainEmployeeTokenModule,
        ],
        providers: [authorization_context_service_1.AuthorizationContextService],
        exports: [authorization_context_service_1.AuthorizationContextService],
    })
], AuthorizationContextModule);
//# sourceMappingURL=authorization-context.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainTokenModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const token_service_1 = require("./token.service");
const token_repository_1 = require("./token.repository");
const entities_1 = require("../../../../libs/database/entities");
const jwt_1 = require("@nestjs/jwt");
let DomainTokenModule = class DomainTokenModule {
};
exports.DomainTokenModule = DomainTokenModule;
exports.DomainTokenModule = DomainTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Token]), jwt_1.JwtModule.register({})],
        providers: [token_service_1.DomainTokenService, token_repository_1.DomainTokenRepository],
        exports: [token_service_1.DomainTokenService, token_repository_1.DomainTokenRepository],
    })
], DomainTokenModule);
//# sourceMappingURL=token.module.js.map
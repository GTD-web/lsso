"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainSystemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const system_service_1 = require("./system.service");
const system_repository_1 = require("./system.repository");
const entities_1 = require("../../../../libs/database/entities");
let DomainSystemModule = class DomainSystemModule {
};
exports.DomainSystemModule = DomainSystemModule;
exports.DomainSystemModule = DomainSystemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.System])],
        providers: [system_service_1.DomainSystemService, system_repository_1.DomainSystemRepository],
        exports: [system_service_1.DomainSystemService],
    })
], DomainSystemModule);
//# sourceMappingURL=system.module.js.map
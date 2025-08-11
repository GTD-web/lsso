"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemsService = void 0;
const common_1 = require("@nestjs/common");
const system_service_1 = require("../../../../domain/system/system.service");
let SystemsService = class SystemsService {
    constructor(systemService) {
        this.systemService = systemService;
    }
    async findAll(options) {
        return this.systemService.findAll(options);
    }
    async findOne(id) {
        return this.systemService.findOne({ where: { id } });
    }
    async findByClientId(clientId) {
        return this.systemService.findByClientId(clientId);
    }
    async findByName(name) {
        return this.systemService.findByName(name);
    }
    async findByDomain(domain) {
        return this.systemService.findByDomain(domain);
    }
    async findActiveSystems() {
        return this.systemService.findActiveSystems();
    }
    async create(createSystemDto) {
        const { clientId, clientSecret, hash } = this.systemService.generateCredentials();
        const systemData = {
            ...createSystemDto,
            clientId,
            clientSecret: hash,
        };
        return this.systemService.create(systemData);
    }
    async update(id, systemData) {
        return this.systemService.update(id, systemData);
    }
    async remove(id) {
        await this.systemService.delete(id);
    }
    async verifyClientSecret(clientSecret, system) {
        return this.systemService.verifyClientSecret(clientSecret, system);
    }
    generateCredentials() {
        return this.systemService.generateCredentials();
    }
};
exports.SystemsService = SystemsService;
exports.SystemsService = SystemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [system_service_1.DomainSystemService])
], SystemsService);
//# sourceMappingURL=systems.service.js.map
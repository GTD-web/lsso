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
exports.AdminUsecase = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const systems_service_1 = require("../services/systems.service");
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
let AdminUsecase = class AdminUsecase {
    constructor(systemsService) {
        this.systemsService = systemsService;
    }
    async findAll() {
        return this.systemsService.findAll();
    }
    async findOne(id) {
        return this.systemsService.findOne(id);
    }
    async create(createSystemDto) {
        return this.systemsService.create(createSystemDto);
    }
    async update(id, updateData) {
        return this.systemsService.update(id, updateData);
    }
    async remove(id) {
        return this.systemsService.remove(id);
    }
    async searchSystems(query) {
        if (!query || query.trim() === '') {
            return this.findAll();
        }
        const options = {
            where: [
                { name: (0, typeorm_1.ILike)(`%${query}%`) },
                { description: (0, typeorm_1.ILike)(`%${query}%`) },
                { clientId: (0, typeorm_1.ILike)(`%${query}%`) },
                { domain: (0, typeorm_1.ILike)(`%${query}%`) },
            ],
        };
        return this.systemsService.findAll(options);
    }
    async registerSystem(createSystemDto) {
        const credentials = this.generateCredentials();
        console.log(credentials);
        createSystemDto.clientId = credentials.clientId;
        createSystemDto.clientSecret = credentials.hash;
        const system = await this.systemsService.create(createSystemDto);
        console.log('@', system);
        return { ...system, clientSecret: credentials.clientSecret };
    }
    async regenerateApiKeys(id) {
        const system = await this.systemsService.findOne(id);
        const credentials = this.generateSecret();
        system.clientSecret = credentials.hash;
        await this.systemsService.update(id, system);
        return { ...system, clientSecret: credentials.clientSecret };
    }
    generateCredentials() {
        const clientId = (0, uuid_1.v4)();
        const { clientSecret, hash } = this.generateSecret();
        return { clientId, clientSecret, hash };
    }
    generateSecret() {
        const clientSecret = (0, crypto_1.randomBytes)(32).toString('hex');
        const hash = bcrypt.hashSync(clientSecret, 10);
        return { clientSecret, hash };
    }
};
exports.AdminUsecase = AdminUsecase;
exports.AdminUsecase = AdminUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [systems_service_1.SystemsService])
], AdminUsecase);
//# sourceMappingURL=admin.usecase.js.map
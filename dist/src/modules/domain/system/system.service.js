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
exports.DomainSystemService = void 0;
const common_1 = require("@nestjs/common");
const system_repository_1 = require("./system.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
const crypto_1 = require("crypto");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
let DomainSystemService = class DomainSystemService extends base_service_1.BaseService {
    constructor(systemRepository) {
        super(systemRepository);
        this.systemRepository = systemRepository;
    }
    async findByClientId(clientId) {
        const system = await this.systemRepository.findOne({
            where: { clientId },
        });
        if (!system) {
            throw new common_1.NotFoundException('시스템을 찾을 수 없습니다.');
        }
        return system;
    }
    async findByName(name) {
        const system = await this.systemRepository.findOne({
            where: { name },
        });
        if (!system) {
            throw new common_1.NotFoundException('시스템을 찾을 수 없습니다.');
        }
        return system;
    }
    async findActiveSystems() {
        return this.systemRepository.findAll({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }
    async findByDomain(domain) {
        const system = await this.systemRepository.findOne({
            where: { domain },
        });
        if (!system) {
            throw new common_1.NotFoundException('해당 도메인의 시스템을 찾을 수 없습니다.');
        }
        return system;
    }
    async verifyClientSecret(clientSecret, system) {
        return bcrypt.compare(clientSecret, system.clientSecret);
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
exports.DomainSystemService = DomainSystemService;
exports.DomainSystemService = DomainSystemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [system_repository_1.DomainSystemRepository])
], DomainSystemService);
//# sourceMappingURL=system.service.js.map
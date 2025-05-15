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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const system_entity_1 = require("../entities/system.entity");
let SystemsService = class SystemsService {
    constructor(systemsRepository) {
        this.systemsRepository = systemsRepository;
    }
    async findAll(options) {
        return this.systemsRepository.find(options);
    }
    async findOne(id) {
        const system = await this.systemsRepository.findOne({ where: { id } });
        if (!system) {
            throw new common_1.NotFoundException(`System with ID ${id} not found`);
        }
        return system;
    }
    async create(createSystemDto) {
        const system = this.systemsRepository.create(createSystemDto);
        console.log('!', system);
        return this.systemsRepository.save(system);
    }
    async update(id, systemData) {
        const system = await this.findOne(id);
        Object.assign(system, systemData);
        return this.systemsRepository.save(system);
    }
    async remove(id) {
        const result = await this.systemsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`System with ID ${id} not found`);
        }
    }
};
exports.SystemsService = SystemsService;
exports.SystemsService = SystemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(system_entity_1.System)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SystemsService);
//# sourceMappingURL=systems.service.js.map
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
exports.DomainPositionService = void 0;
const common_1 = require("@nestjs/common");
const position_repository_1 = require("./position.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
let DomainPositionService = class DomainPositionService extends base_service_1.BaseService {
    constructor(positionRepository) {
        super(positionRepository);
        this.positionRepository = positionRepository;
    }
    async findById(positionId) {
        const position = await this.positionRepository.findOne({
            where: { id: positionId },
        });
        return position;
    }
    async findByTitle(positionTitle) {
        const position = await this.positionRepository.findOne({
            where: { positionTitle },
        });
        if (!position) {
            throw new common_1.NotFoundException('직책을 찾을 수 없습니다.');
        }
        return position;
    }
    async findByCode(positionCode) {
        const position = await this.positionRepository.findOne({
            where: { positionCode },
        });
        return position;
    }
    async findByLevel(level) {
        return this.positionRepository.findAll({
            where: { level },
            order: { level: 'ASC' },
        });
    }
    async findManagementPositions() {
        return this.positionRepository.findAll({
            where: { hasManagementAuthority: true },
            order: { level: 'DESC' },
        });
    }
};
exports.DomainPositionService = DomainPositionService;
exports.DomainPositionService = DomainPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [position_repository_1.DomainPositionRepository])
], DomainPositionService);
//# sourceMappingURL=position.service.js.map
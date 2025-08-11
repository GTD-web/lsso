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
exports.DomainRankService = void 0;
const common_1 = require("@nestjs/common");
const rank_repository_1 = require("./rank.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
let DomainRankService = class DomainRankService extends base_service_1.BaseService {
    constructor(rankRepository) {
        super(rankRepository);
        this.rankRepository = rankRepository;
    }
    async findById(rankId) {
        const rank = await this.rankRepository.findOne({
            where: { id: rankId },
        });
        return rank;
    }
    async findByName(rankName) {
        const rank = await this.rankRepository.findOne({
            where: { rankName },
        });
        if (!rank) {
            throw new common_1.NotFoundException('직급을 찾을 수 없습니다.');
        }
        return rank;
    }
    async findByCode(rankCode) {
        const rank = await this.rankRepository.findOne({
            where: { rankCode },
        });
        if (!rank) {
            throw new common_1.NotFoundException('직급을 찾을 수 없습니다.');
        }
        return rank;
    }
    async findAllRanks() {
        return this.rankRepository.findAll({
            order: { level: 'DESC' },
        });
    }
    async findByLevel(level) {
        return this.rankRepository.findAll({
            where: { level },
            order: { rankName: 'ASC' },
        });
    }
    async findByMinLevel(minLevel) {
        return this.rankRepository.findAll({
            order: { level: 'DESC' },
        });
    }
};
exports.DomainRankService = DomainRankService;
exports.DomainRankService = DomainRankService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rank_repository_1.DomainRankRepository])
], DomainRankService);
//# sourceMappingURL=rank.service.js.map
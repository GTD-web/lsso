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
exports.DomainEmployeeRankHistoryService = void 0;
const common_1 = require("@nestjs/common");
const employee_rank_history_repository_1 = require("./employee-rank-history.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
let DomainEmployeeRankHistoryService = class DomainEmployeeRankHistoryService extends base_service_1.BaseService {
    constructor(employeeRankHistoryRepository) {
        super(employeeRankHistoryRepository);
        this.employeeRankHistoryRepository = employeeRankHistoryRepository;
    }
    async findByEmployeeId(employeeId) {
        return this.employeeRankHistoryRepository.findAll({
            where: { employeeId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByRankId(rankId) {
        return this.employeeRankHistoryRepository.findAll({
            where: { rankId },
            order: { createdAt: 'DESC' },
        });
    }
    async findCurrentRankByEmployeeId(employeeId) {
        const histories = await this.employeeRankHistoryRepository.findAll({
            where: { employeeId },
            order: { createdAt: 'DESC' },
            take: 1,
        });
        if (!histories.length) {
            throw new common_1.NotFoundException('직원의 직급 이력을 찾을 수 없습니다.');
        }
        return histories[0];
    }
    async findByEmployeeAndRank(employeeId, rankId) {
        return this.employeeRankHistoryRepository.findAll({
            where: { employeeId, rankId },
            order: { createdAt: 'DESC' },
        });
    }
    async createRankHistory(employeeId, rankId) {
        return this.employeeRankHistoryRepository.save({
            employeeId,
            rankId,
        });
    }
    async findByDateRange(startDate, endDate) {
        return this.employeeRankHistoryRepository.findAll({
            order: { createdAt: 'DESC' },
        });
    }
    async getRankChangeCountByEmployeeId(employeeId) {
        const histories = await this.findByEmployeeId(employeeId);
        return histories.length;
    }
    async findRecentRankChanges(limit = 20) {
        return this.employeeRankHistoryRepository.findAll({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
};
exports.DomainEmployeeRankHistoryService = DomainEmployeeRankHistoryService;
exports.DomainEmployeeRankHistoryService = DomainEmployeeRankHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_rank_history_repository_1.DomainEmployeeRankHistoryRepository])
], DomainEmployeeRankHistoryService);
//# sourceMappingURL=employee-rank-history.service.js.map
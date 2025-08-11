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
exports.DomainLogService = void 0;
const common_1 = require("@nestjs/common");
const log_repository_1 = require("./log.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
let DomainLogService = class DomainLogService extends base_service_1.BaseService {
    constructor(logRepository) {
        super(logRepository);
        this.logRepository = logRepository;
    }
    async findByMethodAndUrl(method, url) {
        return this.logRepository.findAll({
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findErrorLogs() {
        return this.logRepository.findAll({
            where: { isError: true },
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findBySystem(system) {
        return this.logRepository.findAll({
            where: { system },
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findByStatusCode(statusCode) {
        return this.logRepository.findAll({
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findByIpAddress(ip) {
        return this.logRepository.findAll({
            where: { ip },
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findSlowRequests(minResponseTime = 1000) {
        return this.logRepository.findAll({
            order: { responseTime: 'DESC' },
        });
    }
};
exports.DomainLogService = DomainLogService;
exports.DomainLogService = DomainLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_repository_1.DomainLogRepository])
], DomainLogService);
//# sourceMappingURL=log.service.js.map
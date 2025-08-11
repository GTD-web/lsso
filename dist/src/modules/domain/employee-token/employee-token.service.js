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
exports.DomainEmployeeTokenService = void 0;
const common_1 = require("@nestjs/common");
const employee_token_repository_1 = require("./employee-token.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
let DomainEmployeeTokenService = class DomainEmployeeTokenService extends base_service_1.BaseService {
    constructor(employeeTokenRepository) {
        super(employeeTokenRepository);
        this.employeeTokenRepository = employeeTokenRepository;
    }
    async findByEmployeeId(employeeId) {
        return this.employeeTokenRepository.findAll({
            where: { employeeId },
        });
    }
    async findByTokenId(tokenId) {
        return this.employeeTokenRepository.findAll({
            where: { tokenId },
        });
    }
    async createOrUpdateRelation(employeeId, tokenId, relationData) {
        const existingRelation = await this.employeeTokenRepository.findOne({
            where: { employeeId, tokenId },
        });
        if (existingRelation) {
            return this.employeeTokenRepository.update(existingRelation.id, relationData);
        }
        return this.employeeTokenRepository.save({
            employeeId,
            tokenId,
            ...relationData,
        });
    }
};
exports.DomainEmployeeTokenService = DomainEmployeeTokenService;
exports.DomainEmployeeTokenService = DomainEmployeeTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_token_repository_1.DomainEmployeeTokenRepository])
], DomainEmployeeTokenService);
//# sourceMappingURL=employee-token.service.js.map
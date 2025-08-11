"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEmployeeRankHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_rank_history_service_1 = require("./employee-rank-history.service");
const employee_rank_history_repository_1 = require("./employee-rank-history.repository");
const entities_1 = require("../../../../libs/database/entities");
let DomainEmployeeRankHistoryModule = class DomainEmployeeRankHistoryModule {
};
exports.DomainEmployeeRankHistoryModule = DomainEmployeeRankHistoryModule;
exports.DomainEmployeeRankHistoryModule = DomainEmployeeRankHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.EmployeeRankHistory])],
        providers: [employee_rank_history_service_1.DomainEmployeeRankHistoryService, employee_rank_history_repository_1.DomainEmployeeRankHistoryRepository],
        exports: [employee_rank_history_service_1.DomainEmployeeRankHistoryService],
    })
], DomainEmployeeRankHistoryModule);
//# sourceMappingURL=employee-rank-history.module.js.map
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
var LogsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const log_filter_dto_1 = require("../dto/log-filter.dto");
const log_service_1 = require("../../../../domain/log/log.service");
let LogsService = LogsService_1 = class LogsService {
    constructor(domainLogService) {
        this.domainLogService = domainLogService;
        this.logger = new common_1.Logger(LogsService_1.name);
    }
    async create(createLogDto) {
        await this.domainLogService.save(createLogDto);
    }
    async createMany(createLogDto) {
        for (const dto of createLogDto) {
            await this.domainLogService.create(dto);
        }
    }
    async findAll(page = 1, limit = 10) {
        const options = {
            order: { requestTimestamp: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        };
        const logs = await this.domainLogService.findAll(options);
        const allLogs = await this.domainLogService.findAll();
        const total = allLogs.length;
        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const log = await this.domainLogService.findOne({ where: { id } });
        if (!log) {
            throw new common_1.NotFoundException(`Log with ID ${id} not found`);
        }
        return log;
    }
    async filterLogs(filterDto) {
        const { page = 1, limit = 10, startDate, endDate, method, url, statusCode, host, ip, system, errorsOnly, sortBy = 'requestTimestamp', sortDirection = log_filter_dto_1.SortDirection.DESC, } = filterDto;
        const where = {};
        if (startDate && endDate) {
            where.requestTimestamp = (0, typeorm_1.Between)(startDate, endDate);
        }
        else if (startDate) {
            where.requestTimestamp = (0, typeorm_1.MoreThanOrEqual)(startDate);
        }
        else if (endDate) {
            where.requestTimestamp = (0, typeorm_1.LessThanOrEqual)(endDate);
        }
        if (url) {
            where.url = (0, typeorm_1.ILike)(`%${url}%`);
        }
        if (host) {
            where.host = (0, typeorm_1.ILike)(`%${host}%`);
        }
        if (ip) {
            where.ip = (0, typeorm_1.ILike)(`%${ip}%`);
        }
        if (method) {
            where.method = method;
        }
        if (statusCode) {
            where.statusCode = statusCode;
        }
        if (errorsOnly) {
            where.isError = true;
        }
        if (system) {
            where.system = (0, typeorm_1.ILike)(`%${system}%`);
        }
        const order = {};
        order[sortBy] = sortDirection;
        const options = {
            where,
            order,
            skip: (page - 1) * limit,
            take: limit,
        };
        const logs = await this.domainLogService.findAll(options);
        const allFilteredLogs = await this.domainLogService.findAll({ where });
        const total = allFilteredLogs.length;
        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = LogsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.DomainLogService])
], LogsService);
//# sourceMappingURL=logs.service.js.map
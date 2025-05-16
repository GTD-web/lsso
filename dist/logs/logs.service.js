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
var LogsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const log_entity_1 = require("./entities/log.entity");
const log_filter_dto_1 = require("./dto/log-filter.dto");
let LogsService = LogsService_1 = class LogsService {
    constructor(logRepository) {
        this.logRepository = logRepository;
        this.logger = new common_1.Logger(LogsService_1.name);
    }
    async create(createLogDto) {
        const log = this.logRepository.create(createLogDto);
        await this.logRepository.insert(log);
    }
    async createMany(createLogDto) {
        await this.logRepository.insert(createLogDto);
    }
    async findAll(page = 1, limit = 10) {
        try {
            const [logs, total] = await this.logRepository.findAndCount({
                order: { requestTimestamp: 'DESC' },
                skip: (page - 1) * limit,
                take: limit,
            });
            return {
                logs,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const log = await this.logRepository.findOne({ where: { id } });
            if (!log) {
                throw new common_1.NotFoundException(`Log with ID ${id} not found`);
            }
            return log;
        }
        catch (error) {
            throw error;
        }
    }
    async filterLogs(filterDto) {
        const { page = 1, limit = 10, startDate, endDate, method, url, statusCode, host, ip, system, errorsOnly, sortBy = 'requestTimestamp', sortDirection = log_filter_dto_1.SortDirection.DESC, } = filterDto;
        try {
            const where = {};
            if (startDate && endDate) {
                where.requestTimestamp = (0, typeorm_2.Between)(startDate, endDate);
            }
            else if (startDate) {
                where.requestTimestamp = (0, typeorm_2.MoreThanOrEqual)(startDate);
            }
            else if (endDate) {
                where.requestTimestamp = (0, typeorm_2.LessThanOrEqual)(endDate);
            }
            if (url) {
                where.url = (0, typeorm_2.ILike)(`%${url}%`);
            }
            if (host) {
                where.host = (0, typeorm_2.ILike)(`%${host}%`);
            }
            if (ip) {
                where.ip = (0, typeorm_2.ILike)(`%${ip}%`);
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
                where.system = (0, typeorm_2.ILike)(`%${system}%`);
            }
            const order = {};
            order[sortBy] = sortDirection;
            const [logs, total] = await this.logRepository.findAndCount({
                where,
                order,
                skip: (page - 1) * limit,
                take: limit,
            });
            return {
                logs,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = LogsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LogsService);
//# sourceMappingURL=logs.service.js.map
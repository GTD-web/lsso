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
exports.DomainSystemsController = void 0;
const common_1 = require("@nestjs/common");
const systems_service_1 = require("../services/systems.service");
const swagger_1 = require("@nestjs/swagger");
const create_system_dto_1 = require("../dto/create-system.dto");
const update_system_dto_1 = require("../dto/update-system.dto");
let DomainSystemsController = class DomainSystemsController {
    constructor(systemsService) {
        this.systemsService = systemsService;
    }
    async create(createDto) {
        return await this.systemsService.create(createDto);
    }
    async findAll(options) {
        return await this.systemsService.findAll(options);
    }
    async findOne(id) {
        return await this.systemsService.findOne(id);
    }
    async update(id, updateDto) {
        return await this.systemsService.update(id, updateDto);
    }
    async remove(id) {
        return await this.systemsService.remove(id);
    }
};
exports.DomainSystemsController = DomainSystemsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 생성' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '시스템이 성공적으로 생성됨' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_system_dto_1.CreateSystemDto]),
    __metadata("design:returntype", Promise)
], DomainSystemsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 목록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '시스템 목록' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DomainSystemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 상세 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '시스템 상세 정보' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainSystemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 정보 수정' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '수정된 시스템 정보' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_system_dto_1.UpdateSystemDto]),
    __metadata("design:returntype", Promise)
], DomainSystemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '시스템 삭제 성공' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainSystemsController.prototype, "remove", null);
exports.DomainSystemsController = DomainSystemsController = __decorate([
    (0, swagger_1.ApiTags)('도메인 시스템 API'),
    (0, common_1.Controller)('domain/systems'),
    __metadata("design:paramtypes", [systems_service_1.SystemsService])
], DomainSystemsController);
//# sourceMappingURL=domain.controller.js.map
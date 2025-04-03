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
exports.SystemsController = void 0;
const common_1 = require("@nestjs/common");
const systems_service_1 = require("./systems.service");
const swagger_1 = require("@nestjs/swagger");
const create_system_dto_1 = require("./dto/create-system.dto");
const update_system_dto_1 = require("./dto/update-system.dto");
const response_system_dto_1 = require("./dto/response-system.dto");
let SystemsController = class SystemsController {
    constructor(systemsService) {
        this.systemsService = systemsService;
    }
    findAll() {
        return this.systemsService.findAll();
    }
    findOne(id) {
        return this.systemsService.findOne(id);
    }
    create(createSystemDto) {
        return this.systemsService.create(createSystemDto);
    }
    update(id, updateSystemDto) {
        console.log(updateSystemDto);
        return this.systemsService.update(id, updateSystemDto);
    }
    remove(id) {
        return this.systemsService.remove(id);
    }
};
exports.SystemsController = SystemsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 목록 조회 성공',
        type: response_system_dto_1.ResponseSystemDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SystemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 상세 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 상세 조회 성공',
        type: response_system_dto_1.ResponseSystemDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SystemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 생성' }),
    (0, swagger_1.ApiBody)({ type: create_system_dto_1.CreateSystemDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '시스템 생성 성공',
        type: response_system_dto_1.ResponseSystemDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_system_dto_1.CreateSystemDto]),
    __metadata("design:returntype", Promise)
], SystemsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 수정' }),
    (0, swagger_1.ApiBody)({ type: update_system_dto_1.UpdateSystemDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 수정 성공',
        type: response_system_dto_1.ResponseSystemDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_system_dto_1.UpdateSystemDto]),
    __metadata("design:returntype", Promise)
], SystemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 삭제' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 삭제 성공',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SystemsController.prototype, "remove", null);
exports.SystemsController = SystemsController = __decorate([
    (0, swagger_1.ApiTags)('시스템'),
    (0, common_1.Controller)('systems'),
    __metadata("design:paramtypes", [systems_service_1.SystemsService])
], SystemsController);
//# sourceMappingURL=systems.controller.js.map
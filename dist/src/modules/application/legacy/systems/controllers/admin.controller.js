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
exports.AdminSystemsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_system_dto_1 = require("../dto/create-system.dto");
const update_system_dto_1 = require("../dto/update-system.dto");
const api_response_dto_1 = require("../../../../../common/dto/api-response.dto");
const admin_usecase_1 = require("../usecases/admin.usecase");
let AdminSystemsController = class AdminSystemsController {
    constructor(adminUsecase) {
        this.adminUsecase = adminUsecase;
    }
    async findAll(search) {
        try {
            let systems;
            if (search) {
                systems = await this.adminUsecase.searchSystems(search);
            }
            else {
                systems = await this.adminUsecase.findAll();
            }
            return api_response_dto_1.ApiResponseDto.success(systems);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEMS_FETCH_ERROR', '시스템 목록을 조회하는 중 오류가 발생했습니다.');
        }
    }
    async search(query) {
        try {
            const systems = await this.adminUsecase.searchSystems(query);
            return api_response_dto_1.ApiResponseDto.success(systems);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEMS_SEARCH_ERROR', '시스템 검색 중 오류가 발생했습니다.');
        }
    }
    async findOne(id) {
        try {
            const system = await this.adminUsecase.findOne(id);
            return api_response_dto_1.ApiResponseDto.success(system);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEM_NOT_FOUND', `해당 ID의 시스템을 찾을 수 없습니다: ${id}`);
        }
    }
    async create(createSystemDto) {
        try {
            console.log(createSystemDto);
            const system = await this.adminUsecase.registerSystem(createSystemDto);
            console.log(system);
            return api_response_dto_1.ApiResponseDto.success(system);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEM_CREATE_ERROR', '시스템 생성 중 오류가 발생했습니다.');
        }
    }
    async partialUpdate(id, updateSystemDto) {
        try {
            let system;
            system = await this.adminUsecase.update(id, updateSystemDto);
            return api_response_dto_1.ApiResponseDto.success(system);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEM_UPDATE_ERROR', `시스템 수정 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            await this.adminUsecase.remove(id);
            return api_response_dto_1.ApiResponseDto.success(true);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEM_DELETE_ERROR', `시스템 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async regenerateApiKeys(id) {
        try {
            const system = await this.adminUsecase.regenerateApiKeys(id);
            return api_response_dto_1.ApiResponseDto.success(system);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('KEY_REGENERATION_ERROR', `키 재생성 중 오류가 발생했습니다: ${error.message}`);
        }
    }
};
exports.AdminSystemsController = AdminSystemsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 목록 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: '검색어 (이름, 설명, 공개키, 허용된 출처)' }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSystemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 검색' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 검색 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSystemsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 상세 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 상세 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSystemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 생성', description: '새로운 시스템을 등록하고 공개키/비밀키 쌍을 생성합니다.' }),
    (0, swagger_1.ApiBody)({ type: create_system_dto_1.CreateSystemDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '시스템 생성 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_system_dto_1.CreateSystemDto]),
    __metadata("design:returntype", Promise)
], AdminSystemsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 부분 수정' }),
    (0, swagger_1.ApiBody)({ type: update_system_dto_1.UpdateSystemDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 수정 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_system_dto_1.UpdateSystemDto]),
    __metadata("design:returntype", Promise)
], AdminSystemsController.prototype, "partialUpdate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 삭제' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 삭제 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSystemsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/regenerate-keys'),
    (0, swagger_1.ApiOperation)({ summary: 'API 키 재생성', description: '공개키/비밀키 쌍을 새로 생성합니다.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '키가 재생성되었습니다.',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminSystemsController.prototype, "regenerateApiKeys", null);
exports.AdminSystemsController = AdminSystemsController = __decorate([
    (0, swagger_1.ApiTags)('관리자 시스템 API'),
    (0, common_1.Controller)('admin/systems'),
    __metadata("design:paramtypes", [admin_usecase_1.AdminUsecase])
], AdminSystemsController);
//# sourceMappingURL=admin.controller.js.map
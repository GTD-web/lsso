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
exports.AdminUsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../services/users.service");
const user_response_dto_1 = require("../dto/user-response.dto");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
const admin_usecase_1 = require("../usecases/admin.usecase");
let AdminUsersController = class AdminUsersController {
    constructor(usersService, adminUsecase) {
        this.usersService = usersService;
        this.adminUsecase = adminUsecase;
    }
    async findAll() {
        try {
            const users = await this.usersService.findAll({
                relations: ['tokens'],
            });
            const userDtos = users.map((user) => new user_response_dto_1.UserResponseDto(user));
            return api_response_dto_1.ApiResponseDto.success(userDtos);
        }
        catch (error) {
            console.error('Error fetching all users:', error);
            return api_response_dto_1.ApiResponseDto.error('USERS_FETCH_ERROR', '사용자 목록을 조회하는 중 오류가 발생했습니다.');
        }
    }
    async search(query) {
        try {
            const users = await this.adminUsecase.searchUsers(query);
            const userDtos = users.map((user) => new user_response_dto_1.UserResponseDto(user));
            return api_response_dto_1.ApiResponseDto.success(userDtos);
        }
        catch (error) {
            console.error(`Error searching users with query ${query}:`, error);
            return api_response_dto_1.ApiResponseDto.error('USERS_SEARCH_ERROR', '사용자 검색 중 오류가 발생했습니다.');
        }
    }
    async findOne(id) {
        try {
            const user = await this.usersService.findOne(id);
            if (!user) {
                return api_response_dto_1.ApiResponseDto.error('USER_NOT_FOUND', '해당 ID의 사용자를 찾을 수 없습니다.');
            }
            return api_response_dto_1.ApiResponseDto.success(new user_response_dto_1.UserResponseDto(user));
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return api_response_dto_1.ApiResponseDto.error('USER_NOT_FOUND', '해당 ID의 사용자를 찾을 수 없습니다.');
            }
            console.error(`Error fetching user with ID ${id}:`, error);
            return api_response_dto_1.ApiResponseDto.error('USER_FETCH_ERROR', '사용자 정보를 조회하는 중 오류가 발생했습니다.');
        }
    }
};
exports.AdminUsersController = AdminUsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '사용자 목록 조회', description: '등록된 모든 사용자 목록을 조회합니다.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '사용자 목록 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: '사용자 검색', description: '검색 조건에 맞는 사용자 목록을 조회합니다.' }),
    (0, swagger_1.ApiQuery)({ name: 'query', description: '검색어 (이름, 이메일, 직원번호, 부서, 직책 등)', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '사용자 검색 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '사용자 상세 조회', description: '특정 ID의 사용자 정보를 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '사용자 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '사용자 상세 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '사용자를 찾을 수 없음',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "findOne", null);
exports.AdminUsersController = AdminUsersController = __decorate([
    (0, swagger_1.ApiTags)('관리자 사용자 API'),
    (0, common_1.Controller)('admin/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, admin_usecase_1.AdminUsecase])
], AdminUsersController);
//# sourceMappingURL=admin.controller.js.map
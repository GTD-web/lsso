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
exports.AdminLoginResponseDto = exports.AdminErrorDto = exports.AdminAuthDataDto = exports.AdminUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AdminUserDto {
}
exports.AdminUserDto = AdminUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 ID',
        example: 'admin-001',
    }),
    __metadata("design:type", String)
], AdminUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 이메일',
        example: 'admin@example.com',
    }),
    __metadata("design:type", String)
], AdminUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 이름',
        example: '관리자',
    }),
    __metadata("design:type", String)
], AdminUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 역할',
        example: 'admin',
    }),
    __metadata("design:type", String)
], AdminUserDto.prototype, "role", void 0);
class AdminAuthDataDto {
}
exports.AdminAuthDataDto = AdminAuthDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 정보',
        type: AdminUserDto,
    }),
    __metadata("design:type", AdminUserDto)
], AdminAuthDataDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT 액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], AdminAuthDataDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '리프레시 토큰',
        example: 'rt_cd5f1342-a472-47d8-a44c-4e09128eb87e',
    }),
    __metadata("design:type", String)
], AdminAuthDataDto.prototype, "refreshToken", void 0);
class AdminErrorDto {
}
exports.AdminErrorDto = AdminErrorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '오류 코드',
        example: 'AUTH_INVALID_CREDENTIALS',
    }),
    __metadata("design:type", String)
], AdminErrorDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '오류 메시지',
        example: '이메일 또는 비밀번호가 올바르지 않습니다.',
    }),
    __metadata("design:type", String)
], AdminErrorDto.prototype, "message", void 0);
class AdminLoginResponseDto {
}
exports.AdminLoginResponseDto = AdminLoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답 성공 여부',
        example: true,
    }),
    __metadata("design:type", Boolean)
], AdminLoginResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답 데이터',
        nullable: true,
        type: AdminAuthDataDto,
    }),
    __metadata("design:type", AdminAuthDataDto)
], AdminLoginResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '오류 정보',
        nullable: true,
        type: AdminErrorDto,
    }),
    __metadata("design:type", AdminErrorDto)
], AdminLoginResponseDto.prototype, "error", void 0);
//# sourceMappingURL=admin-login-response.dto.js.map
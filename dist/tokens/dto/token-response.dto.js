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
exports.TokenResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TokenResponseDto {
}
exports.TokenResponseDto = TokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 ID',
        example: '987fcdeb-51a2-43b7-89cd-321654987000',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 ID',
        example: '456fcdeb-51a2-43b7-89cd-321654987123',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "systemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 시크릿',
        example: 'a1b2c3d4e5f6g7h8i9j0...',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "secret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 만료 일자',
        example: '2023-12-31T23:59:59Z',
    }),
    __metadata("design:type", Date)
], TokenResponseDto.prototype, "tokenExpiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '마지막 접근 일자',
        example: '2023-06-15T14:30:00Z',
        required: false,
    }),
    __metadata("design:type", Date)
], TokenResponseDto.prototype, "lastAccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 활성화 상태',
        example: true,
    }),
    __metadata("design:type", Boolean)
], TokenResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], TokenResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], TokenResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 이름',
        example: '홍길동',
        required: false,
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 이메일',
        example: 'user@example.com',
        required: false,
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "userEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 이름',
        example: 'HR 시스템',
        required: false,
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "systemName", void 0);
//# sourceMappingURL=token-response.dto.js.map
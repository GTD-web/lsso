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
exports.AdminProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AdminProfileDto {
}
exports.AdminProfileDto = AdminProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이메일',
        example: 'admin@example.com',
    }),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '역할',
        example: 'admin',
    }),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '마지막 로그인 시간',
        example: '2023-01-01T00:00:00Z',
        required: false,
    }),
    __metadata("design:type", Date)
], AdminProfileDto.prototype, "lastLogin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], AdminProfileDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], AdminProfileDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=admin-profile.dto.js.map
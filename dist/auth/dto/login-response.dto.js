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
exports.LoginResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LoginResponseDto {
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '액세스 토큰', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi...' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시크릿 키',
        example: '08c9124e08661f87e893544360d86d84de0154902fde79802d81ba7f0ec794a5',
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "secret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '토큰 만료 시간', example: '2025-03-26T00:00:00.000Z' }),
    __metadata("design:type", Date)
], LoginResponseDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이름', example: '구석현' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이메일', example: 'koo.sukhyun@lumir.space' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 비밀번호', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 사번', example: '24020' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 전화번호', example: '010-1234-5678' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 생년월일', example: '1980-07-04T00:00:00.000Z' }),
    __metadata("design:type", Date)
], LoginResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 성별', example: 'MALE' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 입사일', example: '2024-05-21T00:00:00.000Z' }),
    __metadata("design:type", Date)
], LoginResponseDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 재직 상태', example: '재직중' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 부서', example: '대표이사' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 직위', example: '대표이사' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 직급', example: '대표이사' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "rank", void 0);
//# sourceMappingURL=login-response.dto.js.map
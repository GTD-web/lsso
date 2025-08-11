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
exports.TokenVerifyResponseDto = exports.UserInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserInfoDto {
}
exports.UserInfoDto = UserInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 ID' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이름' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이메일' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 번호' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "employee_number", void 0);
class TokenVerifyResponseDto {
}
exports.TokenVerifyResponseDto = TokenVerifyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: '토큰 유효성' }),
    __metadata("design:type", Boolean)
], TokenVerifyResponseDto.prototype, "valid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserInfoDto, description: '사용자 정보' }),
    __metadata("design:type", UserInfoDto)
], TokenVerifyResponseDto.prototype, "user_info", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 86400, description: '토큰 만료까지 남은 시간(초)' }),
    __metadata("design:type", Number)
], TokenVerifyResponseDto.prototype, "expires_in", void 0);
//# sourceMappingURL=token-verify-response.dto.js.map
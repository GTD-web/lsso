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
exports.RefreshTokenResponseDto = exports.TokenErrorDto = exports.TokenRefreshDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TokenRefreshDataDto {
}
exports.TokenRefreshDataDto = TokenRefreshDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '새로운 액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], TokenRefreshDataDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 만료일',
        example: '2023-12-31T23:59:59Z',
    }),
    __metadata("design:type", Date)
], TokenRefreshDataDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '새로운 리프레시 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], TokenRefreshDataDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '리프레시 토큰 만료일',
        example: '2024-03-31T23:59:59Z',
    }),
    __metadata("design:type", Date)
], TokenRefreshDataDto.prototype, "refreshTokenExpiresAt", void 0);
class TokenErrorDto {
}
exports.TokenErrorDto = TokenErrorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '오류 코드',
        example: 'AUTH_REFRESH_ERROR',
    }),
    __metadata("design:type", String)
], TokenErrorDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '오류 메시지',
        example: '리프레시 토큰이 유효하지 않습니다.',
    }),
    __metadata("design:type", String)
], TokenErrorDto.prototype, "message", void 0);
class RefreshTokenResponseDto {
}
exports.RefreshTokenResponseDto = RefreshTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답 성공 여부',
        example: true,
    }),
    __metadata("design:type", Boolean)
], RefreshTokenResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답 데이터',
        nullable: true,
        type: TokenRefreshDataDto,
    }),
    __metadata("design:type", TokenRefreshDataDto)
], RefreshTokenResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '오류 정보',
        nullable: true,
        type: TokenErrorDto,
    }),
    __metadata("design:type", TokenErrorDto)
], RefreshTokenResponseDto.prototype, "error", void 0);
//# sourceMappingURL=refresh-token-response.dto.js.map
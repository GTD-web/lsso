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
exports.CreateTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTokenDto {
}
exports.CreateTokenDto = CreateTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직원 ID',
        example: '987fcdeb-51a2-43b7-89cd-321654987000',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '사번', example: '24020' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '액세스 토큰 만료 일수', default: 30, minimum: 1, maximum: 365 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    __metadata("design:type", Number)
], CreateTokenDto.prototype, "expiresInDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '리프레시 토큰 만료 일수', default: 90, minimum: 30, maximum: 730 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(730),
    __metadata("design:type", Number)
], CreateTokenDto.prototype, "refreshExpiresInDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '액세스 토큰' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '리프레시 토큰' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '토큰 만료 일시' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateTokenDto.prototype, "tokenExpiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '리프레시 토큰 만료 일시' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateTokenDto.prototype, "refreshTokenExpiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '클라이언트 정보' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "clientInfo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'IP 주소' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "ipAddress", void 0);
//# sourceMappingURL=create-token.dto.js.map
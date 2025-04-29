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
exports.ResponseSystemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ResponseSystemDto {
}
exports.ResponseSystemDto = ResponseSystemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 이름',
        example: 'Sample System',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 설명',
        example: 'This is a sample system description',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '공개키 (RSA Public Key)',
        example: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "publicKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비밀키 (RSA Private Key)',
        example: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAA...\n-----END PRIVATE KEY-----',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "secretKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '허용된 출처 URL 목록',
        example: ['https://sample-system.com'],
        type: [String],
    }),
    __metadata("design:type", Array)
], ResponseSystemDto.prototype, "allowedOrigin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '헬스 체크 URL',
        example: 'https://sample-system.com/health',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "healthCheckUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 활성화 상태',
        example: true,
    }),
    __metadata("design:type", Boolean)
], ResponseSystemDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], ResponseSystemDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], ResponseSystemDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=response-system.dto.js.map
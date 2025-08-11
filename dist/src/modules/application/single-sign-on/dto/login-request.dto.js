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
exports.LoginRequestDto = exports.GrantType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var GrantType;
(function (GrantType) {
    GrantType["PASSWORD"] = "password";
    GrantType["REFRESH_TOKEN"] = "refresh_token";
})(GrantType || (exports.GrantType = GrantType = {}));
class LoginRequestDto {
}
exports.LoginRequestDto = LoginRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: GrantType,
        description: 'password: 사용자 인증 방식, refresh_token: 리프레시 토큰 방식',
        example: GrantType.PASSWORD,
    }),
    (0, class_validator_1.IsEnum)(GrantType),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "grant_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사용자 이메일 (grant_type이 password인 경우에만 필요)',
        example: 'user@example.com',
    }),
    (0, class_validator_1.ValidateIf)((obj) => obj.grant_type === GrantType.PASSWORD),
    (0, class_validator_1.IsEmail)({}, { message: '유효한 이메일 주소를 입력해주세요.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사용자 비밀번호 (grant_type이 password인 경우에만 필요)',
        example: 'password123',
    }),
    (0, class_validator_1.ValidateIf)((obj) => obj.grant_type === GrantType.PASSWORD),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '리프레시 토큰 (grant_type이 refresh_token인 경우에만 필요)',
    }),
    (0, class_validator_1.ValidateIf)((obj) => obj.grant_type === GrantType.REFRESH_TOKEN),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "refresh_token", void 0);
//# sourceMappingURL=login-request.dto.js.map
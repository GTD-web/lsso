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
exports.UserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserResponseDto {
    constructor(user) {
        this.id = user.id;
        this.employeeNumber = user.employeeNumber;
        this.name = user.name;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.dateOfBirth = user.dateOfBirth ? user.dateOfBirth.toISOString().split('T')[0] : undefined;
        this.gender = user.gender;
        this.hireDate = user.hireDate ? user.hireDate.toISOString().split('T')[0] : undefined;
        this.status = user.status;
        this.department = user.department;
        this.position = user.position;
        this.rank = user.rank;
        this.createdAt = user.createdAt.toISOString();
        this.updatedAt = user.updatedAt.toISOString();
        this.hasToken = user.tokens && Array.isArray(user.tokens) && user.tokens.length > 0;
    }
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 ID' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 번호' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이름' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생년월일', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '재직 상태', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직위', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '토큰 정보', required: false }),
    __metadata("design:type", Boolean)
], UserResponseDto.prototype, "hasToken", void 0);
//# sourceMappingURL=user-response.dto.js.map
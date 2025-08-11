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
    constructor(employee) {
        this.id = employee.id;
        this.employeeNumber = employee.employeeNumber;
        this.name = employee.name;
        this.email = employee.email;
        this.phoneNumber = employee.phoneNumber;
        this.dateOfBirth = employee.dateOfBirth ? String(employee.dateOfBirth).split('T')[0] : undefined;
        this.gender = employee.gender ? employee.gender.toString() : undefined;
        this.hireDate = employee.hireDate ? String(employee.hireDate).split('T')[0] : undefined;
        this.status = employee.status ? employee.status.toString() : undefined;
        this.rank = employee.currentRank?.rankName || undefined;
        this.department = employee.departmentPositions?.[0]?.department?.departmentName || undefined;
        this.position = employee.departmentPositions?.[0]?.position?.positionTitle || undefined;
        this.createdAt = String(employee.createdAt).split('T')[0] || String(employee.createdAt);
        this.updatedAt = String(employee.updatedAt).split('T')[0] || String(employee.updatedAt);
        this.isInitialPasswordSet = employee.isInitialPasswordSet;
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
    (0, swagger_1.ApiProperty)({ description: '현재 직급', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직위명', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '초기 비밀번호 설정 여부', required: false }),
    __metadata("design:type", Boolean)
], UserResponseDto.prototype, "isInitialPasswordSet", void 0);
//# sourceMappingURL=user-response.dto.js.map
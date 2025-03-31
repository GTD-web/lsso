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
exports.EmployeeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EmployeeResponseDto {
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID', example: '67d116b591e5366c327915d2' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사번', example: '24020' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employee_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름', example: '구석현' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일', example: 'koo.sukhyun@lumir.space' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', example: '010-1234-5678' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생년월일', example: '1980-07-04T00:00:00.000Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', example: 'MALE' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일', example: '2024-05-21T00:00:00.000Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "hire_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관리자 ID', example: null }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "manager_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '재직 상태', example: '재직중' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 이력', example: [] }),
    __metadata("design:type", Array)
], EmployeeResponseDto.prototype, "department_history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직위 이력', example: [] }),
    __metadata("design:type", Array)
], EmployeeResponseDto.prototype, "position_history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 이력', example: [] }),
    __metadata("design:type", Array)
], EmployeeResponseDto.prototype, "rank_history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일', example: '2025-03-12T05:08:05.546Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일', example: '2025-03-12T09:06:22.778Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '버전', example: 0 }),
    __metadata("design:type", Number)
], EmployeeResponseDto.prototype, "__v", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID', example: '67d0f2e49af04fc1b2f65b14' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "department_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직위 ID', example: '67d1436e91e5366c32791be3' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "position_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 ID', example: '67d108129af04fc1b2f65c19' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "rank_id", void 0);
//# sourceMappingURL=employee-response.dto.js.map
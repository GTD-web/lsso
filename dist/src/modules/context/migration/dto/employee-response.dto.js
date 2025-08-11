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
class PositionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID', example: '67d1436e91e5366c32791be3' }),
    __metadata("design:type", String)
], PositionDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책명', example: '직원' }),
    __metadata("design:type", String)
], PositionDto.prototype, "position_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 코드', example: '직원' }),
    __metadata("design:type", String)
], PositionDto.prototype, "position_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 레벨', example: 6 }),
    __metadata("design:type", Number)
], PositionDto.prototype, "level", void 0);
class RankDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 ID', example: '67d1081c9af04fc1b2f65c1d' }),
    __metadata("design:type", String)
], RankDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급명', example: '연구원' }),
    __metadata("design:type", String)
], RankDto.prototype, "rank_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 코드', example: '연구원' }),
    __metadata("design:type", String)
], RankDto.prototype, "rank_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 레벨', example: 9 }),
    __metadata("design:type", Number)
], RankDto.prototype, "level", void 0);
class DepartmentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID', example: '67d0f1d19af04fc1b2f65af2' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명', example: 'RF파트' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "department_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 코드', example: '우주-RF' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "department_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 순서', example: 4 }),
    __metadata("design:type", Number)
], DepartmentDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상위 부서 ID',
        example: '684bd41148148ddbd9068cd9',
        nullable: true,
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "parent_department_id", void 0);
class EmployeeResponseDto {
    constructor(employee) {
        this._id = employee._id;
        this.employee_number = employee.employee_number;
        this.name = employee.name;
        this.email = employee.email;
        this.phone_number = employee.phone_number;
        this.date_of_birth = employee.date_of_birth;
        this.gender = employee.gender;
        this.hire_date = employee.hire_date;
        this.manager_id = employee.manager_id;
        this.status = employee.status;
        this.department_history = employee.department_history || [];
        this.position_history = employee.position_history || [];
        this.rank_history = employee.rank_history || [];
        this.created_at = employee.created_at;
        this.updated_at = employee.updated_at;
        this.__v = employee.__v;
        this.position = employee.position;
        this.rank = employee.rank;
        this.department = employee.department;
    }
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID', example: '67d116b691e5366c3279162c' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사번', example: '25006' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employee_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름', example: '홍연창' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일', example: 'hong.yonchang@lumir.space' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', example: '' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생년월일', example: '1976-10-14T00:00:00.000Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', example: 'MALE' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일', example: '2025-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "hire_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 ID',
        example: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "manager_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '재직 상태', example: '재직중' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부서 이력',
        type: [Object],
        example: [],
    }),
    __metadata("design:type", Array)
], EmployeeResponseDto.prototype, "department_history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직책 이력',
        type: [Object],
        example: [],
    }),
    __metadata("design:type", Array)
], EmployeeResponseDto.prototype, "position_history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직급 이력',
        type: [Object],
        example: [],
    }),
    __metadata("design:type", Array)
], EmployeeResponseDto.prototype, "rank_history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일', example: '2025-03-12T05:08:06.261Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일', example: '2025-03-12T08:59:32.380Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB 버전', example: 0 }),
    __metadata("design:type", Number)
], EmployeeResponseDto.prototype, "__v", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 직책 정보',
        type: PositionDto,
        nullable: true,
    }),
    __metadata("design:type", PositionDto)
], EmployeeResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 직급 정보',
        type: RankDto,
        nullable: true,
    }),
    __metadata("design:type", RankDto)
], EmployeeResponseDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 부서 정보',
        type: DepartmentDto,
        nullable: true,
    }),
    __metadata("design:type", DepartmentDto)
], EmployeeResponseDto.prototype, "department", void 0);
//# sourceMappingURL=employee-response.dto.js.map
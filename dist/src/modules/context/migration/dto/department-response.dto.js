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
exports.DepartmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DepartmentResponseDto {
    constructor(department) {
        this._id = department._id;
        this.department_name = department.department_name;
        this.department_code = department.department_code;
        this.manager_id = department.manager_id;
        this.parent_department_id = department.parent_department_id;
        this.order = department.order;
        this.child_departments = department.child_departments || [];
        this.id = department.id;
        this.created_at = department.created_at;
        this.updated_at = department.updated_at;
        this.__v = department.__v;
    }
}
exports.DepartmentResponseDto = DepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 MongoDB ID', example: '67d0f1629af04fc1b2f65ad4' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명', example: '경영지원실' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "department_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서코드', example: '경영지원-경지' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "department_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부서장 ID',
        example: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "manager_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상위 부서 ID',
        example: '67d0f1189af04fc1b2f65ab7',
        nullable: true,
    }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "parent_department_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 순서', example: 0 }),
    __metadata("design:type", Number)
], DepartmentResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '하위 부서 목록',
        type: [DepartmentResponseDto],
        example: [],
    }),
    __metadata("design:type", Array)
], DepartmentResponseDto.prototype, "child_departments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID (별칭)', example: '67d0f1629af04fc1b2f65ad4' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일', example: '2025-03-12T02:28:50.885Z' }),
    __metadata("design:type", Date)
], DepartmentResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일', example: '2025-06-17T16:33:39.394Z' }),
    __metadata("design:type", Date)
], DepartmentResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB 버전', example: 0 }),
    __metadata("design:type", Number)
], DepartmentResponseDto.prototype, "__v", void 0);
//# sourceMappingURL=department-response.dto.js.map
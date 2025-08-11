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
exports.PositionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PositionResponseDto {
    constructor(position) {
        this._id = position._id;
        this.position_title = position.position_title;
        this.position_code = position.position_code;
        this.level = position.level;
        this.description = position.description;
        this.created_at = position.created_at;
        this.updated_at = position.updated_at;
        this.id = position.id;
    }
}
exports.PositionResponseDto = PositionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 MongoDB ID', example: '67d106849af04fc1b2f65be1' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책명', example: '파트장' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "position_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 코드', example: '파트장' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "position_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 레벨', example: 5 }),
    __metadata("design:type", Number)
], PositionResponseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 설명', example: '' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일', example: '2025-03-12T03:59:00.853Z' }),
    __metadata("design:type", Date)
], PositionResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일', example: '2025-06-27T08:08:15.994Z' }),
    __metadata("design:type", Date)
], PositionResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID (별칭)', example: '67d106849af04fc1b2f65be1' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "id", void 0);
//# sourceMappingURL=position-response.dto.js.map
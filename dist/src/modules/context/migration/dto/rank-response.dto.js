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
exports.RankResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RankResponseDto {
    constructor(rank) {
        this._id = rank._id;
        this.rank_name = rank.rank_name;
        this.rank_code = rank.rank_code;
        this.level = rank.level;
        this.description = rank.description;
        this.created_at = rank.created_at;
        this.updated_at = rank.updated_at;
        this.id = rank.id;
    }
}
exports.RankResponseDto = RankResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 MongoDB ID', example: '67d107c49af04fc1b2f65bf9' }),
    __metadata("design:type", String)
], RankResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급명', example: '사장' }),
    __metadata("design:type", String)
], RankResponseDto.prototype, "rank_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 코드', example: '사장' }),
    __metadata("design:type", String)
], RankResponseDto.prototype, "rank_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 레벨', example: 1 }),
    __metadata("design:type", Number)
], RankResponseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 설명', example: '' }),
    __metadata("design:type", String)
], RankResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일', example: '2025-03-12T04:04:20.303Z' }),
    __metadata("design:type", Date)
], RankResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일', example: '2025-06-17T08:31:54.817Z' }),
    __metadata("design:type", Date)
], RankResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 ID (별칭)', example: '67d107c49af04fc1b2f65bf9' }),
    __metadata("design:type", String)
], RankResponseDto.prototype, "id", void 0);
//# sourceMappingURL=rank-response.dto.js.map
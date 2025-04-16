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
exports.LogsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const log_response_dto_1 = require("./log-response.dto");
class LogsResponseDto {
}
exports.LogsResponseDto = LogsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Array of log entries', type: [log_response_dto_1.LogResponseDto] }),
    __metadata("design:type", Array)
], LogsResponseDto.prototype, "logs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of log entries matching the criteria' }),
    __metadata("design:type", Number)
], LogsResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current page number' }),
    __metadata("design:type", Number)
], LogsResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of logs per page' }),
    __metadata("design:type", Number)
], LogsResponseDto.prototype, "limit", void 0);
//# sourceMappingURL=logs-response.dto.js.map
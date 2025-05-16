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
exports.LogResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LogResponseDto {
}
exports.LogResponseDto = LogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the log entry' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp when the log was created' }),
    __metadata("design:type", Date)
], LogResponseDto.prototype, "requestTimestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'HTTP method of the request' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL path of the request' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Query parameters of the request', required: false }),
    __metadata("design:type", Object)
], LogResponseDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request headers', required: false }),
    __metadata("design:type", Object)
], LogResponseDto.prototype, "headers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request body', required: false }),
    __metadata("design:type", Object)
], LogResponseDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response status code' }),
    __metadata("design:type", Number)
], LogResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response time in milliseconds' }),
    __metadata("design:type", Number)
], LogResponseDto.prototype, "responseTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response body', required: false }),
    __metadata("design:type", Object)
], LogResponseDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Error message if any', required: false }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP address of the requester' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Host of the request' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User agent of the requester', required: false }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'System name', required: false }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "system", void 0);
//# sourceMappingURL=log-response.dto.js.map
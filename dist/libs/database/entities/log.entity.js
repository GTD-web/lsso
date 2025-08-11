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
exports.Log = void 0;
const typeorm_1 = require("typeorm");
let Log = class Log {
};
exports.Log = Log;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Log.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '호스트 정보' }),
    __metadata("design:type", String)
], Log.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'HTTP 메서드' }),
    __metadata("design:type", String)
], Log.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '요청 URL' }),
    __metadata("design:type", String)
], Log.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        comment: '요청 파라미터',
    }),
    __metadata("design:type", Object)
], Log.prototype, "params", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        comment: '쿼리 파라미터',
    }),
    __metadata("design:type", Object)
], Log.prototype, "query", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        comment: '요청 본문',
    }),
    __metadata("design:type", Object)
], Log.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'IP 주소' }),
    __metadata("design:type", String)
], Log.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '사용자 에이전트' }),
    __metadata("design:type", String)
], Log.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        nullable: true,
        comment: '요청 시작 시간',
    }),
    __metadata("design:type", Date)
], Log.prototype, "requestTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        nullable: true,
        comment: '응답 완료 시간',
    }),
    __metadata("design:type", Date)
], Log.prototype, "responseTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '응답 시간 (밀리초)',
    }),
    __metadata("design:type", Number)
], Log.prototype, "responseTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'HTTP 상태 코드',
    }),
    __metadata("design:type", Number)
], Log.prototype, "statusCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        comment: '응답 데이터',
    }),
    __metadata("design:type", Object)
], Log.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '시스템 구분자',
    }),
    __metadata("design:type", String)
], Log.prototype, "system", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        comment: '에러 정보',
    }),
    __metadata("design:type", Object)
], Log.prototype, "error", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
        comment: '에러 발생 여부',
    }),
    __metadata("design:type", Boolean)
], Log.prototype, "isError", void 0);
exports.Log = Log = __decorate([
    (0, typeorm_1.Entity)('logs'),
    (0, typeorm_1.Index)(['requestTimestamp']),
    (0, typeorm_1.Index)(['isError']),
    (0, typeorm_1.Index)(['statusCode']),
    (0, typeorm_1.Index)(['system']),
    (0, typeorm_1.Index)(['method', 'url'])
], Log);
//# sourceMappingURL=log.entity.js.map
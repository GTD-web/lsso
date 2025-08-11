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
exports.EmployeeToken = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const token_entity_1 = require("./token.entity");
let EmployeeToken = class EmployeeToken {
};
exports.EmployeeToken = EmployeeToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '직원 ID' }),
    __metadata("design:type", String)
], EmployeeToken.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '토큰 ID' }),
    __metadata("design:type", String)
], EmployeeToken.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], EmployeeToken.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => token_entity_1.Token),
    (0, typeorm_1.JoinColumn)({ name: 'tokenId' }),
    __metadata("design:type", token_entity_1.Token)
], EmployeeToken.prototype, "token", void 0);
exports.EmployeeToken = EmployeeToken = __decorate([
    (0, typeorm_1.Entity)('employee_tokens'),
    (0, typeorm_1.Index)(['employeeId', 'tokenId'], { unique: true }),
    (0, typeorm_1.Index)(['employeeId']),
    (0, typeorm_1.Index)(['tokenId'])
], EmployeeToken);
//# sourceMappingURL=employee-token.entity.js.map
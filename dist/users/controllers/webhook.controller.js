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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookUsersController = void 0;
const common_1 = require("@nestjs/common");
const webhook_usecase_1 = require("../usecases/webhook.usecase");
const swagger_1 = require("@nestjs/swagger");
let WebhookUsersController = class WebhookUsersController {
    constructor(webhookUsecase) {
        this.webhookUsecase = webhookUsecase;
    }
    async syncEmployees() {
        return await this.webhookUsecase.syncEmployees();
    }
    async webhookCreate(body) {
        console.log('created employee', body);
        await this.webhookUsecase.syncEmployees();
    }
    async webhookUpdate(body) {
        console.log('updated employee', body);
        await this.webhookUsecase.syncEmployees();
    }
    async webhookPositionChanged(body) {
        console.log('position changed', body);
        await this.webhookUsecase.syncEmployees();
    }
    async webhookDepartmentChanged(body) {
        console.log('department changed', body);
        await this.webhookUsecase.syncEmployees();
    }
    async webhookDelete(body) {
        console.log('deleted employee', body);
        await this.webhookUsecase.syncEmployees();
    }
};
exports.WebhookUsersController = WebhookUsersController;
__decorate([
    (0, common_1.Get)('sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebhookUsersController.prototype, "syncEmployees", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhookUsersController.prototype, "webhookCreate", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhookUsersController.prototype, "webhookUpdate", null);
__decorate([
    (0, common_1.Post)('position_changed'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhookUsersController.prototype, "webhookPositionChanged", null);
__decorate([
    (0, common_1.Post)('department_changed'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhookUsersController.prototype, "webhookDepartmentChanged", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhookUsersController.prototype, "webhookDelete", null);
exports.WebhookUsersController = WebhookUsersController = __decorate([
    (0, common_1.Controller)('webhook/users'),
    (0, swagger_1.ApiExcludeController)(),
    __metadata("design:paramtypes", [webhook_usecase_1.WebhookUsecase])
], WebhookUsersController);
//# sourceMappingURL=webhook.controller.js.map
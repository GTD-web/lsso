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
exports.ClientMailController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../mail.service");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const swagger_3 = require("@nestjs/swagger");
let ClientMailController = class ClientMailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendMail(body) {
        await this.mailService.sendEmail({
            recipients: body.recipients,
            subject: body.subject,
            template: body.template,
            context: body.data,
        });
    }
};
exports.ClientMailController = ClientMailController;
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_2.ApiOperation)({ summary: '이메일 발송' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                recipients: { type: 'array', items: { type: 'string' } },
                subject: { type: 'string' },
                template: { type: 'string' },
                data: { type: 'object' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientMailController.prototype, "sendMail", null);
exports.ClientMailController = ClientMailController = __decorate([
    (0, swagger_3.ApiTags)('메일'),
    (0, common_1.Controller)('mail'),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], ClientMailController);
//# sourceMappingURL=client.controller.js.map
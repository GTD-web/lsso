"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const users_service_1 = require("./services/users.service");
const webhook_controller_1 = require("./controllers/webhook.controller");
const admin_controller_1 = require("./controllers/admin.controller");
const domain_controller_1 = require("./controllers/domain.controller");
const admin_usecase_1 = require("./usecases/admin.usecase");
const webhook_usecase_1 = require("./usecases/webhook.usecase");
const jwt_1 = require("@nestjs/jwt");
const mail_module_1 = require("../mail/mail.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), mail_module_1.MailModule, jwt_1.JwtModule.register({})],
        providers: [users_service_1.UsersService, admin_usecase_1.AdminUsecase, webhook_usecase_1.WebhookUsecase],
        controllers: [webhook_controller_1.WebhookUsersController, admin_controller_1.AdminUsersController, domain_controller_1.DomainUsersController],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map
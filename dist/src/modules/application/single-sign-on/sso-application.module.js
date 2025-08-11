"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsoApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const sso_application_service_1 = require("./sso-application.service");
const sso_application_controller_1 = require("./controllers/sso-application.controller");
const authorization_context_module_1 = require("../../context/authorization/authorization-context.module");
const system_management_context_module_1 = require("../../context/system-management/system-management-context.module");
const organization_management_context_module_1 = require("../../context/organization-management/organization-management-context.module");
let SsoApplicationModule = class SsoApplicationModule {
};
exports.SsoApplicationModule = SsoApplicationModule;
exports.SsoApplicationModule = SsoApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [authorization_context_module_1.AuthorizationContextModule, system_management_context_module_1.SystemManagementContextModule, organization_management_context_module_1.OrganizationManagementContextModule],
        controllers: [sso_application_controller_1.SsoApplicationController],
        providers: [sso_application_service_1.SsoApplicationService],
        exports: [sso_application_service_1.SsoApplicationService],
    })
], SsoApplicationModule);
//# sourceMappingURL=sso-application.module.js.map
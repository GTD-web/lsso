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
exports.SystemsController = void 0;
const common_1 = require("@nestjs/common");
const systems_service_1 = require("./systems.service");
const swagger_1 = require("@nestjs/swagger");
let SystemsController = class SystemsController {
    constructor(systemsService) {
        this.systemsService = systemsService;
    }
};
exports.SystemsController = SystemsController;
exports.SystemsController = SystemsController = __decorate([
    (0, swagger_1.ApiTags)('시스템'),
    (0, common_1.Controller)('systems'),
    __metadata("design:paramtypes", [systems_service_1.SystemsService])
], SystemsController);
//# sourceMappingURL=systems.controller.js.map
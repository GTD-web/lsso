/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const core_1 = __webpack_require__(1);
const http_exception_filter_1 = __webpack_require__(6);
const app_controller_1 = __webpack_require__(7);
const app_service_1 = __webpack_require__(9);
const typeorm_config_1 = __webpack_require__(11);
const config_2 = __webpack_require__(4);
const env_config_1 = __webpack_require__(39);
const entities_1 = __webpack_require__(12);
const sso_application_module_1 = __webpack_require__(41);
const migration_module_1 = __webpack_require__(102);
const organization_information_application_module_1 = __webpack_require__(112);
const fcm_token_management_application_module_1 = __webpack_require__(130);
const admin_module_1 = __webpack_require__(151);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [env_config_1.default, env_config_1.JWT_CONFIG],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_2.ConfigService],
                useFactory: typeorm_config_1.typeOrmConfig,
            }),
            typeorm_1.TypeOrmModule.forFeature(entities_1.Entities),
            sso_application_module_1.SsoApplicationModule,
            organization_information_application_module_1.OrganizationInformationApplicationModule,
            fcm_token_management_application_module_1.FcmTokenManagementApplicationModule,
            migration_module_1.MigrationModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(2);
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse.message,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(2);
const express_1 = __webpack_require__(8);
const app_service_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(10);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async setInitialPassword(res, token) {
        return res.render('pages/set-initial-password', {
            token,
        });
    }
    async changePassword(res, token) {
        return res.render('pages/change-password', {
            token,
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('set-initial-password'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setInitialPassword", null);
__decorate([
    (0, common_1.Get)('change-password'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "changePassword", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiExcludeController)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
let AppService = class AppService {
    constructor(configService) {
        this.configService = configService;
    }
    getHello() {
        const testenv = this.configService.get('GLOBAL_SECRET');
        return testenv || 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AppService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeOrmConfig = void 0;
const entities_1 = __webpack_require__(12);
const typeOrmConfig = (configService) => {
    const isProduction = configService.get('NODE_ENV') === 'production';
    const isVercel = configService.get('database.port') === 6543;
    return {
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: entities_1.Entities,
        schema: configService.get('database.schema'),
    };
};
exports.typeOrmConfig = typeOrmConfig;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entities = exports.EmployeeSystemRole = exports.SystemRole = exports.EmployeeFcmToken = exports.FcmToken = exports.User = exports.Log = exports.SystemWebhook = exports.EmployeeToken = exports.Token = exports.System = exports.WebhookEventLog = exports.Webhook = exports.EmployeeRankHistory = exports.EmployeeDepartmentPosition = exports.Rank = exports.Position = exports.DepartmentType = exports.Department = exports.Employee = void 0;
const employee_entity_1 = __webpack_require__(13);
Object.defineProperty(exports, "Employee", ({ enumerable: true, get: function () { return employee_entity_1.Employee; } }));
const department_entity_1 = __webpack_require__(24);
Object.defineProperty(exports, "Department", ({ enumerable: true, get: function () { return department_entity_1.Department; } }));
Object.defineProperty(exports, "DepartmentType", ({ enumerable: true, get: function () { return department_entity_1.DepartmentType; } }));
const position_entity_1 = __webpack_require__(25);
Object.defineProperty(exports, "Position", ({ enumerable: true, get: function () { return position_entity_1.Position; } }));
const rank_entity_1 = __webpack_require__(22);
Object.defineProperty(exports, "Rank", ({ enumerable: true, get: function () { return rank_entity_1.Rank; } }));
const employee_department_position_entity_1 = __webpack_require__(23);
Object.defineProperty(exports, "EmployeeDepartmentPosition", ({ enumerable: true, get: function () { return employee_department_position_entity_1.EmployeeDepartmentPosition; } }));
const employee_rank_history_entity_1 = __webpack_require__(28);
Object.defineProperty(exports, "EmployeeRankHistory", ({ enumerable: true, get: function () { return employee_rank_history_entity_1.EmployeeRankHistory; } }));
const webhook_entity_1 = __webpack_require__(29);
Object.defineProperty(exports, "Webhook", ({ enumerable: true, get: function () { return webhook_entity_1.Webhook; } }));
const webhook_event_log_entity_1 = __webpack_require__(30);
Object.defineProperty(exports, "WebhookEventLog", ({ enumerable: true, get: function () { return webhook_event_log_entity_1.WebhookEventLog; } }));
const system_entity_1 = __webpack_require__(31);
Object.defineProperty(exports, "System", ({ enumerable: true, get: function () { return system_entity_1.System; } }));
const token_entity_1 = __webpack_require__(32);
Object.defineProperty(exports, "Token", ({ enumerable: true, get: function () { return token_entity_1.Token; } }));
const employee_token_entity_1 = __webpack_require__(34);
Object.defineProperty(exports, "EmployeeToken", ({ enumerable: true, get: function () { return employee_token_entity_1.EmployeeToken; } }));
const system_webhook_entity_1 = __webpack_require__(35);
Object.defineProperty(exports, "SystemWebhook", ({ enumerable: true, get: function () { return system_webhook_entity_1.SystemWebhook; } }));
const log_entity_1 = __webpack_require__(36);
Object.defineProperty(exports, "Log", ({ enumerable: true, get: function () { return log_entity_1.Log; } }));
const user_entity_1 = __webpack_require__(33);
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return user_entity_1.User; } }));
const fcm_token_entity_1 = __webpack_require__(27);
Object.defineProperty(exports, "FcmToken", ({ enumerable: true, get: function () { return fcm_token_entity_1.FcmToken; } }));
const employee_fcm_token_entity_1 = __webpack_require__(26);
Object.defineProperty(exports, "EmployeeFcmToken", ({ enumerable: true, get: function () { return employee_fcm_token_entity_1.EmployeeFcmToken; } }));
const system_role_entity_1 = __webpack_require__(37);
Object.defineProperty(exports, "SystemRole", ({ enumerable: true, get: function () { return system_role_entity_1.SystemRole; } }));
const employee_system_role_entity_1 = __webpack_require__(38);
Object.defineProperty(exports, "EmployeeSystemRole", ({ enumerable: true, get: function () { return employee_system_role_entity_1.EmployeeSystemRole; } }));
exports.Entities = [
    employee_entity_1.Employee,
    department_entity_1.Department,
    position_entity_1.Position,
    rank_entity_1.Rank,
    employee_department_position_entity_1.EmployeeDepartmentPosition,
    employee_rank_history_entity_1.EmployeeRankHistory,
    webhook_entity_1.Webhook,
    webhook_event_log_entity_1.WebhookEventLog,
    system_entity_1.System,
    token_entity_1.Token,
    employee_token_entity_1.EmployeeToken,
    system_webhook_entity_1.SystemWebhook,
    log_entity_1.Log,
    user_entity_1.User,
    fcm_token_entity_1.FcmToken,
    employee_fcm_token_entity_1.EmployeeFcmToken,
    system_role_entity_1.SystemRole,
    employee_system_role_entity_1.EmployeeSystemRole,
];


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Employee = void 0;
const typeorm_1 = __webpack_require__(14);
const enums_1 = __webpack_require__(15);
const rank_entity_1 = __webpack_require__(22);
const employee_department_position_entity_1 = __webpack_require__(23);
const employee_fcm_token_entity_1 = __webpack_require__(26);
let Employee = class Employee {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '사번' }),
    __metadata("design:type", String)
], Employee.prototype, "employeeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이름' }),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '이메일' }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '비밀번호', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '전화번호', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '생년월일', type: 'date', nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Employee.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '성별',
        type: 'enum',
        enum: enums_1.Gender,
        nullable: true,
    }),
    __metadata("design:type", typeof (_b = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _b : Object)
], Employee.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '입사일', type: 'date' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Employee.prototype, "hireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '재직 상태',
        type: 'enum',
        enum: enums_1.EmployeeStatus,
        default: enums_1.EmployeeStatus.Active,
    }),
    __metadata("design:type", typeof (_d = typeof enums_1.EmployeeStatus !== "undefined" && enums_1.EmployeeStatus) === "function" ? _d : Object)
], Employee.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '현재 직급 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "currentRankId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rank_entity_1.Rank, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'currentRankId' }),
    __metadata("design:type", typeof (_e = typeof rank_entity_1.Rank !== "undefined" && rank_entity_1.Rank) === "function" ? _e : Object)
], Employee.prototype, "currentRank", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '퇴사일', type: 'date', nullable: true }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Employee.prototype, "terminationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '초기 비밀번호 설정 여부', default: false }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isInitialPasswordSet", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_department_position_entity_1.EmployeeDepartmentPosition, (edp) => edp.employee),
    __metadata("design:type", Array)
], Employee.prototype, "departmentPositions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_fcm_token_entity_1.EmployeeFcmToken, (eft) => eft.employee),
    __metadata("design:type", Array)
], Employee.prototype, "fcmTokens", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], Employee.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], Employee.prototype, "updatedAt", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employees')
], Employee);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookExecutionStatus = exports.WebhookEntityType = exports.WebhookEventType = exports.EmployeeStatus = exports.Gender = exports.Role = void 0;
var role_type_enum_1 = __webpack_require__(16);
Object.defineProperty(exports, "Role", ({ enumerable: true, get: function () { return role_type_enum_1.Role; } }));
var gender_enum_1 = __webpack_require__(17);
Object.defineProperty(exports, "Gender", ({ enumerable: true, get: function () { return gender_enum_1.Gender; } }));
var employee_status_enum_1 = __webpack_require__(18);
Object.defineProperty(exports, "EmployeeStatus", ({ enumerable: true, get: function () { return employee_status_enum_1.EmployeeStatus; } }));
var webhook_event_type_enum_1 = __webpack_require__(19);
Object.defineProperty(exports, "WebhookEventType", ({ enumerable: true, get: function () { return webhook_event_type_enum_1.WebhookEventType; } }));
var webhook_entity_type_enum_1 = __webpack_require__(20);
Object.defineProperty(exports, "WebhookEntityType", ({ enumerable: true, get: function () { return webhook_entity_type_enum_1.WebhookEntityType; } }));
var webhook_execution_status_enum_1 = __webpack_require__(21);
Object.defineProperty(exports, "WebhookExecutionStatus", ({ enumerable: true, get: function () { return webhook_execution_status_enum_1.WebhookExecutionStatus; } }));


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
})(Role || (exports.Role = Role = {}));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "MALE";
    Gender["Female"] = "FEMALE";
    Gender["Other"] = "OTHER";
})(Gender || (exports.Gender = Gender = {}));


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeStatus = void 0;
var EmployeeStatus;
(function (EmployeeStatus) {
    EmployeeStatus["Active"] = "\uC7AC\uC9C1\uC911";
    EmployeeStatus["Leave"] = "\uD734\uC9C1";
    EmployeeStatus["Terminated"] = "\uD1F4\uC0AC";
})(EmployeeStatus || (exports.EmployeeStatus = EmployeeStatus = {}));


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookEventType = void 0;
var WebhookEventType;
(function (WebhookEventType) {
    WebhookEventType["DepartmentCreated"] = "department.created";
    WebhookEventType["DepartmentUpdated"] = "department.updated";
    WebhookEventType["DepartmentDeleted"] = "department.deleted";
    WebhookEventType["EmployeeCreated"] = "employee.created";
    WebhookEventType["EmployeeUpdated"] = "employee.updated";
    WebhookEventType["EmployeePositionChanged"] = "employee.position_changed";
    WebhookEventType["EmployeeDepartmentChanged"] = "employee.department_changed";
    WebhookEventType["EmployeeTerminated"] = "employee.terminated";
})(WebhookEventType || (exports.WebhookEventType = WebhookEventType = {}));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookEntityType = void 0;
var WebhookEntityType;
(function (WebhookEntityType) {
    WebhookEntityType["Department"] = "department";
    WebhookEntityType["Employee"] = "employee";
})(WebhookEntityType || (exports.WebhookEntityType = WebhookEntityType = {}));


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookExecutionStatus = void 0;
var WebhookExecutionStatus;
(function (WebhookExecutionStatus) {
    WebhookExecutionStatus["Pending"] = "pending";
    WebhookExecutionStatus["Executing"] = "executing";
    WebhookExecutionStatus["Success"] = "success";
    WebhookExecutionStatus["Failed"] = "failed";
    WebhookExecutionStatus["Timeout"] = "timeout";
    WebhookExecutionStatus["Cancelled"] = "cancelled";
    WebhookExecutionStatus["Retry"] = "retry";
})(WebhookExecutionStatus || (exports.WebhookExecutionStatus = WebhookExecutionStatus = {}));


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rank = void 0;
const typeorm_1 = __webpack_require__(14);
let Rank = class Rank {
};
exports.Rank = Rank;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Rank.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직급명' }),
    __metadata("design:type", String)
], Rank.prototype, "rankName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '직급 코드' }),
    __metadata("design:type", String)
], Rank.prototype, "rankCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직급 레벨 (낮을수록 상위 직급)' }),
    __metadata("design:type", Number)
], Rank.prototype, "level", void 0);
exports.Rank = Rank = __decorate([
    (0, typeorm_1.Entity)('ranks')
], Rank);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeDepartmentPosition = exports.ManagerType = void 0;
const typeorm_1 = __webpack_require__(14);
const employee_entity_1 = __webpack_require__(13);
const department_entity_1 = __webpack_require__(24);
const position_entity_1 = __webpack_require__(25);
var ManagerType;
(function (ManagerType) {
    ManagerType["DIRECT"] = "direct";
    ManagerType["FUNCTIONAL"] = "functional";
    ManagerType["PROJECT"] = "project";
    ManagerType["TEMPORARY"] = "temporary";
    ManagerType["DEPUTY"] = "deputy";
})(ManagerType || (exports.ManagerType = ManagerType = {}));
let EmployeeDepartmentPosition = class EmployeeDepartmentPosition {
};
exports.EmployeeDepartmentPosition = EmployeeDepartmentPosition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직원 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '부서 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직책 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeDepartmentPosition.prototype, "positionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '관리자 권한 여부', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], EmployeeDepartmentPosition.prototype, "isManager", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], EmployeeDepartmentPosition.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EmployeeDepartmentPosition.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_c = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _c : Object)
], EmployeeDepartmentPosition.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'departmentId' }),
    __metadata("design:type", typeof (_d = typeof department_entity_1.Department !== "undefined" && department_entity_1.Department) === "function" ? _d : Object)
], EmployeeDepartmentPosition.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => position_entity_1.Position),
    (0, typeorm_1.JoinColumn)({ name: 'positionId' }),
    __metadata("design:type", typeof (_e = typeof position_entity_1.Position !== "undefined" && position_entity_1.Position) === "function" ? _e : Object)
], EmployeeDepartmentPosition.prototype, "position", void 0);
exports.EmployeeDepartmentPosition = EmployeeDepartmentPosition = __decorate([
    (0, typeorm_1.Entity)('employee_department_positions'),
    (0, typeorm_1.Unique)(['employeeId', 'departmentId']),
    (0, typeorm_1.Index)(['employeeId']),
    (0, typeorm_1.Index)(['departmentId']),
    (0, typeorm_1.Index)(['positionId'])
], EmployeeDepartmentPosition);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Department = exports.DepartmentType = void 0;
const typeorm_1 = __webpack_require__(14);
var DepartmentType;
(function (DepartmentType) {
    DepartmentType["COMPANY"] = "COMPANY";
    DepartmentType["DIVISION"] = "DIVISION";
    DepartmentType["DEPARTMENT"] = "DEPARTMENT";
    DepartmentType["TEAM"] = "TEAM";
})(DepartmentType || (exports.DepartmentType = DepartmentType = {}));
let Department = class Department {
};
exports.Department = Department;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Department.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '부서명' }),
    __metadata("design:type", String)
], Department.prototype, "departmentName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '부서 코드' }),
    __metadata("design:type", String)
], Department.prototype, "departmentCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '유형', type: 'enum', enum: DepartmentType, default: DepartmentType.DEPARTMENT }),
    __metadata("design:type", String)
], Department.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '상위 부서 ID', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '정렬 순서', default: 0 }),
    __metadata("design:type", Number)
], Department.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Department, (department) => department.childDepartments, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentDepartmentId' }),
    __metadata("design:type", Department)
], Department.prototype, "parentDepartment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Department, (department) => department.parentDepartment),
    __metadata("design:type", Array)
], Department.prototype, "childDepartments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Department.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Department.prototype, "updatedAt", void 0);
exports.Department = Department = __decorate([
    (0, typeorm_1.Entity)('departments')
], Department);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Position = void 0;
const typeorm_1 = __webpack_require__(14);
let Position = class Position {
};
exports.Position = Position;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Position.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직책명 (예: 부서장, 파트장, 팀장, 직원)' }),
    __metadata("design:type", String)
], Position.prototype, "positionTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '직책 코드 (예: DEPT_HEAD, PART_HEAD, TEAM_LEADER, STAFF)' }),
    __metadata("design:type", String)
], Position.prototype, "positionCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직책 레벨 (낮을수록 상위 직책)' }),
    __metadata("design:type", Number)
], Position.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '관리 권한 여부', default: false }),
    __metadata("design:type", Boolean)
], Position.prototype, "hasManagementAuthority", void 0);
exports.Position = Position = __decorate([
    (0, typeorm_1.Entity)('positions')
], Position);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeFcmToken = void 0;
const typeorm_1 = __webpack_require__(14);
const employee_entity_1 = __webpack_require__(13);
const fcm_token_entity_1 = __webpack_require__(27);
let EmployeeFcmToken = class EmployeeFcmToken {
};
exports.EmployeeFcmToken = EmployeeFcmToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeFcmToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '직원 ID' }),
    __metadata("design:type", String)
], EmployeeFcmToken.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: 'FCM 토큰 ID' }),
    __metadata("design:type", String)
], EmployeeFcmToken.prototype, "fcmTokenId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '연결 생성일' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], EmployeeFcmToken.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '연결 수정일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EmployeeFcmToken.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_c = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _c : Object)
], EmployeeFcmToken.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => fcm_token_entity_1.FcmToken),
    (0, typeorm_1.JoinColumn)({ name: 'fcmTokenId' }),
    __metadata("design:type", typeof (_d = typeof fcm_token_entity_1.FcmToken !== "undefined" && fcm_token_entity_1.FcmToken) === "function" ? _d : Object)
], EmployeeFcmToken.prototype, "fcmToken", void 0);
exports.EmployeeFcmToken = EmployeeFcmToken = __decorate([
    (0, typeorm_1.Entity)('employee_fcm_tokens'),
    (0, typeorm_1.Index)(['employeeId', 'fcmTokenId'], { unique: true }),
    (0, typeorm_1.Index)(['employeeId']),
    (0, typeorm_1.Index)(['fcmTokenId'])
], EmployeeFcmToken);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmToken = void 0;
const typeorm_1 = __webpack_require__(14);
let FcmToken = class FcmToken {
};
exports.FcmToken = FcmToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FcmToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: 'FCM 토큰 값', unique: true }),
    __metadata("design:type", String)
], FcmToken.prototype, "fcmToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: '디바이스 타입 (예: android, ios, pc, web)',
        default: 'pc',
    }),
    __metadata("design:type", String)
], FcmToken.prototype, "deviceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', comment: '디바이스 정보', nullable: true }),
    __metadata("design:type", Object)
], FcmToken.prototype, "deviceInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', comment: '활성화 상태', default: true }),
    __metadata("design:type", Boolean)
], FcmToken.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FcmToken.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], FcmToken.prototype, "updatedAt", void 0);
exports.FcmToken = FcmToken = __decorate([
    (0, typeorm_1.Entity)('fcm_tokens'),
    (0, typeorm_1.Index)(['fcmToken'], { unique: true }),
    (0, typeorm_1.Index)(['isActive'])
], FcmToken);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeRankHistory = exports.PromotionType = void 0;
const typeorm_1 = __webpack_require__(14);
const employee_entity_1 = __webpack_require__(13);
const rank_entity_1 = __webpack_require__(22);
var PromotionType;
(function (PromotionType) {
    PromotionType["INITIAL"] = "initial";
    PromotionType["PROMOTION"] = "promotion";
    PromotionType["DEMOTION"] = "demotion";
    PromotionType["ADJUSTMENT"] = "adjustment";
})(PromotionType || (exports.PromotionType = PromotionType = {}));
let EmployeeRankHistory = class EmployeeRankHistory {
};
exports.EmployeeRankHistory = EmployeeRankHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직원 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직급 ID', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeRankHistory.prototype, "rankId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], EmployeeRankHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EmployeeRankHistory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], EmployeeRankHistory.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rank_entity_1.Rank),
    (0, typeorm_1.JoinColumn)({ name: 'rankId' }),
    __metadata("design:type", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], EmployeeRankHistory.prototype, "rank", void 0);
exports.EmployeeRankHistory = EmployeeRankHistory = __decorate([
    (0, typeorm_1.Entity)('employee_rank_histories'),
    (0, typeorm_1.Index)(['employeeId', 'rankId'])
], EmployeeRankHistory);


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Webhook = void 0;
const typeorm_1 = __webpack_require__(14);
let Webhook = class Webhook {
};
exports.Webhook = Webhook;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Webhook.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '웹훅 이름' }),
    __metadata("design:type", String)
], Webhook.prototype, "webhookName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '설명', nullable: true }),
    __metadata("design:type", String)
], Webhook.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '대상 URL' }),
    __metadata("design:type", String)
], Webhook.prototype, "targetUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이벤트 유형' }),
    __metadata("design:type", String)
], Webhook.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '엔티티 유형' }),
    __metadata("design:type", String)
], Webhook.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '시크릿 키', nullable: true }),
    __metadata("design:type", String)
], Webhook.prototype, "secretKey", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '헤더 정보 (JSON 형식)',
        type: 'jsonb',
        nullable: true,
    }),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], Webhook.prototype, "headers", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '활성화 상태',
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Webhook.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '재시도 횟수',
        type: 'int',
        default: 3,
    }),
    __metadata("design:type", Number)
], Webhook.prototype, "retryCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '타임아웃 시간(초)',
        type: 'int',
        default: 30,
    }),
    __metadata("design:type", Number)
], Webhook.prototype, "timeoutSeconds", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일시' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Webhook.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일시' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Webhook.prototype, "updatedAt", void 0);
exports.Webhook = Webhook = __decorate([
    (0, typeorm_1.Entity)('webhooks')
], Webhook);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookEventLog = void 0;
const typeorm_1 = __webpack_require__(14);
let WebhookEventLog = class WebhookEventLog {
};
exports.WebhookEventLog = WebhookEventLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '웹훅 ID' }),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "webhookId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이벤트 유형' }),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '엔티티 ID' }),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '페이로드 데이터 (JSON 형식)',
        type: 'jsonb',
    }),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], WebhookEventLog.prototype, "payload", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '응답 상태 코드',
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], WebhookEventLog.prototype, "responseCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '응답 본문',
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], WebhookEventLog.prototype, "responseBody", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '시도 횟수',
        type: 'int',
        default: 1,
    }),
    __metadata("design:type", Number)
], WebhookEventLog.prototype, "attemptCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '성공 여부',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], WebhookEventLog.prototype, "isSuccess", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '마지막 시도 시간',
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], WebhookEventLog.prototype, "lastAttemptAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일시' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], WebhookEventLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Webhook', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'webhookId' }),
    __metadata("design:type", Object)
], WebhookEventLog.prototype, "webhook", void 0);
exports.WebhookEventLog = WebhookEventLog = __decorate([
    (0, typeorm_1.Entity)('webhook_event_logs'),
    (0, typeorm_1.Index)(['webhookId']),
    (0, typeorm_1.Index)(['eventType']),
    (0, typeorm_1.Index)(['entityId']),
    (0, typeorm_1.Index)(['isSuccess']),
    (0, typeorm_1.Index)(['createdAt'])
], WebhookEventLog);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.System = void 0;
const typeorm_1 = __webpack_require__(14);
let System = class System {
};
exports.System = System;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], System.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '클라이언트 ID' }),
    __metadata("design:type", String)
], System.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '클라이언트 시크릿' }),
    __metadata("design:type", String)
], System.prototype, "clientSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '시스템 이름' }),
    __metadata("design:type", String)
], System.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '시스템 설명' }),
    __metadata("design:type", String)
], System.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '도메인' }),
    __metadata("design:type", String)
], System.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        default: [],
        comment: '허용된 오리진 목록',
    }),
    __metadata("design:type", Array)
], System.prototype, "allowedOrigin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '헬스체크 URL' }),
    __metadata("design:type", String)
], System.prototype, "healthCheckUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
        comment: '활성화 상태',
    }),
    __metadata("design:type", Boolean)
], System.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일시' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], System.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일시' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], System.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ comment: '삭제일시' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], System.prototype, "deletedAt", void 0);
exports.System = System = __decorate([
    (0, typeorm_1.Entity)('systems')
], System);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Token = void 0;
const typeorm_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(33);
let Token = class Token {
};
exports.Token = Token;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Token.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '액세스 토큰' }),
    __metadata("design:type", String)
], Token.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '토큰 만료일시' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Token.prototype, "tokenExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '리프레시 토큰', nullable: true }),
    __metadata("design:type", String)
], Token.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '리프레시 토큰 만료일시', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Token.prototype, "refreshTokenExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '클라이언트 정보 (브라우저, 앱 등)',
    }),
    __metadata("design:type", String)
], Token.prototype, "clientInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'IP 주소',
    }),
    __metadata("design:type", String)
], Token.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Token.prototype, "lastAccess", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Token.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일시' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Token.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Token.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Token.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.tokens, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_f = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _f : Object)
], Token.prototype, "user", void 0);
exports.Token = Token = __decorate([
    (0, typeorm_1.Entity)('tokens')
], Token);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(14);
const token_entity_1 = __webpack_require__(32);
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '사번' }),
    __metadata("design:type", String)
], User.prototype, "employeeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이름' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '이메일' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '비밀번호' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '전화번호', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '생년월일', nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '성별', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '입사일', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "hireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '재직 상태', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '부서', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직위', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '직급', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '초기 비밀번호 설정 여부', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isInitialPasswordSet", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => token_entity_1.Token, (token) => token.user),
    __metadata("design:type", Array)
], User.prototype, "tokens", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeToken = void 0;
const typeorm_1 = __webpack_require__(14);
const employee_entity_1 = __webpack_require__(13);
const token_entity_1 = __webpack_require__(32);
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
    __metadata("design:type", typeof (_a = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _a : Object)
], EmployeeToken.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => token_entity_1.Token),
    (0, typeorm_1.JoinColumn)({ name: 'tokenId' }),
    __metadata("design:type", typeof (_b = typeof token_entity_1.Token !== "undefined" && token_entity_1.Token) === "function" ? _b : Object)
], EmployeeToken.prototype, "token", void 0);
exports.EmployeeToken = EmployeeToken = __decorate([
    (0, typeorm_1.Entity)('employee_tokens'),
    (0, typeorm_1.Index)(['employeeId', 'tokenId'], { unique: true }),
    (0, typeorm_1.Index)(['employeeId']),
    (0, typeorm_1.Index)(['tokenId'])
], EmployeeToken);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemWebhook = void 0;
const typeorm_1 = __webpack_require__(14);
let SystemWebhook = class SystemWebhook {
};
exports.SystemWebhook = SystemWebhook;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SystemWebhook.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '시스템 ID' }),
    __metadata("design:type", String)
], SystemWebhook.prototype, "systemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '웹훅 ID' }),
    __metadata("design:type", String)
], SystemWebhook.prototype, "webhookId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: '마지막 실행일시',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], SystemWebhook.prototype, "lastExecutedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
        comment: '총 실행 횟수',
    }),
    __metadata("design:type", Number)
], SystemWebhook.prototype, "executionCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
        comment: '성공 횟수',
    }),
    __metadata("design:type", Number)
], SystemWebhook.prototype, "successCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
        comment: '실패 횟수',
    }),
    __metadata("design:type", Number)
], SystemWebhook.prototype, "failureCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일시' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], SystemWebhook.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('System', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'systemId' }),
    __metadata("design:type", Object)
], SystemWebhook.prototype, "system", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('Webhook', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'webhookId' }),
    __metadata("design:type", Object)
], SystemWebhook.prototype, "webhook", void 0);
exports.SystemWebhook = SystemWebhook = __decorate([
    (0, typeorm_1.Entity)('system_webhooks'),
    (0, typeorm_1.Index)(['systemId', 'webhookId'], { unique: true }),
    (0, typeorm_1.Index)(['systemId']),
    (0, typeorm_1.Index)(['webhookId'])
], SystemWebhook);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Log = void 0;
const typeorm_1 = __webpack_require__(14);
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Log.prototype, "requestTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        nullable: true,
        comment: '응답 완료 시간',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
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


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemRole = void 0;
const typeorm_1 = __webpack_require__(14);
const system_entity_1 = __webpack_require__(31);
const employee_system_role_entity_1 = __webpack_require__(38);
let SystemRole = class SystemRole {
};
exports.SystemRole = SystemRole;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SystemRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '시스템 ID' }),
    __metadata("design:type", String)
], SystemRole.prototype, "systemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_entity_1.System, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'systemId' }),
    __metadata("design:type", typeof (_a = typeof system_entity_1.System !== "undefined" && system_entity_1.System) === "function" ? _a : Object)
], SystemRole.prototype, "system", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '역할 이름' }),
    __metadata("design:type", String)
], SystemRole.prototype, "roleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '역할 코드' }),
    __metadata("design:type", String)
], SystemRole.prototype, "roleCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '역할 설명' }),
    __metadata("design:type", String)
], SystemRole.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        default: [],
        comment: '권한 목록',
    }),
    __metadata("design:type", Array)
], SystemRole.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '정렬 순서', default: 0 }),
    __metadata("design:type", Number)
], SystemRole.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, comment: '활성화 상태' }),
    __metadata("design:type", Boolean)
], SystemRole.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_system_role_entity_1.EmployeeSystemRole, (esr) => esr.systemRole),
    __metadata("design:type", Array)
], SystemRole.prototype, "employeeSystemRoles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], SystemRole.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], SystemRole.prototype, "updatedAt", void 0);
exports.SystemRole = SystemRole = __decorate([
    (0, typeorm_1.Entity)('system_roles'),
    (0, typeorm_1.Index)(['systemId', 'roleCode'], { unique: true }),
    (0, typeorm_1.Index)(['systemId', 'isActive'])
], SystemRole);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeSystemRole = void 0;
const typeorm_1 = __webpack_require__(14);
const employee_entity_1 = __webpack_require__(13);
const system_role_entity_1 = __webpack_require__(37);
let EmployeeSystemRole = class EmployeeSystemRole {
};
exports.EmployeeSystemRole = EmployeeSystemRole;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeSystemRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '직원 ID' }),
    __metadata("design:type", String)
], EmployeeSystemRole.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_a = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _a : Object)
], EmployeeSystemRole.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', comment: '시스템 역할 ID' }),
    __metadata("design:type", String)
], EmployeeSystemRole.prototype, "systemRoleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => system_role_entity_1.SystemRole, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'systemRoleId' }),
    __metadata("design:type", typeof (_b = typeof system_role_entity_1.SystemRole !== "undefined" && system_role_entity_1.SystemRole) === "function" ? _b : Object)
], EmployeeSystemRole.prototype, "systemRole", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], EmployeeSystemRole.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], EmployeeSystemRole.prototype, "updatedAt", void 0);
exports.EmployeeSystemRole = EmployeeSystemRole = __decorate([
    (0, typeorm_1.Entity)('employee_system_roles'),
    (0, typeorm_1.Index)(['employeeId', 'systemRoleId'], { unique: true }),
    (0, typeorm_1.Index)(['employeeId']),
    (0, typeorm_1.Index)(['systemRoleId']),
    (0, typeorm_1.Index)(['createdAt'])
], EmployeeSystemRole);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FIREBASE_CONFIG = exports.APP_CONFIG = exports.WEB_PUSH_CONFIG = exports.JWT_CONFIG = exports.ENV = void 0;
const dotenv_1 = __webpack_require__(40);
const config_1 = __webpack_require__(4);
(0, dotenv_1.config)();
exports.ENV = process.env;
exports["default"] = (0, config_1.registerAs)('database', () => {
    return {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USER || 'admin',
        password: process.env.POSTGRES_PASSWORD || 'tech7admin!',
        database: process.env.POSTGRES_DATABASE || 'resource-server',
        schema: process.env.POSTGRES_SCHEMA || 'public',
    };
});
exports.JWT_CONFIG = (0, config_1.registerAs)('jwt', () => {
    return {
        secret: process.env.GLOBAL_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    };
});
exports.WEB_PUSH_CONFIG = (0, config_1.registerAs)('webPush', () => {
    return {
        publicKey: process.env.WEB_PUSH_PUBLIC_KEY,
        privateKey: process.env.WEB_PUSH_PRIVATE_KEY,
    };
});
exports.APP_CONFIG = (0, config_1.registerAs)('app', () => {
    return {
        url: process.env.NODE_ENV === 'production' ? 'http://localhost:5001' : 'http://localhost:3000',
        port: process.env.NODE_ENV === 'production' ? 5001 : 3000,
        storage: {
            type: process.env.NODE_ENV,
        },
    };
});
exports.FIREBASE_CONFIG = (0, config_1.registerAs)('firebase', () => {
    return {
        type: process.env.FIREBASE_TYPE,
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        clientId: process.env.FIREBASE_CLIENT_ID,
        authUri: process.env.FIREBASE_AUTH_URI,
        tokenUri: process.env.FIREBASE_TOKEN_URI,
        authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    };
});


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SsoApplicationModule = void 0;
const common_1 = __webpack_require__(2);
const sso_application_service_1 = __webpack_require__(42);
const sso_application_controller_1 = __webpack_require__(75);
const authorization_context_module_1 = __webpack_require__(83);
const system_management_context_module_1 = __webpack_require__(88);
const organization_management_context_module_1 = __webpack_require__(96);
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


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SsoApplicationService = void 0;
const common_1 = __webpack_require__(2);
const authorization_context_service_1 = __webpack_require__(43);
const system_management_context_service_1 = __webpack_require__(59);
const organization_management_context_service_1 = __webpack_require__(64);
let SsoApplicationService = class SsoApplicationService {
    constructor(authorizationContextService, systemManagementContextService, organizationContextService) {
        this.authorizationContextService = authorizationContextService;
        this.systemManagementContextService = systemManagementContextService;
        this.organizationContextService = organizationContextService;
    }
    async login(body, authHeader) {
        const { grant_type, email, password, refresh_token } = body;
        let employee;
        switch (grant_type) {
            case 'password':
                employee = await this.authorizationContextService.로그인정보를_검증한다(email, password);
                break;
            case 'refresh_token':
                employee = await this.authorizationContextService.리프레시토큰을_검증한다(refresh_token);
                break;
            default:
                throw new common_1.BadRequestException('지원하지 않는 grant_type입니다.');
        }
        const { department, position, rank } = await this.organizationContextService.직원의_부서_직책_직급을_조회한다(employee);
        const employeeSystemRoles = await this.systemManagementContextService.직원의_시스템역할목록을_조회한다(employee.id);
        const systemRolesMap = {};
        for (const employeeSystemRole of employeeSystemRoles) {
            if (employeeSystemRole.systemRole && employeeSystemRole.systemRole.system) {
                const systemCode = employeeSystemRole.systemRole.system.name;
                const roleCode = employeeSystemRole.systemRole.roleCode;
                if (!systemRolesMap[systemCode]) {
                    systemRolesMap[systemCode] = [];
                }
                systemRolesMap[systemCode].push(roleCode);
            }
        }
        const token = await this.authorizationContextService.토큰정보를_생성한다(employee);
        console.log('token', token);
        return {
            tokenType: 'Bearer',
            accessToken: token.accessToken,
            expiresAt: token.tokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            id: employee.id,
            name: employee.name,
            email: employee.email,
            employeeNumber: employee.employeeNumber,
            phoneNumber: employee.phoneNumber,
            dateOfBirth: employee.dateOfBirth,
            gender: employee.gender,
            hireDate: employee.hireDate,
            status: employee.status,
            department: department?.departmentCode || '',
            position: position?.positionTitle || '',
            rank: rank?.rankName || '',
            systemRoles: systemRolesMap,
        };
    }
    async verifyToken(authHeader) {
        const result = this.BEARER_헤더_파싱하기(authHeader);
        if (!result) {
            throw new common_1.UnauthorizedException('유효하지 않은 인증정보입니다.');
        }
        const { accessToken } = result;
        console.log('accessToken', accessToken);
        const { employee, token } = await this.authorizationContextService.엑세스토큰을_검증한다(accessToken);
        return {
            valid: true,
            user_info: {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                employee_number: employee.employeeNumber,
            },
            expires_in: this.만료시간을_초_단위로_계산하기(token.tokenExpiresAt),
        };
    }
    async changePassword(authHeader, body) {
        const result = this.BEARER_헤더_파싱하기(authHeader);
        if (!result) {
            throw new common_1.UnauthorizedException('유효하지 않은 인증정보입니다.');
        }
        const { accessToken } = result;
        const { employee } = await this.authorizationContextService.엑세스토큰을_검증한다(accessToken);
        const { newPassword } = body;
        await this.authorizationContextService.비밀번호를_변경한다(employee, newPassword);
        return {
            message: '비밀번호가 성공적으로 변경되었습니다.',
        };
    }
    async checkPassword(authHeader, body) {
        const result = this.BEARER_헤더_파싱하기(authHeader);
        if (!result) {
            throw new common_1.UnauthorizedException('유효하지 않은 인증정보입니다.');
        }
        const { accessToken } = result;
        const { employee } = await this.authorizationContextService.엑세스토큰을_검증한다(accessToken);
        const { currentPassword } = body;
        const isPasswordValid = await this.authorizationContextService.비밀번호를_검증한다(employee, currentPassword);
        return {
            isValid: isPasswordValid,
        };
    }
    BASIC_헤더_파싱하기(authHeader) {
        try {
            if (!authHeader || !authHeader.startsWith('Basic ')) {
                return null;
            }
            const base64Credentials = authHeader.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
            const [clientId, clientSecret] = credentials.split(':');
            if (!clientId || !clientSecret) {
                return null;
            }
            return { clientId, clientSecret };
        }
        catch (error) {
            console.error('Basic Auth 헤더 파싱 중 오류:', error);
            return null;
        }
    }
    BEARER_헤더_파싱하기(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        const accessToken = authHeader.split(' ')[1];
        return { accessToken };
    }
    만료시간을_초_단위로_계산하기(expiresAt) {
        const now = new Date();
        const diffMs = expiresAt.getTime() - now.getTime();
        return Math.floor(diffMs / 1000);
    }
    async 만료된_토큰을_정리한다() {
        return await this.authorizationContextService.만료된_토큰을_정리한다();
    }
};
exports.SsoApplicationService = SsoApplicationService;
exports.SsoApplicationService = SsoApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof authorization_context_service_1.AuthorizationContextService !== "undefined" && authorization_context_service_1.AuthorizationContextService) === "function" ? _a : Object, typeof (_b = typeof system_management_context_service_1.SystemManagementContextService !== "undefined" && system_management_context_service_1.SystemManagementContextService) === "function" ? _b : Object, typeof (_c = typeof organization_management_context_service_1.OrganizationContextService !== "undefined" && organization_management_context_service_1.OrganizationContextService) === "function" ? _c : Object])
], SsoApplicationService);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthorizationContextService = void 0;
const common_1 = __webpack_require__(2);
const employee_service_1 = __webpack_require__(44);
const token_service_1 = __webpack_require__(50);
const system_service_1 = __webpack_require__(53);
const employee_token_service_1 = __webpack_require__(57);
let AuthorizationContextService = class AuthorizationContextService {
    constructor(직원서비스, 토큰서비스, 시스템서비스, 직원토큰서비스) {
        this.직원서비스 = 직원서비스;
        this.토큰서비스 = 토큰서비스;
        this.시스템서비스 = 시스템서비스;
        this.직원토큰서비스 = 직원토큰서비스;
    }
    async 시스템을_인증한다(clientId, clientSecret) {
        const system = await this.시스템서비스.findByClientId(clientId);
        if (!system) {
            throw new common_1.UnauthorizedException('유효하지 않은 클라이언트 ID입니다.');
        }
        if (!system.isActive) {
            throw new common_1.UnauthorizedException({ message: '비활성화된 시스템입니다.', system: system.name });
        }
        const isVerified = await this.시스템서비스.verifyClientSecret(clientSecret, system);
        if (!isVerified) {
            throw new common_1.UnauthorizedException('유효하지 않은 클라이언트 시크릿입니다.');
        }
        return system;
    }
    async 로그인정보를_검증한다(email, password) {
        const employee = await this.직원서비스.findByEmail(email);
        if (!employee) {
            throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
        }
        if (employee.status === '퇴사') {
            throw new common_1.UnauthorizedException('퇴사한 사용자입니다.');
        }
        const isPasswordValid = await this.직원서비스.verifyPassword(password, employee);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
        return employee;
    }
    async 엑세스토큰을_검증한다(accessToken) {
        const token = await this.토큰서비스.findByAccessToken(accessToken);
        if (new Date() > token.tokenExpiresAt) {
            throw new common_1.UnauthorizedException('만료된 토큰입니다.');
        }
        const payload = this.토큰서비스.verifyJwtToken(accessToken);
        const employee = await this.직원서비스.findByEmployeeId(payload.sub);
        if (!employee) {
            throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
        }
        return { employee, token };
    }
    async 리프레시토큰을_검증한다(refresh_token) {
        const token = await this.토큰서비스.findByRefreshToken(refresh_token);
        if (new Date() > token.refreshTokenExpiresAt) {
            throw new common_1.UnauthorizedException('만료된 리프레시 토큰입니다.');
        }
        const payload = this.토큰서비스.verifyJwtToken(refresh_token);
        const employee = await this.직원서비스.findByEmployeeId(payload.sub);
        if (!employee) {
            throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
        }
        return employee;
    }
    async 토큰정보를_생성한다(employee) {
        const expiresInDays = 1;
        const refreshExpiresInDays = 30;
        const payload = {
            sub: employee.id,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.토큰서비스.generateJwtToken(payload, '1d');
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.토큰서비스.generateJwtToken(refreshPayload, `${refreshExpiresInDays}d`);
        const now = new Date();
        const tokenExpiresAt = new Date(now.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
        const refreshTokenExpiresAt = new Date(now.getTime() + refreshExpiresInDays * 24 * 60 * 60 * 1000);
        const token = await this.토큰서비스.save({
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
        });
        await this.직원토큰서비스.save({
            employeeId: employee.id,
            tokenId: token.id,
        });
        return token;
    }
    async 비밀번호를_변경한다(employee, newPassword) {
        const hashedPassword = this.직원서비스.hashPassword(newPassword);
        await this.직원서비스.updatePassword(employee.id, hashedPassword);
    }
    async 비밀번호를_검증한다(employee, password) {
        return await this.직원서비스.verifyPassword(password, employee);
    }
    async 만료된_토큰을_정리한다() {
        const expiredTokens = await this.토큰서비스.findExpiredTokens();
        if (expiredTokens.length === 0) {
            return {
                deletedCount: 0,
                message: '삭제할 만료된 토큰이 없습니다.',
            };
        }
        const tokenIds = expiredTokens.map((token) => token.id);
        await this.직원토큰서비스.deleteByTokenIds(tokenIds);
        const result = await this.토큰서비스.deleteExpiredTokens();
        return {
            deletedCount: result.deletedCount,
            message: `만료된 토큰 ${result.deletedCount}개가 성공적으로 삭제되었습니다.`,
        };
    }
};
exports.AuthorizationContextService = AuthorizationContextService;
exports.AuthorizationContextService = AuthorizationContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object, typeof (_b = typeof token_service_1.DomainTokenService !== "undefined" && token_service_1.DomainTokenService) === "function" ? _b : Object, typeof (_c = typeof system_service_1.DomainSystemService !== "undefined" && system_service_1.DomainSystemService) === "function" ? _c : Object, typeof (_d = typeof employee_token_service_1.DomainEmployeeTokenService !== "undefined" && employee_token_service_1.DomainEmployeeTokenService) === "function" ? _d : Object])
], AuthorizationContextService);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeService = void 0;
const common_1 = __webpack_require__(2);
const employee_repository_1 = __webpack_require__(45);
const base_service_1 = __webpack_require__(47);
const enums_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(14);
const bcrypt = __webpack_require__(49);
let DomainEmployeeService = class DomainEmployeeService extends base_service_1.BaseService {
    constructor(employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
    }
    async findByEmployeeId(employeeId) {
        const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
        return employee;
    }
    async findByEmail(email) {
        const employee = await this.employeeRepository.findOne({
            where: { email },
        });
        return employee;
    }
    async findByEmployeeNumber(employeeNumber) {
        const employee = await this.employeeRepository.findOne({ where: { employeeNumber } });
        return employee;
    }
    async updatePassword(employeeId, hashedPassword) {
        return this.update(employeeId, { password: hashedPassword });
    }
    hashPassword(password = '1234') {
        return bcrypt.hashSync(password, 10);
    }
    async verifyPassword(password, employee) {
        return bcrypt.compare(password, employee.password);
    }
    async bulkSave(employees) {
        const savedEmployees = [];
        for (const employee of employees) {
            const saved = await this.save(employee);
            savedEmployees.push(saved);
        }
        return savedEmployees;
    }
    async findByEmployeeIds(employeeIds, includeTerminated = false) {
        const where = { id: (0, typeorm_1.In)(employeeIds) };
        if (!includeTerminated) {
            where.status = (0, typeorm_1.Not)(enums_1.EmployeeStatus.Terminated);
        }
        return this.employeeRepository.findAll({ where });
    }
    async findByEmployeeNumbers(employeeNumbers, includeTerminated = false) {
        const where = { employeeNumber: (0, typeorm_1.In)(employeeNumbers) };
        if (!includeTerminated) {
            where.status = (0, typeorm_1.Not)(enums_1.EmployeeStatus.Terminated);
        }
        return this.employeeRepository.findAll({ where });
    }
    async findAllEmployees(includeTerminated = false) {
        const where = {};
        if (!includeTerminated) {
            where.status = (0, typeorm_1.Not)(enums_1.EmployeeStatus.Terminated);
        }
        return this.employeeRepository.findAll({
            where,
            order: { employeeNumber: 'ASC' },
        });
    }
    async findByRankId(rankId) {
        return this.employeeRepository.findAll({
            where: { currentRankId: rankId },
            order: { employeeNumber: 'ASC' },
        });
    }
    async createEmployee(data) {
        return this.save({
            ...data,
            password: this.hashPassword(data.employeeNumber),
            isInitialPasswordSet: true,
        });
    }
    async updateEmployee(employeeId, data) {
        return this.update(employeeId, data);
    }
    async deleteEmployee(employeeId) {
        return this.delete(employeeId);
    }
};
exports.DomainEmployeeService = DomainEmployeeService;
exports.DomainEmployeeService = DomainEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_repository_1.DomainEmployeeRepository !== "undefined" && employee_repository_1.DomainEmployeeRepository) === "function" ? _a : Object])
], DomainEmployeeService);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const employee_entity_1 = __webpack_require__(13);
const base_repository_1 = __webpack_require__(46);
let DomainEmployeeRepository = class DomainEmployeeRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainEmployeeRepository = DomainEmployeeRepository;
exports.DomainEmployeeRepository = DomainEmployeeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainEmployeeRepository);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
let BaseRepository = class BaseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(entity, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return repository.create(entity);
    }
    async save(entity, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return repository.save(entity);
    }
    async findOne(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return await repository.findOne({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            select: repositoryOptions?.select,
            order: repositoryOptions?.order,
            withDeleted: repositoryOptions?.withDeleted,
        });
    }
    async findAll(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            select: repositoryOptions?.select,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
            withDeleted: repositoryOptions?.withDeleted,
        });
    }
    async update(entityId, entityData, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        const primaryColumn = repository.metadata.primaryColumns[0].propertyName;
        await repository.update(entityId, entityData);
        const updated = await repository.findOne({
            where: { [primaryColumn]: entityId },
            relations: repositoryOptions?.relations,
            select: repositoryOptions?.select,
            order: repositoryOptions?.order,
            withDeleted: repositoryOptions?.withDeleted,
        });
        if (!updated) {
            throw new common_1.NotFoundException(`${this.repository.metadata.name} Entity with id ${entityId} not found`);
        }
        return updated;
    }
    async delete(entityId, repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        await repository.delete(entityId);
    }
    async count(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return repository.count({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            select: repositoryOptions?.select,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
            withDeleted: repositoryOptions?.withDeleted,
        });
    }
};
exports.BaseRepository = BaseRepository;
exports.BaseRepository = BaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], BaseRepository);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseService = void 0;
const common_1 = __webpack_require__(2);
const repository_interface_1 = __webpack_require__(48);
let BaseService = class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(entity, options) {
        return this.repository.create(entity, options);
    }
    async save(entity, options) {
        return this.repository.save(entity, options);
    }
    async findAll(options) {
        return this.repository.findAll(options);
    }
    async findOne(options) {
        return this.repository.findOne(options);
    }
    async update(entityId, entity, options) {
        return this.repository.update(entityId, entity, options);
    }
    async delete(entityId, options) {
        return this.repository.delete(entityId, options);
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof repository_interface_1.IRepository !== "undefined" && repository_interface_1.IRepository) === "function" ? _a : Object])
], BaseService);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 49 */
/***/ ((module) => {

module.exports = require("@node-rs/bcrypt");

/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainTokenService = void 0;
const common_1 = __webpack_require__(2);
const token_repository_1 = __webpack_require__(51);
const base_service_1 = __webpack_require__(47);
const jwt_1 = __webpack_require__(52);
const config_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(14);
let DomainTokenService = class DomainTokenService extends base_service_1.BaseService {
    constructor(tokenRepository, jwtService, configService) {
        super(tokenRepository);
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async findByAccessToken(accessToken) {
        const token = await this.tokenRepository.findOne({
            where: { accessToken },
        });
        if (!token) {
            throw new common_1.NotFoundException('토큰을 찾을 수 없습니다.');
        }
        return token;
    }
    async findByRefreshToken(refreshToken) {
        const token = await this.tokenRepository.findOne({
            where: { refreshToken },
        });
        if (!token) {
            throw new common_1.NotFoundException('리프레시 토큰을 찾을 수 없습니다.');
        }
        return token;
    }
    async findAllTokens() {
        return this.tokenRepository.findAll({
            order: { createdAt: 'DESC' },
        });
    }
    async findExpiredTokens() {
        const now = new Date();
        return this.tokenRepository.findAll({
            where: {
                tokenExpiresAt: (0, typeorm_1.LessThan)(now),
                isActive: true,
            },
            order: { tokenExpiresAt: 'ASC' },
        });
    }
    async deleteExpiredTokens() {
        const now = new Date();
        const expiredTokens = await this.tokenRepository.findAll({
            where: {
                tokenExpiresAt: (0, typeorm_1.LessThan)(now),
                isActive: true,
            },
        });
        let deletedCount = 0;
        for (const token of expiredTokens) {
            await this.tokenRepository.delete(token.id);
            deletedCount++;
        }
        return { deletedCount };
    }
    generateJwtToken(payload, expiresIn) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('GLOBAL_SECRET'),
            expiresIn: expiresIn,
        });
    }
    verifyJwtToken(token) {
        return this.jwtService.verify(token, {
            secret: this.configService.get('GLOBAL_SECRET'),
        });
    }
};
exports.DomainTokenService = DomainTokenService;
exports.DomainTokenService = DomainTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof token_repository_1.DomainTokenRepository !== "undefined" && token_repository_1.DomainTokenRepository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], DomainTokenService);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainTokenRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainTokenRepository = class DomainTokenRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainTokenRepository = DomainTokenRepository;
exports.DomainTokenRepository = DomainTokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Token)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainTokenRepository);


/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemService = void 0;
const common_1 = __webpack_require__(2);
const system_repository_1 = __webpack_require__(54);
const base_service_1 = __webpack_require__(47);
const crypto_1 = __webpack_require__(55);
const bcrypt = __webpack_require__(49);
const uuid_1 = __webpack_require__(56);
const typeorm_1 = __webpack_require__(14);
let DomainSystemService = class DomainSystemService extends base_service_1.BaseService {
    constructor(systemRepository) {
        super(systemRepository);
        this.systemRepository = systemRepository;
    }
    async findByClientId(clientId) {
        const system = await this.systemRepository.findOne({
            where: { clientId },
        });
        if (!system) {
            throw new common_1.NotFoundException('시스템을 찾을 수 없습니다.');
        }
        return system;
    }
    async findByName(name) {
        return this.systemRepository.findOne({
            where: { name },
        });
    }
    async findAllSystems() {
        return this.systemRepository.findAll({
            order: { name: 'ASC' },
        });
    }
    async searchSystems(query) {
        if (!query || query.trim() === '') {
            return this.findAll();
        }
        const options = {
            where: [
                { name: (0, typeorm_1.ILike)(`%${query}%`) },
                { description: (0, typeorm_1.ILike)(`%${query}%`) },
                { clientId: (0, typeorm_1.ILike)(`%${query}%`) },
                { domain: (0, typeorm_1.ILike)(`%${query}%`) },
            ],
            order: { name: 'ASC' },
        };
        return this.systemRepository.findAll(options);
    }
    async findActiveSystems() {
        return this.systemRepository.findAll({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }
    async findByDomain(domain) {
        const system = await this.systemRepository.findOne({
            where: { domain },
        });
        if (!system) {
            throw new common_1.NotFoundException('해당 도메인의 시스템을 찾을 수 없습니다.');
        }
        return system;
    }
    async verifyClientSecret(clientSecret, system) {
        return bcrypt.compare(clientSecret, system.clientSecret);
    }
    generateCredentials() {
        const clientId = (0, uuid_1.v4)();
        const { clientSecret, hash } = this.generateSecret();
        return { clientId, clientSecret, hash };
    }
    generateSecret() {
        const clientSecret = (0, crypto_1.randomBytes)(32).toString('hex');
        const hash = bcrypt.hashSync(clientSecret, 10);
        return { clientSecret, hash };
    }
};
exports.DomainSystemService = DomainSystemService;
exports.DomainSystemService = DomainSystemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof system_repository_1.DomainSystemRepository !== "undefined" && system_repository_1.DomainSystemRepository) === "function" ? _a : Object])
], DomainSystemService);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainSystemRepository = class DomainSystemRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainSystemRepository = DomainSystemRepository;
exports.DomainSystemRepository = DomainSystemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.System)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainSystemRepository);


/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 56 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeTokenService = void 0;
const common_1 = __webpack_require__(2);
const employee_token_repository_1 = __webpack_require__(58);
const base_service_1 = __webpack_require__(47);
let DomainEmployeeTokenService = class DomainEmployeeTokenService extends base_service_1.BaseService {
    constructor(employeeTokenRepository) {
        super(employeeTokenRepository);
        this.employeeTokenRepository = employeeTokenRepository;
    }
    async findByEmployeeId(employeeId) {
        return this.employeeTokenRepository.findAll({
            where: { employeeId },
        });
    }
    async findByTokenId(tokenId) {
        return this.employeeTokenRepository.findAll({
            where: { tokenId },
        });
    }
    async createOrUpdateRelation(employeeId, tokenId, relationData) {
        const existingRelation = await this.employeeTokenRepository.findOne({
            where: { employeeId, tokenId },
        });
        if (existingRelation) {
            return this.employeeTokenRepository.update(existingRelation.id, relationData);
        }
        return this.employeeTokenRepository.save({
            employeeId,
            tokenId,
            ...relationData,
        });
    }
    async deleteByTokenIds(tokenIds) {
        let deletedCount = 0;
        for (const tokenId of tokenIds) {
            const relations = await this.employeeTokenRepository.findAll({
                where: { tokenId },
            });
            for (const relation of relations) {
                await this.employeeTokenRepository.delete(relation.id);
                deletedCount++;
            }
        }
        return { deletedCount };
    }
};
exports.DomainEmployeeTokenService = DomainEmployeeTokenService;
exports.DomainEmployeeTokenService = DomainEmployeeTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_token_repository_1.DomainEmployeeTokenRepository !== "undefined" && employee_token_repository_1.DomainEmployeeTokenRepository) === "function" ? _a : Object])
], DomainEmployeeTokenService);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeTokenRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainEmployeeTokenRepository = class DomainEmployeeTokenRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainEmployeeTokenRepository = DomainEmployeeTokenRepository;
exports.DomainEmployeeTokenRepository = DomainEmployeeTokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.EmployeeToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainEmployeeTokenRepository);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SystemManagementContextService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemManagementContextService = void 0;
const common_1 = __webpack_require__(2);
const system_service_1 = __webpack_require__(53);
const system_role_service_1 = __webpack_require__(60);
const employee_system_role_service_1 = __webpack_require__(62);
let SystemManagementContextService = SystemManagementContextService_1 = class SystemManagementContextService {
    constructor(시스템서비스, 시스템역할서비스, 직원시스템역할서비스) {
        this.시스템서비스 = 시스템서비스;
        this.시스템역할서비스 = 시스템역할서비스;
        this.직원시스템역할서비스 = 직원시스템역할서비스;
        this.logger = new common_1.Logger(SystemManagementContextService_1.name);
    }
    async 시스템역할_생성_또는_조회(systemId, roleCode, roleName, description, permissions) {
        try {
            const existingRole = await this.시스템역할서비스.findBySystemIdAndRoleCode(systemId, roleCode);
            if (existingRole) {
                this.logger.log(`기존 시스템 역할 사용: ${roleCode}`);
                return existingRole;
            }
        }
        catch (error) {
        }
        const newRole = await this.시스템역할서비스.createSystemRole({
            systemId,
            roleCode,
            roleName,
            description,
            permissions,
            sortOrder: 0,
        });
        this.logger.log(`새 시스템 역할 생성: ${roleCode}`);
        return newRole;
    }
    async 역할_할당_시도(employeeId, systemRoleId) {
        try {
            const existing = await this.직원시스템역할서비스.findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId);
            if (existing) {
                return;
            }
            await this.직원시스템역할서비스.assignRole(employeeId, systemRoleId);
        }
        catch (error) {
            if (error.message?.includes('이미 할당된 역할')) {
                return;
            }
            throw error;
        }
    }
    async 시스템을_생성한다(data) {
        const existingSystem = await this.시스템서비스.findByName(data.name);
        if (existingSystem) {
            throw new Error('이미 존재하는 시스템 이름입니다.');
        }
        const { clientId, clientSecret, hash } = this.시스템서비스.generateCredentials();
        const systemData = {
            clientId,
            clientSecret: hash,
            name: data.name,
            description: data.description,
            domain: data.domain,
            allowedOrigin: data.allowedOrigin,
            healthCheckUrl: data.healthCheckUrl,
            isActive: data.isActive ?? true,
        };
        const savedSystem = await this.시스템서비스.save(systemData);
        return {
            system: savedSystem,
            originalSecret: clientSecret,
        };
    }
    async 모든_시스템을_조회한다() {
        return this.시스템서비스.findAllSystems();
    }
    async 시스템을_검색한다(query) {
        return this.시스템서비스.searchSystems(query);
    }
    async 시스템을_ID로_조회한다(systemId) {
        return this.시스템서비스.findOne({ where: { id: systemId } });
    }
    async 시스템을_수정한다(systemId, data) {
        const system = await this.시스템서비스.findOne({ where: { id: systemId } });
        if (!system) {
            throw new Error('해당 시스템을 찾을 수 없습니다.');
        }
        if (data.name && data.name !== system.name) {
            const existingSystem = await this.시스템서비스.findByName(data.name);
            if (existingSystem) {
                throw new Error('이미 존재하는 시스템 이름입니다.');
            }
        }
        return this.시스템서비스.update(systemId, data);
    }
    async 시스템을_삭제한다(systemId) {
        const system = await this.시스템서비스.findOne({ where: { id: systemId } });
        if (!system) {
            throw new Error('해당 시스템을 찾을 수 없습니다.');
        }
        await this.시스템서비스.delete(systemId);
    }
    async 시스템의_API키를_재생성한다(systemId) {
        const system = await this.시스템서비스.findOne({ where: { id: systemId } });
        if (!system) {
            throw new Error('해당 시스템을 찾을 수 없습니다.');
        }
        const { clientSecret, hash } = this.시스템서비스.generateSecret();
        const updatedSystem = await this.시스템서비스.update(systemId, {
            clientSecret: hash,
        });
        return {
            system: updatedSystem,
            originalSecret: clientSecret,
        };
    }
    async 시스템역할을_생성한다(data) {
        return this.시스템역할서비스.createSystemRole(data);
    }
    async 모든_시스템역할을_조회한다() {
        return this.시스템역할서비스.findAllSystemRoles();
    }
    async 시스템의_역할목록을_조회한다(systemId) {
        return this.시스템역할서비스.findBySystemId(systemId);
    }
    async 시스템역할을_ID로_조회한다(systemRoleId) {
        return this.시스템역할서비스.findById(systemRoleId);
    }
    async 시스템역할을_수정한다(systemRoleId, data) {
        return this.시스템역할서비스.updateSystemRole(systemRoleId, data);
    }
    async 시스템역할을_비활성화한다(systemRoleId) {
        return this.시스템역할서비스.deactivateSystemRole(systemRoleId);
    }
    async 직원에게_시스템역할을_할당한다(employeeId, systemRoleId) {
        return this.직원시스템역할서비스.assignRole(employeeId, systemRoleId);
    }
    async 직원의_시스템역할을_해제한다(employeeId, systemRoleId) {
        return this.직원시스템역할서비스.unassignRole(employeeId, systemRoleId);
    }
    async 직원의_모든_시스템역할을_해제한다(employeeId) {
        return this.직원시스템역할서비스.unassignAllRolesByEmployeeId(employeeId);
    }
    async 시스템역할의_모든_할당을_해제한다(systemRoleId) {
        return this.직원시스템역할서비스.unassignAllRolesBySystemRoleId(systemRoleId);
    }
    async 직원의_시스템역할목록을_조회한다(employeeId) {
        return this.직원시스템역할서비스.findByEmployeeId(employeeId);
    }
    async 시스템역할의_직원목록을_조회한다(systemRoleId) {
        return this.직원시스템역할서비스.findBySystemRoleId(systemRoleId);
    }
    async 직원이_시스템역할을_가지고있는지_확인한다(employeeId, systemRoleId) {
        const assignment = await this.직원시스템역할서비스.findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId);
        return !!assignment;
    }
    async 직원의_시스템역할ID목록을_조회한다(employeeId) {
        return this.직원시스템역할서비스.getSystemRoleIdsByEmployeeId(employeeId);
    }
    async 시스템역할의_직원ID목록을_조회한다(systemRoleId) {
        return this.직원시스템역할서비스.getEmployeeIdsBySystemRoleId(systemRoleId);
    }
    async 직원이_시스템에서_가진_역할목록을_조회한다(employeeId) {
        const employeeSystemRoles = await this.직원시스템역할서비스.findByEmployeeId(employeeId);
        const systemRoles = employeeSystemRoles.map((esr) => esr.systemRole).filter(Boolean);
        return systemRoles;
    }
};
exports.SystemManagementContextService = SystemManagementContextService;
exports.SystemManagementContextService = SystemManagementContextService = SystemManagementContextService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof system_service_1.DomainSystemService !== "undefined" && system_service_1.DomainSystemService) === "function" ? _a : Object, typeof (_b = typeof system_role_service_1.DomainSystemRoleService !== "undefined" && system_role_service_1.DomainSystemRoleService) === "function" ? _b : Object, typeof (_c = typeof employee_system_role_service_1.DomainEmployeeSystemRoleService !== "undefined" && employee_system_role_service_1.DomainEmployeeSystemRoleService) === "function" ? _c : Object])
], SystemManagementContextService);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemRoleService = void 0;
const common_1 = __webpack_require__(2);
const system_role_repository_1 = __webpack_require__(61);
const base_service_1 = __webpack_require__(47);
let DomainSystemRoleService = class DomainSystemRoleService extends base_service_1.BaseService {
    constructor(systemRoleRepository) {
        super(systemRoleRepository);
        this.systemRoleRepository = systemRoleRepository;
    }
    async findById(id) {
        return this.systemRoleRepository.findOne({ where: { id } });
    }
    async findAllSystemRoles() {
        return this.systemRoleRepository.findAll({
            order: { systemId: 'ASC', sortOrder: 'ASC', roleName: 'ASC' },
        });
    }
    async findBySystemId(systemId) {
        return this.systemRoleRepository.findAll({
            where: { systemId, isActive: true },
            order: { sortOrder: 'ASC', roleName: 'ASC' },
        });
    }
    async findBySystemIdAndRoleCode(systemId, roleCode) {
        return this.systemRoleRepository.findOne({
            where: { systemId, roleCode },
        });
    }
    async createSystemRole(data) {
        const existing = await this.findBySystemIdAndRoleCode(data.systemId, data.roleCode);
        if (existing) {
            throw new common_1.BadRequestException(`역할 코드 '${data.roleCode}'는 이미 존재합니다.`);
        }
        return this.systemRoleRepository.save({
            systemId: data.systemId,
            roleName: data.roleName,
            roleCode: data.roleCode,
            description: data.description,
            permissions: data.permissions || [],
            sortOrder: data.sortOrder || 0,
            isActive: true,
        });
    }
    async updateSystemRole(id, data) {
        const systemRole = await this.systemRoleRepository.findOne({ where: { id } });
        if (!systemRole) {
            throw new common_1.NotFoundException('시스템 역할을 찾을 수 없습니다.');
        }
        if (data.roleCode && data.roleCode !== systemRole.roleCode) {
            const existing = await this.findBySystemIdAndRoleCode(systemRole.systemId, data.roleCode);
            if (existing) {
                throw new common_1.BadRequestException(`역할 코드 '${data.roleCode}'는 이미 존재합니다.`);
            }
        }
        await this.systemRoleRepository.update(id, data);
        return this.systemRoleRepository.findOne({ where: { id } });
    }
    async deactivateSystemRole(id) {
        const systemRole = await this.systemRoleRepository.findOne({ where: { id } });
        if (!systemRole) {
            throw new common_1.NotFoundException('시스템 역할을 찾을 수 없습니다.');
        }
        await this.systemRoleRepository.update(id, { isActive: false });
    }
};
exports.DomainSystemRoleService = DomainSystemRoleService;
exports.DomainSystemRoleService = DomainSystemRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof system_role_repository_1.DomainSystemRoleRepository !== "undefined" && system_role_repository_1.DomainSystemRoleRepository) === "function" ? _a : Object])
], DomainSystemRoleService);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemRoleRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const system_role_entity_1 = __webpack_require__(37);
const base_repository_1 = __webpack_require__(46);
let DomainSystemRoleRepository = class DomainSystemRoleRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainSystemRoleRepository = DomainSystemRoleRepository;
exports.DomainSystemRoleRepository = DomainSystemRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(system_role_entity_1.SystemRole)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainSystemRoleRepository);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeSystemRoleService = void 0;
const common_1 = __webpack_require__(2);
const employee_system_role_repository_1 = __webpack_require__(63);
const base_service_1 = __webpack_require__(47);
let DomainEmployeeSystemRoleService = class DomainEmployeeSystemRoleService extends base_service_1.BaseService {
    constructor(employeeSystemRoleRepository) {
        super(employeeSystemRoleRepository);
        this.employeeSystemRoleRepository = employeeSystemRoleRepository;
    }
    async findByEmployeeId(employeeId) {
        return this.employeeSystemRoleRepository.findAll({
            where: { employeeId },
            relations: ['systemRole', 'systemRole.system'],
        });
    }
    async findBySystemRoleId(systemRoleId) {
        return this.employeeSystemRoleRepository.findAll({
            where: { systemRoleId },
            relations: ['employee'],
        });
    }
    async findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId) {
        return this.employeeSystemRoleRepository.findOne({
            where: { employeeId, systemRoleId },
            relations: ['systemRole'],
        });
    }
    async assignRole(employeeId, systemRoleId) {
        const existing = await this.findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId);
        if (existing) {
            throw new common_1.BadRequestException('이미 할당된 역할입니다.');
        }
        return this.employeeSystemRoleRepository.save({
            employeeId,
            systemRoleId,
        });
    }
    async unassignRole(employeeId, systemRoleId) {
        const employeeSystemRole = await this.findByEmployeeIdAndSystemRoleId(employeeId, systemRoleId);
        if (!employeeSystemRole) {
            throw new common_1.NotFoundException('할당된 역할을 찾을 수 없습니다.');
        }
        await this.employeeSystemRoleRepository.delete(employeeSystemRole.id);
    }
    async unassignAllRolesByEmployeeId(employeeId) {
        const roles = await this.findByEmployeeId(employeeId);
        if (roles.length > 0) {
            for (const role of roles) {
                await this.employeeSystemRoleRepository.delete(role.id);
            }
        }
    }
    async unassignAllRolesBySystemRoleId(systemRoleId) {
        const assignments = await this.findBySystemRoleId(systemRoleId);
        if (assignments.length > 0) {
            for (const assignment of assignments) {
                await this.employeeSystemRoleRepository.delete(assignment.id);
            }
        }
    }
    async getEmployeeIdsBySystemRoleId(systemRoleId) {
        const assignments = await this.employeeSystemRoleRepository.findAll({
            where: { systemRoleId },
            select: { employeeId: true },
        });
        return assignments.map((assignment) => assignment.employeeId);
    }
    async getSystemRoleIdsByEmployeeId(employeeId) {
        const assignments = await this.employeeSystemRoleRepository.findAll({
            where: { employeeId },
            select: { systemRoleId: true },
        });
        return assignments.map((assignment) => assignment.systemRoleId);
    }
};
exports.DomainEmployeeSystemRoleService = DomainEmployeeSystemRoleService;
exports.DomainEmployeeSystemRoleService = DomainEmployeeSystemRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_system_role_repository_1.DomainEmployeeSystemRoleRepository !== "undefined" && employee_system_role_repository_1.DomainEmployeeSystemRoleRepository) === "function" ? _a : Object])
], DomainEmployeeSystemRoleService);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeSystemRoleRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const employee_system_role_entity_1 = __webpack_require__(38);
const base_repository_1 = __webpack_require__(46);
let DomainEmployeeSystemRoleRepository = class DomainEmployeeSystemRoleRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainEmployeeSystemRoleRepository = DomainEmployeeSystemRoleRepository;
exports.DomainEmployeeSystemRoleRepository = DomainEmployeeSystemRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_system_role_entity_1.EmployeeSystemRole)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainEmployeeSystemRoleRepository);


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationContextService = void 0;
const common_1 = __webpack_require__(2);
const employee_service_1 = __webpack_require__(44);
const department_service_1 = __webpack_require__(65);
const position_service_1 = __webpack_require__(67);
const rank_service_1 = __webpack_require__(69);
const employee_department_position_service_1 = __webpack_require__(71);
const employee_rank_history_service_1 = __webpack_require__(73);
let OrganizationContextService = class OrganizationContextService {
    constructor(직원서비스, 부서서비스, 직책서비스, 직급서비스, 직원부서직책서비스, 직원직급이력서비스) {
        this.직원서비스 = 직원서비스;
        this.부서서비스 = 부서서비스;
        this.직책서비스 = 직책서비스;
        this.직급서비스 = 직급서비스;
        this.직원부서직책서비스 = 직원부서직책서비스;
        this.직원직급이력서비스 = 직원직급이력서비스;
    }
    async 직원_ID값으로_직원정보를_조회한다(employeeId) {
        return this.직원서비스.findByEmployeeId(employeeId);
    }
    async 직원_사번으로_직원정보를_조회한다(employeeNumber) {
        return this.직원서비스.findByEmployeeNumber(employeeNumber);
    }
    async 직원의_부서_직책_직급을_조회한다(employee) {
        const 부서직책정보 = await this.직원부서직책서비스.findByEmployeeId(employee.id);
        const department = 부서직책정보?.departmentId
            ? await this.부서서비스.findById(부서직책정보.departmentId)
            : null;
        const position = 부서직책정보?.positionId ? await this.직책서비스.findById(부서직책정보.positionId) : null;
        const rank = employee.currentRankId ? await this.직급서비스.findById(employee.currentRankId) : null;
        return { department, position, rank };
    }
    async 여러_직원_ID값으로_직원정보를_조회한다(employeeIds, includeTerminated = false) {
        return this.직원서비스.findByEmployeeIds(employeeIds, includeTerminated);
    }
    async 여러_직원_사번으로_직원정보를_조회한다(employeeNumbers, includeTerminated = false) {
        return this.직원서비스.findByEmployeeNumbers(employeeNumbers, includeTerminated);
    }
    async 전체_직원정보를_조회한다(includeTerminated = false) {
        return this.직원서비스.findAllEmployees(includeTerminated);
    }
    async 여러_직원의_부서_직책_직급을_일괄조회한다(employees) {
        const employeeIds = employees.map((emp) => emp.id);
        const resultMap = new Map();
        const 부서직책정보들 = await this.직원부서직책서비스.findAllByEmployeeIds(employeeIds);
        const departmentIds = [...new Set(부서직책정보들.map((info) => info.departmentId))];
        const positionIds = [...new Set(부서직책정보들.map((info) => info.positionId))];
        const rankIds = [...new Set(employees.map((emp) => emp.currentRankId).filter((id) => id))];
        const [departments, positions, ranks] = await Promise.all([
            this.부서서비스.findByIdsWithParent(departmentIds),
            this.직책서비스.findByIds(positionIds),
            this.직급서비스.findByIds(rankIds),
        ]);
        const departmentMap = new Map(departments.map((dept) => [dept.id, dept]));
        const positionMap = new Map(positions.map((pos) => [pos.id, pos]));
        const rankMap = new Map(ranks.map((rank) => [rank.id, rank]));
        const 부서직책Map = new Map(부서직책정보들.map((info) => [info.employeeId, info]));
        for (const employee of employees) {
            const 부서직책정보 = 부서직책Map.get(employee.id);
            if (부서직책정보) {
                const department = departmentMap.get(부서직책정보.departmentId);
                const position = positionMap.get(부서직책정보.positionId);
                const rank = rankMap.get(employee.currentRankId);
                resultMap.set(employee.id, {
                    department,
                    position,
                    rank,
                });
            }
        }
        return resultMap;
    }
    async 부서_계층구조를_조회한다(rootDepartmentId, maxDepth, includeEmptyDepartments = true) {
        let rootDepartments;
        if (rootDepartmentId) {
            const rootDept = await this.부서서비스.findByIdWithParent(rootDepartmentId);
            rootDepartments = [rootDept];
        }
        else {
            rootDepartments = await this.부서서비스.findRootDepartments();
        }
        const allDepartments = await this.부서서비스.findAllDepartmentsWithChildren();
        const departmentMap = new Map(allDepartments.map((dept) => [dept.id, dept]));
        const result = [];
        for (const rootDept of rootDepartments) {
            const hierarchyDept = this.부서_계층구조를_구축한다(rootDept, departmentMap, 0, maxDepth, includeEmptyDepartments);
            if (hierarchyDept) {
                result.push(hierarchyDept);
            }
        }
        return result;
    }
    부서_계층구조를_구축한다(department, departmentMap, currentDepth, maxDepth, includeEmptyDepartments = true) {
        if (maxDepth !== undefined && currentDepth >= maxDepth) {
            return department;
        }
        const childDepartments = [];
        const allChildren = Array.from(departmentMap.values()).filter((dept) => dept.parentDepartmentId === department.id);
        for (const childDept of allChildren) {
            const childHierarchy = this.부서_계층구조를_구축한다(childDept, departmentMap, currentDepth + 1, maxDepth, includeEmptyDepartments);
            if (childHierarchy) {
                childDepartments.push(childHierarchy);
            }
        }
        department.childDepartments = childDepartments.sort((a, b) => a.order - b.order);
        return department;
    }
    async 부서별_직원_목록을_조회한다(departmentIds, includeTerminated = false, withDetail = false) {
        if (departmentIds.length === 0) {
            return new Map();
        }
        const [allEmployeeDeptPositions, allEmployees] = await Promise.all([
            this.직원부서직책서비스.findByDepartmentIds(departmentIds),
            this.전체_활성_직원정보를_조회한다(includeTerminated),
        ]);
        const employeeMap = new Map(allEmployees.map((emp) => [emp.id, emp]));
        const departmentEmployeesMap = new Map();
        for (const departmentId of departmentIds) {
            departmentEmployeesMap.set(departmentId, {
                employees: [],
                departmentPositions: new Map(),
            });
        }
        for (const edp of allEmployeeDeptPositions) {
            const employee = employeeMap.get(edp.employeeId);
            if (employee && departmentIds.includes(edp.departmentId)) {
                const deptInfo = departmentEmployeesMap.get(edp.departmentId);
                deptInfo.employees.push(employee);
                deptInfo.departmentPositions.set(edp.employeeId, {
                    positionId: edp.positionId,
                    isManager: edp.isManager,
                    createdAt: edp.createdAt,
                });
            }
        }
        return departmentEmployeesMap;
    }
    async 전체_활성_직원정보를_조회한다(includeTerminated = false) {
        return this.직원서비스.findAllEmployees(includeTerminated);
    }
    async 부서_계층구조별_직원정보를_조회한다(rootDepartmentId, maxDepth, withEmployeeDetail = false, includeTerminated = false, includeEmptyDepartments = true) {
        const [departments] = await Promise.all([
            this.부서_계층구조를_조회한다(rootDepartmentId, maxDepth, includeEmptyDepartments),
        ]);
        const allDepartmentIds = this.모든_부서_ID를_수집한다(departments);
        if (allDepartmentIds.length === 0) {
            return {
                departments,
                employeesByDepartment: new Map(),
                departmentDetails: undefined,
            };
        }
        const [employeesByDepartment, departmentDetails] = await Promise.all([
            this.부서별_직원_목록을_조회한다(allDepartmentIds, includeTerminated, withEmployeeDetail),
            withEmployeeDetail
                ? this.직원_상세정보를_병렬조회한다(allDepartmentIds, includeTerminated)
                : Promise.resolve(undefined),
        ]);
        return {
            departments,
            employeesByDepartment,
            departmentDetails,
        };
    }
    async 직원_상세정보를_병렬조회한다(departmentIds, includeTerminated = false) {
        try {
            const [employeeDeptPositions, departments, positions, ranks, employees] = await Promise.all([
                this.직원부서직책서비스.findByDepartmentIds(departmentIds),
                this.부서서비스.findByIds(departmentIds),
                this.직책서비스.findAllPositions(),
                this.직급서비스.findAllRanks(),
                this.직원서비스.findAllEmployees(includeTerminated),
            ]);
            const departmentMap = new Map(departments.map((dept) => [dept.id, dept]));
            const positionMap = new Map(positions.map((pos) => [pos.id, pos]));
            const rankMap = new Map(ranks.map((rank) => [rank.id, rank]));
            const employeeMap = new Map(employees.map((emp) => [emp.id, emp]));
            const departmentDetails = new Map();
            for (const edp of employeeDeptPositions) {
                const employee = employeeMap.get(edp.employeeId);
                const department = departmentMap.get(edp.departmentId);
                const position = positionMap.get(edp.positionId);
                if (employee && department && position) {
                    const rank = rankMap.get(employee.currentRankId);
                    if (rank) {
                        if (!departmentDetails.has(edp.departmentId)) {
                            departmentDetails.set(edp.departmentId, []);
                        }
                        departmentDetails.get(edp.departmentId).push({
                            department,
                            position,
                            rank,
                        });
                    }
                }
            }
            return departmentDetails;
        }
        catch (error) {
            console.error('직원 상세정보 조회 중 오류:', error);
            return undefined;
        }
    }
    모든_부서_ID를_수집한다(departments) {
        const departmentIds = [];
        const collectIds = (depts) => {
            for (const dept of depts) {
                departmentIds.push(dept.id);
                if (dept.childDepartments && dept.childDepartments.length > 0) {
                    collectIds(dept.childDepartments);
                }
            }
        };
        collectIds(departments);
        return departmentIds;
    }
};
exports.OrganizationContextService = OrganizationContextService;
exports.OrganizationContextService = OrganizationContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object, typeof (_b = typeof department_service_1.DomainDepartmentService !== "undefined" && department_service_1.DomainDepartmentService) === "function" ? _b : Object, typeof (_c = typeof position_service_1.DomainPositionService !== "undefined" && position_service_1.DomainPositionService) === "function" ? _c : Object, typeof (_d = typeof rank_service_1.DomainRankService !== "undefined" && rank_service_1.DomainRankService) === "function" ? _d : Object, typeof (_e = typeof employee_department_position_service_1.DomainEmployeeDepartmentPositionService !== "undefined" && employee_department_position_service_1.DomainEmployeeDepartmentPositionService) === "function" ? _e : Object, typeof (_f = typeof employee_rank_history_service_1.DomainEmployeeRankHistoryService !== "undefined" && employee_rank_history_service_1.DomainEmployeeRankHistoryService) === "function" ? _f : Object])
], OrganizationContextService);


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DomainDepartmentService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainDepartmentService = void 0;
const common_1 = __webpack_require__(2);
const department_repository_1 = __webpack_require__(66);
const base_service_1 = __webpack_require__(47);
const typeorm_1 = __webpack_require__(14);
let DomainDepartmentService = DomainDepartmentService_1 = class DomainDepartmentService extends base_service_1.BaseService {
    constructor(departmentRepository) {
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
        this.logger = new common_1.Logger(DomainDepartmentService_1.name);
    }
    async findById(departmentId) {
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
        });
        return department;
    }
    async findByIdWithParent(departmentId) {
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
            relations: ['parentDepartment'],
        });
        return department;
    }
    async findByIds(departmentIds) {
        if (departmentIds.length === 0)
            return [];
        return this.departmentRepository.findAll({
            where: { id: (0, typeorm_1.In)(departmentIds) },
        });
    }
    async findByIdsWithParent(departmentIds) {
        if (departmentIds.length === 0)
            return [];
        return this.departmentRepository.findAll({
            where: { id: (0, typeorm_1.In)(departmentIds) },
            relations: ['parentDepartment'],
        });
    }
    async findByName(departmentName) {
        const department = await this.departmentRepository.findOne({
            where: { departmentName },
        });
        if (!department) {
            throw new common_1.NotFoundException('부서를 찾을 수 없습니다.');
        }
        return department;
    }
    async findByCode(departmentCode) {
        const department = await this.departmentRepository.findOne({
            where: { departmentCode },
        });
        return department;
    }
    async findByDepartmentCode(departmentCode) {
        return this.findByCode(departmentCode);
    }
    async findAllDepartments() {
        return this.departmentRepository.findAll({
            order: { departmentName: 'ASC' },
        });
    }
    async findRootDepartments() {
        return this.departmentRepository.findAll({
            where: { parentDepartmentId: null },
            order: { order: 'ASC' },
        });
    }
    async findAllDepartmentsWithChildren() {
        return this.departmentRepository.findAll({
            relations: ['childDepartments'],
            order: { order: 'ASC' },
        });
    }
    async findChildDepartments(departmentId) {
        return this.departmentRepository.findAll({
            where: { parentDepartmentId: departmentId },
            order: { order: 'ASC' },
        });
    }
    async createDepartment(data) {
        return this.save(data);
    }
    async updateDepartment(departmentId, data) {
        return this.update(departmentId, data);
    }
    async deleteDepartment(departmentId) {
        return this.delete(departmentId);
    }
};
exports.DomainDepartmentService = DomainDepartmentService;
exports.DomainDepartmentService = DomainDepartmentService = DomainDepartmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof department_repository_1.DomainDepartmentRepository !== "undefined" && department_repository_1.DomainDepartmentRepository) === "function" ? _a : Object])
], DomainDepartmentService);


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainDepartmentRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainDepartmentRepository = class DomainDepartmentRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainDepartmentRepository = DomainDepartmentRepository;
exports.DomainDepartmentRepository = DomainDepartmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Department)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainDepartmentRepository);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainPositionService = void 0;
const common_1 = __webpack_require__(2);
const position_repository_1 = __webpack_require__(68);
const base_service_1 = __webpack_require__(47);
const typeorm_1 = __webpack_require__(14);
let DomainPositionService = class DomainPositionService extends base_service_1.BaseService {
    constructor(positionRepository) {
        super(positionRepository);
        this.positionRepository = positionRepository;
    }
    async findById(positionId) {
        const position = await this.positionRepository.findOne({
            where: { id: positionId },
        });
        return position;
    }
    async findByIds(positionIds) {
        if (positionIds.length === 0)
            return [];
        return this.positionRepository.findAll({
            where: { id: (0, typeorm_1.In)(positionIds) },
        });
    }
    async findByTitle(positionTitle) {
        const position = await this.positionRepository.findOne({
            where: { positionTitle },
        });
        if (!position) {
            throw new common_1.NotFoundException('직책을 찾을 수 없습니다.');
        }
        return position;
    }
    async findByCode(positionCode) {
        const position = await this.positionRepository.findOne({
            where: { positionCode },
        });
        return position;
    }
    async findByPositionCode(positionCode) {
        return this.findByCode(positionCode);
    }
    async findByLevel(level) {
        return this.positionRepository.findAll({
            where: { level },
            order: { level: 'ASC' },
        });
    }
    async findManagementPositions() {
        return this.positionRepository.findAll({
            where: { hasManagementAuthority: true },
            order: { level: 'DESC' },
        });
    }
    async findAllPositions() {
        return this.positionRepository.findAll({
            order: { level: 'ASC', positionTitle: 'ASC' },
        });
    }
    async createPosition(data) {
        return this.save(data);
    }
    async updatePosition(positionId, data) {
        return this.update(positionId, data);
    }
    async deletePosition(positionId) {
        return this.delete(positionId);
    }
};
exports.DomainPositionService = DomainPositionService;
exports.DomainPositionService = DomainPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof position_repository_1.DomainPositionRepository !== "undefined" && position_repository_1.DomainPositionRepository) === "function" ? _a : Object])
], DomainPositionService);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainPositionRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainPositionRepository = class DomainPositionRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainPositionRepository = DomainPositionRepository;
exports.DomainPositionRepository = DomainPositionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Position)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainPositionRepository);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainRankService = void 0;
const common_1 = __webpack_require__(2);
const rank_repository_1 = __webpack_require__(70);
const base_service_1 = __webpack_require__(47);
const typeorm_1 = __webpack_require__(14);
let DomainRankService = class DomainRankService extends base_service_1.BaseService {
    constructor(rankRepository) {
        super(rankRepository);
        this.rankRepository = rankRepository;
    }
    async findById(rankId) {
        const rank = await this.rankRepository.findOne({
            where: { id: rankId },
        });
        return rank;
    }
    async findByIds(rankIds) {
        if (rankIds.length === 0)
            return [];
        return this.rankRepository.findAll({
            where: { id: (0, typeorm_1.In)(rankIds) },
        });
    }
    async findByName(rankName) {
        const rank = await this.rankRepository.findOne({
            where: { rankName },
        });
        return rank;
    }
    async findByCode(rankCode) {
        const rank = await this.rankRepository.findOne({
            where: { rankCode },
        });
        return rank;
    }
    async findByRankCode(rankCode) {
        return this.findByCode(rankCode);
    }
    async findAllRanks() {
        return this.rankRepository.findAll({
            order: { level: 'DESC' },
        });
    }
    async findByLevel(level) {
        return this.rankRepository.findAll({
            where: { level },
            order: { rankName: 'ASC' },
        });
    }
    async findByMinLevel(minLevel) {
        return this.rankRepository.findAll({
            order: { level: 'DESC' },
        });
    }
    async createRank(data) {
        return this.save(data);
    }
    async updateRank(rankId, data) {
        return this.update(rankId, data);
    }
    async deleteRank(rankId) {
        return this.delete(rankId);
    }
};
exports.DomainRankService = DomainRankService;
exports.DomainRankService = DomainRankService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof rank_repository_1.DomainRankRepository !== "undefined" && rank_repository_1.DomainRankRepository) === "function" ? _a : Object])
], DomainRankService);


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainRankRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainRankRepository = class DomainRankRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainRankRepository = DomainRankRepository;
exports.DomainRankRepository = DomainRankRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Rank)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainRankRepository);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeDepartmentPositionService = void 0;
const common_1 = __webpack_require__(2);
const employee_department_position_repository_1 = __webpack_require__(72);
const base_service_1 = __webpack_require__(47);
const typeorm_1 = __webpack_require__(14);
let DomainEmployeeDepartmentPositionService = class DomainEmployeeDepartmentPositionService extends base_service_1.BaseService {
    constructor(employeeDepartmentPositionRepository) {
        super(employeeDepartmentPositionRepository);
        this.employeeDepartmentPositionRepository = employeeDepartmentPositionRepository;
    }
    async findByEmployeeId(employeeId) {
        return this.employeeDepartmentPositionRepository.findOne({
            where: { employeeId },
        });
    }
    async findAllByEmployeeIds(employeeIds) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { employeeId: (0, typeorm_1.In)(employeeIds) },
            order: { createdAt: 'DESC' },
        });
    }
    async findAllByEmployeeId(employeeId) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { employeeId },
            order: { createdAt: 'DESC' },
        });
    }
    async findById(assignmentId) {
        return this.employeeDepartmentPositionRepository.findOne({
            where: { id: assignmentId },
        });
    }
    async findByDepartmentId(departmentId) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByDepartmentIds(departmentIds) {
        if (departmentIds.length === 0)
            return [];
        return this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId: (0, typeorm_1.In)(departmentIds) },
            order: { departmentId: 'ASC', createdAt: 'DESC' },
        });
    }
    async findByPositionId(positionId) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { positionId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByEmployeeAndDepartment(employeeId, departmentId) {
        const position = await this.employeeDepartmentPositionRepository.findOne({
            where: { employeeId, departmentId },
        });
        if (!position) {
            throw new common_1.NotFoundException('해당 부서에서 직원의 직책을 찾을 수 없습니다.');
        }
        return position;
    }
    async createEmployeeDepartmentPosition(employeeId, departmentId, positionId) {
        return this.employeeDepartmentPositionRepository.save({
            employeeId,
            departmentId,
            positionId,
        });
    }
    async deleteEmployeeDepartmentPosition(id) {
        await this.employeeDepartmentPositionRepository.delete(id);
    }
    async transferEmployee(employeeId, newDepartmentId, newPositionId) {
        return this.createEmployeeDepartmentPosition(employeeId, newDepartmentId, newPositionId);
    }
    async getDepartmentPositionStats(departmentId) {
        const positions = await this.findByDepartmentId(departmentId);
        const stats = positions.reduce((acc, position) => {
            acc[position.positionId] = (acc[position.positionId] || 0) + 1;
            return acc;
        }, {});
        return stats;
    }
    async findCurrentPositionByEmployeeId(employeeId) {
        const positions = await this.employeeDepartmentPositionRepository.findAll({
            where: { employeeId },
            order: { createdAt: 'DESC' },
            take: 1,
        });
        if (!positions.length) {
            throw new common_1.NotFoundException('직원의 부서-직책 정보를 찾을 수 없습니다.');
        }
        return positions[0];
    }
    async findManagersByDepartment(departmentId) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId },
            order: { createdAt: 'DESC' },
        });
    }
    async findRecentOrganizationChanges(limit = 20) {
        return this.employeeDepartmentPositionRepository.findAll({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async findAllAssignments() {
        return this.employeeDepartmentPositionRepository.findAll({
            order: { createdAt: 'DESC' },
        });
    }
    async createAssignment(data) {
        return this.save(data);
    }
    async updateAssignment(assignmentId, data) {
        return this.update(assignmentId, data);
    }
    async deleteAssignment(assignmentId) {
        return this.delete(assignmentId);
    }
};
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService;
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository !== "undefined" && employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository) === "function" ? _a : Object])
], DomainEmployeeDepartmentPositionService);


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeDepartmentPositionRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainEmployeeDepartmentPositionRepository = class DomainEmployeeDepartmentPositionRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainEmployeeDepartmentPositionRepository = DomainEmployeeDepartmentPositionRepository;
exports.DomainEmployeeDepartmentPositionRepository = DomainEmployeeDepartmentPositionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.EmployeeDepartmentPosition)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainEmployeeDepartmentPositionRepository);


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeRankHistoryService = void 0;
const common_1 = __webpack_require__(2);
const employee_rank_history_repository_1 = __webpack_require__(74);
const base_service_1 = __webpack_require__(47);
let DomainEmployeeRankHistoryService = class DomainEmployeeRankHistoryService extends base_service_1.BaseService {
    constructor(employeeRankHistoryRepository) {
        super(employeeRankHistoryRepository);
        this.employeeRankHistoryRepository = employeeRankHistoryRepository;
    }
    async findByEmployeeId(employeeId) {
        return this.employeeRankHistoryRepository.findAll({
            where: { employeeId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByRankId(rankId) {
        return this.employeeRankHistoryRepository.findAll({
            where: { rankId },
            order: { createdAt: 'DESC' },
        });
    }
    async findCurrentRankByEmployeeId(employeeId) {
        const histories = await this.employeeRankHistoryRepository.findAll({
            where: { employeeId },
            order: { createdAt: 'DESC' },
            take: 1,
        });
        if (!histories.length) {
            throw new common_1.NotFoundException('직원의 직급 이력을 찾을 수 없습니다.');
        }
        return histories[0];
    }
    async findByEmployeeAndRank(employeeId, rankId) {
        return this.employeeRankHistoryRepository.findAll({
            where: { employeeId, rankId },
            order: { createdAt: 'DESC' },
        });
    }
    async createRankHistory(employeeId, rankId) {
        return this.employeeRankHistoryRepository.save({
            employeeId,
            rankId,
        });
    }
    async findByDateRange(startDate, endDate) {
        return this.employeeRankHistoryRepository.findAll({
            order: { createdAt: 'DESC' },
        });
    }
    async getRankChangeCountByEmployeeId(employeeId) {
        const histories = await this.findByEmployeeId(employeeId);
        return histories.length;
    }
    async findRecentRankChanges(limit = 20) {
        return this.employeeRankHistoryRepository.findAll({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async findById(historyId) {
        return this.employeeRankHistoryRepository.findOne({
            where: { id: historyId },
        });
    }
    async createHistory(data) {
        return this.save(data);
    }
    async deleteHistory(historyId) {
        return this.delete(historyId);
    }
};
exports.DomainEmployeeRankHistoryService = DomainEmployeeRankHistoryService;
exports.DomainEmployeeRankHistoryService = DomainEmployeeRankHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_rank_history_repository_1.DomainEmployeeRankHistoryRepository !== "undefined" && employee_rank_history_repository_1.DomainEmployeeRankHistoryRepository) === "function" ? _a : Object])
], DomainEmployeeRankHistoryService);


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeRankHistoryRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainEmployeeRankHistoryRepository = class DomainEmployeeRankHistoryRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainEmployeeRankHistoryRepository = DomainEmployeeRankHistoryRepository;
exports.DomainEmployeeRankHistoryRepository = DomainEmployeeRankHistoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.EmployeeRankHistory)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainEmployeeRankHistoryRepository);


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SsoApplicationController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(10);
const sso_application_service_1 = __webpack_require__(42);
const dto_1 = __webpack_require__(76);
let SsoApplicationController = class SsoApplicationController {
    constructor(ssoApplicationService) {
        this.ssoApplicationService = ssoApplicationService;
    }
    async login(body) {
        const result = await this.ssoApplicationService.login(body);
        return result;
    }
    async verifyToken(authHeader) {
        return this.ssoApplicationService.verifyToken(authHeader);
    }
    async changePassword(authHeader, body) {
        return this.ssoApplicationService.changePassword(authHeader, body);
    }
    async checkPassword(authHeader, body) {
        return this.ssoApplicationService.checkPassword(authHeader, body);
    }
    async cleanUpExpiredTokens() {
        return this.ssoApplicationService.만료된_토큰을_정리한다();
    }
};
exports.SsoApplicationController = SsoApplicationController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '로그인 및 토큰 발급',
        description: '외부 시스템이 Basic Auth로 인증한 후, 사용자 이메일/비밀번호를 검증하고 액세스 토큰을 발급합니다.',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.LoginRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 성공 및 토큰 발급 성공',
        type: dto_1.LoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '시스템 인증 실패 또는 사용자 로그인 실패' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '사용자 또는 시스템을 찾을 수 없음' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.LoginRequestDto !== "undefined" && dto_1.LoginRequestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SsoApplicationController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '토큰 검증' }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer 토큰, 형식: Bearer {access_token}',
        required: false,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 검증 성공',
        type: dto_1.TokenVerifyResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '유효하지 않은 토큰' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], SsoApplicationController.prototype, "verifyToken", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('change-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '비밀번호 변경',
        description: '사용자의 비밀번호를 변경합니다.',
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer 토큰, 형식: Bearer {access_token}',
        required: true,
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.ChangePasswordRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '비밀번호 변경 성공',
        type: dto_1.ChangePasswordResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof dto_1.ChangePasswordRequestDto !== "undefined" && dto_1.ChangePasswordRequestDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], SsoApplicationController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('check-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '비밀번호 확인',
        description: '현재 비밀번호가 일치하는지 확인합니다.',
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer 토큰, 형식: Bearer {access_token}',
        required: true,
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.CheckPasswordRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '비밀번호 확인 성공',
        type: dto_1.CheckPasswordResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.CheckPasswordRequestDto !== "undefined" && dto_1.CheckPasswordRequestDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], SsoApplicationController.prototype, "checkPassword", null);
__decorate([
    (0, common_1.Get)('cron/clean-up/token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '만료된 토큰 정리 배치작업',
        description: '만료된 토큰들을 데이터베이스에서 삭제하는 배치작업을 실행합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '배치작업 실행 성공',
        schema: {
            type: 'object',
            properties: {
                deletedCount: {
                    type: 'number',
                    description: '삭제된 토큰 개수',
                },
                message: {
                    type: 'string',
                    description: '실행 결과 메시지',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 내부 오류' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], SsoApplicationController.prototype, "cleanUpExpiredTokens", null);
exports.SsoApplicationController = SsoApplicationController = __decorate([
    (0, swagger_1.ApiTags)('Client - 인증 API'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof sso_application_service_1.SsoApplicationService !== "undefined" && sso_application_service_1.SsoApplicationService) === "function" ? _a : Object])
], SsoApplicationController);


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(77), exports);
__exportStar(__webpack_require__(79), exports);
__exportStar(__webpack_require__(80), exports);
__exportStar(__webpack_require__(81), exports);
__exportStar(__webpack_require__(82), exports);


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginRequestDto = exports.GrantType = void 0;
const class_validator_1 = __webpack_require__(78);
const swagger_1 = __webpack_require__(10);
var GrantType;
(function (GrantType) {
    GrantType["PASSWORD"] = "password";
    GrantType["REFRESH_TOKEN"] = "refresh_token";
})(GrantType || (exports.GrantType = GrantType = {}));
class LoginRequestDto {
}
exports.LoginRequestDto = LoginRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: GrantType,
        description: 'password: 사용자 인증 방식, refresh_token: 리프레시 토큰 방식',
        example: GrantType.PASSWORD,
    }),
    (0, class_validator_1.IsEnum)(GrantType),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "grant_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사용자 이메일 (grant_type이 password인 경우에만 필요)',
        example: 'admin@lumir.space',
    }),
    (0, class_validator_1.ValidateIf)((obj) => obj.grant_type === GrantType.PASSWORD),
    (0, class_validator_1.IsEmail)({}, { message: '유효한 이메일 주소를 입력해주세요.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사용자 비밀번호 (grant_type이 password인 경우에만 필요)',
        example: '00000',
    }),
    (0, class_validator_1.ValidateIf)((obj) => obj.grant_type === GrantType.PASSWORD),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '리프레시 토큰 (grant_type이 refresh_token인 경우에만 필요)',
    }),
    (0, class_validator_1.ValidateIf)((obj) => obj.grant_type === GrantType.REFRESH_TOKEN),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "refresh_token", void 0);


/***/ }),
/* 78 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class LoginResponseDto {
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bearer', description: '토큰 타입' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "tokenType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '액세스 토큰' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 86400, description: '액세스 토큰 만료 시간(초)' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LoginResponseDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '리프레시 토큰' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2592000, description: '리프레시 토큰 만료 시간(초)' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], LoginResponseDto.prototype, "refreshTokenExpiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 ID' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이름' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이메일' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 번호' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '전화번호' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '생년월일' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], LoginResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '성별' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], LoginResponseDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 상태' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '부서명' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직책명' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직급명' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템별 역할 목록',
        type: 'object',
        example: { rms: ['resourceManager'], lrim: ['interviewee'] },
    }),
    __metadata("design:type", typeof (_e = typeof Record !== "undefined" && Record) === "function" ? _e : Object)
], LoginResponseDto.prototype, "systemRoles", void 0);


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenVerifyResponseDto = exports.UserInfoDto = void 0;
const swagger_1 = __webpack_require__(10);
class UserInfoDto {
}
exports.UserInfoDto = UserInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 ID' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이름' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이메일' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 번호' }),
    __metadata("design:type", String)
], UserInfoDto.prototype, "employee_number", void 0);
class TokenVerifyResponseDto {
}
exports.TokenVerifyResponseDto = TokenVerifyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: '토큰 유효성' }),
    __metadata("design:type", Boolean)
], TokenVerifyResponseDto.prototype, "valid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserInfoDto, description: '사용자 정보' }),
    __metadata("design:type", UserInfoDto)
], TokenVerifyResponseDto.prototype, "user_info", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 86400, description: '토큰 만료까지 남은 시간(초)' }),
    __metadata("design:type", Number)
], TokenVerifyResponseDto.prototype, "expires_in", void 0);


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordResponseDto = exports.ChangePasswordRequestDto = void 0;
const class_validator_1 = __webpack_require__(78);
const swagger_1 = __webpack_require__(10);
class ChangePasswordRequestDto {
}
exports.ChangePasswordRequestDto = ChangePasswordRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '새 비밀번호',
        minLength: 8,
        example: 'newPassword123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    __metadata("design:type", String)
], ChangePasswordRequestDto.prototype, "newPassword", void 0);
class ChangePasswordResponseDto {
}
exports.ChangePasswordResponseDto = ChangePasswordResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '비밀번호가 성공적으로 변경되었습니다.',
        description: '응답 메시지',
    }),
    __metadata("design:type", String)
], ChangePasswordResponseDto.prototype, "message", void 0);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckPasswordResponseDto = exports.CheckPasswordRequestDto = void 0;
const class_validator_1 = __webpack_require__(78);
const swagger_1 = __webpack_require__(10);
class CheckPasswordRequestDto {
}
exports.CheckPasswordRequestDto = CheckPasswordRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 비밀번호',
        example: 'currentPassword123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckPasswordRequestDto.prototype, "currentPassword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '이메일 (선택사항)',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CheckPasswordRequestDto.prototype, "email", void 0);
class CheckPasswordResponseDto {
}
exports.CheckPasswordResponseDto = CheckPasswordResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: '비밀번호 일치 여부',
    }),
    __metadata("design:type", Boolean)
], CheckPasswordResponseDto.prototype, "isValid", void 0);


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthorizationContextModule = void 0;
const common_1 = __webpack_require__(2);
const authorization_context_service_1 = __webpack_require__(43);
const jwt_1 = __webpack_require__(52);
const config_1 = __webpack_require__(4);
const employee_module_1 = __webpack_require__(84);
const token_module_1 = __webpack_require__(85);
const system_module_1 = __webpack_require__(86);
const employee_token_module_1 = __webpack_require__(87);
let AuthorizationContextModule = class AuthorizationContextModule {
};
exports.AuthorizationContextModule = AuthorizationContextModule;
exports.AuthorizationContextModule = AuthorizationContextModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            config_1.ConfigModule,
            employee_module_1.DomainEmployeeModule,
            token_module_1.DomainTokenModule,
            system_module_1.DomainSystemModule,
            employee_token_module_1.DomainEmployeeTokenModule,
        ],
        providers: [authorization_context_service_1.AuthorizationContextService],
        exports: [authorization_context_service_1.AuthorizationContextService],
    })
], AuthorizationContextModule);


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const employee_service_1 = __webpack_require__(44);
const employee_repository_1 = __webpack_require__(45);
const employee_entity_1 = __webpack_require__(13);
let DomainEmployeeModule = class DomainEmployeeModule {
};
exports.DomainEmployeeModule = DomainEmployeeModule;
exports.DomainEmployeeModule = DomainEmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee])],
        providers: [employee_service_1.DomainEmployeeService, employee_repository_1.DomainEmployeeRepository],
        exports: [employee_service_1.DomainEmployeeService],
    })
], DomainEmployeeModule);


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainTokenModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const token_service_1 = __webpack_require__(50);
const token_repository_1 = __webpack_require__(51);
const token_entity_1 = __webpack_require__(32);
const jwt_1 = __webpack_require__(52);
let DomainTokenModule = class DomainTokenModule {
};
exports.DomainTokenModule = DomainTokenModule;
exports.DomainTokenModule = DomainTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([token_entity_1.Token]), jwt_1.JwtModule.register({})],
        providers: [token_service_1.DomainTokenService, token_repository_1.DomainTokenRepository],
        exports: [token_service_1.DomainTokenService, token_repository_1.DomainTokenRepository],
    })
], DomainTokenModule);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const system_service_1 = __webpack_require__(53);
const system_repository_1 = __webpack_require__(54);
const system_entity_1 = __webpack_require__(31);
let DomainSystemModule = class DomainSystemModule {
};
exports.DomainSystemModule = DomainSystemModule;
exports.DomainSystemModule = DomainSystemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([system_entity_1.System])],
        providers: [system_service_1.DomainSystemService, system_repository_1.DomainSystemRepository],
        exports: [system_service_1.DomainSystemService],
    })
], DomainSystemModule);


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeTokenModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const employee_token_service_1 = __webpack_require__(57);
const employee_token_repository_1 = __webpack_require__(58);
const employee_token_entity_1 = __webpack_require__(34);
let DomainEmployeeTokenModule = class DomainEmployeeTokenModule {
};
exports.DomainEmployeeTokenModule = DomainEmployeeTokenModule;
exports.DomainEmployeeTokenModule = DomainEmployeeTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_token_entity_1.EmployeeToken])],
        providers: [employee_token_service_1.DomainEmployeeTokenService, employee_token_repository_1.DomainEmployeeTokenRepository],
        exports: [employee_token_service_1.DomainEmployeeTokenService],
    })
], DomainEmployeeTokenModule);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemManagementContextModule = void 0;
const common_1 = __webpack_require__(2);
const system_management_context_service_1 = __webpack_require__(59);
const system_module_1 = __webpack_require__(86);
const system_webhook_module_1 = __webpack_require__(89);
const system_role_module_1 = __webpack_require__(92);
const employee_system_role_module_1 = __webpack_require__(93);
const department_module_1 = __webpack_require__(94);
const employee_department_position_module_1 = __webpack_require__(95);
let SystemManagementContextModule = class SystemManagementContextModule {
};
exports.SystemManagementContextModule = SystemManagementContextModule;
exports.SystemManagementContextModule = SystemManagementContextModule = __decorate([
    (0, common_1.Module)({
        imports: [
            system_module_1.DomainSystemModule,
            system_webhook_module_1.DomainSystemWebhookModule,
            system_role_module_1.DomainSystemRoleModule,
            employee_system_role_module_1.DomainEmployeeSystemRoleModule,
            department_module_1.DomainDepartmentModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
        ],
        providers: [system_management_context_service_1.SystemManagementContextService],
        exports: [system_management_context_service_1.SystemManagementContextService],
    })
], SystemManagementContextModule);


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemWebhookModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const system_webhook_service_1 = __webpack_require__(90);
const system_webhook_repository_1 = __webpack_require__(91);
const system_webhook_entity_1 = __webpack_require__(35);
let DomainSystemWebhookModule = class DomainSystemWebhookModule {
};
exports.DomainSystemWebhookModule = DomainSystemWebhookModule;
exports.DomainSystemWebhookModule = DomainSystemWebhookModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([system_webhook_entity_1.SystemWebhook])],
        providers: [system_webhook_service_1.DomainSystemWebhookService, system_webhook_repository_1.DomainSystemWebhookRepository],
        exports: [system_webhook_service_1.DomainSystemWebhookService],
    })
], DomainSystemWebhookModule);


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemWebhookService = void 0;
const common_1 = __webpack_require__(2);
const system_webhook_repository_1 = __webpack_require__(91);
const base_service_1 = __webpack_require__(47);
let DomainSystemWebhookService = class DomainSystemWebhookService extends base_service_1.BaseService {
    constructor(systemWebhookRepository) {
        super(systemWebhookRepository);
        this.systemWebhookRepository = systemWebhookRepository;
    }
    async findBySystemId(systemId) {
        return this.systemWebhookRepository.findAll({
            where: { systemId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByWebhookId(webhookId) {
        return this.systemWebhookRepository.findAll({
            where: { webhookId },
            order: { createdAt: 'DESC' },
        });
    }
    async findBySystemAndWebhook(systemId, webhookId) {
        const relation = await this.systemWebhookRepository.findOne({
            where: { systemId, webhookId },
        });
        if (!relation) {
            throw new common_1.NotFoundException('시스템-웹훅 관계를 찾을 수 없습니다.');
        }
        return relation;
    }
    async updateExecutionStats(systemId, webhookId, isSuccess) {
        const relation = await this.findBySystemAndWebhook(systemId, webhookId);
        const updateData = {
            lastExecutedAt: new Date(),
            executionCount: relation.executionCount + 1,
        };
        if (isSuccess) {
            updateData.successCount = relation.successCount + 1;
        }
        else {
            updateData.failureCount = relation.failureCount + 1;
        }
        return this.systemWebhookRepository.update(relation.id, updateData);
    }
    async findMostExecuted(limit = 10) {
        return this.systemWebhookRepository.findAll({
            order: { executionCount: 'DESC' },
            take: limit,
        });
    }
    async findHighFailureRate(minExecutions = 10) {
        return this.systemWebhookRepository.findAll({
            order: { failureCount: 'DESC' },
        });
    }
    async createRelation(systemId, webhookId) {
        return this.systemWebhookRepository.save({
            systemId,
            webhookId,
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
        });
    }
};
exports.DomainSystemWebhookService = DomainSystemWebhookService;
exports.DomainSystemWebhookService = DomainSystemWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof system_webhook_repository_1.DomainSystemWebhookRepository !== "undefined" && system_webhook_repository_1.DomainSystemWebhookRepository) === "function" ? _a : Object])
], DomainSystemWebhookService);


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemWebhookRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainSystemWebhookRepository = class DomainSystemWebhookRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainSystemWebhookRepository = DomainSystemWebhookRepository;
exports.DomainSystemWebhookRepository = DomainSystemWebhookRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.SystemWebhook)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainSystemWebhookRepository);


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemRoleModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const system_role_entity_1 = __webpack_require__(37);
const system_role_repository_1 = __webpack_require__(61);
const system_role_service_1 = __webpack_require__(60);
let DomainSystemRoleModule = class DomainSystemRoleModule {
};
exports.DomainSystemRoleModule = DomainSystemRoleModule;
exports.DomainSystemRoleModule = DomainSystemRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([system_role_entity_1.SystemRole])],
        providers: [system_role_repository_1.DomainSystemRoleRepository, system_role_service_1.DomainSystemRoleService],
        exports: [system_role_service_1.DomainSystemRoleService],
    })
], DomainSystemRoleModule);


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeSystemRoleModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const employee_system_role_entity_1 = __webpack_require__(38);
const employee_system_role_repository_1 = __webpack_require__(63);
const employee_system_role_service_1 = __webpack_require__(62);
let DomainEmployeeSystemRoleModule = class DomainEmployeeSystemRoleModule {
};
exports.DomainEmployeeSystemRoleModule = DomainEmployeeSystemRoleModule;
exports.DomainEmployeeSystemRoleModule = DomainEmployeeSystemRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_system_role_entity_1.EmployeeSystemRole])],
        providers: [employee_system_role_repository_1.DomainEmployeeSystemRoleRepository, employee_system_role_service_1.DomainEmployeeSystemRoleService],
        exports: [employee_system_role_service_1.DomainEmployeeSystemRoleService],
    })
], DomainEmployeeSystemRoleModule);


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainDepartmentModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const department_service_1 = __webpack_require__(65);
const department_repository_1 = __webpack_require__(66);
const department_entity_1 = __webpack_require__(24);
let DomainDepartmentModule = class DomainDepartmentModule {
};
exports.DomainDepartmentModule = DomainDepartmentModule;
exports.DomainDepartmentModule = DomainDepartmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([department_entity_1.Department])],
        providers: [department_service_1.DomainDepartmentService, department_repository_1.DomainDepartmentRepository],
        exports: [department_service_1.DomainDepartmentService],
    })
], DomainDepartmentModule);


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeDepartmentPositionModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const employee_department_position_service_1 = __webpack_require__(71);
const employee_department_position_repository_1 = __webpack_require__(72);
const employee_department_position_entity_1 = __webpack_require__(23);
let DomainEmployeeDepartmentPositionModule = class DomainEmployeeDepartmentPositionModule {
};
exports.DomainEmployeeDepartmentPositionModule = DomainEmployeeDepartmentPositionModule;
exports.DomainEmployeeDepartmentPositionModule = DomainEmployeeDepartmentPositionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_department_position_entity_1.EmployeeDepartmentPosition])],
        providers: [employee_department_position_service_1.DomainEmployeeDepartmentPositionService, employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository],
        exports: [employee_department_position_service_1.DomainEmployeeDepartmentPositionService],
    })
], DomainEmployeeDepartmentPositionModule);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationManagementContextModule = void 0;
const common_1 = __webpack_require__(2);
const organization_management_context_service_1 = __webpack_require__(64);
const organization_management_query_context_service_1 = __webpack_require__(97);
const organization_management_mutation_context_service_1 = __webpack_require__(98);
const employee_module_1 = __webpack_require__(84);
const department_module_1 = __webpack_require__(94);
const position_module_1 = __webpack_require__(99);
const rank_module_1 = __webpack_require__(100);
const employee_department_position_module_1 = __webpack_require__(95);
const employee_rank_history_module_1 = __webpack_require__(101);
let OrganizationManagementContextModule = class OrganizationManagementContextModule {
};
exports.OrganizationManagementContextModule = OrganizationManagementContextModule;
exports.OrganizationManagementContextModule = OrganizationManagementContextModule = __decorate([
    (0, common_1.Module)({
        imports: [
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            rank_module_1.DomainRankModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
            employee_rank_history_module_1.DomainEmployeeRankHistoryModule,
        ],
        providers: [
            organization_management_context_service_1.OrganizationContextService,
            organization_management_query_context_service_1.OrganizationManagementQueryContextService,
            organization_management_mutation_context_service_1.OrganizationManagementMutationContextService,
        ],
        exports: [
            organization_management_context_service_1.OrganizationContextService,
            organization_management_query_context_service_1.OrganizationManagementQueryContextService,
            organization_management_mutation_context_service_1.OrganizationManagementMutationContextService,
        ],
    })
], OrganizationManagementContextModule);


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationManagementQueryContextService = void 0;
const common_1 = __webpack_require__(2);
const employee_service_1 = __webpack_require__(44);
const department_service_1 = __webpack_require__(65);
const position_service_1 = __webpack_require__(67);
const rank_service_1 = __webpack_require__(69);
const employee_department_position_service_1 = __webpack_require__(71);
const employee_rank_history_service_1 = __webpack_require__(73);
let OrganizationManagementQueryContextService = class OrganizationManagementQueryContextService {
    constructor(직원서비스, 부서서비스, 직책서비스, 직급서비스, 직원부서직책서비스, 직원직급이력서비스) {
        this.직원서비스 = 직원서비스;
        this.부서서비스 = 부서서비스;
        this.직책서비스 = 직책서비스;
        this.직급서비스 = 직급서비스;
        this.직원부서직책서비스 = 직원부서직책서비스;
        this.직원직급이력서비스 = 직원직급이력서비스;
    }
    async 모든_부서를_계층구조로_조회한다() {
        const allDepartments = await this.부서서비스.findAllDepartmentsWithChildren();
        return this.부서_계층구조를_구축한다(allDepartments);
    }
    async 부서_ID로_부서를_조회한다(departmentId) {
        return await this.부서서비스.findByIdWithParent(departmentId);
    }
    async 부서_코드가_중복되는지_확인한다(departmentCode, excludeId) {
        try {
            const department = await this.부서서비스.findByDepartmentCode(departmentCode);
            if (!department) {
                return false;
            }
            return excludeId ? department.id !== excludeId : true;
        }
        catch {
            return false;
        }
    }
    async 모든_직원을_조회한다(includeTerminated = false) {
        return await this.직원서비스.findAllEmployees(includeTerminated);
    }
    async 직원_ID로_직원을_조회한다(employeeId) {
        return await this.직원서비스.findByEmployeeId(employeeId);
    }
    async 직원_사번이_중복되는지_확인한다(employeeNumber, excludeId) {
        try {
            const employee = await this.직원서비스.findByEmployeeNumber(employeeNumber);
            if (!employee) {
                return false;
            }
            return excludeId ? employee.id !== excludeId : true;
        }
        catch {
            return false;
        }
    }
    async 직원_이메일이_중복되는지_확인한다(email, excludeId) {
        try {
            const employee = await this.직원서비스.findByEmail(email);
            if (!employee) {
                return false;
            }
            return excludeId ? employee.id !== excludeId : true;
        }
        catch {
            return false;
        }
    }
    async 직원의_상세정보를_조회한다(employeeId) {
        const employee = await this.직원_ID로_직원을_조회한다(employeeId);
        let department;
        let position;
        try {
            const departmentPosition = await this.직원부서직책서비스.findByEmployeeId(employeeId);
            department = await this.부서서비스.findById(departmentPosition.departmentId);
            position = await this.직책서비스.findById(departmentPosition.positionId);
        }
        catch {
        }
        let rank;
        if (employee.currentRankId) {
            try {
                rank = await this.직급서비스.findById(employee.currentRankId);
            }
            catch {
            }
        }
        return { employee, department, position, rank };
    }
    async 모든_직책을_조회한다() {
        return await this.직책서비스.findAllPositions();
    }
    async 직책_ID로_직책을_조회한다(positionId) {
        return await this.직책서비스.findById(positionId);
    }
    async 직책_코드가_중복되는지_확인한다(positionCode, excludeId) {
        try {
            const position = await this.직책서비스.findByPositionCode(positionCode);
            if (!position) {
                return false;
            }
            return excludeId ? position.id !== excludeId : true;
        }
        catch {
            return false;
        }
    }
    async 모든_직급을_조회한다() {
        return await this.직급서비스.findAllRanks();
    }
    async 직급_ID로_직급을_조회한다(rankId) {
        return await this.직급서비스.findById(rankId);
    }
    async 직급_코드가_중복되는지_확인한다(rankCode, excludeId) {
        try {
            const rank = await this.직급서비스.findByRankCode(rankCode);
            if (!rank) {
                return false;
            }
            return excludeId ? rank.id !== excludeId : true;
        }
        catch {
            return false;
        }
    }
    async 직원의_현재_배치정보를_조회한다(employeeId) {
        return await this.직원부서직책서비스.findByEmployeeId(employeeId);
    }
    async 직원의_모든_배치정보를_조회한다(employeeId) {
        return await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
    }
    async 배치_ID로_배치정보를_조회한다(assignmentId) {
        return await this.직원부서직책서비스.findById(assignmentId);
    }
    async 부서에_배치된_직원들을_조회한다(departmentId) {
        return await this.직원부서직책서비스.findByDepartmentId(departmentId);
    }
    async 직원이_이미_해당_부서에_배치되어있는지_확인한다(employeeId, departmentId) {
        try {
            const assignment = await this.직원부서직책서비스.findByEmployeeAndDepartment(employeeId, departmentId);
            return !!assignment;
        }
        catch {
            return false;
        }
    }
    async 직원의_직급이력을_조회한다(employeeId) {
        return await this.직원직급이력서비스.findByEmployeeId(employeeId);
    }
    async 직급이력_ID로_이력을_조회한다(historyId) {
        return await this.직원직급이력서비스.findById(historyId);
    }
    async 직원의_최근_직급이력을_조회한다(employeeId) {
        const histories = await this.직원의_직급이력을_조회한다(employeeId);
        return histories.length > 0 ? histories[0] : null;
    }
    부서_계층구조를_구축한다(departments) {
        const departmentMap = new Map(departments.map((dept) => [dept.id, dept]));
        const rootDepartments = departments.filter((dept) => !dept.parentDepartmentId);
        for (const dept of departments) {
            dept.childDepartments = departments
                .filter((child) => child.parentDepartmentId === dept.id)
                .sort((a, b) => a.order - b.order);
        }
        return rootDepartments.sort((a, b) => a.order - b.order);
    }
    async 조직도_통계를_조회한다() {
        const [departments, allEmployees, positions, ranks, assignments] = await Promise.all([
            this.모든_부서를_계층구조로_조회한다(),
            this.모든_직원을_조회한다(true),
            this.모든_직책을_조회한다(),
            this.모든_직급을_조회한다(),
            this.직원부서직책서비스.findAllAssignments(),
        ]);
        const 활성_직원수 = allEmployees.filter((emp) => emp.status === '재직중').length;
        const 휴직_직원수 = allEmployees.filter((emp) => emp.status === '휴직').length;
        const 퇴사_직원수 = allEmployees.filter((emp) => emp.status === '퇴사').length;
        const positionMap = new Map(positions.map((pos) => [pos.id, pos.positionTitle]));
        const positionStats = new Map();
        for (const assignment of assignments) {
            const positionTitle = positionMap.get(assignment.positionId) || '알 수 없음';
            positionStats.set(positionTitle, (positionStats.get(positionTitle) || 0) + 1);
        }
        const rankMap = new Map(ranks.map((rank) => [rank.id, rank.rankName]));
        const rankStats = new Map();
        for (const employee of allEmployees) {
            if (employee.currentRankId) {
                const rankName = rankMap.get(employee.currentRankId) || '알 수 없음';
                rankStats.set(rankName, (rankStats.get(rankName) || 0) + 1);
            }
        }
        return {
            총_부서수: this.모든_부서_개수를_계산한다(departments),
            총_직원수: allEmployees.length,
            활성_직원수,
            휴직_직원수,
            퇴사_직원수,
            직책별_통계: Array.from(positionStats.entries()).map(([직책명, 인원수]) => ({ 직책명, 인원수 })),
            직급별_통계: Array.from(rankStats.entries()).map(([직급명, 인원수]) => ({ 직급명, 인원수 })),
        };
    }
    모든_부서_개수를_계산한다(departments) {
        let count = departments.length;
        for (const dept of departments) {
            if (dept.childDepartments) {
                count += this.모든_부서_개수를_계산한다(dept.childDepartments);
            }
        }
        return count;
    }
};
exports.OrganizationManagementQueryContextService = OrganizationManagementQueryContextService;
exports.OrganizationManagementQueryContextService = OrganizationManagementQueryContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object, typeof (_b = typeof department_service_1.DomainDepartmentService !== "undefined" && department_service_1.DomainDepartmentService) === "function" ? _b : Object, typeof (_c = typeof position_service_1.DomainPositionService !== "undefined" && position_service_1.DomainPositionService) === "function" ? _c : Object, typeof (_d = typeof rank_service_1.DomainRankService !== "undefined" && rank_service_1.DomainRankService) === "function" ? _d : Object, typeof (_e = typeof employee_department_position_service_1.DomainEmployeeDepartmentPositionService !== "undefined" && employee_department_position_service_1.DomainEmployeeDepartmentPositionService) === "function" ? _e : Object, typeof (_f = typeof employee_rank_history_service_1.DomainEmployeeRankHistoryService !== "undefined" && employee_rank_history_service_1.DomainEmployeeRankHistoryService) === "function" ? _f : Object])
], OrganizationManagementQueryContextService);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationManagementMutationContextService = void 0;
const common_1 = __webpack_require__(2);
const employee_service_1 = __webpack_require__(44);
const department_service_1 = __webpack_require__(65);
const position_service_1 = __webpack_require__(67);
const rank_service_1 = __webpack_require__(69);
const employee_department_position_service_1 = __webpack_require__(71);
const employee_rank_history_service_1 = __webpack_require__(73);
const enums_1 = __webpack_require__(15);
let OrganizationManagementMutationContextService = class OrganizationManagementMutationContextService {
    constructor(직원서비스, 부서서비스, 직책서비스, 직급서비스, 직원부서직책서비스, 직원직급이력서비스) {
        this.직원서비스 = 직원서비스;
        this.부서서비스 = 부서서비스;
        this.직책서비스 = 직책서비스;
        this.직급서비스 = 직급서비스;
        this.직원부서직책서비스 = 직원부서직책서비스;
        this.직원직급이력서비스 = 직원직급이력서비스;
    }
    async 새로운_부서를_생성한다(부서정보) {
        return await this.부서서비스.createDepartment({
            departmentName: 부서정보.departmentName,
            departmentCode: 부서정보.departmentCode,
            type: 부서정보.type,
            parentDepartmentId: 부서정보.parentDepartmentId,
            order: 부서정보.order || 0,
        });
    }
    async 부서정보를_수정한다(departmentId, 수정정보) {
        return await this.부서서비스.updateDepartment(departmentId, 수정정보);
    }
    async 부서를_삭제한다(departmentId) {
        const childDepartments = await this.부서서비스.findChildDepartments(departmentId);
        if (childDepartments.length > 0) {
            throw new Error('하위 부서가 존재하여 삭제할 수 없습니다.');
        }
        const assignedEmployees = await this.직원부서직책서비스.findByDepartmentId(departmentId);
        if (assignedEmployees.length > 0) {
            throw new Error('해당 부서에 배치된 직원이 있어 삭제할 수 없습니다.');
        }
        await this.부서서비스.deleteDepartment(departmentId);
    }
    async 새로운_직원을_생성한다(직원정보) {
        return await this.직원서비스.createEmployee({
            employeeNumber: 직원정보.employeeNumber,
            name: 직원정보.name,
            email: 직원정보.email,
            phoneNumber: 직원정보.phoneNumber,
            dateOfBirth: 직원정보.dateOfBirth,
            gender: 직원정보.gender,
            hireDate: 직원정보.hireDate,
            status: enums_1.EmployeeStatus.Active,
            currentRankId: 직원정보.currentRankId,
            isInitialPasswordSet: false,
        });
    }
    async 직원정보를_수정한다(employeeId, 수정정보) {
        return await this.직원서비스.updateEmployee(employeeId, 수정정보);
    }
    async 직원을_퇴사처리한다(employeeId, terminationDate) {
        const assignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
        for (const assignment of assignments) {
            await this.직원부서직책서비스.deleteAssignment(assignment.id);
        }
        return await this.직원서비스.updateEmployee(employeeId, {
            status: enums_1.EmployeeStatus.Terminated,
            terminationDate,
        });
    }
    async 직원을_삭제한다(employeeId) {
        const assignments = await this.직원부서직책서비스.findAllByEmployeeId(employeeId);
        for (const assignment of assignments) {
            await this.직원부서직책서비스.deleteAssignment(assignment.id);
        }
        const rankHistories = await this.직원직급이력서비스.findByEmployeeId(employeeId);
        for (const history of rankHistories) {
            await this.직원직급이력서비스.deleteHistory(history.id);
        }
        await this.직원서비스.deleteEmployee(employeeId);
    }
    async 새로운_직책을_생성한다(직책정보) {
        return await this.직책서비스.createPosition({
            positionTitle: 직책정보.positionTitle,
            positionCode: 직책정보.positionCode,
            level: 직책정보.level,
            hasManagementAuthority: 직책정보.hasManagementAuthority || false,
        });
    }
    async 직책정보를_수정한다(positionId, 수정정보) {
        return await this.직책서비스.updatePosition(positionId, 수정정보);
    }
    async 직책을_삭제한다(positionId) {
        const assignedEmployees = await this.직원부서직책서비스.findByPositionId(positionId);
        if (assignedEmployees.length > 0) {
            throw new Error('해당 직책에 배치된 직원이 있어 삭제할 수 없습니다.');
        }
        await this.직책서비스.deletePosition(positionId);
    }
    async 새로운_직급을_생성한다(직급정보) {
        return await this.직급서비스.createRank({
            rankName: 직급정보.rankName,
            rankCode: 직급정보.rankCode,
            level: 직급정보.level,
        });
    }
    async 직급정보를_수정한다(rankId, 수정정보) {
        return await this.직급서비스.updateRank(rankId, 수정정보);
    }
    async 직급을_삭제한다(rankId) {
        const employeesWithRank = await this.직원서비스.findByRankId(rankId);
        if (employeesWithRank.length > 0) {
            throw new Error('해당 직급을 가진 직원이 있어 삭제할 수 없습니다.');
        }
        const rankHistories = await this.직원직급이력서비스.findByRankId(rankId);
        if (rankHistories.length > 0) {
            throw new Error('해당 직급의 이력이 있어 삭제할 수 없습니다.');
        }
        await this.직급서비스.deleteRank(rankId);
    }
    async 직원을_부서에_배치한다(배치정보) {
        try {
            const existingAssignment = await this.직원부서직책서비스.findByEmployeeAndDepartment(배치정보.employeeId, 배치정보.departmentId);
            throw new Error('이미 해당 부서에 배치되어 있습니다.');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
            }
            else {
                throw error;
            }
        }
        return await this.직원부서직책서비스.createAssignment({
            employeeId: 배치정보.employeeId,
            departmentId: 배치정보.departmentId,
            positionId: 배치정보.positionId,
            isManager: 배치정보.isManager || false,
        });
    }
    async 직원배치정보를_수정한다(assignmentId, 수정정보) {
        return await this.직원부서직책서비스.updateAssignment(assignmentId, 수정정보);
    }
    async 직원배치를_해제한다(assignmentId) {
        await this.직원부서직책서비스.deleteAssignment(assignmentId);
    }
    async 직원의_직급을_변경한다(employeeId, newRankId) {
        const updatedEmployee = await this.직원서비스.updateEmployee(employeeId, {
            currentRankId: newRankId,
        });
        const rankHistory = await this.직원직급이력서비스.createHistory({
            employeeId,
            rankId: newRankId,
        });
        return {
            employee: updatedEmployee,
            rankHistory,
        };
    }
    async 직급이력을_삭제한다(historyId) {
        await this.직원직급이력서비스.deleteHistory(historyId);
    }
    async 직원을_새로_채용하고_배치한다(채용정보) {
        const employee = await this.새로운_직원을_생성한다({
            employeeNumber: 채용정보.employeeNumber,
            name: 채용정보.name,
            email: 채용정보.email,
            phoneNumber: 채용정보.phoneNumber,
            dateOfBirth: 채용정보.dateOfBirth,
            gender: 채용정보.gender,
            hireDate: 채용정보.hireDate,
            currentRankId: 채용정보.rankId,
        });
        const assignment = await this.직원을_부서에_배치한다({
            employeeId: employee.id,
            departmentId: 채용정보.departmentId,
            positionId: 채용정보.positionId,
            isManager: 채용정보.isManager,
        });
        const rankHistory = await this.직원직급이력서비스.createHistory({
            employeeId: employee.id,
            rankId: 채용정보.rankId,
        });
        return { employee, assignment, rankHistory };
    }
    async 직원의_부서를_이동시킨다(이동정보) {
        const oldAssignment = await this.직원부서직책서비스.findById(이동정보.현재_배치_ID);
        await this.직원배치를_해제한다(이동정보.현재_배치_ID);
        const newAssignment = await this.직원을_부서에_배치한다({
            employeeId: 이동정보.employeeId,
            departmentId: 이동정보.새로운_부서_ID,
            positionId: 이동정보.새로운_직책_ID,
            isManager: 이동정보.isManager,
        });
        return { oldAssignment, newAssignment };
    }
};
exports.OrganizationManagementMutationContextService = OrganizationManagementMutationContextService;
exports.OrganizationManagementMutationContextService = OrganizationManagementMutationContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object, typeof (_b = typeof department_service_1.DomainDepartmentService !== "undefined" && department_service_1.DomainDepartmentService) === "function" ? _b : Object, typeof (_c = typeof position_service_1.DomainPositionService !== "undefined" && position_service_1.DomainPositionService) === "function" ? _c : Object, typeof (_d = typeof rank_service_1.DomainRankService !== "undefined" && rank_service_1.DomainRankService) === "function" ? _d : Object, typeof (_e = typeof employee_department_position_service_1.DomainEmployeeDepartmentPositionService !== "undefined" && employee_department_position_service_1.DomainEmployeeDepartmentPositionService) === "function" ? _e : Object, typeof (_f = typeof employee_rank_history_service_1.DomainEmployeeRankHistoryService !== "undefined" && employee_rank_history_service_1.DomainEmployeeRankHistoryService) === "function" ? _f : Object])
], OrganizationManagementMutationContextService);


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainPositionModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const position_service_1 = __webpack_require__(67);
const position_repository_1 = __webpack_require__(68);
const position_entity_1 = __webpack_require__(25);
let DomainPositionModule = class DomainPositionModule {
};
exports.DomainPositionModule = DomainPositionModule;
exports.DomainPositionModule = DomainPositionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([position_entity_1.Position])],
        providers: [position_service_1.DomainPositionService, position_repository_1.DomainPositionRepository],
        exports: [position_service_1.DomainPositionService],
    })
], DomainPositionModule);


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainRankModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const rank_service_1 = __webpack_require__(69);
const rank_repository_1 = __webpack_require__(70);
const rank_entity_1 = __webpack_require__(22);
let DomainRankModule = class DomainRankModule {
};
exports.DomainRankModule = DomainRankModule;
exports.DomainRankModule = DomainRankModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rank_entity_1.Rank])],
        providers: [rank_service_1.DomainRankService, rank_repository_1.DomainRankRepository],
        exports: [rank_service_1.DomainRankService],
    })
], DomainRankModule);


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeRankHistoryModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const employee_rank_history_service_1 = __webpack_require__(73);
const employee_rank_history_repository_1 = __webpack_require__(74);
const employee_rank_history_entity_1 = __webpack_require__(28);
let DomainEmployeeRankHistoryModule = class DomainEmployeeRankHistoryModule {
};
exports.DomainEmployeeRankHistoryModule = DomainEmployeeRankHistoryModule;
exports.DomainEmployeeRankHistoryModule = DomainEmployeeRankHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_rank_history_entity_1.EmployeeRankHistory])],
        providers: [employee_rank_history_service_1.DomainEmployeeRankHistoryService, employee_rank_history_repository_1.DomainEmployeeRankHistoryRepository],
        exports: [employee_rank_history_service_1.DomainEmployeeRankHistoryService],
    })
], DomainEmployeeRankHistoryModule);


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MigrationModule = void 0;
const common_1 = __webpack_require__(2);
const migration_service_1 = __webpack_require__(103);
const employee_module_1 = __webpack_require__(84);
const department_module_1 = __webpack_require__(94);
const position_module_1 = __webpack_require__(99);
const rank_module_1 = __webpack_require__(100);
const employee_department_position_module_1 = __webpack_require__(95);
const employee_rank_history_module_1 = __webpack_require__(101);
const user_module_1 = __webpack_require__(111);
let MigrationModule = class MigrationModule {
};
exports.MigrationModule = MigrationModule;
exports.MigrationModule = MigrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            rank_module_1.DomainRankModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
            employee_rank_history_module_1.DomainEmployeeRankHistoryModule,
            user_module_1.DomainUserModule,
        ],
        providers: [migration_service_1.MigrationService],
        exports: [migration_service_1.MigrationService],
    })
], MigrationModule);


/***/ }),
/* 103 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MigrationService = void 0;
const common_1 = __webpack_require__(2);
const employee_service_1 = __webpack_require__(44);
const department_service_1 = __webpack_require__(65);
const position_service_1 = __webpack_require__(67);
const rank_service_1 = __webpack_require__(69);
const employee_department_position_service_1 = __webpack_require__(71);
const employee_rank_history_service_1 = __webpack_require__(73);
const employee_response_dto_1 = __webpack_require__(104);
const axios_1 = __webpack_require__(105);
const department_response_dto_1 = __webpack_require__(106);
const position_response_dto_1 = __webpack_require__(107);
const rank_response_dto_1 = __webpack_require__(108);
const user_service_1 = __webpack_require__(109);
let MigrationService = class MigrationService {
    constructor(employeeService, departmentService, positionService, rankService, employeeDepartmentPositionService, employeeRankHistoryService, userService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.rankService = rankService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.employeeRankHistoryService = employeeRankHistoryService;
        this.userService = userService;
    }
    async onApplicationBootstrap() {
    }
    async getEmployees() {
        const response = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`);
        const employees = response.data.map((employee) => new employee_response_dto_1.EmployeeResponseDto(employee));
        return employees;
    }
    async getDepartments() {
        const response = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/departments?hierarchy=true`);
        const departments = response.data.map((department) => new department_response_dto_1.DepartmentResponseDto(department));
        return departments;
    }
    async getPositions() {
        const response = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/positions`);
        const positions = response.data.map((position) => new position_response_dto_1.PositionResponseDto(position));
        return positions;
    }
    async getRanks() {
        const response = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/ranks`);
        const ranks = response.data.map((rank) => new rank_response_dto_1.RankResponseDto(rank));
        return ranks;
    }
    async migrate() {
        const employees = await this.getEmployees();
        const departments = await this.getDepartments();
        const positions = await this.getPositions();
        const ranks = await this.getRanks();
        for (const rank of ranks) {
            const existingRank = await this.rankService.findByCode(rank.rank_code);
            if (existingRank) {
                console.log(`${rank.rank_name} 직급은 이미 존재합니다.`);
                continue;
            }
            await this.rankService.save({
                rankName: rank.rank_name,
                rankCode: rank.rank_code,
                level: rank.level,
            });
        }
        for (const position of positions) {
            const existingPosition = await this.positionService.findByCode(position.position_code);
            if (existingPosition) {
                console.log(`${position.position_title} 직책은 이미 존재합니다.`);
                continue;
            }
            await this.positionService.save({
                positionTitle: position.position_title,
                positionCode: position.position_code,
                hasManagementAuthority: position.level >= 5,
                level: position.level,
            });
        }
        const insertDepartments = async () => {
            const savedDepartmentIds = new Map();
            const saveDepartmentHierarchy = async (department, parentUuid = null) => {
                try {
                    const existingDepartment = await this.departmentService.findByCode(department.department_code);
                    if (existingDepartment) {
                        console.log(`${department.department_name} 부서는 이미 존재합니다.`);
                    }
                    else {
                        const savedDepartment = await this.departmentService.save({
                            departmentName: department.department_name,
                            departmentCode: department.department_code,
                            parentDepartmentId: parentUuid,
                            order: department.order || 0,
                        });
                        savedDepartmentIds.set(department._id, savedDepartment.id);
                    }
                    console.log(`부서 저장 완료: ${department.department_name} (${department.department_code}) - Parent: ${parentUuid || 'ROOT'}`);
                    if (department.child_departments && department.child_departments.length > 0) {
                        for (const childDepartment of department.child_departments) {
                            await saveDepartmentHierarchy(childDepartment, savedDepartmentIds.get(department._id));
                        }
                    }
                }
                catch (error) {
                    console.error(`부서 저장 실패: ${department.department_name}`, error);
                }
            };
            const rootDepartments = departments;
            for (const rootDepartment of rootDepartments) {
                await saveDepartmentHierarchy(rootDepartment);
            }
            console.log(`총 ${savedDepartmentIds.size}개 부서 저장 완료`);
            return savedDepartmentIds;
        };
        const departmentIdMap = await insertDepartments();
        for (const employee of employees) {
            let existingEmployee = await this.employeeService.findByEmployeeNumber(employee.employee_number);
            let rank = null, position = null, department = null;
            if (employee.rank) {
                rank = await this.rankService.findByCode(employee.rank.rank_code);
            }
            if (existingEmployee) {
                existingEmployee = await this.employeeService.update(existingEmployee.id, {
                    status: employee.status,
                    currentRankId: rank?.id,
                    hireDate: employee.hire_date,
                    dateOfBirth: employee.date_of_birth,
                    gender: employee.gender,
                });
            }
            else {
                existingEmployee = await this.employeeService.save({
                    employeeNumber: employee.employee_number,
                    name: employee.name,
                    email: employee.email,
                    phoneNumber: employee.phone_number || '',
                    status: employee.status,
                    currentRankId: rank?.id,
                    hireDate: employee.hire_date,
                    dateOfBirth: employee.date_of_birth,
                    gender: employee.gender,
                });
            }
            if (employee.position) {
                position = await this.positionService.findByCode(employee.position.position_code);
            }
            if (employee.department) {
                department = await this.departmentService.findByCode(employee.department.department_code);
            }
            const user = await this.userService.findByEmployeeNumber(employee.employee_number);
            if (!user) {
                console.log(`${employee.name} 직원은 유저 정보가 없습니다.`);
            }
            else {
                existingEmployee.password = user.password;
                existingEmployee.isInitialPasswordSet = user.isInitialPasswordSet;
            }
            const savedEmployee = await this.employeeService.save(existingEmployee);
            const existingEmployeeDepartmentPosition = await this.employeeDepartmentPositionService.findOne({
                where: {
                    employeeId: existingEmployee.id,
                },
            });
            if (existingEmployeeDepartmentPosition) {
                await this.employeeDepartmentPositionService.update(existingEmployeeDepartmentPosition.id, {
                    departmentId: department?.id,
                    positionId: position?.id,
                });
            }
            if (!existingEmployeeDepartmentPosition && department && position) {
                await this.employeeDepartmentPositionService.save({
                    employeeId: savedEmployee.id,
                    departmentId: department?.id,
                    positionId: position?.id,
                });
            }
        }
    }
};
exports.MigrationService = MigrationService;
exports.MigrationService = MigrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object, typeof (_b = typeof department_service_1.DomainDepartmentService !== "undefined" && department_service_1.DomainDepartmentService) === "function" ? _b : Object, typeof (_c = typeof position_service_1.DomainPositionService !== "undefined" && position_service_1.DomainPositionService) === "function" ? _c : Object, typeof (_d = typeof rank_service_1.DomainRankService !== "undefined" && rank_service_1.DomainRankService) === "function" ? _d : Object, typeof (_e = typeof employee_department_position_service_1.DomainEmployeeDepartmentPositionService !== "undefined" && employee_department_position_service_1.DomainEmployeeDepartmentPositionService) === "function" ? _e : Object, typeof (_f = typeof employee_rank_history_service_1.DomainEmployeeRankHistoryService !== "undefined" && employee_rank_history_service_1.DomainEmployeeRankHistoryService) === "function" ? _f : Object, typeof (_g = typeof user_service_1.DomainUserService !== "undefined" && user_service_1.DomainUserService) === "function" ? _g : Object])
], MigrationService);


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class PositionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID', example: '67d1436e91e5366c32791be3' }),
    __metadata("design:type", String)
], PositionDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책명', example: '직원' }),
    __metadata("design:type", String)
], PositionDto.prototype, "position_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 코드', example: '직원' }),
    __metadata("design:type", String)
], PositionDto.prototype, "position_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 레벨', example: 6 }),
    __metadata("design:type", Number)
], PositionDto.prototype, "level", void 0);
class RankDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 ID', example: '67d1081c9af04fc1b2f65c1d' }),
    __metadata("design:type", String)
], RankDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급명', example: '연구원' }),
    __metadata("design:type", String)
], RankDto.prototype, "rank_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 코드', example: '연구원' }),
    __metadata("design:type", String)
], RankDto.prototype, "rank_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 레벨', example: 9 }),
    __metadata("design:type", Number)
], RankDto.prototype, "level", void 0);
class DepartmentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID', example: '67d0f1d19af04fc1b2f65af2' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명', example: 'RF파트' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "department_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 코드', example: '우주-RF' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "department_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 순서', example: 4 }),
    __metadata("design:type", Number)
], DepartmentDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상위 부서 ID',
        example: '684bd41148148ddbd9068cd9',
        nullable: true,
    }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "parent_department_id", void 0);
class EmployeeResponseDto {
    constructor(employee) {
        this._id = employee._id;
        this.employee_number = employee.employee_number;
        this.name = employee.name;
        this.email = employee.email;
        this.phone_number = employee.phone_number;
        this.date_of_birth = employee.date_of_birth;
        this.gender = employee.gender;
        this.hire_date = employee.hire_date;
        this.manager_id = employee.manager_id;
        this.status = employee.status;
        this.department_history = employee.department_history || [];
        this.position_history = employee.position_history || [];
        this.rank_history = employee.rank_history || [];
        this.created_at = employee.created_at;
        this.updated_at = employee.updated_at;
        this.__v = employee.__v;
        this.position = employee.position;
        this.rank = employee.rank;
        this.department = employee.department;
    }
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID', example: '67d116b691e5366c3279162c' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사번', example: '25006' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employee_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름', example: '홍연창' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일', example: 'hong.yonchang@lumir.space' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', example: '' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생년월일', example: '1976-10-14T00:00:00.000Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], EmployeeResponseDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', example: 'MALE' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일', example: '2025-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EmployeeResponseDto.prototype, "hire_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 ID',
        example: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "manager_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '재직 상태', example: '재직중' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부서 이력',
        type: [Object],
        example: [],
    }),
    __metadata("design:type", Array)
], EmployeeResponseDto.prototype, "department_history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직책 이력',
        type: [Object],
        example: [],
    }),
    __metadata("design:type", Array)
], EmployeeResponseDto.prototype, "position_history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직급 이력',
        type: [Object],
        example: [],
    }),
    __metadata("design:type", Array)
], EmployeeResponseDto.prototype, "rank_history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일', example: '2025-03-12T05:08:06.261Z' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], EmployeeResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일', example: '2025-03-12T08:59:32.380Z' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], EmployeeResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB 버전', example: 0 }),
    __metadata("design:type", Number)
], EmployeeResponseDto.prototype, "__v", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 직책 정보',
        type: PositionDto,
        nullable: true,
    }),
    __metadata("design:type", PositionDto)
], EmployeeResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 직급 정보',
        type: RankDto,
        nullable: true,
    }),
    __metadata("design:type", RankDto)
], EmployeeResponseDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 부서 정보',
        type: DepartmentDto,
        nullable: true,
    }),
    __metadata("design:type", DepartmentDto)
], EmployeeResponseDto.prototype, "department", void 0);


/***/ }),
/* 105 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 106 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class DepartmentResponseDto {
    constructor(department) {
        this._id = department._id;
        this.department_name = department.department_name;
        this.department_code = department.department_code;
        this.manager_id = department.manager_id;
        this.parent_department_id = department.parent_department_id;
        this.order = department.order;
        this.child_departments = department.child_departments || [];
        this.id = department.id;
        this.created_at = department.created_at;
        this.updated_at = department.updated_at;
        this.__v = department.__v;
    }
}
exports.DepartmentResponseDto = DepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 MongoDB ID', example: '67d0f1629af04fc1b2f65ad4' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명', example: '경영지원실' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "department_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서코드', example: '경영지원-경지' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "department_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부서장 ID',
        example: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "manager_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상위 부서 ID',
        example: '67d0f1189af04fc1b2f65ab7',
        nullable: true,
    }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "parent_department_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 순서', example: 0 }),
    __metadata("design:type", Number)
], DepartmentResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '하위 부서 목록',
        type: [DepartmentResponseDto],
        example: [],
    }),
    __metadata("design:type", Array)
], DepartmentResponseDto.prototype, "child_departments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID (별칭)', example: '67d0f1629af04fc1b2f65ad4' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일', example: '2025-03-12T02:28:50.885Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DepartmentResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일', example: '2025-06-17T16:33:39.394Z' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DepartmentResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB 버전', example: 0 }),
    __metadata("design:type", Number)
], DepartmentResponseDto.prototype, "__v", void 0);


/***/ }),
/* 107 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PositionResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class PositionResponseDto {
    constructor(position) {
        this._id = position._id;
        this.position_title = position.position_title;
        this.position_code = position.position_code;
        this.level = position.level;
        this.description = position.description;
        this.created_at = position.created_at;
        this.updated_at = position.updated_at;
        this.id = position.id;
    }
}
exports.PositionResponseDto = PositionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 MongoDB ID', example: '67d106849af04fc1b2f65be1' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책명', example: '파트장' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "position_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 코드', example: '파트장' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "position_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 레벨', example: 5 }),
    __metadata("design:type", Number)
], PositionResponseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 설명', example: '' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일', example: '2025-03-12T03:59:00.853Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], PositionResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일', example: '2025-06-27T08:08:15.994Z' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PositionResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID (별칭)', example: '67d106849af04fc1b2f65be1' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "id", void 0);


/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RankResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RankResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일', example: '2025-06-17T08:31:54.817Z' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], RankResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 ID (별칭)', example: '67d107c49af04fc1b2f65bf9' }),
    __metadata("design:type", String)
], RankResponseDto.prototype, "id", void 0);


/***/ }),
/* 109 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainUserService = void 0;
const common_1 = __webpack_require__(2);
const user_repository_1 = __webpack_require__(110);
const base_service_1 = __webpack_require__(47);
const bcrypt = __webpack_require__(49);
let DomainUserService = class DomainUserService extends base_service_1.BaseService {
    constructor(userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }
    async findByEmployeeNumber(employeeNumber) {
        const user = await this.userRepository.findOne({ where: { employeeNumber } });
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }
    async checkEmployeeNumberExists(employeeNumber) {
        const user = await this.userRepository.findOne({ where: { employeeNumber } });
        return !!user;
    }
    async checkEmailExists(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return !!user;
    }
    async createUser(userData) {
        if (userData.employeeNumber && (await this.checkEmployeeNumberExists(userData.employeeNumber))) {
            throw new common_1.ConflictException('이미 존재하는 사번입니다.');
        }
        if (userData.email && (await this.checkEmailExists(userData.email))) {
            throw new common_1.ConflictException('이미 존재하는 이메일입니다.');
        }
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return await this.userRepository.save(userData);
    }
    async changePassword(userId, newPassword) {
        const user = await this.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.isInitialPasswordSet = true;
        return await this.userRepository.save(user);
    }
    async validatePassword(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : null;
    }
    async isInitialPasswordSet(userId) {
        const user = await this.findOne({ where: { id: userId } });
        return user?.isInitialPasswordSet || false;
    }
    async updateUserStatus(userId, status) {
        const user = await this.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        user.status = status;
        return await this.userRepository.save(user);
    }
    async updateUserInfo(userId, updateData) {
        const user = await this.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        const { password, isInitialPasswordSet, ...safeUpdateData } = updateData;
        Object.assign(user, safeUpdateData);
        return await this.userRepository.save(user);
    }
    async findActiveUsers() {
        return await this.userRepository.findAll({
            where: { status: '재직중' },
            order: { name: 'ASC' },
        });
    }
    async findUsersByDepartment(department) {
        return await this.userRepository.findAll({
            where: { department },
            order: { name: 'ASC' },
        });
    }
};
exports.DomainUserService = DomainUserService;
exports.DomainUserService = DomainUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.DomainUserRepository !== "undefined" && user_repository_1.DomainUserRepository) === "function" ? _a : Object])
], DomainUserService);


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainUserRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const base_repository_1 = __webpack_require__(46);
const user_entity_1 = __webpack_require__(33);
const typeorm_2 = __webpack_require__(5);
let DomainUserRepository = class DomainUserRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainUserRepository = DomainUserRepository;
exports.DomainUserRepository = DomainUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], DomainUserRepository);


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainUserModule = void 0;
const common_1 = __webpack_require__(2);
const user_service_1 = __webpack_require__(109);
const user_repository_1 = __webpack_require__(110);
const typeorm_1 = __webpack_require__(5);
const user_entity_1 = __webpack_require__(33);
let DomainUserModule = class DomainUserModule {
};
exports.DomainUserModule = DomainUserModule;
exports.DomainUserModule = DomainUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        providers: [user_service_1.DomainUserService, user_repository_1.DomainUserRepository],
        exports: [user_service_1.DomainUserService, user_repository_1.DomainUserRepository],
    })
], DomainUserModule);


/***/ }),
/* 112 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationInformationApplicationModule = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(113);
const jwt_1 = __webpack_require__(52);
const config_1 = __webpack_require__(4);
const organization_information_application_service_1 = __webpack_require__(114);
const organization_information_application_controller_1 = __webpack_require__(115);
const organization_management_context_module_1 = __webpack_require__(96);
const authorization_context_module_1 = __webpack_require__(83);
const migration_module_1 = __webpack_require__(102);
const jwt_strategy_1 = __webpack_require__(126);
const jwt_auth_guard_1 = __webpack_require__(128);
const jwt_config_1 = __webpack_require__(129);
let OrganizationInformationApplicationModule = class OrganizationInformationApplicationModule {
};
exports.OrganizationInformationApplicationModule = OrganizationInformationApplicationModule;
exports.OrganizationInformationApplicationModule = OrganizationInformationApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            organization_management_context_module_1.OrganizationManagementContextModule,
            authorization_context_module_1.AuthorizationContextModule,
            migration_module_1.MigrationModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: jwt_config_1.jwtConfig,
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [organization_information_application_controller_1.OrganizationInformationApplicationController],
        providers: [organization_information_application_service_1.OrganizationInformationApplicationService, jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard],
        exports: [organization_information_application_service_1.OrganizationInformationApplicationService],
    })
], OrganizationInformationApplicationModule);


/***/ }),
/* 113 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationInformationApplicationService = void 0;
const common_1 = __webpack_require__(2);
const organization_management_context_service_1 = __webpack_require__(64);
let OrganizationInformationApplicationService = class OrganizationInformationApplicationService {
    constructor(organizationContextService) {
        this.organizationContextService = organizationContextService;
    }
    async 직원정보를_조회한다(requestDto) {
        const { employeeId, employeeNumber, withDetail } = requestDto;
        if (!employeeId && !employeeNumber) {
            throw new common_1.BadRequestException('직원 ID 또는 사번 중 하나는 반드시 필요합니다.');
        }
        let employee;
        if (employeeId) {
            employee = await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(employeeId);
        }
        else if (employeeNumber) {
            employee = await this.organizationContextService.직원_사번으로_직원정보를_조회한다(employeeNumber);
        }
        if (!employee) {
            throw new common_1.NotFoundException('해당 직원 정보를 찾을 수 없습니다.');
        }
        let response = {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            employeeNumber: employee.employeeNumber,
            phoneNumber: employee.phoneNumber,
            dateOfBirth: employee.dateOfBirth,
            gender: employee.gender,
            hireDate: employee.hireDate,
            status: employee.status,
        };
        if (withDetail) {
            const details = await this.organizationContextService.직원의_부서_직책_직급을_조회한다(employee);
            response.department = this.부서_정보를_매핑한다(details.department);
            response.position = this.직책_정보를_매핑한다(details.position);
            response.rank = this.직급_정보를_매핑한다(details.rank);
        }
        return response;
    }
    async 여러_직원정보를_조회한다(requestDto) {
        const { employeeIds, employeeNumbers, withDetail = false, includeTerminated = false } = requestDto;
        let employees = [];
        try {
            if (employeeIds && employeeIds.length > 0) {
                employees = await this.organizationContextService.여러_직원_ID값으로_직원정보를_조회한다(employeeIds, includeTerminated);
            }
            else if (employeeNumbers && employeeNumbers.length > 0) {
                employees = await this.organizationContextService.여러_직원_사번으로_직원정보를_조회한다(employeeNumbers, includeTerminated);
            }
            else {
                employees = await this.organizationContextService.전체_직원정보를_조회한다(includeTerminated);
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('직원 정보를 조회할 수 없습니다.');
        }
        const employeeResponses = [];
        let detailsMap;
        if (withDetail && employees.length > 0) {
            try {
                detailsMap = await this.organizationContextService.여러_직원의_부서_직책_직급을_일괄조회한다(employees);
            }
            catch (error) {
            }
        }
        for (const employee of employees) {
            const response = {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                employeeNumber: employee.employeeNumber,
                phoneNumber: employee.phoneNumber,
                dateOfBirth: employee.dateOfBirth,
                gender: employee.gender,
                hireDate: employee.hireDate,
                status: employee.status,
            };
            if (withDetail && detailsMap) {
                const details = detailsMap.get(employee.id);
                if (details) {
                    response.department = this.부서_정보를_매핑한다(details.department);
                    response.position = this.직책_정보를_매핑한다(details.position);
                    response.rank = this.직급_정보를_매핑한다(details.rank);
                }
            }
            employeeResponses.push(response);
        }
        return {
            employees: employeeResponses,
            total: employeeResponses.length,
        };
    }
    부서_정보를_매핑한다(department) {
        if (!department)
            return undefined;
        return {
            id: department.id,
            departmentName: department.departmentName,
            departmentCode: department.departmentCode,
            type: department.type,
            parentDepartmentId: department.parentDepartmentId,
            parentDepartmentName: department.parentDepartment?.departmentName,
            order: department.order,
        };
    }
    직책_정보를_매핑한다(position) {
        if (!position)
            return undefined;
        return {
            id: position.id,
            positionTitle: position.positionTitle,
            positionCode: position.positionCode,
            level: position.level,
            hasManagementAuthority: position.hasManagementAuthority,
        };
    }
    직급_정보를_매핑한다(rank) {
        if (!rank)
            return undefined;
        return {
            id: rank.id,
            rankName: rank.rankName,
            rankCode: rank.rankCode,
            level: rank.level,
        };
    }
    async 부서_계층구조별_직원정보를_조회한다(requestDto) {
        const { rootDepartmentId, maxDepth, withEmployeeDetail = false, includeTerminated = false, includeEmptyDepartments = true, } = requestDto;
        try {
            const result = await this.organizationContextService.부서_계층구조별_직원정보를_조회한다(rootDepartmentId, maxDepth, withEmployeeDetail, includeTerminated, includeEmptyDepartments);
            const departmentHierarchy = this.부서_계층구조를_응답_DTO로_변환한다(result.departments, result.employeesByDepartment, result.departmentDetails, withEmployeeDetail);
            const { totalDepartments, totalEmployees, maxDepthCalculated } = this.부서_계층구조_통계를_계산한다(departmentHierarchy);
            return {
                departments: departmentHierarchy,
                totalDepartments,
                totalEmployees,
                maxDepth: maxDepthCalculated,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException('부서 계층구조 정보를 조회할 수 없습니다.');
        }
    }
    부서_계층구조를_응답_DTO로_변환한다(departments, employeesByDepartment, departmentDetails, withEmployeeDetail = false, currentDepth = 0) {
        const result = [];
        for (const department of departments) {
            const departmentEmployeeInfo = employeesByDepartment.get(department.id) || {
                employees: [],
                departmentPositions: new Map(),
            };
            const employees = [];
            for (const employee of departmentEmployeeInfo.employees) {
                const employeeResponse = {
                    id: employee.id,
                    name: employee.name,
                    email: employee.email,
                    employeeNumber: employee.employeeNumber,
                    phoneNumber: employee.phoneNumber,
                    dateOfBirth: employee.dateOfBirth,
                    gender: employee.gender,
                    hireDate: employee.hireDate,
                    status: employee.status,
                };
                if (withEmployeeDetail && departmentDetails) {
                    const deptDetails = departmentDetails.get(department.id);
                    if (deptDetails) {
                        const employeeDetail = deptDetails.find((d) => {
                            const deptPositions = departmentEmployeeInfo.departmentPositions;
                            return deptPositions.has(employee.id) && d.department.id === department.id;
                        });
                        if (employeeDetail) {
                            employeeResponse.department = this.부서_정보를_매핑한다(employeeDetail.department);
                            employeeResponse.position = this.직책_정보를_매핑한다(employeeDetail.position);
                            employeeResponse.rank = this.직급_정보를_매핑한다(employeeDetail.rank);
                        }
                    }
                }
                employees.push(employeeResponse);
            }
            const childDepartments = this.부서_계층구조를_응답_DTO로_변환한다(department.childDepartments || [], employeesByDepartment, departmentDetails, withEmployeeDetail, currentDepth + 1);
            const departmentDto = {
                id: department.id,
                departmentName: department.departmentName,
                departmentCode: department.departmentCode,
                type: department.type,
                parentDepartmentId: department.parentDepartmentId,
                parentDepartmentName: department.parentDepartment?.departmentName,
                order: department.order,
                depth: currentDepth,
                employees: employees.sort((a, b) => a.name.localeCompare(b.name)),
                employeeCount: employees.length,
                childDepartments: childDepartments.sort((a, b) => a.order - b.order),
                childDepartmentCount: childDepartments.length,
            };
            result.push(departmentDto);
        }
        return result.sort((a, b) => a.order - b.order);
    }
    부서_계층구조_통계를_계산한다(departments) {
        let totalDepartments = 0;
        let totalEmployees = 0;
        let maxDepthCalculated = 0;
        const calculateStats = (depts) => {
            for (const dept of depts) {
                totalDepartments++;
                totalEmployees += dept.employeeCount;
                maxDepthCalculated = Math.max(maxDepthCalculated, dept.depth);
                if (dept.childDepartments && dept.childDepartments.length > 0) {
                    calculateStats(dept.childDepartments);
                }
            }
        };
        calculateStats(departments);
        return {
            totalDepartments,
            totalEmployees,
            maxDepthCalculated,
        };
    }
};
exports.OrganizationInformationApplicationService = OrganizationInformationApplicationService;
exports.OrganizationInformationApplicationService = OrganizationInformationApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof organization_management_context_service_1.OrganizationContextService !== "undefined" && organization_management_context_service_1.OrganizationContextService) === "function" ? _a : Object])
], OrganizationInformationApplicationService);


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationInformationApplicationController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(10);
const organization_information_application_service_1 = __webpack_require__(114);
const dto_1 = __webpack_require__(116);
const user_decorator_1 = __webpack_require__(124);
const public_decorator_1 = __webpack_require__(125);
const migration_service_1 = __webpack_require__(103);
let OrganizationInformationApplicationController = class OrganizationInformationApplicationController {
    constructor(organizationInformationApplicationService, migrationService) {
        this.organizationInformationApplicationService = organizationInformationApplicationService;
        this.migrationService = migrationService;
    }
    async getEmployee(user, employeeId, employeeNumber, withDetail) {
        console.log('인증된 사용자:', user);
        const requestDto = {
            employeeId,
            employeeNumber,
            withDetail,
        };
        return this.organizationInformationApplicationService.직원정보를_조회한다(requestDto);
    }
    async getEmployees(user, employeeIds, employeeNumbers, withDetail, includeTerminated) {
        const employeeIdsArray = employeeIds
            ? employeeIds
                .split(',')
                .map((id) => id.trim())
                .filter((id) => id.length > 0)
            : undefined;
        const employeeNumbersArray = employeeNumbers
            ? employeeNumbers
                .split(',')
                .map((num) => num.trim())
                .filter((num) => num.length > 0)
            : undefined;
        const requestDto = {
            employeeIds: employeeIdsArray,
            employeeNumbers: employeeNumbersArray,
            withDetail: withDetail || false,
            includeTerminated: includeTerminated || false,
        };
        return this.organizationInformationApplicationService.여러_직원정보를_조회한다(requestDto);
    }
    async getDepartmentHierarchy(user, rootDepartmentId, maxDepth, withEmployeeDetail, includeTerminated, includeEmptyDepartments) {
        console.log('부서 계층구조 조회 - 인증된 사용자:', user);
        const requestDto = {
            rootDepartmentId,
            maxDepth: maxDepth ? Number(maxDepth) : undefined,
            withEmployeeDetail: withEmployeeDetail === true || String(withEmployeeDetail) === 'true',
            includeTerminated: includeTerminated === true || String(includeTerminated) === 'true',
            includeEmptyDepartments: includeEmptyDepartments !== false && String(includeEmptyDepartments) !== 'false',
        };
        return this.organizationInformationApplicationService.부서_계층구조별_직원정보를_조회한다(requestDto);
    }
    async executeMigrationCron() {
        const startTime = Date.now();
        const timestamp = new Date().toISOString();
        try {
            console.log(`[${timestamp}] 조직 정보 마이그레이션 시작 - Cron 실행`);
            await this.migrationService.migrate();
            const executionTime = ((Date.now() - startTime) / 1000).toFixed(1);
            const successMessage = `마이그레이션이 성공적으로 완료되었습니다. (실행시간: ${executionTime}초)`;
            console.log(`[${timestamp}] ${successMessage}`);
            return {
                success: true,
                message: successMessage,
                timestamp,
                executionTime: `${executionTime}초`,
            };
        }
        catch (error) {
            const executionTime = ((Date.now() - startTime) / 1000).toFixed(1);
            const errorMessage = `마이그레이션 중 오류가 발생했습니다. (실행시간: ${executionTime}초)`;
            console.error(`[${timestamp}] ${errorMessage}`, error);
            return {
                success: false,
                message: errorMessage,
                error: error.message || '알 수 없는 오류',
                timestamp,
            };
        }
    }
};
exports.OrganizationInformationApplicationController = OrganizationInformationApplicationController;
__decorate([
    (0, common_1.Get)('employee'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '직원 정보 조회',
        description: '직원 ID 또는 사번으로 직원의 기본 정보와 조직 정보를 조회합니다.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeId',
        description: '직원 ID',
        required: false,
        type: String,
        example: 'emp123',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeNumber',
        description: '사번',
        required: false,
        type: String,
        example: 'E2023001',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'withDetail',
        description: '상세 정보 포함 여부 (부서, 직책, 직급의 상세 정보)',
        required: false,
        type: Boolean,
        example: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '직원 정보 조회 성공',
        type: dto_1.EmployeeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식 (직원 ID 또는 사번 중 하나는 필수)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증이 필요합니다' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '해당 직원을 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('employeeId')),
    __param(2, (0, common_1.Query)('employeeNumber')),
    __param(3, (0, common_1.Query)('withDetail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof user_decorator_1.AuthenticatedUser !== "undefined" && user_decorator_1.AuthenticatedUser) === "function" ? _c : Object, String, String, Boolean]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], OrganizationInformationApplicationController.prototype, "getEmployee", null);
__decorate([
    (0, common_1.Get)('employees'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '여러 직원 정보 조회',
        description: '직원 ID 배열 또는 사번 배열로 여러 직원의 정보를 조회합니다. 배열이 비어있으면 전체 직원을 조회합니다.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeIds',
        description: '직원 ID 배열 (쉼표로 구분)',
        required: false,
        type: String,
        example: 'emp123,emp456',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeNumbers',
        description: '사번 배열 (쉼표로 구분)',
        required: false,
        type: String,
        example: 'E2023001,E2023002',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'withDetail',
        description: '상세 정보 포함 여부 (부서, 직책, 직급의 상세 정보)',
        required: false,
        type: Boolean,
        example: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'includeTerminated',
        description: '퇴사한 직원 포함 여부',
        required: false,
        type: Boolean,
        example: false,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '직원 목록 조회 성공',
        type: dto_1.EmployeesResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증이 필요합니다' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '직원 정보를 조회할 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('employeeIds')),
    __param(2, (0, common_1.Query)('employeeNumbers')),
    __param(3, (0, common_1.Query)('withDetail')),
    __param(4, (0, common_1.Query)('includeTerminated')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_decorator_1.AuthenticatedUser !== "undefined" && user_decorator_1.AuthenticatedUser) === "function" ? _e : Object, String, String, Boolean, Boolean]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], OrganizationInformationApplicationController.prototype, "getEmployees", null);
__decorate([
    (0, common_1.Get)('departments/hierarchy'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '부서 계층구조별 직원 정보 조회',
        description: '부서의 계층구조를 따라 각 부서에 속한 직원들의 목록을 깊이와 함께 조회합니다.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'rootDepartmentId',
        description: '조회할 최상위 부서 ID (지정하지 않으면 전체 조직도 조회)',
        required: false,
        type: String,
        example: 'dept-uuid-123',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'maxDepth',
        description: '최대 조회 깊이 (기본값: 무제한)',
        required: false,
        type: Number,
        example: 3,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'withEmployeeDetail',
        description: '직원 상세 정보 포함 여부 (부서, 직책, 직급 정보)',
        required: false,
        type: Boolean,
        example: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'includeTerminated',
        description: '퇴사한 직원 포함 여부',
        required: false,
        type: Boolean,
        example: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'includeEmptyDepartments',
        description: '빈 부서 포함 여부 (직원이 없는 부서도 포함)',
        required: false,
        type: Boolean,
        example: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '부서 계층구조별 직원 정보 조회 성공',
        type: dto_1.DepartmentHierarchyResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증이 필요합니다' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '부서 계층구조 정보를 조회할 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('rootDepartmentId')),
    __param(2, (0, common_1.Query)('maxDepth')),
    __param(3, (0, common_1.Query)('withEmployeeDetail')),
    __param(4, (0, common_1.Query)('includeTerminated')),
    __param(5, (0, common_1.Query)('includeEmptyDepartments')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof user_decorator_1.AuthenticatedUser !== "undefined" && user_decorator_1.AuthenticatedUser) === "function" ? _g : Object, String, Number, Boolean, Boolean, Boolean]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], OrganizationInformationApplicationController.prototype, "getDepartmentHierarchy", null);
__decorate([
    (0, common_1.Get)('cron/sync'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '조직 정보 마이그레이션 실행 (Cron)',
        description: 'Vercel cron에서 호출되는 마이그레이션 API입니다. 매일 자정에 자동 실행됩니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '마이그레이션 실행 성공',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: '마이그레이션이 성공적으로 완료되었습니다.' },
                timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
                executionTime: { type: 'string', example: '2.5초' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: '마이그레이션 실행 실패',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: '마이그레이션 중 오류가 발생했습니다.' },
                error: { type: 'string', example: 'Database connection failed' },
                timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], OrganizationInformationApplicationController.prototype, "executeMigrationCron", null);
exports.OrganizationInformationApplicationController = OrganizationInformationApplicationController = __decorate([
    (0, swagger_1.ApiTags)('Client - 조직 정보 API'),
    (0, common_1.Controller)('organization'),
    __metadata("design:paramtypes", [typeof (_a = typeof organization_information_application_service_1.OrganizationInformationApplicationService !== "undefined" && organization_information_application_service_1.OrganizationInformationApplicationService) === "function" ? _a : Object, typeof (_b = typeof migration_service_1.MigrationService !== "undefined" && migration_service_1.MigrationService) === "function" ? _b : Object])
], OrganizationInformationApplicationController);


/***/ }),
/* 116 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(117), exports);
__exportStar(__webpack_require__(119), exports);
__exportStar(__webpack_require__(120), exports);
__exportStar(__webpack_require__(121), exports);
__exportStar(__webpack_require__(122), exports);
__exportStar(__webpack_require__(123), exports);


/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeRequestDto = void 0;
const class_validator_1 = __webpack_require__(78);
const class_transformer_1 = __webpack_require__(118);
const swagger_1 = __webpack_require__(10);
class EmployeeRequestDto {
}
exports.EmployeeRequestDto = EmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직원 ID로 조회',
        example: 'emp123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사번으로 조회',
        example: 'E2023001',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EmployeeRequestDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '상세 정보 포함 여부 (부서, 직책, 직급의 상세 정보)',
        example: true,
        type: Boolean,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], EmployeeRequestDto.prototype, "withDetail", void 0);


/***/ }),
/* 118 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 119 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeResponseDto = exports.RankDetailDto = exports.PositionDetailDto = exports.DepartmentDetailDto = void 0;
const swagger_1 = __webpack_require__(10);
const entities_1 = __webpack_require__(12);
class DepartmentDetailDto {
}
exports.DepartmentDetailDto = DepartmentDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID' }),
    __metadata("design:type", String)
], DepartmentDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명' }),
    __metadata("design:type", String)
], DepartmentDetailDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 코드' }),
    __metadata("design:type", String)
], DepartmentDetailDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 유형', enum: entities_1.DepartmentType }),
    __metadata("design:type", typeof (_a = typeof entities_1.DepartmentType !== "undefined" && entities_1.DepartmentType) === "function" ? _a : Object)
], DepartmentDetailDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '상위 부서 ID' }),
    __metadata("design:type", String)
], DepartmentDetailDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '상위 부서명' }),
    __metadata("design:type", String)
], DepartmentDetailDto.prototype, "parentDepartmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정렬 순서' }),
    __metadata("design:type", Number)
], DepartmentDetailDto.prototype, "order", void 0);
class PositionDetailDto {
}
exports.PositionDetailDto = PositionDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID' }),
    __metadata("design:type", String)
], PositionDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책명' }),
    __metadata("design:type", String)
], PositionDetailDto.prototype, "positionTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 코드' }),
    __metadata("design:type", String)
], PositionDetailDto.prototype, "positionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 레벨' }),
    __metadata("design:type", Number)
], PositionDetailDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관리 권한 여부' }),
    __metadata("design:type", Boolean)
], PositionDetailDto.prototype, "hasManagementAuthority", void 0);
class RankDetailDto {
}
exports.RankDetailDto = RankDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 ID' }),
    __metadata("design:type", String)
], RankDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급명' }),
    __metadata("design:type", String)
], RankDetailDto.prototype, "rankName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 코드' }),
    __metadata("design:type", String)
], RankDetailDto.prototype, "rankCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 레벨' }),
    __metadata("design:type", Number)
], RankDetailDto.prototype, "level", void 0);
class EmployeeResponseDto {
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 이름' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 이메일' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사번' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '전화번호' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '생년월일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EmployeeResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '성별' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], EmployeeResponseDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 상태' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '부서 상세 정보 (withDetail=true일 때만 포함)', type: DepartmentDetailDto }),
    __metadata("design:type", DepartmentDetailDto)
], EmployeeResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직책 상세 정보 (withDetail=true일 때만 포함)', type: PositionDetailDto }),
    __metadata("design:type", PositionDetailDto)
], EmployeeResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직급 상세 정보 (withDetail=true일 때만 포함)', type: RankDetailDto }),
    __metadata("design:type", RankDetailDto)
], EmployeeResponseDto.prototype, "rank", void 0);


/***/ }),
/* 120 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeesRequestDto = void 0;
const class_validator_1 = __webpack_require__(78);
const class_transformer_1 = __webpack_require__(118);
const swagger_1 = __webpack_require__(10);
class EmployeesRequestDto {
    constructor() {
        this.withDetail = false;
        this.includeTerminated = false;
    }
}
exports.EmployeesRequestDto = EmployeesRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직원 ID 배열 (비어있으면 전체 직원 조회)',
        example: ['emp123', 'emp456'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], EmployeesRequestDto.prototype, "employeeIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사번 배열 (비어있으면 전체 직원 조회)',
        example: ['E2023001', 'E2023002'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], EmployeesRequestDto.prototype, "employeeNumbers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '상세 정보 포함 여부 (부서, 직책, 직급의 상세 정보)',
        example: false,
        type: Boolean,
        default: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], EmployeesRequestDto.prototype, "withDetail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '퇴사한 직원 포함 여부',
        example: false,
        type: Boolean,
        default: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], EmployeesRequestDto.prototype, "includeTerminated", void 0);


/***/ }),
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeesResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
const employee_response_dto_1 = __webpack_require__(119);
class EmployeesResponseDto {
}
exports.EmployeesResponseDto = EmployeesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직원 목록',
        type: [employee_response_dto_1.EmployeeResponseDto],
    }),
    __metadata("design:type", Array)
], EmployeesResponseDto.prototype, "employees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '총 직원 수',
    }),
    __metadata("design:type", Number)
], EmployeesResponseDto.prototype, "total", void 0);


/***/ }),
/* 122 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentHierarchyRequestDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
const class_transformer_1 = __webpack_require__(118);
class DepartmentHierarchyRequestDto {
}
exports.DepartmentHierarchyRequestDto = DepartmentHierarchyRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '조회할 최상위 부서 ID (지정하지 않으면 전체 조직도 조회)',
        example: 'dept-uuid-123',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], DepartmentHierarchyRequestDto.prototype, "rootDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '최대 조회 깊이 (기본값: 무제한)',
        example: 3,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], DepartmentHierarchyRequestDto.prototype, "maxDepth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직원 상세 정보 포함 여부 (부서, 직책, 직급 정보)',
        example: true,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], DepartmentHierarchyRequestDto.prototype, "withEmployeeDetail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '퇴사한 직원 포함 여부',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], DepartmentHierarchyRequestDto.prototype, "includeTerminated", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '빈 부서 포함 여부 (직원이 없는 부서도 포함)',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], DepartmentHierarchyRequestDto.prototype, "includeEmptyDepartments", void 0);


/***/ }),
/* 123 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentHierarchyResponseDto = exports.DepartmentWithEmployeesDto = void 0;
const swagger_1 = __webpack_require__(10);
const entities_1 = __webpack_require__(12);
const employee_response_dto_1 = __webpack_require__(119);
class DepartmentWithEmployeesDto {
}
exports.DepartmentWithEmployeesDto = DepartmentWithEmployeesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID' }),
    __metadata("design:type", String)
], DepartmentWithEmployeesDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명' }),
    __metadata("design:type", String)
], DepartmentWithEmployeesDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 코드' }),
    __metadata("design:type", String)
], DepartmentWithEmployeesDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 유형', enum: entities_1.DepartmentType }),
    __metadata("design:type", typeof (_a = typeof entities_1.DepartmentType !== "undefined" && entities_1.DepartmentType) === "function" ? _a : Object)
], DepartmentWithEmployeesDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '상위 부서 ID' }),
    __metadata("design:type", String)
], DepartmentWithEmployeesDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '상위 부서명' }),
    __metadata("design:type", String)
], DepartmentWithEmployeesDto.prototype, "parentDepartmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정렬 순서' }),
    __metadata("design:type", Number)
], DepartmentWithEmployeesDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 깊이 (루트 부서는 0)' }),
    __metadata("design:type", Number)
], DepartmentWithEmployeesDto.prototype, "depth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '해당 부서 소속 직원 목록',
        type: [employee_response_dto_1.EmployeeResponseDto],
    }),
    __metadata("design:type", Array)
], DepartmentWithEmployeesDto.prototype, "employees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '해당 부서 직원 수',
    }),
    __metadata("design:type", Number)
], DepartmentWithEmployeesDto.prototype, "employeeCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '하위 부서 목록',
        type: [DepartmentWithEmployeesDto],
    }),
    __metadata("design:type", Array)
], DepartmentWithEmployeesDto.prototype, "childDepartments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '하위 부서 수',
    }),
    __metadata("design:type", Number)
], DepartmentWithEmployeesDto.prototype, "childDepartmentCount", void 0);
class DepartmentHierarchyResponseDto {
}
exports.DepartmentHierarchyResponseDto = DepartmentHierarchyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부서 계층구조',
        type: [DepartmentWithEmployeesDto],
    }),
    __metadata("design:type", Array)
], DepartmentHierarchyResponseDto.prototype, "departments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '총 부서 수',
    }),
    __metadata("design:type", Number)
], DepartmentHierarchyResponseDto.prototype, "totalDepartments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '총 직원 수',
    }),
    __metadata("design:type", Number)
], DepartmentHierarchyResponseDto.prototype, "totalEmployees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '최대 깊이',
    }),
    __metadata("design:type", Number)
], DepartmentHierarchyResponseDto.prototype, "maxDepth", void 0);


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const common_1 = __webpack_require__(2);
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 126 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(113);
const passport_jwt_1 = __webpack_require__(127);
const config_1 = __webpack_require__(4);
const authorization_context_service_1 = __webpack_require__(43);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, authorizationContextService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('GLOBAL_SECRET'),
            passReqToCallback: true,
        });
        this.configService = configService;
        this.authorizationContextService = authorizationContextService;
    }
    async validate(req, payload) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new common_1.UnauthorizedException('유효하지 않은 토큰 형식입니다.');
            }
            const accessToken = authHeader.split(' ')[1];
            const { employee, token } = await this.authorizationContextService.엑세스토큰을_검증한다(accessToken);
            return {
                id: employee.id,
                employeeNumber: employee.employeeNumber,
                name: employee.name,
                email: employee.email,
                status: employee.status,
                currentRankId: employee.currentRankId,
                token: {
                    id: token.id,
                    expiresAt: token.tokenExpiresAt,
                },
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('토큰 검증에 실패했습니다.');
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof authorization_context_service_1.AuthorizationContextService !== "undefined" && authorization_context_service_1.AuthorizationContextService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),
/* 127 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 128 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(113);
const core_1 = __webpack_require__(1);
const public_decorator_1 = __webpack_require__(125);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException('인증이 필요합니다.');
        }
        const request = context.switchToHttp().getRequest();
        request.user = user;
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConfig = void 0;
const jwtConfig = (configService) => ({
    secret: configService.get('GLOBAL_SECRET'),
    signOptions: {
        expiresIn: configService.get('JWT_EXPIRES_IN'),
    },
});
exports.jwtConfig = jwtConfig;


/***/ }),
/* 130 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmTokenManagementApplicationModule = void 0;
const common_1 = __webpack_require__(2);
const fcm_token_management_application_service_1 = __webpack_require__(131);
const fcm_token_management_application_controller_1 = __webpack_require__(137);
const organization_management_context_module_1 = __webpack_require__(96);
const fcm_token_management_context_module_1 = __webpack_require__(148);
let FcmTokenManagementApplicationModule = class FcmTokenManagementApplicationModule {
};
exports.FcmTokenManagementApplicationModule = FcmTokenManagementApplicationModule;
exports.FcmTokenManagementApplicationModule = FcmTokenManagementApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [organization_management_context_module_1.OrganizationManagementContextModule, fcm_token_management_context_module_1.FcmTokenManagementContextModule],
        controllers: [fcm_token_management_application_controller_1.FcmTokenManagementApplicationController],
        providers: [fcm_token_management_application_service_1.FcmTokenManagementApplicationService],
        exports: [fcm_token_management_application_service_1.FcmTokenManagementApplicationService],
    })
], FcmTokenManagementApplicationModule);


/***/ }),
/* 131 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmTokenManagementApplicationService = void 0;
const common_1 = __webpack_require__(2);
const organization_management_context_service_1 = __webpack_require__(64);
const fcm_token_management_context_service_1 = __webpack_require__(132);
let FcmTokenManagementApplicationService = class FcmTokenManagementApplicationService {
    constructor(organizationContextService, fcmTokenManagementContextService) {
        this.organizationContextService = organizationContextService;
        this.fcmTokenManagementContextService = fcmTokenManagementContextService;
    }
    async getEmployeeFromIdentifier(dto) {
        if (!dto.employeeId && !dto.employeeNumber) {
            throw new common_1.BadRequestException('employeeId 또는 employeeNumber 중 하나는 반드시 제공되어야 합니다.');
        }
        try {
            if (dto.employeeId && dto.employeeNumber) {
                return await this.validateAndGetEmployeeWithBothIdentifiers(dto.employeeId, dto.employeeNumber);
            }
            if (dto.employeeId) {
                return await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(dto.employeeId);
            }
            if (dto.employeeNumber) {
                return await this.organizationContextService.직원_사번으로_직원정보를_조회한다(dto.employeeNumber);
            }
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.NotFoundException('직원 정보를 찾을 수 없습니다.');
        }
        throw new common_1.BadRequestException('유효한 직원 식별자가 제공되지 않았습니다.');
    }
    async validateAndGetEmployeeWithBothIdentifiers(employeeId, employeeNumber) {
        const [employeeById, employeeByNumber] = await Promise.all([
            this.organizationContextService.직원_ID값으로_직원정보를_조회한다(employeeId).catch(() => null),
            this.organizationContextService.직원_사번으로_직원정보를_조회한다(employeeNumber).catch(() => null),
        ]);
        if (!employeeById && !employeeByNumber) {
            throw new common_1.NotFoundException('제공된 employeeId와 employeeNumber로 직원 정보를 찾을 수 없습니다.');
        }
        if (!employeeById) {
            throw new common_1.NotFoundException(`employeeId '${employeeId}'로 직원 정보를 찾을 수 없습니다.`);
        }
        if (!employeeByNumber) {
            throw new common_1.NotFoundException(`employeeNumber '${employeeNumber}'로 직원 정보를 찾을 수 없습니다.`);
        }
        if (employeeById.id !== employeeByNumber.id) {
            throw new common_1.BadRequestException(`employeeId '${employeeId}'와 employeeNumber '${employeeNumber}'가 서로 다른 직원을 가리킵니다. ` +
                `employeeId는 '${employeeById.employeeNumber}' 직원을, ` +
                `employeeNumber는 '${employeeByNumber.id}' 직원을 가리킵니다.`);
        }
        return employeeById;
    }
    async FCM토큰을_구독한다(requestDto) {
        const { fcmToken, deviceType } = requestDto;
        const employee = await this.getEmployeeFromIdentifier(requestDto);
        console.log('employee', employee);
        await this.fcmTokenManagementContextService.FCM토큰을_직원에게_등록한다(employee.id, fcmToken, deviceType);
        console.log('fcmToken', fcmToken);
        console.log('deviceType', deviceType);
        return {
            fcmToken: fcmToken,
        };
    }
    async FCM토큰을_조회한다(requestDto) {
        const employee = await this.getEmployeeFromIdentifier(requestDto);
        const employeeFcmTokens = await this.fcmTokenManagementContextService.직원의_활성_FCM토큰_목록을_조회한다(employee.id);
        const tokens = employeeFcmTokens.map((employeeFcmToken) => ({
            fcmToken: employeeFcmToken.fcmToken,
            deviceType: employeeFcmToken.deviceType,
            createdAt: employeeFcmToken.createdAt,
            updatedAt: employeeFcmToken.updatedAt,
        }));
        return {
            employeeId: employee.id,
            employeeNumber: employee.employeeNumber,
            tokens: tokens,
        };
    }
    async FCM토큰_구독을_해지한다(requestDto) {
        const employee = await this.getEmployeeFromIdentifier(requestDto);
        await this.fcmTokenManagementContextService.직원의_모든_FCM토큰을_제거한다(employee.id);
        return true;
    }
    async 여러_직원의_FCM토큰을_조회한다(employeeNumbers) {
        return this.여러_직원의_FCM토큰을_통합_조회한다(employeeNumbers, 'number');
    }
    async 여러_직원의_FCM토큰을_ID로_조회한다(employeeIds) {
        return this.여러_직원의_FCM토큰을_통합_조회한다(employeeIds, 'id');
    }
    async 여러_직원의_FCM토큰을_통합_조회한다(identifiers, type) {
        const byEmployee = [];
        const allTokens = [];
        for (const identifier of identifiers) {
            try {
                const employee = type === 'id'
                    ? await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(identifier)
                    : await this.organizationContextService.직원_사번으로_직원정보를_조회한다(identifier);
                const employeeFcmTokens = await this.fcmTokenManagementContextService.직원의_활성_FCM토큰_목록을_조회한다(employee.id);
                if (employeeFcmTokens.length > 0) {
                    const tokens = employeeFcmTokens.map((employeeFcmToken) => ({
                        fcmToken: employeeFcmToken.fcmToken,
                        deviceType: employeeFcmToken.deviceType,
                        createdAt: employeeFcmToken.createdAt,
                        updatedAt: employeeFcmToken.updatedAt,
                    }));
                    byEmployee.push({
                        employeeId: employee.id,
                        employeeNumber: employee.employeeNumber,
                        tokens: tokens,
                    });
                    const flatTokens = employeeFcmTokens.map((employeeFcmToken) => ({
                        employeeId: employee.id,
                        employeeNumber: employee.employeeNumber,
                        fcmToken: employeeFcmToken.fcmToken,
                        deviceType: employeeFcmToken.deviceType,
                        createdAt: employeeFcmToken.createdAt,
                        updatedAt: employeeFcmToken.updatedAt,
                    }));
                    allTokens.push(...flatTokens);
                }
            }
            catch (error) {
                console.warn(`${type} ${identifier} 조회 실패:`, error);
            }
        }
        return {
            byEmployee: byEmployee,
            allTokens: allTokens,
            totalEmployees: byEmployee.length,
            totalTokens: allTokens.length,
        };
    }
};
exports.FcmTokenManagementApplicationService = FcmTokenManagementApplicationService;
exports.FcmTokenManagementApplicationService = FcmTokenManagementApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof organization_management_context_service_1.OrganizationContextService !== "undefined" && organization_management_context_service_1.OrganizationContextService) === "function" ? _a : Object, typeof (_b = typeof fcm_token_management_context_service_1.FcmTokenManagementContextService !== "undefined" && fcm_token_management_context_service_1.FcmTokenManagementContextService) === "function" ? _b : Object])
], FcmTokenManagementApplicationService);


/***/ }),
/* 132 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmTokenManagementContextService = void 0;
const common_1 = __webpack_require__(2);
const employee_service_1 = __webpack_require__(44);
const fcm_token_service_1 = __webpack_require__(133);
const employee_fcm_token_service_1 = __webpack_require__(135);
let FcmTokenManagementContextService = class FcmTokenManagementContextService {
    constructor(직원서비스, FCM토큰서비스, 직원FCM토큰서비스) {
        this.직원서비스 = 직원서비스;
        this.FCM토큰서비스 = FCM토큰서비스;
        this.직원FCM토큰서비스 = 직원FCM토큰서비스;
    }
    async FCM토큰을_직원에게_등록한다(employeeId, fcmToken, deviceType, deviceInfo) {
        const employee = await this.직원서비스.findByEmployeeId(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('존재하지 않는 직원입니다.');
        }
        const fcmTokenEntity = await this.FCM토큰서비스.createOrFindByEmployeeAndDevice(employeeId, fcmToken, deviceType, deviceInfo);
        const relation = await this.직원FCM토큰서비스.createOrUpdateRelation(employeeId, fcmTokenEntity.id);
        return relation;
    }
    async FCM토큰을_직원으로부터_해제한다(employeeId, fcmToken) {
        const fcmTokenEntity = await this.FCM토큰서비스.findByFcmToken(fcmToken);
        if (!fcmTokenEntity) {
            throw new common_1.NotFoundException('존재하지 않는 FCM 토큰입니다.');
        }
        await this.직원FCM토큰서비스.deleteRelation(employeeId, fcmTokenEntity.id);
    }
    async 직원의_활성_FCM토큰_목록을_조회한다(employeeId) {
        const employee = await this.직원서비스.findByEmployeeId(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('존재하지 않는 직원입니다.');
        }
        const relations = await this.직원FCM토큰서비스.findByEmployeeId(employeeId);
        return relations.map((relation) => relation.fcmToken).filter((token) => token);
    }
    async 직원의_모든_FCM토큰을_제거한다(employeeId) {
        const employee = await this.직원서비스.findByEmployeeId(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('존재하지 않는 직원입니다.');
        }
        await this.직원FCM토큰서비스.deleteAllByEmployeeId(employeeId);
    }
};
exports.FcmTokenManagementContextService = FcmTokenManagementContextService;
exports.FcmTokenManagementContextService = FcmTokenManagementContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object, typeof (_b = typeof fcm_token_service_1.DomainFcmTokenService !== "undefined" && fcm_token_service_1.DomainFcmTokenService) === "function" ? _b : Object, typeof (_c = typeof employee_fcm_token_service_1.DomainEmployeeFcmTokenService !== "undefined" && employee_fcm_token_service_1.DomainEmployeeFcmTokenService) === "function" ? _c : Object])
], FcmTokenManagementContextService);


/***/ }),
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainFcmTokenService = void 0;
const common_1 = __webpack_require__(2);
const fcm_token_repository_1 = __webpack_require__(134);
const base_service_1 = __webpack_require__(47);
let DomainFcmTokenService = class DomainFcmTokenService extends base_service_1.BaseService {
    constructor(fcmTokenRepository) {
        super(fcmTokenRepository);
        this.fcmTokenRepository = fcmTokenRepository;
    }
    async findByFcmToken(fcmToken) {
        return this.fcmTokenRepository.findOne({
            where: { fcmToken },
        });
    }
    async findByEmployeeAndDeviceType(employeeId, deviceType) {
        return this.fcmTokenRepository.findByEmployeeAndDeviceType(employeeId, deviceType);
    }
    async createOrFindByEmployeeAndDevice(employeeId, fcmToken, deviceType, deviceInfo) {
        const existingToken = await this.findByFcmToken(fcmToken);
        if (existingToken) {
            return this.fcmTokenRepository.update(existingToken.id, {
                deviceType,
                deviceInfo,
                isActive: true,
            });
        }
        try {
            return await this.fcmTokenRepository.save({
                fcmToken,
                deviceType,
                deviceInfo,
                isActive: true,
            });
        }
        catch (error) {
            throw new common_1.ConflictException('FCM 토큰을 생성할 수 없습니다.');
        }
    }
    async createOrFind(fcmToken, deviceType = 'pc', deviceInfo) {
        const existingToken = await this.findByFcmToken(fcmToken);
        if (existingToken) {
            return this.fcmTokenRepository.update(existingToken.id, {
                deviceType,
                deviceInfo,
                isActive: true,
            });
        }
        try {
            return await this.fcmTokenRepository.save({
                fcmToken,
                deviceType,
                deviceInfo,
                isActive: true,
            });
        }
        catch (error) {
            if (error.code === '23505') {
                const token = await this.findByFcmToken(fcmToken);
                if (token) {
                    return token;
                }
            }
            throw error;
        }
    }
    async findByDeviceType(deviceType) {
        return this.fcmTokenRepository.findAll({
            where: { deviceType, isActive: true },
        });
    }
    async deactivateToken(fcmToken) {
        const token = await this.findByFcmToken(fcmToken);
        if (!token) {
            throw new common_1.ConflictException('FCM 토큰을 찾을 수 없습니다.');
        }
        return this.fcmTokenRepository.update(token.id, {
            isActive: false,
        });
    }
    async cleanupInactiveTokens() {
        await this.fcmTokenRepository.deleteInactiveTokens({
            where: { isActive: false },
        });
    }
    validateFcmToken(fcmToken) {
        if (!fcmToken || typeof fcmToken !== 'string') {
            return false;
        }
        if (fcmToken.length < 140) {
            return false;
        }
        const fcmTokenPattern = /^[A-Za-z0-9:_-]+$/;
        return fcmTokenPattern.test(fcmToken);
    }
    async countActiveTokens() {
        return this.fcmTokenRepository.count({
            where: { isActive: true },
        });
    }
    async countTokensByDeviceType() {
        const counts = await Promise.all([
            this.fcmTokenRepository.count({
                where: { deviceType: 'android', isActive: true },
            }),
            this.fcmTokenRepository.count({
                where: { deviceType: 'ios', isActive: true },
            }),
            this.fcmTokenRepository.count({
                where: { deviceType: 'pc', isActive: true },
            }),
            this.fcmTokenRepository.count({
                where: { deviceType: 'web', isActive: true },
            }),
        ]);
        return {
            android: counts[0],
            ios: counts[1],
            pc: counts[2],
            web: counts[3],
        };
    }
    async getStatisticsByDeviceType() {
        const counts = await this.countTokensByDeviceType();
        return Object.entries(counts).map(([deviceType, count]) => ({
            deviceType,
            count,
        }));
    }
};
exports.DomainFcmTokenService = DomainFcmTokenService;
exports.DomainFcmTokenService = DomainFcmTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof fcm_token_repository_1.DomainFcmTokenRepository !== "undefined" && fcm_token_repository_1.DomainFcmTokenRepository) === "function" ? _a : Object])
], DomainFcmTokenService);


/***/ }),
/* 134 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainFcmTokenRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainFcmTokenRepository = class DomainFcmTokenRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
    deleteInactiveTokens(repositoryOptions) {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return repository.delete({
            isActive: false,
        });
    }
    async findByEmployeeAndDeviceType(employeeId, deviceType) {
        return this.repository
            .createQueryBuilder('fcmToken')
            .innerJoin('employee_fcm_tokens', 'eft', 'eft.fcmTokenId = fcmToken.id')
            .where('eft.employeeId = :employeeId', { employeeId })
            .andWhere('fcmToken.deviceType = :deviceType', { deviceType })
            .andWhere('fcmToken.isActive = :isActive', { isActive: true })
            .getOne();
    }
};
exports.DomainFcmTokenRepository = DomainFcmTokenRepository;
exports.DomainFcmTokenRepository = DomainFcmTokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.FcmToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainFcmTokenRepository);


/***/ }),
/* 135 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeFcmTokenService = void 0;
const common_1 = __webpack_require__(2);
const employee_fcm_token_repository_1 = __webpack_require__(136);
const base_service_1 = __webpack_require__(47);
let DomainEmployeeFcmTokenService = class DomainEmployeeFcmTokenService extends base_service_1.BaseService {
    constructor(employeeFcmTokenRepository) {
        super(employeeFcmTokenRepository);
        this.employeeFcmTokenRepository = employeeFcmTokenRepository;
    }
    async findByEmployeeId(employeeId) {
        return this.employeeFcmTokenRepository.findAll({
            where: { employeeId },
            relations: ['fcmToken'],
        });
    }
    async findByFcmTokenId(fcmTokenId) {
        return this.employeeFcmTokenRepository.findAll({
            where: { fcmTokenId },
            relations: ['employee'],
        });
    }
    async createOrUpdateRelation(employeeId, fcmTokenId) {
        const existingRelation = await this.employeeFcmTokenRepository.findOne({
            where: { employeeId, fcmTokenId },
        });
        if (existingRelation) {
            return this.employeeFcmTokenRepository.update(existingRelation.id, {
                updatedAt: new Date(),
            });
        }
        return this.employeeFcmTokenRepository.save({
            employeeId,
            fcmTokenId,
        });
    }
    async deleteRelation(employeeId, fcmTokenId) {
        const relation = await this.employeeFcmTokenRepository.findOne({
            where: { employeeId, fcmTokenId },
        });
        if (relation) {
            await this.employeeFcmTokenRepository.delete(relation.id);
        }
    }
    async deleteAllByEmployeeId(employeeId) {
        const relations = await this.findByEmployeeId(employeeId);
        for (const relation of relations) {
            await this.employeeFcmTokenRepository.delete(relation.id);
        }
    }
    async updateUsage(employeeId, fcmTokenId) {
        const relation = await this.employeeFcmTokenRepository.findOne({
            where: { employeeId, fcmTokenId },
        });
        if (!relation) {
            throw new common_1.NotFoundException('직원과 FCM 토큰의 관계를 찾을 수 없습니다.');
        }
        return this.employeeFcmTokenRepository.update(relation.id, {
            updatedAt: new Date(),
        });
    }
    async countEmployeesByFcmToken(fcmTokenId) {
        return this.employeeFcmTokenRepository.count({
            where: { fcmTokenId },
        });
    }
    async countFcmTokensByEmployee(employeeId) {
        return this.employeeFcmTokenRepository.count({
            where: { employeeId },
        });
    }
    async deleteOldTokens(cutoffDate) {
        const relations = await this.employeeFcmTokenRepository.findAll({
            where: {},
        });
        let count = 0;
        for (const relation of relations) {
            if (relation.updatedAt && relation.updatedAt < cutoffDate) {
                await this.employeeFcmTokenRepository.delete(relation.id);
                count++;
            }
        }
        return count;
    }
    async updateTokenUsage(fcmTokenId) {
        const relations = await this.employeeFcmTokenRepository.findAll({
            where: { fcmTokenId },
        });
        for (const relation of relations) {
            await this.employeeFcmTokenRepository.update(relation.id, {
                updatedAt: new Date(),
            });
        }
    }
};
exports.DomainEmployeeFcmTokenService = DomainEmployeeFcmTokenService;
exports.DomainEmployeeFcmTokenService = DomainEmployeeFcmTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_fcm_token_repository_1.DomainEmployeeFcmTokenRepository !== "undefined" && employee_fcm_token_repository_1.DomainEmployeeFcmTokenRepository) === "function" ? _a : Object])
], DomainEmployeeFcmTokenService);


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeFcmTokenRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const employee_fcm_token_entity_1 = __webpack_require__(26);
const base_repository_1 = __webpack_require__(46);
let DomainEmployeeFcmTokenRepository = class DomainEmployeeFcmTokenRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainEmployeeFcmTokenRepository = DomainEmployeeFcmTokenRepository;
exports.DomainEmployeeFcmTokenRepository = DomainEmployeeFcmTokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_fcm_token_entity_1.EmployeeFcmToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainEmployeeFcmTokenRepository);


/***/ }),
/* 137 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmTokenManagementApplicationController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(10);
const fcm_token_management_application_service_1 = __webpack_require__(131);
const dto_1 = __webpack_require__(138);
let FcmTokenManagementApplicationController = class FcmTokenManagementApplicationController {
    constructor(fcmTokenManagementApplicationService) {
        this.fcmTokenManagementApplicationService = fcmTokenManagementApplicationService;
    }
    async subscribeFcm(body) {
        return this.fcmTokenManagementApplicationService.FCM토큰을_구독한다(body);
    }
    async getFcmToken(baseEmployeeIdentifierDto) {
        return this.fcmTokenManagementApplicationService.FCM토큰을_조회한다(baseEmployeeIdentifierDto);
    }
    async unsubscribeFcm(body) {
        return this.fcmTokenManagementApplicationService.FCM토큰_구독을_해지한다(body);
    }
    async getFcmTokens(employeeNumbers, employeeIds) {
        if (employeeIds) {
            const employeeIdsArray = employeeIds
                .split(',')
                .map((id) => id.trim())
                .filter((id) => id.length > 0);
            return this.fcmTokenManagementApplicationService.여러_직원의_FCM토큰을_ID로_조회한다(employeeIdsArray);
        }
        if (employeeNumbers) {
            const employeeNumbersArray = employeeNumbers
                .split(',')
                .map((num) => num.trim())
                .filter((num) => num.length > 0);
            return this.fcmTokenManagementApplicationService.여러_직원의_FCM토큰을_조회한다(employeeNumbersArray);
        }
        throw new common_1.BadRequestException('employeeIds 또는 employeeNumbers 중 하나는 반드시 제공되어야 합니다.');
    }
};
exports.FcmTokenManagementApplicationController = FcmTokenManagementApplicationController;
__decorate([
    (0, common_1.Post)('subscribe'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'FCM 토큰 구독',
        description: '사용자의 FCM 토큰을 등록하거나 업데이트합니다. ' +
            'employeeId와 employeeNumber가 둘 다 제공된 경우 정합성을 체크합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'FCM 토큰 구독 성공',
        type: dto_1.FcmSubscribeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식 또는 employeeId와 employeeNumber 정합성 오류' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '직원 정보를 찾을 수 없음' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.FcmSubscribeRequestDto !== "undefined" && dto_1.FcmSubscribeRequestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], FcmTokenManagementApplicationController.prototype, "subscribeFcm", null);
__decorate([
    (0, common_1.Get)('token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'FCM 토큰 조회',
        description: 'employeeId 또는 employeeNumber로 직원의 모든 FCM 토큰을 조회합니다. ' +
            '둘 다 제공된 경우 같은 직원을 가리키는지 정합성을 체크합니다.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeId',
        description: '직원 ID (UUID)',
        required: false,
        type: String,
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeNumber',
        description: '직원 번호',
        required: false,
        type: String,
        example: '25001',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'FCM 토큰 조회 성공',
        type: dto_1.FcmTokensResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식 또는 employeeId와 employeeNumber 정합성 오류' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '직원 정보를 찾을 수 없음' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.BaseEmployeeIdentifierDto !== "undefined" && dto_1.BaseEmployeeIdentifierDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], FcmTokenManagementApplicationController.prototype, "getFcmToken", null);
__decorate([
    (0, common_1.Post)('unsubscribe'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'FCM 토큰 구독 해지',
        description: 'employeeId 또는 employeeNumber로 FCM 토큰 구독을 해지합니다. ' + '둘 다 제공된 경우 정합성을 체크합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'FCM 토큰 구독 해지 성공',
        type: Boolean,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식 또는 employeeId와 employeeNumber 정합성 오류' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '직원 정보를 찾을 수 없음' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof dto_1.FcmUnsubscribeRequestDto !== "undefined" && dto_1.FcmUnsubscribeRequestDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], FcmTokenManagementApplicationController.prototype, "unsubscribeFcm", null);
__decorate([
    (0, common_1.Get)('tokens'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '여러 직원의 FCM 토큰 조회 (알림서버용)',
        description: '알림서버에서 사용할 여러 직원의 FCM 토큰을 조회합니다. employeeIds 또는 employeeNumbers 중 하나를 제공해야 합니다.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeNumbers',
        description: '직원번호 배열 (쉼표로 구분)',
        required: false,
        type: String,
        example: '25001,25002,25003',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeIds',
        description: '직원 ID 배열 (쉼표로 구분, UUID)',
        required: false,
        type: String,
        example: '123e4567-e89b-12d3-a456-426614174000,123e4567-e89b-12d3-a456-426614174001',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'FCM 토큰 목록 조회 성공',
        type: dto_1.MultipleFcmTokensResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 형식' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '직원 정보를 조회할 수 없음' }),
    __param(0, (0, common_1.Query)('employeeNumbers')),
    __param(1, (0, common_1.Query)('employeeIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], FcmTokenManagementApplicationController.prototype, "getFcmTokens", null);
exports.FcmTokenManagementApplicationController = FcmTokenManagementApplicationController = __decorate([
    (0, swagger_1.ApiTags)('Client - FCM 토큰 관리 API'),
    (0, common_1.Controller)('fcm'),
    __metadata("design:paramtypes", [typeof (_a = typeof fcm_token_management_application_service_1.FcmTokenManagementApplicationService !== "undefined" && fcm_token_management_application_service_1.FcmTokenManagementApplicationService) === "function" ? _a : Object])
], FcmTokenManagementApplicationController);


/***/ }),
/* 138 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(139), exports);
__exportStar(__webpack_require__(140), exports);
__exportStar(__webpack_require__(141), exports);
__exportStar(__webpack_require__(142), exports);
__exportStar(__webpack_require__(143), exports);
__exportStar(__webpack_require__(144), exports);
__exportStar(__webpack_require__(145), exports);
__exportStar(__webpack_require__(146), exports);
__exportStar(__webpack_require__(147), exports);


/***/ }),
/* 139 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEmployeeIdentifierDto = void 0;
const class_validator_1 = __webpack_require__(78);
const swagger_1 = __webpack_require__(10);
class BaseEmployeeIdentifierDto {
}
exports.BaseEmployeeIdentifierDto = BaseEmployeeIdentifierDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직원 ID (UUID). employeeNumber와 함께 제공되면 정합성을 체크합니다.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'employeeId는 유효한 UUID 형식이어야 합니다.' }),
    (0, class_validator_1.ValidateIf)((obj) => !obj.employeeNumber || obj.employeeId),
    __metadata("design:type", String)
], BaseEmployeeIdentifierDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '직원 번호. employeeId와 함께 제공되면 같은 직원을 가리키는지 검증합니다.',
        example: '25001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((obj) => !obj.employeeId || obj.employeeNumber),
    __metadata("design:type", String)
], BaseEmployeeIdentifierDto.prototype, "employeeNumber", void 0);


/***/ }),
/* 140 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmSubscribeRequestDto = void 0;
const class_validator_1 = __webpack_require__(78);
const swagger_1 = __webpack_require__(10);
const base_employee_identifier_dto_1 = __webpack_require__(139);
class FcmSubscribeRequestDto extends base_employee_identifier_dto_1.BaseEmployeeIdentifierDto {
}
exports.FcmSubscribeRequestDto = FcmSubscribeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'FCM 토큰',
        example: 'eGb1fxhAPTM6F-XYvVQFNu:APA91bEniVqcKgVLvVeS5Z5FZ5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FcmSubscribeRequestDto.prototype, "fcmToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '기기 타입',
        example: 'pc',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FcmSubscribeRequestDto.prototype, "deviceType", void 0);


/***/ }),
/* 141 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmSubscribeResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class FcmSubscribeResponseDto {
}
exports.FcmSubscribeResponseDto = FcmSubscribeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '등록된 FCM 토큰',
        example: 'eGb1fxhAPTM6F-XYvVQFNu:APA91bEniVqcKgVLvVeS5Z5FZ5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    }),
    __metadata("design:type", String)
], FcmSubscribeResponseDto.prototype, "fcmToken", void 0);


/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmTokenRequestDto = void 0;
const base_employee_identifier_dto_1 = __webpack_require__(139);
class FcmTokenRequestDto extends base_employee_identifier_dto_1.BaseEmployeeIdentifierDto {
}
exports.FcmTokenRequestDto = FcmTokenRequestDto;


/***/ }),
/* 143 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmTokenResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class FcmTokenResponseDto {
}
exports.FcmTokenResponseDto = FcmTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직원 ID',
        example: 'emp123',
    }),
    __metadata("design:type", String)
], FcmTokenResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사번',
        example: 'E2023001',
    }),
    __metadata("design:type", String)
], FcmTokenResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'FCM 토큰 (없으면 null)',
        example: 'eGb1fxhAPTM6F-XYvVQFNu:APA91bEniVqcKgVLvVeS5Z5FZ5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    }),
    __metadata("design:type", String)
], FcmTokenResponseDto.prototype, "fcmToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 마지막 업데이트 시간',
        example: '2024-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FcmTokenResponseDto.prototype, "updatedAt", void 0);


/***/ }),
/* 144 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmTokensResponseDto = exports.FcmTokenDto = void 0;
const swagger_1 = __webpack_require__(10);
class FcmTokenDto {
}
exports.FcmTokenDto = FcmTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'FCM 토큰' }),
    __metadata("design:type", String)
], FcmTokenDto.prototype, "fcmToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '디바이스 타입 (예: android, ios, pc, web)',
        type: String,
        example: 'pc',
    }),
    __metadata("design:type", String)
], FcmTokenDto.prototype, "deviceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FcmTokenDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], FcmTokenDto.prototype, "updatedAt", void 0);
class FcmTokensResponseDto {
}
exports.FcmTokensResponseDto = FcmTokensResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], FcmTokensResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 번호' }),
    __metadata("design:type", String)
], FcmTokensResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'FCM 토큰 목록',
        type: [FcmTokenDto],
    }),
    __metadata("design:type", Array)
], FcmTokensResponseDto.prototype, "tokens", void 0);


/***/ }),
/* 145 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MultipleFcmTokensResponseDto = exports.FlatFcmTokenDto = void 0;
const swagger_1 = __webpack_require__(10);
const fcm_tokens_response_dto_1 = __webpack_require__(144);
class FlatFcmTokenDto extends fcm_tokens_response_dto_1.FcmTokenDto {
}
exports.FlatFcmTokenDto = FlatFcmTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], FlatFcmTokenDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 번호' }),
    __metadata("design:type", String)
], FlatFcmTokenDto.prototype, "employeeNumber", void 0);
class MultipleFcmTokensResponseDto {
}
exports.MultipleFcmTokensResponseDto = MultipleFcmTokensResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직원별로 그룹핑된 토큰 정보',
        type: [fcm_tokens_response_dto_1.FcmTokensResponseDto],
    }),
    __metadata("design:type", Array)
], MultipleFcmTokensResponseDto.prototype, "byEmployee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '모든 토큰의 flat한 배열',
        type: [FlatFcmTokenDto],
    }),
    __metadata("design:type", Array)
], MultipleFcmTokensResponseDto.prototype, "allTokens", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '총 직원 수' }),
    __metadata("design:type", Number)
], MultipleFcmTokensResponseDto.prototype, "totalEmployees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '총 토큰 수' }),
    __metadata("design:type", Number)
], MultipleFcmTokensResponseDto.prototype, "totalTokens", void 0);


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmUnsubscribeRequestDto = void 0;
const base_employee_identifier_dto_1 = __webpack_require__(139);
class FcmUnsubscribeRequestDto extends base_employee_identifier_dto_1.BaseEmployeeIdentifierDto {
}
exports.FcmUnsubscribeRequestDto = FcmUnsubscribeRequestDto;


/***/ }),
/* 147 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmUnsubscribeResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class FcmUnsubscribeResponseDto {
}
exports.FcmUnsubscribeResponseDto = FcmUnsubscribeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '구독 해지 성공 여부',
        example: true,
    }),
    __metadata("design:type", Boolean)
], FcmUnsubscribeResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답 메시지',
        example: 'FCM 토큰 구독이 성공적으로 해지되었습니다.',
    }),
    __metadata("design:type", String)
], FcmUnsubscribeResponseDto.prototype, "message", void 0);


/***/ }),
/* 148 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FcmTokenManagementContextModule = void 0;
const common_1 = __webpack_require__(2);
const fcm_token_management_context_service_1 = __webpack_require__(132);
const employee_module_1 = __webpack_require__(84);
const fcm_token_module_1 = __webpack_require__(149);
const employee_fcm_token_module_1 = __webpack_require__(150);
let FcmTokenManagementContextModule = class FcmTokenManagementContextModule {
};
exports.FcmTokenManagementContextModule = FcmTokenManagementContextModule;
exports.FcmTokenManagementContextModule = FcmTokenManagementContextModule = __decorate([
    (0, common_1.Module)({
        imports: [employee_module_1.DomainEmployeeModule, fcm_token_module_1.DomainFcmTokenModule, employee_fcm_token_module_1.DomainEmployeeFcmTokenModule],
        providers: [fcm_token_management_context_service_1.FcmTokenManagementContextService],
        exports: [fcm_token_management_context_service_1.FcmTokenManagementContextService],
    })
], FcmTokenManagementContextModule);


/***/ }),
/* 149 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainFcmTokenModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const fcm_token_service_1 = __webpack_require__(133);
const fcm_token_repository_1 = __webpack_require__(134);
const fcm_token_entity_1 = __webpack_require__(27);
let DomainFcmTokenModule = class DomainFcmTokenModule {
};
exports.DomainFcmTokenModule = DomainFcmTokenModule;
exports.DomainFcmTokenModule = DomainFcmTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([fcm_token_entity_1.FcmToken])],
        providers: [fcm_token_service_1.DomainFcmTokenService, fcm_token_repository_1.DomainFcmTokenRepository],
        exports: [fcm_token_service_1.DomainFcmTokenService],
    })
], DomainFcmTokenModule);


/***/ }),
/* 150 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeFcmTokenModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const employee_fcm_token_service_1 = __webpack_require__(135);
const employee_fcm_token_repository_1 = __webpack_require__(136);
const employee_fcm_token_entity_1 = __webpack_require__(26);
let DomainEmployeeFcmTokenModule = class DomainEmployeeFcmTokenModule {
};
exports.DomainEmployeeFcmTokenModule = DomainEmployeeFcmTokenModule;
exports.DomainEmployeeFcmTokenModule = DomainEmployeeFcmTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_fcm_token_entity_1.EmployeeFcmToken])],
        providers: [employee_fcm_token_service_1.DomainEmployeeFcmTokenService, employee_fcm_token_repository_1.DomainEmployeeFcmTokenRepository],
        exports: [employee_fcm_token_service_1.DomainEmployeeFcmTokenService],
    })
], DomainEmployeeFcmTokenModule);


/***/ }),
/* 151 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(52);
const config_1 = __webpack_require__(4);
const passport_1 = __webpack_require__(113);
const organization_controller_1 = __webpack_require__(152);
const organization_application_service_1 = __webpack_require__(153);
const organization_management_context_module_1 = __webpack_require__(96);
const system_module_1 = __webpack_require__(161);
const log_module_1 = __webpack_require__(172);
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('GLOBAL_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            organization_management_context_module_1.OrganizationManagementContextModule,
            system_module_1.SystemModule,
            log_module_1.LogModule,
        ],
        controllers: [organization_controller_1.OrganizationController],
        providers: [organization_application_service_1.OrganizationApplicationService],
        exports: [organization_application_service_1.OrganizationApplicationService, system_module_1.SystemModule, log_module_1.LogModule],
    })
], AdminModule);


/***/ }),
/* 152 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(10);
const jwt_auth_guard_1 = __webpack_require__(128);
const organization_application_service_1 = __webpack_require__(153);
const dto_1 = __webpack_require__(154);
let OrganizationController = class OrganizationController {
    constructor(organizationApplicationService) {
        this.organizationApplicationService = organizationApplicationService;
    }
    async getDepartments() {
        return await this.organizationApplicationService.부서목록조회();
    }
    async getDepartment(id) {
        return await this.organizationApplicationService.부서상세조회(id);
    }
    async createDepartment(createDepartmentDto) {
        return await this.organizationApplicationService.부서생성(createDepartmentDto);
    }
    async updateDepartment(id, updateDepartmentDto) {
        return await this.organizationApplicationService.부서수정(id, updateDepartmentDto);
    }
    async deleteDepartment(id) {
        return await this.organizationApplicationService.부서삭제(id);
    }
    async getEmployees() {
        return await this.organizationApplicationService.직원목록조회();
    }
    async getEmployee(id) {
        return await this.organizationApplicationService.직원상세조회(id);
    }
    async createEmployee(createEmployeeDto) {
        return await this.organizationApplicationService.직원생성(createEmployeeDto);
    }
    async updateEmployee(id, updateEmployeeDto) {
        return await this.organizationApplicationService.직원수정(id, updateEmployeeDto);
    }
    async deleteEmployee(id) {
        return await this.organizationApplicationService.직원삭제(id);
    }
    async getPositions() {
        return await this.organizationApplicationService.직책목록조회();
    }
    async createPosition(createPositionDto) {
        return await this.organizationApplicationService.직책생성(createPositionDto);
    }
    async updatePosition(id, updatePositionDto) {
        return await this.organizationApplicationService.직책수정(id, updatePositionDto);
    }
    async deletePosition(id) {
        return await this.organizationApplicationService.직책삭제(id);
    }
    async getRanks() {
        return await this.organizationApplicationService.직급목록조회();
    }
    async createRank(createRankDto) {
        return await this.organizationApplicationService.직급생성(createRankDto);
    }
    async updateRank(id, updateRankDto) {
        return await this.organizationApplicationService.직급수정(id, updateRankDto);
    }
    async deleteRank(id) {
        return await this.organizationApplicationService.직급삭제(id);
    }
    async assignEmployee(assignEmployeeDto) {
        return await this.organizationApplicationService.직원배치(assignEmployeeDto);
    }
    async updateEmployeeAssignment(id, updateAssignmentDto) {
        return await this.organizationApplicationService.직원배치변경(id, updateAssignmentDto);
    }
    async removeEmployeeAssignment(id) {
        return await this.organizationApplicationService.직원배치해제(id);
    }
    async getEmployeeAssignments(employeeId) {
        return await this.organizationApplicationService.직원배치현황조회(employeeId);
    }
    async promoteEmployee(employeeId, promoteDto) {
        return await this.organizationApplicationService.직원직급변경(employeeId, promoteDto);
    }
    async getEmployeeRankHistory(employeeId) {
        return await this.organizationApplicationService.직원직급이력조회(employeeId);
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Get)('departments'),
    (0, swagger_1.ApiOperation)({ summary: '부서 목록 조회', description: '전체 부서 목록을 계층구조로 조회합니다.' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.DepartmentListResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], OrganizationController.prototype, "getDepartments", null);
__decorate([
    (0, common_1.Get)('departments/:id'),
    (0, swagger_1.ApiOperation)({ summary: '부서 상세 조회' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '부서 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.DepartmentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], OrganizationController.prototype, "getDepartment", null);
__decorate([
    (0, common_1.Post)('departments'),
    (0, swagger_1.ApiOperation)({ summary: '부서 생성' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateDepartmentRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: dto_1.DepartmentResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateDepartmentRequestDto !== "undefined" && dto_1.CreateDepartmentRequestDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], OrganizationController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Put)('departments/:id'),
    (0, swagger_1.ApiOperation)({ summary: '부서 수정' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '부서 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateDepartmentRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.DepartmentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof dto_1.UpdateDepartmentRequestDto !== "undefined" && dto_1.UpdateDepartmentRequestDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], OrganizationController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Delete)('departments/:id'),
    (0, swagger_1.ApiOperation)({ summary: '부서 삭제' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '부서 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], OrganizationController.prototype, "deleteDepartment", null);
__decorate([
    (0, common_1.Get)('employees'),
    (0, swagger_1.ApiOperation)({ summary: '직원 목록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.EmployeeListResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], OrganizationController.prototype, "getEmployees", null);
__decorate([
    (0, common_1.Get)('employees/:id'),
    (0, swagger_1.ApiOperation)({ summary: '직원 상세 조회' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직원 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.EmployeeResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], OrganizationController.prototype, "getEmployee", null);
__decorate([
    (0, common_1.Post)('employees'),
    (0, swagger_1.ApiOperation)({ summary: '직원 생성' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateEmployeeRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: dto_1.EmployeeResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof dto_1.CreateEmployeeRequestDto !== "undefined" && dto_1.CreateEmployeeRequestDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], OrganizationController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Put)('employees/:id'),
    (0, swagger_1.ApiOperation)({ summary: '직원 수정' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직원 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateEmployeeRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.EmployeeResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_o = typeof dto_1.UpdateEmployeeRequestDto !== "undefined" && dto_1.UpdateEmployeeRequestDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], OrganizationController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Delete)('employees/:id'),
    (0, swagger_1.ApiOperation)({ summary: '직원 삭제' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직원 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], OrganizationController.prototype, "deleteEmployee", null);
__decorate([
    (0, common_1.Get)('positions'),
    (0, swagger_1.ApiOperation)({ summary: '직책 목록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [dto_1.PositionResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], OrganizationController.prototype, "getPositions", null);
__decorate([
    (0, common_1.Post)('positions'),
    (0, swagger_1.ApiOperation)({ summary: '직책 생성' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreatePositionRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: dto_1.PositionResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof dto_1.CreatePositionRequestDto !== "undefined" && dto_1.CreatePositionRequestDto) === "function" ? _s : Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], OrganizationController.prototype, "createPosition", null);
__decorate([
    (0, common_1.Put)('positions/:id'),
    (0, swagger_1.ApiOperation)({ summary: '직책 수정' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직책 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdatePositionRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.PositionResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_u = typeof dto_1.UpdatePositionRequestDto !== "undefined" && dto_1.UpdatePositionRequestDto) === "function" ? _u : Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], OrganizationController.prototype, "updatePosition", null);
__decorate([
    (0, common_1.Delete)('positions/:id'),
    (0, swagger_1.ApiOperation)({ summary: '직책 삭제' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직책 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], OrganizationController.prototype, "deletePosition", null);
__decorate([
    (0, common_1.Get)('ranks'),
    (0, swagger_1.ApiOperation)({ summary: '직급 목록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [dto_1.RankResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], OrganizationController.prototype, "getRanks", null);
__decorate([
    (0, common_1.Post)('ranks'),
    (0, swagger_1.ApiOperation)({ summary: '직급 생성' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateRankRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: dto_1.RankResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_y = typeof dto_1.CreateRankRequestDto !== "undefined" && dto_1.CreateRankRequestDto) === "function" ? _y : Object]),
    __metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], OrganizationController.prototype, "createRank", null);
__decorate([
    (0, common_1.Put)('ranks/:id'),
    (0, swagger_1.ApiOperation)({ summary: '직급 수정' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직급 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateRankRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.RankResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_0 = typeof dto_1.UpdateRankRequestDto !== "undefined" && dto_1.UpdateRankRequestDto) === "function" ? _0 : Object]),
    __metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], OrganizationController.prototype, "updateRank", null);
__decorate([
    (0, common_1.Delete)('ranks/:id'),
    (0, swagger_1.ApiOperation)({ summary: '직급 삭제' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직급 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_2 = typeof Promise !== "undefined" && Promise) === "function" ? _2 : Object)
], OrganizationController.prototype, "deleteRank", null);
__decorate([
    (0, common_1.Post)('employee-assignments'),
    (0, swagger_1.ApiOperation)({ summary: '직원 부서/직책 배치' }),
    (0, swagger_1.ApiBody)({ type: dto_1.AssignEmployeeRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: dto_1.EmployeeAssignmentResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_3 = typeof dto_1.AssignEmployeeRequestDto !== "undefined" && dto_1.AssignEmployeeRequestDto) === "function" ? _3 : Object]),
    __metadata("design:returntype", typeof (_4 = typeof Promise !== "undefined" && Promise) === "function" ? _4 : Object)
], OrganizationController.prototype, "assignEmployee", null);
__decorate([
    (0, common_1.Put)('employee-assignments/:id'),
    (0, swagger_1.ApiOperation)({ summary: '직원 부서/직책 변경' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '배치 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateEmployeeAssignmentRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.EmployeeAssignmentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_5 = typeof dto_1.UpdateEmployeeAssignmentRequestDto !== "undefined" && dto_1.UpdateEmployeeAssignmentRequestDto) === "function" ? _5 : Object]),
    __metadata("design:returntype", typeof (_6 = typeof Promise !== "undefined" && Promise) === "function" ? _6 : Object)
], OrganizationController.prototype, "updateEmployeeAssignment", null);
__decorate([
    (0, common_1.Delete)('employee-assignments/:id'),
    (0, swagger_1.ApiOperation)({ summary: '직원 부서/직책 해제' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '배치 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_7 = typeof Promise !== "undefined" && Promise) === "function" ? _7 : Object)
], OrganizationController.prototype, "removeEmployeeAssignment", null);
__decorate([
    (0, common_1.Get)('employees/:id/assignments'),
    (0, swagger_1.ApiOperation)({ summary: '직원 배치 현황 조회' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직원 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [dto_1.EmployeeAssignmentResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_8 = typeof Promise !== "undefined" && Promise) === "function" ? _8 : Object)
], OrganizationController.prototype, "getEmployeeAssignments", null);
__decorate([
    (0, common_1.Post)('employees/:id/rank-promotion'),
    (0, swagger_1.ApiOperation)({ summary: '직원 직급 변경' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직원 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.PromoteEmployeeRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: dto_1.EmployeeRankHistoryResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_9 = typeof dto_1.PromoteEmployeeRequestDto !== "undefined" && dto_1.PromoteEmployeeRequestDto) === "function" ? _9 : Object]),
    __metadata("design:returntype", typeof (_10 = typeof Promise !== "undefined" && Promise) === "function" ? _10 : Object)
], OrganizationController.prototype, "promoteEmployee", null);
__decorate([
    (0, common_1.Get)('employees/:id/rank-history'),
    (0, swagger_1.ApiOperation)({ summary: '직원 직급 이력 조회' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '직원 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [dto_1.EmployeeRankHistoryResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_11 = typeof Promise !== "undefined" && Promise) === "function" ? _11 : Object)
], OrganizationController.prototype, "getEmployeeRankHistory", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, swagger_1.ApiTags)('Admin - 조직 관리'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin/organizations'),
    __metadata("design:paramtypes", [typeof (_a = typeof organization_application_service_1.OrganizationApplicationService !== "undefined" && organization_application_service_1.OrganizationApplicationService) === "function" ? _a : Object])
], OrganizationController);


/***/ }),
/* 153 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationApplicationService = void 0;
const common_1 = __webpack_require__(2);
const organization_management_query_context_service_1 = __webpack_require__(97);
const organization_management_mutation_context_service_1 = __webpack_require__(98);
let OrganizationApplicationService = class OrganizationApplicationService {
    constructor(queryContextService, mutationContextService) {
        this.queryContextService = queryContextService;
        this.mutationContextService = mutationContextService;
        this.부서를_응답DTO로_변환한다 = (department) => ({
            id: department.id,
            departmentName: department.departmentName,
            departmentCode: department.departmentCode,
            type: department.type,
            parentDepartmentId: department.parentDepartmentId,
            order: department.order,
            childDepartments: department.childDepartments?.map(this.부서를_응답DTO로_변환한다),
            createdAt: department.createdAt,
            updatedAt: department.updatedAt,
        });
        this.직원을_응답DTO로_변환한다 = (employee) => ({
            id: employee.id,
            employeeNumber: employee.employeeNumber,
            name: employee.name,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            dateOfBirth: employee.dateOfBirth,
            gender: employee.gender,
            hireDate: employee.hireDate,
            status: employee.status,
            currentRankId: employee.currentRankId,
            terminationDate: employee.terminationDate,
            isInitialPasswordSet: employee.isInitialPasswordSet,
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
        });
        this.직책을_응답DTO로_변환한다 = (position) => ({
            id: position.id,
            positionTitle: position.positionTitle,
            positionCode: position.positionCode,
            level: position.level,
            hasManagementAuthority: position.hasManagementAuthority,
        });
        this.직급을_응답DTO로_변환한다 = (rank) => ({
            id: rank.id,
            rankName: rank.rankName,
            rankCode: rank.rankCode,
            level: rank.level,
        });
        this.직원배치를_응답DTO로_변환한다 = (assignment) => ({
            id: assignment.id,
            employeeId: assignment.employeeId,
            departmentId: assignment.departmentId,
            positionId: assignment.positionId,
            isManager: assignment.isManager,
            createdAt: assignment.createdAt,
            updatedAt: assignment.updatedAt,
        });
        this.직급이력을_응답DTO로_변환한다 = (history) => ({
            id: history.id,
            employeeId: history.employeeId,
            rankId: history.rankId,
            createdAt: history.createdAt,
            updatedAt: history.updatedAt,
        });
    }
    async 부서목록조회() {
        const departments = await this.queryContextService.모든_부서를_계층구조로_조회한다();
        return {
            departments: departments.map(this.부서를_응답DTO로_변환한다),
        };
    }
    async 부서상세조회(id) {
        const department = await this.queryContextService.부서_ID로_부서를_조회한다(id);
        return this.부서를_응답DTO로_변환한다(department);
    }
    async 부서생성(createDepartmentDto) {
        const isDuplicate = await this.queryContextService.부서_코드가_중복되는지_확인한다(createDepartmentDto.departmentCode);
        console.log('isDuplicate', isDuplicate);
        if (isDuplicate) {
            throw new Error('이미 존재하는 부서 코드입니다.');
        }
        const newDepartment = await this.mutationContextService.새로운_부서를_생성한다({
            departmentName: createDepartmentDto.departmentName,
            departmentCode: createDepartmentDto.departmentCode,
            type: createDepartmentDto.type,
            parentDepartmentId: createDepartmentDto.parentDepartmentId,
            order: createDepartmentDto.order,
        });
        return this.부서를_응답DTO로_변환한다(newDepartment);
    }
    async 부서수정(id, updateDepartmentDto) {
        await this.queryContextService.부서_ID로_부서를_조회한다(id);
        if (updateDepartmentDto.departmentCode) {
            const isDuplicate = await this.queryContextService.부서_코드가_중복되는지_확인한다(updateDepartmentDto.departmentCode, id);
            if (isDuplicate) {
                throw new Error('이미 존재하는 부서 코드입니다.');
            }
        }
        const updatedDepartment = await this.mutationContextService.부서정보를_수정한다(id, updateDepartmentDto);
        return this.부서를_응답DTO로_변환한다(updatedDepartment);
    }
    async 부서삭제(id) {
        await this.queryContextService.부서_ID로_부서를_조회한다(id);
        await this.mutationContextService.부서를_삭제한다(id);
    }
    async 직원목록조회() {
        const employees = await this.queryContextService.모든_직원을_조회한다();
        return {
            employees: employees.map(this.직원을_응답DTO로_변환한다),
        };
    }
    async 직원상세조회(id) {
        const employee = await this.queryContextService.직원_ID로_직원을_조회한다(id);
        return this.직원을_응답DTO로_변환한다(employee);
    }
    async 직원생성(createEmployeeDto) {
        const isEmployeeNumberDuplicate = await this.queryContextService.직원_사번이_중복되는지_확인한다(createEmployeeDto.employeeNumber);
        if (isEmployeeNumberDuplicate) {
            throw new Error('이미 존재하는 사번입니다.');
        }
        const isEmailDuplicate = await this.queryContextService.직원_이메일이_중복되는지_확인한다(createEmployeeDto.email);
        if (isEmailDuplicate) {
            throw new Error('이미 존재하는 이메일입니다.');
        }
        const newEmployee = await this.mutationContextService.새로운_직원을_생성한다({
            employeeNumber: createEmployeeDto.employeeNumber,
            name: createEmployeeDto.name,
            email: createEmployeeDto.email,
            phoneNumber: createEmployeeDto.phoneNumber,
            dateOfBirth: createEmployeeDto.dateOfBirth ? new Date(createEmployeeDto.dateOfBirth) : undefined,
            gender: createEmployeeDto.gender,
            hireDate: new Date(createEmployeeDto.hireDate),
            currentRankId: createEmployeeDto.currentRankId,
        });
        return this.직원을_응답DTO로_변환한다(newEmployee);
    }
    async 직원수정(id, updateEmployeeDto) {
        await this.queryContextService.직원_ID로_직원을_조회한다(id);
        if (updateEmployeeDto.email) {
            const isEmailDuplicate = await this.queryContextService.직원_이메일이_중복되는지_확인한다(updateEmployeeDto.email, id);
            if (isEmailDuplicate) {
                throw new Error('이미 존재하는 이메일입니다.');
            }
        }
        const updatedEmployee = await this.mutationContextService.직원정보를_수정한다(id, {
            ...updateEmployeeDto,
            dateOfBirth: updateEmployeeDto.dateOfBirth ? new Date(updateEmployeeDto.dateOfBirth) : undefined,
            hireDate: updateEmployeeDto.hireDate ? new Date(updateEmployeeDto.hireDate) : undefined,
            terminationDate: updateEmployeeDto.terminationDate
                ? new Date(updateEmployeeDto.terminationDate)
                : undefined,
        });
        return this.직원을_응답DTO로_변환한다(updatedEmployee);
    }
    async 직원삭제(id) {
        await this.queryContextService.직원_ID로_직원을_조회한다(id);
        await this.mutationContextService.직원을_삭제한다(id);
    }
    async 직책목록조회() {
        const positions = await this.queryContextService.모든_직책을_조회한다();
        return positions.map(this.직책을_응답DTO로_변환한다);
    }
    async 직책생성(createPositionDto) {
        const isDuplicate = await this.queryContextService.직책_코드가_중복되는지_확인한다(createPositionDto.positionCode);
        if (isDuplicate) {
            throw new Error('이미 존재하는 직책 코드입니다.');
        }
        const newPosition = await this.mutationContextService.새로운_직책을_생성한다(createPositionDto);
        return this.직책을_응답DTO로_변환한다(newPosition);
    }
    async 직책수정(id, updatePositionDto) {
        await this.queryContextService.직책_ID로_직책을_조회한다(id);
        if (updatePositionDto.positionCode) {
            const isDuplicate = await this.queryContextService.직책_코드가_중복되는지_확인한다(updatePositionDto.positionCode, id);
            if (isDuplicate) {
                throw new Error('이미 존재하는 직책 코드입니다.');
            }
        }
        const updatedPosition = await this.mutationContextService.직책정보를_수정한다(id, updatePositionDto);
        return this.직책을_응답DTO로_변환한다(updatedPosition);
    }
    async 직책삭제(id) {
        await this.queryContextService.직책_ID로_직책을_조회한다(id);
        await this.mutationContextService.직책을_삭제한다(id);
    }
    async 직급목록조회() {
        const ranks = await this.queryContextService.모든_직급을_조회한다();
        return ranks.map(this.직급을_응답DTO로_변환한다);
    }
    async 직급생성(createRankDto) {
        const isDuplicate = await this.queryContextService.직급_코드가_중복되는지_확인한다(createRankDto.rankCode);
        if (isDuplicate) {
            throw new Error('이미 존재하는 직급 코드입니다.');
        }
        const newRank = await this.mutationContextService.새로운_직급을_생성한다(createRankDto);
        return this.직급을_응답DTO로_변환한다(newRank);
    }
    async 직급수정(id, updateRankDto) {
        await this.queryContextService.직급_ID로_직급을_조회한다(id);
        if (updateRankDto.rankCode) {
            const isDuplicate = await this.queryContextService.직급_코드가_중복되는지_확인한다(updateRankDto.rankCode, id);
            if (isDuplicate) {
                throw new Error('이미 존재하는 직급 코드입니다.');
            }
        }
        const updatedRank = await this.mutationContextService.직급정보를_수정한다(id, updateRankDto);
        return this.직급을_응답DTO로_변환한다(updatedRank);
    }
    async 직급삭제(id) {
        await this.queryContextService.직급_ID로_직급을_조회한다(id);
        await this.mutationContextService.직급을_삭제한다(id);
    }
    async 직원배치(assignEmployeeDto) {
        await this.queryContextService.직원_ID로_직원을_조회한다(assignEmployeeDto.employeeId);
        await this.queryContextService.부서_ID로_부서를_조회한다(assignEmployeeDto.departmentId);
        await this.queryContextService.직책_ID로_직책을_조회한다(assignEmployeeDto.positionId);
        const assignment = await this.mutationContextService.직원을_부서에_배치한다(assignEmployeeDto);
        return this.직원배치를_응답DTO로_변환한다(assignment);
    }
    async 직원배치변경(id, updateAssignmentDto) {
        await this.queryContextService.배치_ID로_배치정보를_조회한다(id);
        if (updateAssignmentDto.departmentId) {
            await this.queryContextService.부서_ID로_부서를_조회한다(updateAssignmentDto.departmentId);
        }
        if (updateAssignmentDto.positionId) {
            await this.queryContextService.직책_ID로_직책을_조회한다(updateAssignmentDto.positionId);
        }
        const updatedAssignment = await this.mutationContextService.직원배치정보를_수정한다(id, updateAssignmentDto);
        return this.직원배치를_응답DTO로_변환한다(updatedAssignment);
    }
    async 직원배치해제(id) {
        await this.queryContextService.배치_ID로_배치정보를_조회한다(id);
        await this.mutationContextService.직원배치를_해제한다(id);
    }
    async 직원배치현황조회(employeeId) {
        await this.queryContextService.직원_ID로_직원을_조회한다(employeeId);
        const assignments = await this.queryContextService.직원의_모든_배치정보를_조회한다(employeeId);
        return assignments.map(this.직원배치를_응답DTO로_변환한다);
    }
    async 직원직급변경(employeeId, promoteDto) {
        await this.queryContextService.직원_ID로_직원을_조회한다(employeeId);
        await this.queryContextService.직급_ID로_직급을_조회한다(promoteDto.rankId);
        const { rankHistory } = await this.mutationContextService.직원의_직급을_변경한다(employeeId, promoteDto.rankId);
        return this.직급이력을_응답DTO로_변환한다(rankHistory);
    }
    async 직원직급이력조회(employeeId) {
        await this.queryContextService.직원_ID로_직원을_조회한다(employeeId);
        const histories = await this.queryContextService.직원의_직급이력을_조회한다(employeeId);
        return histories.map(this.직급이력을_응답DTO로_변환한다);
    }
};
exports.OrganizationApplicationService = OrganizationApplicationService;
exports.OrganizationApplicationService = OrganizationApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof organization_management_query_context_service_1.OrganizationManagementQueryContextService !== "undefined" && organization_management_query_context_service_1.OrganizationManagementQueryContextService) === "function" ? _a : Object, typeof (_b = typeof organization_management_mutation_context_service_1.OrganizationManagementMutationContextService !== "undefined" && organization_management_mutation_context_service_1.OrganizationManagementMutationContextService) === "function" ? _b : Object])
], OrganizationApplicationService);


/***/ }),
/* 154 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeRankHistoryResponseDto = exports.PromoteEmployeeRequestDto = exports.EmployeeAssignmentResponseDto = exports.UpdateEmployeeAssignmentRequestDto = exports.AssignEmployeeRequestDto = exports.RankResponseDto = exports.UpdateRankRequestDto = exports.CreateRankRequestDto = exports.PositionResponseDto = exports.UpdatePositionRequestDto = exports.CreatePositionRequestDto = exports.EmployeeListResponseDto = exports.EmployeeResponseDto = exports.UpdateEmployeeRequestDto = exports.CreateEmployeeRequestDto = exports.DepartmentListResponseDto = exports.DepartmentResponseDto = exports.UpdateDepartmentRequestDto = exports.CreateDepartmentRequestDto = void 0;
var department_dto_1 = __webpack_require__(155);
Object.defineProperty(exports, "CreateDepartmentRequestDto", ({ enumerable: true, get: function () { return department_dto_1.CreateDepartmentRequestDto; } }));
Object.defineProperty(exports, "UpdateDepartmentRequestDto", ({ enumerable: true, get: function () { return department_dto_1.UpdateDepartmentRequestDto; } }));
Object.defineProperty(exports, "DepartmentResponseDto", ({ enumerable: true, get: function () { return department_dto_1.DepartmentResponseDto; } }));
Object.defineProperty(exports, "DepartmentListResponseDto", ({ enumerable: true, get: function () { return department_dto_1.DepartmentListResponseDto; } }));
var employee_dto_1 = __webpack_require__(156);
Object.defineProperty(exports, "CreateEmployeeRequestDto", ({ enumerable: true, get: function () { return employee_dto_1.CreateEmployeeRequestDto; } }));
Object.defineProperty(exports, "UpdateEmployeeRequestDto", ({ enumerable: true, get: function () { return employee_dto_1.UpdateEmployeeRequestDto; } }));
Object.defineProperty(exports, "EmployeeResponseDto", ({ enumerable: true, get: function () { return employee_dto_1.EmployeeResponseDto; } }));
Object.defineProperty(exports, "EmployeeListResponseDto", ({ enumerable: true, get: function () { return employee_dto_1.EmployeeListResponseDto; } }));
var position_dto_1 = __webpack_require__(157);
Object.defineProperty(exports, "CreatePositionRequestDto", ({ enumerable: true, get: function () { return position_dto_1.CreatePositionRequestDto; } }));
Object.defineProperty(exports, "UpdatePositionRequestDto", ({ enumerable: true, get: function () { return position_dto_1.UpdatePositionRequestDto; } }));
Object.defineProperty(exports, "PositionResponseDto", ({ enumerable: true, get: function () { return position_dto_1.PositionResponseDto; } }));
var rank_dto_1 = __webpack_require__(158);
Object.defineProperty(exports, "CreateRankRequestDto", ({ enumerable: true, get: function () { return rank_dto_1.CreateRankRequestDto; } }));
Object.defineProperty(exports, "UpdateRankRequestDto", ({ enumerable: true, get: function () { return rank_dto_1.UpdateRankRequestDto; } }));
Object.defineProperty(exports, "RankResponseDto", ({ enumerable: true, get: function () { return rank_dto_1.RankResponseDto; } }));
var employee_assignment_dto_1 = __webpack_require__(159);
Object.defineProperty(exports, "AssignEmployeeRequestDto", ({ enumerable: true, get: function () { return employee_assignment_dto_1.AssignEmployeeRequestDto; } }));
Object.defineProperty(exports, "UpdateEmployeeAssignmentRequestDto", ({ enumerable: true, get: function () { return employee_assignment_dto_1.UpdateEmployeeAssignmentRequestDto; } }));
Object.defineProperty(exports, "EmployeeAssignmentResponseDto", ({ enumerable: true, get: function () { return employee_assignment_dto_1.EmployeeAssignmentResponseDto; } }));
var employee_rank_history_dto_1 = __webpack_require__(160);
Object.defineProperty(exports, "PromoteEmployeeRequestDto", ({ enumerable: true, get: function () { return employee_rank_history_dto_1.PromoteEmployeeRequestDto; } }));
Object.defineProperty(exports, "EmployeeRankHistoryResponseDto", ({ enumerable: true, get: function () { return employee_rank_history_dto_1.EmployeeRankHistoryResponseDto; } }));


/***/ }),
/* 155 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DepartmentListResponseDto = exports.DepartmentResponseDto = exports.UpdateDepartmentRequestDto = exports.CreateDepartmentRequestDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
const department_entity_1 = __webpack_require__(24);
class CreateDepartmentRequestDto {
}
exports.CreateDepartmentRequestDto = CreateDepartmentRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명', example: '개발팀' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDepartmentRequestDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 코드', example: 'DEV_TEAM' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDepartmentRequestDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부서 유형',
        enum: department_entity_1.DepartmentType,
        example: department_entity_1.DepartmentType.DEPARTMENT,
    }),
    (0, class_validator_1.IsEnum)(department_entity_1.DepartmentType),
    __metadata("design:type", typeof (_a = typeof department_entity_1.DepartmentType !== "undefined" && department_entity_1.DepartmentType) === "function" ? _a : Object)
], CreateDepartmentRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '상위 부서 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDepartmentRequestDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '정렬 순서', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDepartmentRequestDto.prototype, "order", void 0);
class UpdateDepartmentRequestDto {
}
exports.UpdateDepartmentRequestDto = UpdateDepartmentRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '부서명', example: '개발팀' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDepartmentRequestDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '부서 코드', example: 'DEV_TEAM' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDepartmentRequestDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '부서 유형',
        enum: department_entity_1.DepartmentType,
        example: department_entity_1.DepartmentType.DEPARTMENT,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(department_entity_1.DepartmentType),
    __metadata("design:type", typeof (_b = typeof department_entity_1.DepartmentType !== "undefined" && department_entity_1.DepartmentType) === "function" ? _b : Object)
], UpdateDepartmentRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '상위 부서 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateDepartmentRequestDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '정렬 순서', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDepartmentRequestDto.prototype, "order", void 0);
class DepartmentResponseDto {
}
exports.DepartmentResponseDto = DepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 코드' }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "departmentCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 유형', enum: department_entity_1.DepartmentType }),
    __metadata("design:type", typeof (_c = typeof department_entity_1.DepartmentType !== "undefined" && department_entity_1.DepartmentType) === "function" ? _c : Object)
], DepartmentResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상위 부서 ID', required: false }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "parentDepartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정렬 순서' }),
    __metadata("design:type", Number)
], DepartmentResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '하위 부서 목록', type: [DepartmentResponseDto], required: false }),
    __metadata("design:type", Array)
], DepartmentResponseDto.prototype, "childDepartments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], DepartmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], DepartmentResponseDto.prototype, "updatedAt", void 0);
class DepartmentListResponseDto {
}
exports.DepartmentListResponseDto = DepartmentListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 목록', type: [DepartmentResponseDto] }),
    __metadata("design:type", Array)
], DepartmentListResponseDto.prototype, "departments", void 0);


/***/ }),
/* 156 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeListResponseDto = exports.EmployeeResponseDto = exports.UpdateEmployeeRequestDto = exports.CreateEmployeeRequestDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
const enums_1 = __webpack_require__(15);
class CreateEmployeeRequestDto {
}
exports.CreateEmployeeRequestDto = CreateEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사번', example: 'EMP001' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeRequestDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름', example: '홍길동' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일', example: 'hong@company.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEmployeeRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '전화번호', example: '010-1234-5678' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '생년월일', example: '1990-01-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEmployeeRequestDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '성별',
        enum: enums_1.Gender,
        example: enums_1.Gender.Male,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    __metadata("design:type", typeof (_a = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _a : Object)
], CreateEmployeeRequestDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일', example: '2023-01-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEmployeeRequestDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '현재 직급 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEmployeeRequestDto.prototype, "currentRankId", void 0);
class UpdateEmployeeRequestDto {
}
exports.UpdateEmployeeRequestDto = UpdateEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '이름', example: '홍길동' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '이메일', example: 'hong@company.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '전화번호', example: '010-1234-5678' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '생년월일', example: '1990-01-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '성별',
        enum: enums_1.Gender,
        example: enums_1.Gender.Male,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    __metadata("design:type", typeof (_b = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _b : Object)
], UpdateEmployeeRequestDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '입사일', example: '2023-01-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '재직 상태',
        enum: enums_1.EmployeeStatus,
        example: enums_1.EmployeeStatus.Active,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.EmployeeStatus),
    __metadata("design:type", typeof (_c = typeof enums_1.EmployeeStatus !== "undefined" && enums_1.EmployeeStatus) === "function" ? _c : Object)
], UpdateEmployeeRequestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '현재 직급 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDto.prototype, "currentRankId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '퇴사일', example: '2024-12-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDto.prototype, "terminationDate", void 0);
class EmployeeResponseDto {
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사번' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', required: false }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생년월일', required: false }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], EmployeeResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', enum: enums_1.Gender, required: false }),
    __metadata("design:type", typeof (_e = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _e : Object)
], EmployeeResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일' }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], EmployeeResponseDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '재직 상태', enum: enums_1.EmployeeStatus }),
    __metadata("design:type", typeof (_g = typeof enums_1.EmployeeStatus !== "undefined" && enums_1.EmployeeStatus) === "function" ? _g : Object)
], EmployeeResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '현재 직급 ID', required: false }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "currentRankId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '퇴사일', required: false }),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], EmployeeResponseDto.prototype, "terminationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '초기 비밀번호 설정 여부' }),
    __metadata("design:type", Boolean)
], EmployeeResponseDto.prototype, "isInitialPasswordSet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], EmployeeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], EmployeeResponseDto.prototype, "updatedAt", void 0);
class EmployeeListResponseDto {
}
exports.EmployeeListResponseDto = EmployeeListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 목록', type: [EmployeeResponseDto] }),
    __metadata("design:type", Array)
], EmployeeListResponseDto.prototype, "employees", void 0);


/***/ }),
/* 157 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PositionResponseDto = exports.UpdatePositionRequestDto = exports.CreatePositionRequestDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
class CreatePositionRequestDto {
}
exports.CreatePositionRequestDto = CreatePositionRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책명', example: '부서장' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePositionRequestDto.prototype, "positionTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 코드', example: 'DEPT_HEAD' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePositionRequestDto.prototype, "positionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 레벨 (낮을수록 상위 직책)', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePositionRequestDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '관리 권한 여부', example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePositionRequestDto.prototype, "hasManagementAuthority", void 0);
class UpdatePositionRequestDto {
}
exports.UpdatePositionRequestDto = UpdatePositionRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직책명', example: '부서장' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePositionRequestDto.prototype, "positionTitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직책 코드', example: 'DEPT_HEAD' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePositionRequestDto.prototype, "positionCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직책 레벨 (낮을수록 상위 직책)', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdatePositionRequestDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '관리 권한 여부', example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePositionRequestDto.prototype, "hasManagementAuthority", void 0);
class PositionResponseDto {
}
exports.PositionResponseDto = PositionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책명' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "positionTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 코드' }),
    __metadata("design:type", String)
], PositionResponseDto.prototype, "positionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 레벨 (낮을수록 상위 직책)' }),
    __metadata("design:type", Number)
], PositionResponseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관리 권한 여부' }),
    __metadata("design:type", Boolean)
], PositionResponseDto.prototype, "hasManagementAuthority", void 0);


/***/ }),
/* 158 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RankResponseDto = exports.UpdateRankRequestDto = exports.CreateRankRequestDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
class CreateRankRequestDto {
}
exports.CreateRankRequestDto = CreateRankRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급명', example: '과장' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRankRequestDto.prototype, "rankName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 코드', example: 'MANAGER' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRankRequestDto.prototype, "rankCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 레벨 (낮을수록 상위 직급)', example: 3 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRankRequestDto.prototype, "level", void 0);
class UpdateRankRequestDto {
}
exports.UpdateRankRequestDto = UpdateRankRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직급명', example: '과장' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRankRequestDto.prototype, "rankName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직급 코드', example: 'MANAGER' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRankRequestDto.prototype, "rankCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직급 레벨 (낮을수록 상위 직급)', example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRankRequestDto.prototype, "level", void 0);
class RankResponseDto {
}
exports.RankResponseDto = RankResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 ID' }),
    __metadata("design:type", String)
], RankResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급명' }),
    __metadata("design:type", String)
], RankResponseDto.prototype, "rankName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 코드' }),
    __metadata("design:type", String)
], RankResponseDto.prototype, "rankCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 레벨 (낮을수록 상위 직급)' }),
    __metadata("design:type", Number)
], RankResponseDto.prototype, "level", void 0);


/***/ }),
/* 159 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeAssignmentResponseDto = exports.UpdateEmployeeAssignmentRequestDto = exports.AssignEmployeeRequestDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
class AssignEmployeeRequestDto {
}
exports.AssignEmployeeRequestDto = AssignEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AssignEmployeeRequestDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AssignEmployeeRequestDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AssignEmployeeRequestDto.prototype, "positionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '관리자 권한 여부', example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AssignEmployeeRequestDto.prototype, "isManager", void 0);
class UpdateEmployeeAssignmentRequestDto {
}
exports.UpdateEmployeeAssignmentRequestDto = UpdateEmployeeAssignmentRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '부서 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateEmployeeAssignmentRequestDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '직책 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateEmployeeAssignmentRequestDto.prototype, "positionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '관리자 권한 여부', example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateEmployeeAssignmentRequestDto.prototype, "isManager", void 0);
class EmployeeAssignmentResponseDto {
}
exports.EmployeeAssignmentResponseDto = EmployeeAssignmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '배치 ID' }),
    __metadata("design:type", String)
], EmployeeAssignmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], EmployeeAssignmentResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서 ID' }),
    __metadata("design:type", String)
], EmployeeAssignmentResponseDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직책 ID' }),
    __metadata("design:type", String)
], EmployeeAssignmentResponseDto.prototype, "positionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관리자 권한 여부' }),
    __metadata("design:type", Boolean)
], EmployeeAssignmentResponseDto.prototype, "isManager", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], EmployeeAssignmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EmployeeAssignmentResponseDto.prototype, "updatedAt", void 0);


/***/ }),
/* 160 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeRankHistoryResponseDto = exports.PromoteEmployeeRequestDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
class PromoteEmployeeRequestDto {
}
exports.PromoteEmployeeRequestDto = PromoteEmployeeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '새로운 직급 ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PromoteEmployeeRequestDto.prototype, "rankId", void 0);
class EmployeeRankHistoryResponseDto {
}
exports.EmployeeRankHistoryResponseDto = EmployeeRankHistoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이력 ID' }),
    __metadata("design:type", String)
], EmployeeRankHistoryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], EmployeeRankHistoryResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급 ID' }),
    __metadata("design:type", String)
], EmployeeRankHistoryResponseDto.prototype, "rankId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], EmployeeRankHistoryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EmployeeRankHistoryResponseDto.prototype, "updatedAt", void 0);


/***/ }),
/* 161 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemModule = void 0;
const common_1 = __webpack_require__(2);
const system_controller_1 = __webpack_require__(162);
const system_role_controller_1 = __webpack_require__(171);
const system_application_service_1 = __webpack_require__(163);
const system_management_context_module_1 = __webpack_require__(88);
let SystemModule = class SystemModule {
};
exports.SystemModule = SystemModule;
exports.SystemModule = SystemModule = __decorate([
    (0, common_1.Module)({
        imports: [system_management_context_module_1.SystemManagementContextModule],
        controllers: [system_controller_1.SystemController, system_role_controller_1.SystemRoleController],
        providers: [system_application_service_1.SystemApplicationService],
        exports: [system_application_service_1.SystemApplicationService],
    })
], SystemModule);


/***/ }),
/* 162 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(10);
const jwt_auth_guard_1 = __webpack_require__(128);
const system_application_service_1 = __webpack_require__(163);
const dto_1 = __webpack_require__(164);
let SystemController = class SystemController {
    constructor(systemApplicationService) {
        this.systemApplicationService = systemApplicationService;
    }
    async getSystems(search) {
        if (search) {
            return await this.systemApplicationService.시스템검색(search);
        }
        return await this.systemApplicationService.시스템목록조회();
    }
    async searchSystems(query) {
        return await this.systemApplicationService.시스템검색(query);
    }
    async getSystem(id) {
        return await this.systemApplicationService.시스템상세조회(id);
    }
    async createSystem(createSystemDto) {
        return await this.systemApplicationService.시스템생성(createSystemDto);
    }
    async updateSystem(id, updateSystemDto) {
        return await this.systemApplicationService.시스템수정(id, updateSystemDto);
    }
    async deleteSystem(id) {
        return await this.systemApplicationService.시스템삭제(id);
    }
    async regenerateApiKeys(id) {
        return await this.systemApplicationService.API키_재생성(id);
    }
};
exports.SystemController = SystemController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 목록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [dto_1.SystemResponseDto] }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: '검색어 (이름, 설명, 도메인)' }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], SystemController.prototype, "getSystems", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 검색' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [dto_1.SystemResponseDto] }),
    (0, swagger_1.ApiQuery)({ name: 'query', required: true, description: '검색어' }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SystemController.prototype, "searchSystems", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 상세 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.SystemResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시스템을 찾을 수 없음' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], SystemController.prototype, "getSystem", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '시스템 생성',
        description: '새로운 시스템을 등록하고 클라이언트 ID/시크릿을 자동 생성합니다.',
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateSystemDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: dto_1.SystemResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: '이미 존재하는 시스템 이름' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof dto_1.CreateSystemDto !== "undefined" && dto_1.CreateSystemDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], SystemController.prototype, "createSystem", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 수정' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateSystemDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.SystemResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시스템을 찾을 수 없음' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: '이미 존재하는 시스템 이름' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.UpdateSystemDto !== "undefined" && dto_1.UpdateSystemDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], SystemController.prototype, "updateSystem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시스템을 찾을 수 없음' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], SystemController.prototype, "deleteSystem", null);
__decorate([
    (0, common_1.Post)(':id/regenerate-keys'),
    (0, swagger_1.ApiOperation)({
        summary: 'API 키 재생성',
        description: '클라이언트 시크릿을 새로 생성합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.SystemResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시스템을 찾을 수 없음' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], SystemController.prototype, "regenerateApiKeys", null);
exports.SystemController = SystemController = __decorate([
    (0, swagger_1.ApiTags)('Admin - 시스템 관리'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin/systems'),
    __metadata("design:paramtypes", [typeof (_a = typeof system_application_service_1.SystemApplicationService !== "undefined" && system_application_service_1.SystemApplicationService) === "function" ? _a : Object])
], SystemController);


/***/ }),
/* 163 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemApplicationService = void 0;
const common_1 = __webpack_require__(2);
const system_management_context_service_1 = __webpack_require__(59);
let SystemApplicationService = class SystemApplicationService {
    constructor(시스템관리컨텍스트서비스) {
        this.시스템관리컨텍스트서비스 = 시스템관리컨텍스트서비스;
    }
    async 시스템목록조회() {
        try {
            const systems = await this.시스템관리컨텍스트서비스.모든_시스템을_조회한다();
            return systems.map((system) => this.시스템_엔티티를_DTO로_변환(system));
        }
        catch (error) {
            throw new common_1.NotFoundException('시스템 목록 조회에 실패했습니다.');
        }
    }
    async 시스템검색(query) {
        try {
            const systems = await this.시스템관리컨텍스트서비스.시스템을_검색한다(query);
            return systems.map((system) => this.시스템_엔티티를_DTO로_변환(system));
        }
        catch (error) {
            throw new common_1.NotFoundException('시스템 검색에 실패했습니다.');
        }
    }
    async 시스템상세조회(id) {
        try {
            const system = await this.시스템관리컨텍스트서비스.시스템을_ID로_조회한다(id);
            if (!system) {
                throw new common_1.NotFoundException('해당 시스템을 찾을 수 없습니다.');
            }
            return this.시스템_엔티티를_DTO로_변환(system);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException('시스템 조회에 실패했습니다.');
        }
    }
    async 시스템생성(createDto) {
        try {
            const result = await this.시스템관리컨텍스트서비스.시스템을_생성한다({
                name: createDto.name,
                description: createDto.description,
                domain: createDto.domain,
                allowedOrigin: createDto.allowedOrigin,
                healthCheckUrl: createDto.healthCheckUrl,
                isActive: createDto.isActive,
            });
            const response = this.시스템_엔티티를_DTO로_변환(result.system);
            response.clientSecret = result.originalSecret;
            return response;
        }
        catch (error) {
            if (error.message?.includes('이미 존재하는 시스템 이름')) {
                throw new common_1.ConflictException('이미 존재하는 시스템 이름입니다.');
            }
            throw new common_1.ConflictException('시스템 생성에 실패했습니다.');
        }
    }
    async 시스템수정(id, updateDto) {
        try {
            const updatedSystem = await this.시스템관리컨텍스트서비스.시스템을_수정한다(id, {
                name: updateDto.name,
                description: updateDto.description,
                domain: updateDto.domain,
                allowedOrigin: updateDto.allowedOrigin,
                healthCheckUrl: updateDto.healthCheckUrl,
                isActive: updateDto.isActive,
            });
            return this.시스템_엔티티를_DTO로_변환(updatedSystem);
        }
        catch (error) {
            if (error.message?.includes('이미 존재하는 시스템 이름')) {
                throw new common_1.ConflictException('이미 존재하는 시스템 이름입니다.');
            }
            if (error.message?.includes('해당 시스템을 찾을 수 없습니다')) {
                throw new common_1.NotFoundException('해당 시스템을 찾을 수 없습니다.');
            }
            throw new common_1.ConflictException('시스템 수정에 실패했습니다.');
        }
    }
    async 시스템삭제(id) {
        try {
            await this.시스템관리컨텍스트서비스.시스템을_삭제한다(id);
        }
        catch (error) {
            if (error.message?.includes('해당 시스템을 찾을 수 없습니다')) {
                throw new common_1.NotFoundException('해당 시스템을 찾을 수 없습니다.');
            }
            throw new common_1.NotFoundException('시스템 삭제에 실패했습니다.');
        }
    }
    async API키_재생성(id) {
        try {
            const result = await this.시스템관리컨텍스트서비스.시스템의_API키를_재생성한다(id);
            const response = this.시스템_엔티티를_DTO로_변환(result.system);
            response.clientSecret = result.originalSecret;
            return response;
        }
        catch (error) {
            if (error.message?.includes('해당 시스템을 찾을 수 없습니다')) {
                throw new common_1.NotFoundException('해당 시스템을 찾을 수 없습니다.');
            }
            throw new common_1.NotFoundException('API 키 재생성에 실패했습니다.');
        }
    }
    async 시스템롤목록조회(systemId) {
        try {
            let systemRoles;
            if (systemId) {
                systemRoles = await this.시스템관리컨텍스트서비스.시스템의_역할목록을_조회한다(systemId);
            }
            else {
                systemRoles = await this.시스템관리컨텍스트서비스.모든_시스템역할을_조회한다();
            }
            return systemRoles.map((role) => this.시스템롤_엔티티를_DTO로_변환(role));
        }
        catch (error) {
            throw new common_1.NotFoundException('시스템 역할 목록 조회에 실패했습니다.');
        }
    }
    async 시스템롤상세조회(id) {
        try {
            const systemRole = await this.시스템관리컨텍스트서비스.시스템역할을_ID로_조회한다(id);
            if (!systemRole) {
                throw new common_1.NotFoundException('해당 시스템 롤을 찾을 수 없습니다.');
            }
            return this.시스템롤_엔티티를_DTO로_변환(systemRole);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException('시스템 역할 조회에 실패했습니다.');
        }
    }
    async 시스템롤생성(createDto) {
        try {
            const savedRole = await this.시스템관리컨텍스트서비스.시스템역할을_생성한다({
                systemId: createDto.systemId,
                roleName: createDto.roleName,
                roleCode: createDto.roleCode,
                description: createDto.description,
                permissions: createDto.permissions,
                sortOrder: createDto.sortOrder,
            });
            return this.시스템롤_엔티티를_DTO로_변환(savedRole);
        }
        catch (error) {
            if (error.message?.includes('이미 할당된 역할') || error.message?.includes('이미 존재합니다')) {
                throw new common_1.ConflictException('해당 시스템에 이미 존재하는 역할 코드입니다.');
            }
            throw new common_1.ConflictException('시스템 역할 생성에 실패했습니다.');
        }
    }
    async 시스템롤수정(id, updateDto) {
        try {
            const updatedRole = await this.시스템관리컨텍스트서비스.시스템역할을_수정한다(id, {
                roleName: updateDto.roleName,
                roleCode: updateDto.roleCode,
                description: updateDto.description,
                permissions: updateDto.permissions,
                sortOrder: updateDto.sortOrder,
                isActive: updateDto.isActive,
            });
            return this.시스템롤_엔티티를_DTO로_변환(updatedRole);
        }
        catch (error) {
            if (error.message?.includes('이미 존재합니다')) {
                throw new common_1.ConflictException('해당 시스템에 이미 존재하는 역할 코드입니다.');
            }
            if (error.message?.includes('찾을 수 없습니다')) {
                throw new common_1.NotFoundException('해당 시스템 롤을 찾을 수 없습니다.');
            }
            throw new common_1.ConflictException('시스템 역할 수정에 실패했습니다.');
        }
    }
    async 시스템롤삭제(id) {
        try {
            await this.시스템관리컨텍스트서비스.시스템역할을_비활성화한다(id);
        }
        catch (error) {
            if (error.message?.includes('찾을 수 없습니다')) {
                throw new common_1.NotFoundException('해당 시스템 롤을 찾을 수 없습니다.');
            }
            throw new common_1.NotFoundException('시스템 역할 삭제에 실패했습니다.');
        }
    }
    시스템_엔티티를_DTO로_변환(system) {
        return {
            id: system.id,
            clientId: system.clientId,
            clientSecret: '***',
            name: system.name,
            description: system.description,
            domain: system.domain,
            allowedOrigin: system.allowedOrigin,
            healthCheckUrl: system.healthCheckUrl,
            isActive: system.isActive,
            createdAt: system.createdAt,
            updatedAt: system.updatedAt,
        };
    }
    시스템롤_엔티티를_DTO로_변환(systemRole) {
        return {
            id: systemRole.id,
            systemId: systemRole.systemId,
            roleName: systemRole.roleName,
            roleCode: systemRole.roleCode,
            description: systemRole.description,
            permissions: systemRole.permissions,
            sortOrder: systemRole.sortOrder,
            isActive: systemRole.isActive,
            createdAt: systemRole.createdAt,
            updatedAt: systemRole.updatedAt,
        };
    }
};
exports.SystemApplicationService = SystemApplicationService;
exports.SystemApplicationService = SystemApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof system_management_context_service_1.SystemManagementContextService !== "undefined" && system_management_context_service_1.SystemManagementContextService) === "function" ? _a : Object])
], SystemApplicationService);


/***/ }),
/* 164 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(165), exports);
__exportStar(__webpack_require__(166), exports);
__exportStar(__webpack_require__(167), exports);
__exportStar(__webpack_require__(168), exports);
__exportStar(__webpack_require__(169), exports);
__exportStar(__webpack_require__(170), exports);


/***/ }),
/* 165 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSystemDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
class CreateSystemDto {
}
exports.CreateSystemDto = CreateSystemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 이름', example: 'RMS' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '시스템 설명', example: '리소스 관리 시스템' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '도메인', example: 'rms.company.com' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '허용된 오리진 목록',
        example: ['https://rms.company.com', 'https://admin.company.com'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSystemDto.prototype, "allowedOrigin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '헬스체크 URL', example: 'https://rms.company.com/health' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "healthCheckUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '활성화 상태', example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSystemDto.prototype, "isActive", void 0);


/***/ }),
/* 166 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSystemDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
class UpdateSystemDto {
}
exports.UpdateSystemDto = UpdateSystemDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '시스템 이름', example: 'RMS' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '시스템 설명', example: '리소스 관리 시스템' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '도메인', example: 'rms.company.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '허용된 오리진 목록',
        example: ['https://rms.company.com', 'https://admin.company.com'],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateSystemDto.prototype, "allowedOrigin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '헬스체크 URL', example: 'https://rms.company.com/health' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "healthCheckUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '활성화 상태', example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSystemDto.prototype, "isActive", void 0);


/***/ }),
/* 167 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class SystemResponseDto {
}
exports.SystemResponseDto = SystemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 ID' }),
    __metadata("design:type", String)
], SystemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '클라이언트 ID' }),
    __metadata("design:type", String)
], SystemResponseDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '클라이언트 시크릿' }),
    __metadata("design:type", String)
], SystemResponseDto.prototype, "clientSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 이름' }),
    __metadata("design:type", String)
], SystemResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '시스템 설명' }),
    __metadata("design:type", String)
], SystemResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '도메인' }),
    __metadata("design:type", String)
], SystemResponseDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '허용된 오리진 목록', type: [String] }),
    __metadata("design:type", Array)
], SystemResponseDto.prototype, "allowedOrigin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '헬스체크 URL' }),
    __metadata("design:type", String)
], SystemResponseDto.prototype, "healthCheckUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '활성화 상태' }),
    __metadata("design:type", Boolean)
], SystemResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일시' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], SystemResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일시' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], SystemResponseDto.prototype, "updatedAt", void 0);


/***/ }),
/* 168 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSystemRoleDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
class CreateSystemRoleDto {
}
exports.CreateSystemRoleDto = CreateSystemRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSystemRoleDto.prototype, "systemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '역할 이름', example: '관리자' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSystemRoleDto.prototype, "roleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '역할 코드', example: 'admin' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSystemRoleDto.prototype, "roleCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '역할 설명', example: '시스템 전체 관리 권한' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSystemRoleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '권한 목록',
        example: ['read', 'write', 'delete'],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSystemRoleDto.prototype, "permissions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '정렬 순서', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSystemRoleDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '활성화 상태', example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSystemRoleDto.prototype, "isActive", void 0);


/***/ }),
/* 169 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSystemRoleDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(78);
class UpdateSystemRoleDto {
}
exports.UpdateSystemRoleDto = UpdateSystemRoleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '역할 이름', example: '관리자' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSystemRoleDto.prototype, "roleName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '역할 코드', example: 'admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSystemRoleDto.prototype, "roleCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '역할 설명', example: '시스템 전체 관리 권한' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSystemRoleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '권한 목록',
        example: ['read', 'write', 'delete'],
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateSystemRoleDto.prototype, "permissions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '정렬 순서', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSystemRoleDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '활성화 상태', example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSystemRoleDto.prototype, "isActive", void 0);


/***/ }),
/* 170 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemRoleResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class SystemRoleResponseDto {
}
exports.SystemRoleResponseDto = SystemRoleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 롤 ID' }),
    __metadata("design:type", String)
], SystemRoleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '시스템 ID' }),
    __metadata("design:type", String)
], SystemRoleResponseDto.prototype, "systemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '역할 이름' }),
    __metadata("design:type", String)
], SystemRoleResponseDto.prototype, "roleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '역할 코드' }),
    __metadata("design:type", String)
], SystemRoleResponseDto.prototype, "roleCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '역할 설명' }),
    __metadata("design:type", String)
], SystemRoleResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '권한 목록', type: [String] }),
    __metadata("design:type", Array)
], SystemRoleResponseDto.prototype, "permissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정렬 순서' }),
    __metadata("design:type", Number)
], SystemRoleResponseDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '활성화 상태' }),
    __metadata("design:type", Boolean)
], SystemRoleResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일시' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], SystemRoleResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일시' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], SystemRoleResponseDto.prototype, "updatedAt", void 0);


/***/ }),
/* 171 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemRoleController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(10);
const jwt_auth_guard_1 = __webpack_require__(128);
const system_application_service_1 = __webpack_require__(163);
const dto_1 = __webpack_require__(164);
let SystemRoleController = class SystemRoleController {
    constructor(systemApplicationService) {
        this.systemApplicationService = systemApplicationService;
    }
    async getSystemRoles(systemId) {
        return await this.systemApplicationService.시스템롤목록조회(systemId);
    }
    async getSystemRole(id) {
        return await this.systemApplicationService.시스템롤상세조회(id);
    }
    async createSystemRole(createSystemRoleDto) {
        return await this.systemApplicationService.시스템롤생성(createSystemRoleDto);
    }
    async updateSystemRole(id, updateSystemRoleDto) {
        return await this.systemApplicationService.시스템롤수정(id, updateSystemRoleDto);
    }
    async deleteSystemRole(id) {
        return await this.systemApplicationService.시스템롤삭제(id);
    }
};
exports.SystemRoleController = SystemRoleController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 역할 목록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [dto_1.SystemRoleResponseDto] }),
    (0, swagger_1.ApiQuery)({ name: 'systemId', required: false, description: '시스템 ID (특정 시스템의 역할만 조회)' }),
    __param(0, (0, common_1.Query)('systemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], SystemRoleController.prototype, "getSystemRoles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 역할 상세 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.SystemRoleResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시스템 역할을 찾을 수 없음' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 역할 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SystemRoleController.prototype, "getSystemRole", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 역할 생성' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateSystemRoleDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: dto_1.SystemRoleResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시스템을 찾을 수 없음' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: '이미 존재하는 역할 코드' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateSystemRoleDto !== "undefined" && dto_1.CreateSystemRoleDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], SystemRoleController.prototype, "createSystemRole", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 역할 수정' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateSystemRoleDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.SystemRoleResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시스템 역할을 찾을 수 없음' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: '이미 존재하는 역할 코드' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 역할 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof dto_1.UpdateSystemRoleDto !== "undefined" && dto_1.UpdateSystemRoleDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], SystemRoleController.prototype, "updateSystemRole", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 역할 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시스템 역할을 찾을 수 없음' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 역할 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], SystemRoleController.prototype, "deleteSystemRole", null);
exports.SystemRoleController = SystemRoleController = __decorate([
    (0, swagger_1.ApiTags)('Admin - 시스템 역할 관리'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin/system-roles'),
    __metadata("design:paramtypes", [typeof (_a = typeof system_application_service_1.SystemApplicationService !== "undefined" && system_application_service_1.SystemApplicationService) === "function" ? _a : Object])
], SystemRoleController);


/***/ }),
/* 172 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogModule = void 0;
const common_1 = __webpack_require__(2);
const log_controller_1 = __webpack_require__(173);
const log_application_service_1 = __webpack_require__(174);
const log_management_context_module_1 = __webpack_require__(183);
let LogModule = class LogModule {
};
exports.LogModule = LogModule;
exports.LogModule = LogModule = __decorate([
    (0, common_1.Module)({
        imports: [log_management_context_module_1.LogManagementContextModule],
        controllers: [log_controller_1.LogController],
        providers: [log_application_service_1.LogApplicationService],
        exports: [log_application_service_1.LogApplicationService],
    })
], LogModule);


/***/ }),
/* 173 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(10);
const jwt_auth_guard_1 = __webpack_require__(128);
const log_application_service_1 = __webpack_require__(174);
const dto_1 = __webpack_require__(178);
let LogController = class LogController {
    constructor(logApplicationService) {
        this.logApplicationService = logApplicationService;
    }
    async findAll(page = 1, limit = 10) {
        return await this.logApplicationService.로그목록조회(+page, +limit);
    }
    async findOne(id) {
        return await this.logApplicationService.로그상세조회(id);
    }
    async filter(filterDto) {
        return await this.logApplicationService.로그필터링조회(filterDto);
    }
};
exports.LogController = LogController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '로그 목록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.LogsResponseDto }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: '페이지 번호', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: '페이지당 항목 수', type: Number }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], LogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '로그 상세 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.LogResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '로그를 찾을 수 없음' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '로그 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], LogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('filter'),
    (0, swagger_1.ApiOperation)({ summary: '로그 필터링' }),
    (0, swagger_1.ApiBody)({ type: dto_1.LogFilterDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: dto_1.LogsResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.LogFilterDto !== "undefined" && dto_1.LogFilterDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], LogController.prototype, "filter", null);
exports.LogController = LogController = __decorate([
    (0, swagger_1.ApiTags)('Admin - 로그 관리'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('admin/logs'),
    __metadata("design:paramtypes", [typeof (_a = typeof log_application_service_1.LogApplicationService !== "undefined" && log_application_service_1.LogApplicationService) === "function" ? _a : Object])
], LogController);


/***/ }),
/* 174 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogApplicationService = void 0;
const common_1 = __webpack_require__(2);
const log_management_context_service_1 = __webpack_require__(175);
let LogApplicationService = class LogApplicationService {
    constructor(로그관리컨텍스트서비스) {
        this.로그관리컨텍스트서비스 = 로그관리컨텍스트서비스;
    }
    async 로그생성(createLogDto) {
        try {
            const log = await this.로그관리컨텍스트서비스.로그를_생성한다(createLogDto);
            return this.로그_엔티티를_DTO로_변환(log);
        }
        catch (error) {
            throw new Error('로그 생성에 실패했습니다.');
        }
    }
    async 여러로그생성(createLogDtos) {
        try {
            const logs = await this.로그관리컨텍스트서비스.여러_로그를_생성한다(createLogDtos);
            return logs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        }
        catch (error) {
            throw new Error('여러 로그 생성에 실패했습니다.');
        }
    }
    async 로그목록조회(page = 1, limit = 10) {
        try {
            const result = await this.로그관리컨텍스트서비스.모든_로그를_조회한다(page, limit);
            return {
                logs: result.logs.map((log) => this.로그_엔티티를_DTO로_변환(log)),
                total: result.total,
                page: result.page,
                limit: limit,
                totalPages: result.totalPages,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException('로그 목록 조회에 실패했습니다.');
        }
    }
    async 로그상세조회(id) {
        try {
            const log = await this.로그관리컨텍스트서비스.로그를_ID로_조회한다(id);
            if (!log) {
                throw new common_1.NotFoundException('해당 로그를 찾을 수 없습니다.');
            }
            return this.로그_엔티티를_DTO로_변환(log);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException('로그 조회에 실패했습니다.');
        }
    }
    async 로그필터링조회(filterDto) {
        try {
            const filterOptions = {
                page: filterDto.page,
                limit: filterDto.limit,
                startDate: filterDto.startDate,
                endDate: filterDto.endDate,
                method: filterDto.method,
                url: filterDto.url,
                statusCode: filterDto.statusCode,
                host: filterDto.host,
                ip: filterDto.ip,
                system: filterDto.system,
                errorsOnly: filterDto.errorsOnly,
                sortBy: filterDto.sortBy,
                sortDirection: filterDto.sortDirection,
            };
            const result = await this.로그관리컨텍스트서비스.로그를_필터링하여_조회한다(filterOptions);
            return {
                logs: result.logs.map((log) => this.로그_엔티티를_DTO로_변환(log)),
                total: result.total,
                page: result.page,
                limit: filterDto.limit || 10,
                totalPages: result.totalPages,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException('로그 필터링 조회에 실패했습니다.');
        }
    }
    async 에러로그조회() {
        try {
            const errorLogs = await this.로그관리컨텍스트서비스.에러_로그를_조회한다();
            return errorLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        }
        catch (error) {
            throw new common_1.NotFoundException('에러 로그 조회에 실패했습니다.');
        }
    }
    async 시스템별로그조회(system) {
        try {
            const systemLogs = await this.로그관리컨텍스트서비스.시스템별_로그를_조회한다(system);
            return systemLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        }
        catch (error) {
            throw new common_1.NotFoundException('시스템별 로그 조회에 실패했습니다.');
        }
    }
    async 느린요청조회(minResponseTime = 1000) {
        try {
            const slowLogs = await this.로그관리컨텍스트서비스.느린_요청을_조회한다(minResponseTime);
            return slowLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        }
        catch (error) {
            throw new common_1.NotFoundException('느린 요청 조회에 실패했습니다.');
        }
    }
    async IP주소별로그조회(ip) {
        try {
            const ipLogs = await this.로그관리컨텍스트서비스.IP주소별_로그를_조회한다(ip);
            return ipLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        }
        catch (error) {
            throw new common_1.NotFoundException('IP주소별 로그 조회에 실패했습니다.');
        }
    }
    async 로그인로그조회(days = 7) {
        try {
            const loginLogs = await this.로그관리컨텍스트서비스.로그인_로그를_조회한다(days);
            return loginLogs.map((log) => this.로그_엔티티를_DTO로_변환(log));
        }
        catch (error) {
            throw new common_1.NotFoundException('로그인 로그 조회에 실패했습니다.');
        }
    }
    로그_엔티티를_DTO로_변환(log) {
        return {
            id: log.id,
            requestTimestamp: log.requestTimestamp,
            responseTimestamp: log.responseTimestamp,
            method: log.method,
            url: log.url,
            params: log.params,
            query: log.query,
            body: log.body,
            statusCode: log.statusCode,
            responseTime: log.responseTime,
            response: log.response,
            error: log.error,
            ip: log.ip,
            host: log.host,
            userAgent: log.userAgent,
            system: log.system,
            isError: log.isError,
        };
    }
};
exports.LogApplicationService = LogApplicationService;
exports.LogApplicationService = LogApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof log_management_context_service_1.LogManagementContextService !== "undefined" && log_management_context_service_1.LogManagementContextService) === "function" ? _a : Object])
], LogApplicationService);


/***/ }),
/* 175 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LogManagementContextService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogManagementContextService = exports.SortDirection = void 0;
const common_1 = __webpack_require__(2);
const log_service_1 = __webpack_require__(176);
const typeorm_1 = __webpack_require__(14);
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ASC";
    SortDirection["DESC"] = "DESC";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
let LogManagementContextService = LogManagementContextService_1 = class LogManagementContextService {
    constructor(로그서비스) {
        this.로그서비스 = 로그서비스;
        this.logger = new common_1.Logger(LogManagementContextService_1.name);
    }
    async 모든_로그를_조회한다(page = 1, limit = 10) {
        const options = {
            order: { requestTimestamp: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        };
        const logs = await this.로그서비스.findAll(options);
        const allLogs = await this.로그서비스.findAll();
        const total = allLogs.length;
        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async 로그를_ID로_조회한다(id) {
        return this.로그서비스.findOne({ where: { id } });
    }
    async 로그를_필터링하여_조회한다(filterOptions) {
        const { page = 1, limit = 10, startDate, endDate, method, url, statusCode, host, ip, system, errorsOnly, sortBy = 'requestTimestamp', sortDirection = SortDirection.DESC, } = filterOptions;
        const where = {};
        if (startDate && endDate) {
            where.requestTimestamp = (0, typeorm_1.Between)(startDate, endDate);
        }
        else if (startDate) {
            where.requestTimestamp = (0, typeorm_1.MoreThanOrEqual)(startDate);
        }
        else if (endDate) {
            where.requestTimestamp = (0, typeorm_1.LessThanOrEqual)(endDate);
        }
        if (url) {
            where.url = (0, typeorm_1.ILike)(`%${url}%`);
        }
        if (host) {
            where.host = (0, typeorm_1.ILike)(`%${host}%`);
        }
        if (ip) {
            where.ip = (0, typeorm_1.ILike)(`%${ip}%`);
        }
        if (method) {
            where.method = method;
        }
        if (statusCode) {
            where.statusCode = statusCode;
        }
        if (errorsOnly) {
            where.isError = true;
        }
        if (system) {
            where.system = (0, typeorm_1.ILike)(`%${system}%`);
        }
        const order = {};
        order[sortBy] = sortDirection;
        const options = {
            where,
            order,
            skip: (page - 1) * limit,
            take: limit,
        };
        const logs = await this.로그서비스.findAll(options);
        const allFilteredLogs = await this.로그서비스.findAll({ where });
        const total = allFilteredLogs.length;
        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async 에러_로그를_조회한다() {
        return this.로그서비스.findErrorLogs();
    }
    async 시스템별_로그를_조회한다(system) {
        return this.로그서비스.findBySystem(system);
    }
    async 느린_요청을_조회한다(minResponseTime = 1000) {
        return this.로그서비스.findSlowRequests(minResponseTime);
    }
    async IP주소별_로그를_조회한다(ip) {
        return this.로그서비스.findByIpAddress(ip);
    }
    async 로그인_로그를_조회한다(days = 7) {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);
        const { logs } = await this.로그를_필터링하여_조회한다({
            startDate: fromDate,
            url: '/auth/login',
            limit: 1000,
        });
        return logs;
    }
    async 로그를_생성한다(logData) {
        return this.로그서비스.save(logData);
    }
    async 여러_로그를_생성한다(logsData) {
        const logs = [];
        for (const logData of logsData) {
            const log = await this.로그서비스.save(logData);
            logs.push(log);
        }
        return logs;
    }
};
exports.LogManagementContextService = LogManagementContextService;
exports.LogManagementContextService = LogManagementContextService = LogManagementContextService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof log_service_1.DomainLogService !== "undefined" && log_service_1.DomainLogService) === "function" ? _a : Object])
], LogManagementContextService);


/***/ }),
/* 176 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainLogService = void 0;
const common_1 = __webpack_require__(2);
const log_repository_1 = __webpack_require__(177);
const base_service_1 = __webpack_require__(47);
let DomainLogService = class DomainLogService extends base_service_1.BaseService {
    constructor(logRepository) {
        super(logRepository);
        this.logRepository = logRepository;
    }
    async findByMethodAndUrl(method, url) {
        return this.logRepository.findAll({
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findErrorLogs() {
        return this.logRepository.findAll({
            where: { isError: true },
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findBySystem(system) {
        return this.logRepository.findAll({
            where: { system },
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findByStatusCode(statusCode) {
        return this.logRepository.findAll({
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findByIpAddress(ip) {
        return this.logRepository.findAll({
            where: { ip },
            order: { requestTimestamp: 'DESC' },
        });
    }
    async findSlowRequests(minResponseTime = 1000) {
        return this.logRepository.findAll({
            order: { responseTime: 'DESC' },
        });
    }
};
exports.DomainLogService = DomainLogService;
exports.DomainLogService = DomainLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof log_repository_1.DomainLogRepository !== "undefined" && log_repository_1.DomainLogRepository) === "function" ? _a : Object])
], DomainLogService);


/***/ }),
/* 177 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainLogRepository = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const entities_1 = __webpack_require__(12);
const base_repository_1 = __webpack_require__(46);
let DomainLogRepository = class DomainLogRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainLogRepository = DomainLogRepository;
exports.DomainLogRepository = DomainLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Log)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainLogRepository);


/***/ }),
/* 178 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(179), exports);
__exportStar(__webpack_require__(180), exports);
__exportStar(__webpack_require__(181), exports);
__exportStar(__webpack_require__(182), exports);


/***/ }),
/* 179 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLogDto = void 0;
const class_validator_1 = __webpack_require__(78);
class CreateLogDto {
}
exports.CreateLogDto = CreateLogDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLogDto.prototype, "params", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLogDto.prototype, "query", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLogDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "ip", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "host", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "userAgent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "system", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateLogDto.prototype, "requestTimestamp", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateLogDto.prototype, "responseTimestamp", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLogDto.prototype, "responseTime", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLogDto.prototype, "statusCode", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLogDto.prototype, "response", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLogDto.prototype, "error", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateLogDto.prototype, "isError", void 0);


/***/ }),
/* 180 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogFilterDto = exports.SortDirection = void 0;
const swagger_1 = __webpack_require__(10);
const class_transformer_1 = __webpack_require__(118);
const class_validator_1 = __webpack_require__(78);
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ASC";
    SortDirection["DESC"] = "DESC";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
class LogFilterDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.errorsOnly = false;
        this.sortBy = 'requestTimestamp';
        this.sortDirection = SortDirection.DESC;
    }
}
exports.LogFilterDto = LogFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '페이지 번호', default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LogFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '페이지당 항목 수', default: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LogFilterDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '시작 날짜' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LogFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '종료 날짜' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], LogFilterDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'HTTP 메서드' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL 경로' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'HTTP 상태 코드' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LogFilterDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '호스트' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'IP 주소' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '시스템 구분자' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "system", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '에러만 조회 (상태코드 >= 400)', default: false }),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LogFilterDto.prototype, "errorsOnly", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '정렬 기준',
        default: 'requestTimestamp',
        enum: ['requestTimestamp', 'method', 'url', 'statusCode', 'responseTime', 'ip', 'host'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '정렬 방향',
        default: SortDirection.DESC,
        enum: SortDirection,
    }),
    (0, class_validator_1.IsEnum)(SortDirection),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "sortDirection", void 0);


/***/ }),
/* 181 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class LogResponseDto {
}
exports.LogResponseDto = LogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '로그 ID' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '요청 시간' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LogResponseDto.prototype, "requestTimestamp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '응답 완료 시간' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], LogResponseDto.prototype, "responseTimestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'HTTP 메서드' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL 경로' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '요청 파라미터' }),
    __metadata("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
], LogResponseDto.prototype, "params", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '쿼리 파라미터' }),
    __metadata("design:type", typeof (_d = typeof Record !== "undefined" && Record) === "function" ? _d : Object)
], LogResponseDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '요청 본문' }),
    __metadata("design:type", Object)
], LogResponseDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'HTTP 상태 코드' }),
    __metadata("design:type", Number)
], LogResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '응답 시간 (밀리초)' }),
    __metadata("design:type", Number)
], LogResponseDto.prototype, "responseTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '응답 본문' }),
    __metadata("design:type", Object)
], LogResponseDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '에러 정보' }),
    __metadata("design:type", Object)
], LogResponseDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP 주소' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '호스트' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 에이전트' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '시스템 구분자' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "system", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '에러 발생 여부' }),
    __metadata("design:type", Boolean)
], LogResponseDto.prototype, "isError", void 0);


/***/ }),
/* 182 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogsResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
const log_response_dto_1 = __webpack_require__(181);
class LogsResponseDto {
}
exports.LogsResponseDto = LogsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '로그 목록', type: [log_response_dto_1.LogResponseDto] }),
    __metadata("design:type", Array)
], LogsResponseDto.prototype, "logs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전체 로그 수' }),
    __metadata("design:type", Number)
], LogsResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '현재 페이지 번호' }),
    __metadata("design:type", Number)
], LogsResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '페이지당 항목 수' }),
    __metadata("design:type", Number)
], LogsResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전체 페이지 수' }),
    __metadata("design:type", Number)
], LogsResponseDto.prototype, "totalPages", void 0);


/***/ }),
/* 183 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogManagementContextModule = void 0;
const common_1 = __webpack_require__(2);
const log_management_context_service_1 = __webpack_require__(175);
const log_module_1 = __webpack_require__(184);
let LogManagementContextModule = class LogManagementContextModule {
};
exports.LogManagementContextModule = LogManagementContextModule;
exports.LogManagementContextModule = LogManagementContextModule = __decorate([
    (0, common_1.Module)({
        imports: [log_module_1.DomainLogModule],
        providers: [log_management_context_service_1.LogManagementContextService],
        exports: [log_management_context_service_1.LogManagementContextService],
    })
], LogManagementContextModule);


/***/ }),
/* 184 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainLogModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const log_service_1 = __webpack_require__(176);
const log_repository_1 = __webpack_require__(177);
const log_entity_1 = __webpack_require__(36);
let DomainLogModule = class DomainLogModule {
};
exports.DomainLogModule = DomainLogModule;
exports.DomainLogModule = DomainLogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([log_entity_1.Log])],
        providers: [log_service_1.DomainLogService, log_repository_1.DomainLogRepository],
        exports: [log_service_1.DomainLogService],
    })
], DomainLogModule);


/***/ }),
/* 185 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupSwagger = setupSwagger;
const swagger_1 = __webpack_require__(10);
function setupSwagger(app, dtos) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('LSSO API')
        .setDescription('LSSO(Login SSO) API')
        .setVersion('1.0')
        .addBearerAuth()
        .addBasicAuth()
        .build();
    const extraModels = [...dtos];
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: extraModels,
    });
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        ],
        swaggerOptions: {
            docExpansion: 'none',
            tagsSorter: (a, b) => {
                const isAEnglish = /^[A-Za-z]/.test(a);
                const isBEnglish = /^[A-Za-z]/.test(b);
                if (isAEnglish && !isBEnglish)
                    return -1;
                if (!isAEnglish && isBEnglish)
                    return 1;
                return a.localeCompare(b, 'en');
            },
            persistAuthorization: true,
        },
    });
}


/***/ }),
/* 186 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(187), exports);


/***/ }),
/* 187 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(188), exports);


/***/ }),
/* 188 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResponseDto = exports.ErrorResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
class ErrorResponseDto {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '오류 코드' }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '오류 메시지' }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
class ApiResponseDto {
    constructor(success, data, error) {
        this.success = success;
        if (data !== undefined) {
            this.data = data;
        }
        if (error !== undefined) {
            this.error = error;
        }
    }
    static success(data) {
        return new ApiResponseDto(true, data);
    }
    static error(code, message) {
        return new ApiResponseDto(false, undefined, new ErrorResponseDto(code, message));
    }
}
exports.ApiResponseDto = ApiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'API 요청 성공 여부' }),
    __metadata("design:type", Boolean)
], ApiResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '요청이 성공한 경우 반환되는 데이터', required: false }),
    __metadata("design:type", Object)
], ApiResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '요청이 실패한 경우 반환되는 오류 정보',
        required: false,
        type: ErrorResponseDto,
    }),
    __metadata("design:type", ErrorResponseDto)
], ApiResponseDto.prototype, "error", void 0);


/***/ }),
/* 189 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 190 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(2);
const operators_1 = __webpack_require__(191);
const log_application_service_1 = __webpack_require__(174);
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logsService) {
        this.logsService = logsService;
    }
    async intercept(context, next) {
        const startTime = Date.now();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const passUrl = ['/api/admin', '/api/domain', '/api/webhook', '/api/auth/verify'];
        if (passUrl.some((url) => request.url.startsWith(url))) {
            return next.handle();
        }
        let ip = Array.isArray(request.headers['x-forwarded-for'])
            ? request.headers['x-forwarded-for'][0]
            : request.headers['x-forwarded-for'] || request.socket.remoteAddress || '';
        if (ip.includes(',')) {
            ip = ip.split(',')[0];
        }
        if (ip === '::ffff:127.0.0.1' || ip === '::1') {
            ip = '127.0.0.1';
        }
        const logData = {
            origin: request.headers.origin,
            host: request.headers.host,
            method: request.method,
            url: request.url,
            params: request.params,
            query: request.query,
            body: request.body,
            ip: ip,
            userAgent: request.get('user-agent'),
            requestTimestamp: new Date(),
            responseTimestamp: null,
            responseTime: null,
            statusCode: null,
            response: null,
            system: null,
            error: null,
            isError: false,
        };
        return next.handle().pipe((0, operators_1.tap)(async (response) => {
            logData.responseTimestamp = new Date();
            logData.responseTime = logData.responseTimestamp - startTime;
            logData.statusCode = context.switchToHttp().getResponse().statusCode;
            logData.response = request.method !== 'GET' ? response : null;
            logData.system = response?.system || null;
        }), (0, operators_1.catchError)(async (error) => {
            logData.responseTimestamp = new Date();
            logData.responseTime = logData.responseTimestamp - startTime;
            logData.statusCode = error.status || 500;
            logData.system = error?.response?.system || null;
            logData.error = {
                message: error.message,
            };
            logData.isError = true;
            throw error;
        }), (0, operators_1.finalize)(() => {
            this.logsService.로그생성(logData);
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof log_application_service_1.LogApplicationService !== "undefined" && log_application_service_1.LogApplicationService) === "function" ? _a : Object])
], LoggingInterceptor);


/***/ }),
/* 191 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 192 */
/***/ ((module) => {

module.exports = require("hbs");

/***/ }),
/* 193 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestInterceptor = void 0;
const common_1 = __webpack_require__(2);
const operators_1 = __webpack_require__(191);
let RequestInterceptor = class RequestInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, query, params } = request;
        const now = Date.now();
        console.log(`[Request] ${new Date().toISOString()} ${method} ${url}`);
        if (Object.keys(body).length > 0) {
            console.log('Body:', body);
        }
        if (Object.keys(query).length > 0) {
            console.log('Query:', query);
        }
        if (Object.keys(params).length > 0) {
            console.log('Params:', params);
        }
        return next.handle().pipe((0, operators_1.tap)(() => {
            console.log(`[Response Time] ${Date.now() - now}ms`);
        }));
    }
};
exports.RequestInterceptor = RequestInterceptor;
exports.RequestInterceptor = RequestInterceptor = __decorate([
    (0, common_1.Injectable)()
], RequestInterceptor);


/***/ }),
/* 194 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorInterceptor = void 0;
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(195);
const operators_1 = __webpack_require__(191);
let ErrorInterceptor = class ErrorInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            if (error instanceof common_1.HttpException) {
                console.error('Error:', error);
                const response = error.getResponse();
                const message = response.message;
                const errorMessage = typeof message === 'object'
                    ? Array.isArray(message)
                        ? message.join('\n')
                        : message
                    : error.message;
                return (0, rxjs_1.throwError)(() => ({
                    success: false,
                    message: errorMessage,
                    statusCode: error.getStatus(),
                }));
            }
            console.error('Unexpected error:', error);
            return (0, rxjs_1.throwError)(() => ({
                success: false,
                message: '예상치 못한 오류가 발생했습니다.',
                statusCode: 500,
            }));
        }));
    }
};
exports.ErrorInterceptor = ErrorInterceptor;
exports.ErrorInterceptor = ErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorInterceptor);


/***/ }),
/* 195 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(185);
const dtos = __webpack_require__(186);
const path_1 = __webpack_require__(189);
const logging_interceptor_1 = __webpack_require__(190);
const log_application_service_1 = __webpack_require__(174);
const hbs = __webpack_require__(192);
const request_interceptor_1 = __webpack_require__(193);
const error_interceptor_1 = __webpack_require__(194);
async function bootstrap() {
    if (process.env.VERCEL || process.env.NOW_REGION) {
        console.log('Running in Vercel environment, skipping bootstrap');
        return;
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api', {
        exclude: ['/set-initial-password', '/change-password'],
    });
    (0, swagger_1.setupSwagger)(app, [...Object.values(dtos)]);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.useGlobalInterceptors(new request_interceptor_1.RequestInterceptor(), new error_interceptor_1.ErrorInterceptor());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(app.get(log_application_service_1.LogApplicationService)));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'src', 'views'));
    app.setViewEngine('hbs');
    hbs.registerPartials((0, path_1.join)(__dirname, '..', 'views/partials'));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

})();

/******/ })()
;
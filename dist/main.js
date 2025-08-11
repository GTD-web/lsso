/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./libs/common/enums/employee-status.enum.ts":
/*!***************************************************!*\
  !*** ./libs/common/enums/employee-status.enum.ts ***!
  \***************************************************/
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

/***/ "./libs/common/enums/gender.enum.ts":
/*!******************************************!*\
  !*** ./libs/common/enums/gender.enum.ts ***!
  \******************************************/
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

/***/ "./libs/common/enums/index.ts":
/*!************************************!*\
  !*** ./libs/common/enums/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookExecutionStatus = exports.WebhookEntityType = exports.WebhookEventType = exports.EmployeeStatus = exports.Gender = exports.Role = void 0;
var role_type_enum_1 = __webpack_require__(/*! ./role-type.enum */ "./libs/common/enums/role-type.enum.ts");
Object.defineProperty(exports, "Role", ({ enumerable: true, get: function () { return role_type_enum_1.Role; } }));
var gender_enum_1 = __webpack_require__(/*! ./gender.enum */ "./libs/common/enums/gender.enum.ts");
Object.defineProperty(exports, "Gender", ({ enumerable: true, get: function () { return gender_enum_1.Gender; } }));
var employee_status_enum_1 = __webpack_require__(/*! ./employee-status.enum */ "./libs/common/enums/employee-status.enum.ts");
Object.defineProperty(exports, "EmployeeStatus", ({ enumerable: true, get: function () { return employee_status_enum_1.EmployeeStatus; } }));
var webhook_event_type_enum_1 = __webpack_require__(/*! ./webhook-event-type.enum */ "./libs/common/enums/webhook-event-type.enum.ts");
Object.defineProperty(exports, "WebhookEventType", ({ enumerable: true, get: function () { return webhook_event_type_enum_1.WebhookEventType; } }));
var webhook_entity_type_enum_1 = __webpack_require__(/*! ./webhook-entity-type.enum */ "./libs/common/enums/webhook-entity-type.enum.ts");
Object.defineProperty(exports, "WebhookEntityType", ({ enumerable: true, get: function () { return webhook_entity_type_enum_1.WebhookEntityType; } }));
var webhook_execution_status_enum_1 = __webpack_require__(/*! ./webhook-execution-status.enum */ "./libs/common/enums/webhook-execution-status.enum.ts");
Object.defineProperty(exports, "WebhookExecutionStatus", ({ enumerable: true, get: function () { return webhook_execution_status_enum_1.WebhookExecutionStatus; } }));


/***/ }),

/***/ "./libs/common/enums/role-type.enum.ts":
/*!*********************************************!*\
  !*** ./libs/common/enums/role-type.enum.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
})(Role || (exports.Role = Role = {}));


/***/ }),

/***/ "./libs/common/enums/webhook-entity-type.enum.ts":
/*!*******************************************************!*\
  !*** ./libs/common/enums/webhook-entity-type.enum.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookEntityType = void 0;
var WebhookEntityType;
(function (WebhookEntityType) {
    WebhookEntityType["Department"] = "department";
    WebhookEntityType["Employee"] = "employee";
})(WebhookEntityType || (exports.WebhookEntityType = WebhookEntityType = {}));


/***/ }),

/***/ "./libs/common/enums/webhook-event-type.enum.ts":
/*!******************************************************!*\
  !*** ./libs/common/enums/webhook-event-type.enum.ts ***!
  \******************************************************/
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

/***/ "./libs/common/enums/webhook-execution-status.enum.ts":
/*!************************************************************!*\
  !*** ./libs/common/enums/webhook-execution-status.enum.ts ***!
  \************************************************************/
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

/***/ "./libs/common/interceptors/error.interceptor.ts":
/*!*******************************************************!*\
  !*** ./libs/common/interceptors/error.interceptor.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
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

/***/ "./libs/common/interceptors/request.interceptor.ts":
/*!*********************************************************!*\
  !*** ./libs/common/interceptors/request.interceptor.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestInterceptor = void 0;
const date_util_1 = __webpack_require__(/*! ../utils/date.util */ "./libs/common/utils/date.util.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let RequestInterceptor = class RequestInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, query, params } = request;
        const now = Date.now();
        console.log(`[Request] ${date_util_1.DateUtil.now().toISOString()} ${method} ${url}`);
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

/***/ "./libs/common/interfaces/repository.interface.ts":
/*!********************************************************!*\
  !*** ./libs/common/interfaces/repository.interface.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/common/repositories/base.repository.ts":
/*!*****************************************************!*\
  !*** ./libs/common/repositories/base.repository.ts ***!
  \*****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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
};
exports.BaseRepository = BaseRepository;
exports.BaseRepository = BaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], BaseRepository);


/***/ }),

/***/ "./libs/common/services/base.service.ts":
/*!**********************************************!*\
  !*** ./libs/common/services/base.service.ts ***!
  \**********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const repository_interface_1 = __webpack_require__(/*! ../interfaces/repository.interface */ "./libs/common/interfaces/repository.interface.ts");
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

/***/ "./libs/common/utils/date.util.ts":
/*!****************************************!*\
  !*** ./libs/common/utils/date.util.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateUtil = void 0;
const dayjs = __webpack_require__(/*! dayjs */ "dayjs");
const utc = __webpack_require__(/*! dayjs/plugin/utc */ "dayjs/plugin/utc");
const timezone = __webpack_require__(/*! dayjs/plugin/timezone */ "dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
class DateUtilWrapper {
    constructor(date) {
        this.date = date;
    }
    toDate() {
        return this.date.toDate();
    }
    format(format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date.format(format);
    }
    addDays(days) {
        return new DateUtilWrapper(this.date.add(days, 'day'));
    }
    addMinutes(minutes) {
        return new DateUtilWrapper(this.date.add(minutes, 'minute'));
    }
    toISOString() {
        return this.date.toISOString();
    }
    toMinutes() {
        return this.date.hour() * 60 + this.date.minute();
    }
    hour(hours) {
        return new DateUtilWrapper(this.date.hour(hours));
    }
    minute(minutes) {
        return new DateUtilWrapper(this.date.minute(minutes));
    }
    second(seconds) {
        return new DateUtilWrapper(this.date.second(seconds));
    }
    getYear() {
        return this.date.year();
    }
    getMonth() {
        return this.date.month() + 1;
    }
    getDate() {
        return this.date.date();
    }
    getDaysInMonth() {
        return this.date.daysInMonth();
    }
    getFirstDayOfMonth() {
        return new DateUtilWrapper(this.date.startOf('month'));
    }
    getLastDayOfMonth() {
        return new DateUtilWrapper(this.date.endOf('month'));
    }
}
class DateUtil {
    static now() {
        return new DateUtilWrapper(dayjs().tz('Asia/Seoul'));
    }
    static date(date) {
        return new DateUtilWrapper(dayjs.tz(date, 'Asia/Seoul'));
    }
    static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date(date).format(format);
    }
    static parse(dateString) {
        return this.date(dateString);
    }
    static addDays(date, days) {
        return this.date(date).addDays(days);
    }
    static addMinutes(date, minutes) {
        return this.date(date).addMinutes(minutes);
    }
    static toISOString(date) {
        return this.date(date).toISOString();
    }
    static toMinutes(date) {
        const d = this.date(date);
        return d.toMinutes();
    }
    static fromMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return this.now().hour(hours).minute(mins).second(0);
    }
    static getYear(date = new Date()) {
        return this.date(date).getYear();
    }
    static getMonth(date = new Date()) {
        return this.date(date).getMonth();
    }
    static getDate(date = new Date()) {
        return this.date(date).getDate();
    }
    static getDaysInMonth(date = new Date()) {
        return this.date(date).getDaysInMonth();
    }
    static getFirstDayOfMonth(date = new Date()) {
        return this.date(date).getFirstDayOfMonth();
    }
    static getLastDayOfMonth(date = new Date()) {
        return this.date(date).getLastDayOfMonth();
    }
    static toAlarmRangeString(startDate, endDate) {
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        if (start.isSame(end, 'day')) {
            return `${this.replaceWeekday(start.format('YY.MM.DD(ddd) HH:mm'))} ~ ${end.format('HH:mm')}`;
        }
        return `${this.replaceWeekday(start.format('YY.MM.DD(ddd) HH:mm'))} ~ ${this.replaceWeekday(end.format('YY.MM.DD(ddd) HH:mm'))}`;
    }
    static replaceWeekday(str) {
        return str
            .replace('Mon', '월')
            .replace('Tue', '화')
            .replace('Wed', '수')
            .replace('Thu', '목')
            .replace('Fri', '금')
            .replace('Sat', '토')
            .replace('Sun', '일');
    }
}
exports.DateUtil = DateUtil;


/***/ }),

/***/ "./libs/configs/env.config.ts":
/*!************************************!*\
  !*** ./libs/configs/env.config.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FIREBASE_CONFIG = exports.APP_CONFIG = exports.WEB_PUSH_CONFIG = exports.JWT_CONFIG = exports.ENV = void 0;
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
(0, dotenv_1.config)();
exports.ENV = process.env;
exports["default"] = (0, config_1.registerAs)('database', () => {
    return {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USER || 'admin',
        password: process.env.POSTGRES_PASSWORD || 'tech7admin!',
        database: process.env.POSTGRES_DB || 'resource-server',
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

/***/ "./libs/configs/typeorm.config.ts":
/*!****************************************!*\
  !*** ./libs/configs/typeorm.config.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeOrmConfig = void 0;
const entities_1 = __webpack_require__(/*! ../database/entities */ "./libs/database/entities/index.ts");
const typeOrmConfig = (configService) => {
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

/***/ "./libs/database/entities/department.entity.ts":
/*!*****************************************************!*\
  !*** ./libs/database/entities/department.entity.ts ***!
  \*****************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./libs/database/entities/employee-department-position.entity.ts":
/*!***********************************************************************!*\
  !*** ./libs/database/entities/employee-department-position.entity.ts ***!
  \***********************************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/database/entities/employee.entity.ts");
const department_entity_1 = __webpack_require__(/*! ./department.entity */ "./libs/database/entities/department.entity.ts");
const position_entity_1 = __webpack_require__(/*! ./position.entity */ "./libs/database/entities/position.entity.ts");
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

/***/ "./libs/database/entities/employee-rank-history.entity.ts":
/*!****************************************************************!*\
  !*** ./libs/database/entities/employee-rank-history.entity.ts ***!
  \****************************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/database/entities/employee.entity.ts");
const rank_entity_1 = __webpack_require__(/*! ./rank.entity */ "./libs/database/entities/rank.entity.ts");
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

/***/ "./libs/database/entities/employee-token.entity.ts":
/*!*********************************************************!*\
  !*** ./libs/database/entities/employee-token.entity.ts ***!
  \*********************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/database/entities/employee.entity.ts");
const token_entity_1 = __webpack_require__(/*! ./token.entity */ "./libs/database/entities/token.entity.ts");
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

/***/ "./libs/database/entities/employee.entity.ts":
/*!***************************************************!*\
  !*** ./libs/database/entities/employee.entity.ts ***!
  \***************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./libs/common/enums/index.ts");
const rank_entity_1 = __webpack_require__(/*! ./rank.entity */ "./libs/database/entities/rank.entity.ts");
const employee_department_position_entity_1 = __webpack_require__(/*! ./employee-department-position.entity */ "./libs/database/entities/employee-department-position.entity.ts");
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

/***/ "./libs/database/entities/index.ts":
/*!*****************************************!*\
  !*** ./libs/database/entities/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entities = exports.User = exports.Log = exports.SystemWebhook = exports.EmployeeToken = exports.Token = exports.System = exports.WebhookEventLog = exports.Webhook = exports.EmployeeRankHistory = exports.EmployeeDepartmentPosition = exports.Rank = exports.Position = exports.Department = exports.Employee = void 0;
const employee_entity_1 = __webpack_require__(/*! ./employee.entity */ "./libs/database/entities/employee.entity.ts");
Object.defineProperty(exports, "Employee", ({ enumerable: true, get: function () { return employee_entity_1.Employee; } }));
const department_entity_1 = __webpack_require__(/*! ./department.entity */ "./libs/database/entities/department.entity.ts");
Object.defineProperty(exports, "Department", ({ enumerable: true, get: function () { return department_entity_1.Department; } }));
const position_entity_1 = __webpack_require__(/*! ./position.entity */ "./libs/database/entities/position.entity.ts");
Object.defineProperty(exports, "Position", ({ enumerable: true, get: function () { return position_entity_1.Position; } }));
const rank_entity_1 = __webpack_require__(/*! ./rank.entity */ "./libs/database/entities/rank.entity.ts");
Object.defineProperty(exports, "Rank", ({ enumerable: true, get: function () { return rank_entity_1.Rank; } }));
const employee_department_position_entity_1 = __webpack_require__(/*! ./employee-department-position.entity */ "./libs/database/entities/employee-department-position.entity.ts");
Object.defineProperty(exports, "EmployeeDepartmentPosition", ({ enumerable: true, get: function () { return employee_department_position_entity_1.EmployeeDepartmentPosition; } }));
const employee_rank_history_entity_1 = __webpack_require__(/*! ./employee-rank-history.entity */ "./libs/database/entities/employee-rank-history.entity.ts");
Object.defineProperty(exports, "EmployeeRankHistory", ({ enumerable: true, get: function () { return employee_rank_history_entity_1.EmployeeRankHistory; } }));
const webhook_entity_1 = __webpack_require__(/*! ./webhook.entity */ "./libs/database/entities/webhook.entity.ts");
Object.defineProperty(exports, "Webhook", ({ enumerable: true, get: function () { return webhook_entity_1.Webhook; } }));
const webhook_event_log_entity_1 = __webpack_require__(/*! ./webhook-event-log.entity */ "./libs/database/entities/webhook-event-log.entity.ts");
Object.defineProperty(exports, "WebhookEventLog", ({ enumerable: true, get: function () { return webhook_event_log_entity_1.WebhookEventLog; } }));
const system_entity_1 = __webpack_require__(/*! ./system.entity */ "./libs/database/entities/system.entity.ts");
Object.defineProperty(exports, "System", ({ enumerable: true, get: function () { return system_entity_1.System; } }));
const token_entity_1 = __webpack_require__(/*! ./token.entity */ "./libs/database/entities/token.entity.ts");
Object.defineProperty(exports, "Token", ({ enumerable: true, get: function () { return token_entity_1.Token; } }));
const employee_token_entity_1 = __webpack_require__(/*! ./employee-token.entity */ "./libs/database/entities/employee-token.entity.ts");
Object.defineProperty(exports, "EmployeeToken", ({ enumerable: true, get: function () { return employee_token_entity_1.EmployeeToken; } }));
const system_webhook_entity_1 = __webpack_require__(/*! ./system-webhook.entity */ "./libs/database/entities/system-webhook.entity.ts");
Object.defineProperty(exports, "SystemWebhook", ({ enumerable: true, get: function () { return system_webhook_entity_1.SystemWebhook; } }));
const log_entity_1 = __webpack_require__(/*! ./log.entity */ "./libs/database/entities/log.entity.ts");
Object.defineProperty(exports, "Log", ({ enumerable: true, get: function () { return log_entity_1.Log; } }));
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/database/entities/user.entity.ts");
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return user_entity_1.User; } }));
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
];


/***/ }),

/***/ "./libs/database/entities/log.entity.ts":
/*!**********************************************!*\
  !*** ./libs/database/entities/log.entity.ts ***!
  \**********************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./libs/database/entities/position.entity.ts":
/*!***************************************************!*\
  !*** ./libs/database/entities/position.entity.ts ***!
  \***************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./libs/database/entities/rank.entity.ts":
/*!***********************************************!*\
  !*** ./libs/database/entities/rank.entity.ts ***!
  \***********************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./libs/database/entities/system-webhook.entity.ts":
/*!*********************************************************!*\
  !*** ./libs/database/entities/system-webhook.entity.ts ***!
  \*********************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./libs/database/entities/system.entity.ts":
/*!*************************************************!*\
  !*** ./libs/database/entities/system.entity.ts ***!
  \*************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./libs/database/entities/token.entity.ts":
/*!************************************************!*\
  !*** ./libs/database/entities/token.entity.ts ***!
  \************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/database/entities/user.entity.ts");
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

/***/ "./libs/database/entities/user.entity.ts":
/*!***********************************************!*\
  !*** ./libs/database/entities/user.entity.ts ***!
  \***********************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const token_entity_1 = __webpack_require__(/*! ./token.entity */ "./libs/database/entities/token.entity.ts");
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

/***/ "./libs/database/entities/webhook-event-log.entity.ts":
/*!************************************************************!*\
  !*** ./libs/database/entities/webhook-event-log.entity.ts ***!
  \************************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./libs/database/entities/webhook.entity.ts":
/*!**************************************************!*\
  !*** ./libs/database/entities/webhook.entity.ts ***!
  \**************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const express_1 = __webpack_require__(/*! express */ "express");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const http_exception_filter_1 = __webpack_require__(/*! ./common/filters/http-exception.filter */ "./src/common/filters/http-exception.filter.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const typeorm_config_1 = __webpack_require__(/*! ../libs/configs/typeorm.config */ "./libs/configs/typeorm.config.ts");
const config_2 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const env_config_1 = __webpack_require__(/*! ../libs/configs/env.config */ "./libs/configs/env.config.ts");
const entities_1 = __webpack_require__(/*! ../libs/database/entities */ "./libs/database/entities/index.ts");
const sso_application_module_1 = __webpack_require__(/*! ./modules/application/single-sign-on/sso-application.module */ "./src/modules/application/single-sign-on/sso-application.module.ts");
const auth_module_1 = __webpack_require__(/*! ./modules/application/legacy/auth/auth.module */ "./src/modules/application/legacy/auth/auth.module.ts");
const users_module_1 = __webpack_require__(/*! ./modules/application/legacy/users/users.module */ "./src/modules/application/legacy/users/users.module.ts");
const logs_module_1 = __webpack_require__(/*! ./modules/application/legacy/logs/logs.module */ "./src/modules/application/legacy/logs/logs.module.ts");
const systems_module_1 = __webpack_require__(/*! ./modules/application/legacy/systems/systems.module */ "./src/modules/application/legacy/systems/systems.module.ts");
const tokens_module_1 = __webpack_require__(/*! ./modules/application/legacy/tokens/tokens.module */ "./src/modules/application/legacy/tokens/tokens.module.ts");
const mail_module_1 = __webpack_require__(/*! ./modules/application/legacy/mail/mail.module */ "./src/modules/application/legacy/mail/mail.module.ts");
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
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            logs_module_1.LogsModule,
            systems_module_1.SystemsModule,
            tokens_module_1.TokensModule,
            mail_module_1.MailModule,
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

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
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

/***/ "./src/common/dto/api-response.dto.ts":
/*!********************************************!*\
  !*** ./src/common/dto/api-response.dto.ts ***!
  \********************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/common/dto/index.ts":
/*!*********************************!*\
  !*** ./src/common/dto/index.ts ***!
  \*********************************/
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
__exportStar(__webpack_require__(/*! ./api-response.dto */ "./src/common/dto/api-response.dto.ts"), exports);


/***/ }),

/***/ "./src/common/filters/http-exception.filter.ts":
/*!*****************************************************!*\
  !*** ./src/common/filters/http-exception.filter.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: typeof exceptionResponse === 'string'
                ? exceptionResponse
                : exceptionResponse.message,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);


/***/ }),

/***/ "./src/common/interceptors/logging.interceptor.ts":
/*!********************************************************!*\
  !*** ./src/common/interceptors/logging.interceptor.ts ***!
  \********************************************************/
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
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const logs_service_1 = __webpack_require__(/*! ../../modules/application/legacy/logs/services/logs.service */ "./src/modules/application/legacy/logs/services/logs.service.ts");
const systems_service_1 = __webpack_require__(/*! ../../modules/application/legacy/systems/services/systems.service */ "./src/modules/application/legacy/systems/services/systems.service.ts");
const date_util_1 = __webpack_require__(/*! ../utils/date.util */ "./src/common/utils/date.util.ts");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logsService, systemService) {
        this.logsService = logsService;
        this.systemService = systemService;
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
        console.log(ip);
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
            requestTimestamp: date_util_1.DateUtil.now().toDate(),
            responseTimestamp: null,
            responseTime: null,
            statusCode: null,
            response: null,
            system: null,
            error: null,
            isError: false,
        };
        return next.handle().pipe((0, operators_1.tap)(async (response) => {
            logData.responseTimestamp = date_util_1.DateUtil.now().toDate();
            logData.responseTime = logData.responseTimestamp - startTime;
            logData.statusCode = context.switchToHttp().getResponse().statusCode;
            logData.response = request.method !== 'GET' ? response : null;
            logData.system = response?.system || null;
        }), (0, operators_1.catchError)(async (error) => {
            logData.responseTimestamp = date_util_1.DateUtil.now().toDate();
            logData.responseTime = logData.responseTimestamp - startTime;
            logData.statusCode = error.status || 500;
            logData.system = error?.response?.system || null;
            logData.error = {
                message: error.message,
            };
            logData.isError = true;
            throw error;
        }), (0, operators_1.finalize)(() => {
            this.logsService.create(logData);
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof logs_service_1.LogsService !== "undefined" && logs_service_1.LogsService) === "function" ? _a : Object, typeof (_b = typeof systems_service_1.SystemsService !== "undefined" && systems_service_1.SystemsService) === "function" ? _b : Object])
], LoggingInterceptor);


/***/ }),

/***/ "./src/common/utils/date.util.ts":
/*!***************************************!*\
  !*** ./src/common/utils/date.util.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateUtil = void 0;
const dayjs = __webpack_require__(/*! dayjs */ "dayjs");
const utc = __webpack_require__(/*! dayjs/plugin/utc */ "dayjs/plugin/utc");
const timezone = __webpack_require__(/*! dayjs/plugin/timezone */ "dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
class DateUtilWrapper {
    constructor(date) {
        this.date = date;
    }
    toDate() {
        return this.date.toDate();
    }
    format(format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date.format(format);
    }
    addDays(days) {
        return new DateUtilWrapper(this.date.add(days, 'day'));
    }
    addMinutes(minutes) {
        return new DateUtilWrapper(this.date.add(minutes, 'minute'));
    }
    toISOString() {
        return this.date.toISOString();
    }
    toMinutes() {
        return this.date.hour() * 60 + this.date.minute();
    }
    hour(hours) {
        return new DateUtilWrapper(this.date.hour(hours));
    }
    minute(minutes) {
        return new DateUtilWrapper(this.date.minute(minutes));
    }
    second(seconds) {
        return new DateUtilWrapper(this.date.second(seconds));
    }
}
class DateUtil {
    static now() {
        return new DateUtilWrapper(dayjs().tz('Asia/Seoul'));
    }
    static date(date) {
        return new DateUtilWrapper(dayjs.tz(date, 'Asia/Seoul'));
    }
    static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date(date).format(format);
    }
    static parse(dateString) {
        return this.date(dateString);
    }
    static addDays(date, days) {
        return this.date(date).addDays(days);
    }
    static addMinutes(date, minutes) {
        return this.date(date).addMinutes(minutes);
    }
    static toISOString(date) {
        return this.date(date).toISOString();
    }
    static toMinutes(date) {
        const d = this.date(date);
        return d.toMinutes();
    }
    static fromMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return this.now().hour(hours).minute(mins).second(0);
    }
}
exports.DateUtil = DateUtil;


/***/ }),

/***/ "./src/common/utils/swagger.ts":
/*!*************************************!*\
  !*** ./src/common/utils/swagger.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupSwagger = setupSwagger;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
        },
    });
}


/***/ }),

/***/ "./src/dtos.index.ts":
/*!***************************!*\
  !*** ./src/dtos.index.ts ***!
  \***************************/
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
__exportStar(__webpack_require__(/*! ./modules/application/legacy/users/dto */ "./src/modules/application/legacy/users/dto/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./modules/application/legacy/systems/dto */ "./src/modules/application/legacy/systems/dto/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./common/dto */ "./src/common/dto/index.ts"), exports);


/***/ }),

/***/ "./src/modules/application/legacy/auth/auth.module.ts":
/*!************************************************************!*\
  !*** ./src/modules/application/legacy/auth/auth.module.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./services/auth.service */ "./src/modules/application/legacy/auth/services/auth.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const admin_controller_1 = __webpack_require__(/*! ./controllers/admin.controller */ "./src/modules/application/legacy/auth/controllers/admin.controller.ts");
const admin_usecase_1 = __webpack_require__(/*! ./usecases/admin.usecase */ "./src/modules/application/legacy/auth/usecases/admin.usecase.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./guards/jwt-auth.guard */ "./src/modules/application/legacy/auth/guards/jwt-auth.guard.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
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
        ],
        controllers: [admin_controller_1.AdminAuthController],
        providers: [auth_service_1.AuthService, admin_usecase_1.AdminUseCase, jwt_auth_guard_1.JwtAuthGuard],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),

/***/ "./src/modules/application/legacy/auth/controllers/admin.controller.ts":
/*!*****************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/controllers/admin.controller.ts ***!
  \*****************************************************************************/
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
exports.AdminAuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const admin_usecase_1 = __webpack_require__(/*! ../usecases/admin.usecase */ "./src/modules/application/legacy/auth/usecases/admin.usecase.ts");
const admin_1 = __webpack_require__(/*! ../dto/admin */ "./src/modules/application/legacy/auth/dto/admin/index.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../guards/jwt-auth.guard */ "./src/modules/application/legacy/auth/guards/jwt-auth.guard.ts");
const api_response_dto_1 = __webpack_require__(/*! ../../../../../common/dto/api-response.dto */ "./src/common/dto/api-response.dto.ts");
let AdminAuthController = class AdminAuthController {
    constructor(adminUseCase) {
        this.adminUseCase = adminUseCase;
    }
    async login(loginDto) {
        console.log(loginDto);
        const result = await this.adminUseCase.login(loginDto.email, loginDto.password);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
    async verifyToken(verifyDto) {
        const result = await this.adminUseCase.verifyToken(verifyDto.token);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
    async refreshToken(refreshDto) {
        const result = await this.adminUseCase.refreshToken(refreshDto.refreshToken);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
    async getProfile(req) {
        const adminId = req.user.sub;
        const result = await this.adminUseCase.getProfile(adminId);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
    async changePassword(req, changePasswordDto) {
        const adminId = req.user.sub;
        const result = await this.adminUseCase.changePassword(adminId, changePasswordDto.currentPassword, changePasswordDto.newPassword);
        return api_response_dto_1.ApiResponseDto.success(result);
    }
};
exports.AdminAuthController = AdminAuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '관리자 로그인' }),
    (0, swagger_1.ApiBody)({ type: admin_1.AdminLoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인 성공',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof admin_1.AdminLoginDto !== "undefined" && admin_1.AdminLoginDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AdminAuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '토큰 검증' }),
    (0, swagger_1.ApiBody)({ type: admin_1.AdminTokenVerifyDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 검증 성공',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof admin_1.AdminTokenVerifyDto !== "undefined" && admin_1.AdminTokenVerifyDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AdminAuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '토큰 갱신' }),
    (0, swagger_1.ApiBody)({ type: admin_1.AdminTokenRefreshDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 갱신 성공',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof admin_1.AdminTokenRefreshDto !== "undefined" && admin_1.AdminTokenRefreshDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AdminAuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '내 정보 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '관리자 정보',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AdminAuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 변경' }),
    (0, swagger_1.ApiBody)({ type: admin_1.ChangePasswordDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '비밀번호 변경 성공',
        type: () => api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_j = typeof admin_1.ChangePasswordDto !== "undefined" && admin_1.ChangePasswordDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AdminAuthController.prototype, "changePassword", null);
exports.AdminAuthController = AdminAuthController = __decorate([
    (0, swagger_1.ApiTags)('관리자 인증 API'),
    (0, common_1.Controller)('admin/auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_usecase_1.AdminUseCase !== "undefined" && admin_usecase_1.AdminUseCase) === "function" ? _a : Object])
], AdminAuthController);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/admin-login-response.dto.ts":
/*!***********************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/admin-login-response.dto.ts ***!
  \***********************************************************************************/
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
exports.AdminLoginResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const admin_response_dto_1 = __webpack_require__(/*! ./admin-response.dto */ "./src/modules/application/legacy/auth/dto/admin/admin-response.dto.ts");
class AdminLoginResponseDto {
}
exports.AdminLoginResponseDto = AdminLoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], AdminLoginResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '리프레시 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], AdminLoginResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 정보',
        type: admin_response_dto_1.AdminResponseDto,
    }),
    __metadata("design:type", typeof (_a = typeof admin_response_dto_1.AdminResponseDto !== "undefined" && admin_response_dto_1.AdminResponseDto) === "function" ? _a : Object)
], AdminLoginResponseDto.prototype, "admin", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/admin-login.dto.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/admin-login.dto.ts ***!
  \**************************************************************************/
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
exports.AdminLoginDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AdminLoginDto {
}
exports.AdminLoginDto = AdminLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 이메일',
        example: 'admin@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비밀번호',
        example: 'password123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "password", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/admin-profile.dto.ts":
/*!****************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/admin-profile.dto.ts ***!
  \****************************************************************************/
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
exports.AdminProfileDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class AdminProfileDto {
}
exports.AdminProfileDto = AdminProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이메일',
        example: 'admin@example.com',
    }),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '역할',
        example: 'admin',
    }),
    __metadata("design:type", String)
], AdminProfileDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '마지막 로그인 시간',
        example: '2023-01-01T00:00:00Z',
        required: false,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AdminProfileDto.prototype, "lastLogin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AdminProfileDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], AdminProfileDto.prototype, "updatedAt", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/admin-response.dto.ts":
/*!*****************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/admin-response.dto.ts ***!
  \*****************************************************************************/
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
exports.AdminResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class AdminResponseDto {
}
exports.AdminResponseDto = AdminResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], AdminResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이메일',
        example: 'admin@example.com',
    }),
    __metadata("design:type", String)
], AdminResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], AdminResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '역할',
        example: 'admin',
    }),
    __metadata("design:type", String)
], AdminResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AdminResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AdminResponseDto.prototype, "updatedAt", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/admin-token-refresh.dto.ts":
/*!**********************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/admin-token-refresh.dto.ts ***!
  \**********************************************************************************/
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
exports.AdminTokenRefreshDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AdminTokenRefreshDto {
}
exports.AdminTokenRefreshDto = AdminTokenRefreshDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '리프레시 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminTokenRefreshDto.prototype, "refreshToken", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/admin-token-verify.dto.ts":
/*!*********************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/admin-token-verify.dto.ts ***!
  \*********************************************************************************/
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
exports.AdminTokenVerifyDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AdminTokenVerifyDto {
}
exports.AdminTokenVerifyDto = AdminTokenVerifyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '검증할 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminTokenVerifyDto.prototype, "token", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/change-password.dto.ts":
/*!******************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/change-password.dto.ts ***!
  \******************************************************************************/
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
exports.ChangePasswordDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 비밀번호',
        example: 'current_password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '새 비밀번호',
        example: 'new_password123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/create-admin.dto.ts":
/*!***************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/create-admin.dto.ts ***!
  \***************************************************************************/
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
exports.CreateAdminDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateAdminDto {
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 이메일',
        example: 'admin@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 이름',
        example: '홍길동',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '관리자 역할',
        example: 'admin',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비밀번호',
        example: 'password123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/index.ts":
/*!****************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/index.ts ***!
  \****************************************************************/
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
__exportStar(__webpack_require__(/*! ./admin-login.dto */ "./src/modules/application/legacy/auth/dto/admin/admin-login.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./admin-login-response.dto */ "./src/modules/application/legacy/auth/dto/admin/admin-login-response.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./admin-profile.dto */ "./src/modules/application/legacy/auth/dto/admin/admin-profile.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./admin-response.dto */ "./src/modules/application/legacy/auth/dto/admin/admin-response.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./create-admin.dto */ "./src/modules/application/legacy/auth/dto/admin/create-admin.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./update-admin.dto */ "./src/modules/application/legacy/auth/dto/admin/update-admin.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./change-password.dto */ "./src/modules/application/legacy/auth/dto/admin/change-password.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./admin-token-verify.dto */ "./src/modules/application/legacy/auth/dto/admin/admin-token-verify.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./admin-token-refresh.dto */ "./src/modules/application/legacy/auth/dto/admin/admin-token-refresh.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./token-response.dto */ "./src/modules/application/legacy/auth/dto/admin/token-response.dto.ts"), exports);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/token-response.dto.ts":
/*!*****************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/token-response.dto.ts ***!
  \*****************************************************************************/
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
exports.TokenResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class TokenResponseDto {
}
exports.TokenResponseDto = TokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '리프레시 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        required: false,
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 만료 시간 (초)',
        example: 3600,
    }),
    __metadata("design:type", Number)
], TokenResponseDto.prototype, "expiresIn", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/dto/admin/update-admin.dto.ts":
/*!***************************************************************************!*\
  !*** ./src/modules/application/legacy/auth/dto/admin/update-admin.dto.ts ***!
  \***************************************************************************/
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
exports.UpdateAdminDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateAdminDto {
}
exports.UpdateAdminDto = UpdateAdminDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '관리자 이메일',
        example: 'admin@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '관리자 이름',
        example: '홍길동',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '관리자 역할',
        example: 'admin',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "role", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/auth/guards/jwt-auth.guard.ts":
/*!**********************************************************************!*\
  !*** ./src/modules/application/legacy/auth/guards/jwt-auth.guard.ts ***!
  \**********************************************************************/
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
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(jwtService, configService) {
        super();
        this.jwtService = jwtService;
        this.configService = configService;
        this.jwtSecret = this.configService.get('GLOBAL_SECRET');
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log('token', token);
        if (!token) {
            throw new common_1.UnauthorizedException('인증 토큰이 없습니다.');
        }
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.jwtSecret,
            });
            request.user = payload;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtAuthGuard);


/***/ }),

/***/ "./src/modules/application/legacy/auth/services/auth.service.ts":
/*!**********************************************************************!*\
  !*** ./src/modules/application/legacy/auth/services/auth.service.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bcrypt = __webpack_require__(/*! @node-rs/bcrypt */ "@node-rs/bcrypt");
let AuthService = class AuthService {
    constructor() {
        this.hardcodedAdmin = {
            id: '987ade20-8278-4819-bd04-faeb1192cba5',
            email: 'admin@lumir.space',
            name: '관리자',
            role: 'admin',
            password: '$2b$10$Ja916Bwk1syQGShmQJMfQ.q28HF4mnLMvAPOwxfoT2xbRNNTqgPpm',
            createdAt: new Date('2025-04-16 00:47:14.872'),
            updatedAt: new Date('2025-04-16 00:47:14.872'),
            hashPassword: async function () { },
            validatePassword: async function (password) {
                return bcrypt.compare(password, this.password);
            },
        };
    }
    async findAll() {
        const { password, hashPassword, validatePassword, ...adminData } = this.hardcodedAdmin;
        return [adminData];
    }
    async findOne(id) {
        if (id !== this.hardcodedAdmin.id) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
        const { password, hashPassword, validatePassword, ...adminData } = this.hardcodedAdmin;
        return adminData;
    }
    async findByEmail(email) {
        if (email !== this.hardcodedAdmin.email) {
            return null;
        }
        return this.hardcodedAdmin;
    }
    async create(adminData) {
        throw new Error('Creating new admin is not supported in hardcoded mode');
    }
    async update(id, adminData) {
        throw new Error('Updating admin is not supported in hardcoded mode');
    }
    async remove(id) {
        throw new Error('Removing admin is not supported in hardcoded mode');
    }
    async changePassword(id, currentPassword, newPassword) {
        throw new Error('Changing password is not supported in hardcoded mode');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);


/***/ }),

/***/ "./src/modules/application/legacy/auth/usecases/admin.usecase.ts":
/*!***********************************************************************!*\
  !*** ./src/modules/application/legacy/auth/usecases/admin.usecase.ts ***!
  \***********************************************************************/
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
exports.AdminUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_service_1 = __webpack_require__(/*! ../services/auth.service */ "./src/modules/application/legacy/auth/services/auth.service.ts");
let AdminUseCase = class AdminUseCase {
    constructor(authService, jwtService, configService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.jwtSecret = this.configService.get('GLOBAL_SECRET');
    }
    async login(email, password) {
        const admin = await this.authService.findByEmail(email);
        if (!admin) {
            throw new common_1.UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        const isPasswordValid = await admin.validatePassword(password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        const payload = { sub: admin.id, email: admin.email, role: admin.role };
        const { password: _, ...adminInfo } = admin;
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: this.jwtSecret,
                expiresIn: '1h',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: this.jwtSecret,
                expiresIn: '7d',
            }),
            admin: adminInfo,
        };
    }
    async verifyToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.jwtSecret,
            });
            const admin = await this.authService.findOne(payload.sub);
            if (!admin) {
                throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
            }
            const { password: _, ...adminInfo } = admin;
            return {
                accessToken: token,
                refreshToken: '',
                admin: adminInfo,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
        }
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.jwtSecret,
            });
            const admin = await this.authService.findOne(payload.sub);
            if (!admin) {
                throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
            }
            const newPayload = { sub: admin.id, email: admin.email, role: admin.role };
            return {
                accessToken: this.jwtService.sign(newPayload, {
                    secret: this.jwtSecret,
                    expiresIn: '1h',
                }),
                refreshToken: this.jwtService.sign(newPayload, {
                    secret: this.jwtSecret,
                    expiresIn: '7d',
                }),
                expiresIn: 3600,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
        }
    }
    async getProfile(adminId) {
        try {
            const admin = await this.authService.findOne(adminId);
            return {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.UnauthorizedException('관리자 정보를 찾을 수 없습니다.');
            }
            throw error;
        }
    }
    async changePassword(adminId, currentPassword, newPassword) {
        const result = await this.authService.changePassword(adminId, currentPassword, newPassword);
        if (!result) {
            throw new common_1.UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
        }
        return { success: true };
    }
};
exports.AdminUseCase = AdminUseCase;
exports.AdminUseCase = AdminUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AdminUseCase);


/***/ }),

/***/ "./src/modules/application/legacy/logs/controllers/admin.controller.ts":
/*!*****************************************************************************!*\
  !*** ./src/modules/application/legacy/logs/controllers/admin.controller.ts ***!
  \*****************************************************************************/
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
exports.AdminLogsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const admin_usecase_1 = __webpack_require__(/*! ../usecases/admin.usecase */ "./src/modules/application/legacy/logs/usecases/admin.usecase.ts");
const log_filter_dto_1 = __webpack_require__(/*! ../dto/log-filter.dto */ "./src/modules/application/legacy/logs/dto/log-filter.dto.ts");
const api_response_dto_1 = __webpack_require__(/*! ../../../../../common/dto/api-response.dto */ "./src/common/dto/api-response.dto.ts");
let AdminLogsController = class AdminLogsController {
    constructor(logsAdminUseCase) {
        this.logsAdminUseCase = logsAdminUseCase;
    }
    async findAll(page = 1, limit = 10) {
        try {
            const { logs, total, page: pageNum, totalPages } = await this.logsAdminUseCase.findAll(+page, +limit);
            const responseData = {
                logs: logs.map((log) => this.logsAdminUseCase.mapLogToDto(log)),
                total,
                page: pageNum,
                limit: +limit,
            };
            return api_response_dto_1.ApiResponseDto.success(responseData);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('LOGS_FETCH_ERROR', '로그 목록을 가져오는 중 오류가 발생했습니다.');
        }
    }
    async findOne(id) {
        try {
            const log = await this.logsAdminUseCase.findOne(id);
            return api_response_dto_1.ApiResponseDto.success(this.logsAdminUseCase.mapLogToDto(log));
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('LOG_NOT_FOUND', `ID가 ${id}인 로그를 찾을 수 없습니다.`);
        }
    }
    async filter(filterDto) {
        try {
            const { logs, total, page, totalPages } = await this.logsAdminUseCase.filterLogs(filterDto);
            const responseData = {
                logs: logs.map((log) => this.logsAdminUseCase.mapLogToDto(log)),
                total,
                page,
                limit: filterDto.limit || 10,
            };
            return api_response_dto_1.ApiResponseDto.success(responseData);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('LOGS_FILTER_ERROR', '로그 필터링 중 오류가 발생했습니다.');
        }
    }
};
exports.AdminLogsController = AdminLogsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '로그 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '로그 목록 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: '페이지 번호', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: '페이지당 항목 수', type: Number }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AdminLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '로그 상세 조회' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '로그 상세 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '로그 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AdminLogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('filter'),
    (0, swagger_1.ApiOperation)({ summary: '로그 필터링' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '로그 필터링 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof log_filter_dto_1.LogFilterDto !== "undefined" && log_filter_dto_1.LogFilterDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AdminLogsController.prototype, "filter", null);
exports.AdminLogsController = AdminLogsController = __decorate([
    (0, swagger_1.ApiTags)('관리자 로그 API'),
    (0, common_1.Controller)('admin/logs'),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_usecase_1.LogsAdminUseCase !== "undefined" && admin_usecase_1.LogsAdminUseCase) === "function" ? _a : Object])
], AdminLogsController);


/***/ }),

/***/ "./src/modules/application/legacy/logs/dto/log-filter.dto.ts":
/*!*******************************************************************!*\
  !*** ./src/modules/application/legacy/logs/dto/log-filter.dto.ts ***!
  \*******************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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
    (0, swagger_1.ApiProperty)({ description: 'Page number', required: false, default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LogFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of logs per page', required: false, default: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LogFilterDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start date for filtering logs', required: false }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LogFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End date for filtering logs', required: false }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], LogFilterDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'HTTP method filter', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL path filter', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status code filter', required: false }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LogFilterDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Host filter', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP address filter', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'System filter', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "system", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Show only errors (status >= 400)', required: false, default: false }),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LogFilterDto.prototype, "errorsOnly", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Field to sort by',
        required: false,
        default: 'requestTimestamp',
        enum: ['requestTimestamp', 'method', 'url', 'statusCode', 'responseTime', 'ip', 'host'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort direction',
        required: false,
        default: SortDirection.DESC,
        enum: SortDirection,
    }),
    (0, class_validator_1.IsEnum)(SortDirection),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogFilterDto.prototype, "sortDirection", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/logs/dto/log-response.dto.ts":
/*!*********************************************************************!*\
  !*** ./src/modules/application/legacy/logs/dto/log-response.dto.ts ***!
  \*********************************************************************/
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
exports.LogResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class LogResponseDto {
}
exports.LogResponseDto = LogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the log entry' }),
    __metadata("design:type", String)
], LogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp when the log was created' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], LogResponseDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request headers', required: false }),
    __metadata("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
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


/***/ }),

/***/ "./src/modules/application/legacy/logs/logs.module.ts":
/*!************************************************************!*\
  !*** ./src/modules/application/legacy/logs/logs.module.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const logs_service_1 = __webpack_require__(/*! ./services/logs.service */ "./src/modules/application/legacy/logs/services/logs.service.ts");
const admin_controller_1 = __webpack_require__(/*! ./controllers/admin.controller */ "./src/modules/application/legacy/logs/controllers/admin.controller.ts");
const admin_usecase_1 = __webpack_require__(/*! ./usecases/admin.usecase */ "./src/modules/application/legacy/logs/usecases/admin.usecase.ts");
const log_module_1 = __webpack_require__(/*! ../../../domain/log/log.module */ "./src/modules/domain/log/log.module.ts");
let LogsModule = class LogsModule {
};
exports.LogsModule = LogsModule;
exports.LogsModule = LogsModule = __decorate([
    (0, common_1.Module)({
        imports: [log_module_1.DomainLogModule],
        providers: [logs_service_1.LogsService, admin_usecase_1.LogsAdminUseCase],
        controllers: [admin_controller_1.AdminLogsController],
        exports: [logs_service_1.LogsService, admin_usecase_1.LogsAdminUseCase],
    })
], LogsModule);


/***/ }),

/***/ "./src/modules/application/legacy/logs/services/logs.service.ts":
/*!**********************************************************************!*\
  !*** ./src/modules/application/legacy/logs/services/logs.service.ts ***!
  \**********************************************************************/
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
var LogsService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const log_filter_dto_1 = __webpack_require__(/*! ../dto/log-filter.dto */ "./src/modules/application/legacy/logs/dto/log-filter.dto.ts");
const log_service_1 = __webpack_require__(/*! ../../../../domain/log/log.service */ "./src/modules/domain/log/log.service.ts");
let LogsService = LogsService_1 = class LogsService {
    constructor(domainLogService) {
        this.domainLogService = domainLogService;
        this.logger = new common_1.Logger(LogsService_1.name);
    }
    async create(createLogDto) {
        await this.domainLogService.save(createLogDto);
    }
    async createMany(createLogDto) {
        for (const dto of createLogDto) {
            await this.domainLogService.create(dto);
        }
    }
    async findAll(page = 1, limit = 10) {
        const options = {
            order: { requestTimestamp: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        };
        const logs = await this.domainLogService.findAll(options);
        const allLogs = await this.domainLogService.findAll();
        const total = allLogs.length;
        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const log = await this.domainLogService.findOne({ where: { id } });
        if (!log) {
            throw new common_1.NotFoundException(`Log with ID ${id} not found`);
        }
        return log;
    }
    async filterLogs(filterDto) {
        const { page = 1, limit = 10, startDate, endDate, method, url, statusCode, host, ip, system, errorsOnly, sortBy = 'requestTimestamp', sortDirection = log_filter_dto_1.SortDirection.DESC, } = filterDto;
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
        const logs = await this.domainLogService.findAll(options);
        const allFilteredLogs = await this.domainLogService.findAll({ where });
        const total = allFilteredLogs.length;
        return {
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = LogsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof log_service_1.DomainLogService !== "undefined" && log_service_1.DomainLogService) === "function" ? _a : Object])
], LogsService);


/***/ }),

/***/ "./src/modules/application/legacy/logs/usecases/admin.usecase.ts":
/*!***********************************************************************!*\
  !*** ./src/modules/application/legacy/logs/usecases/admin.usecase.ts ***!
  \***********************************************************************/
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
var LogsAdminUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogsAdminUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const logs_service_1 = __webpack_require__(/*! ../services/logs.service */ "./src/modules/application/legacy/logs/services/logs.service.ts");
const log_response_dto_1 = __webpack_require__(/*! ../dto/log-response.dto */ "./src/modules/application/legacy/logs/dto/log-response.dto.ts");
let LogsAdminUseCase = LogsAdminUseCase_1 = class LogsAdminUseCase {
    constructor(logsService) {
        this.logsService = logsService;
        this.logger = new common_1.Logger(LogsAdminUseCase_1.name);
    }
    async findAll(page = 1, limit = 10) {
        console.log('findAll', page, limit);
        try {
            return await this.logsService.findAll(page, limit);
        }
        catch (error) {
            this.logger.error(`로그 목록 조회 중 오류 발생: ${error.message}`);
            return {
                logs: [],
                total: 0,
                page,
                totalPages: 0,
            };
        }
    }
    async findOne(id) {
        try {
            return await this.logsService.findOne(id);
        }
        catch (error) {
            this.logger.error(`로그 상세 조회 중 오류 발생: ${error.message}`);
            throw error;
        }
    }
    async filterLogs(filterDto) {
        try {
            return await this.logsService.filterLogs(filterDto);
        }
        catch (error) {
            this.logger.error(`로그 필터링 중 오류 발생: ${error.message}`);
            return {
                logs: [],
                total: 0,
                page: filterDto.page || 1,
                totalPages: 0,
            };
        }
    }
    async findLoginLogs(days = 7) {
        try {
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - days);
            const { logs } = await this.logsService.filterLogs({
                startDate: fromDate,
                url: '/auth/login',
                limit: 1000,
            });
            return logs;
        }
        catch (error) {
            this.logger.error(`로그인 로그를 가져오는 중 오류 발생: ${error.message}`);
            return [];
        }
    }
    mapLogToDto(log) {
        const responseDto = new log_response_dto_1.LogResponseDto();
        responseDto.id = log.id;
        responseDto.requestTimestamp = log.requestTimestamp;
        responseDto.method = log.method;
        responseDto.url = log.url;
        responseDto.query = log.query;
        responseDto.body = log.body;
        responseDto.statusCode = log.statusCode;
        responseDto.responseTime = log.responseTime;
        responseDto.response = log.response;
        responseDto.error = log.error;
        responseDto.ip = log.ip;
        responseDto.host = log.host;
        responseDto.userAgent = log.userAgent;
        responseDto.system = log.system;
        return responseDto;
    }
};
exports.LogsAdminUseCase = LogsAdminUseCase;
exports.LogsAdminUseCase = LogsAdminUseCase = LogsAdminUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof logs_service_1.LogsService !== "undefined" && logs_service_1.LogsService) === "function" ? _a : Object])
], LogsAdminUseCase);


/***/ }),

/***/ "./src/modules/application/legacy/mail/mail.module.ts":
/*!************************************************************!*\
  !*** ./src/modules/application/legacy/mail/mail.module.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mailer_1 = __webpack_require__(/*! @nestjs-modules/mailer */ "@nestjs-modules/mailer");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const handlebars_adapter_1 = __webpack_require__(/*! @nestjs-modules/mailer/dist/adapters/handlebars.adapter */ "@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = __webpack_require__(/*! path */ "path");
const mail_service_1 = __webpack_require__(/*! ./mail.service */ "./src/modules/application/legacy/mail/mail.service.ts");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    return {
                        transport: {
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false,
                            auth: {
                                user: configService.get('GMAIL_USER'),
                                pass: configService.get('GMAIL_PASSWORD'),
                            },
                        },
                        defaults: {
                            from: `"LSSO" <${configService.get('GMAIL_USER')}>`,
                        },
                        template: {
                            dir: (0, path_1.join)(__dirname, 'templates'),
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService],
    })
], MailModule);


/***/ }),

/***/ "./src/modules/application/legacy/mail/mail.service.ts":
/*!*************************************************************!*\
  !*** ./src/modules/application/legacy/mail/mail.service.ts ***!
  \*************************************************************/
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
exports.MailService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mailer_1 = __webpack_require__(/*! @nestjs-modules/mailer */ "@nestjs-modules/mailer");
const path_1 = __webpack_require__(/*! path */ "path");
const fs = __webpack_require__(/*! fs */ "fs");
const handlebars = __webpack_require__(/*! handlebars */ "handlebars");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        handlebars.registerHelper({
            multiply: (a, b) => a * b,
            divide: (a, b) => a / b,
            round: (num) => Math.round(num),
            gt: (a, b) => {
                if (Array.isArray(a)) {
                    return a.length > b;
                }
                return a > b;
            },
            eq: (a, b) => a === b,
            mod: (a, b) => a % b,
            times: function (n, block) {
                let accum = '';
                for (let i = 0; i < n; ++i)
                    accum += block.fn(i);
                return accum;
            },
            or: (a, b) => a || b,
            minutesToHours: (minutes) => {
                return Number((minutes / 60).toFixed(2));
            },
            substring: (str, start, end) => {
                if (!str)
                    return '';
                if (end === undefined) {
                    return str.substring(start);
                }
                return str.substring(start, end);
            },
            formatExpiresIn: (expiresIn) => {
                if (!expiresIn)
                    return '';
                const unit = expiresIn.slice(-1);
                const value = expiresIn.slice(0, -1);
                switch (unit) {
                    case 'h':
                        return `${value}시간`;
                    case 'm':
                        return `${value}분`;
                    case 'd':
                        return `${value}일`;
                    case 's':
                        return `${value}초`;
                    default:
                        return expiresIn;
                }
            },
        });
    }
    async sendEmail(dto) {
        console.log(dto);
        let { recipients: to, subject, template, context } = dto;
        const templatePath = (0, path_1.join)(__dirname, '..', '..', '..', '..', '..', '..', 'src', 'modules', 'application', 'legacy', 'mail', 'templates', `${template}.hbs`);
        let source = '';
        try {
            source = fs.readFileSync(templatePath, 'utf-8');
        }
        catch (error) {
            console.error(`Error reading template file: ${error}`);
            throw new common_1.BadRequestException('해당 경로에 파일이 존재하지 않습니다.');
        }
        const compiledTemplate = handlebars.compile(source);
        const html = compiledTemplate(context);
        await this.mailerService.sendMail({
            from: `"No Reply" <${process.env.GMAIL_USER}>`,
            to: to,
            subject: subject,
            html: html,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object])
], MailService);


/***/ }),

/***/ "./src/modules/application/legacy/systems/controllers/admin.controller.ts":
/*!********************************************************************************!*\
  !*** ./src/modules/application/legacy/systems/controllers/admin.controller.ts ***!
  \********************************************************************************/
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
exports.AdminSystemsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_system_dto_1 = __webpack_require__(/*! ../dto/create-system.dto */ "./src/modules/application/legacy/systems/dto/create-system.dto.ts");
const update_system_dto_1 = __webpack_require__(/*! ../dto/update-system.dto */ "./src/modules/application/legacy/systems/dto/update-system.dto.ts");
const api_response_dto_1 = __webpack_require__(/*! ../../../../../common/dto/api-response.dto */ "./src/common/dto/api-response.dto.ts");
const admin_usecase_1 = __webpack_require__(/*! ../usecases/admin.usecase */ "./src/modules/application/legacy/systems/usecases/admin.usecase.ts");
let AdminSystemsController = class AdminSystemsController {
    constructor(adminUsecase) {
        this.adminUsecase = adminUsecase;
    }
    async findAll(search) {
        try {
            let systems;
            if (search) {
                systems = await this.adminUsecase.searchSystems(search);
            }
            else {
                systems = await this.adminUsecase.findAll();
            }
            return api_response_dto_1.ApiResponseDto.success(systems);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEMS_FETCH_ERROR', '시스템 목록을 조회하는 중 오류가 발생했습니다.');
        }
    }
    async search(query) {
        try {
            const systems = await this.adminUsecase.searchSystems(query);
            return api_response_dto_1.ApiResponseDto.success(systems);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEMS_SEARCH_ERROR', '시스템 검색 중 오류가 발생했습니다.');
        }
    }
    async findOne(id) {
        try {
            const system = await this.adminUsecase.findOne(id);
            return api_response_dto_1.ApiResponseDto.success(system);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEM_NOT_FOUND', `해당 ID의 시스템을 찾을 수 없습니다: ${id}`);
        }
    }
    async create(createSystemDto) {
        try {
            console.log(createSystemDto);
            const system = await this.adminUsecase.registerSystem(createSystemDto);
            console.log(system);
            return api_response_dto_1.ApiResponseDto.success(system);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEM_CREATE_ERROR', '시스템 생성 중 오류가 발생했습니다.');
        }
    }
    async partialUpdate(id, updateSystemDto) {
        try {
            let system;
            system = await this.adminUsecase.update(id, updateSystemDto);
            return api_response_dto_1.ApiResponseDto.success(system);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEM_UPDATE_ERROR', `시스템 수정 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            await this.adminUsecase.remove(id);
            return api_response_dto_1.ApiResponseDto.success(true);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('SYSTEM_DELETE_ERROR', `시스템 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async regenerateApiKeys(id) {
        try {
            const system = await this.adminUsecase.regenerateApiKeys(id);
            return api_response_dto_1.ApiResponseDto.success(system);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('KEY_REGENERATION_ERROR', `키 재생성 중 오류가 발생했습니다: ${error.message}`);
        }
    }
};
exports.AdminSystemsController = AdminSystemsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 목록 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: '검색어 (이름, 설명, 공개키, 허용된 출처)' }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AdminSystemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 검색' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 검색 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AdminSystemsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 상세 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 상세 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AdminSystemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '시스템 생성', description: '새로운 시스템을 등록하고 공개키/비밀키 쌍을 생성합니다.' }),
    (0, swagger_1.ApiBody)({ type: create_system_dto_1.CreateSystemDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '시스템 생성 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_system_dto_1.CreateSystemDto !== "undefined" && create_system_dto_1.CreateSystemDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AdminSystemsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 부분 수정' }),
    (0, swagger_1.ApiBody)({ type: update_system_dto_1.UpdateSystemDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 수정 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof update_system_dto_1.UpdateSystemDto !== "undefined" && update_system_dto_1.UpdateSystemDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AdminSystemsController.prototype, "partialUpdate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '시스템 삭제' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '시스템 삭제 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AdminSystemsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/regenerate-keys'),
    (0, swagger_1.ApiOperation)({ summary: 'API 키 재생성', description: '공개키/비밀키 쌍을 새로 생성합니다.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '키가 재생성되었습니다.',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '시스템 ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AdminSystemsController.prototype, "regenerateApiKeys", null);
exports.AdminSystemsController = AdminSystemsController = __decorate([
    (0, swagger_1.ApiTags)('관리자 시스템 API'),
    (0, common_1.Controller)('admin/systems'),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_usecase_1.AdminUsecase !== "undefined" && admin_usecase_1.AdminUsecase) === "function" ? _a : Object])
], AdminSystemsController);


/***/ }),

/***/ "./src/modules/application/legacy/systems/dto/create-system.dto.ts":
/*!*************************************************************************!*\
  !*** ./src/modules/application/legacy/systems/dto/create-system.dto.ts ***!
  \*************************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateSystemDto {
}
exports.CreateSystemDto = CreateSystemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 이름',
        example: 'Sample System',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 설명',
        example: 'This is a sample system description',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 도메인',
        example: 'example.com',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '허용된 출처 URL 목록',
        example: ['https://sample-system.com'],
        type: [String],
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSystemDto.prototype, "allowedOrigin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '헬스 체크 URL',
        example: 'https://sample-system.com/health',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "healthCheckUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '클라이언트 ID (입력하지 않으면 자동 생성)',
        example: 'client-a1b2c3d4',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '클라이언트 시크릿 (입력하지 않으면 자동 생성)',
        example: 'secret-a1b2c3d4e5f6',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSystemDto.prototype, "clientSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '활성 여부',
        example: true,
        required: false,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateSystemDto.prototype, "isActive", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/systems/dto/index.ts":
/*!*************************************************************!*\
  !*** ./src/modules/application/legacy/systems/dto/index.ts ***!
  \*************************************************************/
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
__exportStar(__webpack_require__(/*! ./create-system.dto */ "./src/modules/application/legacy/systems/dto/create-system.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./update-system.dto */ "./src/modules/application/legacy/systems/dto/update-system.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./response-system.dto */ "./src/modules/application/legacy/systems/dto/response-system.dto.ts"), exports);


/***/ }),

/***/ "./src/modules/application/legacy/systems/dto/response-system.dto.ts":
/*!***************************************************************************!*\
  !*** ./src/modules/application/legacy/systems/dto/response-system.dto.ts ***!
  \***************************************************************************/
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
exports.ResponseSystemDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class ResponseSystemDto {
}
exports.ResponseSystemDto = ResponseSystemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 이름',
        example: 'Sample System',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 설명',
        example: 'This is a sample system description',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 도메인',
        example: 'sample-system.com',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '허용된 출처 URL 목록',
        example: ['https://sample-system.com'],
        type: [String],
    }),
    __metadata("design:type", Array)
], ResponseSystemDto.prototype, "allowedOrigin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '헬스 체크 URL',
        example: 'https://sample-system.com/health',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "healthCheckUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 활성화 상태',
        example: true,
    }),
    __metadata("design:type", Boolean)
], ResponseSystemDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '클라이언트 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '클라이언트 시크릿',
        example: 'c891e70e62fc104e7d92c30b920cfb9e4cd39fa2c117fd2cb6e1e05c4054c204',
    }),
    __metadata("design:type", String)
], ResponseSystemDto.prototype, "clientSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ResponseSystemDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ResponseSystemDto.prototype, "updatedAt", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/systems/dto/update-system.dto.ts":
/*!*************************************************************************!*\
  !*** ./src/modules/application/legacy/systems/dto/update-system.dto.ts ***!
  \*************************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateSystemDto {
}
exports.UpdateSystemDto = UpdateSystemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 이름',
        example: 'Sample System',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 설명',
        example: 'This is a sample system description',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '시스템 도메인',
        example: 'example.com',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '허용된 출처 URL 목록',
        example: ['https://sample-system.com'],
        type: [String],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateSystemDto.prototype, "allowedOrigin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '헬스 체크 URL',
        example: 'https://sample-system.com/health',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "healthCheckUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '클라이언트 ID',
        example: 'client-a1b2c3d4',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '클라이언트 시크릿',
        example: 'secret-a1b2c3d4e5f6',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSystemDto.prototype, "clientSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '활성 여부',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateSystemDto.prototype, "isActive", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/systems/services/systems.service.ts":
/*!****************************************************************************!*\
  !*** ./src/modules/application/legacy/systems/services/systems.service.ts ***!
  \****************************************************************************/
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
exports.SystemsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const system_service_1 = __webpack_require__(/*! ../../../../domain/system/system.service */ "./src/modules/domain/system/system.service.ts");
let SystemsService = class SystemsService {
    constructor(systemService) {
        this.systemService = systemService;
    }
    async findAll(options) {
        return this.systemService.findAll(options);
    }
    async findOne(id) {
        return this.systemService.findOne({ where: { id } });
    }
    async findByClientId(clientId) {
        return this.systemService.findByClientId(clientId);
    }
    async findByName(name) {
        return this.systemService.findByName(name);
    }
    async findByDomain(domain) {
        return this.systemService.findByDomain(domain);
    }
    async findActiveSystems() {
        return this.systemService.findActiveSystems();
    }
    async create(createSystemDto) {
        const { clientId, clientSecret, hash } = this.systemService.generateCredentials();
        const systemData = {
            ...createSystemDto,
            clientId,
            clientSecret: hash,
        };
        return this.systemService.create(systemData);
    }
    async update(id, systemData) {
        return this.systemService.update(id, systemData);
    }
    async remove(id) {
        await this.systemService.delete(id);
    }
    async verifyClientSecret(clientSecret, system) {
        return this.systemService.verifyClientSecret(clientSecret, system);
    }
    generateCredentials() {
        return this.systemService.generateCredentials();
    }
};
exports.SystemsService = SystemsService;
exports.SystemsService = SystemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof system_service_1.DomainSystemService !== "undefined" && system_service_1.DomainSystemService) === "function" ? _a : Object])
], SystemsService);


/***/ }),

/***/ "./src/modules/application/legacy/systems/systems.module.ts":
/*!******************************************************************!*\
  !*** ./src/modules/application/legacy/systems/systems.module.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const systems_service_1 = __webpack_require__(/*! ./services/systems.service */ "./src/modules/application/legacy/systems/services/systems.service.ts");
const admin_controller_1 = __webpack_require__(/*! ./controllers/admin.controller */ "./src/modules/application/legacy/systems/controllers/admin.controller.ts");
const admin_usecase_1 = __webpack_require__(/*! ./usecases/admin.usecase */ "./src/modules/application/legacy/systems/usecases/admin.usecase.ts");
const system_module_1 = __webpack_require__(/*! ../../../domain/system/system.module */ "./src/modules/domain/system/system.module.ts");
let SystemsModule = class SystemsModule {
};
exports.SystemsModule = SystemsModule;
exports.SystemsModule = SystemsModule = __decorate([
    (0, common_1.Module)({
        imports: [system_module_1.DomainSystemModule],
        providers: [systems_service_1.SystemsService, admin_usecase_1.AdminUsecase],
        controllers: [admin_controller_1.AdminSystemsController],
        exports: [systems_service_1.SystemsService, admin_usecase_1.AdminUsecase],
    })
], SystemsModule);


/***/ }),

/***/ "./src/modules/application/legacy/systems/usecases/admin.usecase.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/application/legacy/systems/usecases/admin.usecase.ts ***!
  \**************************************************************************/
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
exports.AdminUsecase = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const systems_service_1 = __webpack_require__(/*! ../services/systems.service */ "./src/modules/application/legacy/systems/services/systems.service.ts");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const bcrypt = __webpack_require__(/*! @node-rs/bcrypt */ "@node-rs/bcrypt");
let AdminUsecase = class AdminUsecase {
    constructor(systemsService) {
        this.systemsService = systemsService;
    }
    async findAll() {
        return this.systemsService.findAll();
    }
    async findOne(id) {
        return this.systemsService.findOne(id);
    }
    async create(createSystemDto) {
        return this.systemsService.create(createSystemDto);
    }
    async update(id, updateData) {
        return this.systemsService.update(id, updateData);
    }
    async remove(id) {
        return this.systemsService.remove(id);
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
        };
        return this.systemsService.findAll(options);
    }
    async registerSystem(createSystemDto) {
        const credentials = this.generateCredentials();
        console.log(credentials);
        createSystemDto.clientId = credentials.clientId;
        createSystemDto.clientSecret = credentials.hash;
        const system = await this.systemsService.create(createSystemDto);
        console.log('@', system);
        return { ...system, clientSecret: credentials.clientSecret };
    }
    async regenerateApiKeys(id) {
        const system = await this.systemsService.findOne(id);
        const credentials = this.generateSecret();
        system.clientSecret = credentials.hash;
        await this.systemsService.update(id, system);
        return { ...system, clientSecret: credentials.clientSecret };
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
exports.AdminUsecase = AdminUsecase;
exports.AdminUsecase = AdminUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof systems_service_1.SystemsService !== "undefined" && systems_service_1.SystemsService) === "function" ? _a : Object])
], AdminUsecase);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/controllers/admin-tokens.controller.ts":
/*!**************************************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/controllers/admin-tokens.controller.ts ***!
  \**************************************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminTokensController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const dto_1 = __webpack_require__(/*! ../dto */ "./src/modules/application/legacy/tokens/dto/index.ts");
const api_response_dto_1 = __webpack_require__(/*! ../../../../../common/dto/api-response.dto */ "./src/common/dto/api-response.dto.ts");
const admin_usecase_1 = __webpack_require__(/*! ../usecases/admin.usecase */ "./src/modules/application/legacy/tokens/usecases/admin.usecase.ts");
let AdminTokensController = class AdminTokensController {
    constructor(adminTokensUsecase) {
        this.adminTokensUsecase = adminTokensUsecase;
    }
    async findAll() {
        try {
            const tokensWithEmployee = await this.adminTokensUsecase.findAllWithEmployee();
            const tokenResponseDtos = tokensWithEmployee.map((token) => this.mapTokenToDto(token));
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDtos);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKENS_FETCH_ERROR', '토큰 목록을 조회하는 중 오류가 발생했습니다.');
        }
    }
    async findByEmployeeId(employeeId) {
        try {
            const tokens = await this.adminTokensUsecase.findByEmployeeId(employeeId);
            const tokenResponseDtos = tokens.map((token) => this.mapTokenToDto(token));
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDtos);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKENS_FETCH_ERROR', '직원별 토큰을 조회하는 중 오류가 발생했습니다.');
        }
    }
    async findOne(id) {
        try {
            const tokenWithEmployee = await this.adminTokensUsecase.findOneWithEmployee(id);
            const tokenResponseDto = this.mapTokenToDto(tokenWithEmployee);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_NOT_FOUND', `해당 ID의 토큰을 찾을 수 없습니다: ${id}`);
        }
    }
    async create(createTokenDto) {
        try {
            const token = await this.adminTokensUsecase.createToken(createTokenDto);
            const tokenResponseDto = this.mapTokenToDto(token);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_CREATE_ERROR', '토큰 생성 중 오류가 발생했습니다.');
        }
    }
    async updateStatus(id, updateTokenStatusDto) {
        try {
            const token = await this.adminTokensUsecase.updateStatus(id, updateTokenStatusDto.isActive);
            const tokenResponseDto = this.mapTokenToDto(token);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_UPDATE_ERROR', `토큰 상태 변경 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async renewToken(id, renewTokenDto) {
        try {
            const token = await this.adminTokensUsecase.renewToken(id, renewTokenDto);
            const tokenResponseDto = this.mapTokenToDto(token);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_RENEW_ERROR', `토큰 갱신 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async refreshToken(id) {
        try {
            const token = await this.adminTokensUsecase.refreshTokens(id);
            const tokenResponseDto = this.mapTokenToDto(token);
            return api_response_dto_1.ApiResponseDto.success(tokenResponseDto);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_REFRESH_ERROR', `리프레시 토큰을 사용한 액세스 토큰 갱신 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            await this.adminTokensUsecase.remove(id);
            return api_response_dto_1.ApiResponseDto.success(true);
        }
        catch (error) {
            return api_response_dto_1.ApiResponseDto.error('TOKEN_DELETE_ERROR', `토큰 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    }
    mapTokenToDto(token) {
        const responseDto = new dto_1.TokenResponseDto();
        responseDto.id = token.id;
        responseDto.accessToken = token.accessToken;
        responseDto.refreshToken = token.refreshToken;
        responseDto.tokenExpiresAt = token.tokenExpiresAt;
        responseDto.refreshTokenExpiresAt = token.refreshTokenExpiresAt;
        responseDto.lastAccess = token.lastAccess;
        responseDto.isActive = token.isActive;
        responseDto.createdAt = token.createdAt;
        responseDto.updatedAt = token.updatedAt;
        if (token.employee) {
            responseDto.userId = token.employee.id;
            responseDto.userName = token.employee.name;
            responseDto.userEmail = token.employee.email;
        }
        else {
            responseDto.userId = null;
            responseDto.userName = null;
            responseDto.userEmail = null;
        }
        return responseDto;
    }
};
exports.AdminTokensController = AdminTokensController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '토큰 목록 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 목록 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AdminTokensController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:employeeId'),
    (0, swagger_1.ApiOperation)({ summary: '직원별 토큰 조회' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: '직원 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '직원별 토큰 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AdminTokensController.prototype, "findByEmployeeId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 상세 조회' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 상세 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AdminTokensController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '토큰 생성' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '토큰 생성 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof dto_1.CreateTokenDto !== "undefined" && dto_1.CreateTokenDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AdminTokensController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 상태 변경' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateTokenStatusDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 상태 변경 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.UpdateTokenStatusDto !== "undefined" && dto_1.UpdateTokenStatusDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AdminTokensController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)(':id/renew'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 갱신' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.RenewTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 갱신 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_j = typeof dto_1.RenewTokenDto !== "undefined" && dto_1.RenewTokenDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AdminTokensController.prototype, "renewToken", null);
__decorate([
    (0, common_1.Put)(':id/refresh'),
    (0, swagger_1.ApiOperation)({ summary: '리프레시 토큰으로 액세스 토큰 갱신' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '액세스 토큰 갱신 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AdminTokensController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '토큰 삭제' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '토큰 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '토큰 삭제 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AdminTokensController.prototype, "remove", null);
exports.AdminTokensController = AdminTokensController = __decorate([
    (0, swagger_1.ApiTags)('관리자 토큰 API'),
    (0, common_1.Controller)('admin/tokens'),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_usecase_1.AdminTokensUsecase !== "undefined" && admin_usecase_1.AdminTokensUsecase) === "function" ? _a : Object])
], AdminTokensController);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/dto/create-token.dto.ts":
/*!***********************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/dto/create-token.dto.ts ***!
  \***********************************************************************/
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
exports.CreateTokenDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateTokenDto {
}
exports.CreateTokenDto = CreateTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '직원 ID',
        example: '987fcdeb-51a2-43b7-89cd-321654987000',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '사번', example: '24020' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '액세스 토큰 만료 일수', default: 30, minimum: 1, maximum: 365 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    __metadata("design:type", Number)
], CreateTokenDto.prototype, "expiresInDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '리프레시 토큰 만료 일수', default: 90, minimum: 30, maximum: 730 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(730),
    __metadata("design:type", Number)
], CreateTokenDto.prototype, "refreshExpiresInDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '액세스 토큰' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '리프레시 토큰' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '토큰 만료 일시' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateTokenDto.prototype, "tokenExpiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '리프레시 토큰 만료 일시' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateTokenDto.prototype, "refreshTokenExpiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '클라이언트 정보' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "clientInfo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'IP 주소' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTokenDto.prototype, "ipAddress", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/dto/index.ts":
/*!************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/dto/index.ts ***!
  \************************************************************/
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
__exportStar(__webpack_require__(/*! ./create-token.dto */ "./src/modules/application/legacy/tokens/dto/create-token.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./token-response.dto */ "./src/modules/application/legacy/tokens/dto/token-response.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./renew-token.dto */ "./src/modules/application/legacy/tokens/dto/renew-token.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./update-token-status.dto */ "./src/modules/application/legacy/tokens/dto/update-token-status.dto.ts"), exports);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/dto/renew-token.dto.ts":
/*!**********************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/dto/renew-token.dto.ts ***!
  \**********************************************************************/
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
exports.RenewTokenDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RenewTokenDto {
}
exports.RenewTokenDto = RenewTokenDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '액세스 토큰 만료 일수', default: 30, minimum: 1, maximum: 365 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    __metadata("design:type", Number)
], RenewTokenDto.prototype, "expiresInDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '리프레시 토큰 만료 일수', default: 90, minimum: 30, maximum: 730 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(730),
    __metadata("design:type", Number)
], RenewTokenDto.prototype, "refreshExpiresInDays", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/dto/token-response.dto.ts":
/*!*************************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/dto/token-response.dto.ts ***!
  \*************************************************************************/
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
exports.TokenResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class TokenResponseDto {
}
exports.TokenResponseDto = TokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 ID',
        example: '987fcdeb-51a2-43b7-89cd-321654987000',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '액세스 토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '리프레시 토큰',
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 만료 일자',
        example: '2023-12-31T23:59:59Z',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], TokenResponseDto.prototype, "tokenExpiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '리프레시 토큰 만료일',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], TokenResponseDto.prototype, "refreshTokenExpiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '마지막 접근 일자',
        example: '2023-06-15T14:30:00Z',
        required: false,
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], TokenResponseDto.prototype, "lastAccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 활성화 상태',
        example: true,
    }),
    __metadata("design:type", Boolean)
], TokenResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], TokenResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        example: '2023-01-01T00:00:00Z',
    }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], TokenResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 이름',
        example: '홍길동',
        required: false,
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 이메일',
        example: 'user@example.com',
        required: false,
    }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "userEmail", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/dto/update-token-status.dto.ts":
/*!******************************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/dto/update-token-status.dto.ts ***!
  \******************************************************************************/
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
exports.UpdateTokenStatusDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateTokenStatusDto {
}
exports.UpdateTokenStatusDto = UpdateTokenStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '토큰 활성화 상태',
        example: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateTokenStatusDto.prototype, "isActive", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/services/tokens.service.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/services/tokens.service.ts ***!
  \**************************************************************************/
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
exports.TokensService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const token_service_1 = __webpack_require__(/*! ../../../../domain/token/token.service */ "./src/modules/domain/token/token.service.ts");
const employee_token_service_1 = __webpack_require__(/*! ../../../../domain/employee-token/employee-token.service */ "./src/modules/domain/employee-token/employee-token.service.ts");
const users_service_1 = __webpack_require__(/*! ../../users/services/users.service */ "./src/modules/application/legacy/users/services/users.service.ts");
let TokensService = class TokensService {
    constructor(tokenService, employeeTokenService, usersService) {
        this.tokenService = tokenService;
        this.employeeTokenService = employeeTokenService;
        this.usersService = usersService;
    }
    async findAll(options) {
        return this.tokenService.findAll(options);
    }
    async findAllWithEmployee() {
        const tokens = await this.tokenService.findAll();
        const tokensWithEmployee = [];
        for (const token of tokens) {
            try {
                const employee = await this.getEmployeeByToken(token.id);
                tokensWithEmployee.push({
                    ...token,
                    employee: employee,
                });
            }
            catch (error) {
                tokensWithEmployee.push({
                    ...token,
                    employee: null,
                });
            }
        }
        return tokensWithEmployee;
    }
    async findOne(id) {
        return this.tokenService.findOne({ where: { id } });
    }
    async findOneWithEmployee(id) {
        const token = await this.tokenService.findOne({ where: { id } });
        if (!token) {
            throw new common_1.NotFoundException('토큰을 찾을 수 없습니다.');
        }
        try {
            const employee = await this.getEmployeeByToken(token.id);
            return {
                ...token,
                employee: employee,
            };
        }
        catch (error) {
            return {
                ...token,
                employee: null,
            };
        }
    }
    async findByEmployeeId(employeeId) {
        const employeeTokens = await this.employeeTokenService.findByEmployeeId(employeeId);
        const tokens = [];
        for (const employeeToken of employeeTokens) {
            const token = await this.tokenService.findOne({ where: { id: employeeToken.tokenId } });
            if (token) {
                tokens.push(token);
            }
        }
        return tokens;
    }
    async findByAccessToken(accessToken) {
        return this.tokenService.findByAccessToken(accessToken);
    }
    async findByRefreshToken(refreshToken) {
        return this.tokenService.findByRefreshToken(refreshToken);
    }
    async create(createTokenDto) {
        const { employeeId, ...tokenData } = createTokenDto;
        const employee = await this.usersService.findOne(employeeId);
        const tokenCreateData = {
            accessToken: tokenData.accessToken || '',
            refreshToken: tokenData.refreshToken || '',
            tokenExpiresAt: tokenData.tokenExpiresAt || new Date(),
            refreshTokenExpiresAt: tokenData.refreshTokenExpiresAt,
            clientInfo: tokenData.clientInfo,
            ipAddress: tokenData.ipAddress,
        };
        const token = await this.tokenService.create(tokenCreateData);
        await this.employeeTokenService.createOrUpdateRelation(employeeId, token.id, {});
        return token;
    }
    async update(id, updateData) {
        return this.tokenService.update(id, updateData);
    }
    async remove(id) {
        const employeeTokens = await this.employeeTokenService.findByTokenId(id);
        for (const employeeToken of employeeTokens) {
            await this.employeeTokenService.delete(employeeToken.id);
        }
        await this.tokenService.delete(id);
    }
    async removeAllEmployeeTokens(employeeId) {
        const employeeTokens = await this.employeeTokenService.findByEmployeeId(employeeId);
        for (const employeeToken of employeeTokens) {
            await this.tokenService.delete(employeeToken.tokenId);
            await this.employeeTokenService.delete(employeeToken.id);
        }
    }
    async getEmployeeByToken(tokenId) {
        const employeeTokens = await this.employeeTokenService.findByTokenId(tokenId);
        if (employeeTokens.length === 0) {
            throw new common_1.NotFoundException('토큰에 연결된 직원을 찾을 수 없습니다.');
        }
        const employeeToken = employeeTokens[0];
        return this.usersService.findOne(employeeToken.employeeId);
    }
    generateJwtToken(payload, expiresIn) {
        return this.tokenService.generateJwtToken(payload, expiresIn);
    }
    verifyJwtToken(token) {
        return this.tokenService.verifyJwtToken(token);
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof token_service_1.DomainTokenService !== "undefined" && token_service_1.DomainTokenService) === "function" ? _a : Object, typeof (_b = typeof employee_token_service_1.DomainEmployeeTokenService !== "undefined" && employee_token_service_1.DomainEmployeeTokenService) === "function" ? _b : Object, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object])
], TokensService);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/tokens.module.ts":
/*!****************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/tokens.module.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokensModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const tokens_service_1 = __webpack_require__(/*! ./services/tokens.service */ "./src/modules/application/legacy/tokens/services/tokens.service.ts");
const users_module_1 = __webpack_require__(/*! ../users/users.module */ "./src/modules/application/legacy/users/users.module.ts");
const systems_module_1 = __webpack_require__(/*! ../systems/systems.module */ "./src/modules/application/legacy/systems/systems.module.ts");
const admin_tokens_controller_1 = __webpack_require__(/*! ./controllers/admin-tokens.controller */ "./src/modules/application/legacy/tokens/controllers/admin-tokens.controller.ts");
const admin_usecase_1 = __webpack_require__(/*! ./usecases/admin.usecase */ "./src/modules/application/legacy/tokens/usecases/admin.usecase.ts");
const client_usecase_1 = __webpack_require__(/*! ./usecases/client.usecase */ "./src/modules/application/legacy/tokens/usecases/client.usecase.ts");
const token_module_1 = __webpack_require__(/*! ../../../domain/token/token.module */ "./src/modules/domain/token/token.module.ts");
const employee_token_module_1 = __webpack_require__(/*! ../../../domain/employee-token/employee-token.module */ "./src/modules/domain/employee-token/employee-token.module.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let TokensModule = class TokensModule {
};
exports.TokensModule = TokensModule;
exports.TokensModule = TokensModule = __decorate([
    (0, common_1.Module)({
        imports: [
            token_module_1.DomainTokenModule,
            employee_token_module_1.DomainEmployeeTokenModule,
            users_module_1.UsersModule,
            systems_module_1.SystemsModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('GLOBAL_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
        ],
        providers: [tokens_service_1.TokensService, admin_usecase_1.AdminTokensUsecase, client_usecase_1.ClientTokensUsecase],
        controllers: [admin_tokens_controller_1.AdminTokensController],
        exports: [tokens_service_1.TokensService, admin_usecase_1.AdminTokensUsecase, client_usecase_1.ClientTokensUsecase],
    })
], TokensModule);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/usecases/admin.usecase.ts":
/*!*************************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/usecases/admin.usecase.ts ***!
  \*************************************************************************/
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
exports.AdminTokensUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const tokens_service_1 = __webpack_require__(/*! ../services/tokens.service */ "./src/modules/application/legacy/tokens/services/tokens.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const users_service_1 = __webpack_require__(/*! ../../users/services/users.service */ "./src/modules/application/legacy/users/services/users.service.ts");
const JWT_CONSTANTS = {
    DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS: 1,
    DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS: 7,
    MIN_ACCESS_TOKEN_EXPIRES_DAYS: 1,
    MAX_ACCESS_TOKEN_EXPIRES_DAYS: 365,
    MIN_REFRESH_TOKEN_EXPIRES_DAYS: 30,
    MAX_REFRESH_TOKEN_EXPIRES_DAYS: 730,
};
let AdminTokensUsecase = class AdminTokensUsecase {
    constructor(tokensService, jwtService, usersService) {
        this.tokensService = tokensService;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async findAll() {
        return this.tokensService.findAll();
    }
    async findAllWithEmployee() {
        return this.tokensService.findAllWithEmployee();
    }
    async findOne(id) {
        return this.tokensService.findOne(id);
    }
    async findOneWithEmployee(id) {
        return this.tokensService.findOneWithEmployee(id);
    }
    async findByEmployeeId(employeeId) {
        return this.tokensService.findByEmployeeId(employeeId);
    }
    async createToken(createTokenDto) {
        const { employeeId, expiresInDays = JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS, refreshExpiresInDays = JWT_CONSTANTS.DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS, } = createTokenDto;
        const employee = await this.usersService.findOne(employeeId);
        const payload = {
            sub: employeeId,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.tokensService.generateJwtToken(payload, `${expiresInDays}d`);
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.tokensService.generateJwtToken(refreshPayload, `${refreshExpiresInDays}d`);
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, expiresInDays);
        const refreshTokenExpiresAt = this.addDays(now, refreshExpiresInDays);
        return this.tokensService.create({
            employeeId,
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            isActive: true,
        });
    }
    async updateStatus(id, isActive) {
        const token = await this.tokensService.findOne(id);
        return this.tokensService.update(id, {
            ...token,
            isActive,
        });
    }
    async renewToken(id, renewTokenDto) {
        const token = await this.tokensService.findOne(id);
        const employee = await this.tokensService.getEmployeeByToken(id);
        const { expiresInDays = JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS, refreshExpiresInDays = JWT_CONSTANTS.DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS, } = renewTokenDto;
        const payload = {
            sub: employee.id,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.tokensService.generateJwtToken(payload, `${expiresInDays}d`);
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.tokensService.generateJwtToken(refreshPayload, `${refreshExpiresInDays}d`);
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, expiresInDays);
        const refreshTokenExpiresAt = this.addDays(now, refreshExpiresInDays);
        return this.tokensService.update(id, {
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            lastAccess: now,
            isActive: true,
        });
    }
    async refreshTokens(id) {
        const token = await this.tokensService.findOne(id);
        const employee = await this.tokensService.getEmployeeByToken(id);
        if (!token.refreshToken || new Date() > token.refreshTokenExpiresAt) {
            throw new Error('리프레시 토큰이 만료되었습니다.');
        }
        if (!token.isActive) {
            throw new Error('비활성화된 토큰은 갱신할 수 없습니다.');
        }
        const payload = {
            sub: employee.id,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.tokensService.generateJwtToken(payload, `${JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS}d`);
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS);
        return this.tokensService.update(id, {
            accessToken,
            tokenExpiresAt,
            lastAccess: now,
        });
    }
    async remove(id) {
        return this.tokensService.remove(id);
    }
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};
exports.AdminTokensUsecase = AdminTokensUsecase;
exports.AdminTokensUsecase = AdminTokensUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof tokens_service_1.TokensService !== "undefined" && tokens_service_1.TokensService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object])
], AdminTokensUsecase);


/***/ }),

/***/ "./src/modules/application/legacy/tokens/usecases/client.usecase.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/application/legacy/tokens/usecases/client.usecase.ts ***!
  \**************************************************************************/
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
exports.ClientTokensUsecase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const tokens_service_1 = __webpack_require__(/*! ../services/tokens.service */ "./src/modules/application/legacy/tokens/services/tokens.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const users_service_1 = __webpack_require__(/*! ../../users/services/users.service */ "./src/modules/application/legacy/users/services/users.service.ts");
const JWT_CONSTANTS = {
    DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS: 1,
    DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS: 7,
    MIN_ACCESS_TOKEN_EXPIRES_DAYS: 1,
    MAX_ACCESS_TOKEN_EXPIRES_DAYS: 365,
    MIN_REFRESH_TOKEN_EXPIRES_DAYS: 30,
    MAX_REFRESH_TOKEN_EXPIRES_DAYS: 730,
};
let ClientTokensUsecase = class ClientTokensUsecase {
    constructor(tokensService, jwtService, configService, usersService) {
        this.tokensService = tokensService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
    }
    async findAll() {
        return this.tokensService.findAll();
    }
    async findAllWithEmployee() {
        return this.tokensService.findAllWithEmployee();
    }
    async findOne(id) {
        return this.tokensService.findOne(id);
    }
    async findOneWithEmployee(id) {
        return this.tokensService.findOneWithEmployee(id);
    }
    async findByEmployeeId(employeeId) {
        return this.tokensService.findByEmployeeId(employeeId);
    }
    async createToken(createTokenDto) {
        const { employeeId, employeeNumber, expiresInDays = JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS, refreshExpiresInDays = JWT_CONSTANTS.DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS, } = createTokenDto;
        const payload = {
            sub: employeeId,
            employeeNumber,
            type: 'access',
        };
        const accessToken = this.tokensService.generateJwtToken(payload, `${expiresInDays}d`);
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.tokensService.generateJwtToken(refreshPayload, `${refreshExpiresInDays}d`);
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, expiresInDays);
        const refreshTokenExpiresAt = this.addDays(now, refreshExpiresInDays);
        try {
            const existingTokens = await this.tokensService.findByEmployeeId(employeeId);
            if (existingTokens && existingTokens.length > 0) {
                const existingToken = existingTokens[0];
                console.log(`Employee ${employeeId} already has a token, updating existing token ${existingToken.id}`);
                return this.tokensService.update(existingToken.id, {
                    accessToken,
                    refreshToken,
                    tokenExpiresAt,
                    refreshTokenExpiresAt,
                    lastAccess: now,
                    isActive: true,
                });
            }
        }
        catch (error) {
            console.log(`Error checking existing tokens for employee ${employeeId}: ${error.message}`);
        }
        console.log(`Creating new token for employee ${employeeId}`);
        return this.tokensService.create({
            employeeId,
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            isActive: true,
        });
    }
    async updateStatus(id, isActive) {
        const token = await this.tokensService.findOne(id);
        return this.tokensService.update(id, {
            ...token,
            isActive,
        });
    }
    async renewToken(id, renewTokenDto) {
        const token = await this.tokensService.findOne(id);
        const { expiresInDays = JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS, refreshExpiresInDays = JWT_CONSTANTS.DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS, } = renewTokenDto;
        const employee = await this.tokensService.getEmployeeByToken(id);
        const payload = {
            sub: employee.id,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.tokensService.generateJwtToken(payload, `${expiresInDays}d`);
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.tokensService.generateJwtToken(refreshPayload, `${refreshExpiresInDays}d`);
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, expiresInDays);
        const refreshTokenExpiresAt = this.addDays(now, refreshExpiresInDays);
        return this.tokensService.update(id, {
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            lastAccess: now,
            isActive: true,
        });
    }
    async refreshTokens(id) {
        const token = await this.tokensService.findOne(id);
        const employee = await this.tokensService.getEmployeeByToken(id);
        if (!token.refreshToken || new Date() > token.refreshTokenExpiresAt) {
            throw new Error('리프레시 토큰이 만료되었습니다.');
        }
        if (!token.isActive) {
            throw new Error('비활성화된 토큰은 갱신할 수 없습니다.');
        }
        const payload = {
            sub: employee.id,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const accessToken = this.tokensService.generateJwtToken(payload, `${JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS}d`);
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS);
        return this.tokensService.update(id, {
            accessToken,
            tokenExpiresAt,
            lastAccess: now,
        });
    }
    async remove(id) {
        return this.tokensService.remove(id);
    }
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};
exports.ClientTokensUsecase = ClientTokensUsecase;
exports.ClientTokensUsecase = ClientTokensUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof tokens_service_1.TokensService !== "undefined" && tokens_service_1.TokensService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, typeof (_d = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _d : Object])
], ClientTokensUsecase);


/***/ }),

/***/ "./src/modules/application/legacy/users/controllers/admin.controller.ts":
/*!******************************************************************************!*\
  !*** ./src/modules/application/legacy/users/controllers/admin.controller.ts ***!
  \******************************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminUsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const users_service_1 = __webpack_require__(/*! ../services/users.service */ "./src/modules/application/legacy/users/services/users.service.ts");
const user_response_dto_1 = __webpack_require__(/*! ../dto/user-response.dto */ "./src/modules/application/legacy/users/dto/user-response.dto.ts");
const api_response_dto_1 = __webpack_require__(/*! ../../../../../common/dto/api-response.dto */ "./src/common/dto/api-response.dto.ts");
const admin_usecase_1 = __webpack_require__(/*! ../usecases/admin.usecase */ "./src/modules/application/legacy/users/usecases/admin.usecase.ts");
let AdminUsersController = class AdminUsersController {
    constructor(usersService, adminUsecase) {
        this.usersService = usersService;
        this.adminUsecase = adminUsecase;
    }
    async findAll() {
        try {
            const employees = await this.usersService.findAll();
            const userDtos = employees.map((employee) => new user_response_dto_1.UserResponseDto(employee));
            return api_response_dto_1.ApiResponseDto.success(userDtos);
        }
        catch (error) {
            console.error('Error fetching all users:', error);
            return api_response_dto_1.ApiResponseDto.error('USERS_FETCH_ERROR', '사용자 목록을 조회하는 중 오류가 발생했습니다.');
        }
    }
    async search(query) {
        try {
            const users = await this.adminUsecase.searchUsers(query);
            const userDtos = users.map((user) => new user_response_dto_1.UserResponseDto(user));
            return api_response_dto_1.ApiResponseDto.success(userDtos);
        }
        catch (error) {
            console.error(`Error searching users with query ${query}:`, error);
            return api_response_dto_1.ApiResponseDto.error('USERS_SEARCH_ERROR', '사용자 검색 중 오류가 발생했습니다.');
        }
    }
    async findOne(id) {
        try {
            const user = await this.usersService.findOne(id);
            if (!user) {
                return api_response_dto_1.ApiResponseDto.error('USER_NOT_FOUND', '해당 ID의 사용자를 찾을 수 없습니다.');
            }
            return api_response_dto_1.ApiResponseDto.success(new user_response_dto_1.UserResponseDto(user));
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return api_response_dto_1.ApiResponseDto.error('USER_NOT_FOUND', '해당 ID의 사용자를 찾을 수 없습니다.');
            }
            console.error(`Error fetching user with ID ${id}:`, error);
            return api_response_dto_1.ApiResponseDto.error('USER_FETCH_ERROR', '사용자 정보를 조회하는 중 오류가 발생했습니다.');
        }
    }
    async sendInitPassSetMail(body) {
        try {
            await this.adminUsecase.sendInitPassSetMail(body.email);
            return api_response_dto_1.ApiResponseDto.success(null);
        }
        catch (error) {
            console.error(`Error sending init pass set mail to ${body.email}:`, error);
            return api_response_dto_1.ApiResponseDto.error('MAIL_SEND_ERROR', '초기 비밀번호 설정 메일 전송 중 오류가 발생했습니다.');
        }
        finally {
        }
    }
    async sendTempPasswordMail(body) {
        try {
            return api_response_dto_1.ApiResponseDto.success(null);
        }
        catch (error) {
            console.error(`Error sending temp password mail to ${body.email}:`, error);
            return api_response_dto_1.ApiResponseDto.error('MAIL_SEND_ERROR', '임시 비밀번호 발급 메일 전송 중 오류가 발생했습니다.');
        }
        finally {
            this.adminUsecase.sendTempPasswordMail(body.email);
        }
    }
};
exports.AdminUsersController = AdminUsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '사용자 목록 조회', description: '등록된 모든 사용자 목록을 조회합니다.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '사용자 목록 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AdminUsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: '사용자 검색', description: '검색 조건에 맞는 사용자 목록을 조회합니다.' }),
    (0, swagger_1.ApiQuery)({ name: 'query', description: '검색어 (이름, 이메일, 직원번호, 부서, 직책 등)', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '사용자 검색 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AdminUsersController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '사용자 상세 조회', description: '특정 ID의 사용자 정보를 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '사용자 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '사용자 상세 조회 성공',
        type: api_response_dto_1.ApiResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '사용자를 찾을 수 없음',
        type: api_response_dto_1.ApiResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AdminUsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('send-init-pass-set-mail'),
    (0, swagger_1.ApiOperation)({ summary: '초기 비밀번호 설정 메일 전송', description: '초기 비밀번호 설정 메일을 전송합니다.' }),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', properties: { email: { type: 'string' } } } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AdminUsersController.prototype, "sendInitPassSetMail", null);
__decorate([
    (0, common_1.Post)('send-temp-password-mail'),
    (0, swagger_1.ApiOperation)({ summary: '임시 비밀번호 발급 메일 전송', description: '임시 비밀번호 발급 메일을 전송합니다.' }),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', properties: { email: { type: 'string' } } } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AdminUsersController.prototype, "sendTempPasswordMail", null);
exports.AdminUsersController = AdminUsersController = __decorate([
    (0, swagger_1.ApiTags)('관리자 사용자 API'),
    (0, common_1.Controller)('admin/users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof admin_usecase_1.AdminUsecase !== "undefined" && admin_usecase_1.AdminUsecase) === "function" ? _b : Object])
], AdminUsersController);


/***/ }),

/***/ "./src/modules/application/legacy/users/dto/index.ts":
/*!***********************************************************!*\
  !*** ./src/modules/application/legacy/users/dto/index.ts ***!
  \***********************************************************/
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
__exportStar(__webpack_require__(/*! ./user-response.dto */ "./src/modules/application/legacy/users/dto/user-response.dto.ts"), exports);


/***/ }),

/***/ "./src/modules/application/legacy/users/dto/user-response.dto.ts":
/*!***********************************************************************!*\
  !*** ./src/modules/application/legacy/users/dto/user-response.dto.ts ***!
  \***********************************************************************/
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
exports.UserResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UserResponseDto {
    constructor(employee) {
        this.id = employee.id;
        this.employeeNumber = employee.employeeNumber;
        this.name = employee.name;
        this.email = employee.email;
        this.phoneNumber = employee.phoneNumber;
        this.dateOfBirth = employee.dateOfBirth ? String(employee.dateOfBirth).split('T')[0] : undefined;
        this.gender = employee.gender ? employee.gender.toString() : undefined;
        this.hireDate = employee.hireDate ? String(employee.hireDate).split('T')[0] : undefined;
        this.status = employee.status ? employee.status.toString() : undefined;
        this.rank = employee.currentRank?.rankName || undefined;
        this.department = employee.departmentPositions?.[0]?.department?.departmentName || undefined;
        this.position = employee.departmentPositions?.[0]?.position?.positionTitle || undefined;
        this.createdAt = String(employee.createdAt).split('T')[0] || String(employee.createdAt);
        this.updatedAt = String(employee.updatedAt).split('T')[0] || String(employee.updatedAt);
        this.isInitialPasswordSet = employee.isInitialPasswordSet;
    }
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 ID' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 번호' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "employeeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이름' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생년월일', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입사일', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '재직 상태', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '현재 직급', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서명', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직위명', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성일' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수정일' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '초기 비밀번호 설정 여부', required: false }),
    __metadata("design:type", Boolean)
], UserResponseDto.prototype, "isInitialPasswordSet", void 0);


/***/ }),

/***/ "./src/modules/application/legacy/users/services/users.service.ts":
/*!************************************************************************!*\
  !*** ./src/modules/application/legacy/users/services/users.service.ts ***!
  \************************************************************************/
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
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_service_1 = __webpack_require__(/*! ../../../../domain/employee/employee.service */ "./src/modules/domain/employee/employee.service.ts");
const department_service_1 = __webpack_require__(/*! ../../../../domain/department/department.service */ "./src/modules/domain/department/department.service.ts");
const position_service_1 = __webpack_require__(/*! ../../../../domain/position/position.service */ "./src/modules/domain/position/position.service.ts");
const rank_service_1 = __webpack_require__(/*! ../../../../domain/rank/rank.service */ "./src/modules/domain/rank/rank.service.ts");
const employee_department_position_service_1 = __webpack_require__(/*! ../../../../domain/employee-department-position/employee-department-position.service */ "./src/modules/domain/employee-department-position/employee-department-position.service.ts");
let UsersService = class UsersService {
    constructor(employeeService, departmentService, positionService, rankService, employeeDepartmentPositionService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.rankService = rankService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
    }
    async findAll(options) {
        const enhancedOptions = {
            ...options,
            relations: [
                'currentRank',
                'departmentPositions',
                'departmentPositions.department',
                'departmentPositions.position',
                ...(options?.relations || []),
            ],
        };
        return this.employeeService.findAll(enhancedOptions);
    }
    async findOne(id) {
        const options = {
            where: { id },
            relations: [
                'currentRank',
                'departmentPositions',
                'departmentPositions.department',
                'departmentPositions.position',
            ],
        };
        return this.employeeService.findOne(options);
    }
    async findByEmployeeNumber(employeeNumber) {
        return this.employeeService.findByEmployeeNumber(employeeNumber);
    }
    async findByEmail(email) {
        return this.employeeService.findByEmail(email);
    }
    hashPassword(password = '1234') {
        return this.employeeService.hashPassword(password);
    }
    async createEmployee(employeeData) {
        if (!employeeData.password) {
            employeeData.password = this.hashPassword();
        }
        return this.employeeService.create(employeeData);
    }
    async save(employee) {
        return this.employeeService.save(employee);
    }
    async bulkSave(employees) {
        return this.employeeService.bulkSave(employees);
    }
    async update(id, employeeData) {
        if (employeeData.password) {
            employeeData.password = this.hashPassword(employeeData.password);
        }
        return this.employeeService.update(id, employeeData);
    }
    async remove(id) {
        await this.employeeService.delete(id);
    }
    async getEmployeeWithDepartmentPosition(employeeId) {
        const employee = await this.findOne(employeeId);
        const departmentPositions = await this.employeeDepartmentPositionService.findByEmployeeId(employeeId);
        return {
            employee,
            departmentPositions,
        };
    }
    async verifyPassword(password, employee) {
        return this.employeeService.verifyPassword(password, employee);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object, typeof (_b = typeof department_service_1.DomainDepartmentService !== "undefined" && department_service_1.DomainDepartmentService) === "function" ? _b : Object, typeof (_c = typeof position_service_1.DomainPositionService !== "undefined" && position_service_1.DomainPositionService) === "function" ? _c : Object, typeof (_d = typeof rank_service_1.DomainRankService !== "undefined" && rank_service_1.DomainRankService) === "function" ? _d : Object, typeof (_e = typeof employee_department_position_service_1.DomainEmployeeDepartmentPositionService !== "undefined" && employee_department_position_service_1.DomainEmployeeDepartmentPositionService) === "function" ? _e : Object])
], UsersService);


/***/ }),

/***/ "./src/modules/application/legacy/users/usecases/admin.usecase.ts":
/*!************************************************************************!*\
  !*** ./src/modules/application/legacy/users/usecases/admin.usecase.ts ***!
  \************************************************************************/
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
exports.AdminUsecase = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const users_service_1 = __webpack_require__(/*! ../services/users.service */ "./src/modules/application/legacy/users/services/users.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const mail_service_1 = __webpack_require__(/*! ../../mail/mail.service */ "./src/modules/application/legacy/mail/mail.service.ts");
let AdminUsecase = class AdminUsecase {
    constructor(usersService, jwtService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async searchUsers(query) {
        if (!query) {
            return this.usersService.findAll();
        }
        const searchConditions = {
            where: [
                { name: (0, typeorm_1.Like)(`%${query}%`) },
                { email: (0, typeorm_1.Like)(`%${query}%`) },
                { employeeNumber: (0, typeorm_1.Like)(`%${query}%`) },
            ],
            relations: ['currentRank'],
        };
        return this.usersService.findAll(searchConditions);
    }
    async sendInitPassSetMail(email) {
        const employee = await this.usersService.findByEmail(email);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        if (employee.email !== email) {
            throw new common_1.NotFoundException('Employee not found');
        }
        const payload = {
            sub: employee.id,
            employeeNumber: employee.employeeNumber,
            type: 'access',
        };
        const token = this.jwtService.sign(payload, {
            expiresIn: '1d',
            secret: process.env.GLOBAL_SECRET,
        });
        const mail = await this.mailService.sendEmail({
            recipients: [employee.email],
            subject: '[Lumir Backoffice] 초기 비밀번호 설정 안내',
            template: 'initial-password',
            context: {
                name: employee.name,
                resetUrl: `${process.env.APP_URL}/set-initial-password?token=${token}`,
                expiresIn: '1d',
            },
        });
        console.log(mail);
        await this.usersService.save(employee);
        return mail;
    }
    async sendTempPasswordMail(email) {
        const employee = await this.usersService.findByEmail(email);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        if (employee.email !== email) {
            throw new common_1.NotFoundException('Employee not found');
        }
        const tempPassword = Math.random().toString(36).substring(2, 15);
        const hashedPassword = this.usersService.hashPassword(tempPassword);
        employee.password = hashedPassword;
        await this.usersService.save(employee);
        const mail = await this.mailService.sendEmail({
            recipients: [employee.email],
            subject: '[Lumir Backoffice] 임시 비밀번호 발급',
            template: 'temp-password',
            context: {
                name: employee.name,
                tempPassword: tempPassword,
            },
        });
        console.log(mail);
        return mail;
    }
};
exports.AdminUsecase = AdminUsecase;
exports.AdminUsecase = AdminUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _c : Object])
], AdminUsecase);


/***/ }),

/***/ "./src/modules/application/legacy/users/users.module.ts":
/*!**************************************************************!*\
  !*** ./src/modules/application/legacy/users/users.module.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./services/users.service */ "./src/modules/application/legacy/users/services/users.service.ts");
const admin_controller_1 = __webpack_require__(/*! ./controllers/admin.controller */ "./src/modules/application/legacy/users/controllers/admin.controller.ts");
const admin_usecase_1 = __webpack_require__(/*! ./usecases/admin.usecase */ "./src/modules/application/legacy/users/usecases/admin.usecase.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const mail_module_1 = __webpack_require__(/*! ../mail/mail.module */ "./src/modules/application/legacy/mail/mail.module.ts");
const employee_module_1 = __webpack_require__(/*! ../../../domain/employee/employee.module */ "./src/modules/domain/employee/employee.module.ts");
const department_module_1 = __webpack_require__(/*! ../../../domain/department/department.module */ "./src/modules/domain/department/department.module.ts");
const position_module_1 = __webpack_require__(/*! ../../../domain/position/position.module */ "./src/modules/domain/position/position.module.ts");
const rank_module_1 = __webpack_require__(/*! ../../../domain/rank/rank.module */ "./src/modules/domain/rank/rank.module.ts");
const employee_department_position_module_1 = __webpack_require__(/*! ../../../domain/employee-department-position/employee-department-position.module */ "./src/modules/domain/employee-department-position/employee-department-position.module.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mail_module_1.MailModule,
            jwt_1.JwtModule.register({}),
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            rank_module_1.DomainRankModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
            mail_module_1.MailModule,
        ],
        providers: [users_service_1.UsersService, admin_usecase_1.AdminUsecase],
        controllers: [admin_controller_1.AdminUsersController],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),

/***/ "./src/modules/application/single-sign-on/controllers/sso-application.controller.ts":
/*!******************************************************************************************!*\
  !*** ./src/modules/application/single-sign-on/controllers/sso-application.controller.ts ***!
  \******************************************************************************************/
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
exports.SsoApplicationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const sso_application_service_1 = __webpack_require__(/*! ../sso-application.service */ "./src/modules/application/single-sign-on/sso-application.service.ts");
const dto_1 = __webpack_require__(/*! ../dto */ "./src/modules/application/single-sign-on/dto/index.ts");
let SsoApplicationController = class SsoApplicationController {
    constructor(ssoApplicationService) {
        this.ssoApplicationService = ssoApplicationService;
    }
    async login(authHeader, body) {
        const result = await this.ssoApplicationService.login(authHeader, body);
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
};
exports.SsoApplicationController = SsoApplicationController;
__decorate([
    (0, swagger_1.ApiBasicAuth)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '로그인 및 토큰 발급',
        description: '외부 시스템이 Basic Auth로 인증한 후, 사용자 이메일/비밀번호를 검증하고 액세스 토큰을 발급합니다.',
    }),
    (0, swagger_1.ApiHeader)({
        name: 'basic-auth',
        description: 'Basic Auth 헤더, 형식: Basic base64(clientId:clientSecret)',
        required: false,
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
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof dto_1.LoginRequestDto !== "undefined" && dto_1.LoginRequestDto) === "function" ? _b : Object]),
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
exports.SsoApplicationController = SsoApplicationController = __decorate([
    (0, swagger_1.ApiTags)('외부 시스템 인증 API'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof sso_application_service_1.SsoApplicationService !== "undefined" && sso_application_service_1.SsoApplicationService) === "function" ? _a : Object])
], SsoApplicationController);


/***/ }),

/***/ "./src/modules/application/single-sign-on/dto/change-password.dto.ts":
/*!***************************************************************************!*\
  !*** ./src/modules/application/single-sign-on/dto/change-password.dto.ts ***!
  \***************************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/modules/application/single-sign-on/dto/check-password.dto.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/application/single-sign-on/dto/check-password.dto.ts ***!
  \**************************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/modules/application/single-sign-on/dto/index.ts":
/*!*************************************************************!*\
  !*** ./src/modules/application/single-sign-on/dto/index.ts ***!
  \*************************************************************/
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
__exportStar(__webpack_require__(/*! ./login-request.dto */ "./src/modules/application/single-sign-on/dto/login-request.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./login-response.dto */ "./src/modules/application/single-sign-on/dto/login-response.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./token-verify-response.dto */ "./src/modules/application/single-sign-on/dto/token-verify-response.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./change-password.dto */ "./src/modules/application/single-sign-on/dto/change-password.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./check-password.dto */ "./src/modules/application/single-sign-on/dto/check-password.dto.ts"), exports);


/***/ }),

/***/ "./src/modules/application/single-sign-on/dto/login-request.dto.ts":
/*!*************************************************************************!*\
  !*** ./src/modules/application/single-sign-on/dto/login-request.dto.ts ***!
  \*************************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
        example: 'user@example.com',
    }),
    (0, class_validator_1.ValidateIf)((obj) => obj.grant_type === GrantType.PASSWORD),
    (0, class_validator_1.IsEmail)({}, { message: '유효한 이메일 주소를 입력해주세요.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사용자 비밀번호 (grant_type이 password인 경우에만 필요)',
        example: 'password123',
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

/***/ "./src/modules/application/single-sign-on/dto/login-response.dto.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/application/single-sign-on/dto/login-response.dto.ts ***!
  \**************************************************************************/
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
exports.LoginResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
    (0, swagger_1.ApiProperty)({ description: '시스템명' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "system", void 0);


/***/ }),

/***/ "./src/modules/application/single-sign-on/dto/token-verify-response.dto.ts":
/*!*********************************************************************************!*\
  !*** ./src/modules/application/single-sign-on/dto/token-verify-response.dto.ts ***!
  \*********************************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/modules/application/single-sign-on/sso-application.module.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/application/single-sign-on/sso-application.module.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SsoApplicationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sso_application_service_1 = __webpack_require__(/*! ./sso-application.service */ "./src/modules/application/single-sign-on/sso-application.service.ts");
const sso_application_controller_1 = __webpack_require__(/*! ./controllers/sso-application.controller */ "./src/modules/application/single-sign-on/controllers/sso-application.controller.ts");
const authorization_context_module_1 = __webpack_require__(/*! ../../context/authorization/authorization-context.module */ "./src/modules/context/authorization/authorization-context.module.ts");
const system_management_context_module_1 = __webpack_require__(/*! ../../context/system-management/system-management-context.module */ "./src/modules/context/system-management/system-management-context.module.ts");
const organization_management_context_module_1 = __webpack_require__(/*! ../../context/organization-management/organization-management-context.module */ "./src/modules/context/organization-management/organization-management-context.module.ts");
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

/***/ "./src/modules/application/single-sign-on/sso-application.service.ts":
/*!***************************************************************************!*\
  !*** ./src/modules/application/single-sign-on/sso-application.service.ts ***!
  \***************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const authorization_context_service_1 = __webpack_require__(/*! ../../context/authorization/authorization-context.service */ "./src/modules/context/authorization/authorization-context.service.ts");
const system_management_context_service_1 = __webpack_require__(/*! ../../context/system-management/system-management-context.service */ "./src/modules/context/system-management/system-management-context.service.ts");
const organization_management_context_service_1 = __webpack_require__(/*! ../../context/organization-management/organization-management-context.service */ "./src/modules/context/organization-management/organization-management-context.service.ts");
let SsoApplicationService = class SsoApplicationService {
    constructor(authorizationContextService, systemManagementContextService, organizationContextService) {
        this.authorizationContextService = authorizationContextService;
        this.systemManagementContextService = systemManagementContextService;
        this.organizationContextService = organizationContextService;
    }
    async login(authHeader, body) {
        const result = this.BASIC_헤더_파싱하기(authHeader);
        if (!result) {
            throw new common_1.UnauthorizedException('유효하지 않은 인증정보입니다.');
        }
        const { clientId, clientSecret } = result;
        const system = await this.authorizationContextService.시스템을_인증한다(clientId, clientSecret);
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
        const token = await this.authorizationContextService.토큰정보를_생성한다(employee);
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
            department: department?.departmentName || '',
            position: position?.positionTitle || '',
            rank: rank?.rankName || '',
            system: system.name,
        };
    }
    async verifyToken(authHeader) {
        const result = this.BEARER_헤더_파싱하기(authHeader);
        if (!result) {
            throw new common_1.UnauthorizedException('유효하지 않은 인증정보입니다.');
        }
        const { accessToken } = result;
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
};
exports.SsoApplicationService = SsoApplicationService;
exports.SsoApplicationService = SsoApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof authorization_context_service_1.AuthorizationContextService !== "undefined" && authorization_context_service_1.AuthorizationContextService) === "function" ? _a : Object, typeof (_b = typeof system_management_context_service_1.SystemManagementContextService !== "undefined" && system_management_context_service_1.SystemManagementContextService) === "function" ? _b : Object, typeof (_c = typeof organization_management_context_service_1.OrganizationContextService !== "undefined" && organization_management_context_service_1.OrganizationContextService) === "function" ? _c : Object])
], SsoApplicationService);


/***/ }),

/***/ "./src/modules/context/authorization/authorization-context.module.ts":
/*!***************************************************************************!*\
  !*** ./src/modules/context/authorization/authorization-context.module.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthorizationContextModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const authorization_context_service_1 = __webpack_require__(/*! ./authorization-context.service */ "./src/modules/context/authorization/authorization-context.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const employee_module_1 = __webpack_require__(/*! ../../domain/employee/employee.module */ "./src/modules/domain/employee/employee.module.ts");
const token_module_1 = __webpack_require__(/*! ../../domain/token/token.module */ "./src/modules/domain/token/token.module.ts");
const system_module_1 = __webpack_require__(/*! ../../domain/system/system.module */ "./src/modules/domain/system/system.module.ts");
const employee_token_module_1 = __webpack_require__(/*! ../../domain/employee-token/employee-token.module */ "./src/modules/domain/employee-token/employee-token.module.ts");
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

/***/ "./src/modules/context/authorization/authorization-context.service.ts":
/*!****************************************************************************!*\
  !*** ./src/modules/context/authorization/authorization-context.service.ts ***!
  \****************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_service_1 = __webpack_require__(/*! ../../domain/employee/employee.service */ "./src/modules/domain/employee/employee.service.ts");
const token_service_1 = __webpack_require__(/*! ../../domain/token/token.service */ "./src/modules/domain/token/token.service.ts");
const system_service_1 = __webpack_require__(/*! ../../domain/system/system.service */ "./src/modules/domain/system/system.service.ts");
const employee_token_service_1 = __webpack_require__(/*! ../../domain/employee-token/employee-token.service */ "./src/modules/domain/employee-token/employee-token.service.ts");
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
        return { employee, token };
    }
    async 리프레시토큰을_검증한다(refresh_token) {
        const token = await this.토큰서비스.findByRefreshToken(refresh_token);
        if (new Date() > token.refreshTokenExpiresAt) {
            throw new common_1.UnauthorizedException('만료된 리프레시 토큰입니다.');
        }
        const payload = this.토큰서비스.verifyJwtToken(refresh_token);
        const employee = await this.직원서비스.findByEmployeeId(payload.sub);
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
        const existingTokens = await this.직원토큰서비스.findByEmployeeId(employee.id);
        if (existingTokens && existingTokens.length > 0) {
            const existingToken = existingTokens[0];
            return await this.토큰서비스.update(existingToken.tokenId, {
                accessToken,
                refreshToken,
                tokenExpiresAt,
                refreshTokenExpiresAt,
            });
        }
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
};
exports.AuthorizationContextService = AuthorizationContextService;
exports.AuthorizationContextService = AuthorizationContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object, typeof (_b = typeof token_service_1.DomainTokenService !== "undefined" && token_service_1.DomainTokenService) === "function" ? _b : Object, typeof (_c = typeof system_service_1.DomainSystemService !== "undefined" && system_service_1.DomainSystemService) === "function" ? _c : Object, typeof (_d = typeof employee_token_service_1.DomainEmployeeTokenService !== "undefined" && employee_token_service_1.DomainEmployeeTokenService) === "function" ? _d : Object])
], AuthorizationContextService);


/***/ }),

/***/ "./src/modules/context/organization-management/organization-management-context.module.ts":
/*!***********************************************************************************************!*\
  !*** ./src/modules/context/organization-management/organization-management-context.module.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationManagementContextModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const organization_management_context_service_1 = __webpack_require__(/*! ./organization-management-context.service */ "./src/modules/context/organization-management/organization-management-context.service.ts");
const employee_module_1 = __webpack_require__(/*! ../../domain/employee/employee.module */ "./src/modules/domain/employee/employee.module.ts");
const department_module_1 = __webpack_require__(/*! ../../domain/department/department.module */ "./src/modules/domain/department/department.module.ts");
const position_module_1 = __webpack_require__(/*! ../../domain/position/position.module */ "./src/modules/domain/position/position.module.ts");
const rank_module_1 = __webpack_require__(/*! ../../domain/rank/rank.module */ "./src/modules/domain/rank/rank.module.ts");
const employee_department_position_module_1 = __webpack_require__(/*! ../../domain/employee-department-position/employee-department-position.module */ "./src/modules/domain/employee-department-position/employee-department-position.module.ts");
const employee_rank_history_module_1 = __webpack_require__(/*! ../../domain/employee-rank-history/employee-rank-history.module */ "./src/modules/domain/employee-rank-history/employee-rank-history.module.ts");
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
        providers: [organization_management_context_service_1.OrganizationContextService],
        exports: [organization_management_context_service_1.OrganizationContextService],
    })
], OrganizationManagementContextModule);


/***/ }),

/***/ "./src/modules/context/organization-management/organization-management-context.service.ts":
/*!************************************************************************************************!*\
  !*** ./src/modules/context/organization-management/organization-management-context.service.ts ***!
  \************************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_service_1 = __webpack_require__(/*! ../../domain/employee/employee.service */ "./src/modules/domain/employee/employee.service.ts");
const department_service_1 = __webpack_require__(/*! ../../domain/department/department.service */ "./src/modules/domain/department/department.service.ts");
const position_service_1 = __webpack_require__(/*! ../../domain/position/position.service */ "./src/modules/domain/position/position.service.ts");
const rank_service_1 = __webpack_require__(/*! ../../domain/rank/rank.service */ "./src/modules/domain/rank/rank.service.ts");
const employee_department_position_service_1 = __webpack_require__(/*! ../../domain/employee-department-position/employee-department-position.service */ "./src/modules/domain/employee-department-position/employee-department-position.service.ts");
const employee_rank_history_service_1 = __webpack_require__(/*! ../../domain/employee-rank-history/employee-rank-history.service */ "./src/modules/domain/employee-rank-history/employee-rank-history.service.ts");
let OrganizationContextService = class OrganizationContextService {
    constructor(직원서비스, 부서서비스, 직책서비스, 직급서비스, 직원부서직책서비스, 직원직급이력서비스) {
        this.직원서비스 = 직원서비스;
        this.부서서비스 = 부서서비스;
        this.직책서비스 = 직책서비스;
        this.직급서비스 = 직급서비스;
        this.직원부서직책서비스 = 직원부서직책서비스;
        this.직원직급이력서비스 = 직원직급이력서비스;
    }
    async 직원의_부서_직책_직급을_조회한다(employee) {
        const 부서직책정보 = await this.직원부서직책서비스.findByEmployeeId(employee.id);
        const department = await this.부서서비스.findById(부서직책정보.departmentId);
        const position = await this.직책서비스.findById(부서직책정보.positionId);
        const rank = await this.직급서비스.findById(employee.currentRankId);
        return { department, position, rank };
    }
};
exports.OrganizationContextService = OrganizationContextService;
exports.OrganizationContextService = OrganizationContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _a : Object, typeof (_b = typeof department_service_1.DomainDepartmentService !== "undefined" && department_service_1.DomainDepartmentService) === "function" ? _b : Object, typeof (_c = typeof position_service_1.DomainPositionService !== "undefined" && position_service_1.DomainPositionService) === "function" ? _c : Object, typeof (_d = typeof rank_service_1.DomainRankService !== "undefined" && rank_service_1.DomainRankService) === "function" ? _d : Object, typeof (_e = typeof employee_department_position_service_1.DomainEmployeeDepartmentPositionService !== "undefined" && employee_department_position_service_1.DomainEmployeeDepartmentPositionService) === "function" ? _e : Object, typeof (_f = typeof employee_rank_history_service_1.DomainEmployeeRankHistoryService !== "undefined" && employee_rank_history_service_1.DomainEmployeeRankHistoryService) === "function" ? _f : Object])
], OrganizationContextService);


/***/ }),

/***/ "./src/modules/context/system-management/system-management-context.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/modules/context/system-management/system-management-context.module.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemManagementContextModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const system_management_context_service_1 = __webpack_require__(/*! ./system-management-context.service */ "./src/modules/context/system-management/system-management-context.service.ts");
const system_module_1 = __webpack_require__(/*! ../../domain/system/system.module */ "./src/modules/domain/system/system.module.ts");
const webhook_module_1 = __webpack_require__(/*! ../../domain/webhook/webhook.module */ "./src/modules/domain/webhook/webhook.module.ts");
const webhook_event_log_module_1 = __webpack_require__(/*! ../../domain/webhook-event-log/webhook-event-log.module */ "./src/modules/domain/webhook-event-log/webhook-event-log.module.ts");
const system_webhook_module_1 = __webpack_require__(/*! ../../domain/system-webhook/system-webhook.module */ "./src/modules/domain/system-webhook/system-webhook.module.ts");
let SystemManagementContextModule = class SystemManagementContextModule {
};
exports.SystemManagementContextModule = SystemManagementContextModule;
exports.SystemManagementContextModule = SystemManagementContextModule = __decorate([
    (0, common_1.Module)({
        imports: [system_module_1.DomainSystemModule, webhook_module_1.DomainWebhookModule, webhook_event_log_module_1.DomainWebhookEventLogModule, system_webhook_module_1.DomainSystemWebhookModule],
        providers: [system_management_context_service_1.SystemManagementContextService],
        exports: [system_management_context_service_1.SystemManagementContextService],
    })
], SystemManagementContextModule);


/***/ }),

/***/ "./src/modules/context/system-management/system-management-context.service.ts":
/*!************************************************************************************!*\
  !*** ./src/modules/context/system-management/system-management-context.service.ts ***!
  \************************************************************************************/
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
exports.SystemManagementContextService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const system_service_1 = __webpack_require__(/*! ../../domain/system/system.service */ "./src/modules/domain/system/system.service.ts");
const webhook_service_1 = __webpack_require__(/*! ../../domain/webhook/webhook.service */ "./src/modules/domain/webhook/webhook.service.ts");
const webhook_event_log_service_1 = __webpack_require__(/*! ../../domain/webhook-event-log/webhook-event-log.service */ "./src/modules/domain/webhook-event-log/webhook-event-log.service.ts");
const system_webhook_service_1 = __webpack_require__(/*! ../../domain/system-webhook/system-webhook.service */ "./src/modules/domain/system-webhook/system-webhook.service.ts");
let SystemManagementContextService = class SystemManagementContextService {
    constructor(시스템서비스, 웹훅서비스, 웹훅이벤트로그서비스, 시스템웹훅서비스) {
        this.시스템서비스 = 시스템서비스;
        this.웹훅서비스 = 웹훅서비스;
        this.웹훅이벤트로그서비스 = 웹훅이벤트로그서비스;
        this.시스템웹훅서비스 = 시스템웹훅서비스;
    }
};
exports.SystemManagementContextService = SystemManagementContextService;
exports.SystemManagementContextService = SystemManagementContextService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof system_service_1.DomainSystemService !== "undefined" && system_service_1.DomainSystemService) === "function" ? _a : Object, typeof (_b = typeof webhook_service_1.DomainWebhookService !== "undefined" && webhook_service_1.DomainWebhookService) === "function" ? _b : Object, typeof (_c = typeof webhook_event_log_service_1.DomainWebhookEventLogService !== "undefined" && webhook_event_log_service_1.DomainWebhookEventLogService) === "function" ? _c : Object, typeof (_d = typeof system_webhook_service_1.DomainSystemWebhookService !== "undefined" && system_webhook_service_1.DomainSystemWebhookService) === "function" ? _d : Object])
], SystemManagementContextService);


/***/ }),

/***/ "./src/modules/domain/department/department.module.ts":
/*!************************************************************!*\
  !*** ./src/modules/domain/department/department.module.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainDepartmentModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const department_service_1 = __webpack_require__(/*! ./department.service */ "./src/modules/domain/department/department.service.ts");
const department_repository_1 = __webpack_require__(/*! ./department.repository */ "./src/modules/domain/department/department.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainDepartmentModule = class DomainDepartmentModule {
};
exports.DomainDepartmentModule = DomainDepartmentModule;
exports.DomainDepartmentModule = DomainDepartmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Department])],
        providers: [department_service_1.DomainDepartmentService, department_repository_1.DomainDepartmentRepository],
        exports: [department_service_1.DomainDepartmentService],
    })
], DomainDepartmentModule);


/***/ }),

/***/ "./src/modules/domain/department/department.repository.ts":
/*!****************************************************************!*\
  !*** ./src/modules/domain/department/department.repository.ts ***!
  \****************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/department/department.service.ts":
/*!*************************************************************!*\
  !*** ./src/modules/domain/department/department.service.ts ***!
  \*************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const department_repository_1 = __webpack_require__(/*! ./department.repository */ "./src/modules/domain/department/department.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
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
};
exports.DomainDepartmentService = DomainDepartmentService;
exports.DomainDepartmentService = DomainDepartmentService = DomainDepartmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof department_repository_1.DomainDepartmentRepository !== "undefined" && department_repository_1.DomainDepartmentRepository) === "function" ? _a : Object])
], DomainDepartmentService);


/***/ }),

/***/ "./src/modules/domain/employee-department-position/employee-department-position.module.ts":
/*!************************************************************************************************!*\
  !*** ./src/modules/domain/employee-department-position/employee-department-position.module.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeDepartmentPositionModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const employee_department_position_service_1 = __webpack_require__(/*! ./employee-department-position.service */ "./src/modules/domain/employee-department-position/employee-department-position.service.ts");
const employee_department_position_repository_1 = __webpack_require__(/*! ./employee-department-position.repository */ "./src/modules/domain/employee-department-position/employee-department-position.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainEmployeeDepartmentPositionModule = class DomainEmployeeDepartmentPositionModule {
};
exports.DomainEmployeeDepartmentPositionModule = DomainEmployeeDepartmentPositionModule;
exports.DomainEmployeeDepartmentPositionModule = DomainEmployeeDepartmentPositionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.EmployeeDepartmentPosition])],
        providers: [employee_department_position_service_1.DomainEmployeeDepartmentPositionService, employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository],
        exports: [employee_department_position_service_1.DomainEmployeeDepartmentPositionService],
    })
], DomainEmployeeDepartmentPositionModule);


/***/ }),

/***/ "./src/modules/domain/employee-department-position/employee-department-position.repository.ts":
/*!****************************************************************************************************!*\
  !*** ./src/modules/domain/employee-department-position/employee-department-position.repository.ts ***!
  \****************************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/employee-department-position/employee-department-position.service.ts":
/*!*************************************************************************************************!*\
  !*** ./src/modules/domain/employee-department-position/employee-department-position.service.ts ***!
  \*************************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_department_position_repository_1 = __webpack_require__(/*! ./employee-department-position.repository */ "./src/modules/domain/employee-department-position/employee-department-position.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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
    async findByDepartmentId(departmentId) {
        return this.employeeDepartmentPositionRepository.findAll({
            where: { departmentId },
            order: { createdAt: 'DESC' },
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
};
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService;
exports.DomainEmployeeDepartmentPositionService = DomainEmployeeDepartmentPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository !== "undefined" && employee_department_position_repository_1.DomainEmployeeDepartmentPositionRepository) === "function" ? _a : Object])
], DomainEmployeeDepartmentPositionService);


/***/ }),

/***/ "./src/modules/domain/employee-rank-history/employee-rank-history.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/modules/domain/employee-rank-history/employee-rank-history.module.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeRankHistoryModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const employee_rank_history_service_1 = __webpack_require__(/*! ./employee-rank-history.service */ "./src/modules/domain/employee-rank-history/employee-rank-history.service.ts");
const employee_rank_history_repository_1 = __webpack_require__(/*! ./employee-rank-history.repository */ "./src/modules/domain/employee-rank-history/employee-rank-history.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainEmployeeRankHistoryModule = class DomainEmployeeRankHistoryModule {
};
exports.DomainEmployeeRankHistoryModule = DomainEmployeeRankHistoryModule;
exports.DomainEmployeeRankHistoryModule = DomainEmployeeRankHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.EmployeeRankHistory])],
        providers: [employee_rank_history_service_1.DomainEmployeeRankHistoryService, employee_rank_history_repository_1.DomainEmployeeRankHistoryRepository],
        exports: [employee_rank_history_service_1.DomainEmployeeRankHistoryService],
    })
], DomainEmployeeRankHistoryModule);


/***/ }),

/***/ "./src/modules/domain/employee-rank-history/employee-rank-history.repository.ts":
/*!**************************************************************************************!*\
  !*** ./src/modules/domain/employee-rank-history/employee-rank-history.repository.ts ***!
  \**************************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/employee-rank-history/employee-rank-history.service.ts":
/*!***********************************************************************************!*\
  !*** ./src/modules/domain/employee-rank-history/employee-rank-history.service.ts ***!
  \***********************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_rank_history_repository_1 = __webpack_require__(/*! ./employee-rank-history.repository */ "./src/modules/domain/employee-rank-history/employee-rank-history.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
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
};
exports.DomainEmployeeRankHistoryService = DomainEmployeeRankHistoryService;
exports.DomainEmployeeRankHistoryService = DomainEmployeeRankHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_rank_history_repository_1.DomainEmployeeRankHistoryRepository !== "undefined" && employee_rank_history_repository_1.DomainEmployeeRankHistoryRepository) === "function" ? _a : Object])
], DomainEmployeeRankHistoryService);


/***/ }),

/***/ "./src/modules/domain/employee-token/employee-token.module.ts":
/*!********************************************************************!*\
  !*** ./src/modules/domain/employee-token/employee-token.module.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeTokenModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const employee_token_service_1 = __webpack_require__(/*! ./employee-token.service */ "./src/modules/domain/employee-token/employee-token.service.ts");
const employee_token_repository_1 = __webpack_require__(/*! ./employee-token.repository */ "./src/modules/domain/employee-token/employee-token.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainEmployeeTokenModule = class DomainEmployeeTokenModule {
};
exports.DomainEmployeeTokenModule = DomainEmployeeTokenModule;
exports.DomainEmployeeTokenModule = DomainEmployeeTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.EmployeeToken])],
        providers: [employee_token_service_1.DomainEmployeeTokenService, employee_token_repository_1.DomainEmployeeTokenRepository],
        exports: [employee_token_service_1.DomainEmployeeTokenService],
    })
], DomainEmployeeTokenModule);


/***/ }),

/***/ "./src/modules/domain/employee-token/employee-token.repository.ts":
/*!************************************************************************!*\
  !*** ./src/modules/domain/employee-token/employee-token.repository.ts ***!
  \************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/employee-token/employee-token.service.ts":
/*!*********************************************************************!*\
  !*** ./src/modules/domain/employee-token/employee-token.service.ts ***!
  \*********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_token_repository_1 = __webpack_require__(/*! ./employee-token.repository */ "./src/modules/domain/employee-token/employee-token.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
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
};
exports.DomainEmployeeTokenService = DomainEmployeeTokenService;
exports.DomainEmployeeTokenService = DomainEmployeeTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_token_repository_1.DomainEmployeeTokenRepository !== "undefined" && employee_token_repository_1.DomainEmployeeTokenRepository) === "function" ? _a : Object])
], DomainEmployeeTokenService);


/***/ }),

/***/ "./src/modules/domain/employee/employee.module.ts":
/*!********************************************************!*\
  !*** ./src/modules/domain/employee/employee.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEmployeeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const employee_service_1 = __webpack_require__(/*! ./employee.service */ "./src/modules/domain/employee/employee.service.ts");
const employee_repository_1 = __webpack_require__(/*! ./employee.repository */ "./src/modules/domain/employee/employee.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainEmployeeModule = class DomainEmployeeModule {
};
exports.DomainEmployeeModule = DomainEmployeeModule;
exports.DomainEmployeeModule = DomainEmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Employee])],
        providers: [employee_service_1.DomainEmployeeService, employee_repository_1.DomainEmployeeRepository],
        exports: [employee_service_1.DomainEmployeeService],
    })
], DomainEmployeeModule);


/***/ }),

/***/ "./src/modules/domain/employee/employee.repository.ts":
/*!************************************************************!*\
  !*** ./src/modules/domain/employee/employee.repository.ts ***!
  \************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
let DomainEmployeeRepository = class DomainEmployeeRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainEmployeeRepository = DomainEmployeeRepository;
exports.DomainEmployeeRepository = DomainEmployeeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Employee)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainEmployeeRepository);


/***/ }),

/***/ "./src/modules/domain/employee/employee.service.ts":
/*!*********************************************************!*\
  !*** ./src/modules/domain/employee/employee.service.ts ***!
  \*********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_repository_1 = __webpack_require__(/*! ./employee.repository */ "./src/modules/domain/employee/employee.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
const bcrypt = __webpack_require__(/*! @node-rs/bcrypt */ "@node-rs/bcrypt");
let DomainEmployeeService = class DomainEmployeeService extends base_service_1.BaseService {
    constructor(employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
    }
    async findByEmployeeId(employeeId) {
        const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
        if (!employee) {
            throw new common_1.NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }
    async findByEmail(email) {
        const employee = await this.employeeRepository.findOne({
            where: { email },
        });
        if (!employee) {
            throw new common_1.NotFoundException('직원을 찾을 수 없습니다.');
        }
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
};
exports.DomainEmployeeService = DomainEmployeeService;
exports.DomainEmployeeService = DomainEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_repository_1.DomainEmployeeRepository !== "undefined" && employee_repository_1.DomainEmployeeRepository) === "function" ? _a : Object])
], DomainEmployeeService);


/***/ }),

/***/ "./src/modules/domain/log/log.module.ts":
/*!**********************************************!*\
  !*** ./src/modules/domain/log/log.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainLogModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const log_service_1 = __webpack_require__(/*! ./log.service */ "./src/modules/domain/log/log.service.ts");
const log_repository_1 = __webpack_require__(/*! ./log.repository */ "./src/modules/domain/log/log.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainLogModule = class DomainLogModule {
};
exports.DomainLogModule = DomainLogModule;
exports.DomainLogModule = DomainLogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Log])],
        providers: [log_service_1.DomainLogService, log_repository_1.DomainLogRepository],
        exports: [log_service_1.DomainLogService],
    })
], DomainLogModule);


/***/ }),

/***/ "./src/modules/domain/log/log.repository.ts":
/*!**************************************************!*\
  !*** ./src/modules/domain/log/log.repository.ts ***!
  \**************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/log/log.service.ts":
/*!***********************************************!*\
  !*** ./src/modules/domain/log/log.service.ts ***!
  \***********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const log_repository_1 = __webpack_require__(/*! ./log.repository */ "./src/modules/domain/log/log.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
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

/***/ "./src/modules/domain/position/position.module.ts":
/*!********************************************************!*\
  !*** ./src/modules/domain/position/position.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainPositionModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const position_service_1 = __webpack_require__(/*! ./position.service */ "./src/modules/domain/position/position.service.ts");
const position_repository_1 = __webpack_require__(/*! ./position.repository */ "./src/modules/domain/position/position.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainPositionModule = class DomainPositionModule {
};
exports.DomainPositionModule = DomainPositionModule;
exports.DomainPositionModule = DomainPositionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Position])],
        providers: [position_service_1.DomainPositionService, position_repository_1.DomainPositionRepository],
        exports: [position_service_1.DomainPositionService],
    })
], DomainPositionModule);


/***/ }),

/***/ "./src/modules/domain/position/position.repository.ts":
/*!************************************************************!*\
  !*** ./src/modules/domain/position/position.repository.ts ***!
  \************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/position/position.service.ts":
/*!*********************************************************!*\
  !*** ./src/modules/domain/position/position.service.ts ***!
  \*********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const position_repository_1 = __webpack_require__(/*! ./position.repository */ "./src/modules/domain/position/position.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
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
};
exports.DomainPositionService = DomainPositionService;
exports.DomainPositionService = DomainPositionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof position_repository_1.DomainPositionRepository !== "undefined" && position_repository_1.DomainPositionRepository) === "function" ? _a : Object])
], DomainPositionService);


/***/ }),

/***/ "./src/modules/domain/rank/rank.module.ts":
/*!************************************************!*\
  !*** ./src/modules/domain/rank/rank.module.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainRankModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const rank_service_1 = __webpack_require__(/*! ./rank.service */ "./src/modules/domain/rank/rank.service.ts");
const rank_repository_1 = __webpack_require__(/*! ./rank.repository */ "./src/modules/domain/rank/rank.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainRankModule = class DomainRankModule {
};
exports.DomainRankModule = DomainRankModule;
exports.DomainRankModule = DomainRankModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Rank])],
        providers: [rank_service_1.DomainRankService, rank_repository_1.DomainRankRepository],
        exports: [rank_service_1.DomainRankService],
    })
], DomainRankModule);


/***/ }),

/***/ "./src/modules/domain/rank/rank.repository.ts":
/*!****************************************************!*\
  !*** ./src/modules/domain/rank/rank.repository.ts ***!
  \****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/rank/rank.service.ts":
/*!*************************************************!*\
  !*** ./src/modules/domain/rank/rank.service.ts ***!
  \*************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rank_repository_1 = __webpack_require__(/*! ./rank.repository */ "./src/modules/domain/rank/rank.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
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
};
exports.DomainRankService = DomainRankService;
exports.DomainRankService = DomainRankService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof rank_repository_1.DomainRankRepository !== "undefined" && rank_repository_1.DomainRankRepository) === "function" ? _a : Object])
], DomainRankService);


/***/ }),

/***/ "./src/modules/domain/system-webhook/system-webhook.module.ts":
/*!********************************************************************!*\
  !*** ./src/modules/domain/system-webhook/system-webhook.module.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemWebhookModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const system_webhook_service_1 = __webpack_require__(/*! ./system-webhook.service */ "./src/modules/domain/system-webhook/system-webhook.service.ts");
const system_webhook_repository_1 = __webpack_require__(/*! ./system-webhook.repository */ "./src/modules/domain/system-webhook/system-webhook.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainSystemWebhookModule = class DomainSystemWebhookModule {
};
exports.DomainSystemWebhookModule = DomainSystemWebhookModule;
exports.DomainSystemWebhookModule = DomainSystemWebhookModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.SystemWebhook])],
        providers: [system_webhook_service_1.DomainSystemWebhookService, system_webhook_repository_1.DomainSystemWebhookRepository],
        exports: [system_webhook_service_1.DomainSystemWebhookService],
    })
], DomainSystemWebhookModule);


/***/ }),

/***/ "./src/modules/domain/system-webhook/system-webhook.repository.ts":
/*!************************************************************************!*\
  !*** ./src/modules/domain/system-webhook/system-webhook.repository.ts ***!
  \************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/system-webhook/system-webhook.service.ts":
/*!*********************************************************************!*\
  !*** ./src/modules/domain/system-webhook/system-webhook.service.ts ***!
  \*********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const system_webhook_repository_1 = __webpack_require__(/*! ./system-webhook.repository */ "./src/modules/domain/system-webhook/system-webhook.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
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

/***/ "./src/modules/domain/system/system.module.ts":
/*!****************************************************!*\
  !*** ./src/modules/domain/system/system.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainSystemModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const system_service_1 = __webpack_require__(/*! ./system.service */ "./src/modules/domain/system/system.service.ts");
const system_repository_1 = __webpack_require__(/*! ./system.repository */ "./src/modules/domain/system/system.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainSystemModule = class DomainSystemModule {
};
exports.DomainSystemModule = DomainSystemModule;
exports.DomainSystemModule = DomainSystemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.System])],
        providers: [system_service_1.DomainSystemService, system_repository_1.DomainSystemRepository],
        exports: [system_service_1.DomainSystemService],
    })
], DomainSystemModule);


/***/ }),

/***/ "./src/modules/domain/system/system.repository.ts":
/*!********************************************************!*\
  !*** ./src/modules/domain/system/system.repository.ts ***!
  \********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/system/system.service.ts":
/*!*****************************************************!*\
  !*** ./src/modules/domain/system/system.service.ts ***!
  \*****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const system_repository_1 = __webpack_require__(/*! ./system.repository */ "./src/modules/domain/system/system.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const bcrypt = __webpack_require__(/*! @node-rs/bcrypt */ "@node-rs/bcrypt");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
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
        const system = await this.systemRepository.findOne({
            where: { name },
        });
        if (!system) {
            throw new common_1.NotFoundException('시스템을 찾을 수 없습니다.');
        }
        return system;
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

/***/ "./src/modules/domain/token/token.module.ts":
/*!**************************************************!*\
  !*** ./src/modules/domain/token/token.module.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainTokenModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const token_service_1 = __webpack_require__(/*! ./token.service */ "./src/modules/domain/token/token.service.ts");
const token_repository_1 = __webpack_require__(/*! ./token.repository */ "./src/modules/domain/token/token.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
let DomainTokenModule = class DomainTokenModule {
};
exports.DomainTokenModule = DomainTokenModule;
exports.DomainTokenModule = DomainTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Token]), jwt_1.JwtModule.register({})],
        providers: [token_service_1.DomainTokenService, token_repository_1.DomainTokenRepository],
        exports: [token_service_1.DomainTokenService, token_repository_1.DomainTokenRepository],
    })
], DomainTokenModule);


/***/ }),

/***/ "./src/modules/domain/token/token.repository.ts":
/*!******************************************************!*\
  !*** ./src/modules/domain/token/token.repository.ts ***!
  \******************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
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

/***/ "./src/modules/domain/token/token.service.ts":
/*!***************************************************!*\
  !*** ./src/modules/domain/token/token.service.ts ***!
  \***************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const token_repository_1 = __webpack_require__(/*! ./token.repository */ "./src/modules/domain/token/token.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
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
            order: { tokenExpiresAt: 'ASC' },
        });
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

/***/ "./src/modules/domain/webhook-event-log/webhook-event-log.module.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/domain/webhook-event-log/webhook-event-log.module.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainWebhookEventLogModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const webhook_event_log_service_1 = __webpack_require__(/*! ./webhook-event-log.service */ "./src/modules/domain/webhook-event-log/webhook-event-log.service.ts");
const webhook_event_log_repository_1 = __webpack_require__(/*! ./webhook-event-log.repository */ "./src/modules/domain/webhook-event-log/webhook-event-log.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainWebhookEventLogModule = class DomainWebhookEventLogModule {
};
exports.DomainWebhookEventLogModule = DomainWebhookEventLogModule;
exports.DomainWebhookEventLogModule = DomainWebhookEventLogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.WebhookEventLog])],
        providers: [webhook_event_log_service_1.DomainWebhookEventLogService, webhook_event_log_repository_1.DomainWebhookEventLogRepository],
        exports: [webhook_event_log_service_1.DomainWebhookEventLogService],
    })
], DomainWebhookEventLogModule);


/***/ }),

/***/ "./src/modules/domain/webhook-event-log/webhook-event-log.repository.ts":
/*!******************************************************************************!*\
  !*** ./src/modules/domain/webhook-event-log/webhook-event-log.repository.ts ***!
  \******************************************************************************/
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
exports.DomainWebhookEventLogRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
let DomainWebhookEventLogRepository = class DomainWebhookEventLogRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainWebhookEventLogRepository = DomainWebhookEventLogRepository;
exports.DomainWebhookEventLogRepository = DomainWebhookEventLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.WebhookEventLog)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainWebhookEventLogRepository);


/***/ }),

/***/ "./src/modules/domain/webhook-event-log/webhook-event-log.service.ts":
/*!***************************************************************************!*\
  !*** ./src/modules/domain/webhook-event-log/webhook-event-log.service.ts ***!
  \***************************************************************************/
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
exports.DomainWebhookEventLogService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const webhook_event_log_repository_1 = __webpack_require__(/*! ./webhook-event-log.repository */ "./src/modules/domain/webhook-event-log/webhook-event-log.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
let DomainWebhookEventLogService = class DomainWebhookEventLogService extends base_service_1.BaseService {
    constructor(webhookEventLogRepository) {
        super(webhookEventLogRepository);
        this.webhookEventLogRepository = webhookEventLogRepository;
    }
    async findByWebhookId(webhookId) {
        return this.webhookEventLogRepository.findAll({
            where: { webhookId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByEventType(eventType) {
        return this.webhookEventLogRepository.findAll({
            where: { eventType },
            order: { createdAt: 'DESC' },
        });
    }
    async findByEntityId(entityId) {
        return this.webhookEventLogRepository.findAll({
            where: { entityId },
            order: { createdAt: 'DESC' },
        });
    }
    async findSuccessfulEvents() {
        return this.webhookEventLogRepository.findAll({
            where: { isSuccess: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findFailedEvents() {
        return this.webhookEventLogRepository.findAll({
            where: { isSuccess: false },
            order: { createdAt: 'DESC' },
        });
    }
    async findByResponseCode(responseCode) {
        return this.webhookEventLogRepository.findAll({
            order: { createdAt: 'DESC' },
        });
    }
    async findRetryableEvents(maxAttempts = 3) {
        return this.webhookEventLogRepository.findAll({
            where: { isSuccess: false },
            order: { lastAttemptAt: 'ASC' },
        });
    }
    async createEventLog(webhookId, eventType, entityId, payload) {
        return this.webhookEventLogRepository.save({
            webhookId,
            eventType,
            entityId,
            payload,
            attemptCount: 1,
            isSuccess: false,
            lastAttemptAt: new Date(),
        });
    }
    async updateEventResult(id, responseCode, responseBody, isSuccess) {
        return this.webhookEventLogRepository.update(id, {
            responseCode,
            responseBody,
            isSuccess,
            lastAttemptAt: new Date(),
        });
    }
    async incrementAttemptCount(id) {
        const eventLog = await this.webhookEventLogRepository.findOne({ where: { id } });
        if (!eventLog) {
            throw new common_1.NotFoundException('이벤트 로그를 찾을 수 없습니다.');
        }
        return this.webhookEventLogRepository.update(id, {
            attemptCount: eventLog.attemptCount + 1,
            lastAttemptAt: new Date(),
        });
    }
    async findRecentEvents(limit = 50) {
        return this.webhookEventLogRepository.findAll({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getSuccessRateByWebhook(webhookId) {
        const events = await this.findByWebhookId(webhookId);
        const total = events.length;
        const success = events.filter((event) => event.isSuccess).length;
        const successRate = total > 0 ? (success / total) * 100 : 0;
        return { total, success, successRate };
    }
};
exports.DomainWebhookEventLogService = DomainWebhookEventLogService;
exports.DomainWebhookEventLogService = DomainWebhookEventLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof webhook_event_log_repository_1.DomainWebhookEventLogRepository !== "undefined" && webhook_event_log_repository_1.DomainWebhookEventLogRepository) === "function" ? _a : Object])
], DomainWebhookEventLogService);


/***/ }),

/***/ "./src/modules/domain/webhook/webhook.module.ts":
/*!******************************************************!*\
  !*** ./src/modules/domain/webhook/webhook.module.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainWebhookModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const webhook_service_1 = __webpack_require__(/*! ./webhook.service */ "./src/modules/domain/webhook/webhook.service.ts");
const webhook_repository_1 = __webpack_require__(/*! ./webhook.repository */ "./src/modules/domain/webhook/webhook.repository.ts");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
let DomainWebhookModule = class DomainWebhookModule {
};
exports.DomainWebhookModule = DomainWebhookModule;
exports.DomainWebhookModule = DomainWebhookModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Webhook])],
        providers: [webhook_service_1.DomainWebhookService, webhook_repository_1.DomainWebhookRepository],
        exports: [webhook_service_1.DomainWebhookService],
    })
], DomainWebhookModule);


/***/ }),

/***/ "./src/modules/domain/webhook/webhook.repository.ts":
/*!**********************************************************!*\
  !*** ./src/modules/domain/webhook/webhook.repository.ts ***!
  \**********************************************************/
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
exports.DomainWebhookRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const entities_1 = __webpack_require__(/*! ../../../../libs/database/entities */ "./libs/database/entities/index.ts");
const base_repository_1 = __webpack_require__(/*! ../../../../libs/common/repositories/base.repository */ "./libs/common/repositories/base.repository.ts");
let DomainWebhookRepository = class DomainWebhookRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainWebhookRepository = DomainWebhookRepository;
exports.DomainWebhookRepository = DomainWebhookRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Webhook)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DomainWebhookRepository);


/***/ }),

/***/ "./src/modules/domain/webhook/webhook.service.ts":
/*!*******************************************************!*\
  !*** ./src/modules/domain/webhook/webhook.service.ts ***!
  \*******************************************************/
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
exports.DomainWebhookService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const webhook_repository_1 = __webpack_require__(/*! ./webhook.repository */ "./src/modules/domain/webhook/webhook.repository.ts");
const base_service_1 = __webpack_require__(/*! ../../../../libs/common/services/base.service */ "./libs/common/services/base.service.ts");
let DomainWebhookService = class DomainWebhookService extends base_service_1.BaseService {
    constructor(webhookRepository) {
        super(webhookRepository);
        this.webhookRepository = webhookRepository;
    }
    async findByName(webhookName) {
        const webhook = await this.webhookRepository.findOne({
            where: { webhookName },
        });
        if (!webhook) {
            throw new common_1.NotFoundException('웹훅을 찾을 수 없습니다.');
        }
        return webhook;
    }
    async findByEventType(eventType) {
        return this.webhookRepository.findAll({
            where: { eventType },
            order: { createdAt: 'DESC' },
        });
    }
    async findByEntityType(entityType) {
        return this.webhookRepository.findAll({
            where: { entityType },
            order: { createdAt: 'DESC' },
        });
    }
    async findActiveWebhooks() {
        return this.webhookRepository.findAll({
            where: { isActive: true },
            order: { webhookName: 'ASC' },
        });
    }
    async findByTargetUrl(targetUrl) {
        return this.webhookRepository.findAll({
            where: { targetUrl },
            order: { createdAt: 'DESC' },
        });
    }
};
exports.DomainWebhookService = DomainWebhookService;
exports.DomainWebhookService = DomainWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof webhook_repository_1.DomainWebhookRepository !== "undefined" && webhook_repository_1.DomainWebhookRepository) === "function" ? _a : Object])
], DomainWebhookService);


/***/ }),

/***/ "@nestjs-modules/mailer":
/*!*****************************************!*\
  !*** external "@nestjs-modules/mailer" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),

/***/ "@nestjs-modules/mailer/dist/adapters/handlebars.adapter":
/*!**************************************************************************!*\
  !*** external "@nestjs-modules/mailer/dist/adapters/handlebars.adapter" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "@node-rs/bcrypt":
/*!**********************************!*\
  !*** external "@node-rs/bcrypt" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@node-rs/bcrypt");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ "dayjs/plugin/timezone":
/*!****************************************!*\
  !*** external "dayjs/plugin/timezone" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("dayjs/plugin/timezone");

/***/ }),

/***/ "dayjs/plugin/utc":
/*!***********************************!*\
  !*** external "dayjs/plugin/utc" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("dayjs/plugin/utc");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ "hbs":
/*!**********************!*\
  !*** external "hbs" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("hbs");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
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
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const swagger_1 = __webpack_require__(/*! ./common/utils/swagger */ "./src/common/utils/swagger.ts");
const dtos = __webpack_require__(/*! ./dtos.index */ "./src/dtos.index.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const logging_interceptor_1 = __webpack_require__(/*! ./common/interceptors/logging.interceptor */ "./src/common/interceptors/logging.interceptor.ts");
const logs_service_1 = __webpack_require__(/*! ./modules/application/legacy/logs/services/logs.service */ "./src/modules/application/legacy/logs/services/logs.service.ts");
const systems_service_1 = __webpack_require__(/*! ./modules/application/legacy/systems/services/systems.service */ "./src/modules/application/legacy/systems/services/systems.service.ts");
const hbs = __webpack_require__(/*! hbs */ "hbs");
const request_interceptor_1 = __webpack_require__(/*! ../libs/common/interceptors/request.interceptor */ "./libs/common/interceptors/request.interceptor.ts");
const error_interceptor_1 = __webpack_require__(/*! ../libs/common/interceptors/error.interceptor */ "./libs/common/interceptors/error.interceptor.ts");
async function bootstrap() {
    console.log('bootstrap', __dirname);
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
    app.enableCors();
    app.useGlobalInterceptors(new request_interceptor_1.RequestInterceptor(), new error_interceptor_1.ErrorInterceptor());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(app.get(logs_service_1.LogsService), app.get(systems_service_1.SystemsService)));
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
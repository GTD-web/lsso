"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entities = exports.Log = exports.SystemWebhook = exports.EmployeeToken = exports.Token = exports.System = exports.WebhookEventLog = exports.Webhook = exports.EmployeeRankHistory = exports.EmployeeDepartmentPosition = exports.Rank = exports.Position = exports.Department = exports.Employee = void 0;
const employee_entity_1 = require("./employee.entity");
Object.defineProperty(exports, "Employee", { enumerable: true, get: function () { return employee_entity_1.Employee; } });
const department_entity_1 = require("./department.entity");
Object.defineProperty(exports, "Department", { enumerable: true, get: function () { return department_entity_1.Department; } });
const position_entity_1 = require("./position.entity");
Object.defineProperty(exports, "Position", { enumerable: true, get: function () { return position_entity_1.Position; } });
const rank_entity_1 = require("./rank.entity");
Object.defineProperty(exports, "Rank", { enumerable: true, get: function () { return rank_entity_1.Rank; } });
const employee_department_position_entity_1 = require("./employee-department-position.entity");
Object.defineProperty(exports, "EmployeeDepartmentPosition", { enumerable: true, get: function () { return employee_department_position_entity_1.EmployeeDepartmentPosition; } });
const employee_rank_history_entity_1 = require("./employee-rank-history.entity");
Object.defineProperty(exports, "EmployeeRankHistory", { enumerable: true, get: function () { return employee_rank_history_entity_1.EmployeeRankHistory; } });
const webhook_entity_1 = require("./webhook.entity");
Object.defineProperty(exports, "Webhook", { enumerable: true, get: function () { return webhook_entity_1.Webhook; } });
const webhook_event_log_entity_1 = require("./webhook-event-log.entity");
Object.defineProperty(exports, "WebhookEventLog", { enumerable: true, get: function () { return webhook_event_log_entity_1.WebhookEventLog; } });
const system_entity_1 = require("./system.entity");
Object.defineProperty(exports, "System", { enumerable: true, get: function () { return system_entity_1.System; } });
const token_entity_1 = require("./token.entity");
Object.defineProperty(exports, "Token", { enumerable: true, get: function () { return token_entity_1.Token; } });
const employee_token_entity_1 = require("./employee-token.entity");
Object.defineProperty(exports, "EmployeeToken", { enumerable: true, get: function () { return employee_token_entity_1.EmployeeToken; } });
const system_webhook_entity_1 = require("./system-webhook.entity");
Object.defineProperty(exports, "SystemWebhook", { enumerable: true, get: function () { return system_webhook_entity_1.SystemWebhook; } });
const log_entity_1 = require("./log.entity");
Object.defineProperty(exports, "Log", { enumerable: true, get: function () { return log_entity_1.Log; } });
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
];
//# sourceMappingURL=index.js.map
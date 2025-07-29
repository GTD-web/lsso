"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=webhook-event-type.enum.js.map
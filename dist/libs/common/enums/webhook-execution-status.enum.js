"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=webhook-execution-status.enum.js.map
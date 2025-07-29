/**
 * 웹훅 실행 상태 열거형
 */
export enum WebhookExecutionStatus {
    Pending = 'pending',
    Executing = 'executing',
    Success = 'success',
    Failed = 'failed',
    Timeout = 'timeout',
    Cancelled = 'cancelled',
    Retry = 'retry',
}

/**
 * 웹훅 이벤트 유형 열거형
 */
export enum WebhookEventType {
    DepartmentCreated = 'department.created',
    DepartmentUpdated = 'department.updated',
    DepartmentDeleted = 'department.deleted',
    EmployeeCreated = 'employee.created',
    EmployeeUpdated = 'employee.updated',
    EmployeePositionChanged = 'employee.position_changed',
    EmployeeDepartmentChanged = 'employee.department_changed',
    EmployeeTerminated = 'employee.terminated',
}

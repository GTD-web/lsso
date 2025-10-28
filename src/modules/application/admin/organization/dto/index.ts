// Department DTOs
export {
    CreateDepartmentRequestDto,
    UpdateDepartmentRequestDto,
    DepartmentResponseDto,
    DepartmentListResponseDto,
    UpdateDepartmentOrderRequestDto,
    UpdateDepartmentParentRequestDto,
    DepartmentHierarchyResponseDto,
    DepartmentWithEmployeesDto,
    DepartmentEmployeeInfoDto,
} from './department.dto';

// Employee DTOs
export {
    CreateEmployeeRequestDto,
    UpdateEmployeeRequestDto,
    EmployeeResponseDto,
    EmployeeListResponseDto,
    NextEmployeeNumberResponseDto,
    EmployeeDetailInfoDto,
    EmployeeDetailListResponseDto,
    BulkUpdateDepartmentRequestDto,
    BulkUpdatePositionRequestDto,
    BulkUpdateRankRequestDto,
    BulkUpdateStatusRequestDto,
    BulkUpdateResultDto,
} from './employee.dto';

// Position DTOs
export { CreatePositionRequestDto, UpdatePositionRequestDto, PositionResponseDto } from './position.dto';

// Rank DTOs
export { CreateRankRequestDto, UpdateRankRequestDto, RankResponseDto } from './rank.dto';

// Employee Assignment DTOs
export {
    AssignEmployeeRequestDto,
    UpdateEmployeeAssignmentRequestDto,
    UpdateManagerStatusRequestDto,
    EmployeeAssignmentResponseDto,
    EmployeeAssignmentListResponseDto,
    EmployeeAssignmentDetailResponseDto,
} from './employee-assignment.dto';

// Employee Rank History DTOs
export { PromoteEmployeeRequestDto, EmployeeRankHistoryResponseDto } from './employee-rank-history.dto';

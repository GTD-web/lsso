// 모든 DTO 파일을 가져오는 파일
// export * from 'src/auth/dto';
// export * from './modules/application/admin/users/dto';
// export * from './modules/application/admin/systems/dto';
// export * from 'src/logs/dto';
// export * from 'src/tokens/dto';
export * from '../libs/common/dto';

// Application DTOs
// 주의: 일부 DTO는 여러 모듈에서 동일한 이름으로 정의되어 있어 충돌이 발생합니다.
// 중복되는 경우 우선순위에 따라 하나만 export 합니다.
// 필요한 경우 특정 모듈에서 직접 import 하세요.

// Organization Information DTOs (Client API) - 우선순위 높음
export * from './modules/application/organization-information/dto';

// Admin - Organization DTOs
// 주의: CreateEmployeeRequestDto, EmployeeResponseDto, DepartmentHierarchyResponseDto가 organization-information과 중복되어 제외됩니다.
// 중복 제외: CreateEmployeeRequestDto, EmployeeResponseDto, DepartmentHierarchyResponseDto, DepartmentWithEmployeesDto
export {
    CreateDepartmentRequestDto,
    UpdateDepartmentRequestDto,
    DepartmentResponseDto,
    DepartmentListResponseDto,
    UpdateDepartmentOrderRequestDto,
    UpdateDepartmentParentRequestDto,
    CreatePositionRequestDto,
    UpdatePositionRequestDto,
    PositionResponseDto,
    CreateRankRequestDto,
    UpdateRankRequestDto,
    RankResponseDto,
    AssignEmployeeRequestDto,
    UpdateEmployeeAssignmentRequestDto,
    UpdateManagerStatusRequestDto,
    EmployeeAssignmentResponseDto,
    EmployeeAssignmentListResponseDto,
    EmployeeAssignmentDetailResponseDto,
    PromoteEmployeeRequestDto,
    EmployeeRankHistoryResponseDto,
    EmployeeAssignmentDetailDto,
    BulkUpdateDepartmentRequestDto,
    BulkUpdateTeamRequestDto,
    BulkUpdatePositionRequestDto,
    BulkUpdateRankRequestDto,
    BulkUpdateStatusRequestDto,
    BulkUpdateResultDto,
    AdminEmployeeResponseDto,
    EmployeeListResponseDto,
    NextEmployeeNumberResponseDto,
    EmployeeDetailInfoDto,
    EmployeeDetailListResponseDto,
} from './modules/application/admin/organization/dto';

// Admin - Employee DTOs
export * from './modules/application/admin/employee/dto';

// Admin - Log DTOs (우선순위 높음)
export * from './modules/application/admin/log/dto';

// Admin - System DTOs (우선순위 높음)
export * from './modules/application/admin/system/dto';

// Single Sign-On DTOs
// 주의: LoginResponseDto가 legacy/auth와 중복되어 별칭으로 export 합니다.
export * as SSODto from './modules/application/single-sign-on/dto';

// FCM Token Management DTOs
export * from './modules/application/fcm-token-management/dto';

// Legacy - Auth DTOs
// 주의: LoginResponseDto, UserResponseDto, TokenResponseDto가 다른 모듈과 중복됩니다.
// 중복 제외: LoginResponseDto (single-sign-on과 중복), UserResponseDto (users와 중복), TokenResponseDto (tokens와 중복)
export {
    AdminLoginResponseDto,
    AdminLoginDto,
    AdminProfileDto,
    AdminResponseDto,
    AdminTokenRefreshDto,
    AdminTokenVerifyDto,
    CreateAdminDto,
    UpdateAdminDto,
    TokenResponseDto as LegacyAuthTokenResponseDto,
    LoginResponseDto as LegacyAuthLoginResponseDto,
    RefreshTokenResponseDto,
    UserResponseDto as LegacyAuthUserResponseDto,
} from './modules/application/legacy/auth/dto';

// Legacy - Users DTOs
export * from './modules/application/legacy/users/dto';

// Legacy - Tokens DTOs
export * from './modules/application/legacy/tokens/dto';

// Legacy - Systems DTOs
// 주의: CreateSystemDto, UpdateSystemDto가 admin/system과 중복되어 별칭으로 export 합니다.
export {
    CreateSystemDto as LegacyCreateSystemDto,
    UpdateSystemDto as LegacyUpdateSystemDto,
    ResponseSystemDto,
} from './modules/application/legacy/systems/dto';

// Legacy - Logs DTOs
// 주의: Log 관련 DTO가 admin/log와 중복되어 별칭으로 export 합니다.
export {
    CreateLogDto as LegacyCreateLogDto,
    LogFilterDto as LegacyLogFilterDto,
    LogResponseDto as LegacyLogResponseDto,
    LogsResponseDto as LegacyLogsResponseDto,
} from './modules/application/legacy/logs/dto';

// Legacy - Dashboard DTOs (index.ts가 없어 직접 export)
export * from './modules/application/legacy/dashboard/dto/dashboard.dto';

// Legacy - Mail DTOs (index.ts가 없어 직접 export)
export * from './modules/application/legacy/mail/dtos/sendMail.dto';

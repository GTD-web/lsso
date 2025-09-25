import { Controller, Get, Post, Query, HttpCode, HttpStatus, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrganizationInformationApplicationService } from '../organization-information-application.service';
import {
    EmployeeRequestDto,
    EmployeeResponseDto,
    EmployeesRequestDto,
    EmployeesResponseDto,
    DepartmentHierarchyRequestDto,
    DepartmentHierarchyResponseDto,
} from '../dto';
import { JwtAuthGuard } from '../../../../../libs/common/guards/jwt-auth.guard';
import { User, AuthenticatedUser } from '../../../../../libs/common/decorators/user.decorator';
import { Public } from '../../../../../libs/common/decorators/public.decorator';
import { MigrationService } from '../../../context/migration/migration.service';

@ApiTags('Client - 조직 정보 API')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('organization')
export class OrganizationInformationApplicationController {
    constructor(
        private readonly organizationInformationApplicationService: OrganizationInformationApplicationService,
        private readonly migrationService: MigrationService,
    ) {}

    @Get('employee')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '직원 정보 조회',
        description: '직원 ID 또는 사번으로 직원의 기본 정보와 조직 정보를 조회합니다.',
    })
    @ApiQuery({
        name: 'employeeId',
        description: '직원 ID',
        required: false,
        type: String,
        example: 'emp123',
    })
    @ApiQuery({
        name: 'employeeNumber',
        description: '사번',
        required: false,
        type: String,
        example: 'E2023001',
    })
    @ApiQuery({
        name: 'withDetail',
        description: '상세 정보 포함 여부 (부서, 직책, 직급의 상세 정보)',
        required: false,
        type: Boolean,
        example: true,
    })
    @ApiResponse({
        status: 200,
        description: '직원 정보 조회 성공',
        type: EmployeeResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식 (직원 ID 또는 사번 중 하나는 필수)' })
    @ApiResponse({ status: 401, description: '인증이 필요합니다' })
    @ApiResponse({ status: 404, description: '해당 직원을 찾을 수 없음' })
    async getEmployee(
        @User() user: AuthenticatedUser,
        @Query('employeeId') employeeId?: string,
        @Query('employeeNumber') employeeNumber?: string,
        @Query('withDetail') withDetail?: boolean,
    ): Promise<EmployeeResponseDto> {
        // 인증된 사용자 정보 로깅 (개발용)
        console.log('인증된 사용자:', user);

        // Query 파라미터를 DTO로 변환
        const requestDto: EmployeeRequestDto = {
            employeeId,
            employeeNumber,
            withDetail,
        };

        return this.organizationInformationApplicationService.직원정보를_조회한다(requestDto);
    }

    @Get('employees')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '여러 직원 정보 조회',
        description:
            '직원 ID 배열 또는 사번 배열로 여러 직원의 정보를 조회합니다. 배열이 비어있으면 전체 직원을 조회합니다.',
    })
    @ApiQuery({
        name: 'employeeIds',
        description: '직원 ID 배열 (쉼표로 구분)',
        required: false,
        type: String,
        example: 'emp123,emp456',
    })
    @ApiQuery({
        name: 'employeeNumbers',
        description: '사번 배열 (쉼표로 구분)',
        required: false,
        type: String,
        example: 'E2023001,E2023002',
    })
    @ApiQuery({
        name: 'withDetail',
        description: '상세 정보 포함 여부 (부서, 직책, 직급의 상세 정보)',
        required: false,
        type: Boolean,
        example: false,
    })
    @ApiQuery({
        name: 'includeTerminated',
        description: '퇴사한 직원 포함 여부',
        required: false,
        type: Boolean,
        example: false,
    })
    @ApiResponse({
        status: 200,
        description: '직원 목록 조회 성공',
        type: EmployeesResponseDto,
    })
    @ApiResponse({ status: 401, description: '인증이 필요합니다' })
    @ApiResponse({ status: 404, description: '직원 정보를 조회할 수 없음' })
    async getEmployees(
        @User() user: AuthenticatedUser,
        @Query('employeeIds') employeeIds?: string,
        @Query('employeeNumbers') employeeNumbers?: string,
        @Query('withDetail') withDetail?: boolean,
        @Query('includeTerminated') includeTerminated?: boolean,
    ): Promise<EmployeesResponseDto> {
        // 쉼표로 구분된 문자열을 배열로 변환
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

        // Query 파라미터를 DTO로 변환
        const requestDto: EmployeesRequestDto = {
            employeeIds: employeeIdsArray,
            employeeNumbers: employeeNumbersArray,
            withDetail: withDetail || false,
            includeTerminated: includeTerminated || false,
        };

        return this.organizationInformationApplicationService.여러_직원정보를_조회한다(requestDto);
    }

    @Get('departments/hierarchy')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '부서 계층구조별 직원 정보 조회',
        description: '부서의 계층구조를 따라 각 부서에 속한 직원들의 목록을 깊이와 함께 조회합니다.',
    })
    @ApiQuery({
        name: 'rootDepartmentId',
        description: '조회할 최상위 부서 ID (지정하지 않으면 전체 조직도 조회)',
        required: false,
        type: String,
        example: 'dept-uuid-123',
    })
    @ApiQuery({
        name: 'maxDepth',
        description: '최대 조회 깊이 (기본값: 무제한)',
        required: false,
        type: Number,
        example: 3,
    })
    @ApiQuery({
        name: 'withEmployeeDetail',
        description: '직원 상세 정보 포함 여부 (부서, 직책, 직급 정보)',
        required: false,
        type: Boolean,
        example: true,
    })
    @ApiQuery({
        name: 'includeTerminated',
        description: '퇴사한 직원 포함 여부',
        required: false,
        type: Boolean,
        example: false,
    })
    @ApiQuery({
        name: 'includeEmptyDepartments',
        description: '빈 부서 포함 여부 (직원이 없는 부서도 포함)',
        required: false,
        type: Boolean,
        example: true,
    })
    @ApiResponse({
        status: 200,
        description: '부서 계층구조별 직원 정보 조회 성공',
        type: DepartmentHierarchyResponseDto,
    })
    @ApiResponse({ status: 401, description: '인증이 필요합니다' })
    @ApiResponse({ status: 404, description: '부서 계층구조 정보를 조회할 수 없음' })
    async getDepartmentHierarchy(
        @User() user: AuthenticatedUser,
        @Query('rootDepartmentId') rootDepartmentId?: string,
        @Query('maxDepth') maxDepth?: number,
        @Query('withEmployeeDetail') withEmployeeDetail?: boolean,
        @Query('includeTerminated') includeTerminated?: boolean,
        @Query('includeEmptyDepartments') includeEmptyDepartments?: boolean,
    ): Promise<DepartmentHierarchyResponseDto> {
        // 인증된 사용자 정보 로깅 (개발용)
        console.log('부서 계층구조 조회 - 인증된 사용자:', user);

        // Query 파라미터를 DTO로 변환
        const requestDto: DepartmentHierarchyRequestDto = {
            rootDepartmentId,
            maxDepth: maxDepth ? Number(maxDepth) : undefined,
            withEmployeeDetail: withEmployeeDetail === true || String(withEmployeeDetail) === 'true',
            includeTerminated: includeTerminated === true || String(includeTerminated) === 'true',
            includeEmptyDepartments: includeEmptyDepartments !== false && String(includeEmptyDepartments) !== 'false',
        };

        return this.organizationInformationApplicationService.부서_계층구조별_직원정보를_조회한다(requestDto);
    }

    @Get('cron/sync')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '조직 정보 마이그레이션 실행 (Cron)',
        description: 'Vercel cron에서 호출되는 마이그레이션 API입니다. 매일 자정에 자동 실행됩니다.',
    })
    @ApiResponse({
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
    })
    @ApiResponse({
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
    })
    async executeMigrationCron(): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
        executionTime?: string;
        error?: string;
    }> {
        const startTime = Date.now();
        const timestamp = new Date().toISOString();

        try {
            console.log(`[${timestamp}] 조직 정보 마이그레이션 시작 - Cron 실행`);

            // 마이그레이션 실행
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
        } catch (error) {
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
}

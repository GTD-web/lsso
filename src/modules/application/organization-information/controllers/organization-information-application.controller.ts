import { Controller, Get, Query, HttpCode, HttpStatus, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrganizationInformationApplicationService } from '../organization-information-application.service';
import { EmployeeRequestDto, EmployeeResponseDto, EmployeesRequestDto, EmployeesResponseDto } from '../dto';
import { JwtAuthGuard } from '../../../../../libs/common/guards/jwt-auth.guard';
import { User, AuthenticatedUser } from '../../../../../libs/common/decorators/user.decorator';

@ApiTags('조직 정보 API')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organization')
export class OrganizationInformationApplicationController {
    constructor(
        private readonly organizationInformationApplicationService: OrganizationInformationApplicationService,
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
}

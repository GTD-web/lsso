import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../../libs/common/guards/jwt-auth.guard';
import { OrganizationApplicationService } from './organization-application.service';
import {
    CreateDepartmentRequestDto,
    UpdateDepartmentRequestDto,
    DepartmentResponseDto,
    DepartmentListResponseDto,
    UpdateDepartmentOrderRequestDto,
    UpdateDepartmentParentRequestDto,
    DepartmentHierarchyResponseDto,
    CreateEmployeeRequestDto,
    UpdateEmployeeRequestDto,
    AdminEmployeeResponseDto,
    EmployeeListResponseDto,
    NextEmployeeNumberResponseDto,
    EmployeeDetailListResponseDto,
    BulkUpdateDepartmentRequestDto,
    BulkUpdateTeamRequestDto,
    BulkUpdatePositionRequestDto,
    BulkUpdateRankRequestDto,
    BulkUpdateStatusRequestDto,
    BulkUpdateResultDto,
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
} from './dto';
import { EmployeeStatus } from '../../../../../libs/common/enums';

@ApiTags('Admin - 조직 관리')
// @ApiBearerAuth()
@Controller('admin/organizations')
export class OrganizationController {
    constructor(private readonly organizationApplicationService: OrganizationApplicationService) {}

    @Get('')
    @ApiOperation({
        summary: '부서 계층구조별 직원 정보 조회',
        description: '부서의 계층구조를 따라 각 부서에 속한 직원들의 목록을 깊이와 함께 조회합니다.',
    })
    @ApiResponse({
        status: 200,
        description: '부서 계층구조별 직원 정보 조회 성공',
        type: DepartmentHierarchyResponseDto,
    })
    @ApiResponse({ status: 401, description: '인증이 필요합니다' })
    @ApiResponse({ status: 404, description: '부서 계층구조 정보를 조회할 수 없음' })
    async getDepartmentHierarchy(): Promise<DepartmentHierarchyResponseDto> {
        return this.organizationApplicationService.부서_계층구조별_직원정보를_조회한다();
    }

    // 부서 관리 API
    @Get('departments')
    @ApiOperation({ summary: '부서 목록 조회', description: '전체 부서 목록을 계층구조로 조회합니다.' })
    @ApiResponse({ status: 200, type: DepartmentListResponseDto })
    async getDepartments(): Promise<DepartmentListResponseDto> {
        return await this.organizationApplicationService.부서목록조회();
    }

    @Get('departments/:id')
    @ApiOperation({ summary: '부서 상세 조회' })
    @ApiParam({ name: 'id', description: '부서 ID' })
    @ApiResponse({ status: 200, type: DepartmentResponseDto })
    async getDepartment(@Param('id') id: string): Promise<DepartmentResponseDto> {
        return await this.organizationApplicationService.부서상세조회(id);
    }

    @Post('departments')
    @ApiOperation({ summary: '부서 생성' })
    @ApiBody({ type: CreateDepartmentRequestDto })
    @ApiResponse({ status: 201, type: DepartmentResponseDto })
    async createDepartment(@Body() createDepartmentDto: CreateDepartmentRequestDto): Promise<DepartmentResponseDto> {
        return await this.organizationApplicationService.부서생성(createDepartmentDto);
    }

    @Put('departments/:id')
    @ApiOperation({ summary: '부서 수정' })
    @ApiParam({ name: 'id', description: '부서 ID' })
    @ApiBody({ type: UpdateDepartmentRequestDto })
    @ApiResponse({ status: 200, type: DepartmentResponseDto })
    async updateDepartment(
        @Param('id') id: string,
        @Body() updateDepartmentDto: UpdateDepartmentRequestDto,
    ): Promise<DepartmentResponseDto> {
        return await this.organizationApplicationService.부서수정(id, updateDepartmentDto);
    }

    @Delete('departments/:id')
    @ApiOperation({ summary: '부서 삭제' })
    @ApiParam({ name: 'id', description: '부서 ID' })
    @ApiResponse({ status: 200 })
    async deleteDepartment(@Param('id') id: string): Promise<void> {
        return await this.organizationApplicationService.부서삭제(id);
    }

    @Patch('departments/:id/order')
    @ApiOperation({ summary: '부서 순서 변경' })
    @ApiParam({ name: 'id', description: '부서 ID' })
    @ApiBody({ type: UpdateDepartmentOrderRequestDto })
    @ApiResponse({ status: 200, type: DepartmentResponseDto })
    async updateDepartmentOrder(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateDepartmentOrderRequestDto,
    ): Promise<DepartmentResponseDto> {
        return await this.organizationApplicationService.부서순서변경(id, updateOrderDto);
    }

    @Patch('departments/:id/parent')
    @ApiOperation({ summary: '부서 상위 부서 변경' })
    @ApiParam({ name: 'id', description: '부서 ID' })
    @ApiBody({ type: UpdateDepartmentParentRequestDto })
    @ApiResponse({ status: 200, type: DepartmentResponseDto })
    async updateDepartmentParent(
        @Param('id') id: string,
        @Body() updateParentDto: UpdateDepartmentParentRequestDto,
    ): Promise<DepartmentResponseDto> {
        return await this.organizationApplicationService.부서상위부서변경(id, updateParentDto);
    }

    // 직원 관리 API
    @Get('employees')
    @ApiOperation({
        summary: '직원 상세 목록 조회',
        description:
            '직원 목록을 부서, 직책, 직급, 토큰, FCM토큰, 시스템 역할 정보와 함께 조회합니다. 재직상태로 필터링할 수 있습니다.',
    })
    @ApiQuery({
        name: 'status',
        description: '재직상태 (재직중, 휴직, 퇴사)',
        enum: EmployeeStatus,
        required: false,
    })
    @ApiResponse({ status: 200, type: EmployeeDetailListResponseDto })
    async getEmployees(@Query('status') status?: EmployeeStatus): Promise<EmployeeDetailListResponseDto> {
        return await this.organizationApplicationService.직원상세목록조회(status);
    }

    @Get('employees/next-employee-number')
    @ApiOperation({
        summary: '다음 직원번호 조회',
        description:
            '해당 연도의 다음 순번 직원번호를 조회합니다. 연도를 지정하지 않으면 현재 연도 기준으로 조회합니다.',
    })
    @ApiResponse({
        status: 200,
        type: NextEmployeeNumberResponseDto,
        description: '다음 직원번호 정보 (형식: YY + 순번 3자리, 예: 25001)',
    })
    @ApiQuery({ name: 'year', description: '연도', required: false })
    async getNextEmployeeNumber(@Query('year') year?: number): Promise<NextEmployeeNumberResponseDto> {
        const targetYear = year || new Date().getFullYear();
        return await this.organizationApplicationService.다음직원번호조회(targetYear);
    }

    @Get('employees/:id')
    @ApiOperation({ summary: '직원 상세 조회' })
    @ApiParam({ name: 'id', description: '직원 ID' })
    @ApiResponse({ status: 200, type: AdminEmployeeResponseDto })
    async getEmployee(@Param('id') id: string): Promise<AdminEmployeeResponseDto> {
        return await this.organizationApplicationService.직원상세조회(id);
    }

    @Post('employees')
    @ApiOperation({ summary: '직원 생성' })
    @ApiBody({ type: CreateEmployeeRequestDto })
    @ApiResponse({ status: 201, type: AdminEmployeeResponseDto })
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeRequestDto): Promise<AdminEmployeeResponseDto> {
        return await this.organizationApplicationService.직원생성(createEmployeeDto);
    }

    @Put('employees/:id')
    @ApiOperation({ summary: '직원 수정' })
    @ApiParam({ name: 'id', description: '직원 ID' })
    @ApiBody({ type: UpdateEmployeeRequestDto })
    @ApiResponse({ status: 200, type: AdminEmployeeResponseDto })
    async updateEmployee(
        @Param('id') id: string,
        @Body() updateEmployeeDto: UpdateEmployeeRequestDto,
    ): Promise<AdminEmployeeResponseDto> {
        return await this.organizationApplicationService.직원수정(id, updateEmployeeDto);
    }

    // ==================== 직원 일괄 수정 ====================

    @Patch('employees/bulk/department')
    @ApiOperation({
        summary: '직원 부서 일괄 수정',
        description: 'DEPARTMENT 타입의 부서에만 일괄 수정 가능합니다.',
    })
    @ApiResponse({ status: 200, description: '부서 일괄 수정 성공', type: BulkUpdateResultDto })
    @ApiResponse({ status: 400, description: '잘못된 요청 (DEPARTMENT 타입이 아님)' })
    @ApiResponse({ status: 404, description: '부서를 찾을 수 없음' })
    async bulkUpdateEmployeeDepartment(@Body() dto: BulkUpdateDepartmentRequestDto): Promise<BulkUpdateResultDto> {
        return await this.organizationApplicationService.직원부서일괄수정(dto.employeeIds, dto.departmentId);
    }

    @Patch('employees/bulk/team')
    @ApiOperation({
        summary: '직원 팀 일괄 배치',
        description: 'TEAM 타입의 부서에만 일괄 배치 가능합니다.',
    })
    @ApiBody({ type: BulkUpdateTeamRequestDto })
    @ApiResponse({ status: 200, description: '팀 일괄 배치 성공', type: BulkUpdateResultDto })
    @ApiResponse({ status: 400, description: '잘못된 요청 (TEAM 타입이 아님)' })
    @ApiResponse({ status: 404, description: '팀을 찾을 수 없음' })
    async bulkUpdateEmployeeTeam(@Body() dto: BulkUpdateTeamRequestDto): Promise<BulkUpdateResultDto> {
        return await this.organizationApplicationService.직원팀일괄배치(dto.employeeIds, dto.teamId);
    }

    @Patch('employees/bulk/position')
    @ApiOperation({ summary: '직원 직책 일괄 수정' })
    @ApiResponse({ status: 200, description: '직책 일괄 수정 성공', type: BulkUpdateResultDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 404, description: '직책을 찾을 수 없음' })
    async bulkUpdateEmployeePosition(@Body() dto: BulkUpdatePositionRequestDto): Promise<BulkUpdateResultDto> {
        return await this.organizationApplicationService.직원직책일괄수정(dto.employeeIds, dto.positionId);
    }

    @Patch('employees/bulk/rank')
    @ApiOperation({ summary: '직원 직급 일괄 수정' })
    @ApiResponse({ status: 200, description: '직급 일괄 수정 성공', type: BulkUpdateResultDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 404, description: '직급을 찾을 수 없음' })
    async bulkUpdateEmployeeRank(@Body() dto: BulkUpdateRankRequestDto): Promise<BulkUpdateResultDto> {
        return await this.organizationApplicationService.직원직급일괄수정(dto.employeeIds, dto.rankId);
    }

    @Patch('employees/bulk/status')
    @ApiOperation({ summary: '직원 재직상태 일괄 수정' })
    @ApiResponse({ status: 200, description: '재직상태 일괄 수정 성공', type: BulkUpdateResultDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    async bulkUpdateEmployeeStatus(@Body() dto: BulkUpdateStatusRequestDto): Promise<BulkUpdateResultDto> {
        const terminationDate = dto.terminationDate ? new Date(dto.terminationDate) : undefined;
        return await this.organizationApplicationService.직원재직상태일괄수정(
            dto.employeeIds,
            dto.status,
            terminationDate,
        );
    }

    @Delete('employees/:id')
    @ApiOperation({ summary: '직원 삭제' })
    @ApiParam({ name: 'id', description: '직원 ID' })
    @ApiResponse({ status: 200 })
    async deleteEmployee(@Param('id') id: string): Promise<void> {
        return await this.organizationApplicationService.직원삭제(id);
    }

    // 직책 관리 API
    @Get('positions')
    @ApiOperation({ summary: '직책 목록 조회' })
    @ApiResponse({ status: 200, type: [PositionResponseDto] })
    async getPositions(): Promise<PositionResponseDto[]> {
        return await this.organizationApplicationService.직책목록조회();
    }

    @Post('positions')
    @ApiOperation({ summary: '직책 생성' })
    @ApiBody({ type: CreatePositionRequestDto })
    @ApiResponse({ status: 201, type: PositionResponseDto })
    async createPosition(@Body() createPositionDto: CreatePositionRequestDto): Promise<PositionResponseDto> {
        return await this.organizationApplicationService.직책생성(createPositionDto);
    }

    @Put('positions/:id')
    @ApiOperation({ summary: '직책 수정' })
    @ApiParam({ name: 'id', description: '직책 ID' })
    @ApiBody({ type: UpdatePositionRequestDto })
    @ApiResponse({ status: 200, type: PositionResponseDto })
    async updatePosition(
        @Param('id') id: string,
        @Body() updatePositionDto: UpdatePositionRequestDto,
    ): Promise<PositionResponseDto> {
        return await this.organizationApplicationService.직책수정(id, updatePositionDto);
    }

    @Delete('positions/:id')
    @ApiOperation({ summary: '직책 삭제' })
    @ApiParam({ name: 'id', description: '직책 ID' })
    @ApiResponse({ status: 200 })
    async deletePosition(@Param('id') id: string): Promise<void> {
        return await this.organizationApplicationService.직책삭제(id);
    }

    // 직급 관리 API
    @Get('ranks')
    @ApiOperation({ summary: '직급 목록 조회' })
    @ApiResponse({ status: 200, type: [RankResponseDto] })
    async getRanks(): Promise<RankResponseDto[]> {
        return await this.organizationApplicationService.직급목록조회();
    }

    @Post('ranks')
    @ApiOperation({ summary: '직급 생성' })
    @ApiBody({ type: CreateRankRequestDto })
    @ApiResponse({ status: 201, type: RankResponseDto })
    async createRank(@Body() createRankDto: CreateRankRequestDto): Promise<RankResponseDto> {
        return await this.organizationApplicationService.직급생성(createRankDto);
    }

    @Put('ranks/:id')
    @ApiOperation({ summary: '직급 수정' })
    @ApiParam({ name: 'id', description: '직급 ID' })
    @ApiBody({ type: UpdateRankRequestDto })
    @ApiResponse({ status: 200, type: RankResponseDto })
    async updateRank(@Param('id') id: string, @Body() updateRankDto: UpdateRankRequestDto): Promise<RankResponseDto> {
        return await this.organizationApplicationService.직급수정(id, updateRankDto);
    }

    @Delete('ranks/:id')
    @ApiOperation({ summary: '직급 삭제' })
    @ApiParam({ name: 'id', description: '직급 ID' })
    @ApiResponse({ status: 200 })
    async deleteRank(@Param('id') id: string): Promise<void> {
        return await this.organizationApplicationService.직급삭제(id);
    }

    // 직원 배치 관리 API
    @Get('employee-assignments')
    @ApiOperation({ summary: '전체 직원 배치 목록 조회 (직원/부서/직책/직급 정보 포함)' })
    @ApiResponse({ status: 200, type: [EmployeeAssignmentDetailResponseDto] })
    async getAllEmployeeAssignments(): Promise<EmployeeAssignmentDetailResponseDto[]> {
        return await this.organizationApplicationService.전체배치목록조회();
    }

    @Post('employee-assignments')
    @ApiOperation({ summary: '직원 부서/직책 배치' })
    @ApiBody({ type: AssignEmployeeRequestDto })
    @ApiResponse({ status: 201, type: EmployeeAssignmentResponseDto })
    async assignEmployee(@Body() assignEmployeeDto: AssignEmployeeRequestDto): Promise<EmployeeAssignmentResponseDto> {
        return await this.organizationApplicationService.직원배치(assignEmployeeDto);
    }

    @Put('employee-assignments/:id')
    @ApiOperation({ summary: '직원 부서/직책 변경' })
    @ApiParam({ name: 'id', description: '배치 ID' })
    @ApiBody({ type: UpdateEmployeeAssignmentRequestDto })
    @ApiResponse({ status: 200, type: EmployeeAssignmentResponseDto })
    async updateEmployeeAssignment(
        @Param('id') id: string,
        @Body() updateAssignmentDto: UpdateEmployeeAssignmentRequestDto,
    ): Promise<EmployeeAssignmentResponseDto> {
        return await this.organizationApplicationService.직원배치변경(id, updateAssignmentDto);
    }

    @Patch('employee-assignments/:id/manager-status')
    @ApiOperation({ summary: '직원 배치 관리자 상태 변경' })
    @ApiParam({ name: 'id', description: '배치 ID' })
    @ApiBody({ type: UpdateManagerStatusRequestDto })
    @ApiResponse({ status: 200, type: EmployeeAssignmentResponseDto, description: '관리자 상태 변경 성공' })
    @ApiResponse({ status: 404, description: '배치 정보를 찾을 수 없음' })
    async updateManagerStatus(
        @Param('id') id: string,
        @Body() updateManagerStatusDto: UpdateManagerStatusRequestDto,
    ): Promise<EmployeeAssignmentResponseDto> {
        return await this.organizationApplicationService.직원배치_관리자상태변경(id, updateManagerStatusDto);
    }

    @Delete('employee-assignments/:id')
    @ApiOperation({ summary: '직원 부서/직책 해제' })
    @ApiParam({ name: 'id', description: '배치 ID' })
    @ApiResponse({ status: 200 })
    async removeEmployeeAssignment(@Param('id') id: string): Promise<void> {
        return await this.organizationApplicationService.직원배치해제(id);
    }

    @Get('employees/:id/assignments')
    @ApiOperation({ summary: '직원 배치 현황 조회' })
    @ApiParam({ name: 'id', description: '직원 ID' })
    @ApiResponse({ status: 200, type: [EmployeeAssignmentResponseDto] })
    async getEmployeeAssignments(@Param('id') employeeId: string): Promise<EmployeeAssignmentResponseDto[]> {
        return await this.organizationApplicationService.직원배치현황조회(employeeId);
    }

    // 직급 이력 관리 API
    @Post('employees/:id/rank-promotion')
    @ApiOperation({ summary: '직원 직급 변경' })
    @ApiParam({ name: 'id', description: '직원 ID' })
    @ApiBody({ type: PromoteEmployeeRequestDto })
    @ApiResponse({ status: 201, type: EmployeeRankHistoryResponseDto })
    async promoteEmployee(
        @Param('id') employeeId: string,
        @Body() promoteDto: PromoteEmployeeRequestDto,
    ): Promise<EmployeeRankHistoryResponseDto> {
        return await this.organizationApplicationService.직원직급변경(employeeId, promoteDto);
    }

    @Get('employees/:id/rank-history')
    @ApiOperation({ summary: '직원 직급 이력 조회' })
    @ApiParam({ name: 'id', description: '직원 ID' })
    @ApiResponse({ status: 200, type: [EmployeeRankHistoryResponseDto] })
    async getEmployeeRankHistory(@Param('id') employeeId: string): Promise<EmployeeRankHistoryResponseDto[]> {
        return await this.organizationApplicationService.직원직급이력조회(employeeId);
    }
}

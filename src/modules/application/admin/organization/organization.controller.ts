import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../../libs/common/guards/jwt-auth.guard';
import { OrganizationApplicationService } from './organization-application.service';
import {
    CreateDepartmentRequestDto,
    UpdateDepartmentRequestDto,
    DepartmentResponseDto,
    DepartmentListResponseDto,
    CreateEmployeeRequestDto,
    UpdateEmployeeRequestDto,
    EmployeeResponseDto,
    EmployeeListResponseDto,
    CreatePositionRequestDto,
    UpdatePositionRequestDto,
    PositionResponseDto,
    CreateRankRequestDto,
    UpdateRankRequestDto,
    RankResponseDto,
    AssignEmployeeRequestDto,
    UpdateEmployeeAssignmentRequestDto,
    EmployeeAssignmentResponseDto,
    PromoteEmployeeRequestDto,
    EmployeeRankHistoryResponseDto,
} from './dto';

@ApiTags('Admin - 조직 관리')
@ApiBearerAuth()
@Controller('admin/organizations')
export class OrganizationController {
    constructor(private readonly organizationApplicationService: OrganizationApplicationService) {}

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

    // 직원 관리 API
    @Get('employees')
    @ApiOperation({ summary: '직원 목록 조회' })
    @ApiResponse({ status: 200, type: EmployeeListResponseDto })
    async getEmployees(): Promise<EmployeeListResponseDto> {
        return await this.organizationApplicationService.직원목록조회();
    }

    @Get('employees/:id')
    @ApiOperation({ summary: '직원 상세 조회' })
    @ApiParam({ name: 'id', description: '직원 ID' })
    @ApiResponse({ status: 200, type: EmployeeResponseDto })
    async getEmployee(@Param('id') id: string): Promise<EmployeeResponseDto> {
        return await this.organizationApplicationService.직원상세조회(id);
    }

    @Post('employees')
    @ApiOperation({ summary: '직원 생성' })
    @ApiBody({ type: CreateEmployeeRequestDto })
    @ApiResponse({ status: 201, type: EmployeeResponseDto })
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeRequestDto): Promise<EmployeeResponseDto> {
        return await this.organizationApplicationService.직원생성(createEmployeeDto);
    }

    @Put('employees/:id')
    @ApiOperation({ summary: '직원 수정' })
    @ApiParam({ name: 'id', description: '직원 ID' })
    @ApiBody({ type: UpdateEmployeeRequestDto })
    @ApiResponse({ status: 200, type: EmployeeResponseDto })
    async updateEmployee(
        @Param('id') id: string,
        @Body() updateEmployeeDto: UpdateEmployeeRequestDto,
    ): Promise<EmployeeResponseDto> {
        return await this.organizationApplicationService.직원수정(id, updateEmployeeDto);
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

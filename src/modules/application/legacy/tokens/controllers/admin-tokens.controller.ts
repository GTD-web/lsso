import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TokenResponseDto, CreateTokenDto, UpdateTokenStatusDto, RenewTokenDto } from '../dto';
import { ApiResponseDto } from '../../../../../../libs/common/dto/api-response.dto';
import { AdminTokensUsecase } from '../usecases/admin.usecase';

@ApiTags('관리자 토큰 API')
@Controller('admin/tokens')
export class AdminTokensController {
    constructor(private readonly adminTokensUsecase: AdminTokensUsecase) {}

    @Get()
    @ApiOperation({ summary: '토큰 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '토큰 목록 조회 성공',
        type: ApiResponseDto,
    })
    async findAll(): Promise<ApiResponseDto<TokenResponseDto[]>> {
        try {
            // 직원 정보와 함께 조회
            const tokensWithEmployee = await this.adminTokensUsecase.findAllWithEmployee();
            const tokenResponseDtos = tokensWithEmployee.map((token) => this.mapTokenToDto(token));
            return ApiResponseDto.success(tokenResponseDtos);
        } catch (error) {
            return ApiResponseDto.error('TOKENS_FETCH_ERROR', '토큰 목록을 조회하는 중 오류가 발생했습니다.');
        }
    }

    @Get('user/:employeeId')
    @ApiOperation({ summary: '직원별 토큰 조회' })
    @ApiParam({ name: 'employeeId', description: '직원 ID' })
    @ApiResponse({
        status: 200,
        description: '직원별 토큰 조회 성공',
        type: ApiResponseDto,
    })
    async findByEmployeeId(@Param('employeeId') employeeId: string): Promise<ApiResponseDto<TokenResponseDto[]>> {
        try {
            const tokens = await this.adminTokensUsecase.findByEmployeeId(employeeId);
            const tokenResponseDtos = tokens.map((token) => this.mapTokenToDto(token));
            return ApiResponseDto.success(tokenResponseDtos);
        } catch (error) {
            return ApiResponseDto.error('TOKENS_FETCH_ERROR', '직원별 토큰을 조회하는 중 오류가 발생했습니다.');
        }
    }

    @Get(':id')
    @ApiOperation({ summary: '토큰 상세 조회' })
    @ApiParam({ name: 'id', description: '토큰 ID' })
    @ApiResponse({
        status: 200,
        description: '토큰 상세 조회 성공',
        type: ApiResponseDto,
    })
    async findOne(@Param('id') id: string): Promise<ApiResponseDto<TokenResponseDto>> {
        try {
            // 직원 정보와 함께 조회
            const tokenWithEmployee = await this.adminTokensUsecase.findOneWithEmployee(id);
            const tokenResponseDto = this.mapTokenToDto(tokenWithEmployee);
            return ApiResponseDto.success(tokenResponseDto);
        } catch (error) {
            return ApiResponseDto.error('TOKEN_NOT_FOUND', `해당 ID의 토큰을 찾을 수 없습니다: ${id}`);
        }
    }

    @Post()
    @ApiOperation({ summary: '토큰 생성' })
    @ApiBody({ type: CreateTokenDto })
    @ApiResponse({
        status: 201,
        description: '토큰 생성 성공',
        type: ApiResponseDto,
    })
    async create(@Body() createTokenDto: CreateTokenDto): Promise<ApiResponseDto<TokenResponseDto>> {
        try {
            const token = await this.adminTokensUsecase.createToken(createTokenDto);
            const tokenResponseDto = this.mapTokenToDto(token);
            return ApiResponseDto.success(tokenResponseDto);
        } catch (error) {
            return ApiResponseDto.error('TOKEN_CREATE_ERROR', '토큰 생성 중 오류가 발생했습니다.');
        }
    }

    @Put(':id/status')
    @ApiOperation({ summary: '토큰 상태 변경' })
    @ApiParam({ name: 'id', description: '토큰 ID' })
    @ApiBody({ type: UpdateTokenStatusDto })
    @ApiResponse({
        status: 200,
        description: '토큰 상태 변경 성공',
        type: ApiResponseDto,
    })
    async updateStatus(
        @Param('id') id: string,
        @Body() updateTokenStatusDto: UpdateTokenStatusDto,
    ): Promise<ApiResponseDto<TokenResponseDto>> {
        try {
            const token = await this.adminTokensUsecase.updateStatus(id, updateTokenStatusDto.isActive);
            const tokenResponseDto = this.mapTokenToDto(token);
            return ApiResponseDto.success(tokenResponseDto);
        } catch (error) {
            return ApiResponseDto.error(
                'TOKEN_UPDATE_ERROR',
                `토큰 상태 변경 중 오류가 발생했습니다: ${error.message}`,
            );
        }
    }

    @Put(':id/renew')
    @ApiOperation({ summary: '토큰 갱신' })
    @ApiParam({ name: 'id', description: '토큰 ID' })
    @ApiBody({ type: RenewTokenDto })
    @ApiResponse({
        status: 200,
        description: '토큰 갱신 성공',
        type: ApiResponseDto,
    })
    async renewToken(
        @Param('id') id: string,
        @Body() renewTokenDto: RenewTokenDto,
    ): Promise<ApiResponseDto<TokenResponseDto>> {
        try {
            const token = await this.adminTokensUsecase.renewToken(id, renewTokenDto);
            const tokenResponseDto = this.mapTokenToDto(token);
            return ApiResponseDto.success(tokenResponseDto);
        } catch (error) {
            return ApiResponseDto.error('TOKEN_RENEW_ERROR', `토큰 갱신 중 오류가 발생했습니다: ${error.message}`);
        }
    }

    @Put(':id/refresh')
    @ApiOperation({ summary: '리프레시 토큰으로 액세스 토큰 갱신' })
    @ApiParam({ name: 'id', description: '토큰 ID' })
    @ApiResponse({
        status: 200,
        description: '액세스 토큰 갱신 성공',
        type: ApiResponseDto,
    })
    async refreshToken(@Param('id') id: string): Promise<ApiResponseDto<TokenResponseDto>> {
        try {
            const token = await this.adminTokensUsecase.refreshTokens(id);
            const tokenResponseDto = this.mapTokenToDto(token);
            return ApiResponseDto.success(tokenResponseDto);
        } catch (error) {
            return ApiResponseDto.error(
                'TOKEN_REFRESH_ERROR',
                `리프레시 토큰을 사용한 액세스 토큰 갱신 중 오류가 발생했습니다: ${error.message}`,
            );
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: '토큰 삭제' })
    @ApiParam({ name: 'id', description: '토큰 ID' })
    @ApiResponse({
        status: 200,
        description: '토큰 삭제 성공',
        type: ApiResponseDto,
    })
    async remove(@Param('id') id: string): Promise<ApiResponseDto<boolean>> {
        try {
            await this.adminTokensUsecase.remove(id);
            return ApiResponseDto.success(true);
        } catch (error) {
            return ApiResponseDto.error('TOKEN_DELETE_ERROR', `토큰 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    }

    // Token 엔티티를 TokenResponseDto로 변환하는 유틸리티 메서드
    private mapTokenToDto(token: any): TokenResponseDto {
        const responseDto = new TokenResponseDto();
        responseDto.id = token.id;
        responseDto.accessToken = token.accessToken;
        responseDto.refreshToken = token.refreshToken;
        responseDto.tokenExpiresAt = token.tokenExpiresAt;
        responseDto.refreshTokenExpiresAt = token.refreshTokenExpiresAt;
        responseDto.lastAccess = token.lastAccess;
        responseDto.isActive = token.isActive;
        responseDto.createdAt = token.createdAt;
        responseDto.updatedAt = token.updatedAt;

        // Employee 정보 매핑 (EmployeeToken 중간테이블을 통해 조회된 데이터)
        if (token.employee) {
            responseDto.userId = token.employee.id; // Employee ID를 userId로 사용
            responseDto.userName = token.employee.name;
            responseDto.userEmail = token.employee.email;
        } else {
            // Employee 정보가 없는 경우 기본값 설정
            responseDto.userId = null;
            responseDto.userName = null;
            responseDto.userEmail = null;
        }

        return responseDto;
    }
}

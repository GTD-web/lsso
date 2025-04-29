import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TokensService } from './tokens.service';
import { TokenResponseDto, CreateTokenDto, UpdateTokenStatusDto, RenewTokenDto } from './dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('관리자 토큰 API')
@Controller('admin/tokens')
export class AdminTokensController {
    constructor(private readonly tokensService: TokensService) {}

    @Get()
    @ApiOperation({ summary: '토큰 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '토큰 목록 조회 성공',
        type: ApiResponseDto,
    })
    async findAll(): Promise<ApiResponseDto<TokenResponseDto[]>> {
        try {
            const tokens = await this.tokensService.findAll();
            const tokenResponseDtos = tokens.map((token) => this.mapTokenToDto(token));
            return ApiResponseDto.success(tokenResponseDtos);
        } catch (error) {
            return ApiResponseDto.error('TOKENS_FETCH_ERROR', '토큰 목록을 조회하는 중 오류가 발생했습니다.');
        }
    }

    @Get('system/:systemId')
    @ApiOperation({ summary: '시스템별 토큰 조회' })
    @ApiParam({ name: 'systemId', description: '시스템 ID' })
    @ApiResponse({
        status: 200,
        description: '시스템별 토큰 조회 성공',
        type: ApiResponseDto,
    })
    async findBySystemId(@Param('systemId') systemId: string): Promise<ApiResponseDto<TokenResponseDto[]>> {
        try {
            const tokens = await this.tokensService.findBySystemId(systemId);
            const tokenResponseDtos = tokens.map((token) => this.mapTokenToDto(token));
            return ApiResponseDto.success(tokenResponseDtos);
        } catch (error) {
            return ApiResponseDto.error('TOKENS_FETCH_ERROR', '시스템별 토큰을 조회하는 중 오류가 발생했습니다.');
        }
    }

    @Get('user/:userId')
    @ApiOperation({ summary: '사용자별 토큰 조회' })
    @ApiParam({ name: 'userId', description: '사용자 ID' })
    @ApiResponse({
        status: 200,
        description: '사용자별 토큰 조회 성공',
        type: ApiResponseDto,
    })
    async findByUserId(@Param('userId') userId: string): Promise<ApiResponseDto<TokenResponseDto[]>> {
        try {
            const tokens = await this.tokensService.findByUserId(userId);
            const tokenResponseDtos = tokens.map((token) => this.mapTokenToDto(token));
            return ApiResponseDto.success(tokenResponseDtos);
        } catch (error) {
            return ApiResponseDto.error('TOKENS_FETCH_ERROR', '사용자별 토큰을 조회하는 중 오류가 발생했습니다.');
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
            const token = await this.tokensService.findOne(id);
            const tokenResponseDto = this.mapTokenToDto(token);
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
            const token = await this.tokensService.createToken(createTokenDto);
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
            const token = await this.tokensService.updateStatus(id, updateTokenStatusDto.isActive);
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
            const token = await this.tokensService.renewToken(id, renewTokenDto);
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
            const token = await this.tokensService.refreshTokens(id);
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
            await this.tokensService.remove(id);
            return ApiResponseDto.success(true);
        } catch (error) {
            return ApiResponseDto.error('TOKEN_DELETE_ERROR', `토큰 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    }

    // Token 엔티티를 TokenResponseDto로 변환하는 유틸리티 메서드
    private mapTokenToDto(token: any): TokenResponseDto {
        const responseDto = new TokenResponseDto();
        responseDto.id = token.id;
        responseDto.userId = token.userId;
        responseDto.systemId = token.systemId;
        responseDto.accessToken = token.accessToken;
        responseDto.refreshToken = token.refreshToken;
        responseDto.secret = token.secret;
        responseDto.tokenExpiresAt = token.tokenExpiresAt;
        responseDto.refreshTokenExpiresAt = token.refreshTokenExpiresAt;
        responseDto.lastAccess = token.lastAccess;
        responseDto.isActive = token.isActive;
        responseDto.createdAt = token.createdAt;
        responseDto.updatedAt = token.updatedAt;

        // 관계 데이터 추가
        if (token.user) {
            responseDto.userName = token.user.name;
            responseDto.userEmail = token.user.email;
        }

        if (token.system) {
            responseDto.systemName = token.system.name;
        }

        return responseDto;
    }
}

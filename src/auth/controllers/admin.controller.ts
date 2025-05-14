import { Controller, Get, Post, Body, UseGuards, Req, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminUseCase } from '../usecases/admin.usecase';
import {
    ChangePasswordDto,
    AdminResponseDto,
    AdminLoginDto,
    AdminLoginResponseDto,
    AdminProfileDto,
    AdminTokenVerifyDto,
    AdminTokenRefreshDto,
    TokenResponseDto,
} from '../dto/admin';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request } from 'express';
import { ApiResponseDto } from '../../common/dto/api-response.dto';

interface RequestWithUser extends Request {
    user: {
        sub: string;
        email: string;
        role: string;
    };
}

@ApiTags('관리자 인증 API')
@Controller('admin/auth')
export class AdminAuthController {
    constructor(private readonly adminUseCase: AdminUseCase) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '관리자 로그인' })
    @ApiBody({ type: AdminLoginDto })
    @ApiResponse({
        status: 200,
        description: '로그인 성공',
        type: () => ApiResponseDto<AdminLoginResponseDto>,
    })
    async login(@Body() loginDto: AdminLoginDto): Promise<ApiResponseDto<AdminLoginResponseDto>> {
        const result = await this.adminUseCase.login(loginDto.email, loginDto.password);
        return ApiResponseDto.success(result);
    }

    @Post('verify')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '토큰 검증' })
    @ApiBody({ type: AdminTokenVerifyDto })
    @ApiResponse({
        status: 200,
        description: '토큰 검증 성공',
        type: () => ApiResponseDto<AdminLoginResponseDto>,
    })
    async verifyToken(@Body() verifyDto: AdminTokenVerifyDto): Promise<ApiResponseDto<AdminLoginResponseDto>> {
        const result = await this.adminUseCase.verifyToken(verifyDto.token);
        return ApiResponseDto.success(result);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '토큰 갱신' })
    @ApiBody({ type: AdminTokenRefreshDto })
    @ApiResponse({
        status: 200,
        description: '토큰 갱신 성공',
        type: () => ApiResponseDto<TokenResponseDto>,
    })
    async refreshToken(@Body() refreshDto: AdminTokenRefreshDto): Promise<ApiResponseDto<TokenResponseDto>> {
        const result = await this.adminUseCase.refreshToken(refreshDto.refreshToken);
        return ApiResponseDto.success(result);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '내 정보 조회' })
    @ApiResponse({
        status: 200,
        description: '관리자 정보',
        type: () => ApiResponseDto<AdminProfileDto>,
    })
    async getProfile(@Req() req: RequestWithUser): Promise<ApiResponseDto<AdminProfileDto>> {
        const adminId = req.user.sub;
        const result = await this.adminUseCase.getProfile(adminId);
        return ApiResponseDto.success(result);
    }

    @Put('password')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '비밀번호 변경' })
    @ApiBody({ type: ChangePasswordDto })
    @ApiResponse({
        status: 200,
        description: '비밀번호 변경 성공',
        type: () => ApiResponseDto<{ success: boolean }>,
    })
    async changePassword(
        @Req() req: RequestWithUser,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<ApiResponseDto<{ success: boolean }>> {
        const adminId = req.user.sub;
        const result = await this.adminUseCase.changePassword(
            adminId,
            changePasswordDto.currentPassword,
            changePasswordDto.newPassword,
        );
        return ApiResponseDto.success(result);
    }
}

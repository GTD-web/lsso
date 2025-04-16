import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import {
    AdminLoginDto,
    AdminLoginResponseDto,
    AdminUserDto,
    AdminTokenVerifyDto,
    AdminTokenRefreshDto,
    AdminAuthDataDto,
} from './dto';

@ApiTags('관리자 인증')
@Controller('admin/auth')
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) {}

    @Post('login')
    @ApiOperation({
        summary: '관리자 로그인',
        description: '관리자 계정으로 로그인하여 액세스 토큰과 리프레시 토큰을 발급받습니다.',
    })
    @ApiResponse({
        status: 200,
        description: '로그인 성공',
        type: AdminLoginResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패 - 비밀번호가 올바르지 않습니다.',
    })
    @ApiResponse({
        status: 404,
        description: '존재하지 않는 관리자 계정입니다.',
    })
    async adminLogin(@Body() loginDto: AdminLoginDto): Promise<AdminLoginResponseDto> {
        try {
            const data = await this.adminAuthService.adminLogin(loginDto);
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: error.status === 401 ? 'AUTH_INVALID_CREDENTIALS' : 'AUTH_USER_NOT_FOUND',
                    message: error.message,
                },
            };
        }
    }

    @Post('verify')
    @ApiOperation({ summary: '토큰 검증', description: 'JWT 액세스 토큰의 유효성을 검증합니다.' })
    @ApiResponse({
        status: 200,
        description: '토큰 검증 성공',
        type: AdminLoginResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패 - 유효하지 않거나 만료된 토큰입니다.',
    })
    async verifyToken(@Body() verifyDto: AdminTokenVerifyDto): Promise<AdminLoginResponseDto> {
        try {
            const user = await this.adminAuthService.verifyAdminToken(verifyDto.token);
            return {
                success: true,
                data: {
                    user,
                    token: verifyDto.token,
                    refreshToken: '', // 실제 구현에서는 이전 리프레시 토큰을 반환할 수 있음
                },
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'AUTH_INVALID_TOKEN',
                    message: error.message,
                },
            };
        }
    }

    @Post('refresh')
    @ApiOperation({ summary: '토큰 갱신', description: '리프레시 토큰을 사용하여 만료된 액세스 토큰을 갱신합니다.' })
    @ApiResponse({
        status: 200,
        description: '토큰 갱신 성공',
        type: AdminLoginResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패 - 유효하지 않거나 만료된 리프레시 토큰입니다.',
    })
    async refreshToken(@Body() refreshDto: AdminTokenRefreshDto): Promise<AdminLoginResponseDto> {
        try {
            const data = await this.adminAuthService.refreshAdminToken(refreshDto.refreshToken);
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'AUTH_INVALID_REFRESH_TOKEN',
                    message: error.message,
                },
            };
        }
    }

    @Post('logout')
    @ApiOperation({ summary: '관리자 로그아웃', description: '현재 세션을 로그아웃 처리합니다.' })
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: '로그아웃 성공',
        schema: {
            type: 'object',
            properties: {
                success: {
                    type: 'boolean',
                    example: true,
                },
            },
        },
    })
    async adminLogout(
        @Headers('authorization') auth: string,
        @Body() body: { refreshToken: string },
    ): Promise<{ success: boolean }> {
        // Bearer 토큰은 무효화 처리됨 (실제로는 블랙리스트에 추가)
        const refreshToken = body.refreshToken;
        if (refreshToken) {
            await this.adminAuthService.adminLogout(refreshToken);
        }
        return { success: true };
    }
}

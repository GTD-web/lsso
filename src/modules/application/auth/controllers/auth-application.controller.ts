import {
    Controller,
    Post,
    Body,
    HttpCode,
    Headers,
    BadRequestException,
    HttpStatus,
    UnauthorizedException,
    Req,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiBasicAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthApplicationService } from '../auth-application.service';
import {
    LoginRequestDto,
    LoginResponseDto,
    TokenVerifyResponseDto,
    ChangePasswordRequestDto,
    ChangePasswordResponseDto,
    CheckPasswordRequestDto,
    CheckPasswordResponseDto,
} from '../dto';

@ApiTags('외부 시스템 인증 API')
@Controller('auth')
export class AuthApplicationController {
    constructor(private readonly authApplicationService: AuthApplicationService) {}

    @ApiBasicAuth()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '로그인 및 토큰 발급',
        description:
            '외부 시스템이 Basic Auth로 인증한 후, 사용자 이메일/비밀번호를 검증하고 액세스 토큰을 발급합니다.',
    })
    @ApiHeader({
        name: 'basic-auth',
        description: 'Basic Auth 헤더, 형식: Basic base64(clientId:clientSecret)',
        required: false,
    })
    @ApiBody({ type: LoginRequestDto })
    @ApiResponse({
        status: 200,
        description: '로그인 성공 및 토큰 발급 성공',
        type: LoginResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    @ApiResponse({ status: 401, description: '시스템 인증 실패 또는 사용자 로그인 실패' })
    @ApiResponse({ status: 404, description: '사용자 또는 시스템을 찾을 수 없음' })
    async tokenRoute(
        @Headers('Authorization') authHeader: string,
        @Body() body: LoginRequestDto,
        @Req() req: Request,
    ): Promise<LoginResponseDto> {
        // 시스템 인증
        const system = await this.authApplicationService.authenticateSystem(authHeader);

        // 클라이언트 정보 수집
        const ipAddress = req.ip || req.connection.remoteAddress || '';
        const userAgent = req.get('User-Agent') || '';

        // 토큰 요청 처리 (사용자 로그인 또는 리프레시 토큰 처리)
        try {
            const result = await this.authApplicationService.handleTokenRequest(system, body, ipAddress, userAgent);
            return { ...result, system: system.name };
        } catch (error) {
            throw new UnauthorizedException({ message: error.message, system: system?.name || null });
        }
    }

    @ApiBearerAuth()
    @Post('verify')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '토큰 검증' })
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer 토큰, 형식: Bearer {access_token}',
        required: false,
    })
    @ApiResponse({
        status: 200,
        description: '토큰 검증 성공',
        type: TokenVerifyResponseDto,
    })
    @ApiResponse({ status: 401, description: '유효하지 않은 토큰' })
    async verifyToken(@Headers('Authorization') authHeader: string): Promise<TokenVerifyResponseDto> {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new BadRequestException('유효한 Bearer 토큰이 필요합니다.');
        }

        const token = authHeader.split(' ')[1];
        return this.authApplicationService.verifyToken(token);
    }

    @ApiBearerAuth()
    @Post('change-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '비밀번호 변경',
        description: '사용자의 비밀번호를 변경합니다.',
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer 토큰, 형식: Bearer {access_token}',
        required: true,
    })
    @ApiBody({ type: ChangePasswordRequestDto })
    @ApiResponse({
        status: 200,
        description: '비밀번호 변경 성공',
        type: ChangePasswordResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async changePassword(
        @Headers('Authorization') authHeader: string,
        @Body() body: ChangePasswordRequestDto,
    ): Promise<ChangePasswordResponseDto> {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('유효한 Bearer 토큰이 필요합니다.');
        }

        const token = authHeader.split(' ')[1];
        return this.authApplicationService.changePassword(token, body.newPassword);
    }

    @ApiBearerAuth()
    @Post('check-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '비밀번호 확인',
        description: '현재 비밀번호가 일치하는지 확인합니다.',
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer 토큰, 형식: Bearer {access_token}',
        required: true,
    })
    @ApiBody({ type: CheckPasswordRequestDto })
    @ApiResponse({
        status: 200,
        description: '비밀번호 확인 성공',
        type: CheckPasswordResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async checkPassword(
        @Headers('Authorization') authHeader: string,
        @Body() body: CheckPasswordRequestDto,
    ): Promise<CheckPasswordResponseDto> {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('유효한 Bearer 토큰이 필요합니다.');
        }

        const token = authHeader.split(' ')[1];
        return this.authApplicationService.checkPassword(token, body.currentPassword, body.email);
    }
}

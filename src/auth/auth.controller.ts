import { Controller, Post, Get, Body, UseGuards, Req, Query, Param, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto, RefreshTokenDto, RefreshTokenResponseDto } from './dto';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Token } from '../common/decorators/auth.decorator';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiResponse({
        status: 200,
        description: '로그인 성공',
        type: LoginResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '비밀번호가 일치하지 않습니다.',
    })
    @ApiResponse({
        status: 404,
        description: '존재하지 않는 시스템입니다. / 존재하지 않는 사용자입니다.',
    })
    @ApiResponse({
        status: 500,
        description: '서버 오류',
    })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        try {
            const result = await this.authService.login(loginDto);
            return result;
        } catch (error) {
            console.log('error', error);
            return {
                success: false,
                error: {
                    code: 'AUTH_INVALID_TOKEN',
                    message: error.message,
                },
            };
        }
    }

    @Post('verify')
    @ApiResponse({
        status: 200,
        description: '토큰 검증 성공',
        type: Boolean,
    })
    @ApiResponse({
        status: 401,
        description: '토큰이 없습니다. / 만료된 토큰입니다. / 유효하지 않은 토큰입니다.',
    })
    @ApiResponse({
        status: 404,
        description: '존재하지 않는 토큰입니다.',
    })
    @ApiResponse({
        status: 500,
        description: '서버 오류',
    })
    @ApiBearerAuth()
    async verify(@Token() token: string): Promise<boolean> {
        return this.authService.verifyToken(token);
    }

    @Post('refresh')
    @ApiBody({ type: RefreshTokenDto })
    @ApiResponse({
        status: 200,
        description: '액세스 토큰 갱신 성공',
        type: RefreshTokenResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '리프레시 토큰이 유효하지 않습니다.',
    })
    @ApiResponse({
        status: 404,
        description: '존재하지 않는 토큰입니다.',
    })
    @ApiResponse({
        status: 500,
        description: '서버 오류',
    })
    @ApiBearerAuth()
    async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
        return this.authService.refreshAccessToken(refreshTokenDto);
    }

    //     @Post('logout')
    //     @ApiBody({ schema: { properties: { token: { type: 'string' } } } })
    //     @ApiResponse({
    //         status: 200,
    //         description: '로그아웃 성공',
    //         schema: { properties: { success: { type: 'boolean' } } },
    //     })
    //     @ApiResponse({
    //         status: 404,
    //         description: '존재하지 않는 토큰입니다.',
    //     })
    //     async logout(@Body('token') token: string): Promise<{ success: boolean }> {
    //         return this.authService.logout(token);
    //     }

    //     @Get('user-info')
    //     @ApiResponse({
    //         status: 200,
    //         description: '사용자 정보 조회 성공',
    //     })
    //     @ApiResponse({
    //         status: 401,
    //         description: '인증되지 않은 요청입니다.',
    //     })
    //     async getUserInfo(@Token() token: string) {
    //         return this.authService.getUserInfo(token);
    //     }

    //     @Get('authorize')
    //     @ApiQuery({ name: 'client_id', description: '클라이언트 ID', required: true })
    //     @ApiQuery({ name: 'redirect_uri', description: '리다이렉트 URI', required: true })
    //     @ApiQuery({ name: 'response_type', description: '응답 타입 (code)', required: true })
    //     @ApiQuery({ name: 'scope', description: '요청 스코프 (쉼표로 구분)', required: false })
    //     @ApiQuery({ name: 'state', description: '클라이언트 상태', required: false })
    //     @ApiResponse({
    //         status: 302,
    //         description: '인증 페이지로 리다이렉션',
    //     })
    //     async authorize(
    //         @Query('client_id') clientId: string,
    //         @Query('redirect_uri') redirectUri: string,
    //         @Query('response_type') responseType: string,
    //         @Query('scope') scope: string,
    //         @Query('state') state: string,
    //     ) {
    //         return this.authService.generateAuthorizationRedirect(clientId, redirectUri, responseType, scope, state);
    //     }

    //     @Post('token')
    //     @HttpCode(200)
    //     @ApiBody({
    //         schema: {
    //             properties: {
    //                 grant_type: { type: 'string', enum: ['authorization_code', 'refresh_token'] },
    //                 code: { type: 'string' },
    //                 redirect_uri: { type: 'string' },
    //                 client_id: { type: 'string' },
    //                 client_secret: { type: 'string' },
    //                 refresh_token: { type: 'string' },
    //             },
    //         },
    //     })
    //     @ApiResponse({
    //         status: 200,
    //         description: '토큰 발급 성공',
    //         schema: {
    //             properties: {
    //                 access_token: { type: 'string' },
    //                 token_type: { type: 'string' },
    //                 expires_in: { type: 'number' },
    //                 refresh_token: { type: 'string' },
    //             },
    //         },
    //     })
    //     @ApiResponse({
    //         status: 400,
    //         description: '잘못된 요청',
    //     })
    //     async token(@Body() tokenRequest: any) {
    //         return this.authService.handleTokenRequest(tokenRequest);
    //     }

    //     @Get('validate-session')
    //     @ApiQuery({ name: 'session_token', description: '세션 토큰', required: true })
    //     @ApiResponse({
    //         status: 200,
    //         description: '세션 유효성 검증 결과',
    //         schema: { properties: { valid: { type: 'boolean' }, user: { type: 'object' } } },
    //     })
    //     async validateSession(@Query('session_token') sessionToken: string) {
    //         return this.authService.validateSession(sessionToken);
    //     }

    //     @Post('revoke')
    //     @ApiBody({
    //         schema: {
    //             properties: {
    //                 token: { type: 'string' },
    //                 token_type_hint: { type: 'string', enum: ['access_token', 'refresh_token'] },
    //             },
    //         },
    //     })
    //     @ApiResponse({
    //         status: 200,
    //         description: '토큰 폐기 성공',
    //         schema: { properties: { success: { type: 'boolean' } } },
    //     })
    //     async revokeToken(@Body('token') token: string, @Body('token_type_hint') tokenTypeHint: string) {
    //         return this.authService.revokeToken(token, tokenTypeHint);
    //     }
}

import {
    Controller,
    Post,
    Get,
    Body,
    UseGuards,
    Req,
    Query,
    Param,
    HttpCode,
    Headers,
    BadRequestException,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
// import { LoginDto, LoginResponseDto, RefreshTokenDto, RefreshTokenResponseDto } from '../dto';
import {
    ApiTags,
    ApiResponse,
    ApiBearerAuth,
    ApiBody,
    ApiParam,
    ApiQuery,
    ApiHeader,
    ApiOperation,
    ApiBasicAuth,
} from '@nestjs/swagger';
import { Token } from '../../common/decorators/auth.decorator';
import { ClientUseCase } from '../usecases/client.usecase';
import { Request } from 'express';

@ApiTags('외부 시스템 인증 API')
@Controller('auth')
export class ClientAuthController {
    constructor(private readonly authService: AuthService, private readonly clientUseCase: ClientUseCase) {}

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
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                grant_type: {
                    type: 'string',
                    enum: ['password', 'refresh_token'],
                    description: 'password: 사용자 인증 방식, refresh_token: 리프레시 토큰 방식',
                },
                username: {
                    type: 'string',
                    description: '사용자 이메일 (grant_type이 password인 경우에만 필요)',
                },
                password: {
                    type: 'string',
                    description: '사용자 비밀번호 (grant_type이 password인 경우에만 필요)',
                },
                refresh_token: {
                    type: 'string',
                    description: '리프레시 토큰 (grant_type이 refresh_token인 경우에만 필요)',
                },
            },
            required: ['grant_type'],
            example: {
                grant_type: 'password',
                username: 'user@example.com',
                password: 'password123',
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: '로그인 성공 및 토큰 발급 성공',
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string' },
                token_type: { type: 'string', example: 'Bearer' },
                expires_in: { type: 'number', example: 86400 },
                refresh_token: { type: 'string' },
                refresh_token_expires_in: { type: 'number', example: 2592000 },
                user_info: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        employee_number: { type: 'string' },
                        department: { type: 'string' },
                        position: { type: 'string' },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    @ApiResponse({ status: 401, description: '시스템 인증 실패 또는 사용자 로그인 실패' })
    @ApiResponse({ status: 404, description: '사용자 또는 시스템을 찾을 수 없음' })
    async tokenRoute(@Headers('Authorization') authHeader: string, @Body() body: any) {
        // 시스템 인증
        const system = await this.clientUseCase.authenticateSystem(authHeader);

        // 토큰 요청 처리 (사용자 로그인 또는 리프레시 토큰 처리)
        try {
            return { ...(await this.clientUseCase.handleTokenRequest(system, body)), system: system.name };
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
        schema: {
            type: 'object',
            properties: {
                valid: { type: 'boolean', example: true },
                user_info: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        employee_number: { type: 'string' },
                    },
                },
                expires_in: { type: 'number', example: 86400 },
            },
        },
    })
    @ApiResponse({ status: 401, description: '유효하지 않은 토큰' })
    async verifyToken(@Headers('Authorization') authHeader: string) {
        console.log('authHeader', authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new BadRequestException('유효한 Bearer 토큰이 필요합니다.');
        }

        const token = authHeader.split(' ')[1];
        // 토큰 검증 로직은 추후 구현
        // return this.clientUseCase.verifyToken(token);

        // 임시 응답
        return { valid: true, message: '토큰 검증 기능은 아직 구현되지 않았습니다.' };
    }
}

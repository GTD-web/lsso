import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Token } from '../common/decorators/auth.decorator';

@ApiTags('인증')
@Controller('auth')
@ApiBearerAuth()
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
        return this.authService.login(loginDto);
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
    async verify(@Token() token: string): Promise<boolean> {
        return this.authService.verifyToken(token);
    }
}

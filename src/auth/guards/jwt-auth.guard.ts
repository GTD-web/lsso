import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly jwtSecret: string;

    constructor(private jwtService: JwtService, private configService: ConfigService) {
        super();
        this.jwtSecret = this.configService.get<string>('JWT_SECRET') || 'admin-secret-key';
    }

    canActivate(context: ExecutionContext) {
        // 요청에서 토큰 가져오기
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log('token', token);
        if (!token) {
            throw new UnauthorizedException('인증 토큰이 없습니다.');
        }

        try {
            // 토큰 검증
            const payload = this.jwtService.verify(token, {
                secret: this.jwtSecret,
            });
            // 요청 객체에 사용자 정보 추가
            request.user = payload;

            return true;
        } catch (error) {
            throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        }
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

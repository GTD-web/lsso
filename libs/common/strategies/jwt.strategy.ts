import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthorizationContextService } from '../../../src/modules/context/authorization/authorization-context.service';

export interface JwtPayload {
    sub: string; // employee.id
    employeeNumber: string;
    type: 'access' | 'refresh';
    iat?: number;
    exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authorizationContextService: AuthorizationContextService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('GLOBAL_SECRET'),
            passReqToCallback: true, // request 객체를 validate 메서드에 전달
        });
    }

    async validate(req: any, payload: JwtPayload) {
        try {
            // Authorization 헤더에서 토큰 추출
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new UnauthorizedException('유효하지 않은 토큰 형식입니다.');
            }

            const accessToken = authHeader.split(' ')[1];

            // 기존 토큰 검증 로직 활용 (DB 조회 + 만료일 확인 포함)
            const { employee, token } = await this.authorizationContextService.엑세스토큰을_검증한다(accessToken);

            // request.user에 할당될 객체 반환
            return {
                id: employee.id,
                employeeNumber: employee.employeeNumber,
                name: employee.name,
                email: employee.email,
                status: employee.status,
                currentRankId: employee.currentRankId,
                token: {
                    id: token.id,
                    expiresAt: token.tokenExpiresAt,
                },
            };
        } catch (error) {
            throw new UnauthorizedException('토큰 검증에 실패했습니다.');
        }
    }
}

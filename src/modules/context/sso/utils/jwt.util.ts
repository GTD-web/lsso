import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
    sub: string;
    name: string;
    email: string;
    employee_number: string;
    iat?: number;
    exp?: number;
}

@Injectable()
export class JwtUtil {
    private readonly jwtSecret: string;

    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
        this.jwtSecret = this.configService.get<string>('GLOBAL_SECRET');
    }

    /**
     * JWT 액세스 토큰을 생성합니다
     */
    generateAccessToken(사용자정보: { id: string; name: string; email: string; employeeNumber: string }): string {
        const payload: JwtPayload = {
            sub: 사용자정보.id,
            name: 사용자정보.name,
            email: 사용자정보.email,
            employee_number: 사용자정보.employeeNumber,
        };

        return this.jwtService.sign(payload, {
            secret: this.jwtSecret,
            expiresIn: '1d', // 24시간
        });
    }

    /**
     * JWT 리프레시 토큰을 생성합니다
     */
    generateRefreshToken(사용자정보: { id: string; name: string; email: string; employeeNumber: string }): string {
        const payload: JwtPayload = {
            sub: 사용자정보.id,
            name: 사용자정보.name,
            email: 사용자정보.email,
            employee_number: 사용자정보.employeeNumber,
        };

        return this.jwtService.sign(payload, {
            secret: this.jwtSecret,
            expiresIn: '30d', // 30일
        });
    }

    /**
     * JWT 토큰을 검증하고 페이로드를 반환합니다
     */
    verifyToken(token: string): JwtPayload {
        return this.jwtService.verify(token, { secret: this.jwtSecret });
    }

    /**
     * 토큰에서 사용자 ID를 추출합니다
     */
    extractUserIdFromToken(token: string): string {
        const payload = this.verifyToken(token);
        return payload.sub;
    }
}

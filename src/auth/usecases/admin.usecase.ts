import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { AdminLoginResponseDto, AdminProfileDto, TokenResponseDto } from '../dto/admin';

@Injectable()
export class AdminUseCase {
    private readonly jwtSecret: string;

    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtSecret = this.configService.get<string>('JWT_SECRET') || 'admin-secret-key';
    }

    /**
     * 관리자 로그인
     */
    async login(email: string, password: string): Promise<AdminLoginResponseDto> {
        // 이메일로 사용자 찾기
        const admin = await this.authService.findByEmail(email);
        if (!admin) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        // 비밀번호 검증
        const isPasswordValid = await admin.validatePassword(password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        // JWT 토큰 생성
        const payload = { sub: admin.id, email: admin.email, role: admin.role };

        // 비밀번호 제외하고 반환
        const { password: _, ...adminInfo } = admin;

        return {
            accessToken: this.jwtService.sign(payload, {
                secret: this.jwtSecret,
                expiresIn: '1h',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: this.jwtSecret,
                expiresIn: '7d',
            }),
            admin: adminInfo,
        };
    }

    /**
     * 토큰 검증
     */
    async verifyToken(token: string): Promise<AdminLoginResponseDto> {
        try {
            // 토큰 디코딩
            const payload = this.jwtService.verify(token, {
                secret: this.jwtSecret,
            });

            // 관리자 정보 조회
            const admin = await this.authService.findOne(payload.sub);
            if (!admin) {
                throw new UnauthorizedException('유효하지 않은 토큰입니다.');
            }

            // 비밀번호 제외하고 반환
            const { password: _, ...adminInfo } = admin;

            return {
                accessToken: token,
                refreshToken: '', // 검증 시에는 refresh 토큰 반환하지 않음
                admin: adminInfo,
            };
        } catch (error) {
            throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        }
    }

    /**
     * 토큰 갱신
     */
    async refreshToken(refreshToken: string): Promise<TokenResponseDto> {
        try {
            // 리프레시 토큰 디코딩
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.jwtSecret,
            });

            // 관리자 정보 조회
            const admin = await this.authService.findOne(payload.sub);
            if (!admin) {
                throw new UnauthorizedException('유효하지 않은 토큰입니다.');
            }

            // 새 토큰 발급
            const newPayload = { sub: admin.id, email: admin.email, role: admin.role };

            return {
                accessToken: this.jwtService.sign(newPayload, {
                    secret: this.jwtSecret,
                    expiresIn: '1h',
                }),
                refreshToken: this.jwtService.sign(newPayload, {
                    secret: this.jwtSecret,
                    expiresIn: '7d',
                }),
                expiresIn: 3600, // 1시간 (초 단위)
            };
        } catch (error) {
            throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
        }
    }

    /**
     * 관리자 프로필 조회
     */
    async getProfile(adminId: string): Promise<AdminProfileDto> {
        try {
            const admin = await this.authService.findOne(adminId);
            return {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new UnauthorizedException('관리자 정보를 찾을 수 없습니다.');
            }
            throw error;
        }
    }

    /**
     * 비밀번호 변경
     */
    async changePassword(adminId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean }> {
        const result = await this.authService.changePassword(adminId, currentPassword, newPassword);

        if (!result) {
            throw new UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
        }

        return { success: true };
    }
}

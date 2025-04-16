import { Injectable, UnauthorizedException, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminLoginDto, AdminAuthDataDto, AdminUserDto } from './dto';
import { Admin } from './entities/admin.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class AdminAuthService {
    private readonly logger = new Logger(AdminAuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        @InjectRepository(RefreshToken)
        private refreshTokenRepository: Repository<RefreshToken>,
    ) {
        // 앱 시작시 기본 관리자 계정 생성 (개발용)
        this.ensureAdminExists().catch((err) => {
            this.logger.error('기본 관리자 계정 생성 실패:', err);
        });
    }

    private async ensureAdminExists() {
        const adminCount = await this.adminRepository.count();
        if (adminCount === 0) {
            this.logger.log('기본 관리자 계정이 없습니다. 생성합니다...');

            const admin = this.adminRepository.create({
                email: 'admin@example.com',
                name: '관리자',
                role: 'admin',
                password: 'admin123', // 엔티티의 @BeforeInsert에서 해싱됨
            });

            await this.adminRepository.save(admin);
            this.logger.log(`기본 관리자 계정이 생성되었습니다. 이메일: ${admin.email}`);
        }
    }

    async adminLogin(loginDto: AdminLoginDto, request?: Request): Promise<AdminAuthDataDto> {
        const { email, password } = loginDto;

        try {
            // 관리자 계정 조회
            const admin = await this.adminRepository.findOne({ where: { email } });
            if (!admin) {
                throw new NotFoundException('존재하지 않는 관리자 계정입니다.');
            }

            // 비밀번호 검증
            const isPasswordValid = await admin.validatePassword(password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
            }

            // JWT 토큰 발급
            const payload = {
                sub: admin.id,
                email: admin.email,
                role: admin.role,
            };

            const token = this.jwtService.sign(payload, {
                expiresIn: '1h',
                secret: process.env.JWT_SECRET || 'admin-secret-key',
            });

            // 리프레시 토큰 생성
            const refreshToken = await this.generateRefreshToken(admin.id, request?.ip, request?.headers['user-agent']);

            // 유저 정보 매핑
            const userDto: AdminUserDto = {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            };

            return {
                user: userDto,
                token,
                refreshToken: refreshToken.token,
            };
        } catch (error) {
            this.logger.error(`관리자 로그인 실패: ${error.message}`, error.stack);
            throw error;
        }
    }

    async verifyAdminToken(token: string): Promise<AdminUserDto> {
        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET || 'admin-secret-key',
            });

            if (payload.role !== 'admin') {
                throw new UnauthorizedException('관리자 권한이 아닙니다.');
            }

            // 관리자 정보 조회
            const admin = await this.adminRepository.findOne({ where: { id: payload.sub } });
            if (!admin) {
                throw new NotFoundException('존재하지 않는 관리자입니다.');
            } 

            return {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            };
        } catch (error) {
            this.logger.error(`토큰 검증 실패: ${error.message}`);
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('만료된 토큰입니다.');
            }
            throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        }
    }

    async refreshAdminToken(refreshTokenStr: string, request?: Request): Promise<AdminAuthDataDto> {
        try {
            // 리프레시 토큰 조회
            const refreshToken = await this.refreshTokenRepository.findOne({
                where: { token: refreshTokenStr },
                relations: ['admin'],
            });

            if (!refreshToken) {
                throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
            }

            // 토큰 만료 또는 취소 여부 확인
            if (refreshToken.isExpired() || refreshToken.isRevoked) {
                throw new UnauthorizedException('만료되거나 취소된 리프레시 토큰입니다.');
            }

            const admin = refreshToken.admin;
            if (!admin) {
                throw new NotFoundException('존재하지 않는 관리자입니다.');
            }

            // 새 JWT 토큰 발급
            const payload = {
                sub: admin.id,
                email: admin.email,
                role: admin.role,
            };

            const token = this.jwtService.sign(payload, {
                expiresIn: '1h',
                secret: process.env.JWT_SECRET || 'admin-secret-key',
            });

            // 기존 토큰을 재사용하지 않고 새 리프레시 토큰 발급
            // 기존 토큰 만료 설정
            refreshToken.isRevoked = true;
            await this.refreshTokenRepository.save(refreshToken);

            // 새 토큰 생성
            const newRefreshToken = await this.generateRefreshToken(
                admin.id,
                request?.ip || refreshToken.ip,
                request?.headers['user-agent'] || refreshToken.userAgent,
            );

            // 응답용 DTO 생성
            const userDto: AdminUserDto = {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            };

            return {
                user: userDto,
                token,
                refreshToken: newRefreshToken.token,
            };
        } catch (error) {
            this.logger.error(`토큰 갱신 실패: ${error.message}`, error.stack);
            throw error;
        }
    }

    async adminLogout(refreshTokenStr: string): Promise<boolean> {
        try {
            // 리프레시 토큰 조회
            const refreshToken = await this.refreshTokenRepository.findOne({
                where: { token: refreshTokenStr },
            });

            if (!refreshToken) {
                // 토큰이 없어도 로그아웃은 성공으로 처리
                return true;
            }

            // 토큰 만료 설정
            refreshToken.isRevoked = true;
            await this.refreshTokenRepository.save(refreshToken);

            return true;
        } catch (error) {
            this.logger.error(`로그아웃 실패: ${error.message}`, error.stack);
            return false;
        }
    }

    // 리프레시 토큰 생성 헬퍼 메서드
    private async generateRefreshToken(adminId: string, ip?: string, userAgent?: string): Promise<RefreshToken> {
        // 30일 후 만료
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        const refreshToken = this.refreshTokenRepository.create({
            token: `rt_${this.generateRandomString(32)}`,
            adminId,
            expiresAt,
            ip,
            userAgent,
        });

        return this.refreshTokenRepository.save(refreshToken);
    }

    // 랜덤 문자열 생성 헬퍼 메서드
    private generateRandomString(length: number): string {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}

import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDto, LoginResponseDto, RefreshTokenDto, RefreshTokenResponseDto } from './dto';
import * as bcrypt from 'bcrypt';
import { SystemsService } from 'src/systems/systems.service';
import { UsersService } from 'src/users/users.service';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly systemService: SystemsService,
        private readonly tokenService: TokensService,
    ) {}

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const { email, password, client_id } = loginDto;

        const system = await this.systemService.findByPublicKey(client_id);
        if (!system) {
            throw new NotFoundException('존재하지 않는 시스템입니다.');
        }

        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('존재하지 않는 사용자입니다.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }

        let token = await this.tokenService.findByUserAndSystem(user, system);
        console.log('token', token);

        if (token) {
            const now = new Date();
            // 토큰이 있지만 만료되었거나 비활성 상태인 경우 갱신
            if (!token.isActive || now > token.tokenExpiresAt) {
                token = await this.tokenService.renewToken(token.id, {});
            }

            // 마지막 액세스 시간 업데이트
            token.lastAccess = now;
            await this.tokenService.save(token);
        } else {
            token = await this.tokenService.createTokenForUserAndSystem(user, system);
        }
        const responseData = {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            tokenFingerprint: token.tokenFingerprint,
            expiresAt: token.tokenExpiresAt,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            name: user.name,
            email: user.email,
            password: user.password,
            employeeNumber: user.employeeNumber,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            hireDate: user.hireDate,
            status: user.status,
            department: user.department,
            position: user.position,
            rank: user.rank,
        };

        return {
            success: true,
            data: responseData,
        };
    }

    async verifyToken(token: string): Promise<boolean> {
        if (!token) {
            throw new UnauthorizedException('토큰이 없습니다.');
        }

        const tokenEntity = await this.tokenService.findByAccessToken(token);
        console.log('tokenEntity', tokenEntity);
        if (!tokenEntity) {
            throw new NotFoundException('존재하지 않는 토큰입니다.');
        }

        if (!tokenEntity.isActive) {
            throw new UnauthorizedException('비활성화된 토큰입니다.');
        }

        const now = new Date();
        if (now > tokenEntity.tokenExpiresAt) {
            throw new UnauthorizedException('만료된 토큰입니다.');
        }

        const isTokenValid = await this.tokenService.verifyToken(token, tokenEntity.tokenFingerprint);
        if (!isTokenValid) {
            throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        }

        // 마지막 액세스 시간 업데이트
        tokenEntity.lastAccess = now;
        await this.tokenService.save(tokenEntity);

        return true;
    }

    async refreshAccessToken(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
        try {
            const { refreshToken, systemId } = refreshTokenDto;

            if (!refreshToken) {
                throw new UnauthorizedException('리프레시 토큰이 없습니다.');
            }

            // 리프레시 토큰으로 토큰 엔티티 찾기
            const tokenEntity = await this.tokenService.findByRefreshToken(refreshToken);
            if (!tokenEntity) {
                throw new NotFoundException('존재하지 않는 리프레시 토큰입니다.');
            }

            // 시스템 일치 확인
            if (tokenEntity.systemId !== systemId) {
                throw new UnauthorizedException('시스템 정보가 일치하지 않습니다.');
            }

            // 토큰 활성화 여부 확인
            if (!tokenEntity.isActive) {
                throw new UnauthorizedException('비활성화된 토큰입니다.');
            }

            // 리프레시 토큰 만료 확인
            const now = new Date();
            if (now > tokenEntity.refreshTokenExpiresAt) {
                throw new UnauthorizedException('만료된 리프레시 토큰입니다.');
            }

            // 리프레시 토큰 유효성 검증
            const isValid = await this.tokenService.verifyToken(refreshToken, tokenEntity.tokenFingerprint);
            if (!isValid) {
                throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
            }

            // 액세스 토큰과 리프레시 토큰 모두 갱신
            const updatedToken = await this.tokenService.refreshTokens(tokenEntity.id);

            return {
                success: true,
                data: {
                    accessToken: updatedToken.accessToken,
                    expiresAt: updatedToken.tokenExpiresAt,
                    refreshToken: updatedToken.refreshToken,
                    refreshTokenExpiresAt: updatedToken.refreshTokenExpiresAt,
                },
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'AUTH_REFRESH_ERROR',
                    message: error.message,
                },
            };
        }
    }
}

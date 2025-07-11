import { Injectable } from '@nestjs/common';
import { TokensService } from '../services/tokens.service';
import { Token } from '../entities/token.entity';
import { CreateTokenDto, RenewTokenDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
// JWT 토큰 관련 상수
const JWT_CONSTANTS = {
    DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS: 1, // 액세스 토큰 기본 만료 일수
    DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS: 7, // 리프레시 토큰 기본 만료 일수
    MIN_ACCESS_TOKEN_EXPIRES_DAYS: 1, // 액세스 토큰 최소 만료 일수
    MAX_ACCESS_TOKEN_EXPIRES_DAYS: 365, // 액세스 토큰 최대 만료 일수
    MIN_REFRESH_TOKEN_EXPIRES_DAYS: 30, // 리프레시 토큰 최소 만료 일수
    MAX_REFRESH_TOKEN_EXPIRES_DAYS: 730, // 리프레시 토큰 최대 만료 일수
};

@Injectable()
export class AdminTokensUsecase {
    constructor(
        private readonly tokensService: TokensService,
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    /**
     * 모든 토큰을 조회합니다.
     */
    async findAll(): Promise<Token[]> {
        return this.tokensService.findAll({
            relations: ['user'],
        });
    }

    /**
     * 특정 ID의 토큰을 조회합니다.
     */
    async findOne(id: string): Promise<Token> {
        return this.tokensService.findOne(id);
    }

    /**
     * 사용자 ID로 토큰을 조회합니다.
     */
    async findByUserId(userId: string): Promise<Token[]> {
        return this.tokensService.findByUserId(userId);
    }

    /**
     * 새 토큰을 생성합니다.
     */
    async createToken(createTokenDto: CreateTokenDto): Promise<Token> {
        const {
            userId,
            expiresInDays = JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS,
            refreshExpiresInDays = JWT_CONSTANTS.DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS,
        } = createTokenDto;

        const user = await this.usersService.findOne(userId);
        // JWT 페이로드 생성
        const payload = {
            sub: userId,
            employeeNumber: user.employeeNumber,
            type: 'access',
        };

        // 액세스 토큰 생성
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: `${expiresInDays}d`,
            secret: this.tokensService.jwtSecret,
        });

        // 리프레시 토큰 생성
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.jwtService.sign(refreshPayload, {
            expiresIn: `${refreshExpiresInDays}d`,
            secret: this.tokensService.jwtSecret,
        });

        // 만료일 계산
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, expiresInDays);
        const refreshTokenExpiresAt = this.addDays(now, refreshExpiresInDays);

        // 토큰 엔티티 생성 및 저장
        return this.tokensService.create({
            userId,
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            isActive: true,
        } as any);
    }

    /**
     * 토큰 상태를 업데이트합니다.
     */
    async updateStatus(id: string, isActive: boolean): Promise<Token> {
        const token = await this.tokensService.findOne(id);

        // 상태 업데이트
        return this.tokensService.update(id, {
            ...token,
            isActive,
        });
    }

    /**
     * 토큰을 갱신합니다.
     */
    async renewToken(id: string, renewTokenDto: RenewTokenDto): Promise<Token> {
        const token = await this.tokensService.findOne(id);
        const user = await this.usersService.findOne(token.userId);
        const {
            expiresInDays = JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS,
            refreshExpiresInDays = JWT_CONSTANTS.DEFAULT_REFRESH_TOKEN_EXPIRES_DAYS,
        } = renewTokenDto;

        // JWT 페이로드 생성
        const payload = {
            sub: token.userId,
            employeeNumber: user.employeeNumber,
            type: 'access',
        };

        // 액세스 토큰 생성
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: `${expiresInDays}d`,
            secret: this.tokensService.jwtSecret,
        });

        // 리프레시 토큰 생성
        const refreshPayload = {
            ...payload,
            type: 'refresh',
        };
        const refreshToken = this.jwtService.sign(refreshPayload, {
            expiresIn: `${refreshExpiresInDays}d`,
            secret: this.tokensService.jwtSecret,
        });

        // 만료일 계산
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, expiresInDays);
        const refreshTokenExpiresAt = this.addDays(now, refreshExpiresInDays);

        // 토큰 업데이트
        return this.tokensService.update(id, {
            accessToken,
            refreshToken,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            lastAccess: now,
            isActive: true,
        });
    }

    /**
     * 리프레시 토큰을 사용하여 액세스 토큰을 갱신합니다.
     */
    async refreshTokens(id: string): Promise<Token> {
        const token = await this.tokensService.findOne(id);
        const user = await this.usersService.findOne(token.userId);
        // 리프레시 토큰이 만료되었는지 확인
        if (!token.refreshToken || new Date() > token.refreshTokenExpiresAt) {
            throw new Error('리프레시 토큰이 만료되었습니다.');
        }

        if (!token.isActive) {
            throw new Error('비활성화된 토큰은 갱신할 수 없습니다.');
        }

        // JWT 페이로드 생성
        const payload = {
            sub: token.userId,
            employeeNumber: user.employeeNumber,
            type: 'access',
        };

        // 액세스 토큰 생성 (기본 30일)
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: `${JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS}d`,
            secret: this.tokensService.jwtSecret,
        });

        // 만료일 계산
        const now = new Date();
        const tokenExpiresAt = this.addDays(now, JWT_CONSTANTS.DEFAULT_ACCESS_TOKEN_EXPIRES_DAYS);

        // 토큰 업데이트
        return this.tokensService.update(id, {
            accessToken,
            tokenExpiresAt,
            lastAccess: now,
        });
    }

    /**
     * 토큰을 삭제합니다.
     */
    async remove(id: string): Promise<void> {
        return this.tokensService.remove(id);
    }

    /**
     * 날짜에 일수를 더합니다.
     */
    private addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}

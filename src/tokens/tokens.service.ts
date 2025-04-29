import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, createHmac } from 'crypto';
import { User } from 'src/users/entities/user.entity';
import { System } from 'src/systems/entities/system.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { UsersService } from 'src/users/users.service';
import { SystemsService } from 'src/systems/systems.service';
import { RenewTokenDto } from './dto/renew-token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensService {
    private readonly jwtSecret: string;

    constructor(
        @InjectRepository(Token)
        private tokensRepository: Repository<Token>,
        private jwtService: JwtService,
        private usersService: UsersService,
        private systemsService: SystemsService,
        private configService: ConfigService,
    ) {
        // 환경 변수에서 JWT 시크릿을 불러옵니다.
        this.jwtSecret = this.configService.get<string>('JWT_SECRET') || 'defaultJwtSecret123!@#';
        if (!this.jwtSecret) {
            console.warn('JWT_SECRET 환경 변수가 설정되지 않았습니다. 기본값이 사용됩니다.');
        }
    }

    /**
     * 토큰 핑거프린트 생성 - 토큰 검증에 사용할 고유 식별자
     */
    private generateTokenFingerprint(userId: string, systemId: string): string {
        // 고유 식별자 생성 (사용자+시스템+랜덤값)
        const random = randomBytes(8).toString('hex');

        // HMAC으로 핑거프린트 생성 (마스터 키로 서명)
        const hmac = createHmac('sha256', this.jwtSecret);
        hmac.update(`${userId}:${systemId}:${random}`);

        return hmac.digest('hex');
    }

    /**
     * 토큰 생성 - JWT 액세스 토큰과 리프레시 토큰을 생성합니다.
     */
    async generateToken(
        user: User,
        system: System,
        expiresInDays = 1,
        refreshExpiresInDays = 7,
    ): Promise<{
        fingerprint: string;
        accessToken: string;
        refreshToken: string;
        tokenExpiresAt: Date;
        refreshTokenExpiresAt: Date;
    }> {
        // 토큰 핑거프린트 생성 (DB에 저장)
        const fingerprint = this.generateTokenFingerprint(user.id, system.id);

        // 액세스 토큰과 리프레시 토큰의 만료 시간 설정
        const expiresIn = `${expiresInDays}d`;
        const refreshExpiresIn = `${refreshExpiresInDays}d`;

        // JWT 페이로드
        const payload = {
            sub: user.id,
            userId: user.id,
            systemId: system.id,
            type: 'access',
            // 핑거프린트 일부를 페이로드에 포함 (검증용)
            fp: fingerprint.substring(0, 16),
        };

        const refreshPayload = {
            sub: user.id,
            userId: user.id,
            systemId: system.id,
            type: 'refresh',
            // 다른 핑거프린트 부분을 리프레시 토큰에 포함 (검증용)
            fp: fingerprint.substring(16, 32),
        };

        // JWT 발급 - 서명에는 중앙 시크릿 키 사용
        const accessToken = this.jwtService.sign(payload, {
            expiresIn,
            secret: this.jwtSecret, // 중앙 시크릿으로 서명
        });

        const refreshToken = this.jwtService.sign(refreshPayload, {
            expiresIn: refreshExpiresIn,
            secret: this.jwtSecret, // 중앙 시크릿으로 서명
        });

        // 만료 시간 계산
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);

        const refreshExpiresAt = new Date();
        refreshExpiresAt.setDate(refreshExpiresAt.getDate() + refreshExpiresInDays);

        return {
            fingerprint,
            accessToken,
            refreshToken,
            tokenExpiresAt: expiresAt,
            refreshTokenExpiresAt: refreshExpiresAt,
        };
    }

    /**
     * JWT 토큰 검증
     */
    async verifyToken(token: string, tokenFingerprint: string): Promise<boolean> {
        try {
            // 중앙 시크릿 키로 JWT 검증
            const decoded = this.jwtService.verify(token, {
                secret: this.jwtSecret, // 중앙 시크릿으로 검증
            });

            // 토큰 타입 확인
            const tokenType = decoded.type;

            // 토큰에 포함된 핑거프린트와 DB에 저장된 핑거프린트 비교
            let fingerprintPart = '';

            if (tokenType === 'access') {
                fingerprintPart = tokenFingerprint.substring(0, 16);
            } else if (tokenType === 'refresh') {
                fingerprintPart = tokenFingerprint.substring(16, 32);
            }

            // 핑거프린트 검증 (추가 보안 계층)
            return decoded.fp === fingerprintPart;
        } catch (error) {
            console.error('토큰 검증 오류:', error.message);
            return false;
        }
    }

    /**
     * 토큰 생성 및 저장 - User, System 객체로부터 토큰을 생성하고 DB에 저장합니다.
     */
    async createTokenForUserAndSystem(
        user: User,
        system: System,
        expiresInDays = 1,
        refreshExpiresInDays = 7,
    ): Promise<Token> {
        // 토큰 생성
        const { fingerprint, accessToken, refreshToken, tokenExpiresAt, refreshTokenExpiresAt } =
            await this.generateToken(user, system, expiresInDays, refreshExpiresInDays);

        // 토큰 엔티티 생성 - 핑거프린트 저장 (검증용)
        const token = this.tokensRepository.create({
            user,
            system,
            userId: user.id,
            systemId: system.id,
            accessToken,
            refreshToken,
            tokenFingerprint: fingerprint,
            tokenExpiresAt,
            refreshTokenExpiresAt,
            isActive: true,
        });

        // DB에 저장
        return this.tokensRepository.save(token);
    }

    /**
     * 토큰 조회 - 각종 조건으로 토큰을 검색합니다.
     */
    async findAll(): Promise<Token[]> {
        return this.tokensRepository.find({
            relations: ['user', 'system'],
        });
    }

    async findOne(id: string): Promise<Token> {
        const token = await this.tokensRepository.findOne({
            where: { id },
            relations: ['user', 'system'],
        });

        if (!token) {
            throw new NotFoundException(`Token with ID ${id} not found`);
        }

        return token;
    }

    async findBySystemId(systemId: string): Promise<Token[]> {
        return this.tokensRepository.find({
            where: { systemId },
            relations: ['user', 'system'],
        });
    }

    async findByUserId(userId: string): Promise<Token[]> {
        return this.tokensRepository.find({
            where: { userId },
            relations: ['user', 'system'],
        });
    }

    async findByUserAndSystem(user: User, system: System): Promise<Token> {
        return this.tokensRepository.findOne({
            where: {
                userId: user.id,
                systemId: system.id,
            },
            relations: ['user', 'system'],
        });
    }

    async findByAccessToken(accessToken: string): Promise<Token> {
        return this.tokensRepository.findOne({
            where: { accessToken },
            relations: ['user', 'system'],
        });
    }

    async findByRefreshToken(refreshToken: string): Promise<Token> {
        return this.tokensRepository.findOne({
            where: { refreshToken },
            relations: ['user', 'system'],
        });
    }

    /**
     * 토큰 생성 - DTO로부터 토큰을 생성합니다.
     */
    async createToken(createTokenDto: CreateTokenDto): Promise<Token> {
        const { userId, systemId, expiresInDays = 1, refreshExpiresInDays = 7 } = createTokenDto;

        // 사용자와 시스템이 존재하는지 확인
        const user = await this.usersService.findOne(userId);
        const system = await this.systemsService.findOne(systemId);

        // 토큰 생성 및 저장
        return this.createTokenForUserAndSystem(user, system, expiresInDays, refreshExpiresInDays);
    }

    /**
     * 토큰 저장 및 업데이트
     */
    async save(token: Token): Promise<Token> {
        return this.tokensRepository.save(token);
    }

    /**
     * 토큰 상태 변경 (활성화/비활성화)
     */
    async updateStatus(id: string, isActive: boolean): Promise<Token> {
        const token = await this.findOne(id);
        token.isActive = isActive;
        return this.tokensRepository.save(token);
    }

    /**
     * 리프레시 토큰으로 액세스 토큰 갱신
     */
    async refreshTokens(id: string): Promise<Token> {
        const token = await this.findOne(id);

        // 리프레시 토큰이 없거나 만료된 경우
        if (!token.refreshToken || new Date() > token.refreshTokenExpiresAt) {
            throw new Error('Refresh token is expired or invalid');
        }

        // 리프레시 토큰 만료 기간은 유지 (원래 만료일로부터 계산)
        const now = new Date();
        const refreshTokenRemainingDays = Math.max(
            1,
            Math.ceil((token.refreshTokenExpiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        );

        // 새로운 액세스 토큰과 리프레시 토큰 생성
        const { fingerprint, accessToken, refreshToken, tokenExpiresAt, refreshTokenExpiresAt } =
            await this.generateToken(
                token.user,
                token.system,
                1, // 액세스 토큰은 1일
                refreshTokenRemainingDays, // 리프레시 토큰은 남은 기간으로
            );

        // 토큰 업데이트
        token.tokenFingerprint = fingerprint;
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.tokenExpiresAt = tokenExpiresAt;
        token.refreshTokenExpiresAt = refreshTokenExpiresAt;
        token.lastAccess = now;

        return this.tokensRepository.save(token);
    }

    /**
     * 토큰 재발급 - 관리자 API용
     */
    async renewToken(id: string, renewTokenDto: RenewTokenDto): Promise<Token> {
        const { expiresInDays = 1, refreshExpiresInDays = 7 } = renewTokenDto;
        const token = await this.findOne(id);

        // 토큰 재생성
        const { fingerprint, accessToken, refreshToken, tokenExpiresAt, refreshTokenExpiresAt } =
            await this.generateToken(token.user, token.system, expiresInDays, refreshExpiresInDays);

        // 토큰 업데이트
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.tokenFingerprint = fingerprint;
        token.tokenExpiresAt = tokenExpiresAt;
        token.refreshTokenExpiresAt = refreshTokenExpiresAt;
        token.lastAccess = new Date();

        return this.tokensRepository.save(token);
    }

    /**
     * 토큰 삭제
     */
    async remove(id: string): Promise<void> {
        const token = await this.findOne(id);
        await this.tokensRepository.remove(token);
    }
}

import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SystemsService } from '../../systems/services/systems.service';
import { UsersService } from '../../users/services/users.service';
import { TokensService } from '../../tokens/services/tokens.service';
import { System } from '../../systems/entities/system.entity';
import { User } from '../../users/entities/user.entity';
import { Token } from '../../tokens/entities/token.entity';
import * as bcrypt from 'bcrypt';
import { AdminTokensUsecase } from '../../tokens/usecases/admin.usecase';
import { ClientTokensUsecase } from 'src/tokens/usecases/client.usecase';
import { CreateTokenDto } from 'src/tokens/dto/create-token.dto';
@Injectable()
export class ClientUseCase {
    private readonly jwtSecret: string;

    constructor(
        private systemsService: SystemsService,
        private usersService: UsersService,
        private tokensService: TokensService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private clientTokensUsecase: ClientTokensUsecase,
    ) {
        this.jwtSecret = this.configService.get<string>('JWT_SECRET') || 'jwt-secret-key';
    }

    /**
     * Basic Auth 헤더를 사용하여 시스템 인증을 처리합니다.
     * @param authHeader 인증 헤더 문자열 (Basic base64(clientId:clientSecret))
     */
    async authenticateSystem(authHeader: string): Promise<System> {
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            throw new UnauthorizedException('유효한 Basic 인증 헤더가 필요합니다.');
        }

        try {
            const base64Credentials = authHeader.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
            const [clientId, clientSecret] = credentials.split(':');

            if (!clientId || !clientSecret) {
                throw new UnauthorizedException('클라이언트 ID 및 시크릿이 필요합니다.');
            }

            // 시스템 조회
            const systems = await this.systemsService.findAll({
                where: { clientId },
            });

            if (systems.length === 0) {
                throw new UnauthorizedException('유효하지 않은 클라이언트 ID입니다.');
            }

            const system = systems[0];

            // 시스템이 활성화 상태인지 확인
            if (!system.isActive) {
                throw new UnauthorizedException('비활성화된 시스템입니다.');
            }

            // 클라이언트 시크릿 검증t
            // 시스템의 clientSecret은 이미 해싱된 값
            // bcrypt로 비교 해야함!(await bcrpompare(c,system.))            if (

            if (!(await bcrypt.compare(clientSecret, system.clientSecret))) {
                throw new UnauthorizedException('유효하지 않은 클라이언트 시크릿입니다.');
            }

            return system;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException('시스템 인증에 실패했습니다.');
        }
    }

    /**
     * 사용자 이메일과 비밀번호로 로그인을 처리하고 토큰을 발급합니다.
     * @param email 사용자 이메일
     * @param password 사용자 비밀번호
     */
    async authenticateUser(email: string, password: string): Promise<{ user: User; token: Token }> {
        if (!email || !password) {
            throw new BadRequestException('이메일과 비밀번호가 필요합니다.');
        }

        // 사용자 조회
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('존재하지 않는 사용자입니다.');
        }

        if (user.status === '퇴사') {
            throw new UnauthorizedException('퇴사한 사용자입니다.');
        }

        // 패스워드 검증
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }

        // 기본 만료 시간 설정
        const expiresInDays = 1; // 액세스 토큰 (1일)
        const refreshExpiresInDays = 30; // 리프레시 토큰 (30일)

        // 토큰 생성 및 저장
        const token = await this.generateTokenForUser(user, expiresInDays, refreshExpiresInDays);
        console.log('token', token);

        return { user, token };
    }

    /**
     * 토큰 발급 요청 처리
     * @param system 인증된 시스템
     * @param requestBody 요청 본문
     */
    async handleTokenRequest(system: System, requestBody: any): Promise<any> {
        const { grant_type, email, password, refresh_token } = requestBody;

        if (!grant_type) {
            throw new BadRequestException('grant_type이 필요합니다.');
        }

        switch (grant_type) {
            case 'password':
                if (!email || !password) {
                    throw new BadRequestException('username과 password가 필요합니다.');
                }

                // 사용자 로그인 처리
                const { user, token } = await this.authenticateUser(email, password);
                return this.formatTokenResponse(token, user);

            case 'refresh_token':
                if (!refresh_token) {
                    throw new BadRequestException('refresh_token이 필요합니다.');
                }

                // 리프레시 토큰 처리
                return await this.handleRefreshToken(refresh_token);

            default:
                throw new BadRequestException('지원하지 않는 grant_type입니다.');
        }
    }

    /**
     * 리프레시 토큰을 처리하여 새로운 액세스 토큰을 발급합니다.
     * @param refreshToken 리프레시 토큰
     */
    async handleRefreshToken(refreshToken: string): Promise<any> {
        try {
            // 리프레시 토큰으로 토큰 정보 조회
            const token = await this.tokensService.findByRefreshToken(refreshToken);

            // 토큰 만료 확인
            if (new Date() > token.refreshTokenExpiresAt) {
                throw new UnauthorizedException('만료된 리프레시 토큰입니다.');
            }

            if (!token.isActive) {
                throw new UnauthorizedException('비활성화된 토큰입니다.');
            }

            // 사용자 정보 조회
            const user = await this.usersService.findOne(token.userId);
            if (!user) {
                throw new NotFoundException('사용자를 찾을 수 없습니다.');
            }

            // 새 액세스 토큰 생성
            const accessToken = this.generateJwtToken(user);

            // 토큰 만료일 계산
            const now = new Date();
            const tokenExpiresAt = new Date(now);
            tokenExpiresAt.setDate(now.getDate() + 1); // 1일 후 만료

            // 토큰 업데이트
            const updatedToken = await this.tokensService.update(token.id, {
                accessToken,
                tokenExpiresAt,
                lastAccess: new Date(),
            });

            return this.formatTokenResponse(updatedToken, user);
        } catch (error) {
            if (error instanceof UnauthorizedException || error instanceof NotFoundException) {
                throw error;
            }
            throw new UnauthorizedException('리프레시 토큰 처리 중 오류가 발생했습니다.');
        }
    }

    /**
     * 토큰 응답 형식을 생성합니다.
     * @param token 토큰 엔티티
     * @param user 사용자 엔티티
     */
    private formatTokenResponse(token: Token, user: User): any {
        return {
            tokenType: 'Bearer',
            accessToken: token.accessToken,
            expiresIn: this.calculateExpiresIn(token.tokenExpiresAt),
            refreshToken: token.refreshToken,
            refreshTokenExpiresIn: this.calculateExpiresIn(token.refreshTokenExpiresAt),
            id: user.id,
            name: user.name,
            email: user.email,
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
    }

    /**
     * 만료 시간을 초 단위로 계산합니다.
     * @param expiresAt 만료 날짜
     */
    private calculateExpiresIn(expiresAt: Date): number {
        const now = new Date();
        const diffMs = expiresAt.getTime() - now.getTime();
        return Math.floor(diffMs / 1000); // 초 단위로 변환
    }

    /**
     * 사용자에 대한 JWT 토큰을 생성합니다.
     * @param user 사용자 엔티티
     */
    private generateJwtToken(user: User): string {
        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            employee_number: user.employeeNumber,
        };

        return this.jwtService.sign(payload, {
            secret: this.jwtSecret,
            expiresIn: '1d', // 1일 후 만료
        });
    }

    /**
     * 사용자에 대한 토큰을 생성합니다.
     * 이미 해당 사용자의 토큰이 존재한다면 업데이트되고, 없으면 새로 생성됩니다.
     */
    async generateTokenForUser(user: User, expiresInDays?: number, refreshExpiresInDays?: number): Promise<Token> {
        const tokenDto: CreateTokenDto = {
            userId: user.id,
            expiresInDays,
            refreshExpiresInDays,
        };

        // ClientTokensUsecase의 createToken 메서드는 이제
        // 사용자의 기존 토큰이 있으면 업데이트하고 없으면 새로 생성합니다.
        const createdToken = await this.clientTokensUsecase.createToken(tokenDto);
        return await this.tokensService.findOne(createdToken.id);
    }
}

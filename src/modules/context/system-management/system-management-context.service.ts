import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainSystemService } from '../../domain/system/system.service';
import { DomainTokenService } from '../../domain/token/token.service';
import { DomainEmployeeTokenService } from '../../domain/employee-token/employee-token.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';

@Injectable()
export class SystemManagementContextService {
    constructor(
        private readonly 시스템서비스: DomainSystemService,
        private readonly 토큰서비스: DomainTokenService,
        private readonly 직원토큰서비스: DomainEmployeeTokenService,
        private readonly 직원서비스: DomainEmployeeService,
    ) {}

    /**
     * 새로운 내부 시스템을 등록합니다
     */
    async 시스템등록하기(시스템정보: {
        name: string;
        description?: string;
        domain: string;
        allowedOrigin: string[];
        healthCheckUrl?: string;
    }) {
        // 1. 중복 시스템명/도메인 체크
        const [기존이름, 기존도메인] = await Promise.all([
            this.시스템서비스.findOne({ where: { name: 시스템정보.name } }).catch(() => null),
            this.시스템서비스.findOne({ where: { domain: 시스템정보.domain } }).catch(() => null),
        ]);

        if (기존이름) {
            throw new BadRequestException('이미 등록된 시스템 이름입니다.');
        }

        if (기존도메인) {
            throw new BadRequestException('이미 등록된 도메인입니다.');
        }

        // 2. 클라이언트 ID/시크릿 생성
        const 클라이언트아이디 = this.클라이언트아이디생성하기();
        const 클라이언트시크릿 = this.클라이언트시크릿생성하기();

        // 3. 시스템 등록
        const 새시스템 = await this.시스템서비스.save({
            clientId: 클라이언트아이디,
            clientSecret: 클라이언트시크릿,
            name: 시스템정보.name,
            description: 시스템정보.description,
            domain: 시스템정보.domain,
            allowedOrigin: 시스템정보.allowedOrigin,
            healthCheckUrl: 시스템정보.healthCheckUrl,
            isActive: true,
        });

        return {
            시스템정보: 새시스템,
            인증정보: {
                클라이언트아이디,
                클라이언트시크릿,
            },
        };
    }

    /**
     * 시스템 상태를 활성화/비활성화합니다
     */
    async 시스템상태변경하기(시스템아이디: string, 활성상태: boolean) {
        const 시스템 = await this.시스템서비스.findOne({ where: { id: 시스템아이디 } });
        if (!시스템) {
            throw new NotFoundException('시스템을 찾을 수 없습니다.');
        }

        const 업데이트된시스템 = await this.시스템서비스.update(시스템아이디, {
            isActive: 활성상태,
        });

        return {
            시스템정보: 업데이트된시스템,
            변경사항: {
                이전상태: 시스템.isActive,
                현재상태: 활성상태,
            },
        };
    }

    /**
     * 직원에게 토큰을 발급합니다
     */
    async 직원토큰발급하기(
        직원아이디: string,
        토큰정보: {
            accessToken: string;
            refreshToken?: string;
            tokenExpiresAt: Date;
            refreshTokenExpiresAt?: Date;
            clientInfo?: string;
            ipAddress?: string;
        },
    ) {
        // 1. 직원 존재 확인
        const 직원 = await this.직원서비스.findByEmployeeId(직원아이디);

        // 2. 토큰 생성
        const 새토큰 = await this.토큰서비스.save({
            accessToken: 토큰정보.accessToken,
            refreshToken: 토큰정보.refreshToken,
            tokenExpiresAt: 토큰정보.tokenExpiresAt,
            refreshTokenExpiresAt: 토큰정보.refreshTokenExpiresAt,
            clientInfo: 토큰정보.clientInfo,
            ipAddress: 토큰정보.ipAddress,
        });

        // 3. 직원-토큰 관계 생성
        const 직원토큰관계 = await this.직원토큰서비스.save({
            employeeId: 직원아이디,
            tokenId: 새토큰.id,
        });

        return {
            직원정보: 직원,
            토큰정보: 새토큰,
            관계정보: 직원토큰관계,
        };
    }

    /**
     * 토큰을 갱신합니다
     */
    async 토큰갱신하기(
        리프레시토큰: string,
        새토큰정보: {
            accessToken: string;
            tokenExpiresAt: Date;
            refreshToken?: string;
            refreshTokenExpiresAt?: Date;
        },
    ) {
        // 1. 기존 토큰 조회
        const 기존토큰 = await this.토큰서비스.findByRefreshToken(리프레시토큰);

        // 2. 토큰 만료 확인
        const 현재시간 = new Date();
        if (기존토큰.refreshTokenExpiresAt && 기존토큰.refreshTokenExpiresAt < 현재시간) {
            throw new BadRequestException('리프레시 토큰이 만료되었습니다.');
        }

        // 3. 새 토큰으로 업데이트
        const 갱신된토큰 = await this.토큰서비스.update(기존토큰.id, {
            accessToken: 새토큰정보.accessToken,
            tokenExpiresAt: 새토큰정보.tokenExpiresAt,
            refreshToken: 새토큰정보.refreshToken || 기존토큰.refreshToken,
            refreshTokenExpiresAt: 새토큰정보.refreshTokenExpiresAt || 기존토큰.refreshTokenExpiresAt,
        });

        return {
            이전토큰: 기존토큰,
            갱신된토큰: 갱신된토큰,
        };
    }

    /**
     * 직원의 모든 토큰을 조회합니다
     */
    async 직원토큰목록조회하기(직원아이디: string) {
        // 1. 직원 확인
        const 직원 = await this.직원서비스.findByEmployeeId(직원아이디);

        // 2. 직원-토큰 관계 조회
        const 토큰관계목록 = await this.직원토큰서비스.findByEmployeeId(직원아이디);

        // 3. 각 토큰 상세 정보 조회
        const 토큰상세목록 = await Promise.all(
            토큰관계목록.map(async (관계) => {
                const 토큰정보 = await this.토큰서비스.findOne({ where: { id: 관계.tokenId } });
                return {
                    관계정보: 관계,
                    토큰정보: 토큰정보,
                    만료여부: 토큰정보?.tokenExpiresAt ? 토큰정보.tokenExpiresAt < new Date() : false,
                };
            }),
        );

        return {
            직원정보: 직원,
            토큰목록: 토큰상세목록,
            총토큰수: 토큰상세목록.length,
            활성토큰수: 토큰상세목록.filter((토큰) => !토큰.만료여부).length,
        };
    }

    /**
     * 토큰을 무효화합니다
     */
    async 토큰무효화하기(토큰아이디: string) {
        const 토큰 = await this.토큰서비스.findOne({ where: { id: 토큰아이디 } });
        if (!토큰) {
            throw new NotFoundException('토큰을 찾을 수 없습니다.');
        }

        // 토큰 만료 시간을 현재 시간으로 설정하여 무효화
        const 무효화된토큰 = await this.토큰서비스.update(토큰아이디, {
            tokenExpiresAt: new Date(),
            refreshTokenExpiresAt: new Date(),
        });

        return {
            이전토큰: 토큰,
            무효화된토큰: 무효화된토큰,
        };
    }

    /**
     * 시스템별 등록된 토큰 통계를 조회합니다
     */
    async 시스템토큰통계조회하기() {
        // 1. 모든 활성 시스템 조회
        const 활성시스템목록 = await this.시스템서비스.findActiveSystems();

        // 2. 전체 토큰 목록 조회
        const 전체토큰목록 = await this.토큰서비스.findAllTokens();
        const 현재시간 = new Date();

        // 3. 토큰 통계 계산
        const 토큰통계 = {
            전체토큰수: 전체토큰목록.length,
            활성토큰수: 전체토큰목록.filter((토큰) => 토큰.tokenExpiresAt > 현재시간).length,
            만료토큰수: 전체토큰목록.filter((토큰) => 토큰.tokenExpiresAt <= 현재시간).length,
        };

        return {
            시스템통계: {
                전체시스템수: 활성시스템목록.length,
                활성시스템목록,
            },
            토큰통계,
        };
    }

    /**
     * 시스템의 클라이언트 시크릿을 재발급합니다
     */
    async 시스템시크릿재발급하기(시스템아이디: string) {
        const 시스템 = await this.시스템서비스.findOne({ where: { id: 시스템아이디 } });
        if (!시스템) {
            throw new NotFoundException('시스템을 찾을 수 없습니다.');
        }

        const 새시크릿 = this.클라이언트시크릿생성하기();
        const 업데이트된시스템 = await this.시스템서비스.update(시스템아이디, {
            clientSecret: 새시크릿,
        });

        return {
            시스템정보: 업데이트된시스템,
            이전시크릿: 시스템.clientSecret,
            새시크릿: 새시크릿,
        };
    }

    /**
     * 클라이언트 ID로 시스템을 조회합니다
     */
    async 클라이언트아이디로시스템조회하기(클라이언트아이디: string) {
        return this.시스템서비스.findOne({ where: { clientId: 클라이언트아이디 } });
    }

    /**
     * 리프레시 토큰으로 토큰을 조회합니다
     */
    async 리프레시토큰으로토큰조회하기(리프레시토큰: string) {
        return this.토큰서비스.findByRefreshToken(리프레시토큰);
    }

    /**
     * 토큰 ID로 직원-토큰 관계를 조회합니다
     */
    async 토큰아이디로직원토큰관계조회하기(토큰아이디: string) {
        return this.직원토큰서비스.findByTokenId(토큰아이디);
    }

    /**
     * 클라이언트 ID를 생성합니다
     */
    private 클라이언트아이디생성하기(): string {
        return `client_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    }

    /**
     * 클라이언트 시크릿을 생성합니다
     */
    private 클라이언트시크릿생성하기(): string {
        return `secret_${Date.now()}_${Math.random().toString(36).substring(2, 15)}${Math.random()
            .toString(36)
            .substring(2, 15)}`;
    }
}

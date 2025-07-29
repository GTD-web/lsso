import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainTokenService } from '../../domain/token/token.service';
import { DomainSystemService } from '../../domain/system/system.service';
import { DomainLogService } from '../../domain/log/log.service';
import { DomainEmployeeTokenService } from '../../domain/employee-token/employee-token.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { EmployeeStatus } from '../../../../libs/common/enums';
import { SsoLoginRequestDto, SsoLoginResponseDto } from './dto/sso-login.dto';
import {
    SsoTokenVerifyRequestDto,
    SsoTokenVerifyResponseDto,
    SsoPasswordChangeRequestDto,
    SsoPasswordCheckRequestDto,
} from './dto/sso-token.dto';
import { JwtUtil } from './utils/jwt.util';
import { PasswordUtil } from './utils/password.util';

@Injectable()
export class SsoContextService {
    constructor(
        private readonly 직원서비스: DomainEmployeeService,
        private readonly 토큰서비스: DomainTokenService,
        private readonly 시스템서비스: DomainSystemService,
        private readonly 로그서비스: DomainLogService,
        private readonly 직원토큰서비스: DomainEmployeeTokenService,
        private readonly 직원부서직책서비스: DomainEmployeeDepartmentPositionService,
        private readonly jwtUtil: JwtUtil,
        private readonly passwordUtil: PasswordUtil,
    ) {}

    /**
     * 사용자 로그인을 처리합니다
     */
    async 로그인처리하기(로그인정보: SsoLoginRequestDto): Promise<SsoLoginResponseDto> {
        // 1. 시스템 인증 확인
        const 시스템 = await this.시스템서비스.findByClientId(로그인정보.clientId);

        // 2. 직원 조회
        const 직원 = await this.직원서비스.findByEmail(로그인정보.email);

        // 3. 비밀번호 검증
        const 비밀번호일치 = await this.passwordUtil.comparePassword(로그인정보.password, 직원.password);
        if (!비밀번호일치) {
            throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
        }

        // 4. 직원 상태 확인
        if (직원.status !== EmployeeStatus.Active) {
            throw new UnauthorizedException('비활성화된 계정입니다.');
        }

        // 5. JWT 토큰 생성
        const 액세스토큰 = this.jwtUtil.generateAccessToken({
            id: 직원.id,
            name: 직원.name,
            email: 직원.email,
            employeeNumber: 직원.employeeNumber,
        });

        const 리프레시토큰 = this.jwtUtil.generateRefreshToken({
            id: 직원.id,
            name: 직원.name,
            email: 직원.email,
            employeeNumber: 직원.employeeNumber,
        });

        // 6. 토큰 만료 시간 계산
        const 토큰만료시간 = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24시간
        const 리프레시토큰만료시간 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30일

        // 7. 기존 토큰이 있다면 업데이트, 없으면 새로 생성
        let 토큰;
        try {
            const 기존토큰관계 = await this.직원토큰서비스.findByEmployeeId(직원.id);
            if (기존토큰관계.length > 0) {
                // 기존 토큰 업데이트
                토큰 = await this.토큰서비스.update(기존토큰관계[0].tokenId, {
                    accessToken: 액세스토큰,
                    refreshToken: 리프레시토큰,
                    tokenExpiresAt: 토큰만료시간,
                    refreshTokenExpiresAt: 리프레시토큰만료시간,
                    clientInfo: 로그인정보.userAgent,
                    ipAddress: 로그인정보.ipAddress,
                });
            } else {
                throw new Error('새 토큰 생성 필요');
            }
        } catch {
            // 새 토큰 생성
            토큰 = await this.토큰서비스.save({
                accessToken: 액세스토큰,
                refreshToken: 리프레시토큰,
                tokenExpiresAt: 토큰만료시간,
                refreshTokenExpiresAt: 리프레시토큰만료시간,
                clientInfo: 로그인정보.userAgent,
                ipAddress: 로그인정보.ipAddress,
            });

            // 직원-토큰 관계 생성
            await this.직원토큰서비스.save({
                employeeId: 직원.id,
                tokenId: 토큰.id,
            });
        }

        // 8. 로그인 로그 기록
        await this.로그인로그기록하기(직원.id, 시스템.id, 로그인정보.ipAddress, true);

        // 9. 직원 조직 정보 조회
        const 조직정보 = await this.직원조직정보조회하기(직원.id);

        return {
            인증정보: {
                accessToken: 액세스토큰,
                refreshToken: 리프레시토큰,
                expiresAt: 토큰만료시간,
                tokenType: 'Bearer',
            },
            사용자정보: {
                id: 직원.id,
                name: 직원.name,
                email: 직원.email,
                employeeNumber: 직원.employeeNumber,
                phoneNumber: 직원.phoneNumber,
                dateOfBirth: 직원.dateOfBirth,
                gender: 직원.gender,
                hireDate: 직원.hireDate,
                status: 직원.status,
                조직정보,
            },
            시스템정보: {
                id: 시스템.id,
                name: 시스템.name,
                clientId: 시스템.clientId,
                domain: 시스템.domain,
            },
        };
    }

    /**
     * 토큰을 검증하고 사용자 정보를 반환합니다
     */
    async 토큰검증하기(액세스토큰: string): Promise<SsoTokenVerifyResponseDto> {
        try {
            // 1. JWT 토큰 검증 및 페이로드 추출
            const 토큰페이로드 = this.jwtUtil.verifyToken(액세스토큰);

            // 2. DB에서 토큰 정보 조회
            const 토큰 = await this.토큰서비스.findByAccessToken(액세스토큰);

            // 3. 토큰 만료 확인
            const 현재시간 = new Date();
            if (토큰.tokenExpiresAt < 현재시간) {
                throw new UnauthorizedException('토큰이 만료되었습니다.');
            }

            // 4. 직원 정보 조회 (JWT 페이로드의 사용자 ID 사용)
            const 직원 = await this.직원서비스.findByEmployeeId(토큰페이로드.sub);

            // 5. 직원 상태 확인
            if (직원.status !== EmployeeStatus.Active) {
                throw new UnauthorizedException('비활성화된 계정입니다.');
            }

            // 6. 직원 조직 정보 조회
            const 조직정보 = await this.직원조직정보조회하기(직원.id);

            return {
                직원정보: {
                    id: 직원.id,
                    name: 직원.name,
                    email: 직원.email,
                    employeeNumber: 직원.employeeNumber,
                    phoneNumber: 직원.phoneNumber,
                    dateOfBirth: 직원.dateOfBirth,
                    gender: 직원.gender,
                    hireDate: 직원.hireDate,
                    status: 직원.status,
                },
                토큰정보: {
                    id: 토큰.id,
                    accessToken: 토큰.accessToken,
                    tokenExpiresAt: 토큰.tokenExpiresAt,
                    clientInfo: 토큰.clientInfo,
                    ipAddress: 토큰.ipAddress,
                },
                조직정보,
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        }
    }

    /**
     * 로그아웃을 처리합니다
     */
    async 로그아웃처리하기(액세스토큰: string, 시스템아이디?: string) {
        // 1. 토큰 정보 조회
        const 토큰검증결과 = await this.토큰검증하기(액세스토큰);

        // 2. 토큰 무효화 (만료시간을 현재 시간으로 설정)
        await this.토큰서비스.update(토큰검증결과.토큰정보.id, {
            tokenExpiresAt: new Date(),
            refreshTokenExpiresAt: new Date(),
        });

        // 3. 로그아웃 로그 기록
        if (시스템아이디) {
            await this.로그인로그기록하기(
                토큰검증결과.직원정보.id,
                시스템아이디,
                토큰검증결과.토큰정보.ipAddress || '',
                true,
                '로그아웃',
            );
        }

        return {
            메시지: '로그아웃이 완료되었습니다.',
            직원정보: 토큰검증결과.직원정보,
        };
    }

    /**
     * 직원의 권한을 조회합니다
     */
    async 직원권한조회하기(직원아이디: string) {
        // 1. 직원 조직 정보 조회
        const 조직정보 = await this.직원조직정보조회하기(직원아이디);

        // 2. 직책 권한 확인 (실제 구현에서는 더 복잡한 권한 체계 필요)
        const 권한목록 = this.직책권한매핑하기(0); // 기본 권한

        return {
            직원아이디,
            조직정보,
            권한목록,
            관리자여부: false, // 실제 구현에서는 직책 정보 기반으로 판단
        };
    }

    /**
     * 시스템별 사용자 접근 권한을 확인합니다
     */
    async 시스템접근권한확인하기(직원아이디: string, 시스템아이디: string) {
        // 1. 시스템 정보 확인
        const 시스템 = await this.시스템서비스.findOne({ where: { id: 시스템아이디 } });
        if (!시스템 || !시스템.isActive) {
            throw new NotFoundException('시스템을 찾을 수 없거나 비활성화되었습니다.');
        }

        // 2. 직원 권한 조회
        const 권한정보 = await this.직원권한조회하기(직원아이디);

        // 3. 시스템별 접근 권한 확인 로직 (실제 구현에서는 더 세밀한 권한 체계)
        const 접근허용여부 = this.시스템접근권한판단하기(권한정보, 시스템);

        return {
            접근허용: 접근허용여부,
            시스템정보: 시스템,
            권한정보,
        };
    }

    /**
     * 로그인 세션 목록을 조회합니다
     */
    async 로그인세션목록조회하기(직원아이디: string) {
        // 1. 직원의 활성 토큰 목록 조회
        const 토큰관계목록 = await this.직원토큰서비스.findByEmployeeId(직원아이디);
        const 현재시간 = new Date();

        // 2. 각 토큰의 상세 정보와 활성 상태 확인
        const 세션목록 = await Promise.all(
            토큰관계목록.map(async (관계) => {
                const 토큰정보 = await this.토큰서비스.findOne({ where: { id: 관계.tokenId } });
                const 활성여부 = 토큰정보?.tokenExpiresAt ? 토큰정보.tokenExpiresAt > 현재시간 : false;

                return {
                    세션아이디: 관계.id,
                    토큰정보,
                    활성여부,
                    로그인시간: 토큰정보?.createdAt,
                    마지막사용: 토큰정보?.createdAt,
                    클라이언트정보: 토큰정보?.clientInfo,
                    IP주소: 토큰정보?.ipAddress,
                };
            }),
        );

        return {
            직원아이디,
            전체세션수: 세션목록.length,
            활성세션수: 세션목록.filter((세션) => 세션.활성여부).length,
            세션목록,
        };
    }

    /**
     * 직원 조직 정보를 조회합니다 (간소화된 버전)
     */
    private async 직원조직정보조회하기(직원아이디: string) {
        try {
            const 현재부서직책 = await this.직원부서직책서비스.findCurrentPositionByEmployeeId(직원아이디);
            return {
                부서아이디: 현재부서직책.departmentId,
                직책아이디: 현재부서직책.positionId,
            };
        } catch {
            return null;
        }
    }

    /**
     * 로그인 관련 로그를 기록합니다
     */
    private async 로그인로그기록하기(
        직원아이디: string,
        시스템아이디: string,
        IP주소: string,
        성공여부: boolean,
        액션: string = '로그인',
    ) {
        await this.로그서비스.save({
            host: '시스템내부',
            method: 'POST',
            url: `/auth/${액션}`,
            params: {},
            query: {},
            body: { 직원아이디, 시스템아이디 },
            ip: IP주소,
            userAgent: 'SSO-Context',
            requestTimestamp: new Date(),
            responseTimestamp: new Date(),
            responseTime: 0,
            statusCode: 성공여부 ? 200 : 401,
            response: { 성공여부, 액션 },
            system: '인증시스템',
            error: 성공여부 ? null : { 메시지: `${액션} 실패` },
            isError: !성공여부,
        });
    }

    /**
     * 비밀번호를 변경합니다
     */
    async 비밀번호변경하기(요청정보: SsoPasswordChangeRequestDto): Promise<void> {
        // 1. 직원 조회
        const 직원 = await this.직원서비스.findByEmployeeId(요청정보.직원아이디);

        // 2. 비밀번호 강도 검증
        const 강도검증결과 = this.passwordUtil.validatePasswordStrength(요청정보.새비밀번호);
        if (!강도검증결과.isValid) {
            throw new BadRequestException(`비밀번호 요구사항을 충족하지 않습니다: ${강도검증결과.errors.join(', ')}`);
        }

        // 3. 새 비밀번호 해싱
        const 해싱된비밀번호 = await this.passwordUtil.hashPassword(요청정보.새비밀번호);

        // 4. 직원 정보 업데이트
        await this.직원서비스.updatePassword(직원.id, 해싱된비밀번호);

        // 5. 비밀번호 변경 로그 기록
        await this.로그인로그기록하기(직원.id, null, '', true, '비밀번호변경');
    }

    /**
     * 비밀번호를 확인합니다
     */
    async 비밀번호확인하기(요청정보: SsoPasswordCheckRequestDto): Promise<boolean> {
        // 1. 직원 조회
        const 직원 = await this.직원서비스.findByEmployeeId(요청정보.직원아이디);

        // 2. 비밀번호 검증
        return this.passwordUtil.comparePassword(요청정보.현재비밀번호, 직원.password);
    }

    /**
     * 직원 ID로 직원을 조회합니다
     */
    async 직원아이디로직원조회하기(직원아이디: string) {
        return this.직원서비스.findByEmployeeId(직원아이디);
    }

    /**
     * 직책 레벨에 따른 권한을 매핑합니다
     */
    private 직책권한매핑하기(직책레벨: number): string[] {
        const 기본권한 = ['조회', '본인정보수정'];

        if (직책레벨 >= 3) {
            return [...기본권한, '팀관리', '보고서작성'];
        } else if (직책레벨 >= 5) {
            return [...기본권한, '팀관리', '보고서작성', '부서관리', '직원관리'];
        } else if (직책레벨 >= 7) {
            return [...기본권한, '팀관리', '보고서작성', '부서관리', '직원관리', '시스템관리'];
        }

        return 기본권한;
    }

    /**
     * 시스템 접근 권한을 판단합니다
     */
    private 시스템접근권한판단하기(권한정보: any, 시스템: any): boolean {
        // 기본적으로 모든 활성 직원은 접근 가능
        // 실제 구현에서는 더 세밀한 권한 체계 필요
        return 권한정보.직원아이디 && 시스템.isActive;
    }
}

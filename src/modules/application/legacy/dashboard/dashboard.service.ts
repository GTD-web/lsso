import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { TokensService } from '../tokens/services/tokens.service';
import { LogsService } from '../logs/services/logs.service';
import { LogsAdminUseCase } from '../logs/usecases/admin.usecase';
import { SystemsService } from '../systems/services/systems.service';
import {
    DashboardSummaryDto,
    SystemStatusDto,
    LoginStatsDto,
    SecurityAlertDto,
    TokenStatsDto,
} from './dto/dashboard.dto';
import { Log } from '../../../../../libs/database/entities';

@Injectable()
export class DashboardService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokensService: TokensService,
        private readonly logsService: LogsService,
        private readonly logsAdminUseCase: LogsAdminUseCase,
        private readonly systemsService: SystemsService,
    ) {}

    /**
     * 대시보드 요약 데이터를 가져오는 함수
     * @returns 대시보드 요약 데이터
     */
    async getDashboardSummary(limit: number = 3): Promise<DashboardSummaryDto> {
        // 1. 사용자 통계
        const users = await this.usersService.findAll();
        const activeUsers = users.filter((user) => user.status === '재직중').length;
        const totalUsers = users.length;

        // 2. 토큰 통계
        const tokenStats = await this.getTokenStats();

        // 3. 시스템 통계
        const systems = await this.systemsService.findAll();
        const activeSystems = systems.filter((system) => system.isActive).length;
        const totalSystems = systems.length;
        const systemStatus = await this.getSystemsStatus();

        // 4. 로그인 통계
        const loginStats = await this.getLoginStats();

        // 5. 최근 로그
        const recentLogs = await this.getRecentLogs(limit);

        // 6. 평균 응답 시간 계산
        const avgResponseTime = this.calculateAvgResponseTime(recentLogs);

        // 7. 보안 알림
        const securityAlerts = await this.getSecurityAlerts(limit);

        return {
            activeUsers,
            totalUsers,
            tokenStats,
            activeSystems,
            totalSystems,
            loginStats,
            avgResponseTime,
            securityAlerts,
            recentLogs,
            systemStatus,
        };
    }

    /**
     * 시스템 상태 정보를 가져오는 함수
     * @returns 시스템 상태 정보 목록
     */
    async getSystemsStatus(): Promise<SystemStatusDto[]> {
        const systems = await this.systemsService.findAll();

        // 시스템 상태 정보 변환 로직
        return systems.map((system) => ({
            id: system.id,
            name: system.name,
            status: system.isActive ? 'online' : 'offline',
            lastCheck: new Date().toISOString(),
            responseTime: Math.floor(Math.random() * 200) + 10, // 테스트용 응답 시간 (실제로는 실제 측정 필요)
            uptime: system.isActive ? 86400 * Math.floor(Math.random() * 30) : 0, // 테스트용 업타임 (실제로는 실제 측정 필요)
            healthCheckUrl: system.healthCheckUrl,
        }));
    }

    /**
     * 최근 로그 활동을 가져오는 함수
     * @param limit 가져올 로그 수
     * @returns 최근 로그 목록
     */
    async getRecentLogs(limit: number = 5): Promise<Log[]> {
        const { logs } = await this.logsAdminUseCase.findAll(1, limit);
        return logs;
    }

    /**
     * 로그인 통계 정보를 가져오는 함수
     * @param days 통계 기간 (일)
     * @returns 로그인 통계 정보
     */
    async getLoginStats(days: number = 7): Promise<LoginStatsDto> {
        const logs = await this.logsAdminUseCase.findLoginLogs(days);

        const total = logs.length;
        const success = logs.filter((log) => !log.error).length;
        const failed = total - success;
        const successRate = total > 0 ? Math.round((success / total) * 100) : 0;

        return {
            total,
            success,
            failed,
            successRate,
        };
    }

    /**
     * 보안 알림을 가져오는 함수
     * @returns 보안 알림 목록
     */
    async getSecurityAlerts(limit: number = 3): Promise<SecurityAlertDto[]> {
        // 보안 로그에서 알림으로 변환하는 로직
        const { logs } = await this.logsAdminUseCase.findAll(1, limit);

        // 예시 보안 알림 생성 (실제로는 로그 분석 알고리즘 구현 필요)
        return logs.map((log) => {
            let type: 'warning' | 'info' | 'error' = 'info';
            if (log.statusCode >= 500) {
                type = 'error';
            } else if (log.statusCode >= 400 && log.statusCode < 500) {
                type = 'warning';
            }

            return {
                id: log.id,
                type: type,
                message: log.error?.message || `${log.method} ${log.url}에 대한 ${log.statusCode} 응답`,
                timestamp: log.requestTimestamp.toISOString(),
                resolved: false,
                relatedLogId: log.id,
            };
        });
    }

    /**
     * 토큰 통계 정보를 가져오는 함수
     * @returns 토큰 통계 정보
     */
    async getTokenStats(): Promise<TokenStatsDto> {
        const tokens = await this.tokensService.findAll();

        const now = new Date();
        const weekLater = new Date();
        weekLater.setDate(now.getDate() + 7);

        const total = tokens.length;
        const active = tokens.filter((token) => new Date(token.tokenExpiresAt) > now).length;
        const inactive = total - active;
        const expiringSoon = tokens.filter((token) => {
            const expireDate = new Date(token.tokenExpiresAt);
            return expireDate > now && expireDate < weekLater;
        }).length;

        return {
            total,
            active,
            inactive,
            expiringSoon,
        };
    }

    /**
     * 평균 응답 시간 계산 헬퍼 함수
     * @param logs 로그 목록
     * @returns 평균 응답 시간 (ms)
     */
    private calculateAvgResponseTime(logs: any[]): number {
        const validLogs = logs.filter((log) => log.responseTime);
        if (validLogs.length === 0) return 0;

        const total = validLogs.reduce((sum, log) => sum + log.responseTime, 0);
        return Math.round(total / validLogs.length);
    }
}
